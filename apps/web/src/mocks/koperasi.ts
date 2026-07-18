/** Tanggal "hari ini" yang dibekukan agar demo deterministik */
export const HARI_INI = "2026-07-18";

export const koperasi = {
  id: "kopdes-sukamaju",
  nama: "Kopdes Merah Putih Sukamaju",
  namaPendek: "Kopdes Sukamaju",
  desa: "Desa Sukamaju",
  kecamatan: "Kec. Tabanan",
  kabupaten: "Kab. Tabanan, Bali",
  badanHukum: "AHU-0012345.AH.01.29.TAHUN 2025",
  tanggalBerdiri: "2025-07-21",
  jumlahAnggota: 214,
  pengurus: {
    ketua: "I Wayan Sudirta",
    wakilKetuaUsaha: "Ni Made Ayu Lestari",
    wakilKetuaKeanggotaan: "I Ketut Budiasa",
    sekretaris: "Ni Putu Eka Sari",
    bendahara: "I Gede Mahendra",
  },
  pengawas: {
    ketua: "I Nyoman Artha (Kepala Desa, ex-officio)",
  },
  manajer: "Sari Wulandari",
  gerai: [
    { id: "sembako", nama: "Gerai Sembako", aktif: true },
    { id: "apotek", nama: "Apotek Desa", aktif: true },
    { id: "klinik", nama: "Klinik Desa", aktif: false },
    { id: "simpan-pinjam", nama: "Unit Simpan Pinjam", aktif: true },
    { id: "gudang", nama: "Cold Storage", aktif: true },
    { id: "logistik", nama: "Gerai Logistik", aktif: false },
  ],
} as const;
