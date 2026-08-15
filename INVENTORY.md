# INVENTORY.md

Read-only inventory of `apps/web/src`. Facts only. Generated 1 Agustus 2026 dari commit `eff35fb`; diperbarui setelah SPEC_FOKUS §1/§2/§4 dan putaran UI/UX (15 Agustus 2026): AI kontekstual, aksi generatif, progressive disclosure, NavEkspor (§3).

Perubahan putaran UI/UX (ringkas):
- Komponen baru: `components/pendamping/TanyaAI.tsx` (tombol AI kontekstual → `/pendamping?q=`, auto-kirim sekali), `components/ekspor/NavEkspor.tsx` (segmented control 3 langkah, Link + activeProps), `components/ekspor/GaugeSkor.tsx` (gauge SVG setengah lingkaran).
- `routes/pendamping.tsx` (190 baris): `validateSearch` param `q`; auto-send sekali dengan guard `useRef`, lalu URL dibersihkan (`navigate replace`).
- `routes/ekspor.index.tsx` (151): gauge + dimensi/langkah/program memakai `<details>` accordion; link silang diganti `NavEkspor`.
- `routes/ekspor.peluang.tsx` (±300): `BarHarga` (bar lokal vs ekspor, parsing `angkaHarga`), alasan & syaratKunci dalam `<details>`; `TanyaAI` per komoditas; layout 2 kolom dengan `PanelPasar` (kurs valas, implikasi, sparkline arabika dunia via Recharts `LineChart`, daftar `kabarPasar` + badge dampak, badge "N kabar" di kartu komoditas). Data dari `mocks/pasar.ts` (baru); juga masuk `dataPeluangEkspor()`.
- `routes/ekspor.dokumen.tsx` (152): link silang diganti `NavEkspor`.
- `routes/index.tsx` (339): strip "Tahap koperasi" (`tahapKoperasi` di `mocks/koperasi.ts`, chips Rintisan→Berkembang→Siap Ekspor) di atas KPI; `InsightCard` mode `ringkas` kini `<details>` 1 baris.
- `routes/inventori.tsx` (379): kolom `TanyaAI` per baris + bar mini stok di kolom Stok.
- `routes/simpan-pinjam.tsx` (333): tombol "Buatkan pesan penagihan" → `Dialog` dengan instance `useChat` sendiri (draf pesan WA streaming, fallback `templatePenagihan`, tombol Salin/clipboard).
- `routes/pos.tsx` (233): harga `text-base font-bold`, kartu produk `p-3.5` + `active:scale-[0.98]`.
- `routes/keuangan.tsx`: `TanyaAI` di header Monitor Pinjaman.

Isi detail section 2 di bawah belum ditulis ulang per halaman untuk putaran ini; rujuk ringkasan di atas untuk delta.

---

## 1. AppShell.tsx — struktur sidebar (236 baris)

Sidebar difilter oleh state `peran` (`Peran = "manajer" | "kasir" | "anggota"`, awal `"manajer"`). Struktur penuh (peran `manajer`):

```
SidebarContent({ peran })
├── Header
│   ├── <Emblem/>                        (dua strip: merah atas, putih bawah)
│   ├── koperasi.namaPendek              ("Kopdes Sukamaju")
│   └── "KopPilot"                       (Kop tebal, Pilot regular)
├── nav (tanpa label grup)               — navUtama
│   └── Beranda                → /                LayoutDashboard
├── "PENDAMPING AI"                      — navPendamping
│   ├── Chat Pendamping        → /pendamping      Sparkles
│   └── Inbox WhatsApp         → /inbox           MessageCircle
├── "COPILOT OPERASI"                    — navOperasi
│   ├── Kasir                  → /pos             ShoppingCart
│   ├── Inventori & Pengadaan  → /inventori       Boxes
│   └── Produk Digital         → /produk-digital  Smartphone
├── "COPILOT KEUANGAN"                   — navKeuangan
│   ├── Keuangan & Laporan     → /keuangan        BookOpenText
│   ├── Simpan Pinjam          → /simpan-pinjam   HandCoins
│   └── Keanggotaan            → /anggota         Users
├── "COPILOT EKSPOR"                     — navEkspor
│   ├── Kesiapan               → /ekspor          Rocket
│   ├── Peluang Pasar          → /ekspor/peluang  Globe2
│   └── Dokumen & Regulasi     → /ekspor/dokumen  FileCheck2
└── Footer
    ├── "Perbankan oleh <LogoBni/> · Spark Arc 2026"
    └── <Avatar infoPeran[peran].nama/> + nama + label peran
```

