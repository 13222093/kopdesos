import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { cn } from "~/lib/utils";

/**
 * Tombol AI kontekstual: membawa pertanyaan berkonteks ke /pendamping
 * dan langsung dikirim otomatis di sana (search param q).
 */
export function TanyaAI({
  q,
  label,
  className,
}: {
  q: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      to="/pendamping"
      search={{ q }}
      onClick={(e) => e.stopPropagation()}
      title="Tanya KopPilot AI"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-line bg-card px-2 py-1 text-[11px] font-medium text-muted transition-colors hover:border-merah/40 hover:bg-merah-soft hover:text-merah",
        className,
      )}
    >
      <Sparkles className="size-3 shrink-0" />
      {label ? <span className="whitespace-nowrap">{label}</span> : null}
    </Link>
  );
}
