# KopPilot

> AI-Powered Cooperative Operating System — Tim 3 Pilar, Spark Arc 2026 (BNI Ventures)

Platform CRM + ERP untuk pengelolaan Koperasi Desa/Kelurahan Merah Putih, dengan AI pendamping proaktif yang memberi insight dalam bahasa sederhana.

> Status: **mockup + AI nyata** — data UI dari fixtures (`apps/web/src/mocks/`), tapi panel Pendamping AI sudah tersambung ke **Kimi K2 (Moonshot)** yang membaca data platform lewat tools.

## Menjalankan secara lokal

```bash
pnpm install
# aktifkan AI (opsional — tanpa ini panel jatuh ke mode demo):
cp apps/web/.env.example apps/web/.env   # lalu isi MOONSHOT_API_KEY
pnpm dev
# buka URL yang ditampilkan (default http://localhost:5173)
```

Deploy di Vercel: set env var `MOONSHOT_API_KEY` di Project Settings → Environment Variables, lalu redeploy.

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
