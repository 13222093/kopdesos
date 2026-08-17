import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, HandCoins, MessageCircle, Pencil, Phone } from "lucide-react";
import * as React from "react";

import { LogoBni } from "~/components/bni/LogoBni";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatRupiah, formatTanggal } from "~/lib/format";
import { daftarAnggota, totalSimpanan } from "~/mocks/anggota";
import { labelKolektibilitas, pinjamanAnggota } from "~/mocks/pinjaman";

export const Route = createFileRoute("/anggota/$anggotaId")({
  component: DetailAnggota,
});

const riwayatBelanjaContoh = [
  { tanggal: "2026-07-16", uraian: "Beras premium 5 kg ×1, minyak 2 L ×2", gerai: "Sembako", nilai: 136_000 },
  { tanggal: "2026-07-10", uraian: "Paracetamol ×2, vitamin C ×1", gerai: "Apotek", nilai: 32_000 },
  { tanggal: "2026-07-03", uraian: "Gula 1 kg ×2, telur 1 kg ×1, mie ×10", gerai: "Sembako", nilai: 98_000 },
  { tanggal: "2026-06-27", uraian: "Gas LPG 3 kg ×1, air galon ×2", gerai: "Sembako", nilai: 33_000 },
];

function DetailAnggota() {
  const { anggotaId } = Route.useParams();
  const anggota = daftarAnggota.find((a) => a.id === anggotaId);
  const [bukaAjukan, setBukaAjukan] = React.useState(false);
  const [terkirim, setTerkirim] = React.useState(false);
  const [jumlah, setJumlah] = React.useState("");
  const [tujuan, setTujuan] = React.useState("");
  if (!anggota) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <p className="text-sm text-muted">Anggota {anggotaId} tidak ditemukan.</p>
        <Link to="/anggota" className="mt-2 inline-block text-sm text-merah hover:underline">
          ← Kembali ke daftar anggota
        </Link>
      </div>
    );
  }

  const pinjaman = pinjamanAnggota.filter((p) => p.anggotaId === anggota.id);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <Link
        to="/anggota"
        className="flex w-fit items-center gap-1 text-xs text-muted hover:text-ink"
      >
        <ArrowLeft className="size-3.5" /> Daftar anggota
      </Link>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 px-5 py-5">
          <Avatar nama={anggota.nama} className="size-14 text-lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-lg font-bold">{anggota.nama}</h1>
              <Badge variant={anggota.status === "aktif" ? "hijau" : "netral"}>
                {anggota.status === "aktif" ? "Anggota Aktif" : "Nonaktif"}
              </Badge>
            </div>
            <p className="tnum mt-0.5 font-mono text-xs text-muted">
              {anggota.id} · {anggota.telepon}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {anggota.dusun} · {anggota.pekerjaan} · bergabung{" "}
              {formatTanggal(anggota.tanggalGabung)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Phone /> Telepon
            </Button>
            <Button variant="secondary" size="sm">
              <MessageCircle /> Chat WA
            </Button>
            <Button size="sm">
              <Pencil /> Ubah
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Simpanan</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-line-soft">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted">Simpanan pokok</span>
              <span className="tnum font-mono text-sm">{formatRupiah(anggota.simpanan.pokok)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted">Simpanan wajib</span>
              <span className="tnum font-mono text-sm">{formatRupiah(anggota.simpanan.wajib)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted">Simpanan sukarela</span>
              <span className="tnum font-mono text-sm">{formatRupiah(anggota.simpanan.sukarela)}</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm font-semibold">Total</span>
              <span className="tnum font-mono text-sm font-semibold">
                {formatRupiah(totalSimpanan(anggota))}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Pinjaman aktif</CardTitle>
            <Button size="sm" onClick={() => { setTerkirim(false); setBukaAjukan(true); }}>
              <HandCoins /> Ajukan Pinjaman
            </Button>
          </CardHeader>
          <CardContent>
            {pinjaman.length === 0 ? (
              <p className="py-4 text-sm text-muted">
                Tidak ada pinjaman aktif. Anggota ini bisa mengajukan pinjaman
                lewat unit simpan pinjam.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Pinjaman</TableHead>
                    <TableHead className="text-right">Sisa</TableHead>
                    <TableHead className="text-right">Angsuran/bln</TableHead>
                    <TableHead>Jatuh tempo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pinjaman.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <span className="block font-medium">{p.tujuan}</span>
                        <span className="tnum font-mono text-[11px] text-muted">
                          {p.id} · ke-{p.angsuranKe}/{p.tenorBulan}
                        </span>
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
                      <TableCell>
                        <Badge
                          variant={
                            p.kolektibilitas === "lancar"
                              ? "hijau"
                              : p.kolektibilitas === "perhatian"
                                ? "amber"
                                : "merah"
                          }
                        >
                          {labelKolektibilitas[p.kolektibilitas]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat belanja terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Tanggal</TableHead>
                <TableHead>Belanjaan</TableHead>
                <TableHead>Gerai</TableHead>
                <TableHead className="text-right">Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riwayatBelanjaContoh.map((r) => (
                <TableRow key={r.tanggal}>
                  <TableCell className="text-muted">{formatTanggal(r.tanggal)}</TableCell>
                  <TableCell>{r.uraian}</TableCell>
                  <TableCell className="text-muted">{r.gerai}</TableCell>
                  <TableCell className="tnum text-right font-mono">
                    {formatRupiah(r.nilai)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-2 text-[11px] text-muted">
            Total belanja 90 hari terakhir:{" "}
            <span className="tnum font-mono font-medium text-ink">
              {formatRupiah(anggota.belanja90Hari)}
            </span>{" "}
            — jadi dasar perhitungan SHU dari partisipasi belanja.
          </p>
        </CardContent>
      </Card>

      <Dialog open={bukaAjukan} onOpenChange={setBukaAjukan}>
        <DialogContent>
          {terkirim ? (
            <>
              <DialogTitle>Pengajuan diterima ✅</DialogTitle>
              <DialogDescription>
                Pengajuan diteruskan ke pengurus koperasi dan diproses digital
                melalui <span className="font-medium">BNI MOVE</span> — riwayat
                simpanan dan belanja Anda di KopPilot ikut jadi bahan penilaian.
                Kabar persetujuan dikirim lewat WhatsApp. (Mockup)
              </DialogDescription>
              <Button variant="secondary" className="mt-4 w-full" onClick={() => setBukaAjukan(false)}>
                Tutup
              </Button>
            </>
          ) : (
            <>
              <DialogTitle className="flex items-center gap-2">
                Ajukan Pinjaman <LogoBni className="h-4" />
              </DialogTitle>
              <DialogDescription>
                Atas nama {anggota.nama} — diproses digital via BNI MOVE (KUR /
                BNI Wirausaha), tanpa perlu ke cabang.
              </DialogDescription>
              <div className="mt-4 flex flex-col gap-2.5">
                <Input
                  placeholder="Jumlah pinjaman (mis. 5.000.000)"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                />
                <Input
                  placeholder="Tujuan (mis. modal dagang, alat tani)"
                  value={tujuan}
                  onChange={(e) => setTujuan(e.target.value)}
                />
              </div>
              <Button
                className="mt-4 w-full"
                disabled={!jumlah || !tujuan}
                onClick={() => setTerkirim(true)}
              >
                Kirim pengajuan
              </Button>
              <p className="mt-2 text-center text-[10px] text-muted">
                Mockup — pengajuan tidak benar-benar dikirim
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
