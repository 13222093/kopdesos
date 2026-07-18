import * as React from "react";

import { cn } from "~/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-line bg-card px-3 text-sm placeholder:text-muted/70 focus-visible:border-merah",
        className,
      )}
      {...props}
    />
  );
}