Filter per peran:
- `manajer`: semua grup di atas (12 item)
- `kasir`: Beranda + PENDAMPING AI + COPILOT OPERASI (6 item)
- `anggota`: `navAnggota` saja — Profil Saya → `/anggota/$anggotaId` (`params` dari `daftarAnggota[0].id`, icon `User`) + Chat Pendamping → `/pendamping` (Sparkles)

Perilaku terkait:
- `NavLink` memakai `activeOptions={{ exact: item.to === "/" || item.to === "/ekspor" }}`; `NavItem` punya field opsional `params`.
- Pemilih peran: `<select>` di topbar (kiri tombol `Bell`), opsi `Manajer Koperasi` / `Kasir` / `Anggota`; `gantiPeran()` memanggil `navigate()` → `manajer` `/`, `kasir` `/pos`, `anggota` `/anggota/$anggotaId`.
- Identitas footer & avatar topbar dari `infoPeran`: manajer → `koperasi.manajer` "Manajer KDMP"; kasir → `koperasi.kasir` ("Ni Luh Sri Antari", field mock) "Kasir"; anggota → `daftarAnggota[0].nama` "Anggota".
- Grup "Lainnya"/`Pengaturan` sudah dihapus.
- `SidebarContent` dirender dua kali: `<aside>` (≥lg) dan di dalam `Sheet` mobile (trigger hamburger `Menu` di topbar); keduanya menerima `peran`.
- Topbar: `Input` pencarian `readOnly` (placeholder "Cari anggota, produk, transaksi…"), tanggal `formatTanggal(HARI_INI)`, pemilih peran, tombol lonceng `Bell` dengan titik merah statis, `Avatar`.
- `<PendampingAI/>` di-mount global di AppShell (menyembunyikan diri sendiri di path `/pendamping` via `useRouterState`).

---

## 2. src/routes/ — 14 file

| File | Route path | Judul halaman (h1) | Baris |
|---|---|---|---|
| `__root.tsx` | (root layout) | — | 9 |
| `index.tsx` | `/` | "Selamat pagi, Bu Sari 👋" | 304 |
| `pendamping.tsx` | `/pendamping` | "Pendamping AI" | 168 |
| `anggota.index.tsx` | `/anggota/` | "Keanggotaan" | 110 |
| `anggota.$anggotaId.tsx` | `/anggota/$anggotaId` | `{anggota.nama}` (dinamis) | 209 |
| `inbox.tsx` | `/inbox` | "Inbox WhatsApp" | 170 |
| `pos.tsx` | `/pos` | "Kasir — Gerai Sembako" | 233 |
| `produk-digital.tsx` | `/produk-digital` | "Produk Digital (PPOB)" | 203 |
| `inventori.tsx` | `/inventori` | "Inventori" | 357 |
| `simpan-pinjam.tsx` | `/simpan-pinjam` | "Unit Simpan Pinjam" | 246 |
| `keuangan.tsx` | `/keuangan` | "Keuangan" | 421 |
| `ekspor.index.tsx` | `/ekspor/` | "Kesiapan Ekspor" | 156 |
| `ekspor.peluang.tsx` | `/ekspor/peluang` | "Peluang Pasar Ekspor" | 105 |
| `ekspor.dokumen.tsx` | `/ekspor/dokumen` | "Dokumen & Regulasi Ekspor" | 160 |

### Rincian section & import mock per halaman

