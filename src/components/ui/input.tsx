import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const inputBase =
  "w-full min-h-12 rounded-xl border border-border bg-surface px-4 py-3 text-base leading-normal text-ink shadow-inner shadow-black/5 transition-[border-color,box-shadow] placeholder:text-subtle focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-11 sm:py-2.5";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputBase, className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
