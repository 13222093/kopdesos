import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Send, UserRound } from "lucide-react";
import * as React from "react";

import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatRupiah } from "~/lib/format";
import { daftarAnggota, totalSimpanan } from "~/mocks/anggota";
import { daftarRoom, type Room } from "~/mocks/chat";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/inbox")({
  component: HalamanInbox,
});

function HalamanInbox() {
  const [aktifId, setAktifId] = React.useState<string>(daftarRoom[0].id);
  const room = daftarRoom.find((r) => r.id === aktifId) as Room;
  const anggota = daftarAnggota.find((a) => a.id === room.anggotaId);

  return (
    <div className="mx-auto flex h-[calc(100dvh-7.5rem)] max-w-6xl flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold">Inbox WhatsApp</h1>
          <p className="mt-0.5 text-sm text-muted">
            Nomor koperasi terhubung · agent AI membalas otomatis 24 jam
          </p>
        </div>
        <Badge variant="hijau">● Tersambung</Badge>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-xl border border-line bg-card md:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_260px]">
        {/* Daftar percakapan */}
        <div className="hidden min-h-0 flex-col overflow-y-auto border-r border-line md:flex">
          {daftarRoom.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setAktifId(r.id)}
              className={cn(
                "flex items-start gap-2.5 border-b border-line-soft px-3.5 py-3 text-left transition-colors hover:bg-paper",
                r.id === aktifId && "bg-merah-soft/50",
              )}
            >
              <Avatar nama={r.namaKontak} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold">
                    {r.namaKontak}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted">{r.jamTerakhir}</span>
                </span>
                <span className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {r.cuplikan}
                </span>
                <span className="mt-1 flex items-center gap-1.5">
                  {r.label ? <Badge variant="garis">{r.label}</Badge> : null}
                  {r.belumDibaca > 0 ? (
                    <span className="ml-auto flex size-4.5 items-center justify-center rounded-full bg-merah text-[10px] font-semibold text-white">
                      {r.belumDibaca}
                    </span>
                  ) : null}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Thread chat */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
            <Avatar nama={room.namaKontak} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{room.namaKontak}</p>
              <p className="tnum font-mono text-[11px] text-muted">{room.telepon}</p>
            </div>
            <Badge variant="hijau">
              <Bot className="size-3" /> AI aktif
            </Badge>
            <Button variant="secondary" size="sm">
              Ambil alih
            </Button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto bg-line-soft/60 p-4">
            {room.pesan.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "max-w-[78%] rounded-xl px-3 py-2 text-[13px] leading-relaxed shadow-sm",
                  p.dari === "anggota"
                    ? "self-start rounded-tl-sm bg-card"
                    : "self-end rounded-tr-sm bg-wa-bubble",
                )}
              >
                {p.dari !== "anggota" ? (
                  <p className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold text-wa">
                    {p.dari === "ai" ? (
                      <>
                        <Bot className="size-3" /> Agent AI Koperasi
                      </>
                    ) : (
                      <>
                        <UserRound className="size-3" /> Petugas
                      </>
                    )}
                  </p>
                ) : null}
                <p>{p.teks}</p>
                <p className="mt-1 text-right text-[10px] text-muted/70">{p.jam}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-line p-3">
            <Input placeholder="Tulis balasan sebagai petugas…" />
            <Button size="icon">
              <Send />
              <span className="sr-only">Kirim</span>
            </Button>
          </div>
        </div>

        {/* Panel info anggota */}
        <div className="hidden min-h-0 flex-col overflow-y-auto border-l border-line xl:flex">
          <div className="border-b border-line px-4 py-3">
            <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
              Info anggota
            </p>
          </div>
          {anggota ? (
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-center gap-2.5">
                <Avatar nama={anggota.nama} className="size-10" />
                <div className="min-w-0">
                  <Link
                    to="/anggota/$anggotaId"
                    params={{ anggotaId: anggota.id }}
                    className="block truncate text-sm font-semibold hover:underline"
                  >
                    {anggota.nama}
                  </Link>
                  <p className="tnum font-mono text-[11px] text-muted">{anggota.id}</p>
                </div>
              </div>
              <div className="rounded-lg border border-line p-3">
                <p className="text-[10px] font-semibold text-muted uppercase">
                  Total simpanan
                </p>
                <p className="tnum mt-0.5 font-mono text-sm font-semibold">
                  {formatRupiah(totalSimpanan(anggota))}
                </p>
              </div>
              <div className="rounded-lg border border-line p-3">
                <p className="text-[10px] font-semibold text-muted uppercase">
                  Belanja 90 hari
                </p>
                <p className="tnum mt-0.5 font-mono text-sm font-semibold">
                  {formatRupiah(anggota.belanja90Hari)}
                </p>
              </div>
              <div className="rounded-lg border border-line p-3 text-xs leading-relaxed text-muted">
                {anggota.dusun} · {anggota.pekerjaan}. Anggota sejak{" "}
                {anggota.tanggalGabung.slice(0, 4)}.
              </div>
            </div>
          ) : (
            <p className="p-4 text-xs text-muted">
              Kontak ini belum terdaftar sebagai anggota.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
