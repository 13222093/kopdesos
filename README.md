# KopPilot

> **AI-Powered Cooperative Operating System** — ekosistem koperasi digital berbasis AI yang menghubungkan **operasional, keuangan, dan pasar**.
>
> Dibangun oleh **Tim 3 Pilar** (Putri Dzakiyah Suharyono · Gerald Bimo Sastiono · Mohammad Ari Alexander Aziz) untuk **Spark Arc 2026 Challenge — BNI Ventures**.
>
> 🌐 **Live demo:** https://kopdesos-web.vercel.app

---

## Masalah yang diselesaikan

Ada **lebih dari 130.000 koperasi aktif** di Indonesia dan 64,2 juta UMKM di belakangnya. Mereka bisa berjualan — tapi *stuck in survival mode*:

- 🙍 *"Stok segini cukup nggak ya? Takut kurang, tapi kalau kebanyakan modal ketahan."* — pengelola tidak bisa memprediksi permintaan, stok, dan arus kas.
- 🙍‍♀️ *"Katanya produk saya bisa dijual ke luar negeri. Tapi saya nggak tahu harus ngurus apa, mulai dari mana."* — akses pasar & ekspor gelap gulita.
- Keputusan bisnis diambil dengan intuisi; aktivitas operasional terputus dari layanan keuangan.

**KopPilot** mengubah koperasi desa dari sekadar gerai retail menjadi **pusat ekonomi desa**: setiap transaksi tercatat, setiap data menjadi keputusan, dan setiap keputusan tersambung ke layanan perbankan **BNI** (CASA & fee-based income) — tiga pemangku kepentingan (pemerintah, bank, UMKM) dilayani satu platform.

## Tiga Copilot (sesuai arsitektur solusi)

| Copilot | Fungsi | Wujud di aplikasi |
|---|---|---|
| 🛒 **Operations Copilot** | Optimasi operasional harian | Kasir/POS, Produk Digital (PPOB), Inventori + **prediksi permintaan**, Pengadaan (PO), rekomendasi promosi, alert stok |
| 📊 **Finance Copilot** | Data keuangan → keputusan | Keuangan: saldo kas, proyeksi kas vs angsuran, monitor pinjaman Himbara-BNI, laporan SAK-EP, penggajian, simpan pinjam |
| 🌍 **Export Copilot** | Buka peluang global produk lokal | Kesiapan Ekspor (skor 5 dimensi), Peluang Pasar (negara + harga), Dokumen & Regulasi (HS code, sertifikasi), program pemerintah & BNI Xpora |

Ketiganya diikat oleh **Pendamping AI** — asisten percakapan (model **Kimi K3**, Moonshot AI) yang membaca data platform lewat **12 tools deterministik** dan menjawab dalam bahasa Indonesia sederhana.

---

## Fitur lengkap

### Beranda (ringkasan harian)
- 4 KPI: penjualan hari ini, saldo kas, piutang anggota, angsuran BNI berikutnya (H-x)
- Grafik penjualan 30 hari per gerai (sembako / apotek / cold storage)
- **Feed Insight AI**: peringatan angsuran, stok kritis, rekomendasi promosi
- Daftar stok menipis + kewajiban terdekat

### CRM
- **Keanggotaan** — 30 anggota mock dengan profil 360°: simpanan (pokok/wajib/sukarela), riwayat belanja (dasar perhitungan SHU), pinjaman aktif + kolektibilitas
- **Inbox WhatsApp** — simulasi omnichannel: agent AI melayani anggota 24 jam (cek harga, pesan barang, cek saldo simpanan & angsuran, titip cold storage), petugas bisa ambil alih; panel info anggota di sisi kanan

### ERP — Operations Copilot
- **Kasir (POS)** — grid produk, keranjang, pembayaran Tunai / **QRIS BNI Merchant** (dana masuk Giro BNI)
- **Produk Digital (PPOB)** — pulsa, token PLN, BPJS, PDAM, top-up e-wallet, TV/internet via biller BNI; kartu **komisi koperasi** (fee-based income dua sisi: koperasi & bank)
- **Inventori** — stok 3 gerai, batch & kedaluwarsa obat, **prediksi permintaan**: laju jual harian → "perkiraan habis ± X hari" → **saran pesan ulang** (rumus transparan)
- **Pengadaan (PO)** — purchase order yang bisa dibuat dari saran prediksi; status draft/dikirim/diterima, konsisten dengan buku kas

### ERP — Finance Copilot
- **Simpan Pinjam** — pinjaman anggota, kolektibilitas (lancar/perhatian/macet), jadwal angsuran visual, pengingat via WA
- **Keuangan** — saldo kas + saran AI; **Monitor Pinjaman Himbara-BNI** (plafon Rp3 M, 6%/th, tenor 72 bln, progres angsuran); proyeksi kas vs angsuran 4 bulan; **laporan SAK-EP** (Neraca, PHU, Arus Kas); kartu Penggajian (BNI Payroll); kartu **Layanan BNI** (Giro, QRIS, VA, Agen46)

