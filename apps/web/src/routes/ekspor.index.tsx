import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CircleCheck, CircleDashed, ExternalLink, Rocket } from "lucide-react";

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
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">Kesiapan Ekspor</h1>
          <p className="mt-0.5 text-sm text-muted">
            Dinilai otomatis dari data koperasi — bukan kuesioner kosong
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link to="/ekspor/peluang" className="font-medium text-merah hover:underline">
            Peluang Pasar →
          </Link>
          <Link to="/ekspor/dokumen" className="font-medium text-merah hover:underline">
            Dokumen & Regulasi →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center px-5 py-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-merah-soft text-merah">
              <Rocket className="size-6" />
            </span>
            <p className="tnum mt-3 font-mono text-5xl font-bold">
              {kesiapanEkspor.skorTotal}
              <span className="text-lg font-normal text-muted">/100</span>
            </p>
            <Badge variant="amber" className="mt-2">
              {kesiapanEkspor.label}
            </Badge>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {kesiapanEkspor.keterangan}
            </p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>5 dimensi penilaian</CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              Skor dihitung dari data legalitas, katalog, stok, dan keuangan yang
              sudah tercatat di platform
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3.5">
            {kesiapanEkspor.dimensi.map((d) => (
              <div key={d.nama}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{d.nama}</p>
                  <p className="tnum font-mono text-sm font-semibold">{d.skor}</p>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line-soft">
                  <div
                    className={cn("h-full rounded-full", warnaStatus[d.status])}
                    style={{ width: `${d.skor}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">
                  {d.ringkasan}{" "}
                  <span className="text-ink">
                    <ArrowUpRight className="inline size-3 text-hijau" />{" "}
                    {d.caraMenaikkan}
                  </span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Langkah berikutnya</CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              Urutan aksi yang paling menaikkan skor
            </p>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            {kesiapanEkspor.langkahBerikutnya.map((l, i) => (
              <div key={l.aksi} className="flex items-start gap-2.5 py-2.5">
                {l.status === "berjalan" ? (
                  <CircleDashed className="mt-0.5 size-4 shrink-0 text-amber" />
                ) : (
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-muted/40" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug font-medium">
                    {i + 1}. {l.aksi}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">{l.dampak}</p>
                </div>
                <Badge variant={l.status === "berjalan" ? "amber" : "netral"}>
                  {l.status === "berjalan" ? "Berjalan" : "Belum"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Program pendampingan pemerintah</CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              Kopdes tidak perlu ekspor sendirian — masuk lewat jalur resmi ini
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {programPendampingan.map((p) => (
              <div key={p.nama} className="rounded-lg border border-line p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{p.nama}</p>
                  <Badge variant="garis">{p.penyelenggara}</Badge>
                  <Badge variant="netral">{p.status}</Badge>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  {p.deskripsi}
                </p>
                <p className="mt-1 text-[11px]">
                  <span className="font-medium text-hijau">Kenapa cocok:</span>{" "}
                  <span className="text-muted">{p.cocokKarena}</span>
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-merah hover:underline"
                >
                  Pelajari program <ExternalLink className="size-3" />
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <p className="text-[11px] text-muted/80">{DISCLAIMER_EKSPOR}</p>
    </div>
  );
}
