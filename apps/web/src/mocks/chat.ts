export type Pesan = {
  id: string;
  dari: "anggota" | "ai" | "petugas";
  teks: string;
  jam: string;
};

export type Room = {
  id: string;
  namaKontak: string;
  telepon: string;
  anggotaId?: string;
  cuplikan: string;
  jamTerakhir: string;
  belumDibaca: number;
  label?: string;
  pesan: Pesan[];
};

export const daftarRoom: Room[] = [
  {
    id: "ROOM-01",
    namaKontak: "Ni Kadek Dwi Anjani",
    telepon: "0878-5512-3067",
    anggotaId: "AGT-010",
    cuplikan: "Baik, saya pesan 2 sak beras premium ya",
    jamTerakhir: "09.42",
    belumDibaca: 0,
    label: "Pesanan",
    pesan: [
      { id: "m1", dari: "anggota", teks: "Halo, beras premium 5 kg masih ada? Harganya berapa sekarang?", jam: "09.36" },
      { id: "m2", dari: "ai", teks: "Halo Bu Kadek 🙏 Masih ada. Beras premium 5 kg harganya Rp68.000/sak. Stoknya tinggal 12 sak — mau saya siapkan berapa?", jam: "09.37" },
      { id: "m3", dari: "anggota", teks: "Baik, saya pesan 2 sak beras premium ya", jam: "09.42" },
      { id: "m4", dari: "ai", teks: "Siap, 2 sak beras premium total Rp136.000. Bisa diambil di gerai mulai jam 10.00, atau mau diantar? Ongkir dalam desa gratis untuk anggota.", jam: "09.42" },
    ],
  },
  {
    id: "ROOM-02",
    namaKontak: "Ahmad Fauzi",
    telepon: "0812-6612-3308",
    anggotaId: "AGT-021",
    cuplikan: "Terima kasih infonya 🙏",
    jamTerakhir: "08.15",
    belumDibaca: 0,
    label: "Simpan Pinjam",
    pesan: [
      { id: "m1", dari: "anggota", teks: "Pak/Bu, angsuran saya bulan ini jatuh tempo tanggal berapa ya? Dan sisanya berapa?", jam: "08.11" },
      { id: "m2", dari: "ai", teks: "Halo Pak Ahmad 🙏 Angsuran pinjaman gerobak bakso (PJM-003) jatuh tempo 25 Juli 2026, sebesar Rp368.000 (angsuran ke-6 dari 24). Sisa pinjaman Rp5.800.000. Bisa dibayar tunai di kantor koperasi atau transfer ke rekening koperasi.", jam: "08.12" },
      { id: "m3", dari: "anggota", teks: "Terima kasih infonya 🙏", jam: "08.15" },
    ],
  },
  {
    id: "ROOM-03",
    namaKontak: "Ni Luh Putu Widiastuti",
    telepon: "0811-3948-7760",
    anggotaId: "AGT-008",
    cuplikan: "Saldo simpanan Ibu saat ini Rp2.120.000…",
    jamTerakhir: "Kemarin",
    belumDibaca: 1,
    label: "Simpanan",
    pesan: [
      { id: "m1", dari: "anggota", teks: "Sore, mau cek saldo simpanan saya dong", jam: "16.20" },
      { id: "m2", dari: "ai", teks: "Sore Bu Luh 🙏 Saldo simpanan Ibu saat ini Rp2.120.000 — rinciannya: pokok Rp100.000, wajib Rp220.000, sukarela Rp1.800.000. Mau sekalian setor atau tarik simpanan?", jam: "16.21" },
    ],
  },
  {
    id: "ROOM-04",
    namaKontak: "I Nyoman Sujana",
    telepon: "0852-6610-4472",
    anggotaId: "AGT-007",
    cuplikan: "Cabainya bisa dititip di cold storage?",
    jamTerakhir: "Kemarin",
    belumDibaca: 2,
    label: "Cold Storage",
    pesan: [
      { id: "m1", dari: "anggota", teks: "Panen cabai saya banyak minggu ini, takut busuk. Cabainya bisa dititip di cold storage?", jam: "14.05" },
      { id: "m2", dari: "ai", teks: "Bisa Pak Nyoman 🙏 Cold storage masih ada ruang. Biaya titip untuk anggota Rp500/kg per minggu. Kalau mau, koperasi juga bisa bantu jualkan ke pengepul dengan harga pasar hari ini Rp45.000/kg. Bapak mau titip berapa kilo?", jam: "14.07" },
      { id: "m3", dari: "anggota", teks: "Wah boleh itu. Besok saya bawa sekitar 80 kg ya", jam: "14.30" },
    ],
  },
  {
    id: "ROOM-05",
    namaKontak: "Ni Made Rai Puspita",
    telepon: "0812-5540-8873",
    anggotaId: "AGT-016",
    cuplikan: "Obat batuk anak untuk umur 5 tahun ada?",
    jamTerakhir: "Kemarin",
    belumDibaca: 0,
    label: "Apotek",
    pesan: [
      { id: "m1", dari: "anggota", teks: "Obat batuk anak untuk umur 5 tahun ada?", jam: "19.44" },
      { id: "m2", dari: "ai", teks: "Halo Bu Made 🙏 Ada, obat batuk sirup 100 ml Rp18.500. Untuk anak 5 tahun dosisnya 3×1 sendok teh sehari. Kalau batuknya lebih dari 3 hari atau disertai demam tinggi, sebaiknya periksa ke Puskesmas ya Bu. Mau saya siapkan 1 botol?", jam: "19.45" },
      { id: "m3", dari: "petugas", teks: "[Ditangani petugas] Bu Made, botolnya sudah saya pisahkan di kasir atas nama Ibu ya. — Sari", jam: "19.58" },
    ],
  },
];
