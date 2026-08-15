# SPEC — Restrukturisasi Fokus KopPilot

> Spec implementasi. Basis: `INVENTORY.md` (commit `eff35fb`).
> Tujuan: menyelaraskan navigasi aplikasi dengan narasi "3 Copilots" di deck,
> dan menambahkan pemilih peran, tanpa menghapus fitur dan tanpa memindahkan
> file route.
> Konvensi repo: identifier bahasa Indonesia. Jangan menerjemahkan nama yang
> sudah ada.

## Prinsip

1. **Tidak ada route yang dihapus, dipindah, atau digabung.** `routeTree.gen.ts`
   tidak boleh berubah.
2. **Tidak memakai Radix `Tabs` untuk menggabungkan halaman.** Alasan ada di §6.
3. Perubahan utama terbatas di `AppShell.tsx` dan tiga file route ekspor.

---

## 1. Perubahan A — susun ulang grup sidebar (`components/layout/AppShell.tsx`)

Ganti empat array `navUtama`, `navCrm`, `navErp`, `navEkspor` menjadi struktur di
bawah. Komponen `NavItem` dan `NavLink` tidak berubah. Path, ikon, dan
`activeOptions` yang sudah ada dipertahankan persis.

```
(tanpa label grup)
└── Beranda                → /                  LayoutDashboard

"PENDAMPING AI"
├── Chat Pendamping        → /pendamping        Sparkles
└── Inbox WhatsApp         → /inbox             MessageCircle

"COPILOT OPERASI"
├── Kasir                  → /pos               ShoppingCart
├── Inventori & Pengadaan  → /inventori         Boxes
└── Produk Digital         → /produk-digital    Smartphone

"COPILOT KEUANGAN"
├── Keuangan & Laporan     → /keuangan          BookOpenText
├── Simpan Pinjam          → /simpan-pinjam     HandCoins
└── Keanggotaan            → /anggota           Users

"COPILOT EKSPOR"
├── Kesiapan               → /ekspor            Rocket
├── Peluang Pasar          → /ekspor/peluang    Globe2
└── Dokumen & Regulasi     → /ekspor/dokumen    FileCheck2
```

Perubahan tambahan di file yang sama:

- **Hapus grup "Lainnya" beserta item `Pengaturan`** (span nonaktif dengan pill
  "segera"). Menu mati menambah jumlah item tanpa menambah nilai.
- Pertahankan `activeOptions={{ exact: item.to === "/" || item.to === "/ekspor" }}`
  apa adanya. `/ekspor` tetap butuh `exact` karena punya anak route.
- Footer, topbar, dan mounting `<PendampingAI/>` tidak berubah.

Hasil yang diharapkan: label grup di sidebar terbaca identik dengan slide
"3 Copilots" di deck. Jumlah item nav turun dari 13 (termasuk Pengaturan) ke 12.

---

## 2. Perubahan B — pemilih peran (`AppShell.tsx`)

### Tipe dan state

```ts
type Peran = "manajer" | "kasir" | "anggota";
```

State `peran` di `AppShell` dengan nilai awal `"manajer"`. Tidak perlu context
atau store global: sidebar dan topbar keduanya berada di dalam `AppShell`.

### Kontrol UI

Tambahkan pemilih di topbar, di sebelah kiri tombol lonceng `Bell`. Pakai
komponen yang sudah ada (`Button` + `Sheet`, atau elemen `select` bergaya
Tailwind). Jangan menambah dependensi baru.

Label yang ditampilkan: `Manajer Koperasi`, `Kasir`, `Anggota`.

### Aturan filter nav

| Peran | Grup yang tampil |
|---|---|
| `manajer` | semua |
| `kasir` | Beranda, PENDAMPING AI, COPILOT OPERASI |
| `anggota` | hanya dua item khusus (lihat di bawah) |

Untuk `anggota`, nav diganti menjadi:

```
├── Profil Saya            → /anggota/{id}      User
└── Chat Pendamping        → /pendamping        Sparkles
```

`{id}` **harus diambil dari `daftarAnggota[0].id`** di `mocks/anggota.ts`, jangan
di-hardcode. Format ID mengikuti pola `AGT-xxx`.

### Perilaku saat berganti peran

Saat peran diubah, lakukan `navigate()` ke halaman utama peran tersebut, supaya
demo tidak menyisakan halaman yang tidak relevan:

- `manajer` → `/`
- `kasir` → `/pos`
- `anggota` → `/anggota/{daftarAnggota[0].id}`

### Perubahan identitas di footer dan topbar

Avatar dan nama di footer sidebar saat ini hardcoded `koperasi.manajer` /
"Sari Wulandari" / "Manajer KDMP". Buat agar mengikuti `peran`:

- `manajer` → data `koperasi.manajer` yang sudah ada
- `kasir` → nama kasir; ambil dari mock bila ada, kalau tidak ada tambahkan
  field baru di `mocks/koperasi.ts` (jangan hardcode di komponen)
- `anggota` → `daftarAnggota[0].nama` dan label "Anggota"

### Yang TIDAK dilakukan

Tidak ada autentikasi, tidak ada guard route, tidak ada penyembunyian data di
level `data.ts`. Ini pemilih tampilan untuk keperluan demo, bukan sistem izin.
Jangan membangun yang lebih dari itu.

