import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Sparkles, X } from "lucide-react";
import * as React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "~/lib/utils";

/** Render markdown jawaban AI (bold, daftar, tabel) dengan gaya bubble */
function IsiMarkdown({ teks }: { teks: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => <p className="mb-1.5 last:mb-0" {...props} />,
        strong: ({ node, ...props }) => (
          <strong className="font-semibold" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="mb-1.5 list-decimal pl-4 last:mb-0" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-1.5 list-disc pl-4 last:mb-0" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-merah underline" target="_blank" rel="noreferrer" {...props} />
        ),
        code: ({ node, ...props }) => (
          <code className="rounded bg-line-soft px-1 font-mono text-[12px]" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="mb-1.5 overflow-x-auto">
            <table className="w-full border-collapse text-[12px]" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="border-b border-line px-1.5 py-1 text-left font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border-b border-line-soft px-1.5 py-1 align-top" {...props} />
        ),
      }}
    >
      {teks}
    </Markdown>
  );
}

const SAPAAN_AWAL =
  "Selamat pagi Bu Sari 🙏 Ringkasan pagi ini:\n\n• Penjualan kemarin Rp4,6 jt (naik 9% dari rata-rata Jumat)\n• Saldo kas Rp128,4 jt\n• Angsuran BRI Rp43,1 jt jatuh tempo 7 hari lagi (25 Juli)\n• 3 barang laris hampir habis — beras premium, minyak 1 L, gas LPG\n\nAda yang mau ditanyakan? Saya bisa jelaskan angka mana pun dengan bahasa sederhana.";

const pertanyaanCepat = [
  "Berapa untung minggu ini?",
  "Kas cukup untuk bayar cicilan?",
  "Apakah koperasi kita siap ekspor?",
  "Bagaimana pinjaman yang macet?",
];

/** Jawaban scripted — fallback saat MOONSHOT_API_KEY belum diatur / API error */
function jawabScripted(pertanyaan: string): string {
  const q = pertanyaan.toLowerCase();
  if (q.includes("untung") || q.includes("penjualan") || q.includes("omzet")) {
    return "Penjualan 7 hari terakhir totalnya sekitar Rp31,4 jt. Setelah dikurangi harga beli barang, untung kotornya kira-kira Rp3,4 jt (11%).\n\nYang paling laku: beras premium, minyak goreng, dan mie instan.";
  }
  if (q.includes("kas") || q.includes("cicilan") || q.includes("angsuran") || q.includes("bayar")) {
    return "Cukup, tapi harus hati-hati. Saldo kas sekarang Rp128,4 jt. Angsuran BRI tanggal 25 Juli besarnya Rp43,1 jt.\n\nSetelah bayar angsuran dan gaji, sisa kas kira-kira Rp71 jt. Saran saya: belanja stok bulan ini jangan lebih dari Rp40 jt.";
  }
  if (q.includes("stok") || q.includes("beli") || q.includes("barang")) {
    return "Ada beberapa barang yang perlu segera dipesan: beras premium (sisa 12 sak), minyak goreng 1 L (8 botol), gas LPG 3 kg (6 tabung), oralit (9 sachet), dan bawang merah (14 kg).\n\nPerkiraan biaya pesan semuanya sekitar Rp4,2 jt.";
  }
  if (q.includes("macet") || q.includes("pinjaman") || q.includes("piutang")) {
    return "Dari 12 pinjaman anggota, 1 macet (Pak Ketut Suardana, Rp4,95 jt, telat 38 hari) dan 2 perlu perhatian. Total piutang beredar Rp83,1 jt.\n\nSaran: kunjungi Pak Ketut langsung minggu ini, jangan hanya kirim pesan.";
  }
  return "Ini mode demo (AI belum tersambung — MOONSHOT_API_KEY belum diatur). Saya baru bisa menjawab soal penjualan, kas & cicilan, stok, dan pinjaman anggota.\n\nSetelah AI tersambung, saya membaca seluruh data koperasi dan bisa menjawab pertanyaan apa pun.";
}

type PesanLokal = { id: string; dari: "ai" | "saya"; teks: string };

