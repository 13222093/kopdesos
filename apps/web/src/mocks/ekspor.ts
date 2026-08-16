/**
 * Data kurasi fitur Ekspor — MOCKUP untuk demo.
 * Regulasi & harga bersifat contoh terkurasi, bukan nasihat hukum;
 * selalu arahkan verifikasi ke InaExport / Dinas Perdagangan / Bea Cukai.
 */

// ── Kesiapan Ekspor ──────────────────────────────────────────────

export type DimensiKesiapan = {
  nama: string;
  skor: number; // 0-100
  status: "baik" | "cukup" | "kurang";
  ringkasan: string;
  caraMenaikkan: string;
};

export const kesiapanEkspor = {
  skorTotal: 58,
  label: "Tahap Persiapan",
  keterangan:
    "Koperasi belum siap ekspor mandiri, tapi punya fondasi bagus untuk masuk program pendampingan dalam 6–12 bulan.",
  dimensi: [
    {
      nama: "Legalitas",
      skor: 72,
      status: "baik",
      ringkasan: "Badan hukum koperasi ✓ dan NIB ✓. Akses kepabeanan belum diaktifkan.",
      caraMenaikkan: "Aktifkan akses kepabeanan lewat OSS (gratis, ±1 minggu).",
    },
    {
      nama: "Kapasitas Produksi",
      skor: 55,
      status: "cukup",
      ringkasan:
        "20 petani kopi anggota menghasilkan ±2,4 ton/tahun, tapi belum terkonsolidasi lewat koperasi.",
      caraMenaikkan:
        "Buat kontrak pasokan dengan petani anggota supaya volume & mutu konsisten.",
    },
    {
      nama: "Kualitas & Sertifikasi",
      skor: 35,
      status: "kurang",
      ringkasan: "Belum ada sertifikat halal, HACCP, atau organik.",
      caraMenaikkan:
        "Mulai dari sertifikasi halal (self-declare gratis untuk UMK) dan uji mutu kopi di lab Dinas Pertanian.",
    },
    {
      nama: "Keuangan",
      skor: 68,
      status: "baik",
      ringkasan:
        "Kas Rp128,4 jt sehat, tapi masih terbebani angsuran BNI Rp43,1 jt/bulan.",
      caraMenaikkan:
        "Ekspor perdana sebaiknya lewat skema pembiayaan LPEI, bukan kas sendiri.",
    },
    {
      nama: "Pengalaman & SDM",
      skor: 45,
      status: "cukup",
      ringkasan:
        "Belum pernah ekspor. 1 pengurus (bendahara) pernah ikut pelatihan dokumen perdagangan.",
      caraMenaikkan:
        "Ikutkan 2 pengurus ke pelatihan ekspor gratis Export Center / PPEJP Kemendag.",
    },
  ] satisfies DimensiKesiapan[],
  langkahBerikutnya: [
    {
      aksi: "Daftarkan koperasi ke program Desa Devisa LPEI",
      dampak: "Pendampingan + akses pembiayaan ekspor",
      status: "belum" as const,
    },
    {
      aksi: "Aktifkan akses kepabeanan di OSS",
      dampak: "Syarat wajib semua dokumen ekspor",
      status: "belum" as const,
    },
    {
      aksi: "Konsolidasi pasokan kopi 20 petani anggota (kontrak + standar mutu)",
      dampak: "Volume konsisten — syarat minimum buyer Jepang ±1 kontainer/musim",
      status: "berjalan" as const,
    },
    {
      aksi: "Urus sertifikat halal (self-declare) untuk produk olahan",
      dampak: "Membuka pasar Malaysia & Timur Tengah",
      status: "belum" as const,
    },
    {
      aksi: "Ikut pelatihan ekspor gratis PPEJP/Export Center terdekat",
      dampak: "SDM paham alur dokumen & negosiasi",
      status: "belum" as const,
    },
  ],
};

