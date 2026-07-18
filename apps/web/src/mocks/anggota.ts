export type Anggota = {
  id: string;
  nama: string;
  telepon: string;
  dusun: string;
  pekerjaan: string;
  tanggalGabung: string;
  status: "aktif" | "nonaktif";
  simpanan: { pokok: number; wajib: number; sukarela: number };
  belanja90Hari: number;
};

export const daftarAnggota: Anggota[] = [
  { id: "AGT-001", nama: "I Wayan Sudirta", telepon: "0812-3861-0421", dusun: "Banjar Kaja", pekerjaan: "Petani", tanggalGabung: "2025-08-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 240_000, sukarela: 1_250_000 }, belanja90Hari: 1_840_000 },
  { id: "AGT-002", nama: "Ni Made Ayu Lestari", telepon: "0813-5320-8817", dusun: "Banjar Tengah", pekerjaan: "Pedagang", tanggalGabung: "2025-08-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 240_000, sukarela: 3_400_000 }, belanja90Hari: 2_615_000 },
  { id: "AGT-003", nama: "I Ketut Budiasa", telepon: "0857-1123-9080", dusun: "Banjar Kelod", pekerjaan: "Peternak", tanggalGabung: "2025-08-02", status: "aktif", simpanan: { pokok: 100_000, wajib: 240_000, sukarela: 750_000 }, belanja90Hari: 980_000 },
  { id: "AGT-004", nama: "Ni Putu Eka Sari", telepon: "0821-4470-1123", dusun: "Banjar Kaja", pekerjaan: "Guru", tanggalGabung: "2025-08-02", status: "aktif", simpanan: { pokok: 100_000, wajib: 240_000, sukarela: 2_100_000 }, belanja90Hari: 1_420_000 },
  { id: "AGT-005", nama: "I Gede Mahendra", telepon: "0812-9034-5561", dusun: "Banjar Tengah", pekerjaan: "Wiraswasta", tanggalGabung: "2025-08-03", status: "aktif", simpanan: { pokok: 100_000, wajib: 240_000, sukarela: 5_600_000 }, belanja90Hari: 3_105_000 },
  { id: "AGT-006", nama: "Ni Komang Tri Utami", telepon: "0819-7755-2308", dusun: "Banjar Dauh Pala", pekerjaan: "Perawat", tanggalGabung: "2025-08-05", status: "aktif", simpanan: { pokok: 100_000, wajib: 220_000, sukarela: 900_000 }, belanja90Hari: 760_000 },
  { id: "AGT-007", nama: "I Nyoman Sujana", telepon: "0852-6610-4472", dusun: "Banjar Kelod", pekerjaan: "Petani", tanggalGabung: "2025-08-05", status: "aktif", simpanan: { pokok: 100_000, wajib: 220_000, sukarela: 450_000 }, belanja90Hari: 1_230_000 },
  { id: "AGT-008", nama: "Ni Luh Putu Widiastuti", telepon: "0811-3948-7760", dusun: "Banjar Kaja", pekerjaan: "Ibu Rumah Tangga", tanggalGabung: "2025-08-06", status: "aktif", simpanan: { pokok: 100_000, wajib: 220_000, sukarela: 1_800_000 }, belanja90Hari: 2_940_000 },
  { id: "AGT-009", nama: "I Made Suarta", telepon: "0813-2201-9954", dusun: "Banjar Tengah", pekerjaan: "Nelayan", tanggalGabung: "2025-08-08", status: "aktif", simpanan: { pokok: 100_000, wajib: 220_000, sukarela: 320_000 }, belanja90Hari: 890_000 },
  { id: "AGT-010", nama: "Ni Kadek Dwi Anjani", telepon: "0878-5512-3067", dusun: "Banjar Dauh Pala", pekerjaan: "Pedagang", tanggalGabung: "2025-08-10", status: "aktif", simpanan: { pokok: 100_000, wajib: 220_000, sukarela: 2_750_000 }, belanja90Hari: 3_480_000 },
  { id: "AGT-011", nama: "I Putu Agus Wirawan", telepon: "0812-8867-0034", dusun: "Banjar Kelod", pekerjaan: "Sopir", tanggalGabung: "2025-08-12", status: "aktif", simpanan: { pokok: 100_000, wajib: 200_000, sukarela: 150_000 }, belanja90Hari: 640_000 },
  { id: "AGT-012", nama: "Ni Wayan Sri Rahayu", telepon: "0819-4402-8811", dusun: "Banjar Kaja", pekerjaan: "Penjahit", tanggalGabung: "2025-08-15", status: "aktif", simpanan: { pokok: 100_000, wajib: 200_000, sukarela: 1_050_000 }, belanja90Hari: 1_760_000 },
  { id: "AGT-013", nama: "I Komang Adi Saputra", telepon: "0857-9930-1245", dusun: "Banjar Tengah", pekerjaan: "Buruh Tani", tanggalGabung: "2025-08-18", status: "aktif", simpanan: { pokok: 100_000, wajib: 200_000, sukarela: 80_000 }, belanja90Hari: 520_000 },
  { id: "AGT-014", nama: "Ni Nengah Sulastri", telepon: "0821-6674-5590", dusun: "Banjar Dauh Pala", pekerjaan: "Pedagang Canang", tanggalGabung: "2025-08-20", status: "aktif", simpanan: { pokok: 100_000, wajib: 200_000, sukarela: 640_000 }, belanja90Hari: 1_310_000 },
  { id: "AGT-015", nama: "I Gusti Ngurah Alit", telepon: "0813-7789-2016", dusun: "Banjar Kaja", pekerjaan: "Pegawai Swasta", tanggalGabung: "2025-09-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 200_000, sukarela: 4_200_000 }, belanja90Hari: 2_180_000 },
  { id: "AGT-016", nama: "Ni Made Rai Puspita", telepon: "0812-5540-8873", dusun: "Banjar Kelod", pekerjaan: "Bidan", tanggalGabung: "2025-09-05", status: "aktif", simpanan: { pokok: 100_000, wajib: 200_000, sukarela: 1_500_000 }, belanja90Hari: 930_000 },
  { id: "AGT-017", nama: "I Wayan Gede Artana", telepon: "0852-3318-6642", dusun: "Banjar Tengah", pekerjaan: "Petani", tanggalGabung: "2025-09-10", status: "aktif", simpanan: { pokok: 100_000, wajib: 180_000, sukarela: 275_000 }, belanja90Hari: 1_050_000 },
  { id: "AGT-018", nama: "Siti Nurhaliza", telepon: "0819-2203-7784", dusun: "Banjar Dauh Pala", pekerjaan: "Pedagang", tanggalGabung: "2025-09-15", status: "aktif", simpanan: { pokok: 100_000, wajib: 180_000, sukarela: 820_000 }, belanja90Hari: 2_260_000 },
  { id: "AGT-019", nama: "I Ketut Suardana", telepon: "0878-6690-1355", dusun: "Banjar Kelod", pekerjaan: "Tukang Bangunan", tanggalGabung: "2025-09-20", status: "aktif", simpanan: { pokok: 100_000, wajib: 180_000, sukarela: 60_000 }, belanja90Hari: 480_000 },
  { id: "AGT-020", nama: "Ni Putu Ari Santika", telepon: "0813-8845-9921", dusun: "Banjar Kaja", pekerjaan: "Kasir Toko", tanggalGabung: "2025-10-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 180_000, sukarela: 390_000 }, belanja90Hari: 1_140_000 },
  { id: "AGT-021", nama: "Ahmad Fauzi", telepon: "0812-6612-3308", dusun: "Banjar Tengah", pekerjaan: "Pedagang Bakso", tanggalGabung: "2025-10-05", status: "aktif", simpanan: { pokok: 100_000, wajib: 180_000, sukarela: 1_150_000 }, belanja90Hari: 4_320_000 },
  { id: "AGT-022", nama: "Ni Luh Gede Meilani", telepon: "0857-4471-2290", dusun: "Banjar Dauh Pala", pekerjaan: "Mahasiswa", tanggalGabung: "2025-10-12", status: "aktif", simpanan: { pokok: 100_000, wajib: 160_000, sukarela: 45_000 }, belanja90Hari: 310_000 },
  { id: "AGT-023", nama: "I Made Dwi Payana", telepon: "0821-9958-4467", dusun: "Banjar Kelod", pekerjaan: "Peternak Babi", tanggalGabung: "2025-10-20", status: "aktif", simpanan: { pokok: 100_000, wajib: 160_000, sukarela: 700_000 }, belanja90Hari: 1_980_000 },
  { id: "AGT-024", nama: "Ni Kadek Yuni Antari", telepon: "0819-8834-5512", dusun: "Banjar Kaja", pekerjaan: "Pegawai Bank", tanggalGabung: "2025-11-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 160_000, sukarela: 6_800_000 }, belanja90Hari: 1_670_000 },
  { id: "AGT-025", nama: "I Nyoman Triadi", telepon: "0812-2290-6634", dusun: "Banjar Tengah", pekerjaan: "Montir", tanggalGabung: "2025-11-15", status: "aktif", simpanan: { pokok: 100_000, wajib: 140_000, sukarela: 220_000 }, belanja90Hari: 870_000 },
  { id: "AGT-026", nama: "Ni Wayan Purnami", telepon: "0813-4467-8890", dusun: "Banjar Dauh Pala", pekerjaan: "Pedagang Sayur", tanggalGabung: "2025-12-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 140_000, sukarela: 510_000 }, belanja90Hari: 2_740_000 },
  { id: "AGT-027", nama: "I Gede Pasek Suardika", telepon: "0852-1109-3345", dusun: "Banjar Kelod", pekerjaan: "Petani", tanggalGabung: "2026-01-10", status: "aktif", simpanan: { pokok: 100_000, wajib: 120_000, sukarela: 95_000 }, belanja90Hari: 690_000 },
  { id: "AGT-028", nama: "Ni Made Dian Pertiwi", telepon: "0878-9902-1156", dusun: "Banjar Kaja", pekerjaan: "Apoteker", tanggalGabung: "2026-02-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 100_000, sukarela: 1_900_000 }, belanja90Hari: 1_150_000 },
  { id: "AGT-029", nama: "I Wayan Eka Putra", telepon: "0819-5567-3320", dusun: "Banjar Tengah", pekerjaan: "Ojek Online", tanggalGabung: "2026-03-15", status: "nonaktif", simpanan: { pokok: 100_000, wajib: 80_000, sukarela: 0 }, belanja90Hari: 120_000 },
  { id: "AGT-030", nama: "Ni Ketut Ayu Wandira", telepon: "0812-7734-9016", dusun: "Banjar Dauh Pala", pekerjaan: "Ibu Rumah Tangga", tanggalGabung: "2026-04-01", status: "aktif", simpanan: { pokok: 100_000, wajib: 60_000, sukarela: 340_000 }, belanja90Hari: 1_530_000 },
];

export function totalSimpanan(a: Anggota): number {
  return a.simpanan.pokok + a.simpanan.wajib + a.simpanan.sukarela;
}
