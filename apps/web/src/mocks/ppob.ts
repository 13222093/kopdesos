/** Produk Digital (PPOB) — mock. Diproses via biller BNI; komisi = fee-based income koperasi. */

export const layananPpob = [
  { id: "pulsa", nama: "Pulsa & Paket Data", contoh: "Semua operator", ikon: "smartphone" },
  { id: "listrik", nama: "Token Listrik PLN", contoh: "Prabayar & tagihan", ikon: "zap" },
  { id: "bpjs", nama: "BPJS Kesehatan", contoh: "Iuran per keluarga", ikon: "heart" },
  { id: "pdam", nama: "Tagihan PDAM", contoh: "Air Tabanan", ikon: "droplets" },
  { id: "ewallet", nama: "Top-up E-Wallet", contoh: "GoPay, OVO, DANA", ikon: "wallet" },
  { id: "tv", nama: "TV & Internet", contoh: "IndiHome, dll.", ikon: "wifi" },
] as const;

export const ringkasanPpob = {
  komisiBulanIni: 486_000,
  jumlahTransaksiBulanIni: 312,
  rataKomisiPerTransaksi: 1_558,
};

export const riwayatPpob = [
  { waktu: "Hari ini 09.15", layanan: "Token Listrik PLN", tujuan: "5512-xxxx-9921", nominal: 100_000, komisi: 2_000 },
  { waktu: "Hari ini 08.40", layanan: "Pulsa & Paket Data", tujuan: "0812-xxxx-0421", nominal: 50_000, komisi: 1_500 },
  { waktu: "Kemarin 16.22", layanan: "BPJS Kesehatan", tujuan: "0001-xxxx-887 (3 jiwa)", nominal: 126_000, komisi: 2_500 },
  { waktu: "Kemarin 11.05", layanan: "Top-up E-Wallet", tujuan: "DANA · 0819-xxxx-2308", nominal: 200_000, komisi: 1_000 },
  { waktu: "Kemarin 09.30", layanan: "Tagihan PDAM", tujuan: "TBN-xxxx-112", nominal: 84_500, komisi: 2_000 },
];
