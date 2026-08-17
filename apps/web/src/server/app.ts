import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { Hono } from "hono";

import { buatDigest } from "./digest";
import { jawabPendamping, konfigurasi, SYSTEM_PROMPT } from "./otak";
import { toolsPendamping } from "./tools";

const app = new Hono().basePath("/api");

// ── rate limit sederhana per-IP (in-memory) ──────────────────────
const jejakPermintaan = new Map<string, number[]>();
const BATAS = 20;
const JENDELA_MS = 10 * 60 * 1000;

function bolehLewat(ip: string): boolean {
  const kini = Date.now();
  const daftar = (jejakPermintaan.get(ip) ?? []).filter((t) => kini - t < JENDELA_MS);
  if (daftar.length >= BATAS) return false;
  daftar.push(kini);
  jejakPermintaan.set(ip, daftar);
  return true;
}

app.get("/health", (c) => {
  const { apiKey, model, baseURL } = konfigurasi();
  return c.json({
    ok: true,
    aiSiap: Boolean(apiKey),
    telegramSiap: Boolean(process.env.TELEGRAM_BOT_TOKEN),
    model,
    baseURL,
  });
});

// ── chat web (streaming) ─────────────────────────────────────────
app.post("/pendamping", async (c) => {
  const { apiKey, baseURL, model } = konfigurasi();
  if (!apiKey) {
    return c.json({ error: "MOONSHOT_API_KEY belum diatur" }, 503);
  }

  const ip =
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ?? "lokal";
  if (!bolehLewat(ip)) {
    return c.json({ error: "Terlalu banyak permintaan, coba lagi nanti" }, 429);
  }

  const { messages } = (await c.req.json()) as { messages: UIMessage[] };
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
    return c.json({ error: "Pesan tidak valid" }, 400);
  }
  const totalKarakter = JSON.stringify(messages).length;
  if (totalKarakter > 30_000) {
    return c.json({ error: "Percakapan terlalu panjang, mulai sesi baru" }, 400);
  }

  const moonshot = createOpenAICompatible({
    name: "moonshot",
    apiKey,
    baseURL,
  });

  const result = streamText({
    model: moonshot.chatModel(model),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: toolsPendamping,
    stopWhen: stepCountIs(6),
    onError: ({ error }) => {
      console.error("[pendamping] stream error:", error);
    },
  });

  return result.toUIMessageStreamResponse();
});

// ── kanal Telegram ───────────────────────────────────────────────

const SAPAAN_TELEGRAM =
  "Halo! Saya Pendamping AI KopPilot — asisten Koperasi Sukamaju 🙏\n\nTanya apa saja soal koperasi dengan bahasa sehari-hari, misalnya:\n• Berapa penjualan hari ini?\n• Kapan beras premium habis?\n• Kas cukup untuk bayar cicilan BNI?\n• Apakah koperasi kita siap ekspor?";

/** Markdown Kimi → Markdown legacy Telegram: **x** jadi *x*, buang heading */
function markdownTelegram(teks: string): string {
  return teks
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "*$1*");
}

