"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/features/catalog/types/product.types";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { ProductPromoBadges } from "@/features/catalog/components/product-promo-badges";
import { cn } from "@/lib/cn";

type ProductGalleryProps = {
  product: Product;
};

const placeholderThumbIndices = [0, 1, 2, 3] as const;

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const urls = product.imageUrls ?? [];
  const hasImages = urls.length > 0;
  const thumbKeys = hasImages ? urls.map((_, index) => index) : [...placeholderThumbIndices];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!hasImages) {
      return;
    }

    if (activeIndex >= urls.length) {
      setActiveIndex(Math.max(0, urls.length - 1));
    }
  }, [activeIndex, hasImages, urls.length]);

  const safeIndex = hasImages ? Math.min(activeIndex, Math.max(0, urls.length - 1)) : activeIndex;
  const mainImageUrl = hasImages ? urls[safeIndex] : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/4">
        <ProductVisual
          tone={product.imageTone}
          label={`${product.name} — vista ${safeIndex + 1}`}
          imageUrl={mainImageUrl}
          className="aspect-4/3 rounded-2xl sm:aspect-5/4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {product.badges.length > 0 ? (
          <div className="pointer-events-none absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
            <ProductPromoBadges badges={product.badges} />
          </div>
        ) : null}
      </div>
      <div
        className="flex gap-2 overflow-x-auto pb-1 sm:gap-3"
        aria-label="Miniaturas de la montura"
      >
        {thumbKeys.map((index) => {
          const isActive = index === activeIndex;
          const thumbUrl = hasImages ? urls[index] : undefined;
          return (
            <button
              key={hasImages ? `img-${index}` : `ph-${index}`}
              type="button"
              aria-pressed={isActive}
              aria-label={`Mostrar vista ${index + 1}`}
              onClick={() => {
                setActiveIndex(index);
              }}
              className={cn(
                "w-20 shrink-0 overflow-hidden rounded-lg border transition-colors sm:w-24",
                isActive
                  ? "border-accent ring-2 ring-ring/25"
                  : "border-border hover:border-muted",
              )}
            >
              <ProductVisual
                tone={product.imageTone}
                label={`Miniatura ${index + 1}`}
                imageUrl={thumbUrl}
                className="aspect-square rounded-none"
                sizes="80px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
