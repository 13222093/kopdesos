# PROJECT_CONTEXT.md — KopPilot

> Dokumen handoff konteks. Tujuan: dibaca oleh AI assistant / anggota tim baru
> agar langsung paham project ini apa, sudah sampai mana, dan aturan mainnya.
> Status per: 1 Agustus 2026.

## 1. Apa ini

**KopPilot** — AI-Powered Cooperative Operating System: platform CRM + ERP + asisten AI untuk **Koperasi Desa Merah Putih** (program pemerintah, target 80.000 koperasi desa).

**Konteks penting: ini entry lomba.** Dibuat oleh **Tim 3 Pilar** (Putri Dzakiyah Suharyono, Gerald Bimo Sastiono, Mohammad Ari Alexander Aziz) untuk **Spark Arc 2026 Challenge** oleh **BNI Ventures** (× The Greater Hub / SBM ITB). Challenge-nya: *"How might we increase BNI customer transactions to drive CASA growth and Fee-Based Income?"* Narasi produk: koperasi desa jadi hub ekonomi, semua arus uangnya berjalan di rel BNI (QRIS → Giro = CASA; PPOB/VA/trade finance = fee-based income; anggota koperasi = nasabah baru via Agen46).

- **Repo**: github.com/13222093/kopdesos (folder lokal: `Downloads/kopdesos`)
- **Live**: https://kopdesos-web.vercel.app (auto-deploy dari branch `main`)
- Nama historis project = "KopdesOS"; **nama final = KopPilot** (repo tidak di-rename, tidak masalah)

## 2. Status saat ini (yang penting dipahami)

**Fase: MVP demo.** Frontend lengkap berjalan dengan **data mock deterministik** (belum ada database), TAPI **asisten AI-nya SUNGGUHAN** — bukan scripted:

- Panel & halaman "Pendamping AI" memanggil `POST /api/pendamping` (Hono di **Vercel Edge**) → **Kimi K3** (Moonshot AI, OpenAI-compatible, via Vercel AI SDK `streamText`) → tool-calling loop maks 6 step → **12 tools deterministik** membaca data mock.
- Teruji live berkali-kali: jawaban AI angkanya PERSIS sama dengan yang tampil di UI (mis. "beras premium habis ±3 hari, pesan 36 sak" = kolom di halaman Inventori).
- Tanpa `MOONSHOT_API_KEY`, panel jatuh ke mode demo scripted (fallback aman).

**Data demo**: satu koperasi fiktif "Kopdes Merah Putih Sukamaju" (Tabanan, Bali). Tanggal dibekukan `HARI_INI = 2026-07-18`. Semua fixtures di `apps/web/src/mocks/` dan SALING KONSISTEN antar halaman (aturan keras, lihat §6).

## 3. Halaman & fitur (12 route, semua berfungsi)

| Route | Isi |
|---|---|
| `/` Beranda | 4 KPI, chart penjualan 30 hari per gerai, feed insight AI (termasuk rekomendasi promosi), stok menipis, kewajiban terdekat |
| `/pendamping` | Chat AI layar penuh, 8 chip pertanyaan teruji, badge status koneksi |
| `/anggota` + `/anggota/$id` | 30 anggota; profil 360: simpanan pokok/wajib/sukarela, riwayat belanja (dasar SHU), pinjaman + kolektibilitas |
| `/inbox` | Mock inbox WhatsApp 3 kolom: agent AI melayani anggota, petugas bisa ambil alih, panel info anggota |
| `/pos` | Kasir gerai sembako: grid produk, keranjang, bayar Tunai/QRIS BNI (dialog mock) |
| `/produk-digital` | PPOB via biller BNI: 6 layanan, komisi Rp486.000 / 312 transaksi bulan ini, riwayat |
| `/inventori` | Stok 3 gerai (sembako/apotek/cold storage), batch+expiry obat, **prediksi permintaan** (laju jual → "habis ± X hari" → saran pesan), card **Pengadaan PO** (PO-007 draft 36 sak dari saran prediksi) |
| `/simpan-pinjam` | 12 pinjaman anggota, kolektibilitas, jadwal angsuran, sheet detail |
| `/keuangan` | Saldo kas, **Monitor Pinjaman Himbara BNI** (Rp3M plafon, 6%/th, 72 bln, angsuran ke-3/72, jatuh tempo 25 Jul), proyeksi kas vs angsuran, laporan SAK-EP (Neraca/PHU/Arus Kas), kartu Penggajian, kartu Layanan BNI (Giro/QRIS/VA/Agen46) |
| `/ekspor` | Skor kesiapan **58/100**, 5 dimensi (Legalitas 72, Produksi 55, Sertifikasi 35, Keuangan 68, SDM 45), langkah berikutnya, program (BNI Xpora, Desa Devisa LPEI, Desa BISA Ekspor) |
| `/ekspor/peluang` | Peluang per komoditas: kopi Bali TINGGI (JP/AU/US, Rp180-250rb/kg vs lokal Rp85rb), ikan beku & kentang MENENGAH, cabai/bawang RENDAH (jujur: "jual lokal dulu") |
| `/ekspor/dokumen` | Checklist bertingkat + picker produk×negara (kopi→JP, kopi→US, ikan→JP, kentang→SG): HS code, SKA/InaExport, karantina, estimasi waktu |

