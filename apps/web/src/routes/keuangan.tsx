import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Landmark } from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { LogoBni } from "~/components/bni/LogoBni";
import { WARNA_KAS } from "~/lib/chart";
import { formatRupiah, formatRupiahSingkat, formatTanggal } from "~/lib/format";
import { entriKas, proyeksiKas, saldoKas } from "~/mocks/kas";
import { pinjamanHimbara } from "~/mocks/pinjaman";

export const Route = createFileRoute("/keuangan")({
  component: HalamanKeuangan,
});

const dataProyeksi = proyeksiKas.map((p) => ({
  bulan: p.bulan,
  netKas: p.kasMasuk - p.kasKeluar,
  angsuran: p.angsuran,
}));

function TooltipProyeksi({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-card px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{label} 2026</p>
      <div className="mt-1 space-y-0.5">
        {payload.map((p: any) => (
          <p key={p.dataKey} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: p.fill }} />
            <span className="text-muted">
              {p.dataKey === "netKas" ? "Sisa kas operasional" : "Angsuran BNI"}
            </span>
            <span className="tnum ml-auto pl-4 font-mono">
              {formatRupiahSingkat(p.value)}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

type JenisLaporan = "neraca" | "phu" | "arus-kas";

const isiLaporan: Record<JenisLaporan, { judul: string; baris: [string, number][] }> = {
  neraca: {
    judul: "Laporan Posisi Keuangan (Neraca) — per 30 Juni 2026",
    baris: [
      ["Kas dan setara kas", 128_400_000],
      ["Piutang pinjaman anggota", 83_120_000],
      ["Persediaan barang dagang", 64_750_000],
      ["Aset tetap (bangunan gerai & peralatan)", 2_410_000_000],
      ["TOTAL ASET", 2_686_270_000],
      ["Utang bank Himbara (BNI)", 2_547_000_000],
      ["Simpanan anggota (kewajiban)", 48_350_000],
      ["Ekuitas (simpanan pokok/wajib + cadangan)", 90_920_000],
      ["TOTAL KEWAJIBAN + EKUITAS", 2_686_270_000],
    ],
  },
  phu: {
    judul: "Perhitungan Hasil Usaha (PHU) — Juni 2026",
    baris: [
      ["Pendapatan penjualan gerai", 121_400_000],
      ["Pendapatan jasa simpan pinjam", 4_820_000],
      ["Pendapatan sewa cold storage", 3_150_000],
      ["Harga pokok penjualan", -103_800_000],
      ["Beban operasional (gaji, listrik, dll.)", -13_950_000],
      ["Beban bunga pinjaman bank", -12_735_000],
      ["SISA HASIL USAHA (SHU) BULAN INI", -1_115_000],
    ],
  },
  "arus-kas": {
    judul: "Laporan Arus Kas — Juni 2026",
    baris: [
      ["Kas dari aktivitas operasi", 15_420_000],
      ["Kas untuk aktivitas investasi", -2_150_000],
      ["Kas untuk pembayaran angsuran bank", -43_100_000],
      ["Kas dari setoran simpanan anggota", 6_930_000],
      ["PERUBAHAN KAS BERSIH", -22_900_000],
      ["Saldo kas awal Juni", 151_300_000],
      ["Saldo kas akhir Juni", 128_400_000],
    ],
  },
};

function HalamanKeuangan() {
  const [laporan, setLaporan] = React.useState<JenisLaporan | null>(null);
  const progresTenor =
    (pinjamanHimbara.angsuranKe / pinjamanHimbara.totalAngsuran) * 100;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <h1 className="font-display text-xl font-bold">Keuangan</h1>
        <p className="mt-0.5 text-sm text-muted">
          Kas, kewajiban bank, dan laporan sesuai SAK-EP
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-merah-soft text-merah">
              <Landmark className="size-4" />
            </span>
            <div>
              <CardTitle className="flex items-center gap-2">
                Monitor Pinjaman Himbara — {pinjamanHimbara.bank} <LogoBni />
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted">
                Plafon {formatRupiahSingkat(pinjamanHimbara.plafon)} · dicairkan{" "}
                {formatRupiahSingkat(pinjamanHimbara.dicairkan)} · bunga 6%/tahun ·
                tenor 72 bulan
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-line p-3">
                <p className="text-[10px] font-semibold text-muted uppercase">
                  Sisa pokok
                </p>
                <p className="tnum mt-1 font-mono text-base font-semibold">
                  {formatRupiahSingkat(pinjamanHimbara.sisaPokok)}
                </p>
              </div>
              <div className="rounded-lg border border-line p-3">
                <p className="text-[10px] font-semibold text-muted uppercase">
                  Angsuran/bulan
                </p>
                <p className="tnum mt-1 font-mono text-base font-semibold">
                  {formatRupiahSingkat(pinjamanHimbara.angsuranBulanan)}
                </p>
              </div>
              <div className="rounded-lg border border-line p-3">
                <p className="text-[10px] font-semibold text-muted uppercase">
                  Jatuh tempo berikut
                </p>
                <p className="mt-1 text-sm font-semibold">
                  25 Jul <Badge variant="amber" className="ml-1">H-7</Badge>
                </p>
              </div>
              <div className="rounded-lg border border-line p-3">
                <p className="text-[10px] font-semibold text-muted uppercase">
                  Progres tenor
                </p>
                <p className="tnum mt-1 font-mono text-base font-semibold">
                  {pinjamanHimbara.angsuranKe}/{pinjamanHimbara.totalAngsuran}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 overflow-hidden rounded-full bg-line-soft">
                <div
                  className="h-full rounded-full bg-merah"
                  style={{ width: `${progresTenor}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-muted">
                Masa tenggang 6 bulan selesai — angsuran penuh berjalan sejak Mei
                2026. Lunas diperkirakan April 2032.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Saldo kas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="tnum font-mono text-2xl font-bold">
                {formatRupiah(saldoKas)}
              </p>
              <p className="mt-1 text-xs text-muted">
                Kas gerai + rekening koperasi, per hari ini
              </p>
              <div className="mt-4 rounded-lg border border-amber/30 bg-amber-soft p-3 text-xs leading-relaxed text-ink">
                Setelah angsuran BNI (25 Jul) dan gaji, perkiraan sisa kas akhir
                bulan <span className="tnum font-mono font-semibold">Rp 71 jt</span>.
                Jaga pembelian stok tetap di bawah{" "}
                <span className="tnum font-mono font-semibold">Rp 40 jt</span>{" "}
                bulan ini.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Penggajian</CardTitle>
              <Badge variant="hijau">Juli: Dibayar</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">4 karyawan gerai · tiap tgl 15</span>
                <span className="tnum font-mono font-semibold">
                  {formatRupiah(6_400_000)}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-muted">
                Autodebet via BNI Payroll —{" "}
                <Badge variant="netral">Segera</Badge>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Proyeksi kas vs angsuran (4 bulan)</CardTitle>
              <p className="mt-0.5 text-xs text-muted">
                Sisa kas operasional per bulan dibandingkan kewajiban angsuran BNI
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: WARNA_KAS.netKas }} />
                Sisa kas operasional
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: WARNA_KAS.angsuran }} />
                Angsuran BNI
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataProyeksi} barCategoryGap={24} barGap={2}>
                  <CartesianGrid vertical={false} stroke="var(--color-line-soft)" />
                  <XAxis
                    dataKey="bulan"
                    tickLine={false}
                    axisLine={{ stroke: "var(--color-line)" }}
                    tick={{ fontSize: 11, fill: "var(--color-muted)" }}
                  />
                  <YAxis
                    tickFormatter={(v: number) => formatRupiahSingkat(v)}
                    tickLine={false}
                    axisLine={false}
                    width={64}
                    tick={{ fontSize: 10, fill: "var(--color-muted)" }}
                  />
                  <Tooltip
                    content={<TooltipProyeksi />}
                    cursor={{ fill: "var(--color-line-soft)" }}
                  />
                  <Bar dataKey="netKas" fill={WARNA_KAS.netKas} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="angsuran" fill={WARNA_KAS.angsuran} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              Sisa kas operasional masih di bawah angsuran — selisihnya ditutup
              dari saldo kas. Pendamping AI menyarankan menaikkan omzet gerai
              atau menegosiasikan restrukturisasi sebelum kuartal IV.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Laporan SAK-EP</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {(
              [
                ["neraca", "Laporan Posisi Keuangan (Neraca)"],
                ["phu", "Perhitungan Hasil Usaha (PHU)"],
                ["arus-kas", "Laporan Arus Kas"],
              ] as [JenisLaporan, string][]
            ).map(([jenis, label]) => (
              <button
                key={jenis}
                type="button"
                onClick={() => setLaporan(jenis)}
                className="flex items-center gap-2.5 rounded-lg border border-line p-3 text-left text-sm transition-colors hover:border-merah/40 hover:bg-merah-soft/40"
              >
                <FileText className="size-4 shrink-0 text-muted" />
                <span className="flex-1 font-medium">{label}</span>
                <Download className="size-3.5 text-muted/60" />
              </button>
            ))}
            <p className="mt-1 text-[11px] leading-relaxed text-muted">
              Disusun otomatis dari transaksi harian. Paket lengkap RAT (LPJ +
              5 laporan) bisa dibuat oleh Pendamping AI menjelang tutup buku.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Layanan BNI untuk Koperasi <LogoBni />
            </CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              Seluruh arus uang platform berjalan di rel perbankan BNI — mockup
              Spark Arc 2026
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { nama: "Giro BNI Koperasi", ket: "Rekening operasional — dana koperasi & simpanan anggota", status: "Terhubung", varian: "hijau" as const },
              { nama: "QRIS BNI Merchant", ket: "Pembayaran non-tunai di kasir, dana masuk ke giro", status: "Aktif di Kasir", varian: "hijau" as const },
              { nama: "BNI Virtual Account", ket: "Tagihan angsuran & setoran simpanan anggota otomatis", status: "Segera", varian: "netral" as const },
              { nama: "Agen46", ket: "Koperasi jadi agen layanan bank untuk warga desa", status: "Segera", varian: "netral" as const },
            ].map((l) => (
              <div key={l.nama} className="rounded-lg border border-line p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold">{l.nama}</p>
                  <Badge variant={l.varian}>{l.status}</Badge>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{l.ket}</p>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[11px] text-muted/80">
            BNI telah bekerja sama dengan Kemenkop untuk digitalisasi koperasi
            (Agen46, cash management, EDC/QRIS).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buku kas — transaksi terakhir</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Tanggal</TableHead>
                <TableHead>Uraian</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Masuk</TableHead>
                <TableHead className="pr-5 text-right">Keluar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entriKas.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="pl-5 text-muted">
                    {formatTanggal(e.tanggal)}
                  </TableCell>
                  <TableCell>
                    <span className="block font-medium">{e.uraian}</span>
                    {e.gerai ? (
                      <span className="text-[11px] text-muted">{e.gerai}</span>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Badge variant="garis">{e.kategori}</Badge>
                  </TableCell>
                  <TableCell className="tnum text-right font-mono text-hijau">
                    {e.masuk ? formatRupiah(e.masuk) : "—"}
                  </TableCell>
                  <TableCell className="tnum pr-5 text-right font-mono text-merah">
                    {e.keluar ? formatRupiah(e.keluar) : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={laporan !== null} onOpenChange={(o) => !o && setLaporan(null)}>
        <DialogContent className="max-w-lg">
          {laporan ? (
            <>
              <DialogTitle>{isiLaporan[laporan].judul}</DialogTitle>
              <DialogDescription>
                {koperasiNama} · disusun otomatis (mockup)
              </DialogDescription>
              <div className="mt-4 flex flex-col divide-y divide-line-soft">
                {isiLaporan[laporan].baris.map(([uraian, nilai]) => {
                  const tebal = uraian.toUpperCase() === uraian;
                  return (
                    <div
                      key={uraian}
                      className={`flex items-center justify-between py-2 text-sm ${tebal ? "font-semibold" : ""}`}
                    >
                      <span className={tebal ? "" : "text-muted"}>{uraian}</span>
                      <span
                        className={`tnum font-mono ${nilai < 0 ? "text-merah" : ""}`}
                      >
                        {formatRupiah(nilai)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Button variant="secondary" className="mt-4 w-full">
                <Download /> Unduh PDF
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const koperasiNama = "Kopdes Merah Putih Sukamaju";
