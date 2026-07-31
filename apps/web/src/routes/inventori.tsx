import { createFileRoute } from "@tanstack/react-router";
import { PackagePlus } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { formatRupiah, formatTanggal } from "~/lib/format";
import {
  daftarPengadaan,
  daftarProduk,
  hampirKedaluwarsa,
  prediksiStok,
  stokMenipis,
  type Produk,
  type StatusPo,
} from "~/mocks/produk";

export const Route = createFileRoute("/inventori")({
  component: HalamanInventori,
});

const kartuStokContoh = [
  { tanggal: "2026-07-17", uraian: "Penjualan kasir", masuk: 0, keluar: 6 },
  { tanggal: "2026-07-16", uraian: "Penjualan kasir", masuk: 0, keluar: 4 },
  { tanggal: "2026-07-15", uraian: "Pembelian dari distributor", masuk: 25, keluar: 0 },
  { tanggal: "2026-07-14", uraian: "Penjualan kasir", masuk: 0, keluar: 7 },
  { tanggal: "2026-07-13", uraian: "Penjualan kasir (akhir pekan)", masuk: 0, keluar: 11 },
];

function TabelProduk({
  produk,
  onPilih,
}: {
  produk: Produk[];
  onPilih: (p: Produk) => void;
}) {
  const adaKedaluwarsa = produk.some((p) => p.kedaluwarsa);
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Produk</TableHead>
            <TableHead className="text-right">Harga Beli</TableHead>
            <TableHead className="text-right">Harga Jual</TableHead>
            <TableHead className="text-right">Stok</TableHead>
            <TableHead className="text-right">Perkiraan Habis</TableHead>
            {adaKedaluwarsa ? <TableHead>Batch / Kedaluwarsa</TableHead> : null}
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produk.map((p) => (
            <TableRow
              key={p.id}
              className="cursor-pointer"
              onClick={() => onPilih(p)}
            >
              <TableCell>
                <span className="block font-medium">{p.nama}</span>
                <span className="tnum font-mono text-[11px] text-muted">
                  {p.id} · {p.kategori}
                </span>
              </TableCell>
              <TableCell className="tnum text-right font-mono">
                {formatRupiah(p.hargaBeli)}
              </TableCell>
              <TableCell className="tnum text-right font-mono">
                {formatRupiah(p.hargaJual)}
              </TableCell>
              <TableCell className="tnum text-right font-mono">
                {p.stok}{" "}
                <span className="text-[11px] text-muted">{p.satuan}</span>
              </TableCell>
              <TableCell
                className={
                  "tnum text-right font-mono " +
                  (prediksiStok(p).habisDalamHari < 7
                    ? "font-semibold text-merah"
                    : "text-muted")
                }
              >
                ± {prediksiStok(p).habisDalamHari} hari
              </TableCell>
              {adaKedaluwarsa ? (
                <TableCell className="text-muted">
                  {p.batch ? (
                    <>
                      <span className="tnum font-mono text-[11px]">{p.batch}</span>
                      <span className="block text-[11px]">
                        {p.kedaluwarsa ? formatTanggal(p.kedaluwarsa) : "—"}
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </TableCell>
              ) : null}
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {stokMenipis(p) ? <Badge variant="amber">Stok menipis</Badge> : null}
                  {hampirKedaluwarsa(p) ? (
                    <Badge variant="merah">Kedaluwarsa &lt; 30 hari</Badge>
                  ) : null}
                  {!stokMenipis(p) && !hampirKedaluwarsa(p) ? (
                    <Badge variant="hijau">Aman</Badge>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function HalamanInventori() {
  const [terpilih, setTerpilih] = React.useState<Produk | null>(null);

  const sembako = daftarProduk.filter((p) => p.gerai === "sembako");
  const apotek = daftarProduk.filter((p) => p.gerai === "apotek");
  const gudang = daftarProduk.filter((p) => p.gerai === "gudang");
  const jumlahPeringatan = daftarProduk.filter(
    (p) => stokMenipis(p) || hampirKedaluwarsa(p),
  ).length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">Inventori</h1>
          <p className="mt-0.5 text-sm text-muted">
            {daftarProduk.length} produk · {jumlahPeringatan} butuh perhatian
          </p>
        </div>
        <Button>
          <PackagePlus /> Catat barang masuk
        </Button>
      </div>

      <Tabs defaultValue="sembako">
        <TabsList>
          <TabsTrigger value="sembako">Sembako ({sembako.length})</TabsTrigger>
          <TabsTrigger value="apotek">Apotek ({apotek.length})</TabsTrigger>
          <TabsTrigger value="gudang">Cold Storage ({gudang.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="sembako">
          <TabelProduk produk={sembako} onPilih={setTerpilih} />
        </TabsContent>
        <TabsContent value="apotek">
          <TabelProduk produk={apotek} onPilih={setTerpilih} />
        </TabsContent>
        <TabsContent value="gudang">
          <TabelProduk produk={gudang} onPilih={setTerpilih} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Pengadaan (Purchase Order)</CardTitle>
            <p className="mt-0.5 text-xs text-muted">
              PO bisa dibuat otomatis dari saran prediksi permintaan
            </p>
          </div>
          <Button size="sm" variant="secondary">
            Buat PO dari saran
          </Button>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">PO</TableHead>
                <TableHead>Pemasok</TableHead>
                <TableHead>Isi</TableHead>
                <TableHead className="text-right">Nilai</TableHead>
                <TableHead className="pr-5">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daftarPengadaan.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="pl-5">
                    <span className="tnum block font-mono text-xs font-semibold">{po.id}</span>
                    <span className="text-[11px] text-muted">
                      {formatTanggal(po.tanggal)}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted">{po.pemasok}</TableCell>
                  <TableCell>
                    <span className="block text-[13px]">{po.isi}</span>
                    <span className="text-[11px] text-muted">{po.catatan}</span>
                  </TableCell>
                  <TableCell className="tnum text-right font-mono">
                    {formatRupiah(po.nilai)}
                  </TableCell>
                  <TableCell className="pr-5">
                    <Badge
                      variant={
                        ({ draft: "netral", dikirim: "amber", diterima: "hijau" } as const)[
                          po.status as StatusPo
                        ]
                      }
                    >
                      {po.status === "draft"
                        ? "Draft"
                        : po.status === "dikirim"
                          ? "Dikirim"
                          : "Diterima"}
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
                <SheetTitle>{terpilih.nama}</SheetTitle>
                <p className="tnum mt-0.5 font-mono text-xs text-muted">
                  {terpilih.id} · {terpilih.kategori}
                </p>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-line p-3">
                    <p className="text-[11px] text-muted uppercase">Stok saat ini</p>
                    <p className="tnum mt-1 font-mono text-lg font-semibold">
                      {terpilih.stok} {terpilih.satuan}
                    </p>
                  </div>
                  <div className="rounded-lg border border-line p-3">
                    <p className="text-[11px] text-muted uppercase">Stok minimum</p>
                    <p className="tnum mt-1 font-mono text-lg font-semibold">
                      {terpilih.stokMinimum} {terpilih.satuan}
                    </p>
                  </div>
                  <div className="rounded-lg border border-line p-3">
                    <p className="text-[11px] text-muted uppercase">Harga beli</p>
                    <p className="tnum mt-1 font-mono text-sm font-semibold">
                      {formatRupiah(terpilih.hargaBeli)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-line p-3">
                    <p className="text-[11px] text-muted uppercase">Harga jual</p>
                    <p className="tnum mt-1 font-mono text-sm font-semibold">
                      {formatRupiah(terpilih.hargaJual)}
                      <span className="ml-1 text-[11px] font-normal text-hijau">
                        (margin{" "}
                        {Math.round(
                          ((terpilih.hargaJual - terpilih.hargaBeli) /
                            terpilih.hargaBeli) *
                            100,
                        )}
                        %)
                      </span>
                    </p>
                  </div>
                </div>

                {(() => {
                  const pred = prediksiStok(terpilih);
                  return (
                    <div className="mt-3 rounded-lg border border-hijau/30 bg-hijau-soft p-3">
                      <p className="text-[10px] font-semibold tracking-wide text-hijau uppercase">
                        Prediksi permintaan
                      </p>
                      <p className="mt-1 text-xs leading-relaxed">
                        Rata-rata terjual{" "}
                        <span className="tnum font-mono font-semibold">
                          {pred.lajuHarian} {terpilih.satuan}/hari
                        </span>{" "}
                        — stok diperkirakan habis dalam{" "}
                        <span
                          className={
                            "tnum font-mono font-semibold " +
                            (pred.habisDalamHari < 7 ? "text-merah" : "")
                          }
                        >
                          ± {pred.habisDalamHari} hari
                        </span>
                        .
                      </p>
                      {pred.saranPesan > 0 ? (
                        <p className="mt-1 text-xs leading-relaxed">
                          Saran pesan ulang:{" "}
                          <span className="tnum font-mono font-semibold">
                            {pred.saranPesan} {terpilih.satuan}
                          </span>{" "}
                          (kebutuhan 7 hari + stok aman) ·{" "}
                          <span className="tnum font-mono">
                            {formatRupiah(pred.estimasiBiayaPesan)}
                          </span>
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-muted">
                          Stok masih cukup — belum perlu pesan ulang.
                        </p>
                      )}
                    </div>
                  );
                })()}

                {terpilih.batch ? (
                  <div className="mt-3 rounded-lg border border-line bg-paper p-3 text-xs">
                    <p>
                      Batch{" "}
                      <span className="tnum font-mono font-medium">{terpilih.batch}</span>
                      {terpilih.kedaluwarsa
                        ? ` — kedaluwarsa ${formatTanggal(terpilih.kedaluwarsa)}`
                        : null}
                    </p>
                  </div>
                ) : null}

                <h3 className="mt-5 mb-2 font-display text-sm font-semibold">
                  Kartu stok
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Uraian</TableHead>
                      <TableHead className="text-right">Masuk</TableHead>
                      <TableHead className="text-right">Keluar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kartuStokContoh.map((k) => (
                      <TableRow key={k.tanggal + k.uraian}>
                        <TableCell className="text-muted">
                          {formatTanggal(k.tanggal)}
                        </TableCell>
                        <TableCell>{k.uraian}</TableCell>
                        <TableCell className="tnum text-right font-mono text-hijau">
                          {k.masuk || "—"}
                        </TableCell>
                        <TableCell className="tnum text-right font-mono text-merah">
                          {k.keluar || "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
