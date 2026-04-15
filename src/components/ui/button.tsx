import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { ButtonSize, ButtonVariant } from "@/types/ui.types";
import { cn } from "@/lib/cn";

const base =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold tracking-tight transition-[color,background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-on-accent shadow-soft hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  secondary:
    "border border-border bg-surface text-ink shadow-sm hover:border-border hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  outline:
    "border-2 border-ink/15 bg-surface text-ink hover:border-ink/25 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ghost:
    "bg-transparent text-muted hover:bg-black/[0.04] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
};

/** Mobile-first: alturas táctiles ≥ 44px en md/lg. */
const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2.5 text-sm sm:min-h-10 sm:py-2",
  md: "min-h-12 px-5 py-3 text-base sm:min-h-11 sm:text-sm",
  lg: "min-h-12 px-6 py-3.5 text-base sm:min-h-[3.25rem] sm:px-8 sm:text-lg",
};

export type GetButtonClassesOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export const getButtonClasses = ({
  variant = "primary",
  size = "md",
  className,
}: GetButtonClassesOptions = {}) =>
  cn(base, variantClasses[variant], sizeClasses[size], className);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = "button",
      variant = "primary",
      size = "md",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={getButtonClasses({ variant, size, className })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