**`__root.tsx`** — hanya membungkus `<Outlet/>` dalam `<AppShell>`. Tanpa mock.

**`index.tsx`** — mocks: `insight`, `koperasi`, `penjualan` (`penjualan90Hari`, `penjualanHariIni`, `penjualanKemarin`, `totalHari`), `pinjaman` (`pinjamanHimbara`, `ringkasanSimpanPinjam`), `kas` (`saldoKas`), `produk` (`daftarProduk`, `stokMenipis`). Section:
1. Header sapaan + subjudul tanggal (`formatTanggal(HARI_INI)`)
2. Grid 4 × `KpiCard` (lokal): Penjualan hari ini, Saldo kas, Piutang anggota, Angsuran BNI berikutnya
3. Card "Penjualan 30 hari terakhir" — Recharts `BarChart` stacked 3 seri + legend manual + `TooltipPenjualan` (lokal)
4. Card "Insight hari ini" — `Badge "3 baru"` + 3 × `InsightCard` (`daftarInsight.slice(0,3)`)
5. Card "Stok menipis" — daftar `daftarProduk.filter(stokMenipis)` + link `/inventori`
6. Card "Kewajiban terdekat" — 3 baris statis (angsuran BNI ke-3, gaji, pajak)

**`pendamping.tsx`** — mocks: tidak ada (memakai `~/components/pendamping/shared`). Section:
1. Header ikon + judul + `Badge` status (`AI tersambung` / `Mode demo`)
2. Card chat: area pesan (`SAPAAN_AWAL`, `pesanScripted`, `messages` via `IsiMarkdown`, indikator mengetik), chips `pertanyaanCepatLengkap` (8), form input + disclaimer
State: `useChat`, `teks`, `modeAi`, `pesanScripted`; `inputRef` auto-focus saat mount; fetch `/api/health` saat mount.

**`anggota.index.tsx`** — mocks: `anggota` (`daftarAnggota`, `totalSimpanan`). Section:
1. Header + `Button` "Daftarkan anggota"
2. Card: bar pencarian (state `cari`) + `Table` 7 kolom (Anggota, Banjar, Pekerjaan, Bergabung, Total Simpanan, Belanja 90 Hari, Status)

**`anggota.$anggotaId.tsx`** — mocks: `anggota`, `pinjaman` (`labelKolektibilitas`, `pinjamanAnggota`). Konstanta lokal `riwayatBelanjaContoh` (4 entri). Section:
1. Link kembali
2. Card profil: `Avatar` besar, badge status, tombol Telepon / Chat WA / Ubah
3. Card "Simpanan" (pokok/wajib/sukarela/total)
4. Card "Pinjaman aktif" (`Table` atau teks kosong)
5. Card "Riwayat belanja terakhir" (`Table` + catatan SHU)

**`inbox.tsx`** — mocks: `anggota`, `chat` (`daftarRoom`, `type Room`). State: `aktifId`. Layout `h-[calc(100dvh-7.5rem)]`, grid `[280px_1fr]` / `[280px_1fr_260px]`. Section:
1. Header + `Badge "● Tersambung"`
2. Kolom daftar percakapan (5 room, badge label + belum dibaca)
3. Kolom thread: header kontak + `Badge "AI aktif"` + `Button "Ambil alih"`, bubbles (anggota/ai/petugas), form input
4. Kolom "Info anggota": total simpanan, belanja 90 hari, catatan

**`pos.tsx`** — mocks: `produk` (`daftarProduk`, `type Produk`). State: `cari`, `keranjang`, `dialogBayar`, `selesai`. Section:
1. Header
2. Pencarian + grid produk sembako (button per produk, badge "Menipis")
3. Card "Keranjang" (sticky): item + tombol ±, total, tombol Tunai / QRIS
4. `Dialog` pembayaran (judul QRIS memuat `<LogoBni/>`; placeholder QR)
5. `Dialog` "Transaksi selesai ✅"