export const programPendampingan = [
  {
    nama: "BNI Xpora",
    logo: "/bni.svg",
    penyelenggara: "Bank Negara Indonesia",
    deskripsi:
      "Solusi UMKM Go Productive, Go Digital, Go Global: pendampingan ekspor, kurasi buyer, pembiayaan, dan trade finance. Kantor layanan a.l. di Denpasar — terdekat dari Tabanan.",
    syaratUtama: "UMKM/koperasi dengan produk potensial ekspor + rekening BNI",
    status: "Belum terdaftar",
    url: "https://xpora.bni.co.id",
    cocokKarena:
      "Koperasi sudah memakai rel perbankan BNI (giro, pinjaman Himbara) — satu pintu dari pembiayaan sampai buyer.",
  },
  {
    nama: "Desa Devisa",
    logo: "/gambar/program/desa-devisa.png",
    penyelenggara: "LPEI / Indonesia Eximbank",
    deskripsi:
      "Pendampingan komunitas/koperasi menuju ekspor: mutu produk, kurasi buyer, hingga pembiayaan. Berjalan sejak 2019, berbasis klaster desa.",
    syaratUtama: "Ada komoditas unggulan + kelembagaan aktif (koperasi ✓)",
    status: "Belum terdaftar",
    url: "https://www.indonesiaeximbank.go.id",
    cocokKarena: "Berbasis koperasi/klaster — jalur paling natural untuk kopdes.",
  },
  {
    nama: "Desa BISA Ekspor",
    logo: "/gambar/program/desa-bisa-ekspor.png",
    penyelenggara: "Kemendag + Kemendes + Kementan + LPEI + Astra",
    deskripsi:
      "Payung nasional (diluncurkan Sep 2025) yang menggabungkan 5 program desa ekspor. Kemendag sedang mengidentifikasi 2.616 desa potensial.",
    syaratUtama: "Desa dengan produk unggulan & kelembagaan (kopdes memenuhi)",
    status: "Belum terdaftar",
    url: "https://kemendag.go.id",
    cocokKarena: "Momentum: pemerintah sedang aktif mencari desa peserta.",
  },
  {
    nama: "UMKM BISA Ekspor",
    logo: "/gambar/program/umkm-bisa-ekspor.png",
    penyelenggara: "Kementerian Perdagangan",
    deskripsi:
      "Pembinaan UMKM siap ekspor: kurasi produk, pelatihan, business matching dengan buyer lewat Atase Perdagangan/ITPC di 46 negara.",
    syaratUtama: "Skor kesiapan ekspor memadai (cek ERAT/Cek Ekspor)",
    status: "Belum terdaftar",
    url: "https://inaexport.kemendag.go.id",
    cocokKarena: "Gerbang ke buyer luar negeri via InaExport setelah skor naik.",
  },
];

// ── Peluang Pasar ────────────────────────────────────────────────

export type PeluangKomoditas = {
  id: string;
  komoditas: string;
  /** emoji fallback slot gambar /gambar/komoditas/{id}.jpg */
  emoji: string;
  sumber: string;
  potensi: "tinggi" | "menengah" | "rendah";
  alasan: string;
  volumeTersedia: string;
  hargaLokal: string;
  negaraTujuan: {
    negara: string;
    kode: string;
    hargaIndikatif: string;
    permintaan: string;
    syaratKunci: string[];
  }[];
};

