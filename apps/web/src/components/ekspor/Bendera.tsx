import au from "flag-icons/flags/4x3/au.svg";
import jp from "flag-icons/flags/4x3/jp.svg";
import my from "flag-icons/flags/4x3/my.svg";
import sg from "flag-icons/flags/4x3/sg.svg";
import us from "flag-icons/flags/4x3/us.svg";

import { cn } from "~/lib/utils";

const PETA: Record<string, string> = { jp, au, us, sg, my };

/** Bendera negara sebagai SVG — emoji bendera tidak dirender di Windows. */
export function Bendera({ kode, className }: { kode: string; className?: string }) {
  const src = PETA[kode];
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={cn(
        "inline-block h-3.5 w-auto rounded-[2px] border border-line-soft align-[-2px]",
        className,
      )}
    />
  );
}