---

## 3. Perubahan C — alur ekspor bertahap (3 file route ekspor)

Ekspor sekarang tiga halaman sejajar dengan link silang. Ubah tampilannya
menjadi alur tiga langkah, **memakai `Link` TanStack Router yang digayakan
seperti tab, bukan komponen `Tabs`**.

Buat satu komponen baru `src/components/ekspor/NavEkspor.tsx`:

- Tiga `Link`: `1 · Kesiapan` → `/ekspor`, `2 · Peluang Pasar` →
  `/ekspor/peluang`, `3 · Dokumen & Regulasi` → `/ekspor/dokumen`
- Menandai item aktif dengan `activeProps`; untuk `/ekspor` pakai
  `activeOptions={{ exact: true }}`
- Digayakan seperti segmented control, konsisten dengan tema Sage

Pasang komponen ini di ketiga file (`ekspor.index.tsx`, `ekspor.peluang.tsx`,
`ekspor.dokumen.tsx`), tepat di bawah header. Hapus link silang manual yang ada
sekarang di header masing-masing halaman.

Karena ini navigasi asli dan bukan `Tabs`, tidak ada state yang hilang, tidak
ada `Tabs` bersarang, dan URL tetap dapat di-bookmark serta ditunjuk dari
sidebar.

---

## 4. Perubahan D — perbaikan kecil yang terlihat saat demo

| # | File | Masalah | Perbaikan |
|---|---|---|---|
| 1 | `routes/pendamping.tsx` | `Badge` berbunyi "Kimi K2 tersambung", padahal `MOONSHOT_MODEL` default `kimi-k3` | Ganti jadi label netral, mis. "AI tersambung". Jangan menyebut nama model di UI. |
| 2 | `server/tools.ts` tool `lihat_kesiapan_ekspor` | Deskripsi menyebut 3 program pendampingan, `programPendampingan` berisi 4 (termasuk BNI Xpora) | Perbarui deskripsi agar menyebut 4 program dan menyebut BNI Xpora secara eksplisit. Routing model bergantung pada deskripsi tool. |
| 3 | `routes/index.tsx` | Subjudul tanggal hardcoded "Sabtu, 18 Juli 2026" | Ganti dengan `formatTanggal(HARI_INI)` seperti yang dipakai topbar |
| 4 | `routes/pendamping.tsx` | Wrapper `max-w-3xl`, halaman lain `max-w-6xl` | Samakan ke `max-w-6xl` agar lebar konsisten antar halaman |

Perbaikan #2 wajib. Dua lainnya kosmetik tapi murah.

---

## 5. Verifikasi sebelum commit

```
npx tsc --noEmit
pnpm build
```

Cek manual:

1. Ketiga peran dapat dipilih dan nav berubah sesuai tabel di §2
2. Berpindah peran tidak meninggalkan halaman yang tidak relevan
3. Keranjang di `/pos` tetap utuh saat berpindah halaman lalu kembali
   (harus tetap kosong-ulang seperti perilaku sekarang, tidak ada regresi)
4. Sidebar mobile (`Sheet`) menampilkan grup yang sama dengan desktop
5. Panel `PendampingAI` tetap menyembunyikan diri di `/pendamping`
6. `/ekspor` menandai langkah 1 sebagai aktif, bukan ketiganya

Commit message tanpa tanda kutip ganda di dalamnya.

---

## 6. Yang sengaja TIDAK dikerjakan, beserta alasannya

Rencana awal menggabungkan 12 route menjadi 4 halaman ber-tab **dibatalkan**.
Alasan, mengacu ke §6 `INVENTORY.md`:

1. `TabsContent` tidak memakai `forceMount`, sehingga tab nonaktif di-unmount
   dan state lokal hilang. Terdampak: `keranjang` dan `dialogBayar` di `pos`,
   `terpilih` di `inventori` / `simpan-pinjam` / `ekspor.dokumen` /
   `produk-digital`, `aktifId` di `inbox`, dan seluruh state chat. Keranjang
   yang kosong sendiri di tengah demo adalah risiko yang tidak sebanding.
2. `inventori.tsx` sudah memakai `Tabs` untuk 3 gerai. Tab tingkat halaman
   menghasilkan `Tabs` bersarang dengan dua tingkat navigasi panah keyboard.
3. `inbox.tsx` dan `pendamping.tsx` memakai `h-[calc(100dvh-7.5rem)]` yang
   mengasumsikan dirinya anak langsung `<main>`. Di dalam halaman ber-tab
   muncul scroll ganda.
4. Dua instance `useChat` (`pendamping.tsx` dan `PendampingAI.tsx`) akan tampil
   bersamaan sebagai dua percakapan berbeda, karena panel mengambang
   menyembunyikan diri berdasarkan `pathname.startsWith("/pendamping")`.
5. File route lama tetap terdaftar di `routeTree.gen.ts`, sehingga konten sama
   dapat diakses dari dua path.

Masalah yang sebenarnya ingin diselesaikan (fitur terasa banyak dan tidak
fokus) berasal dari kosakata sidebar yang tidak cocok dengan deck, bukan dari
jumlah halaman. Perubahan A menyelesaikannya di satu file.