**`produk-digital.tsx`** — mocks: `ppob` (`layananPpob`, `ringkasanPpob`, `riwayatPpob`). State: `terpilih`, `selesai`, `nomor`, `nominal`. Konstanta lokal `IKON` (map string→ikon lucide). Section:
1. Header dengan `<LogoBni/>` + `Badge "Komisi = pendapatan koperasi"`
2. 3 Card ringkasan: Komisi bulan ini, Transaksi bulan ini, Rata-rata komisi/transaksi
3. Grid 6 layanan (button)
4. Card "Transaksi terakhir" (`Table` 5 baris)
5. `Dialog` transaksi (2 `Input`) + `Dialog` "Transaksi berhasil ✅"

**`inventori.tsx`** — mocks: `produk` (`daftarPengadaan`, `daftarProduk`, `hampirKedaluwarsa`, `prediksiStok`, `stokMenipis`, `type Produk`, `type StatusPo`). State: `terpilih` (Sheet). Lokal: `TabelProduk` (komponen), `kartuStokContoh` (5 entri). Section:
1. Header + `Button "Catat barang masuk"`
2. `Tabs` 3 gerai (Sembako 18 / Apotek 12 / Cold Storage 5) → `TabelProduk` (kolom: Produk, Harga Beli, Harga Jual, Stok, Perkiraan Habis, Batch/Kedaluwarsa [kondisional], Status)
3. Card "Pengadaan (Purchase Order)": `Button "Buat PO dari saran"` + `Table` 3 PO (`daftarPengadaan`)
4. `Sheet` kartu stok: 4 stat, blok "Prediksi permintaan" (`prediksiStok`), blok batch, `Table` kartu stok (`kartuStokContoh`)

**`simpan-pinjam.tsx`** — mocks: `pinjaman` (`labelKolektibilitas`, `pinjamanAnggota`, `ringkasanSimpanPinjam`, `type PinjamanAnggota`). State: `terpilih` (Sheet). Lokal: `badgeKolektibilitas`, `buatJadwal`. Section:
1. Header + `Button "Ajukan pinjaman baru"`
2. 3 Card ringkasan (Total simpanan anggota, Pinjaman beredar, Butuh penagihan)
3. Card "Pinjaman anggota" (`Table` 12 baris)
4. `Sheet` detail: 2 stat, progress bar terbayar, grid jadwal 12 kotak, tombol "Catat pembayaran" / "Kirim pengingat WA"

**`keuangan.tsx`** — mocks: `kas` (`entriKas`, `proyeksiKas`, `saldoKas`), `pinjaman` (`pinjamanHimbara`). State: `laporan` (Dialog). Lokal: `dataProyeksi`, `TooltipProyeksi`, `isiLaporan` (3 laporan), `koperasiNama`. Section:
1. Header
2. Card "Monitor Pinjaman Himbara — BNI (Himbara)" + `<LogoBni/>`: 4 stat + progress tenor
3. Kolom kanan: Card "Saldo kas" (+ kotak saran amber) dan Card "Penggajian" (`Badge "Juli: Dibayar"`, BNI Payroll "Segera")
4. Card "Proyeksi kas vs angsuran (4 bulan)" — Recharts `BarChart` grouped 2 seri + legend manual
5. Card "Laporan SAK-EP" — 3 tombol → `Dialog` laporan (`isiLaporan`)
6. Card "Layanan BNI untuk Koperasi" + `<LogoBni/>` — grid 4 layanan (array inline)
7. Card "Buku kas — transaksi terakhir" (`Table` 18 entri)

**`ekspor.index.tsx`** — mocks: `ekspor` (`DISCLAIMER_EKSPOR`, `kesiapanEkspor`, `programPendampingan`). Tanpa state. Section:
1. Header + link ke `/ekspor/peluang` dan `/ekspor/dokumen`
2. Card skor: ikon `Rocket`, `58/100`, `Badge "Tahap Persiapan"`, keterangan
3. Card "5 dimensi penilaian" (bar per dimensi + caraMenaikkan)
4. Card "Langkah berikutnya" (5 item + badge Berjalan/Belum)
5. Card "Program pendampingan pemerintah" (4 program + link eksternal)
6. Disclaimer

