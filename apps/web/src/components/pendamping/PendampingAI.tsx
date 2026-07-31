import { useChat } from "@ai-sdk/react";
import { useRouterState } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { Send, Sparkles, X } from "lucide-react";
import * as React from "react";

import {
  IsiMarkdown,
  jawabScripted,
  pertanyaanCepat,
  SAPAAN_AWAL,
  type PesanLokal,
} from "~/components/pendamping/shared";
import { cn } from "~/lib/utils";

export function PendampingAI() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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

  // di halaman /pendamping sudah ada chat layar penuh — sembunyikan panel
  if (pathname.startsWith("/pendamping")) return null;

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
