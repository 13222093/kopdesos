import { createFileRoute, Link } from "@tanstack/react-router";
import { HandCoins, PiggyBank, ShieldAlert } from "lucide-react";
import * as React from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatRupiah, formatRupiahSingkat, formatTanggal } from "~/lib/format";
import {
  labelKolektibilitas,
  pinjamanAnggota,
  ringkasanSimpanPinjam,
  type PinjamanAnggota,
} from "~/mocks/pinjaman";

export const Route = createFileRoute("/simpan-pinjam")({
  component: HalamanSimpanPinjam,
});

function badgeKolektibilitas(k: PinjamanAnggota["kolektibilitas"]) {
  return k === "lancar" ? "hijau" : k === "perhatian" ? "amber" : "merah";
}

/** jadwal angsuran sederhana untuk sheet detail (mock) */
function buatJadwal(p: PinjamanAnggota) {
  const jadwal: { ke: number; status: "lunas" | "berjalan" | "mendatang" }[] = [];
  for (let ke = 1; ke <= Math.min(p.tenorBulan, 12); ke++) {
    jadwal.push({
      ke,
      status:
        ke < p.angsuranKe ? "lunas" : ke === p.angsuranKe ? "berjalan" : "mendatang",
    });
  }
  return jadwal;
}

function HalamanSimpanPinjam() {
  const [terpilih, setTerpilih] = React.useState<PinjamanAnggota | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">Unit Simpan Pinjam</h1>
          <p className="mt-0.5 text-sm text-muted">
            {pinjamanAnggota.length} pinjaman berjalan
          </p>
        </div>
        <Button>
          <HandCoins /> Ajukan pinjaman baru
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 px-5 py-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-hijau-soft text-hijau">
              <PiggyBank className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                Total simpanan anggota
              </p>
              <p className="tnum font-mono text-lg font-semibold">
                {formatRupiahSingkat(ringkasanSimpanPinjam.totalSimpananAnggota)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 px-5 py-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-merah-soft text-merah">
              <HandCoins className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                Pinjaman beredar
              </p>
              <p className="tnum font-mono text-lg font-semibold">
                {formatRupiahSingkat(ringkasanSimpanPinjam.totalPinjamanBeredar)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 px-5 py-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-amber-soft text-amber">
              <ShieldAlert className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                Butuh penagihan
              </p>
              <p className="tnum font-mono text-lg font-semibold">
                {ringkasanSimpanPinjam.pinjamanMacet + ringkasanSimpanPinjam.pinjamanPerhatian}{" "}
                <span className="text-xs font-normal text-muted">pinjaman</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pinjaman anggota</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Peminjam</TableHead>
                <TableHead>Tujuan</TableHead>
                <TableHead className="text-right">Pokok</TableHead>
                <TableHead className="text-right">Sisa</TableHead>
                <TableHead className="text-right">Angsuran/bln</TableHead>
                <TableHead>Jatuh tempo</TableHead>
                <TableHead className="pr-5">Kolektibilitas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pinjamanAnggota.map((p) => (
                <TableRow
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => setTerpilih(p)}
                >
                  <TableCell className="pl-5">
                    <span className="block font-medium">{p.namaAnggota}</span>
                    <span className="tnum font-mono text-[11px] text-muted">
                      {p.id} · ke-{p.angsuranKe}/{p.tenorBulan}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-44 truncate text-muted">{p.tujuan}</TableCell>
                  <TableCell className="tnum text-right font-mono">
                    {formatRupiah(p.pokok)}
                  </TableCell>
                  <TableCell className="tnum text-right font-mono">
                    {formatRupiah(p.sisa)}
                  </TableCell>
                  <TableCell className="tnum text-right font-mono">
                    {formatRupiah(p.angsuranBulanan)}
                  </TableCell>
                  <TableCell className="text-muted">
                    {formatTanggal(p.jatuhTempoBerikut)}
                  </TableCell>
                  <TableCell className="pr-5">
                    <Badge variant={badgeKolektibilitas(p.kolektibilitas)}>
                      {labelKolektibilitas[p.kolektibilitas]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={terpilih !== null} onOpenChange={(o) => !o && setTerpilih(null)}>
        <SheetContent>
          {terpilih ? (
            <>
              <SheetHeader>
                <SheetTitle>{terpilih.tujuan}</SheetTitle>
                <p className="mt-0.5 text-xs text-muted">
                  <Link
                    to="/anggota/$anggotaId"
                    params={{ anggotaId: terpilih.anggotaId }}
                    className="text-merah hover:underline"
                  >
                    {terpilih.namaAnggota}
                  </Link>{" "}
                  · <span className="tnum font-mono">{terpilih.id}</span> · cair{" "}
                  {formatTanggal(terpilih.tanggalCair)}
                </p>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-line p-3">
                    <p className="text-[11px] text-muted uppercase">Sisa pinjaman</p>
                    <p className="tnum mt-1 font-mono text-lg font-semibold">
                      {formatRupiah(terpilih.sisa)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-line p-3">
                    <p className="text-[11px] text-muted uppercase">Angsuran/bulan</p>
                    <p className="tnum mt-1 font-mono text-lg font-semibold">
                      {formatRupiah(terpilih.angsuranBulanan)}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="h-2 overflow-hidden rounded-full bg-line-soft">
                    <div
                      className="h-full rounded-full bg-hijau"
                      style={{
                        width: `${Math.round(((terpilih.pokok - terpilih.sisa) / terpilih.pokok) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    Terbayar{" "}
                    {Math.round(
                      ((terpilih.pokok - terpilih.sisa) / terpilih.pokok) * 100,
                    )}
                    % dari pokok {formatRupiah(terpilih.pokok)}
                  </p>
                </div>

                <h3 className="mt-5 mb-2 font-display text-sm font-semibold">
                  Jadwal angsuran (12 bulan pertama)
                </h3>
                <div className="grid grid-cols-6 gap-1.5">
                  {buatJadwal(terpilih).map((j) => (
                    <div
                      key={j.ke}
                      className={
                        j.status === "lunas"
                          ? "rounded-md bg-hijau-soft py-1.5 text-center text-[11px] font-medium text-hijau"
                          : j.status === "berjalan"
                            ? "rounded-md border border-amber bg-amber-soft py-1.5 text-center text-[11px] font-semibold text-amber"
                            : "rounded-md border border-line py-1.5 text-center text-[11px] text-muted"
                      }
                    >
                      {j.ke}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-muted">
                  Hijau = lunas · kuning = jatuh tempo{" "}
                  {formatTanggal(terpilih.jatuhTempoBerikut)}
                </p>

                <div className="mt-5 flex gap-2">
                  <Button size="sm" className="flex-1">
                    Catat pembayaran
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1">
                    Kirim pengingat WA
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
