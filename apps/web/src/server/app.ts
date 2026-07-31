import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { Hono } from "hono";

import { HARI_INI, koperasi } from "./data";
import { toolsPendamping } from "./tools";

const MODEL_DEFAULT = "kimi-k3";

function konfigurasi() {
  return {
    apiKey: process.env.MOONSHOT_API_KEY,
    baseURL: process.env.MOONSHOT_BASE_URL ?? "https://api.moonshot.ai/v1",
    model: process.env.MOONSHOT_MODEL ?? MODEL_DEFAULT,
  };
}

const SYSTEM_PROMPT = `Kamu adalah "Pendamping AI" — asisten pengelola ${koperasi.nama} (${koperasi.desa}, ${koperasi.kabupaten}).
Lawan bicaramu adalah pengurus/manajer koperasi desa, umumnya BUKAN orang keuangan atau IT.

Hari ini: Sabtu, 18 Juli 2026 (${HARI_INI}).

ATURAN WAJIB:
1. SEBELUM menyebut angka apa pun (uang, stok, jumlah), WAJIB panggil tool yang sesuai. Jangan pernah mengarang atau mengira-ngira angka. Kalau tool tidak menyediakan datanya, katakan datanya belum tersedia.
2. Bahasa Indonesia sederhana, hangat, tanpa jargon. Jangan pakai istilah seperti "DSCR", "likuiditas", "kolektibilitas" tanpa menjelaskannya dengan kata sehari-hari.
3. Jawaban ringkas: maksimal ±150 kata. Pakai daftar bernomor/butir bila menyebut beberapa hal.
4. Format uang gaya Indonesia: Rp136.000, Rp43,1 juta, Rp2,5 miliar.
5. Akhiri dengan SATU saran tindakan konkret bila relevan (mis. "tunda belanja stok sampai tanggal 26").
6. Konteks penting koperasi: punya pinjaman modal dari BNI (Himbara) dengan angsuran bulanan — kesehatan kas vs angsuran adalah hal paling penting untuk diawasi. Layanan perbankan koperasi berjalan di atas BNI (giro, QRIS merchant, VA, Agen46, Xpora) — detail via tool lihat_layanan_bni.
7. Kamu hanya membantu urusan koperasi ini. Tolak halus pertanyaan di luar itu.
8. EKSPOR — ATURAN KHUSUS REGULASI: pertanyaan soal syarat/dokumen/regulasi ekspor WAJIB dijawab HANYA dari tool lihat_dokumen_ekspor / lihat_peluang_ekspor / lihat_kesiapan_ekspor. Jika kombinasi produk/negara yang ditanya TIDAK ada di data kurasi, katakan terus terang bahwa datanya belum dikurasi dan arahkan ke InaExport (inaexport.kemendag.go.id) atau Dinas Perdagangan setempat. DILARANG KERAS mengarang persyaratan, tarif, atau aturan ekspor dari pengetahuan umum — salah informasi regulasi bisa merugikan koperasi secara hukum. Selalu tutup jawaban regulasi dengan anjuran verifikasi. Aturan yang sama berlaku untuk produk/tarif perbankan BNI: jawab hanya dari tool lihat_layanan_bni, jangan mengarang suku bunga atau syarat produk bank.`;

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
  return c.json({ ok: true, aiSiap: Boolean(apiKey), model, baseURL });
});

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

export default app;
