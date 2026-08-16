import * as React from "react";

import { cn } from "~/lib/utils";

/**
 * Slot gambar dengan fallback anggun: coba muat `src`; bila file belum ada
 * (404) atau src kosong, tampilkan placeholder gradient + emoji/ikon.
 * Konvensi: taruh file di apps/web/public/gambar/... sesuai path yang diminta
 * pemanggil — begitu file ada, gambar otomatis tampil tanpa ubah kode.
 */
export function GambarSlot({
  src,
  fallback,
  alt,
  className,
}: {
  src?: string;
  fallback: React.ReactNode;
  alt: string;
  className?: string;
}) {
  const [gagal, setGagal] = React.useState(false);

  if (!src || gagal) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex shrink-0 items-center justify-center bg-gradient-to-br from-hijau-soft via-line-soft to-line select-none",
          className,
        )}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setGagal(true)}
      className={cn("shrink-0 object-cover", className)}
      draggable={false}
    />
  );
}
