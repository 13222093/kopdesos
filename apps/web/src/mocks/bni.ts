/**
 * Data kurasi layanan BNI yang relevan untuk koperasi desa — MOCKUP demo
 * Spark Arc 2026. Status menunjukkan kondisi di platform, bukan klaim
 * kemitraan resmi. AI dilarang mengarang produk/tarif bank di luar data ini.
 */

export type LayananBni = {
  nama: string;
  jenis: string;
  penjelasanSederhana: string;
  manfaatUntukKoperasi: string;
  statusDiPlatform: "terhubung" | "aktif" | "segera";
};

export const layananBni: LayananBni[] = [
  {
    nama: "Giro BNI Koperasi",
    jenis: "Rekening operasional (CASA)",
    penjelasanSederhana:
      "Rekening tempat semua uang koperasi terkumpul: hasil penjualan gerai, simpanan anggota, dan dana operasional.",
    manfaatUntukKoperasi:
      "Uang tercatat rapi dan aman di bank, bukan di laci. Semua transaksi platform tercermin di satu rekening.",
    statusDiPlatform: "terhubung",
  },
  {
    nama: "QRIS BNI Merchant",
    jenis: "Penerimaan pembayaran",
    penjelasanSederhana:
      "Pembeli bayar dengan memindai kode QR dari aplikasi bank/e-wallet apa pun; dana masuk ke Giro BNI koperasi.",
    manfaatUntukKoperasi:
      "Kasir tidak pegang banyak uang tunai, tidak perlu kembalian, dan penjualan otomatis tercatat.",
    statusDiPlatform: "aktif",
  },
  {
    nama: "BNI Virtual Account",
    jenis: "Penagihan",
    penjelasanSederhana:
      "Setiap anggota dapat nomor rekening tagihan pribadi untuk bayar angsuran atau setor simpanan dari bank/e-wallet mana pun.",
    manfaatUntukKoperasi:
      "Angsuran pinjaman anggota tercatat otomatis — bendahara tidak perlu mencocokkan bukti transfer satu-satu.",
    statusDiPlatform: "segera",
  },
  {
    nama: "Agen46",
    jenis: "Keagenan bank (laku pandai)",
    penjelasanSederhana:
      "Koperasi menjadi agen layanan bank untuk warga desa: buka tabungan, setor-tarik tunai, bayar tagihan, top-up.",
    manfaatUntukKoperasi:
      "Pendapatan komisi baru untuk koperasi + warga desa jadi nasabah tanpa harus ke kota. BNI sudah punya kerja sama dengan Kemenkop untuk model ini.",
    statusDiPlatform: "segera",
  },
  {
    nama: "BNI Xpora",
    jenis: "Solusi UMKM Go Global",
    penjelasanSederhana:
      "Program BNI untuk membawa UMKM/koperasi menembus pasar ekspor: pendampingan, kurasi buyer, pembiayaan, dan trade finance.",
    manfaatUntukKoperasi:
      "Jalur ekspor kopi/komoditas anggota dengan pendamping resmi — kantor Xpora terdekat ada di Denpasar.",
    statusDiPlatform: "segera",
  },
  {
    nama: "Pinjaman Modal Usaha BNI",
    jenis: "Pinjaman modal",
    penjelasanSederhana:
      "Pinjaman modal koperasi hingga Rp3 miliar (bunga 6%/tahun, tenor 72 bulan) — sudah berjalan lewat BNI.",
    manfaatUntukKoperasi:
      "Modal pembangunan gerai & operasional; platform memantau jadwal angsuran vs kas secara otomatis.",
    statusDiPlatform: "terhubung",
  },
];
