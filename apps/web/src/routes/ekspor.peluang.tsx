import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, TriangleAlert } from "lucide-react";

import { NavEkspor } from "~/components/ekspor/NavEkspor";
import { TanyaAI } from "~/components/pendamping/TanyaAI";
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

/** ambil angka pertama >= 4 digit dari teks harga, mis. "Rp180.000–250.000/kg" → 180000 */
function angkaHarga(teks: string): number | null {
  const m = teks.replace(/\./g, "").match(/(\d{4,})/);
  return m ? parseInt(m[1], 10) : null;
}

function BarHarga({
  hargaLokal,
  hargaEkspor,
  negara,
}: {
  hargaLokal: string;
  hargaEkspor: string;
  negara: string;
}) {
  const lokal = angkaHarga(hargaLokal);
  const ekspor = angkaHarga(hargaEkspor);
  if (!lokal || !ekspor) return null;
  const maks = Math.max(lokal, ekspor);
  const kali = (ekspor / lokal).toFixed(1).replace(".", ",");
  return (
    <div className="rounded-lg border border-line bg-paper p-3">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-24 shrink-0 text-[11px] text-muted">Harga lokal</span>
          <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-line-soft">
            <span
              className="block h-full rounded-full bg-muted/50"
              style={{ width: `${(lokal / maks) * 100}%` }}
            />
          </span>
          <span className="tnum w-24 shrink-0 text-right font-mono text-[11px]">
            Rp{lokal.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24 shrink-0 text-[11px] text-muted">
            Ekspor {negara}
          </span>
          <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-line-soft">
            <span
              className="block h-full rounded-full bg-hijau"
              style={{ width: `${(ekspor / maks) * 100}%` }}
            />
          </span>
          <span className="tnum w-24 shrink-0 text-right font-mono text-[11px] font-semibold text-hijau">
            Rp{ekspor.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-hijau">
        ± {kali}× harga lokal (indikatif, sebelum biaya ekspor)
      </p>
    </div>
  );
}

function HalamanPeluang() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <h1 className="font-display text-xl font-bold">Peluang Pasar Ekspor</h1>
        <p className="mt-0.5 text-sm text-muted">
          Dinilai dari katalog & stok koperasi — termasuk yang sebaiknya ditahan dulu
        </p>
      </div>

      <NavEkspor />

      <div className="flex flex-col gap-4">
        {peluangEkspor.map((p) => {
          const badge = badgePotensi[p.potensi];
          const negaraUtama = p.negaraTujuan[0];
          return (
            <Card key={p.id}>
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base">{p.komoditas}</CardTitle>
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </div>
                <TanyaAI
                  label="Tanya AI"
                  q={`Apa syarat dan potensi ekspor ${p.komoditas}? Layak tidak untuk koperasi kita?`}
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {p.potensi === "rendah" ? (
                  <p className="flex items-start gap-2 rounded-lg border border-amber/30 bg-amber-soft p-3 text-xs leading-relaxed">
                    <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-amber" />
                    {p.alasan}
                  </p>
                ) : (
                  <>
                    {negaraUtama ? (
                      <BarHarga
                        hargaLokal={p.hargaLokal}
                        hargaEkspor={negaraUtama.hargaIndikatif}
                        negara={`${negaraUtama.bendera} ${negaraUtama.negara}`}
                      />
                    ) : null}
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-medium text-muted hover:text-ink [&::-webkit-details-marker]:hidden">
                        Kenapa dinilai {badge.label.toLowerCase()}? Sumber & alasan
                        <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {p.alasan} <span className="text-ink">Sumber: {p.sumber}.</span>
                      </p>
                    </details>
                  </>
                )}

                {p.negaraTujuan.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
                    {p.negaraTujuan.map((n) => (
                      <div key={n.negara} className="rounded-lg border border-line p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold">
                            {n.bendera} {n.negara}
                          </p>
                          <p className="text-[11px] text-muted">{n.permintaan}</p>
                        </div>
                        <p className="tnum mt-1 font-mono text-xs font-semibold text-hijau">
                          {n.hargaIndikatif}
                        </p>
                        <details className="group mt-1.5">
                          <summary className="flex cursor-pointer list-none items-center gap-1 text-[11px] text-muted hover:text-ink [&::-webkit-details-marker]:hidden">
                            Syarat kunci ({n.syaratKunci.length})
                            <ChevronDown className="size-3 transition-transform group-open:rotate-180" />
                          </summary>
                          <ul className="mt-1 flex flex-col gap-0.5">
                            {n.syaratKunci.map((s) => (
                              <li key={s} className="text-[11px] text-muted">
                                • {s}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    ))}
                  </div>
                ) : null}

                <p className="text-[11px] text-muted">
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
