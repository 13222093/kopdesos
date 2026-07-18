export type Insight = {
  id: string;
  tipe: "peringatan" | "info" | "peluang";
  judul: string;
  isi: string;
  waktu: string;
  aksi?: string;
};

export const daftarInsight: Insight[] = [
  {
    id: "INS-01",
    tipe: "peringatan",
    judul: "Angsuran bank jatuh tempo 7 hari lagi",
    isi: "Angsuran BRI Rp43,1 juta jatuh tempo 25 Juli. Saldo kas sekarang Rp128,4 juta — cukup, tapi setelah bayar gaji dan belanja stok minggu depan sisanya tipis. Saran saya: tunda pembelian stok yang tidak mendesak sampai tanggal 26.",
    waktu: "Hari ini 06.00",
    aksi: "Lihat Keuangan",
  },
  {
    id: "INS-02",
    tipe: "peringatan",
    judul: "3 barang laris hampir habis",
    isi: "Beras premium sisa 12 sak (biasanya laku 8 sak/hari akhir pekan), minyak goreng 1 L sisa 8 botol, gas LPG 3 kg sisa 6 tabung. Kalau tidak dipesan hari ini, kemungkinan kehabisan sebelum Minggu.",
    waktu: "Hari ini 06.00",
    aksi: "Lihat Inventori",
  },
  {
    id: "INS-03",
    tipe: "info",
    judul: "Penjualan kemarin naik 9% dari rata-rata",
    isi: "Total penjualan kemarin Rp4,6 juta, lebih tinggi dari rata-rata hari Jumat (Rp4,2 juta). Penyumbang terbesar: gerai sembako Rp3,3 juta. Margin kotor kemarin sekitar 11%.",
    waktu: "Hari ini 06.00",
  },
  {
    id: "INS-04",
    tipe: "peringatan",
    judul: "2 obat mendekati kedaluwarsa",
    isi: "Antasida tablet (66 strip) kedaluwarsa 28 Juli dan salep kulit (21 tube) kedaluwarsa 2 Agustus. Saran: buat promo bundel minggu ini atau retur ke PBF sebelum tanggal 25 supaya tidak jadi kerugian.",
    waktu: "Kemarin 06.00",
    aksi: "Lihat Apotek",
  },
  {
    id: "INS-05",
    tipe: "peluang",
    judul: "Harga cabai sedang tinggi — untung untuk titipan petani",
    isi: "Harga cabai di pasar Tabanan naik ke Rp45.000/kg. Ada 52 kg titipan petani di cold storage. Kalau dijual minggu ini lewat gerai logistik, perkiraan hasil Rp2,3 juta — lebih baik daripada menunggu, karena harga diprediksi turun setelah panen raya bulan depan.",
    waktu: "Kemarin 06.00",
  },
  {
    id: "INS-06",
    tipe: "info",
    judul: "1 pinjaman anggota macet, 2 perlu perhatian",
    isi: "Pinjaman Pak Ketut Suardana (Rp4,95 juta) sudah lewat jatuh tempo 38 hari. Saran: jadwalkan kunjungan silaturahmi minggu ini — data menunjukkan penagihan lewat kunjungan 3× lebih berhasil daripada lewat pesan.",
    waktu: "2 hari lalu",
    aksi: "Lihat Simpan Pinjam",
  },
];
