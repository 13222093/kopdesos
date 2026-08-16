# Folder gambar

Jatuhkan file gambar di sini dengan nama persis seperti di bawah — UI otomatis
memakainya (tanpa ubah kode). Selama file belum ada, aplikasi menampilkan
placeholder emoji yang tetap rapi.

Format: JPG/PNG. Ukuran disarankan: berita & komoditas ±400×400 (dipotong
persegi otomatis), produk ±400×200 (landscape), logo program PNG transparan.

## berita/  (thumbnail Kabar Pasar, 4 file)
- `berita/arabika-brasil.jpg`   — harga arabika naik, embun beku Brasil
- `berita/residu-jepang.jpg`    — aturan residu pestisida Jepang
- `berita/ekspor-perikanan.jpg` — ekspor perikanan naik
- `berita/harga-cabai.jpg`      — harga cabai domestik tinggi

## komoditas/  (foto kartu Peluang Pasar, 4 file)
- `komoditas/kopi.jpg`
- `komoditas/ikan-beku.jpg`
- `komoditas/kentang.jpg`
- `komoditas/cabai-bawang.jpg`

## produk/  (foto kartu Kasir — opsional, isi bertahap)
Nama file = ID produk, mis.:
- `produk/SMB-001.jpg` (Beras Premium 5 kg), `produk/SMB-003.jpg` (Minyak 1 L), dst.
Daftar ID lengkap ada di `apps/web/src/mocks/produk.ts`.

## program/  (logo program pendampingan di halaman Kesiapan, 3 file)
- `program/desa-devisa.png`
- `program/desa-bisa-ekspor.png`
- `program/umkm-bisa-ekspor.png`
(BNI Xpora otomatis memakai `/bni.svg` yang sudah ada.)
