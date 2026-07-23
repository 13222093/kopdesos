import { tool } from "ai";
import { z } from "zod";

import {
  cariAnggota,
  dataKas,
  dataLaporan,
  dataPenjualan,
  dataPinjamanAnggota,
  dataPinjamanHimbara,
  dataStok,
  ringkasanHariIni,
} from "./data";

export const toolsPendamping = {
  lihat_ringkasan_hari_ini: tool({
    description:
      "Ringkasan kondisi koperasi hari ini: penjualan hari ini & kemarin per gerai, saldo kas, angsuran bank terdekat, piutang, jumlah stok menipis, dan peringatan penting.",
    inputSchema: z.object({}),
    execute: async () => ringkasanHariIni(),
  }),

  lihat_penjualan: tool({
    description:
      "Data penjualan gabungan gerai (sembako, apotek, cold storage) untuk periode tertentu: total per gerai, rata-rata harian, estimasi margin.",
    inputSchema: z.object({
      hari: z
        .union([z.literal(7), z.literal(30), z.literal(90)])
        .describe("Periode ke belakang dalam hari: 7, 30, atau 90"),
    }),
    execute: async ({ hari }: { hari: 7 | 30 | 90 }) => dataPenjualan(hari),
  }),

  lihat_stok: tool({
    description:
      "Daftar stok produk. Bisa difilter: hanya yang menipis (di bawah stok minimum) atau hampir kedaluwarsa (<30 hari), dan per gerai.",
    inputSchema: z.object({
      filter: z.enum(["semua", "menipis", "kedaluwarsa"]).default("semua"),
      gerai: z.enum(["sembako", "apotek", "gudang"]).optional()
        .describe("gudang = cold storage"),
    }),
    execute: async (input: {
      filter: "semua" | "menipis" | "kedaluwarsa";
      gerai?: "sembako" | "apotek" | "gudang";
    }) => dataStok(input),
  }),

  lihat_pinjaman_anggota: tool({
    description:
      "Pinjaman anggota unit simpan pinjam: ringkasan piutang beredar + daftar pinjaman dengan status kolektibilitas (lancar / perhatian / macet).",
    inputSchema: z.object({
      kolektibilitas: z.enum(["lancar", "perhatian", "macet"]).optional(),
    }),
    execute: async ({
      kolektibilitas,
    }: {
      kolektibilitas?: "lancar" | "perhatian" | "macet";
    }) => dataPinjamanAnggota(kolektibilitas),
  }),

  lihat_pinjaman_himbara: tool({
    description:
      "Pinjaman modal koperasi dari bank Himbara (BRI): plafon, sisa pokok, angsuran bulanan, jatuh tempo berikutnya, progres tenor, riwayat angsuran.",
    inputSchema: z.object({}),
    execute: async () => dataPinjamanHimbara(),
  }),

  lihat_kas: tool({
    description:
      "Kas koperasi: saldo saat ini, buku kas (transaksi terakhir), dan proyeksi 4 bulan ke depan dibandingkan kewajiban angsuran bank.",
    inputSchema: z.object({}),
    execute: async () => dataKas(),
  }),

  cari_anggota: tool({
    description:
      "Cari anggota berdasarkan nama, ID (AGT-xxx), atau banjar/dusun. Mengembalikan profil, simpanan, pinjaman aktif, dan total belanja 90 hari (maks 5 hasil).",
    inputSchema: z.object({
      kata_kunci: z.string().min(2).describe("Nama, ID anggota, atau nama banjar"),
    }),
    execute: async ({ kata_kunci }: { kata_kunci: string }) =>
      cariAnggota(kata_kunci),
  }),

  lihat_laporan_keuangan: tool({
    description:
      "Laporan keuangan SAK-EP bulan lalu (Juni 2026): neraca, perhitungan hasil usaha (PHU), atau arus kas.",
    inputSchema: z.object({
      jenis: z.enum(["neraca", "phu", "arus_kas"]),
    }),
    execute: async ({ jenis }: { jenis: "neraca" | "phu" | "arus_kas" }) =>
      dataLaporan(jenis),
  }),
};
