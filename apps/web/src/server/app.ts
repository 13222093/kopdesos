import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { Hono } from "hono";

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

  const kerja = (async () => {
    try {
      await panggilTelegram(token, "sendChatAction", {
        chat_id: chatId,
        action: "typing",
      });
      const jawaban =
        teks === "/start" || teks === "/help"
          ? SAPAAN_TELEGRAM
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

export default app;
