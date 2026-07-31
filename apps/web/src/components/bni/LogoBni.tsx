import { cn } from "~/lib/utils";

/** Logo resmi BNI (public/bni.svg) — dipakai untuk konteks Spark Arc 2026 */
export function LogoBni({ className }: { className?: string }) {
  return (
    <img
      src="/bni.svg"
      alt="BNI"
      className={cn("h-4 w-auto select-none", className)}
      draggable={false}
    />
  );
}
