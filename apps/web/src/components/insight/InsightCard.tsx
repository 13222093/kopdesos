import { AlertTriangle, ChevronDown, Info, Sparkles, TrendingUp } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import type { Insight } from "~/mocks/insight";

const ikonTipe = {
  peringatan: AlertTriangle,
  info: Info,
  peluang: TrendingUp,
} as const;

const badgeTipe = {
  peringatan: { variant: "amber" as const, label: "Perlu tindakan" },
  info: { variant: "netral" as const, label: "Info" },
  peluang: { variant: "hijau" as const, label: "Peluang" },
};

function IkonInsight({ tipe }: { tipe: Insight["tipe"] }) {
  const Icon = ikonTipe[tipe];
  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full",
        tipe === "peringatan" && "bg-amber-soft text-amber",
        tipe === "peluang" && "bg-hijau-soft text-hijau",
        tipe === "info" && "bg-line-soft text-muted",
      )}
    >
      <Icon className="size-3.5" />
    </span>
  );
}

export function InsightCard({
  insight,
  ringkas = false,
}: {
  insight: Insight;
  ringkas?: boolean;
}) {
  const badge = badgeTipe[insight.tipe];

  if (ringkas) {
    // mode ringkas: judul + 1 baris inti selalu tampil; detail lengkap saat diklik
    return (
      <details className="group rounded-lg border border-line bg-card">
        <summary className="flex cursor-pointer list-none items-start gap-2.5 p-3 [&::-webkit-details-marker]:hidden">
          <IkonInsight tipe={insight.tipe} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h4 className="text-[13px] leading-snug font-semibold">
                {insight.judul}
              </h4>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
            <p className="mt-0.5 text-xs leading-snug text-muted">{insight.inti}</p>
          </div>
          <ChevronDown className="mt-1 size-3.5 shrink-0 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-3 pb-3 pl-[3.1rem]">
          <p className="text-xs leading-relaxed text-muted">{insight.isi}</p>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted/70">
            <Sparkles className="size-3" /> Pendamping AI · {insight.waktu}
          </p>
        </div>
      </details>
    );
  }

  return (
    <article className="rounded-lg border border-line bg-card p-3.5">
      <div className="flex items-start gap-2.5">
        <IkonInsight tipe={insight.tipe} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-[13px] leading-snug font-semibold">{insight.judul}</h4>
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">{insight.isi}</p>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted/70">
            <Sparkles className="size-3" /> Pendamping AI · {insight.waktu}
          </p>
        </div>
      </div>
    </article>
  );
}