async function panggilTelegram(
  token: string,
  metode: string,
  body: Record<string, unknown>,
): Promise<Response> {
  return fetch(`https://api.telegram.org/bot${token}/${metode}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

app.post("/telegram", async (c) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return c.json({ error: "TELEGRAM_BOT_TOKEN belum diatur" }, 503);

  // verifikasi opsional: secret_token yang didaftarkan saat setWebhook
  const rahasia = process.env.TELEGRAM_SECRET;
  if (rahasia && c.req.header("x-telegram-bot-api-secret-token") !== rahasia) {
    return c.json({ error: "secret tidak cocok" }, 401);
  }

  const update = (await c.req.json()) as {
    message?: { chat?: { id?: number }; text?: string };
  };
  const chatId = update.message?.chat?.id;
  const teks = update.message?.text?.trim();
  if (!chatId || !teks) return c.json({ ok: true });

  if (!bolehLewat(`tg-${chatId}`)) {
    c.executionCtx?.waitUntil?.(
      panggilTelegram(token, "sendMessage", {
        chat_id: chatId,
        text: "Terlalu banyak pertanyaan dalam waktu singkat — tunggu sebentar ya 🙏",
      }).then(() => undefined),
    );
    return c.json({ ok: true });
  }

  // /langganan: balas ID chat untuk didaftarkan ke ringkasan pagi otomatis
  if (teks === "/langganan") {
    const balasLangganan = panggilTelegram(token, "sendMessage", {
      chat_id: chatId,
      text: `ID chat kamu: ${chatId}\n\nMinta admin menambahkan ID ini ke variabel TELEGRAM_CHAT_IDS di server, lalu kamu akan menerima *Ringkasan Pagi* otomatis setiap hari 🌅`,
      parse_mode: "Markdown",
    }).then(() => undefined);
    try {
      c.executionCtx.waitUntil(balasLangganan);
    } catch {
      await balasLangganan;
    }
    return c.json({ ok: true });
  }

  const kerja = (async () => {
    try {
      await panggilTelegram(token, "sendChatAction", {
        chat_id: chatId,
        action: "typing",
      });
      const jawaban =
        teks === "/start" || teks === "/help"
          ? SAPAAN_TELEGRAM
          : teks === "/ringkasan"
            ? buatDigest()
            : markdownTelegram(await jawabPendamping(teks));
      const kirim = await panggilTelegram(token, "sendMessage", {
        chat_id: chatId,
        text: jawaban,
        parse_mode: "Markdown",
      });
      if (!kirim.ok) {
        // fallback bila markdown gagal diparse Telegram
        await panggilTelegram(token, "sendMessage", {
          chat_id: chatId,
          text: jawaban.replace(/\*/g, ""),
        });
      }
    } catch (e) {
      console.error("[telegram] gagal:", e);
      await panggilTelegram(token, "sendMessage", {
        chat_id: chatId,
        text: "Maaf, saya sedang gangguan. Coba lagi sebentar lagi ya 🙏",
      }).catch(() => undefined);
    }
  })();

  // balas 200 secepatnya; proses AI berlanjut di background (edge waitUntil)
  try {
    c.executionCtx.waitUntil(kerja);
  } catch {
    await kerja; // dev server lokal: tidak ada executionCtx, tunggu langsung
  }
  return c.json({ ok: true });
});

// ── digest pagi proaktif (dipicu Vercel Cron atau manual) ────────
app.get("/digest", async (c) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return c.json({ error: "TELEGRAM_BOT_TOKEN belum diatur" }, 503);

  // otorisasi: Vercel Cron (Bearer CRON_SECRET otomatis) atau manual (?rahasia=TELEGRAM_SECRET)
  const cronSecret = process.env.CRON_SECRET;
  const rahasia = process.env.TELEGRAM_SECRET;
  const auth = c.req.header("authorization");
  const sah =
    (cronSecret && auth === `Bearer ${cronSecret}`) ||
    (rahasia && c.req.query("rahasia") === rahasia) ||
    (!cronSecret && !rahasia);
  if (!sah) return c.json({ error: "tidak berwenang" }, 401);

  // ?pratinjau=1 → tampilkan isi digest tanpa mengirim (untuk cek/demo)
  if (c.req.query("pratinjau")) {
    return c.text(buatDigest());
  }

  const daftar = (process.env.TELEGRAM_CHAT_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (daftar.length === 0) {
    return c.json({
      terkirim: 0,
      catatan:
        "TELEGRAM_CHAT_IDS kosong. Kirim /langganan ke bot untuk melihat ID chat, lalu tambahkan ke env.",
    });
  }

  const isi = buatDigest();
  let terkirim = 0;
  for (const id of daftar) {
    const r = await panggilTelegram(token, "sendMessage", {
      chat_id: Number(id),
      text: isi,
      parse_mode: "Markdown",
    });
    if (r.ok) {
      terkirim++;
    } else {
      const ulang = await panggilTelegram(token, "sendMessage", {
        chat_id: Number(id),
        text: isi.replace(/[*_]/g, ""),
      });
      if (ulang.ok) terkirim++;
    }
  }
  return c.json({ terkirim, total: daftar.length });
});

export default app;