**`ekspor.peluang.tsx`** — mocks: `ekspor` (`DISCLAIMER_EKSPOR`, `peluangEkspor`). Tanpa state. Section:
1. Header + link silang
2. Card per komoditas (4): badge potensi, alasan (kotak amber untuk `rendah`), grid `negaraTujuan` (bendera, harga indikatif, syarat), volume + link `/inventori`
3. Disclaimer

**`ekspor.dokumen.tsx`** — mocks: `ekspor` (`checklistKombinasi`, `DISCLAIMER_EKSPOR`, `dokumenPerPengiriman`, `legalitasDasar`, `type StatusDokumen`). State: `terpilih` (index picker). Lokal: `IkonStatus`, `labelStatus`. Section:
1. Header + link silang
2. Card "A · Legalitas dasar" (4 item + badge progress "2/4 siap")
3. Card "B · Dokumen per pengiriman" (4 item)
4. Card "C · Checklist per produk × negara": chips picker 4 kombinasi, kotak HS Code + catatan, `Table` dokumen (Dokumen, Tempat mengurus, Estimasi, Status)
5. Disclaimer

---

## 3. tools.ts — 12 tools (117 baris)

| # | Tool | Deskripsi (verbatim) | Parameter zod | Fungsi data.ts |
|---|---|---|---|---|
| 1 | `lihat_ringkasan_hari_ini` | "Ringkasan kondisi koperasi hari ini: penjualan hari ini & kemarin per gerai, saldo kas, angsuran bank terdekat, piutang, jumlah stok menipis, komisi PPOB/produk digital bulan berjalan, dan peringatan penting." | `z.object({})` | `ringkasanHariIni()` |
| 2 | `lihat_penjualan` | "Data penjualan gabungan gerai (sembako, apotek, cold storage) untuk periode tertentu: total per gerai, rata-rata harian, estimasi margin." | `{ hari: z.union([z.literal(7), z.literal(30), z.literal(90)]).describe("Periode ke belakang dalam hari: 7, 30, atau 90") }` | `dataPenjualan(hari)` |
| 3 | `lihat_stok` | "Daftar stok produk. Bisa difilter: hanya yang menipis (di bawah stok minimum) atau hampir kedaluwarsa (<30 hari), dan per gerai." | `{ filter: z.enum(["semua","menipis","kedaluwarsa"]).default("semua"), gerai: z.enum(["sembako","apotek","gudang"]).optional().describe("gudang = cold storage") }` | `dataStok(input)` |
| 4 | `lihat_pinjaman_anggota` | "Pinjaman anggota unit simpan pinjam: ringkasan piutang beredar + daftar pinjaman dengan status kolektibilitas (lancar / perhatian / macet)." | `{ kolektibilitas: z.enum(["lancar","perhatian","macet"]).optional() }` | `dataPinjamanAnggota(kolektibilitas)` |
| 5 | `lihat_pinjaman_himbara` | "Pinjaman modal koperasi dari bank Himbara (BNI): plafon, sisa pokok, angsuran bulanan, jatuh tempo berikutnya, progres tenor, riwayat angsuran." | `z.object({})` | `dataPinjamanHimbara()` |
| 6 | `lihat_kas` | "Kas koperasi: saldo saat ini, buku kas (transaksi terakhir), dan proyeksi 4 bulan ke depan dibandingkan kewajiban angsuran bank." | `z.object({})` | `dataKas()` |
| 7 | `cari_anggota` | "Cari anggota berdasarkan nama, ID (AGT-xxx), atau banjar/dusun. Mengembalikan profil, simpanan, pinjaman aktif, dan total belanja 90 hari (maks 5 hasil)." | `{ kata_kunci: z.string().min(2).describe("Nama, ID anggota, atau nama banjar") }` | `cariAnggota(kata_kunci)` |
| 8 | `lihat_layanan_bni` | "Layanan perbankan BNI yang relevan untuk koperasi (giro/CASA, QRIS merchant, virtual account, Agen46, Xpora, pembiayaan Himbara): penjelasan sederhana, manfaat, dan status di platform." | `z.object({})` | `dataLayananBni()` |
| 9 | `lihat_kesiapan_ekspor` | "Skor kesiapan ekspor koperasi (0-100) dengan 5 dimensi penilaian, langkah berikutnya untuk menaikkan skor, dan daftar 4 program pendampingan (BNI Xpora, Desa Devisa LPEI, Desa BISA Ekspor, UMKM BISA Ekspor)." | `z.object({})` | `dataKesiapanEkspor()` |
| 10 | `lihat_peluang_ekspor` | "Peluang ekspor per komoditas koperasi: potensi (tinggi/menengah/rendah) beserta alasannya, negara tujuan dengan harga indikatif vs harga lokal, volume tersedia, dan syarat kunci. Termasuk komoditas yang SEBAIKNYA TIDAK diekspor dulu." | `z.object({})` | `dataPeluangEkspor()` |
| 11 | `lihat_dokumen_ekspor` | "Checklist dokumen & regulasi ekspor: legalitas dasar koperasi, dokumen per pengiriman, dan persyaratan spesifik per kombinasi produk × negara yang sudah dikurasi (kopi→Jepang/AS, ikan beku→Jepang, kentang→Singapura). Bisa difilter." | `{ komoditas: z.string().optional().describe("mis. kopi, ikan, kentang"), negara: z.string().optional().describe("mis. Jepang, Amerika, Singapura") }` | `dataDokumenEkspor(komoditas, negara)` |
| 12 | `lihat_laporan_keuangan` | "Laporan keuangan SAK-EP bulan lalu (Juni 2026): neraca, perhitungan hasil usaha (PHU), atau arus kas." | `{ jenis: z.enum(["neraca","phu","arus_kas"]) }` | `dataLaporan(jenis)` |

