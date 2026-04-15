import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-border/80 bg-surface p-6 shadow-soft sm:p-8",
      className,
    )}
    {...props}
  />
);

export type CardSectionProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = ({ className, ...props }: CardSectionProps) => (
  <div className={cn("mb-4 space-y-1.5 sm:mb-6", className)} {...props} />
);

export const CardTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-lg font-semibold tracking-tight text-ink sm:text-xl", className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm leading-relaxed text-muted", className)} {...props} />
);

export const CardContent = ({ className, ...props }: CardSectionProps) => (
  <div className={cn("space-y-4", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: CardSectionProps) => (
  <div
    className={cn("mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center", className)}
    {...props}
  />
);