export function PendampingAI() {
  const [buka, setBuka] = React.useState(false);
  const [teks, setTeks] = React.useState("");
  const [modeAi, setModeAi] = React.useState<boolean | null>(null); // null = belum dicek
  const [pesanScripted, setPesanScripted] = React.useState<PesanLokal[]>([]);
  const ujungRef = React.useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/pendamping" }),
  });

  // cek sekali apakah AI tersambung
  React.useEffect(() => {
    if (!buka || modeAi !== null) return;
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setModeAi(Boolean(d.aiSiap)))
      .catch(() => setModeAi(false));
  }, [buka, modeAi]);

  // kalau AI error di tengah jalan, jatuh ke mode scripted
  React.useEffect(() => {
    if (error) setModeAi(false);
  }, [error]);

  const sedangMengetik = status === "submitted" || status === "streaming";

  React.useEffect(() => {
    ujungRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pesanScripted, sedangMengetik, buka]);

  function kirim(isi: string) {
    const bersih = isi.trim();
    if (!bersih || sedangMengetik) return;
    setTeks("");
    if (modeAi) {
      sendMessage({ text: bersih });
    } else {
      setPesanScripted((p) => [
        ...p,
        { id: `${p.length}-q`, dari: "saya", teks: bersih },
        { id: `${p.length}-a`, dari: "ai", teks: jawabScripted(bersih) },
      ]);
    }
  }

  function teksDariPesan(m: (typeof messages)[number]): string {
    return m.parts
      .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
      .map((p) => p.text)
      .join("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setBuka((b) => !b)}
        className={cn(
          "fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-merah px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] hover:bg-merah-dark",
          buka && "scale-0",
        )}
      >
        <Sparkles className="size-4" />
        Pendamping
        <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-hijau" />
      </button>

      <div
        className={cn(
          "fixed right-5 bottom-5 z-50 flex h-[540px] max-h-[calc(100dvh-6rem)] w-[380px] max-w-[calc(100vw-2.5rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl transition-all",
          buka ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0",
        )}
      >
        <div className="flex items-center gap-2.5 border-b border-line bg-merah px-4 py-3 text-white">
          <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
            <Sparkles className="size-4" />
          </span>
          <div className="flex-1">
            <p className="font-display text-sm font-semibold">Pendamping AI</p>
            <p className="text-[11px] text-white/80">
              {modeAi === false
                ? "Mode demo (AI belum tersambung)"
                : "Kimi K2 · membaca data koperasi langsung"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBuka(false)}
            className="rounded-md p-1 hover:bg-white/15"
          >
            <X className="size-4" />
            <span className="sr-only">Tutup</span>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto bg-paper p-3.5">
          <div className="max-w-[85%] self-start rounded-xl rounded-tl-sm border border-line bg-card px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line shadow-sm">
            {SAPAAN_AWAL}
          </div>

          {pesanScripted.map((p) => (
            <div
              key={p.id}
              className={cn(
                "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line shadow-sm",
                p.dari === "ai"
                  ? "self-start rounded-tl-sm border border-line bg-card"
                  : "self-end rounded-tr-sm bg-merah text-white",
              )}
            >
              {p.teks}
            </div>
          ))}

          {messages.map((m) => {
            const isi = teksDariPesan(m);
            if (!isi) return null;
            return (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed shadow-sm",
                  m.role === "assistant"
                    ? "self-start rounded-tl-sm border border-line bg-card"
                    : "self-end rounded-tr-sm bg-merah whitespace-pre-line text-white",
                )}
              >
                {m.role === "assistant" ? <IsiMarkdown teks={isi} /> : isi}
              </div>
            );
          })}

          {sedangMengetik ? (
            <div className="flex items-center gap-1.5 self-start rounded-xl border border-line bg-card px-3 py-2 text-xs text-muted">
              <Sparkles className="size-3 animate-pulse" />
              {status === "submitted" ? "membaca data koperasi…" : "sedang mengetik…"}
            </div>
          ) : null}
          <div ref={ujungRef} />
        </div>

        <div className="border-t border-line bg-card p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {pertanyaanCepat.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => kirim(q)}
                className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-merah/40 hover:bg-merah-soft hover:text-merah"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              kirim(teks);
            }}
          >
            <input
              className="h-9 flex-1 rounded-lg border border-line bg-paper px-3 text-sm placeholder:text-muted/70"
              placeholder="Tanya apa saja soal koperasi…"
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
            />
            <button
              type="submit"
              className="flex size-9 items-center justify-center rounded-lg bg-merah text-white hover:bg-merah-dark disabled:opacity-50"
              disabled={!teks.trim() || sedangMengetik}
            >
              <Send className="size-4" />
              <span className="sr-only">Kirim</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
