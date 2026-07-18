# AGENTS.md

Panduan untuk AI coding agent di repo ini.

## Konteks project

KopdesOS — CRM+ERP multi-tenant untuk Koperasi Desa Merah Putih + AI pendamping proaktif. Arsitektur mengikuti pola codebase HaloAI (TanStack + Postgres/PostgREST + entity-EAV + config-driven UI). Saat ini baru **frontend mockup**: seluruh data dari `apps/web/src/mocks/`, tidak ada backend.

## Konvensi

- Bahasa UI: **Indonesia**. Format uang: `Rp` dengan pemisah titik (`Intl.NumberFormat("id-ID")` — helper di `src/lib/format.ts`).
- Routing: file-based di `apps/web/src/routes` (@tanstack/react-router; `routeTree.gen.ts` di-generate, jangan diedit manual).
- Styling: Tailwind v4 (`src/styles/app.css` untuk tokens) + komponen ui gaya shadcn di `src/components/ui/`.
- Data mock: fixtures deterministik di `src/mocks/` (tanpa `Math.random()`/`Date.now()` di render path), diakses lewat TanStack Query fetcher palsu di `src/lib/api.ts`.
- Path alias: `~/*` → `apps/web/src/*`.

## Perintah

- `pnpm dev` — jalankan dev server (dari root atau `apps/web`)
- `pnpm build` — build produksi
