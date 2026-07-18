import { HARI_INI } from "./koperasi";

export type PenjualanHarian = {
  tanggal: string;
  sembako: number;
  apotek: number;
  gudang: number;
};

/** PRNG deterministik (mulberry32) — data sama di setiap render/reload */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function bulatkan(nilai: number, kelipatan = 1000): number {
  return Math.round(nilai / kelipatan) * kelipatan;
}

function buatRiwayat(): PenjualanHarian[] {
  const acak = mulberry32(20260718);
  const akhir = new Date(`${HARI_INI}T00:00:00`);
  const hasil: PenjualanHarian[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(akhir);
    d.setDate(d.getDate() - i);
    const akhirPekan = d.getDay() === 0 || d.getDay() === 6;
    // tren naik perlahan sepanjang 90 hari + ramai di akhir pekan
    const tren = 1 + (89 - i) * 0.004;
    const pengali = (akhirPekan ? 1.35 : 1) * tren;
    hasil.push({
      tanggal: d.toISOString().slice(0, 10),
      sembako: bulatkan((2_400_000 + acak() * 1_600_000) * pengali),
      apotek: bulatkan((550_000 + acak() * 500_000) * pengali),
      gudang: bulatkan((300_000 + acak() * 450_000) * (akhirPekan ? 0.7 : 1) * tren),
    });
  }
  return hasil;
}

export const penjualan90Hari: PenjualanHarian[] = buatRiwayat();

export const penjualanHariIni = penjualan90Hari[penjualan90Hari.length - 1];

export function totalHari(p: PenjualanHarian): number {
  return p.sembako + p.apotek + p.gudang;
}

export const penjualanKemarin = penjualan90Hari[penjualan90Hari.length - 2];

/** total 30 hari terakhir per gerai */
export const total30Hari = penjualan90Hari.slice(-30).reduce(
  (acc, p) => ({
    sembako: acc.sembako + p.sembako,
    apotek: acc.apotek + p.apotek,
    gudang: acc.gudang + p.gudang,
  }),
  { sembako: 0, apotek: 0, gudang: 0 },
);
