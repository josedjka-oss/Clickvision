import type { ProductImageTone } from "@/features/catalog/types/product.types";
import { cn } from "@/lib/cn";

type ProductImagePlaceholderProps = {
  tone: ProductImageTone;
  label: string;
  className?: string;
};

const toneClasses: Record<ProductImageTone, string> = {
  navy: "from-accent-soft via-surface to-canvas",
  sand: "from-surface-muted via-surface to-accent-soft",
  sage: "from-surface-muted via-accent-soft to-canvas",
  stone: "from-border via-surface-muted to-surface",
  mist: "from-surface via-accent-soft to-surface-muted",
  graphite: "from-muted/15 via-border to-surface-muted",
};

export const ProductImagePlaceholder = ({
  tone,
  label,
  className,
}: ProductImagePlaceholderProps) => {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-xl bg-gradient-to-br p-4 shadow-inner shadow-black/[0.04]",
        toneClasses[tone],
        className,
      )}
      role="img"
      aria-label={`Vista previa de ${label}`}
    >
      <span className="max-w-full truncate text-left text-xs font-medium leading-snug text-ink/80 sm:max-w-[85%] sm:text-sm sm:whitespace-normal sm:leading-snug">
        {label}
      </span>
    </div>
  );
};
