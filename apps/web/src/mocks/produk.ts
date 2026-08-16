export type Produk = {
  id: string;
  nama: string;
  kategori: string;
  gerai: "sembako" | "apotek" | "gudang";
  satuan: string;
  hargaBeli: number;
  hargaJual: number;
  stok: number;
  stokMinimum: number;
  /** khusus apotek */
  batch?: string;
  kedaluwarsa?: string;
};

export const daftarProduk: Produk[] = [
  // ── Gerai Sembako ──────────────────────────────────────────────
  { id: "SMB-001", nama: "Beras Premium 5 kg", kategori: "Beras", gerai: "sembako", satuan: "sak", hargaBeli: 62_000, hargaJual: 68_000, stok: 12, stokMinimum: 20 },
  { id: "SMB-002", nama: "Beras Medium 5 kg", kategori: "Beras", gerai: "sembako", satuan: "sak", hargaBeli: 54_000, hargaJual: 59_000, stok: 34, stokMinimum: 20 },
  { id: "SMB-003", nama: "Minyak Goreng 1 L", kategori: "Minyak", gerai: "sembako", satuan: "btl", hargaBeli: 15_800, hargaJual: 17_500, stok: 8, stokMinimum: 24 },
  { id: "SMB-004", nama: "Minyak Goreng 2 L", kategori: "Minyak", gerai: "sembako", satuan: "btl", hargaBeli: 31_000, hargaJual: 34_000, stok: 41, stokMinimum: 18 },
  { id: "SMB-005", nama: "Gula Pasir 1 kg", kategori: "Gula", gerai: "sembako", satuan: "kg", hargaBeli: 16_200, hargaJual: 18_000, stok: 56, stokMinimum: 25 },
  { id: "SMB-006", nama: "Telur Ayam 1 kg", kategori: "Protein", gerai: "sembako", satuan: "kg", hargaBeli: 27_000, hargaJual: 30_000, stok: 22, stokMinimum: 15 },
  { id: "SMB-007", nama: "Tepung Terigu 1 kg", kategori: "Tepung", gerai: "sembako", satuan: "kg", hargaBeli: 10_500, hargaJual: 12_000, stok: 48, stokMinimum: 20 },
  { id: "SMB-008", nama: "Mie Instan Goreng", kategori: "Mie", gerai: "sembako", satuan: "pcs", hargaBeli: 2_700, hargaJual: 3_200, stok: 240, stokMinimum: 120 },
  { id: "SMB-009", nama: "Kopi Bubuk Bali 200 g", kategori: "Minuman", gerai: "sembako", satuan: "bks", hargaBeli: 14_000, hargaJual: 16_500, stok: 37, stokMinimum: 15 },
  { id: "SMB-010", nama: "Teh Celup isi 25", kategori: "Minuman", gerai: "sembako", satuan: "ktk", hargaBeli: 5_800, hargaJual: 7_000, stok: 64, stokMinimum: 20 },
  { id: "SMB-011", nama: "Garam Beryodium 250 g", kategori: "Bumbu", gerai: "sembako", satuan: "bks", hargaBeli: 2_200, hargaJual: 3_000, stok: 88, stokMinimum: 30 },
  { id: "SMB-012", nama: "Kecap Manis 550 ml", kategori: "Bumbu", gerai: "sembako", satuan: "btl", hargaBeli: 21_000, hargaJual: 23_500, stok: 26, stokMinimum: 12 },
  { id: "SMB-013", nama: "Santan Instan 200 ml", kategori: "Bumbu", gerai: "sembako", satuan: "pcs", hargaBeli: 6_500, hargaJual: 7_500, stok: 52, stokMinimum: 20 },
  { id: "SMB-014", nama: "Sabun Mandi Batang", kategori: "Kebersihan", gerai: "sembako", satuan: "pcs", hargaBeli: 3_800, hargaJual: 4_500, stok: 96, stokMinimum: 40 },
  { id: "SMB-015", nama: "Deterjen Bubuk 800 g", kategori: "Kebersihan", gerai: "sembako", satuan: "bks", hargaBeli: 17_500, hargaJual: 19_500, stok: 31, stokMinimum: 15 },
  { id: "SMB-016", nama: "Gas LPG 3 kg (isi ulang)", kategori: "Energi", gerai: "sembako", satuan: "tbg", hargaBeli: 16_500, hargaJual: 19_000, stok: 6, stokMinimum: 15 },
  { id: "SMB-017", nama: "Air Mineral Galon (isi ulang)", kategori: "Minuman", gerai: "sembako", satuan: "gln", hargaBeli: 5_000, hargaJual: 7_000, stok: 28, stokMinimum: 10 },
  { id: "SMB-018", nama: "Susu Kental Manis Kaleng", kategori: "Susu", gerai: "sembako", satuan: "klg", hargaBeli: 10_800, hargaJual: 12_500, stok: 44, stokMinimum: 18 },

  // ── Apotek Desa ────────────────────────────────────────────────
  { id: "APT-001", nama: "Paracetamol 500 mg (strip)", kategori: "Obat Bebas", gerai: "apotek", satuan: "strip", hargaBeli: 2_500, hargaJual: 4_000, stok: 120, stokMinimum: 40, batch: "PCM-2508-A", kedaluwarsa: "2027-08-01" },
  { id: "APT-002", nama: "Obat Batuk Sirup 100 ml", kategori: "Obat Bebas", gerai: "apotek", satuan: "btl", hargaBeli: 14_000, hargaJual: 18_500, stok: 18, stokMinimum: 12, batch: "OBH-2506-B", kedaluwarsa: "2026-08-09" },
  { id: "APT-003", nama: "Vitamin C 500 mg (botol 30)", kategori: "Vitamin", gerai: "apotek", satuan: "btl", hargaBeli: 18_000, hargaJual: 24_000, stok: 42, stokMinimum: 15, batch: "VTC-2510-A", kedaluwarsa: "2027-10-01" },
  { id: "APT-004", nama: "Antasida Tablet (strip)", kategori: "Obat Bebas", gerai: "apotek", satuan: "strip", hargaBeli: 3_200, hargaJual: 5_000, stok: 66, stokMinimum: 20, batch: "ANT-2503-C", kedaluwarsa: "2026-07-28" },
  { id: "APT-005", nama: "Betadine 15 ml", kategori: "P3K", gerai: "apotek", satuan: "btl", hargaBeli: 17_500, hargaJual: 22_000, stok: 24, stokMinimum: 10, batch: "BTD-2509-A", kedaluwarsa: "2028-03-01" },
  { id: "APT-006", nama: "Perban Elastis 5 cm", kategori: "P3K", gerai: "apotek", satuan: "rol", hargaBeli: 6_000, hargaJual: 8_500, stok: 35, stokMinimum: 12 },
  { id: "APT-007", nama: "Minyak Kayu Putih 60 ml", kategori: "Herbal", gerai: "apotek", satuan: "btl", hargaBeli: 24_000, hargaJual: 29_000, stok: 28, stokMinimum: 10, batch: "MKP-2511-A", kedaluwarsa: "2028-11-01" },
  { id: "APT-008", nama: "Tolak Angin Cair (sachet)", kategori: "Herbal", gerai: "apotek", satuan: "sct", hargaBeli: 3_400, hargaJual: 4_500, stok: 150, stokMinimum: 50, batch: "TAC-2507-B", kedaluwarsa: "2027-01-15" },
  { id: "APT-009", nama: "Oralit (sachet)", kategori: "Obat Bebas", gerai: "apotek", satuan: "sct", hargaBeli: 900, hargaJual: 1_500, stok: 9, stokMinimum: 30, batch: "ORL-2504-A", kedaluwarsa: "2027-04-01" },
  { id: "APT-010", nama: "Salep Kulit 88 (tube)", kategori: "Obat Bebas", gerai: "apotek", satuan: "tube", hargaBeli: 9_500, hargaJual: 13_000, stok: 21, stokMinimum: 8, batch: "SLP-2502-A", kedaluwarsa: "2026-08-02" },
  { id: "APT-011", nama: "Masker Medis (kotak 50)", kategori: "Alkes", gerai: "apotek", satuan: "ktk", hargaBeli: 22_000, hargaJual: 28_000, stok: 16, stokMinimum: 6 },
  { id: "APT-012", nama: "Termometer Digital", kategori: "Alkes", gerai: "apotek", satuan: "pcs", hargaBeli: 28_000, hargaJual: 38_000, stok: 7, stokMinimum: 3 },

  // ── Cold Storage ───────────────────────────────────────────────
  { id: "CLD-001", nama: "Ikan Tongkol Beku", kategori: "Hasil Laut", gerai: "gudang", satuan: "kg", hargaBeli: 26_000, hargaJual: 32_000, stok: 85, stokMinimum: 40 },
  { id: "CLD-002", nama: "Cabai Merah (titipan petani)", kategori: "Hortikultura", gerai: "gudang", satuan: "kg", hargaBeli: 38_000, hargaJual: 45_000, stok: 52, stokMinimum: 20 },
  { id: "CLD-003", nama: "Bawang Merah", kategori: "Hortikultura", gerai: "gudang", satuan: "kg", hargaBeli: 30_000, hargaJual: 36_000, stok: 14, stokMinimum: 25 },
  { id: "CLD-004", nama: "Daging Ayam Beku", kategori: "Protein", gerai: "gudang", satuan: "kg", hargaBeli: 32_000, hargaJual: 38_000, stok: 46, stokMinimum: 20 },
  { id: "CLD-005", nama: "Kentang Granola", kategori: "Hortikultura", gerai: "gudang", satuan: "kg", hargaBeli: 14_000, hargaJual: 18_000, stok: 120, stokMinimum: 50 },
];