---

## 4. data.ts — ekspor fungsi & tipe kembalian (272 baris)

Tidak ada anotasi tipe kembalian eksplisit; semua di-infer. Bentuk di bawah adalah bentuk objek yang dikembalikan.

| Fungsi | Signature | Kembalian (bentuk) |
|---|---|---|
| (re-export) | `export { HARI_INI, koperasi }` | dari `../mocks/koperasi` |
| `ringkasanHariIni` | `()` | `{ tanggal, penjualanHariIni: PenjualanHarian & {total}, penjualanKemarin: idem, saldoKas, angsuranHimbaraBerikut: {jumlah, jatuhTempo}, piutangAnggotaBeredar, jumlahStokMenipis, ppob: {komisiBulanIni, jumlahTransaksiBulanIni}, insightPeringatan: string[] }` |
| `dataPenjualan` | `(hari: 7 \| 30 \| 90)` | `{ periodeHari, total: {sembako, apotek, coldStorage}, totalSemua, rataRataPerHari, estimasiMarginKotorPersen: 11, seriHarian?: {tanggal, total}[] }` (`seriHarian` hanya bila `hari <= 30`) |
| `dataStok` | `(opsi: { filter: "semua"\|"menipis"\|"kedaluwarsa"; gerai?: "sembako"\|"apotek"\|"gudang" })` | `Array<{ id, nama, gerai, stok, satuan, stokMinimum, hargaBeli, hargaJual, menipis, batch?, kedaluwarsa?, hampirKedaluwarsa, prediksi: {rataTerjualPerHari, habisDalamHari, saranPesanUlang, estimasiBiayaPesan} }>` |
| `dataPinjamanAnggota` | `(kolektibilitas?: Kolektibilitas)` | `{ ringkasan: {totalPinjamanBeredar, totalSimpananAnggota, jumlahMacet, jumlahPerluPerhatian}, pinjaman: Array<{id, nama, tujuan, pokok, sisa, angsuranBulanan, angsuranKe: "x/y", jatuhTempoBerikut, kolektibilitas: label}> }` |
| `dataPinjamanHimbara` | `()` | `typeof pinjamanHimbara` (objek mock utuh, termasuk `riwayat[]`) |
| `dataKas` | `()` | `{ saldoKas, proyeksi4Bulan: Array<{bulan, perkiraanKasMasuk, perkiraanKasKeluarOperasional, sisaKasOperasional, angsuranHimbara}>, bukuKasTerakhir: EntriKas[] }` (12 entri pertama) |
| `cariAnggota` | `(kataKunci: string)` | `Array<{ id, nama, telepon, dusun, pekerjaan, status, simpanan: {...&total}, belanja90Hari, pinjamanAktif: Array<{id, tujuan, sisa, angsuranBulanan, jatuhTempoBerikut, kolektibilitas}> }>` (maks 5) |
| `dataLayananBni` | `()` | `{ layanan: LayananBni[], catatan: string }` |
| `dataKesiapanEkspor` | `()` | `{ ...kesiapanEkspor (skorTotal, label, keterangan, dimensi[], langkahBerikutnya[]), programPendampingan, disclaimer }` |
| `dataPeluangEkspor` | `()` | `{ peluang: PeluangKomoditas[], disclaimer }` |
| `dataDokumenEkspor` | `(komoditas?: string, negara?: string)` | `{ legalitasDasar, dokumenPerPengiriman, kombinasiTerkurasi: string[], hasil: ChecklistKombinasi[], catatanPenting?: string, disclaimer }` (`catatanPenting` hanya bila `hasil.length === 0`) |
| `dataLaporan` | `(jenis: "neraca" \| "phu" \| "arus_kas")` | `{ judul: string, baris: Record<string, number> }` |

