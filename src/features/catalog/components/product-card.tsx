import Link from "next/link";
import type { Product } from "@/features/catalog/types/product.types";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { ProductPromoBadges } from "@/features/catalog/components/product-promo-badges";
import { Badge } from "@/components/ui/badge";
import { getButtonClasses } from "@/components/ui/button";
import { getShapeLabel } from "@/features/catalog/lib/catalog-query";
import { routes } from "@/lib/routes";
import { formatMoney } from "@/lib/format-money";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const href = routes.product(product.slug);
  const priceLabel = `Desde ${formatMoney(product.priceFrom, product.currency)}`;
  const hasCompare =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.priceFrom;

  return (
    <article
      className={cn(
        "group grid h-full min-h-88 grid-rows-[7fr_3fr] gap-y-4 rounded-2xl border border-border/70 bg-surface p-5 shadow-sm transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-soft sm:min-h-104 sm:gap-y-5 sm:p-6",
      )}
    >
      <div className="relative min-h-0">
        {product.badges.length > 0 ? (
          <div className="pointer-events-none absolute left-0 top-0 z-10 flex max-w-[calc(100%-0.5rem)] flex-wrap gap-1.5">
            <ProductPromoBadges badges={product.badges} />
          </div>
        ) : null}
        <Link
          href={href}
          className="block h-full min-h-0 overflow-hidden rounded-xl bg-surface-muted/40 outline-none ring-offset-2 ring-offset-surface focus-visible:ring-2 focus-visible:ring-ring/35"
          aria-label={`Ver producto ${product.name}`}
        >
          <ProductVisual
            tone={product.imageTone}
            label={product.name}
            imageUrl={product.imageUrls?.[0]}
            className="aspect-auto h-full min-h-0 rounded-xl bg-surface-muted/40"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
      </div>

      <div className="flex min-h-0 flex-col justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" size="sm">
              {product.frameMaterial}
            </Badge>
            <Badge variant="neutral" size="sm">
              {getShapeLabel(product.shapeKey)}
            </Badge>
          </div>
          <Link
            href={href}
            className="block space-y-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <h2 className="text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
              {product.name}
            </h2>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted sm:text-base">
              {product.tagline}
            </p>
          </Link>
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <p className="text-2xl font-semibold tabular-nums tracking-tight text-ink sm:text-[1.65rem]">
              {priceLabel}
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
        </div>
        <Link
          href={href}
          className={getButtonClasses({
            variant: "primary",
            size: "sm",
            className: "w-full justify-center no-underline",
          })}
          aria-label={`Ver detalles de ${product.name}`}
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
};
