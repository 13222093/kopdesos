import { tool } from "ai";
import { z } from "zod";

import {
  cariAnggota,
  dataDokumenEkspor,
  dataKas,
  dataKesiapanEkspor,
  dataLaporan,
  dataLayananBni,
  dataPeluangEkspor,
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
      "Pinjaman modal koperasi dari bank Himbara (BNI): plafon, sisa pokok, angsuran bulanan, jatuh tempo berikutnya, progres tenor, riwayat angsuran.",
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

  lihat_layanan_bni: tool({
    description:
      "Layanan perbankan BNI yang relevan untuk koperasi (giro/CASA, QRIS merchant, virtual account, Agen46, Xpora, pembiayaan Himbara): penjelasan sederhana, manfaat, dan status di platform.",
    inputSchema: z.object({}),
    execute: async () => dataLayananBni(),
  }),

  lihat_kesiapan_ekspor: tool({
    description:
      "Skor kesiapan ekspor koperasi (0-100) dengan 5 dimensi penilaian, langkah berikutnya untuk menaikkan skor, dan daftar program pendampingan pemerintah (Desa Devisa, Desa BISA Ekspor, UMKM BISA Ekspor).",
    inputSchema: z.object({}),
    execute: async () => dataKesiapanEkspor(),
  }),

  lihat_peluang_ekspor: tool({
    description:
      "Peluang ekspor per komoditas koperasi: potensi (tinggi/menengah/rendah) beserta alasannya, negara tujuan dengan harga indikatif vs harga lokal, volume tersedia, dan syarat kunci. Termasuk komoditas yang SEBAIKNYA TIDAK diekspor dulu.",
    inputSchema: z.object({}),
    execute: async () => dataPeluangEkspor(),
  }),

  lihat_dokumen_ekspor: tool({
    description:
      "Checklist dokumen & regulasi ekspor: legalitas dasar koperasi, dokumen per pengiriman, dan persyaratan spesifik per kombinasi produk × negara yang sudah dikurasi (kopi→Jepang/AS, ikan beku→Jepang, kentang→Singapura). Bisa difilter.",
    inputSchema: z.object({
      komoditas: z.string().optional().describe("mis. kopi, ikan, kentang"),
      negara: z.string().optional().describe("mis. Jepang, Amerika, Singapura"),
    }),
    execute: async ({ komoditas, negara }: { komoditas?: string; negara?: string }) =>
      dataDokumenEkspor(komoditas, negara),
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
