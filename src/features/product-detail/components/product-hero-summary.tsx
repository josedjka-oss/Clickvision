import type { Product } from "@/features/catalog/types/product.types";
import { getShapeLabel } from "@/features/catalog/lib/catalog-query";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/format-money";
import { cn } from "@/lib/cn";

type ProductHeroSummaryProps = {
  product: Product;
};

export const ProductHeroSummary = ({ product }: ProductHeroSummaryProps) => {
  const priceLabel = formatMoney(product.priceFrom, product.currency);
  const hasCompare =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.priceFrom;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent" size="md">
          Montura
        </Badge>
        <Badge variant="outline" size="md">
          {product.frameMaterial}
        </Badge>
        <Badge variant="neutral" size="md">
          {getShapeLabel(product.shapeKey)}
        </Badge>
      </div>

      <div className="space-y-3">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {product.name}
        </h1>
        <div className="flex flex-wrap items-baseline gap-3">
          <p className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Desde {priceLabel}
          </p>
          {hasCompare ? (
            <p
              className={cn(
                "text-base font-medium text-subtle line-through decoration-border sm:text-lg",
              )}
            >
              {formatMoney(product.compareAtPrice!, product.currency)}
            </p>
          ) : null}
        </div>
        <p className="max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {product.tagline}
        </p>
      </div>

      <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
        <li className="rounded-lg border border-border bg-surface-muted/60 px-3 py-2">
          Pago seguro al activar checkout
        </li>
        <li className="rounded-lg border border-border bg-surface-muted/60 px-3 py-2">
          Asistencia para talla y lentes
        </li>
      </ul>
    </div>
  );
};
