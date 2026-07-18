import * as React from "react";

import { cn } from "~/lib/utils";
import { inisial } from "~/lib/format";

export function Avatar({
  nama,
  className,
}: {
  nama: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-merah-soft text-[11px] font-semibold text-merah",
        className,
      )}
      aria-hidden
    >
      {inisial(nama)}
    </span>
  );
}
