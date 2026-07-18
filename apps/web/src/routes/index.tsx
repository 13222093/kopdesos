import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, CalendarClock } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { InsightCard } from "~/components/insight/InsightCard";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { LABEL_GERAI, WARNA_GERAI } from "~/lib/chart";
import {
  formatRupiah,
  formatRupiahSingkat,
  formatTanggalPendek,
} from "~/lib/format";
import { daftarInsight } from "~/mocks/insight";
import { koperasi } from "~/mocks/koperasi";
import {
  penjualan90Hari,
  penjualanHariIni,
  penjualanKemarin,
  totalHari,
} from "~/mocks/penjualan";
import { pinjamanHimbara, ringkasanSimpanPinjam } from "~/mocks/pinjaman";
import { saldoKas } from "~/mocks/kas";
import { daftarProduk, stokMenipis } from "~/mocks/produk";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/")({
  component: Beranda,
});

function KpiCard({
  label,
  nilai,
  keterangan,
  arah,
}: {
  label: string;
  nilai: string;
  keterangan: string;
  arah?: "naik" | "turun" | "netral";
}) {
  return (
    <Card>
      <CardContent className="px-5 py-4">
        <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
          {label}
        </p>
        <p className="tnum mt-1.5 font-mono text-xl font-semibold">{nilai}</p>
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-[11px]",
            arah === "naik" && "text-hijau",
            arah === "turun" && "text-merah",
            (!arah || arah === "netral") && "text-muted",
          )}
        >
          {arah === "naik" ? <ArrowUpRight className="size-3" /> : null}
          {arah === "turun" ? <ArrowDownRight className="size-3" /> : null}
          {keterangan}
        </p>
      </CardContent>
    </Card>
  );
}

function TooltipPenjualan({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((t: number, p: any) => t + (p.value ?? 0), 0);
  return (
    <div className="rounded-lg border border-line bg-card px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{formatTanggalPendek(label)}</p>
      <div className="mt-1 space-y-0.5">
        {payload.toReversed().map((p: any) => (
          <p key={p.dataKey} className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ background: p.fill }}
            />
            <span className="text-muted">
              {LABEL_GERAI[p.dataKey as keyof typeof LABEL_GERAI]}
            </span>
            <span className="tnum ml-auto pl-4 font-mono">
              {formatRupiahSingkat(p.value)}
            </span>
          </p>
        ))}
        <p className="mt-1 flex items-center gap-1.5 border-t border-line-soft pt-1 font-medium">
          Total
          <span className="tnum ml-auto pl-4 font-mono">
            {formatRupiahSingkat(total)}
          </span>
        </p>
      </div>
    </div>
  );
}