export const peluangEkspor: PeluangKomoditas[] = [
  {
    id: "kopi",
    komoditas: "Kopi Arabika Bali (biji, green bean)",
    emoji: "☕",
    sumber: "Agregasi 20 petani anggota (±2,4 ton/tahun) — belum dikonsolidasi",
    potensi: "tinggi",
    alasan:
      "Kopi Bali/Kintamani punya nama di pasar specialty; harga ekspor 2–3× harga pengepul lokal; permintaan Jepang & Australia stabil.",
    volumeTersedia: "±2,4 ton/tahun (perkiraan panen anggota)",
    hargaLokal: "Rp85.000/kg (harga pengepul green bean)",
    negaraTujuan: [
      {
        negara: "Jepang",
        kode: "jp",
        hargaIndikatif: "Rp180.000–250.000/kg (specialty grade)",
        permintaan: "Tinggi & stabil — roaster specialty cari single origin",
        syaratKunci: [
          "Grade specialty (cupping score ≥80)",
          "Phytosanitary Certificate",
          "Volume minimum ±1 kontainer (± 18 ton) — perlu gabung klaster",
        ],
      },
      {
        negara: "Australia",
        kode: "au",
        hargaIndikatif: "Rp160.000–220.000/kg",
        permintaan: "Tinggi — pasar kafe besar, dekat secara logistik",
        syaratKunci: ["Biosecurity import permit", "Phytosanitary Certificate"],
      },
      {
        negara: "Amerika Serikat",
        kode: "us",
        hargaIndikatif: "Rp170.000–240.000/kg",
        permintaan: "Sangat besar tapi kompetitif",
        syaratKunci: ["Registrasi FDA", "FSVP importer", "Konsistensi volume"],
      },
    ],
  },
  {
    id: "ikan-beku",
    komoditas: "Ikan Tongkol Beku",
    emoji: "🐟",
    sumber: "Cold storage koperasi (stok saat ini 85 kg dari nelayan anggota)",
    potensi: "menengah",
    alasan:
      "Infrastruktur cold storage sudah ada (aset langka!), tapi volume masih sangat kecil dan butuh sertifikasi rantai dingin.",
    volumeTersedia: "85 kg (stok) — kapasitas cold storage ±2 ton",
    hargaLokal: "Rp32.000/kg (jual lokal)",
    negaraTujuan: [
      {
        negara: "Jepang",
        kode: "jp",
        hargaIndikatif: "Rp55.000–75.000/kg (frozen whole)",
        permintaan: "Stabil untuk katsuobushi & pengolahan",
        syaratKunci: [
          "Sertifikat HACCP unit pengolahan",
          "Health Certificate (BKIPM)",
          "Nomor registrasi approval Jepang",
        ],
      },
      {
        negara: "Singapura",
        kode: "sg",
        hargaIndikatif: "Rp45.000–60.000/kg",
        permintaan: "Menengah — pasar horeka, logistik mudah",
        syaratKunci: ["Health Certificate (BKIPM)", "SFA import requirements"],
      },
    ],
  },
  {
    id: "kentang",
    komoditas: "Kentang Granola",
    emoji: "🥔",
    sumber: "Gudang koperasi (120 kg) + petani hortikultura anggota",
    potensi: "menengah",
    alasan:
      "Permintaan horeka Singapura/Malaysia ada, tapi margin tipis dan bersaing dengan kentang Tiongkok/India — layak dicoba lewat agregator.",
    volumeTersedia: "±120 kg stok, panen anggota ±800 kg/bulan",
    hargaLokal: "Rp18.000/kg",
    negaraTujuan: [
      {
        negara: "Singapura",
        kode: "sg",
        hargaIndikatif: "Rp22.000–28.000/kg",
        permintaan: "Menengah (horeka)",
        syaratKunci: ["Phytosanitary Certificate", "Grading & packing standar"],
      },
      {
        negara: "Malaysia",
        kode: "my",
        hargaIndikatif: "Rp20.000–25.000/kg",
        permintaan: "Menengah",
        syaratKunci: ["Phytosanitary Certificate", "Sertifikat halal (untuk olahan)"],
      },
    ],
  },
  {
    id: "cabai-bawang",
    komoditas: "Cabai Merah & Bawang Merah",
    emoji: "🌶️",
    sumber: "Titipan petani di cold storage (cabai 52 kg, bawang 14 kg)",
    potensi: "rendah",
    alasan:
      "JANGAN ekspor dulu: harga domestik sedang tinggi (cabai Rp45.000/kg di Tabanan) — menjual lokal lebih untung, tanpa risiko & biaya dokumen. Evaluasi ulang saat panen raya menekan harga lokal.",
    volumeTersedia: "Cabai 52 kg, bawang 14 kg",
    hargaLokal: "Cabai Rp45.000/kg · bawang Rp36.000/kg",
    negaraTujuan: [],
  },
];

// ── Dokumen & Regulasi ───────────────────────────────────────────

export type StatusDokumen = "siap" | "diurus" | "belum";

export const legalitasDasar = [
  { nama: "Badan hukum koperasi", keterangan: "AHU-0012345.AH.01.29.2025", status: "siap" as StatusDokumen },
  { nama: "NIB (Nomor Induk Berusaha)", keterangan: "Terbit via OSS — berlaku juga sebagai identitas eksportir", status: "siap" as StatusDokumen },
  { nama: "Akses kepabeanan", keterangan: "Aktivasi di OSS/portal Bea Cukai — syarat membuat PEB", status: "belum" as StatusDokumen },
  { nama: "Rekening devisa koperasi", keterangan: "Untuk menerima pembayaran valas — buka di BNI (mendukung valas & terhubung BNI Xpora)", status: "belum" as StatusDokumen },
];

export const dokumenPerPengiriman = [
  { nama: "PEB (Pemberitahuan Ekspor Barang)", keterangan: "Diajukan ke Bea Cukai per pengiriman — butuh akses kepabeanan" },
  { nama: "Commercial Invoice + Packing List", keterangan: "Dibuat sendiri; dasar nilai pabean & pemeriksaan" },
  { nama: "Bill of Lading / Air Waybill", keterangan: "Diterbitkan pelayaran/maskapai via forwarder" },
  { nama: "SKA/COO (Surat Keterangan Asal)", keterangan: "Bukti asal Indonesia untuk tarif preferensi — sejak 2026 full online via InaExport" },
];

