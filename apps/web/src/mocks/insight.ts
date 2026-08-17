export type Insight = {
  id: string;
  tipe: "peringatan" | "info" | "peluang";
  judul: string;
  /** satu baris angka kunci — selalu tampil di mode ringkas */
  inti: string;
  isi: string;
  waktu: string;
  aksi?: string;
};

export const daftarInsight: Insight[] = [
  {
    id: "INS-01",
    tipe: "peringatan",
    judul: "Angsuran bank jatuh tempo 7 hari lagi",
    inti: "Rp43,1 jt ke BNI, 25 Juli. Kas cukup, tapi tunda belanja stok besar.",
    isi: "Angsuran BNI Rp43,1 juta jatuh tempo 25 Juli. Saldo kas sekarang Rp128,4 juta — cukup, tapi setelah bayar gaji dan belanja stok minggu depan sisanya tipis. Saran saya: tunda pembelian stok yang tidak mendesak sampai tanggal 26.",
    waktu: "Hari ini 06.00",
    aksi: "Lihat Keuangan",
  },
  {
    id: "INS-02",
    tipe: "peringatan",
    judul: "3 barang laris hampir habis",
    inti: "Beras premium 12 sak, minyak 8 btl, gas 6 tbg. Pesan hari ini.",
    isi: "Beras premium sisa 12 sak (biasanya laku 8 sak/hari akhir pekan), minyak goreng 1 L sisa 8 botol, gas LPG 3 kg sisa 6 tabung. Kalau tidak dipesan hari ini, kemungkinan kehabisan sebelum Minggu.",
    waktu: "Hari ini 06.00",
    aksi: "Lihat Inventori",
  },
  {
    id: "INS-07",
    tipe: "peluang",
    judul: "Rekomendasi promosi minggu ini",
    inti: "Bundel obat hampir kedaluwarsa: selamatkan ±Rp438 rb nilai stok.",
    isi: "Antasida (66 strip) dan salep kulit (21 tube) mendekati kedaluwarsa — buat bundel 'Paket Lambung' (antasida + oralit) diskon 15% dan salep diskon 20%; berpotensi menyelamatkan ±Rp438 rb nilai stok. Kentang juga menumpuk 120 kg: tawarkan harga grosir ke warung makan anggota (ada 2 pedagang bakso & sayur).",
    waktu: "Hari ini 06.00",
    aksi: "Lihat Inventori",
  },
  {
    id: "INS-03",
    tipe: "info",
    judul: "Penjualan kemarin tertinggi minggu ini",
    inti: "Rp6,3 jt kemarin, penyumbang terbesar gerai sembako.",
    isi: "Total penjualan kemarin Rp6,3 juta, tertinggi sepanjang minggu ini. Penyumbang terbesar: gerai sembako. Margin kotor kemarin sekitar 11%.",
    waktu: "Hari ini 06.00",
  },
  {
    id: "INS-04",
    tipe: "peringatan",
    judul: "2 obat mendekati kedaluwarsa",
    inti: "Antasida (28 Jul) & salep kulit (2 Agu). Promo bundel atau retur ke PBF.",
    isi: "Antasida tablet (66 strip) kedaluwarsa 28 Juli dan salep kulit (21 tube) kedaluwarsa 2 Agustus. Saran: buat promo bundel minggu ini atau retur ke PBF sebelum tanggal 25 supaya tidak jadi kerugian.",
    waktu: "Kemarin 06.00",
    aksi: "Lihat Apotek",
  },
  {
    id: "INS-05",
    tipe: "peluang",
    judul: "Harga cabai sedang tinggi — untung untuk titipan petani",
    inti: "52 kg titipan × Rp45 rb/kg: potensi Rp2,3 jt kalau dijual minggu ini.",
    isi: "Harga cabai di pasar Tabanan naik ke Rp45.000/kg. Ada 52 kg titipan petani di cold storage. Kalau dijual minggu ini lewat gerai logistik, perkiraan hasil Rp2,3 juta — lebih baik daripada menunggu, karena harga diprediksi turun setelah panen raya bulan depan.",
    waktu: "Kemarin 06.00",
  },
  {
    id: "INS-06",
    tipe: "info",
    judul: "1 pinjaman anggota macet, 2 perlu perhatian",
    inti: "Pak Ketut Rp4,95 jt telat 38 hari. Kunjungi langsung minggu ini.",
    isi: "Pinjaman Pak Ketut Suardana (Rp4,95 juta) sudah lewat jatuh tempo 38 hari. Saran: jadwalkan kunjungan silaturahmi minggu ini — data menunjukkan penagihan lewat kunjungan 3× lebih berhasil daripada lewat pesan.",
    waktu: "2 hari lalu",
    aksi: "Lihat Simpan Pinjam",
  },
];