**Floating panel Pendamping** ada di semua halaman kecuali `/pendamping` (otomatis sembunyi di sana).

## 4. Arsitektur & file penting

Monorepo pnpm, satu app: `apps/web` (Vite + React + TanStack Router SPA + Tailwind v4).

```
apps/web/
├── api/index.ts                     # entry Vercel Edge (hono/vercel, runtime edge)
├── public/bni.svg                   # logo resmi BNI (dari Wikimedia)
├── src/routes/*.tsx                 # 12 halaman (routeTree.gen.ts = generated, jangan edit)
├── src/mocks/                       # SEMUA data demo: koperasi, anggota, produk (+prediksiStok,
│                                    #   daftarPengadaan), penjualan (PRNG seeded), pinjaman,
│                                    #   kas, chat, insight, ekspor, bni, ppob
├── src/server/
│   ├── app.ts                       # Hono: /api/health, /api/pendamping; SYSTEM_PROMPT + guard;
│   │                                #   rate limit 20 req/10 mnt per IP
│   ├── tools.ts                     # 12 tools (zod inputSchema)
│   └── data.ts                      # data-access layer — SATU-SATUNYA jembatan mock↔AI.
│                                    #   Saat backend nyata dibangun, HANYA file ini diganti.
├── src/components/
│   ├── layout/AppShell.tsx          # sidebar (grup: utama/CRM/ERP/EKSPOR), topbar, footer BNI
│   ├── pendamping/shared.tsx        # sapaan, chips, jawabScripted, IsiMarkdown (dipakai panel+halaman)
│   ├── pendamping/PendampingAI.tsx  # panel mengambang
│   ├── bni/LogoBni.tsx
│   └── ui/                          # kit gaya shadcn (Card, Badge, Table, Tabs, Dialog, Sheet, dll.)
└── src/lib/format.ts                # formatRupiah dkk (id-ID)
```

- **Desain**: tema "Sage" — latar hijau muda berkabut `#edf3ea`, kartu putih, font **Geist + Geist Mono** (self-hosted), aksen tunggal merah bendera `#b7202e`, angka uang selalu mono tabular (`.tnum`). Sejarah: tema krem awal dianggap "AI template", varian putih-haloai dicoba, **sage yang dipilih & di-merge**. Fallback: tag `v0-buku-kas`, branch `redesign/halo-neutral`.
- **AI env** (Vercel & `apps/web/.env`): `MOONSHOT_API_KEY` (wajib), `MOONSHOT_MODEL` (default `kimi-k3` — model daftar akun: kimi-k3, k2.6, k2.5...; k3 pintar tapi lambat 15-40 dtk; k2.6 opsi lebih cepat belum dicoba), `MOONSHOT_BASE_URL` (default api.moonshot.ai). Catatan teknis: kimi-k3 menolak `temperature` selain 1; `convertToModelMessages` di ai-sdk v7 harus di-`await`; function HARUS edge runtime (adapter node crash).

## 5. Keputusan penting yang sudah diambil (jangan diulang-bahas)