---

## 5. Urutan route dari paling tipis ke paling padat

Kriteria: jumlah baris + jumlah section unik yang dirender (angka baris dicantumkan).

1. `__root.tsx` (9) — hanya wrapper AppShell/Outlet
2. `ekspor.peluang.tsx` (105) — satu pola kartu diulang per komoditas, tanpa state
3. `anggota.index.tsx` (110) — satu tabel + pencarian
4. `ekspor.index.tsx` (156) — 4 card, tanpa state
5. `ekspor.dokumen.tsx` (160) — 3 card + picker 1 state
6. `pendamping.tsx` (168) — satu card chat; logika duplikat dengan `PendampingAI.tsx` via `shared.tsx`
7. `inbox.tsx` (170) — 3 kolom, 1 state, data statis dari `daftarRoom`
8. `produk-digital.tsx` (203) — 3 card ringkasan + grid + tabel + 2 dialog
9. `anggota.$anggotaId.tsx` (209) — 4 card, data dinamis per param
10. `pos.tsx` (233) — grid produk + keranjang stateful + 2 dialog
11. `simpan-pinjam.tsx` (246) — 3 card + tabel + sheet dengan jadwal ter-generate
12. `index.tsx` (304) — 4 KPI + chart Recharts + 3 card, agregasi dari 6 file mock
13. `inventori.tsx` (357) — tabs 3 gerai + tabel berprediksi + card PO + sheet kartu stok
14. `keuangan.tsx` (421) — 7 section termasuk chart, dialog laporan, dan 2 card BNI

---

## 6. Konsolidasi hipotetis 12 route → 4 halaman ber-tab (tanpa memindahkan file route)

### Dapat dipakai ulang apa adanya (diekspor, tanpa state internal, props-driven)

