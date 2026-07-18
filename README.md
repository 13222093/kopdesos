# KopdesOS

Platform CRM + ERP untuk pengelolaan Koperasi Desa/Kelurahan Merah Putih, dengan AI pendamping proaktif yang memberi insight dalam bahasa sederhana.

> Status: **frontend mockup** — semua data berasal dari fixtures (`apps/web/src/mocks/`), belum ada backend.

## Menjalankan secara lokal

```bash
pnpm install
pnpm dev
# buka URL yang ditampilkan (default http://localhost:5173)
```

## Struktur

```
apps/
└── web/   # Frontend (Vite + React + TanStack Router + Tailwind v4)
```

Rencana app berikutnya: `apps/db` (Postgres + migrasi), `apps/mcp` (tool surface AI). Blueprint lengkap: lihat `Documentation/18-07-2026/` di repo riset haloai.

## Modul mockup

- **Beranda** — KPI, grafik penjualan per gerai, insight AI harian
- **CRM**: Keanggotaan (tabel + record 360), Inbox WhatsApp
- **ERP**: POS Kasir (gerai sembako), Inventori (sembako/apotek/cold storage), Simpan Pinjam, Keuangan (ledger + monitor pinjaman Himbara)
- **AI Pendamping** — panel chat mengambang dengan insight proaktif (mock)