function Beranda() {
  const data30 = penjualan90Hari.slice(-30);
  const totalHariIni = totalHari(penjualanHariIni);
  const totalKemarin = totalHari(penjualanKemarin);
  const deltaPersen = ((totalHariIni - totalKemarin) / totalKemarin) * 100;
  const produkMenipis = daftarProduk.filter(stokMenipis);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <h1 className="font-display text-xl font-bold">
          Selamat pagi, Bu {koperasi.manajer.split(" ")[0]} 👋
        </h1>
        <p className="mt-0.5 text-sm text-muted">
          Ringkasan {koperasi.nama} — Sabtu, 18 Juli 2026
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Penjualan hari ini"
          nilai={formatRupiahSingkat(totalHariIni)}
          keterangan={`${deltaPersen >= 0 ? "+" : ""}${deltaPersen.toLocaleString("id-ID", { maximumFractionDigits: 1 })}% dari kemarin`}
          arah={deltaPersen >= 0 ? "naik" : "turun"}
        />
        <KpiCard
          label="Saldo kas"
          nilai={formatRupiahSingkat(saldoKas)}
          keterangan="Kas + rekening koperasi"
          arah="netral"
        />
        <KpiCard
          label="Piutang anggota"
          nilai={formatRupiahSingkat(ringkasanSimpanPinjam.totalPinjamanBeredar)}
          keterangan={`${ringkasanSimpanPinjam.pinjamanMacet} macet, ${ringkasanSimpanPinjam.pinjamanPerhatian} perlu perhatian`}
          arah="turun"
        />
        <KpiCard
          label="Angsuran BRI berikutnya"
          nilai={formatRupiahSingkat(pinjamanHimbara.angsuranBulanan)}
          keterangan="Jatuh tempo 25 Jul — 7 hari lagi"
          arah="netral"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Penjualan 30 hari terakhir</CardTitle>
              <p className="mt-0.5 text-xs text-muted">
                Gabungan tiga gerai aktif, per hari
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted">
              {(Object.keys(WARNA_GERAI) as (keyof typeof WARNA_GERAI)[]).map(
                (g) => (
                  <span key={g} className="flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: WARNA_GERAI[g] }}
                    />
                    {LABEL_GERAI[g]}
                  </span>
                ),
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data30} barCategoryGap={2}>
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--color-line-soft)"
                  />
                  <XAxis
                    dataKey="tanggal"
                    tickFormatter={formatTanggalPendek}
                    interval={6}
                    tickLine={false}
                    axisLine={{ stroke: "var(--color-line)" }}
                    tick={{ fontSize: 10, fill: "var(--color-muted)" }}
                  />
                  <YAxis
                    tickFormatter={(v: number) => formatRupiahSingkat(v)}
                    tickLine={false}
                    axisLine={false}
                    width={64}
                    tick={{ fontSize: 10, fill: "var(--color-muted)" }}
                  />
                  <Tooltip
                    content={<TooltipPenjualan />}
                    cursor={{ fill: "var(--color-line-soft)" }}
                  />
                  <Bar
                    dataKey="sembako"
                    stackId="a"
                    fill={WARNA_GERAI.sembako}
                    stroke="var(--color-card)"
                    strokeWidth={1}
                  />
                  <Bar
                    dataKey="apotek"
                    stackId="a"
                    fill={WARNA_GERAI.apotek}
                    stroke="var(--color-card)"
                    strokeWidth={1}
                  />
                  <Bar
                    dataKey="gudang"
                    stackId="a"
                    fill={WARNA_GERAI.gudang}
                    stroke="var(--color-card)"
                    strokeWidth={1}
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Insight hari ini</CardTitle>
              <Badge variant="merah">3 baru</Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              {daftarInsight.slice(0, 3).map((ins) => (
                <InsightCard key={ins.id} insight={ins} ringkas />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Stok menipis</CardTitle>
            <Link
              to="/inventori"
              className="text-xs font-medium text-merah hover:underline"
            >
              Lihat inventori →
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            {produkMenipis.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.nama}</p>
                  <p className="text-[11px] text-muted">
                    {LABEL_GERAI[p.gerai as keyof typeof LABEL_GERAI] ?? p.gerai}
                  </p>
                </div>
                <p className="tnum font-mono text-sm">
                  {p.stok}{" "}
                  <span className="text-[11px] text-muted">
                    / min {p.stokMinimum} {p.satuan}
                  </span>
                </p>
                <Badge variant="amber">Menipis</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Kewajiban terdekat</CardTitle>
            <CalendarClock className="size-4 text-muted" />
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            <div className="flex items-center gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Angsuran pinjaman BRI ke-3</p>
                <p className="text-[11px] text-muted">Jatuh tempo 25 Juli 2026</p>
              </div>
              <p className="tnum font-mono text-sm font-semibold">
                {formatRupiah(pinjamanHimbara.angsuranBulanan)}
              </p>
            </div>
            <div className="flex items-center gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Gaji karyawan gerai (4 orang)</p>
                <p className="text-[11px] text-muted">Setiap tanggal 15</p>
              </div>
              <p className="tnum font-mono text-sm font-semibold">
                {formatRupiah(6_400_000)}
              </p>
            </div>
            <div className="flex items-center gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Setoran pajak & iuran</p>
                <p className="text-[11px] text-muted">Akhir bulan</p>
              </div>
              <p className="tnum font-mono text-sm font-semibold">
                {formatRupiah(1_150_000)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