- Seluruh `src/components/ui/*`: `Card/CardHeader/CardTitle/CardDescription/CardContent/CardFooter`, `Badge`, `Button`, `Input`, `Table*`, `Tabs*`, `Dialog*`, `Sheet*`, `Separator`, `ScrollArea`, `Avatar`
- `InsightCard` (`components/insight/InsightCard.tsx`)
- `LogoBni` (`components/bni/LogoBni.tsx`)
- `IsiMarkdown`, `jawabScripted`, `SAPAAN_AWAL`, `pertanyaanCepat`, `pertanyaanCepatLengkap` (`components/pendamping/shared.tsx`)
- Helper murni: `formatRupiah` dkk (`lib/format.ts`), `prediksiStok`/`stokMenipis`/`hampirKedaluwarsa` (`mocks/produk.ts`), `totalSimpanan` (`mocks/anggota.ts`), `WARNA_GERAI`/`WARNA_KAS`/`LABEL_GERAI` (`lib/chart.ts`)

### Didefinisikan lokal di file route (tidak diekspor; pemakaian lintas-halaman butuh pemindahan/ekspor)

- `index.tsx`: `KpiCard`, `TooltipPenjualan`
- `inventori.tsx`: `TabelProduk`, `kartuStokContoh`
- `keuangan.tsx`: `TooltipProyeksi`, `dataProyeksi`, `isiLaporan`, `koperasiNama`
- `simpan-pinjam.tsx`: `badgeKolektibilitas`, `buatJadwal`
- `ekspor.dokumen.tsx`: `IkonStatus`, `labelStatus`
- `anggota.$anggotaId.tsx`: `riwayatBelanjaContoh`
- `produk-digital.tsx`: `IKON`

### Konflik state/layout konkret

1. **Dua instance `useChat`**: `pendamping.tsx` dan `PendampingAI.tsx` masing-masing membuat chat terpisah (riwayat tidak dibagi). Panel mengambang menyembunyikan diri berdasarkan `pathname.startsWith("/pendamping")`; jika chat menjadi tab pada path lain, kondisi ini tidak terpenuhi dan panel + tab chat tampil bersamaan sebagai dua percakapan berbeda.
2. **Tinggi terkunci viewport**: `inbox.tsx` dan `pendamping.tsx` memakai `h-[calc(100dvh-7.5rem)]` yang mengasumsikan konten adalah anak langsung `<main>`; di dalam halaman tab dengan header tambahan, tinggi total melebihi viewport (muncul scroll ganda).
3. **Lebar kontainer**: `pendamping.tsx` kini memakai `max-w-6xl` sama dengan halaman lain (perbedaan lebar sudah tidak berlaku sejak fix SPEC_FOKUS §4.4).
4. **Radix `Tabs` bersarang**: `inventori.tsx` sudah memakai `Tabs` untuk gerai; tab tingkat halaman akan menghasilkan dua `Tabs` bersarang dengan navigasi keyboard panah pada masing-masing tingkat.
5. **Reset state saat pindah tab**: `TabsContent` (ui/tabs.tsx) tidak memakai `forceMount`, sehingga konten tab nonaktif di-unmount; state lokal hilang saat berpindah tab: `keranjang`/`dialogBayar` (pos), `terpilih` (inventori, simpan-pinjam, ekspor.dokumen, produk-digital), `cari` (anggota.index, pos), `aktifId` (inbox), seluruh state chat `pendamping`.
6. **Auto-focus**: `pendamping.tsx` menjalankan `inputRef.current?.focus()` pada mount; setiap kali tab chat diaktifkan, fokus keyboard berpindah ke input tersebut.
7. **`scrollIntoView` saat mount**: efek auto-scroll chat (`ujungRef`) berjalan ketika komponen mount, ikut menggulirkan halaman pembungkus.
8. **Duplikasi akses**: file route lama tetap terdaftar di `routeTree.gen.ts`, sehingga konten yang sama dapat diakses dari path lama dan halaman tab baru sekaligus; `NavLink` sidebar menunjuk path lama, dan `activeOptions` exact khusus `/` dan `/ekspor` tidak mencakup path halaman tab baru.
9. **Beberapa portal overlay**: tiap halaman mendefinisikan `Dialog`/`Sheet` sendiri dengan state `open` masing-masing pada `z-50`; bila lebih dari satu halaman di-mount bersamaan (mis. `forceMount`), beberapa portal hidup dalam satu dokumen.
