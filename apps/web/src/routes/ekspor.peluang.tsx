import { createFileRoute, Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DISCLAIMER_EKSPOR, peluangEkspor } from "~/mocks/ekspor";

export const Route = createFileRoute("/ekspor/peluang")({
  component: HalamanPeluang,
});

const badgePotensi = {
  tinggi: { variant: "hijau" as const, label: "Potensi Tinggi" },
  menengah: { variant: "amber" as const, label: "Potensi Menengah" },
  rendah: { variant: "merah" as const, label: "Tahan Dulu" },
};

function HalamanPeluang() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">Peluang Pasar Ekspor</h1>
          <p className="mt-0.5 text-sm text-muted">
            Dinilai dari katalog & stok koperasi — termasuk yang{" "}
            <span className="font-medium text-ink">sebaiknya tidak diekspor dulu</span>
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link to="/ekspor" className="font-medium text-merah hover:underline">
            ← Kesiapan
          </Link>
          <Link to="/ekspor/dokumen" className="font-medium text-merah hover:underline">
            Dokumen & Regulasi →
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {peluangEkspor.map((p) => {
          const badge = badgePotensi[p.potensi];
          return (
            <Card key={p.id}>
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{p.komoditas}</CardTitle>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{p.sumber}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-muted">Harga lokal</p>
                  <p className="tnum font-mono font-semibold">{p.hargaLokal}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className={
                    p.potensi === "rendah"
                      ? "flex items-start gap-2 rounded-lg border border-amber/30 bg-amber-soft p-3 text-xs leading-relaxed"
                      : "text-xs leading-relaxed text-muted"
                  }
                >
                  {p.potensi === "rendah" ? (
                    <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-amber" />
                  ) : null}
                  {p.alasan}
                </p>

                {p.negaraTujuan.length > 0 ? (
                  <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
                    {p.negaraTujuan.map((n) => (
                      <div key={n.negara} className="rounded-lg border border-line p-3">
                        <p className="text-sm font-semibold">
                          {n.bendera} {n.negara}
                        </p>
                        <p className="tnum mt-1 font-mono text-xs font-semibold text-hijau">
                          {n.hargaIndikatif}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted">{n.permintaan}</p>
                        <ul className="mt-1.5 flex flex-col gap-0.5">
                          {n.syaratKunci.map((s) => (
                            <li key={s} className="text-[11px] text-muted">
                              • {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}

                <p className="mt-2.5 text-[11px] text-muted">
                  Volume tersedia:{" "}
                  <span className="tnum font-mono font-medium text-ink">
                    {p.volumeTersedia}
                  </span>{" "}
                  ·{" "}
                  <Link to="/inventori" className="text-merah hover:underline">
                    lihat stok →
                  </Link>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-[11px] text-muted/80">{DISCLAIMER_EKSPOR}</p>
    </div>
  );
}
