import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Minus, Plus, QrCode, Search, ShoppingCart, Trash2 } from "lucide-react";
import * as React from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { formatRupiah } from "~/lib/format";
import { daftarProduk, type Produk } from "~/mocks/produk";

export const Route = createFileRoute("/pos")({
  component: HalamanPos,
});

type ItemKeranjang = { produk: Produk; jumlah: number };

function HalamanPos() {
  const [cari, setCari] = React.useState("");
  const [keranjang, setKeranjang] = React.useState<ItemKeranjang[]>([]);
  const [dialogBayar, setDialogBayar] = React.useState<null | "tunai" | "qris">(null);
  const [selesai, setSelesai] = React.useState(false);

  const produkSembako = daftarProduk.filter(
    (p) =>
      p.gerai === "sembako" &&
      p.nama.toLowerCase().includes(cari.toLowerCase()),
  );

  const total = keranjang.reduce(
    (t, i) => t + i.produk.hargaJual * i.jumlah,
    0,
  );

  function tambah(produk: Produk) {
    setKeranjang((k) => {
      const ada = k.find((i) => i.produk.id === produk.id);
      if (ada)
        return k.map((i) =>
          i.produk.id === produk.id ? { ...i, jumlah: i.jumlah + 1 } : i,
        );
      return [...k, { produk, jumlah: 1 }];
    });
  }

  function ubahJumlah(id: string, delta: number) {
    setKeranjang((k) =>
      k
        .map((i) =>
          i.produk.id === id ? { ...i, jumlah: i.jumlah + delta } : i,
        )
        .filter((i) => i.jumlah > 0),
    );
  }

  function bayar() {
    setDialogBayar(null);
    setSelesai(true);
    setKeranjang([]);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <h1 className="font-display text-xl font-bold">Kasir — Gerai Sembako</h1>
        <p className="mt-0.5 text-sm text-muted">
          Shift pagi · kasir: Sari Wulandari
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-3 max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted/70" />
            <Input
              className="pl-9"
              placeholder="Cari produk atau scan barcode…"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
            {produkSembako.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => tambah(p)}
                className="flex flex-col rounded-xl border border-line bg-card p-3 text-left transition-colors hover:border-merah/40 hover:bg-merah-soft/40"
              >
                <span className="text-[13px] leading-snug font-medium">{p.nama}</span>
                <span className="mt-0.5 text-[11px] text-muted">
                  Stok {p.stok} {p.satuan}
                </span>
                <span className="tnum mt-2 font-mono text-sm font-semibold">
                  {formatRupiah(p.hargaJual)}
                </span>
                {p.stok < p.stokMinimum ? (
                  <Badge variant="amber" className="mt-1.5 w-fit">
                    Menipis
                  </Badge>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <Card className="h-fit lg:sticky lg:top-20">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <ShoppingCart className="size-4 text-muted" />
            <h2 className="font-display text-sm font-semibold">Keranjang</h2>
            {keranjang.length > 0 ? (
              <button
                type="button"
                onClick={() => setKeranjang([])}
                className="ml-auto text-muted hover:text-merah"
              >
                <Trash2 className="size-4" />
                <span className="sr-only">Kosongkan</span>
              </button>
            ) : null}
          </div>

          {keranjang.length === 0 ? (
            <p className="px-4 py-8 text-center text-xs text-muted">
              Belum ada barang. Klik produk di sebelah kiri untuk menambahkan.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-line-soft px-4">
              {keranjang.map((i) => (
                <div key={i.produk.id} className="flex items-center gap-2 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{i.produk.nama}</p>
                    <p className="tnum font-mono text-[11px] text-muted">
                      {formatRupiah(i.produk.hargaJual)} × {i.jumlah}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-6"
                      onClick={() => ubahJumlah(i.produk.id, -1)}
                    >
                      <Minus className="size-3" />
                    </Button>
                    <span className="tnum w-6 text-center font-mono text-sm">{i.jumlah}</span>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-6"
                      onClick={() => ubahJumlah(i.produk.id, 1)}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-line px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Total</span>
              <span className="tnum font-mono text-lg font-bold">{formatRupiah(total)}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                disabled={keranjang.length === 0}
                onClick={() => setDialogBayar("tunai")}
              >
                <Banknote /> Tunai
              </Button>
              <Button
                disabled={keranjang.length === 0}
                onClick={() => setDialogBayar("qris")}
              >
                <QrCode /> QRIS
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted">
              Anggota dapat poin partisipasi SHU otomatis
            </p>
          </div>
        </Card>
      </div>

      <Dialog open={dialogBayar !== null} onOpenChange={(o) => !o && setDialogBayar(null)}>
        <DialogContent>
          <DialogTitle>
            {dialogBayar === "qris" ? "Pembayaran QRIS" : "Pembayaran tunai"}
          </DialogTitle>
          <DialogDescription>
            Total belanja{" "}
            <span className="tnum font-mono font-semibold text-ink">
              {formatRupiah(total)}
            </span>
          </DialogDescription>
          {dialogBayar === "qris" ? (
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="grid size-40 place-items-center rounded-xl border-2 border-dashed border-line bg-paper">
                <QrCode className="size-16 text-muted/50" />
              </div>
              <p className="text-center text-xs text-muted">
                Minta pembeli memindai kode QRIS koperasi.
                <br />
                (Mockup — pembayaran tidak diproses)
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">
              Terima uang tunai dari pembeli, lalu tandai transaksi selesai.
            </p>
          )}
          <Button className="mt-4 w-full" onClick={bayar}>
            Tandai sudah dibayar
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={selesai} onOpenChange={setSelesai}>
        <DialogContent>
          <DialogTitle>Transaksi selesai ✅</DialogTitle>
          <DialogDescription>
            Penjualan tercatat di kas gerai sembako. Struk dikirim otomatis ke
            WhatsApp pembeli jika nomornya terdaftar sebagai anggota.
          </DialogDescription>
          <Button className="mt-4 w-full" variant="secondary" onClick={() => setSelesai(false)}>
            Transaksi baru
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
