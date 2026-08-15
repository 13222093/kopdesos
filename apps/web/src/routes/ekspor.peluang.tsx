import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Newspaper, TriangleAlert, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

import { NavEkspor } from "~/components/ekspor/NavEkspor";
import { TanyaAI } from "~/components/pendamping/TanyaAI";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatTanggalPendek } from "~/lib/format";
import { DISCLAIMER_EKSPOR, peluangEkspor } from "~/mocks/ekspor";
import {
  DISCLAIMER_PASAR,
  implikasiKurs,
  kabarPasar,
  kursValas,
  trenKopiDunia,
} from "~/mocks/pasar";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/ekspor/peluang")({
  component: HalamanPeluang,
});

const badgePotensi = {
  tinggi: { variant: "hijau" as const, label: "Potensi Tinggi" },
  menengah: { variant: "amber" as const, label: "Potensi Menengah" },
  rendah: { variant: "merah" as const, label: "Tahan Dulu" },
};

const badgeDampak = {
  peluang: { variant: "hijau" as const, label: "Peluang" },
  perhatian: { variant: "amber" as const, label: "Perhatian" },
  info: { variant: "netral" as const, label: "Info" },
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

function PanelPasar() {
  const dataSpark = trenKopiDunia.seri.map((v, i) => ({ i, v }));
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Kurs & Pasar Hari Ini</CardTitle>
          <p className="mt-0.5 text-xs text-muted">18 Juli 2026 · kurs tengah</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {kursValas.map((k) => (
              <div key={k.pasangan} className="rounded-lg border border-line p-2.5">
                <p className="text-[10px] font-semibold text-muted uppercase">
                  {k.pasangan}
                </p>
                <p className="tnum mt-0.5 font-mono text-sm font-semibold">
                  {k.nilai.toLocaleString("id-ID")}
                </p>
                <p className="tnum mt-0.5 font-mono text-[10px] text-hijau">
                  ▲ {k.perubahanSebulanPersen.toLocaleString("id-ID")}% / bln
                </p>
              </div>
            ))}
          </div>
          <p className="rounded-lg bg-hijau-soft p-2.5 text-[11px] leading-relaxed text-ink">
            {implikasiKurs}
          </p>

          <div className="rounded-lg border border-line p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium">{trenKopiDunia.label}</p>
              <Badge variant="hijau">
                <TrendingUp className="size-3" /> +
                {trenKopiDunia.perubahanSetahunPersen}% setahun
              </Badge>
            </div>
            <div className="mt-2 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataSpark}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-hijau)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="tnum mt-1 flex justify-between font-mono text-[10px] text-muted">
              <span>{trenKopiDunia.bulanAwal}</span>
              <span className="font-semibold text-ink">
                {trenKopiDunia.satuan} {trenKopiDunia.nilaiKini.toFixed(2).replace(".", ",")}
              </span>
              <span>{trenKopiDunia.bulanAkhir}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="size-4 text-muted" /> Kabar Pasar
          </CardTitle>
          <TanyaAI
            label="Tanya AI"
            q="Apa arti kurs dan kabar pasar terbaru untuk rencana ekspor kopi kita?"
          />
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-line-soft">
          {kabarPasar.map((b) => (
            <div key={b.judul} className="py-2.5">
              <div className="flex items-center gap-2">
                <span className="tnum font-mono text-[10px] text-muted">
                  {formatTanggalPendek(b.tanggal)} · {b.sumber}
                </span>
                <Badge variant={badgeDampak[b.dampak].variant}>
                  {badgeDampak[b.dampak].label}
                </Badge>
              </div>
              <p className="mt-1 text-[13px] leading-snug font-medium">{b.judul}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                {b.ringkas}
              </p>
            </div>
          ))}
          <p className="pt-2.5 text-[10px] text-muted/70">{DISCLAIMER_PASAR}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function HalamanPeluang() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <h1 className="font-display text-xl font-bold">Peluang Pasar Ekspor</h1>
        <p className="mt-0.5 text-sm text-muted">
          Dinilai dari katalog & stok koperasi, dipadukan kurs dan kabar pasar
        </p>
      </div>

      <NavEkspor />

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          {peluangEkspor.map((p) => {
            const badge = badgePotensi[p.potensi];
            const negaraUtama = p.negaraTujuan[0];
            const beritaTerkait = kabarPasar.filter((b) =>
              b.komoditas.includes(p.id),
            );
            return (
              <Card key={p.id}>
                <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{p.komoditas}</CardTitle>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                    {beritaTerkait.length > 0 ? (
                      <Badge variant="garis">
                        <Newspaper className="size-3" /> {beritaTerkait.length} kabar
                      </Badge>
                    ) : null}
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

        <PanelPasar />
      </div>

      <p className="text-[11px] text-muted/80">{DISCLAIMER_EKSPOR}</p>
    </div>
  );
}