1. **Bank = BNI di seluruh produk** (dulu BRI, diganti total demi lomba). Logo BNI tampil di: monitor pinjaman, kartu Layanan BNI, dialog QRIS POS, footer sidebar, halaman PPOB, kartu Xpora.
2. **AI grounding keras** (aturan #1 & #8 SYSTEM_PROMPT di `app.ts`): angka WAJIB dari tools; regulasi ekspor & produk/tarif bank HANYA dari data kurasi; kombinasi di luar kurasi → jawab "belum ada datanya" + arahkan ke InaExport/Dinas. Teruji: pertanyaan "ekspor durian ke Korea" ditolak dengan benar.
3. **Rekomendasi jujur** adalah fitur: ada komoditas berlabel "Tahan Dulu" (cabai), skor ekspor yang mengaku lemah di sertifikasi. Jangan diubah jadi serba-positif.
4. **Data konsisten lintas halaman** — angka yang sama muncul di banyak tempat harus tetap sinkron (36 sak saran prediksi = PO-007; Rp2.150.000 PO apotek = KAS-107; komisi PPOB Rp486rb di halaman = jawaban AI; gaji Rp6,4 jt = KAS-110).
5. **Fitur diselaraskan ke deck** (slide "3 Copilots": Operations/Finance/Export): prediksi permintaan, PPOB, PO, promosi, payroll ditambahkan khusus untuk menutup janji deck.
6. Copywriting deck/produk: bahasa Indonesia natural, **tanpa em dash**, angka konkret, tanpa jargon AI-ish.

## 6. Aturan kerja (untuk AI yang melanjutkan)

- UI berbahasa Indonesia; nama variabel/fungsi juga Indonesia (`daftarAnggota`, `lihat_stok`).
- Tambah data → lewat `src/mocks/*`; tanpa `Math.random()`/`Date.now()` di render path (deterministik).
- Tambah kemampuan AI → tambah/perluas tool di `tools.ts` + fungsi di `data.ts`; deskripsi tool harus menyebut isi datanya (routing model bergantung deskripsi).
- Kombinasi ekspor baru → tambah ke `checklistKombinasi` di `mocks/ekspor.ts`, JANGAN andalkan pengetahuan model.
- Sebelum commit: `npx tsc --noEmit` + `pnpm build` (Vite dev tidak type-check; error TS pernah lolos ke build Vercel dan mematikan function).
- Commit message tanpa tanda kutip ganda di dalamnya (PowerShell memecah argumen).
- Push ke `main` = deploy produksi langsung.

## 7. Aset & dokumen pendukung

- `C:\Users\Ari Azis\Downloads\koppilot-screenshots\` — 6 screenshot 1440×900 (beranda, inventori, keuangan, ekspor, PPOB, chat AI full page) + **3 GIF**: `07-pos-qris.gif`, `08-inventori-prediksi.gif`, `09-pendamping-ai.gif` (AI dipercepat 3×) + webm mentah di `.playwright-cli/`.
- **Deck** (file `KDM_AI.pdf`, final v2): Background → Solution ("3 Copilots", tabel vs POS tradisional) → Feasibility → Impact (proyeksi 5 th: 80rb koperasi, GMV Rp197 T, CASA +Rp11,2 T, FBI Rp1,08 T). Rencana yang disepakati: **MVP showcase di AKHIR deck**, 6-8 slide berbasis GIF: pembuka "MVP is Live" → CRM (2 slide: Keanggotaan, Inbox WA) → ERP → Ekspor (3 slide: Kesiapan → Peluang → Dokumen) → AI Pendamping → penutup QR. Copywriting per slide sudah dibuat (gaya: tanpa em dash, angka konkret, kotak highlight BNI konsisten per slide).
- `README.md` — deskripsi publik lengkap (fitur, 6 flows, arsitektur). `AGENTS.md` — konvensi teknis.
- Riset awal & blueprint ada di repo lain: `haloai/Documentation/18-07-2026/` (konteks Kopdes Merah Putih, arsitektur HaloAI yang jadi acuan pola jangka panjang: entity-EAV, config-driven UI, WhatsApp API).

## 8. Belum dikerjakan / antrian ide

- 3 GIF tambahan untuk deck: inbox CRM, alur ekspor, gabungan ERP (kasir+prediksi).
- GIF `09` versi halaman penuh `/pendamping` (lebih terbaca di proyektor).
- Logo KopPilot di aplikasi: menunggu file PNG transparan dari tim (emblem sidebar masih dua-strip merah putih).
- Screenshot slide 8 deck masih versi lama (krem/BRI/KopdesOS) — perlu diganti aset baru.
- Coba `MOONSHOT_MODEL=kimi-k2.6` untuk respons lebih cepat saat demo (belum dites).
- Jangka panjang (pasca lomba): backend Postgres (ganti `data.ts`), WhatsApp API nyata, insight proaktif terjadwal, upgrade TanStack Start.
