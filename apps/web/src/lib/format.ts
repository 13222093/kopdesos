const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const angka = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

export function formatRupiah(nilai: number): string {
  return rupiah.format(nilai);
}

/** Rp 1,2 jt / Rp 850 rb — untuk kartu KPI & chart */
export function formatRupiahSingkat(nilai: number): string {
  const abs = Math.abs(nilai);
  const tanda = nilai < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${tanda}Rp ${(abs / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`;
  if (abs >= 1_000_000) return `${tanda}Rp ${(abs / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  if (abs >= 1_000) return `${tanda}Rp ${(abs / 1_000).toLocaleString("id-ID", { maximumFractionDigits: 0 })} rb`;
  return `${tanda}Rp ${abs}`;
}

export function formatAngka(nilai: number): string {
  return angka.format(nilai);
}

export function formatTanggal(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTanggalPendek(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function inisial(nama: string): string {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((k) => k[0])
    .join("")
    .toUpperCase();
}
