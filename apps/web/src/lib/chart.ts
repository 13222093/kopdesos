/** Palet chart — tervalidasi scripts/validate_palette.js (light, surface #fff):
 *  kategorikal gerai & pasangan arus kas: semua check PASS. */
export const WARNA_GERAI = {
  sembako: "#b7202e",
  apotek: "#2160c4",
  gudang: "#a16207",
} as const;

export const WARNA_KAS = {
  netKas: "#2160c4",
  angsuran: "#b7202e",
} as const;

export const LABEL_GERAI: Record<keyof typeof WARNA_GERAI, string> = {
  sembako: "Sembako",
  apotek: "Apotek",
  gudang: "Cold Storage",
};
