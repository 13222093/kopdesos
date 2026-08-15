/**
 * Data pasar eksternal — MOCK terkurasi untuk demo (per HARI_INI 18 Juli 2026).
 * Sumber dicantumkan sebagai gaya rujukan; angka bersifat contoh, bukan kutipan riil.
 */

export const kursValas = [
  {
    pasangan: "USD/IDR",
    nilai: 16_485,
    satuan: "Rp",
    perubahanSebulanPersen: 2.1,
  },
  {
    pasangan: "JPY/IDR",
    nilai: 109.7,
    satuan: "Rp",
    perubahanSebulanPersen: 1.4,
  },
  {
    pasangan: "SGD/IDR",
    nilai: 12_640,
    satuan: "Rp",
    perubahanSebulanPersen: 0.9,
  },
] as const;

export const implikasiKurs =
  "Rupiah melemah sebulan terakhir: nilai rupiah dari kontrak ekspor dolar & yen ikut naik.";

/** Harga arabika dunia (USD/kg), 12 bulan terakhir — untuk sparkline */
export const trenKopiDunia = {
  label: "Harga kopi arabika dunia",
  satuan: "USD/kg",
  seri: [3.42, 3.55, 3.61, 3.48, 3.7, 3.85, 3.79, 3.92, 4.05, 3.98, 4.12, 4.18],
  bulanAwal: "Agu 2025",
  bulanAkhir: "Jul 2026",
  nilaiKini: 4.18,
  perubahanSetahunPersen: 22,
};

export type KabarPasar = {
  tanggal: string;
  sumber: string;
  judul: string;
  ringkas: string;
  komoditas: string[]; // id komoditas di mocks/ekspor.ts
  dampak: "peluang" | "perhatian" | "info";
};

export const kabarPasar: KabarPasar[] = [
  {
    tanggal: "2026-07-15",
    sumber: "Reuters",
    judul: "Harga arabika dunia naik 4% sepekan, pasokan Brasil terganggu embun beku",
    ringkas: "Momentum bagus untuk mempercepat konsolidasi kopi anggota.",
    komoditas: ["kopi"],
    dampak: "peluang",
  },
  {
    tanggal: "2026-07-12",
    sumber: "Kemendag",
    judul: "Jepang memperbarui aturan residu pestisida mulai Oktober 2026",
    ringkas: "Uji lab residu jadi makin penting sebelum kirim sampel kopi.",
    komoditas: ["kopi"],
    dampak: "perhatian",
  },
  {
    tanggal: "2026-07-10",
    sumber: "KKP",
    judul: "Ekspor perikanan semester I naik 9%, Jepang pasar terbesar",
    ringkas: "Permintaan ikan beku stabil; sertifikasi HACCP tetap jadi kuncinya.",
    komoditas: ["ikan-beku"],
    dampak: "peluang",
  },
  {
    tanggal: "2026-07-08",
    sumber: "BPS",
    judul: "Harga cabai domestik masih tinggi menjelang panen raya September",
    ringkas: "Menegaskan saran kami: jual cabai di pasar lokal dulu.",
    komoditas: ["cabai-bawang"],
    dampak: "info",
  },
];

export const DISCLAIMER_PASAR =
  "Kurs, tren, dan kabar pasar adalah data kurasi contoh untuk demo — bukan data pasar riil.";
