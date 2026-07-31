# AGENTS.md

Panduan untuk AI coding agent di repo ini.

## Konteks project

KopPilot (sebelumnya KopdesOS) — CRM+ERP multi-tenant untuk Koperasi Desa Merah Putih + AI pendamping proaktif. Arsitektur mengikuti pola codebase HaloAI (TanStack + Postgres/PostgREST + entity-EAV + config-driven UI). Saat ini baru **frontend mockup**: seluruh data dari `apps/web/src/mocks/`, tidak ada backend.

## Konvensi

- Bahasa UI: **Indonesia**. Format uang: `Rp` dengan pemisah titik (`Intl.NumberFormat("id-ID")` — helper di `src/lib/format.ts`).
- Routing: file-based di `apps/web/src/routes` (@tanstack/react-router; `routeTree.gen.ts` di-generate, jangan diedit manual).
- Styling: Tailwind v4 (`src/styles/app.css` untuk tokens) + komponen ui gaya shadcn di `src/components/ui/`.
- Data mock: fixtures deterministik di `src/mocks/` (tanpa `Math.random()`/`Date.now()` di render path), diakses lewat TanStack Query fetcher palsu di `src/lib/api.ts`.
- Path alias: `~/*` → `apps/web/src/*`.

## Pendamping AI (backend)

- Endpoint `POST /api/pendamping` — Hono app di `apps/web/src/server/app.ts`, model **Kimi K2 (Moonshot)** via Vercel AI SDK (`@ai-sdk/openai-compatible`), tool-calling maks 6 step.
- Tools di `src/server/tools.ts` membaca **data-access layer** `src/server/data.ts` (sumber: fixtures `src/mocks/`). Saat backend Postgres dibangun, ganti HANYA `data.ts`.
- Aturan grounding: angka WAJIB dari tools, model tidak boleh mengarang (lihat SYSTEM_PROMPT di `app.ts`).
- Dev: `/api/*` dilayani `@hono/vite-dev-server` di dalam `pnpm dev`. Produksi: Vercel serverless via `apps/web/api/index.ts` + rewrite di `vercel.json`.
- Env: `MOONSHOT_API_KEY` (wajib), `MOONSHOT_MODEL`, `MOONSHOT_BASE_URL` (opsional) — lihat `.env.example`. Tanpa key, panel jatuh ke mode scripted (demo tetap jalan).

## Fitur Ekspor

- 3 halaman: `/ekspor` (skor kesiapan 5 dimensi), `/ekspor/peluang` (komoditas × negara, termasuk potensi RENDAH yang jujur), `/ekspor/dokumen` (checklist bertingkat + picker produk×negara). Data kurasi di `src/mocks/ekspor.ts`.
- AI tools: `lihat_kesiapan_ekspor`, `lihat_peluang_ekspor`, `lihat_dokumen_ekspor(komoditas?, negara?)`.
- **Aturan keras**: regulasi ekspor = data kurasi deterministik. AI dilarang menjawab regulasi di luar data (guard di SYSTEM_PROMPT aturan #8 + `catatanPenting` di `dataDokumenEkspor`). Kombinasi baru → tambah ke `checklistKombinasi`, jangan andalkan pengetahuan model.

## Keselarasan dengan deck (Spark Arc 2026)

Fitur yang ada untuk menutup janji slide 9 deck: prediksi permintaan (`prediksiStok()` di `mocks/produk.ts` — rumus transparan stok/laju, dipakai UI Inventori + `dataStok()` AI), Pengadaan PO mock (`daftarPengadaan`), Produk Digital PPOB (`/produk-digital`, `mocks/ppob.ts`, komisi masuk `ringkasanHariIni`), insight promosi (INS-07), kartu Penggajian di /keuangan. Angka WAJIB konsisten lintas halaman (mis. saran pesan beras 36 sak = PO-007).

## Konteks BNI (Spark Arc 2026)

Produk ini didemokan untuk challenge BNI Ventures (CASA + fee-based income). Bank di semua mock = **BNI** (bukan BRI). Elemen BNI: logo `public/bni.svg` via `components/bni/LogoBni.tsx` (monitor pinjaman, kartu Layanan BNI di /keuangan, dialog QRIS POS, kartu Xpora di ekspor, footer sidebar), data kurasi `src/mocks/bni.ts` + tool AI `lihat_layanan_bni`. Framing jujur: status "Segera" = mockup, bukan klaim kemitraan. AI dilarang mengarang produk/tarif bank di luar data kurasi.

## Perintah

- `pnpm dev` — jalankan dev server (dari root atau `apps/web`)
- `pnpm build` — build produksi