export function stokMenipis(p: Produk): boolean {
  return p.stok < p.stokMinimum;
}

/** emoji fallback slot gambar produk (/gambar/produk/{id}.jpg) per kategori */
export const EMOJI_KATEGORI: Record<string, string> = {
  Beras: "🍚",
  Minyak: "🫗",
  Gula: "🍯",
  Protein: "🥚",
  Tepung: "🌾",
  Mie: "🍜",
  Minuman: "☕",
  Bumbu: "🧂",
  Kebersihan: "🧼",
  Energi: "🔥",
  Susu: "🥛",
  "Obat Bebas": "💊",
  Vitamin: "💊",
  P3K: "🩹",
  Herbal: "🌿",
  Alkes: "🩺",
  "Hasil Laut": "🐟",
  Hortikultura: "🥬",
};

export function emojiProduk(p: Produk): string {
  return EMOJI_KATEGORI[p.kategori] ?? "📦";
}

/** Rata-rata laju penjualan harian per produk (unit/hari) — dasar prediksi permintaan */
const LAJU_JUAL_HARIAN: Record<string, number> = {
  "SMB-001": 4, "SMB-002": 5, "SMB-003": 3, "SMB-004": 4, "SMB-005": 6,
  "SMB-006": 3, "SMB-007": 4, "SMB-008": 28, "SMB-009": 3, "SMB-010": 5,
  "SMB-011": 6, "SMB-012": 2, "SMB-013": 4, "SMB-014": 8, "SMB-015": 3,
  "SMB-016": 2, "SMB-017": 5, "SMB-018": 4,
  "APT-001": 9, "APT-002": 2, "APT-003": 3, "APT-004": 5, "APT-005": 1,
  "APT-006": 2, "APT-007": 2, "APT-008": 12, "APT-009": 3, "APT-010": 1,
  "APT-011": 1, "APT-012": 0.5,
  "CLD-001": 9, "CLD-002": 6, "CLD-003": 4, "CLD-004": 5, "CLD-005": 11,
};

