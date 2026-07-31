import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { Send, Sparkles } from "lucide-react";
import * as React from "react";

import {
  IsiMarkdown,
  jawabScripted,
  pertanyaanCepatLengkap,
  SAPAAN_AWAL,
  type PesanLokal,
} from "~/components/pendamping/shared";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/pendamping")({
  component: HalamanPendamping,
});

function HalamanPendamping() {
  const [teks, setTeks] = React.useState("");
  const [modeAi, setModeAi] = React.useState<boolean | null>(null);
  const [pesanScripted, setPesanScripted] = React.useState<PesanLokal[]>([]);
  const ujungRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/pendamping" }),
  });

  React.useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setModeAi(Boolean(d.aiSiap)))
      .catch(() => setModeAi(false));
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (error) setModeAi(false);
  }, [error]);

  const sedangMengetik = status === "submitted" || status === "streaming";

  React.useEffect(() => {
    ujungRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pesanScripted, sedangMengetik]);

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
    <div className="mx-auto flex h-[calc(100dvh-7.5rem)] max-w-3xl flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-merah text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">Pendamping AI</h1>
            <p className="text-xs text-muted">
              Membaca data koperasi langsung, menjawab dengan bahasa sederhana
            </p>
          </div>
        </div>
        {modeAi === false ? (
          <Badge variant="netral">Mode demo</Badge>
        ) : (
          <Badge variant="hijau">● Kimi K2 tersambung</Badge>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-card">
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-paper p-4 md:p-5">
          <div className="max-w-[80%] self-start rounded-2xl rounded-tl-md border border-line bg-card px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm">
            {SAPAAN_AWAL}
          </div>

          {pesanScripted.map((p) => (
            <div
              key={p.id}
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm",
                p.dari === "ai"
                  ? "self-start rounded-tl-md border border-line bg-card"
                  : "self-end rounded-tr-md bg-merah text-white",
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
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  m.role === "assistant"
                    ? "self-start rounded-tl-md border border-line bg-card"
                    : "self-end rounded-tr-md bg-merah whitespace-pre-line text-white",
                )}
              >
                {m.role === "assistant" ? <IsiMarkdown teks={isi} /> : isi}
              </div>
            );
          })}

          {sedangMengetik ? (
            <div className="flex items-center gap-2 self-start rounded-2xl border border-line bg-card px-4 py-3 text-sm text-muted">
              <Sparkles className="size-3.5 animate-pulse" />
              {status === "submitted" ? "membaca data koperasi…" : "sedang mengetik…"}
            </div>
          ) : null}
          <div ref={ujungRef} />
        </div>

        <div className="border-t border-line bg-card p-3.5">
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {pertanyaanCepatLengkap.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => kirim(q)}
                className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-merah/40 hover:bg-merah-soft hover:text-merah"
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
              ref={inputRef}
              className="h-11 flex-1 rounded-xl border border-line bg-paper px-4 text-sm placeholder:text-muted/70"
              placeholder="Tanya apa saja soal koperasi — penjualan, stok, cicilan, ekspor…"
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
            />
            <button
              type="submit"
              className="flex size-11 items-center justify-center rounded-xl bg-merah text-white hover:bg-merah-dark disabled:opacity-50"
              disabled={!teks.trim() || sedangMengetik}
            >
              <Send className="size-4" />
              <span className="sr-only">Kirim</span>
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted/70">
            Semua angka diambil langsung dari data koperasi — Pendamping tidak
            pernah mengarang angka atau aturan.
          </p>
        </div>
      </div>
    </div>
  );
}
