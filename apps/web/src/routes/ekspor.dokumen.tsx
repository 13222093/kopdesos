import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheck, CircleDashed, CircleX } from "lucide-react";
import * as React from "react";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  checklistKombinasi,
  DISCLAIMER_EKSPOR,
  dokumenPerPengiriman,
  legalitasDasar,
  type StatusDokumen,
} from "~/mocks/ekspor";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/ekspor/dokumen")({
  component: HalamanDokumen,
});

function IkonStatus({ status }: { status: StatusDokumen }) {
  if (status === "siap") return <CircleCheck className="size-4 text-hijau" />;
  if (status === "diurus") return <CircleDashed className="size-4 text-amber" />;
  return <CircleX className="size-4 text-muted/40" />;
}

const labelStatus: Record<StatusDokumen, { label: string; variant: "hijau" | "amber" | "netral" }> = {
  siap: { label: "Siap", variant: "hijau" },
  diurus: { label: "Sedang diurus", variant: "amber" },
  belum: { label: "Belum", variant: "netral" },
};

function HalamanDokumen() {
  const [terpilih, setTerpilih] = React.useState(0);
  const kombinasi = checklistKombinasi[terpilih];
  const siapLegalitas = legalitasDasar.filter((d) => d.status === "siap").length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">Dokumen & Regulasi Ekspor</h1>
          <p className="mt-0.5 text-sm text-muted">
            Checklist bertingkat: legalitas dasar → per pengiriman → per produk & negara
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link to="/ekspor" className="font-medium text-merah hover:underline">
            ← Kesiapan
          </Link>
          <Link to="/ekspor/peluang" className="font-medium text-merah hover:underline">
            ← Peluang Pasar
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>A · Legalitas dasar (sekali urus)</CardTitle>
            <Badge variant={siapLegalitas === legalitasDasar.length ? "hijau" : "amber"}>
              {siapLegalitas}/{legalitasDasar.length} siap
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            {legalitasDasar.map((d) => (
              <div key={d.nama} className="flex items-start gap-2.5 py-2.5">
                <span className="mt-0.5">
                  <IkonStatus status={d.status} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium">{d.nama}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{d.keterangan}</p>
                </div>
                <Badge variant={labelStatus[d.status].variant}>
                  {labelStatus[d.status].label}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>B · Dokumen per pengiriman</CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              Dibuat setiap kali ekspor — bukan sekali urus
            </p>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            {dokumenPerPengiriman.map((d) => (
              <div key={d.nama} className="py-2.5">
                <p className="text-[13px] font-medium">{d.nama}</p>
                <p className="mt-0.5 text-[11px] text-muted">{d.keterangan}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>C · Checklist per produk × negara tujuan</CardTitle>
          <p className="mt-0.5 text-xs text-muted">
            Pilih kombinasi yang sudah dikurasi — dokumen & tempat mengurusnya berbeda-beda
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {checklistKombinasi.map((k, i) => (
              <button
                key={`${k.komoditas}-${k.negara}`}
                type="button"
                onClick={() => setTerpilih(i)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  i === terpilih
                    ? "border-merah bg-merah-soft text-merah"
                    : "border-line text-muted hover:border-merah/40 hover:text-ink",
                )}
              >
                {k.komoditas} → {k.negara}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-line bg-paper p-3 text-xs">
            <p>
              <span className="font-semibold">HS Code:</span>{" "}
              <span className="tnum font-mono">{kombinasi.hsCode}</span>
            </p>
            <p className="mt-1 leading-relaxed text-muted">{kombinasi.catatan}</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Dokumen</TableHead>
                <TableHead>Tempat mengurus</TableHead>
                <TableHead>Estimasi</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kombinasi.dokumen.map((d) => (
                <TableRow key={d.nama}>
                  <TableCell className="font-medium">{d.nama}</TableCell>
                  <TableCell className="text-muted">{d.tempatUrus}</TableCell>
                  <TableCell className="text-muted">{d.estimasi}</TableCell>
                  <TableCell>
                    <Badge variant={labelStatus[d.status].variant}>
                      {labelStatus[d.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-[11px] text-muted/80">{DISCLAIMER_EKSPOR}</p>
    </div>
  );
}
