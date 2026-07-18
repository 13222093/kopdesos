import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        netral: "border-line bg-line-soft text-muted",
        merah: "border-merah/20 bg-merah-soft text-merah",
        hijau: "border-hijau/20 bg-hijau-soft text-hijau",
        amber: "border-amber/20 bg-amber-soft text-amber",
        garis: "border-line bg-transparent text-muted",
      },
    },
    defaultVariants: { variant: "netral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
