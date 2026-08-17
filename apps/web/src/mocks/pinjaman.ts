// ── Pinjaman modal bank (BNI) ─────────────────────────────────────
// Plafon Rp 3 M, bunga 6%/tahun, tenor 72 bulan, grace period 6 bulan.
// Pencairan 15 Okt 2025; angsuran penuh mulai 25 Mei 2026.

export const pinjamanHimbara = {
  bank: "BNI",
  plafon: 3_000_000_000,
  dicairkan: 2_600_000_000,
  tanggalPencairan: "2025-10-15",
  bungaTahunan: 0.06,
  tenorBulan: 72,
  gracePeriodBulan: 6,
  angsuranBulanan: 43_100_000, // anuitas atas Rp 2,6 M @ 0,5%/bln, 72 bln
  angsuranKe: 3,
  totalAngsuran: 72,
  sisaPokok: 2_547_000_000,
  jatuhTempoBerikut: "2026-07-25",
  riwayat: [
    { ke: 1, tanggal: "2026-05-25", jumlah: 43_100_000, status: "lunas" as const },
    { ke: 2, tanggal: "2026-06-25", jumlah: 43_100_000, status: "lunas" as const },
    { ke: 3, tanggal: "2026-07-25", jumlah: 43_100_000, status: "menunggu" as const },
  ],
};

// ── Pinjaman anggota (unit simpan pinjam) ─────────────────────────

export type Kolektibilitas = "lancar" | "perhatian" | "macet";

export type PinjamanAnggota = {
  id: string;
  anggotaId: string;
  namaAnggota: string;
  tujuan: string;
  pokok: number;
  sisa: number;
  tenorBulan: number;
  angsuranBulanan: number;
  angsuranKe: number;
  jatuhTempoBerikut: string;
  kolektibilitas: Kolektibilitas;
  tanggalCair: string;
};

export const pinjamanAnggota: PinjamanAnggota[] = [
  { id: "PJM-001", anggotaId: "AGT-005", namaAnggota: "I Gede Mahendra", tujuan: "Modal warung kelontong", pokok: 15_000_000, sisa: 10_500_000, tenorBulan: 24, angsuranBulanan: 690_000, angsuranKe: 8, jatuhTempoBerikut: "2026-07-20", kolektibilitas: "lancar", tanggalCair: "2025-11-20" },
  { id: "PJM-002", anggotaId: "AGT-002", namaAnggota: "Ni Made Ayu Lestari", tujuan: "Tambahan modal dagang pasar", pokok: 10_000_000, sisa: 6_250_000, tenorBulan: 18, angsuranBulanan: 610_000, angsuranKe: 7, jatuhTempoBerikut: "2026-07-22", kolektibilitas: "lancar", tanggalCair: "2025-12-22" },
  { id: "PJM-003", anggotaId: "AGT-021", namaAnggota: "Ahmad Fauzi", tujuan: "Gerobak bakso baru", pokok: 8_000_000, sisa: 5_800_000, tenorBulan: 24, angsuranBulanan: 368_000, angsuranKe: 6, jatuhTempoBerikut: "2026-07-25", kolektibilitas: "lancar", tanggalCair: "2026-01-25" },
  { id: "PJM-004", anggotaId: "AGT-010", namaAnggota: "Ni Kadek Dwi Anjani", tujuan: "Stok dagangan hari raya", pokok: 5_000_000, sisa: 2_100_000, tenorBulan: 12, angsuranBulanan: 430_000, angsuranKe: 7, jatuhTempoBerikut: "2026-07-15", kolektibilitas: "perhatian", tanggalCair: "2025-12-15" },
  { id: "PJM-005", anggotaId: "AGT-023", namaAnggota: "I Made Dwi Payana", tujuan: "Bibit & pakan ternak", pokok: 12_000_000, sisa: 9_900_000, tenorBulan: 30, angsuranBulanan: 440_000, angsuranKe: 5, jatuhTempoBerikut: "2026-07-28", kolektibilitas: "lancar", tanggalCair: "2026-02-28" },
  { id: "PJM-006", anggotaId: "AGT-019", namaAnggota: "I Ketut Suardana", tujuan: "Perbaikan rumah", pokok: 6_000_000, sisa: 4_950_000, tenorBulan: 24, angsuranBulanan: 276_000, angsuranKe: 4, jatuhTempoBerikut: "2026-06-10", kolektibilitas: "macet", tanggalCair: "2026-02-10" },
  { id: "PJM-007", anggotaId: "AGT-026", namaAnggota: "Ni Wayan Purnami", tujuan: "Modal dagang sayur", pokok: 4_000_000, sisa: 2_700_000, tenorBulan: 12, angsuranBulanan: 345_000, angsuranKe: 4, jatuhTempoBerikut: "2026-07-19", kolektibilitas: "lancar", tanggalCair: "2026-03-19" },
  { id: "PJM-008", anggotaId: "AGT-012", namaAnggota: "Ni Wayan Sri Rahayu", tujuan: "Mesin jahit", pokok: 7_500_000, sisa: 6_400_000, tenorBulan: 24, angsuranBulanan: 345_000, angsuranKe: 3, jatuhTempoBerikut: "2026-07-24", kolektibilitas: "lancar", tanggalCair: "2026-04-24" },
  { id: "PJM-009", anggotaId: "AGT-015", namaAnggota: "I Gusti Ngurah Alit", tujuan: "Biaya kuliah anak", pokok: 20_000_000, sisa: 18_400_000, tenorBulan: 36, angsuranBulanan: 640_000, angsuranKe: 2, jatuhTempoBerikut: "2026-07-30", kolektibilitas: "lancar", tanggalCair: "2026-05-30" },
  { id: "PJM-010", anggotaId: "AGT-009", namaAnggota: "I Made Suarta", tujuan: "Jaring & perlengkapan melaut", pokok: 5_500_000, sisa: 5_050_000, tenorBulan: 18, angsuranBulanan: 335_000, angsuranKe: 1, jatuhTempoBerikut: "2026-07-12", kolektibilitas: "perhatian", tanggalCair: "2026-06-12" },
  { id: "PJM-011", anggotaId: "AGT-014", namaAnggota: "Ni Nengah Sulastri", tujuan: "Modal dagang canang", pokok: 3_000_000, sisa: 2_770_000, tenorBulan: 12, angsuranBulanan: 259_000, angsuranKe: 1, jatuhTempoBerikut: "2026-08-05", kolektibilitas: "lancar", tanggalCair: "2026-07-05" },
  { id: "PJM-012", anggotaId: "AGT-025", namaAnggota: "I Nyoman Triadi", tujuan: "Peralatan bengkel", pokok: 9_000_000, sisa: 8_300_000, tenorBulan: 30, angsuranBulanan: 330_000, angsuranKe: 2, jatuhTempoBerikut: "2026-08-02", kolektibilitas: "lancar", tanggalCair: "2026-06-02" },
];

export const labelKolektibilitas: Record<Kolektibilitas, string> = {
  lancar: "Lancar",
  perhatian: "Perlu Perhatian",
  macet: "Macet",
};

export const ringkasanSimpanPinjam = {
  totalPinjamanBeredar: pinjamanAnggota.reduce((t, p) => t + p.sisa, 0),
  totalSimpananAnggota: 48_350_000,
  pinjamanMacet: pinjamanAnggota.filter((p) => p.kolektibilitas === "macet").length,
  pinjamanPerhatian: pinjamanAnggota.filter((p) => p.kolektibilitas === "perhatian").length,
};
