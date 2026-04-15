import Link from "next/link";
import type { Product } from "@/features/catalog/types/product.types";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { ProductPromoBadges } from "@/features/catalog/components/product-promo-badges";
import { Badge } from "@/components/ui/badge";
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
    <article className="group flex flex-col gap-4 transition-shadow duration-200 hover:shadow-soft">
      <div className="relative">
        <div className="rounded-xl border border-border/70 bg-surface p-2 shadow-sm transition-[border-color,box-shadow] duration-200 group-hover:border-border group-hover:shadow-md sm:p-3">
          <Link
            href={href}
            className="block overflow-hidden rounded-lg outline-none ring-offset-2 ring-offset-surface focus-visible:ring-2 focus-visible:ring-ring/35"
          >
            <ProductVisual
              tone={product.imageTone}
              label={product.name}
              imageUrl={product.imageUrls?.[0]}
              className="aspect-4/3 rounded-lg bg-surface"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>
        </div>
        {product.badges.length > 0 ? (
          <div className="pointer-events-none absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-1.5 sm:left-5 sm:top-5">
            <ProductPromoBadges badges={product.badges} />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" size="sm">
            {product.frameMaterial}
          </Badge>
          <Badge variant="neutral" size="sm">
            {getShapeLabel(product.shapeKey)}
          </Badge>
        </div>
        <Link href={href} className="block space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-md">
          <h2 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-xl">
            {product.name}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted sm:text-base">
            {product.tagline}
          </p>
        </Link>
        <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
          <p className="text-base font-semibold tabular-nums text-ink">{priceLabel}</p>
          {hasCompare ? (
            <p
              className={cn(
                "text-sm font-medium text-subtle line-through decoration-border sm:text-base",
              )}
            >
              {formatMoney(product.compareAtPrice!, product.currency)}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
};
