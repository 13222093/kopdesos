import { createFileRoute } from "@tanstack/react-router";
import {
  Droplets,
  HeartPulse,
  Smartphone,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import * as React from "react";

import { LogoBni } from "~/components/bni/LogoBni";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatRupiah } from "~/lib/format";
import { layananPpob, ringkasanPpob, riwayatPpob } from "~/mocks/ppob";

export const Route = createFileRoute("/produk-digital")({
  component: HalamanProdukDigital,
});

const IKON: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphone: Smartphone,
  zap: Zap,
  heart: HeartPulse,
  droplets: Droplets,
  wallet: Wallet,
  wifi: Wifi,
};

function HalamanProdukDigital() {
  const [terpilih, setTerpilih] = React.useState<(typeof layananPpob)[number] | null>(null);
  const [selesai, setSelesai] = React.useState(false);
  const [nomor, setNomor] = React.useState("");
  const [nominal, setNominal] = React.useState("");

  function proses() {
    setTerpilih(null);
    setSelesai(true);
    setNomor("");
    setNominal("");
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">Produk Digital (PPOB)</h1>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
            Warga bayar tagihan & beli pulsa di koperasi — diproses via biller{" "}
            <LogoBni className="h-3.5" />
          </p>
        </div>
        <Badge variant="hijau">Komisi = pendapatan koperasi</Badge>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="px-5 py-4">
            <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
              Komisi bulan ini
            </p>
            <p className="tnum mt-1.5 font-mono text-xl font-semibold text-hijau">
              {formatRupiah(ringkasanPpob.komisiBulanIni)}
            </p>
            <p className="mt-1 text-[11px] text-muted">
              Masuk sebagai pendapatan jasa koperasi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-5 py-4">
            <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
              Transaksi bulan ini
            </p>
            <p className="tnum mt-1.5 font-mono text-xl font-semibold">
              {ringkasanPpob.jumlahTransaksiBulanIni}
            </p>
            <p className="mt-1 text-[11px] text-muted">±10 transaksi/hari</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-5 py-4">
            <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
              Rata-rata komisi/transaksi
            </p>
            <p className="tnum mt-1.5 font-mono text-xl font-semibold">
              {formatRupiah(ringkasanPpob.rataKomisiPerTransaksi)}
            </p>
            <p className="mt-1 text-[11px] text-muted">
              Fee-based income untuk koperasi & bank
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
        {layananPpob.map((l) => {
          const Icon = IKON[l.ikon] ?? Smartphone;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setTerpilih(l)}
              className="flex flex-col items-center gap-2 rounded-xl border border-line bg-card p-4 text-center transition-colors hover:border-merah/40 hover:bg-merah-soft/40"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-merah-soft text-merah">
                <Icon className="size-5" />
              </span>
              <span className="text-[13px] leading-snug font-semibold">{l.nama}</span>
              <span className="text-[11px] text-muted">{l.contoh}</span>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaksi terakhir</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Waktu</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Tujuan</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
                <TableHead className="pr-5 text-right">Komisi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riwayatPpob.map((t) => (
                <TableRow key={t.waktu + t.tujuan}>
                  <TableCell className="pl-5 text-muted">{t.waktu}</TableCell>
                  <TableCell className="font-medium">{t.layanan}</TableCell>
                  <TableCell className="tnum font-mono text-xs text-muted">
                    {t.tujuan}
                  </TableCell>
                  <TableCell className="tnum text-right font-mono">
                    {formatRupiah(t.nominal)}
                  </TableCell>
                  <TableCell className="tnum pr-5 text-right font-mono text-hijau">
                    +{formatRupiah(t.komisi)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={terpilih !== null} onOpenChange={(o) => !o && setTerpilih(null)}>
        <DialogContent>
          {terpilih ? (
            <>
              <DialogTitle>{terpilih.nama}</DialogTitle>
              <DialogDescription>
                Diproses via biller BNI — komisi otomatis masuk pendapatan koperasi.
              </DialogDescription>
              <div className="mt-4 flex flex-col gap-2.5">
                <Input
                  placeholder="Nomor tujuan / ID pelanggan"
                  value={nomor}
                  onChange={(e) => setNomor(e.target.value)}
                />
                <Input
                  placeholder="Nominal (mis. 50.000)"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                />
              </div>
              <Button className="mt-4 w-full" onClick={proses} disabled={!nomor}>
                Proses transaksi
              </Button>
              <p className="mt-2 text-center text-[10px] text-muted">
                Mockup — transaksi tidak benar-benar diproses
              </p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={selesai} onOpenChange={setSelesai}>
        <DialogContent>
          <DialogTitle>Transaksi berhasil ✅</DialogTitle>
          <DialogDescription>
            Struk dikirim ke WhatsApp pelanggan. Komisi koperasi otomatis
            tercatat di buku kas sebagai pendapatan jasa.
          </DialogDescription>
          <Button className="mt-4 w-full" variant="secondary" onClick={() => setSelesai(false)}>
            Transaksi baru
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