export type ChecklistKombinasi = {
  komoditas: string;
  negara: string;
  hsCode: string;
  catatan: string;
  dokumen: { nama: string; tempatUrus: string; estimasi: string; status: StatusDokumen }[];
};

export const checklistKombinasi: ChecklistKombinasi[] = [
  {
    komoditas: "Kopi (green bean)",
    negara: "Jepang",
    hsCode: "0901.11 (kopi, tidak digongseng, tidak dihilangkan kafeinnya)",
    catatan:
      "Jepang ketat soal residu pestisida (positive list). Uji lab residu sangat disarankan sebelum kirim sampel.",
    dokumen: [
      { nama: "Phytosanitary Certificate", tempatUrus: "Balai Karantina Pertanian", estimasi: "±3 hari kerja", status: "belum" },
      { nama: "SKA/COO Form IJEPA", tempatUrus: "InaExport (online)", estimasi: "±1 hari kerja", status: "belum" },
      { nama: "Hasil uji residu pestisida", tempatUrus: "Lab terakreditasi (mis. Saraswanti)", estimasi: "±2 minggu", status: "belum" },
      { nama: "PEB", tempatUrus: "Bea Cukai (butuh akses kepabeanan)", estimasi: "±1 hari", status: "belum" },
    ],
  },
  {
    komoditas: "Kopi (green bean)",
    negara: "Amerika Serikat",
    hsCode: "0901.11",
    catatan: "Wajib registrasi fasilitas FDA & punya US agent; importir wajib FSVP.",
    dokumen: [
      { nama: "Registrasi fasilitas FDA", tempatUrus: "Portal FDA (online, gratis)", estimasi: "±1 minggu", status: "belum" },
      { nama: "Phytosanitary Certificate", tempatUrus: "Balai Karantina Pertanian", estimasi: "±3 hari kerja", status: "belum" },
      { nama: "SKA/COO Form B", tempatUrus: "InaExport (online)", estimasi: "±1 hari kerja", status: "belum" },
      { nama: "PEB", tempatUrus: "Bea Cukai", estimasi: "±1 hari", status: "belum" },
    ],
  },
  {
    komoditas: "Ikan tongkol beku",
    negara: "Jepang",
    hsCode: "0303.44 (tuna/tongkol beku)",
    catatan:
      "Unit pengolahan/cold storage wajib punya nomor registrasi (approval number) yang diakui otoritas Jepang — prosesnya lewat BKIPM.",
    dokumen: [
      { nama: "Sertifikat HACCP", tempatUrus: "BKIPM / lembaga sertifikasi", estimasi: "±2–3 bulan", status: "belum" },
      { nama: "Health Certificate", tempatUrus: "BKIPM (per pengiriman)", estimasi: "±2 hari", status: "belum" },
      { nama: "Approval number ekspor ke Jepang", tempatUrus: "BKIPM", estimasi: "±1–2 bulan", status: "belum" },
      { nama: "SKA/COO Form IJEPA", tempatUrus: "InaExport (online)", estimasi: "±1 hari kerja", status: "belum" },
      { nama: "PEB", tempatUrus: "Bea Cukai", estimasi: "±1 hari", status: "belum" },
    ],
  },
  {
    komoditas: "Kentang granola",
    negara: "Singapura",
    hsCode: "0701.90 (kentang segar/dingin, selain bibit)",
    catatan: "Relatif paling mudah untuk ekspor perdana: dekat, dokumen sederhana, pembeli horeka.",
    dokumen: [
      { nama: "Phytosanitary Certificate", tempatUrus: "Balai Karantina Pertanian", estimasi: "±3 hari kerja", status: "belum" },
      { nama: "SKA/COO Form D (ATIGA)", tempatUrus: "InaExport (online)", estimasi: "±1 hari kerja", status: "belum" },
      { nama: "PEB", tempatUrus: "Bea Cukai", estimasi: "±1 hari", status: "belum" },
    ],
  },
];

export const DISCLAIMER_EKSPOR =
  "Data kurasi contoh untuk demo — bukan nasihat hukum. Verifikasi terbaru via InaExport (inaexport.kemendag.go.id), Bea Cukai, atau Dinas Perdagangan setempat.";