export type PrediksiStok = {
  lajuHarian: number;
  habisDalamHari: number;
  saranPesan: number;
  estimasiBiayaPesan: number;
};

/**
 * Prediksi permintaan sederhana & transparan:
 * habis = stok / laju; saran pesan = kebutuhan 7 hari + stok minimum − stok saat ini.
 */
export function prediksiStok(p: Produk): PrediksiStok {
  const laju = LAJU_JUAL_HARIAN[p.id] ?? 1;
  const habisDalamHari = Math.max(0, Math.round(p.stok / laju));
  const saranPesan = Math.max(0, Math.ceil(laju * 7 + p.stokMinimum - p.stok));
  return {
    lajuHarian: laju,
    habisDalamHari,
    saranPesan,
    estimasiBiayaPesan: saranPesan * p.hargaBeli,
  };
}

// ── Pengadaan (Purchase Order) — mock ────────────────────────────

export type StatusPo = "draft" | "dikirim" | "diterima";

export const daftarPengadaan = [
  {
    id: "PO-007",
    tanggal: "2026-07-18",
    pemasok: "Distributor Sembako Tabanan",
    isi: "Beras Premium 5 kg × 36 sak",
    nilai: 2_232_000,
    status: "draft" as StatusPo,
    catatan: "Dibuat dari saran prediksi permintaan",
  },
  {
    id: "PO-006",
    tanggal: "2026-07-16",
    pemasok: "Distributor Sembako Tabanan",
    isi: "Minyak goreng 1 L × 37 btl · Gas LPG 3 kg × 23 tbg",
    nilai: 964_100,
    status: "dikirim" as StatusPo,
    catatan: "Perkiraan tiba 19 Juli",
  },
  {
    id: "PO-005",
    tanggal: "2026-07-17",
    pemasok: "Distributor Sembako Tabanan",
    isi: "Beras Medium 5 kg × 28 sak",
    nilai: 1_736_000,
    status: "diterima" as StatusPo,
    catatan: "Sudah tercatat di buku kas (KAS-115)",
  },
];

/** Kedaluwarsa dalam ≤ hariBatas hari dari HARI_INI (2026-07-18) */
export function hampirKedaluwarsa(p: Produk, hariBatas = 30): boolean {
  if (!p.kedaluwarsa) return false;
  const selisih =
    (new Date(`${p.kedaluwarsa}T00:00:00`).getTime() -
      new Date("2026-07-18T00:00:00").getTime()) /
    86_400_000;
  return selisih <= hariBatas;
}
