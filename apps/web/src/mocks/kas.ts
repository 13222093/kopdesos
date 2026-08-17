export type EntriKas = {
  id: string;
  tanggal: string;
  uraian: string;
  kategori: string;
  gerai?: string;
  masuk: number;
  keluar: number;
};

export const saldoKas = 128_400_000;

export const entriKas: EntriKas[] = [
  { id: "KAS-118", tanggal: "2026-07-18", uraian: "Penjualan tunai Gerai Sembako", kategori: "Penjualan", gerai: "Sembako", masuk: 2_140_000, keluar: 0 },
  { id: "KAS-117", tanggal: "2026-07-18", uraian: "Penjualan Apotek Desa", kategori: "Penjualan", gerai: "Apotek", masuk: 640_000, keluar: 0 },
  { id: "KAS-116", tanggal: "2026-07-18", uraian: "Setoran simpanan sukarela (5 anggota)", kategori: "Simpanan", masuk: 1_250_000, keluar: 0 },
  { id: "KAS-115", tanggal: "2026-07-17", uraian: "Pembelian stok beras (28 sak)", kategori: "Pembelian Stok", gerai: "Sembako", masuk: 0, keluar: 1_736_000 },
  { id: "KAS-114", tanggal: "2026-07-17", uraian: "Penjualan tunai Gerai Sembako", kategori: "Penjualan", gerai: "Sembako", masuk: 3_310_000, keluar: 0 },
  { id: "KAS-113", tanggal: "2026-07-17", uraian: "Angsuran pinjaman anggota (PJM-004)", kategori: "Angsuran Masuk", masuk: 430_000, keluar: 0 },
  { id: "KAS-112", tanggal: "2026-07-16", uraian: "Bayar listrik & air kantor", kategori: "Operasional", masuk: 0, keluar: 485_000 },
  { id: "KAS-111", tanggal: "2026-07-16", uraian: "Penjualan Cold Storage (ikan beku)", kategori: "Penjualan", gerai: "Cold Storage", masuk: 1_120_000, keluar: 0 },
  { id: "KAS-110", tanggal: "2026-07-15", uraian: "Gaji karyawan gerai (4 orang)", kategori: "Gaji", masuk: 0, keluar: 6_400_000 },
  { id: "KAS-109", tanggal: "2026-07-15", uraian: "Penjualan tunai Gerai Sembako", kategori: "Penjualan", gerai: "Sembako", masuk: 2_890_000, keluar: 0 },
  { id: "KAS-108", tanggal: "2026-07-14", uraian: "Pencairan pinjaman anggota (PJM-011)", kategori: "Pinjaman Keluar", masuk: 0, keluar: 3_000_000 },
  { id: "KAS-107", tanggal: "2026-07-14", uraian: "Pembelian stok apotek (PBF)", kategori: "Pembelian Stok", gerai: "Apotek", masuk: 0, keluar: 2_150_000 },
  { id: "KAS-106", tanggal: "2026-07-13", uraian: "Penjualan akhir pekan (semua gerai)", kategori: "Penjualan", masuk: 5_870_000, keluar: 0 },
  { id: "KAS-105", tanggal: "2026-07-12", uraian: "Penjualan akhir pekan (semua gerai)", kategori: "Penjualan", masuk: 5_240_000, keluar: 0 },
  { id: "KAS-104", tanggal: "2026-07-11", uraian: "Sewa cold storage (kelompok tani)", kategori: "Jasa", gerai: "Cold Storage", masuk: 750_000, keluar: 0 },
  { id: "KAS-103", tanggal: "2026-07-10", uraian: "Biaya kirim logistik distribusi", kategori: "Operasional", masuk: 0, keluar: 320_000 },
  { id: "KAS-102", tanggal: "2026-07-10", uraian: "Penjualan tunai Gerai Sembako", kategori: "Penjualan", gerai: "Sembako", masuk: 3_050_000, keluar: 0 },
  { id: "KAS-101", tanggal: "2026-07-09", uraian: "Setoran simpanan wajib kolektif", kategori: "Simpanan", masuk: 4_280_000, keluar: 0 },
];

/** Proyeksi sederhana kas vs angsuran bank 4 bulan ke depan */
export const proyeksiKas = [
  { bulan: "Jul", kasMasuk: 96_000_000, kasKeluar: 84_000_000, angsuran: 43_100_000 },
  { bulan: "Agu", kasMasuk: 99_500_000, kasKeluar: 85_500_000, angsuran: 43_100_000 },
  { bulan: "Sep", kasMasuk: 103_000_000, kasKeluar: 87_000_000, angsuran: 43_100_000 },
  { bulan: "Okt", kasMasuk: 108_000_000, kasKeluar: 88_500_000, angsuran: 43_100_000 },
];
