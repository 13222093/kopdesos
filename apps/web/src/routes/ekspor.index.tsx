import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, CircleDashed, CircleCheck, ExternalLink } from "lucide-react";

import { GaugeSkor } from "~/components/ekspor/GaugeSkor";
import { GambarSlot } from "~/components/ui/GambarSlot";
import { NavEkspor } from "~/components/ekspor/NavEkspor";
import { TanyaAI } from "~/components/pendamping/TanyaAI";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import {
  DISCLAIMER_EKSPOR,
  kesiapanEkspor,
  programPendampingan,
} from "~/mocks/ekspor";

export const Route = createFileRoute("/ekspor/")({
  component: HalamanKesiapan,
});

const warnaStatus = {
  baik: "bg-hijau",
  cukup: "bg-amber",
  kurang: "bg-merah",
} as const;

function HalamanKesiapan() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <h1 className="font-display text-xl font-bold">Kesiapan Ekspor</h1>
        <p className="mt-0.5 text-sm text-muted">
          Dinilai otomatis dari data koperasi
        </p>
      </div>

      <NavEkspor />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center px-5 py-6 text-center">
            <GaugeSkor skor={kesiapanEkspor.skorTotal} />
            <Badge variant="amber" className="mt-3">
              {kesiapanEkspor.label}
            </Badge>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Siap masuk program pendampingan dalam 6–12 bulan
            </p>
            <TanyaAI
              label="Bagaimana menaikkan skor?"
              q="Bagaimana cara menaikkan skor kesiapan ekspor koperasi kita? Mulai dari mana?"
              className="mt-3"
            />
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>5 dimensi penilaian</CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              Klik dimensi untuk detail dan cara menaikkannya
            </p>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            {kesiapanEkspor.dimensi.map((d) => (
              <details key={d.nama} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                  <span className="w-40 shrink-0 text-sm font-medium">{d.nama}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-soft">
                    <span
                      className={cn("block h-full rounded-full", warnaStatus[d.status])}
                      style={{ width: `${d.skor}%` }}
                    />
                  </span>
                  <span className="tnum w-8 text-right font-mono text-sm font-semibold">
                    {d.skor}
                  </span>
                  <ChevronDown className="size-3.5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 ml-0 rounded-lg bg-paper p-3 text-xs leading-relaxed text-muted">
                  {d.ringkasan}{" "}
                  <span className="font-medium text-ink">→ {d.caraMenaikkan}</span>
                </div>
              </details>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Langkah berikutnya</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            {kesiapanEkspor.langkahBerikutnya.map((l, i) => (
              <details key={l.aksi} className="group py-1.5">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 py-1 [&::-webkit-details-marker]:hidden">
                  {l.status === "berjalan" ? (
                    <CircleDashed className="size-4 shrink-0 text-amber" />
                  ) : (
                    <CircleCheck className="size-4 shrink-0 text-muted/40" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                    {i + 1}. {l.aksi}
                  </span>
                  <Badge variant={l.status === "berjalan" ? "amber" : "netral"}>
                    {l.status === "berjalan" ? "Berjalan" : "Belum"}
                  </Badge>
                  <ChevronDown className="size-3.5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-1 ml-6.5 pb-1 text-[11px] text-muted">{l.dampak}</p>
              </details>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Program pendampingan</CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              Kopdes tidak perlu ekspor sendirian
            </p>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            {programPendampingan.map((p) => (
              <details key={p.nama} className="group py-1.5">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 py-1 [&::-webkit-details-marker]:hidden">
                  <GambarSlot
                    src={p.logo}
                    alt={p.nama}
                    fallback={
                      <span className="text-[11px] font-bold text-muted">
                        {p.nama[0]}
                      </span>
                    }
                    className="size-7 rounded-lg border border-line bg-card object-contain p-1"
                  />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
                    {p.nama}
                  </span>
                  <Badge variant="garis" className="max-w-36 truncate">
                    {p.penyelenggara}
                  </Badge>
                  <Badge variant="netral">{p.status}</Badge>
                  <ChevronDown className="size-3.5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-1 rounded-lg bg-paper p-3 text-[11px] leading-relaxed text-muted">
                  {p.deskripsi}
                  <p className="mt-1">
                    <span className="font-medium text-hijau">Kenapa cocok:</span>{" "}
                    {p.cocokKarena}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 font-medium text-merah hover:underline"
                  >
                    Pelajari program <ExternalLink className="size-3" />
                  </a>
                </div>
              </details>
            ))}
          </CardContent>
        </Card>
      </div>

      <p className="text-[11px] text-muted/80">{DISCLAIMER_EKSPOR}</p>
    </div>
  );
}
