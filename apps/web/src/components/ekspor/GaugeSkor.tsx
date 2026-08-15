/** Gauge setengah lingkaran untuk skor 0-100 — SVG murni, tanpa dependensi. */
export function GaugeSkor({ skor }: { skor: number }) {
  const PANJANG = 251.33; // keliling setengah lingkaran r=80
  const terisi = Math.max(0, Math.min(100, skor)) / 100;
  const warna =
    skor >= 70
      ? "var(--color-hijau)"
      : skor >= 40
        ? "var(--color-amber)"
        : "var(--color-merah)";
  return (
    <div className="relative mx-auto w-48">
      <svg viewBox="0 0 200 110" className="w-full">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--color-line-soft)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={warna}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${PANJANG * terisi} ${PANJANG}`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <span className="tnum font-mono text-4xl font-bold">{skor}</span>
        <span className="text-sm text-muted">/100</span>
      </div>
    </div>
  );
}