### Ekspor — Export Copilot
- **Kesiapan Ekspor** — skor 0–100 dihitung dari **data koperasi yang hidup di platform** (bukan kuesioner kosong): 5 dimensi (legalitas, kapasitas produksi, kualitas & sertifikasi, keuangan, SDM) + langkah menaikkan skor + program pendampingan (BNI Xpora, Desa Devisa LPEI, Desa BISA Ekspor)
- **Peluang Pasar** — potensi per komoditas nyata koperasi (kopi Bali → 🇯🇵🇦🇺🇺🇸 dengan harga indikatif vs lokal; ikan beku; kentang) — **termasuk rekomendasi jujur "jangan ekspor dulu"** (cabai/bawang saat harga domestik tinggi)
- **Dokumen & Regulasi** — checklist bertingkat: legalitas dasar → per pengiriman → per produk × negara (HS code, SKA/COO via InaExport, phytosanitary, HACCP/FDA/halal) dengan estimasi waktu urus

### Pendamping AI (pengikat semuanya)
- Panel chat mengambang di semua halaman, streaming, markdown
- **12 tools deterministik**: ringkasan harian, penjualan, stok+prediksi, pinjaman anggota, pinjaman Himbara, kas, cari anggota, laporan keuangan, kesiapan ekspor, peluang ekspor, dokumen ekspor, layanan BNI
- **Prinsip grounding keras**: semua angka WAJIB dari tools — model dilarang mengarang; regulasi ekspor & produk bank hanya dijawab dari data kurasi, di luar itu AI mengaku "belum ada datanya" dan mengarahkan ke sumber resmi (InaExport/Dinas)
- Fallback mode demo scripted bila API key tidak tersedia; rate limit per-IP

---

## Alur utama (flows)

**1. Transaksi harian → uang & data mengalir**
```
Pembeli → Kasir (pilih produk) → bayar QRIS BNI → dana masuk Giro BNI (CASA)
       → penjualan tercatat → stok berkurang → buku kas terupdate
       → laporan SAK-EP tersusun otomatis → KPI Beranda & grafik ikut bergerak
```

**2. Prediksi → keputusan restock (Operations Copilot)**
```
Data penjualan harian → laju jual/produk → "beras habis ± 3 hari" (merah di Inventori)
→ saran pesan ulang 36 sak (Rp2,2 jt) → PO draft otomatis → dikirim → diterima → kas
```

**3. Kesehatan keuangan (Finance Copilot)**
```
Saldo kas vs jadwal angsuran BNI (H-7) → proyeksi 4 bulan → insight AI pagi hari:
"kas cukup, tapi tunda belanja stok sampai tanggal 26" → keputusan bendahara
```

**4. Jalan ke ekspor (Export Copilot)**
```
Katalog & stok nyata → skor kesiapan 58/100 + cara menaikkan
→ peluang: kopi Bali potensi tinggi (harga 🇯🇵 2–3× lokal) → checklist dokumen kopi×Jepang
→ arahkan ke BNI Xpora / Desa Devisa (jalur resmi)
```

**5. Tanya apa saja ke Pendamping AI**
```
Pertanyaan bahasa sehari-hari → Kimi K3 memilih tool → tool membaca data platform
→ AI menarasikan dengan angka PERSIS dari data + 1 saran tindakan
   (uji: "kapan beras habis?" → "±3 hari, pesan 36 sak" — konsisten dengan layar Inventori)
```

**6. Anggota dilayani via WhatsApp**
```
Anggota chat nomor koperasi → agent AI jawab 24 jam (harga, pesanan, saldo, angsuran)
→ kasus sulit → petugas ambil alih → semua terhubung ke profil anggota
```

---

## Arsitektur teknis

```
apps/web/                      # satu app — frontend + API
├── src/routes/                # 12 halaman (TanStack Router, file-based)
├── src/mocks/                 # data demo deterministik (1 kopdes contoh: Sukamaju, Tabanan)
├── src/server/
│   ├── app.ts                 # Hono API — POST /api/pendamping (Vercel Edge)
│   ├── tools.ts               # 12 tools AI (Zod schema)
│   └── data.ts                # data-access layer (mock → nanti Postgres, tools tak berubah)
└── src/components/            # ui kit gaya shadcn + panel Pendamping + logo BNI
```

- **Frontend**: Vite + React + TanStack Router (SPA) + Tailwind v4; tema "sage" (hijau muda agraris), font Geist, angka uang selalu mono tabular; font & aset self-hosted (ramah koneksi desa)
- **AI**: Vercel AI SDK `streamText` + tool-calling loop (maks 6 step) → **Kimi K3** via Moonshot API (OpenAI-compatible); streaming UI dengan `useChat`
- **Deploy**: Vercel (static + edge function); env: `MOONSHOT_API_KEY`
- **Menuju produksi**: data-access layer siap ditukar ke Postgres (arsitektur mengikuti pola platform HaloAI: entity-EAV, config-driven UI, WhatsApp Business API)

## Menjalankan lokal

```bash
pnpm install
cp apps/web/.env.example apps/web/.env   # isi MOONSHOT_API_KEY (opsional; tanpa ini AI jadi mode demo)
pnpm dev                                  # buka http://localhost:5173
```

## Status

**MVP fungsional** — seluruh UI berjalan dengan data demo deterministik; **Pendamping AI sudah AI sungguhan** (bukan scripted) dan teruji menjawab akurat dari data platform. Backend basis data & integrasi API BNI adalah tahap berikutnya (arsitektur sudah disiapkan agar hanya lapisan data yang berganti).
