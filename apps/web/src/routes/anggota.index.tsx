import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, UserPlus } from "lucide-react";
import * as React from "react";

import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatRupiah, formatTanggalPendek } from "~/lib/format";
import { daftarAnggota, totalSimpanan } from "~/mocks/anggota";

export const Route = createFileRoute("/anggota/")({
  component: HalamanAnggota,
});

function HalamanAnggota() {
  const [cari, setCari] = React.useState("");
  const hasil = daftarAnggota.filter(
    (a) =>
      a.nama.toLowerCase().includes(cari.toLowerCase()) ||
      a.id.toLowerCase().includes(cari.toLowerCase()) ||
      a.dusun.toLowerCase().includes(cari.toLowerCase()),
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">Keanggotaan</h1>
          <p className="mt-0.5 text-sm text-muted">
            {daftarAnggota.length} anggota terdaftar · 214 total di buku induk
          </p>
        </div>
        <Button>
          <UserPlus /> Daftarkan anggota
        </Button>
      </div>

      <Card>
        <div className="flex items-center gap-2 border-b border-line-soft p-3">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted/70" />
            <Input
              className="pl-9"
              placeholder="Cari nama, nomor, atau banjar…"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
            />
          </div>
          <p className="ml-auto text-xs text-muted">{hasil.length} anggota</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Anggota</TableHead>
              <TableHead>Banjar</TableHead>
              <TableHead>Pekerjaan</TableHead>
              <TableHead>Bergabung</TableHead>
              <TableHead className="text-right">Total Simpanan</TableHead>
              <TableHead className="text-right">Belanja 90 Hari</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasil.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <Link
                    to="/anggota/$anggotaId"
                    params={{ anggotaId: a.id }}
                    className="flex items-center gap-2.5 hover:underline"
                  >
                    <Avatar nama={a.nama} />
                    <span>
                      <span className="block font-medium">{a.nama}</span>
                      <span className="tnum block font-mono text-[11px] text-muted">
                        {a.id} · {a.telepon}
                      </span>
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="text-muted">{a.dusun}</TableCell>
                <TableCell className="text-muted">{a.pekerjaan}</TableCell>
                <TableCell className="text-muted">
                  {formatTanggalPendek(a.tanggalGabung)}{" "}
                  {a.tanggalGabung.slice(0, 4)}
                </TableCell>
                <TableCell className="tnum text-right font-mono">
                  {formatRupiah(totalSimpanan(a))}
                </TableCell>
                <TableCell className="tnum text-right font-mono">
                  {formatRupiah(a.belanja90Hari)}
                </TableCell>
                <TableCell>
                  <Badge variant={a.status === "aktif" ? "hijau" : "netral"}>
                    {a.status === "aktif" ? "Aktif" : "Nonaktif"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
