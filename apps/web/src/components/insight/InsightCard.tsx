import { AlertTriangle, Info, Sparkles, TrendingUp } from "lucide-react";

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

export function InsightCard({
  insight,
  ringkas = false,
}: {
  insight: Insight;
  ringkas?: boolean;
}) {
  const Icon = ikonTipe[insight.tipe];
  const badge = badgeTipe[insight.tipe];
  return (
    <article className="rounded-lg border border-line bg-card p-3.5">
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
            insight.tipe === "peringatan" && "bg-amber-soft text-amber",
            insight.tipe === "peluang" && "bg-hijau-soft text-hijau",
            insight.tipe === "info" && "bg-line-soft text-muted",
          )}
        >
          <Icon className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-[13px] leading-snug font-semibold">{insight.judul}</h4>
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
          <p
            className={cn(
              "mt-1 text-xs leading-relaxed text-muted",
              ringkas && "line-clamp-3",
            )}
          >
            {insight.isi}
          </p>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted/70">
            <Sparkles className="size-3" /> Pendamping AI · {insight.waktu}
          </p>
        </div>
      </div>
    </article>
  );
}
