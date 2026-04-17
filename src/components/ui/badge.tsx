import type { HTMLAttributes } from "react";
import type { BadgeSize, BadgeVariant } from "@/types/ui.types";
import { cn } from "@/lib/cn";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border border-border/80 bg-surface-muted text-muted",
  accent: "border border-accent/20 bg-accent-soft text-accent",
  outline: "border border-border/80 bg-surface text-muted",
  new: "border border-success/20 bg-success-soft text-success",
  sale: "border border-destructive/20 bg-destructive-soft text-destructive",
  bestseller: "border border-border bg-secondary-bg text-ink",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "min-h-7 px-2.5 py-1 text-xs leading-tight",
  md: "min-h-8 px-3 py-1 text-xs leading-tight",
};

export const Badge = ({
  className,
  variant = "neutral",
  size = "md",
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex w-fit max-w-full items-center rounded-full font-medium tracking-tight",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};
