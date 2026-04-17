"use client";

import { useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import type { Product } from "@/features/catalog/types/product.types";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { formatMoney } from "@/lib/format-money";
import { routes } from "@/lib/routes";

const imageUploadSiteUrl = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SITE_URL?.trim() ?? "";
import { cn } from "@/lib/cn";
import { getButtonClasses } from "@/components/ui/button";

type HomeProductRailProps = {
  id: string;
  title: string;
  description?: string;
  products: Product[];
  /** Solo en el primer carrusel de la home para LCP. */
  prioritizeFirstImage?: boolean;
  /** Estilo del título (p. ej. serif para bloque Novedades). */
  titleClassName?: string;
  /** CTA opcional a la derecha del título (p. ej. enlace al catálogo). */
  cta?: { href: string; label: string };
  /** Mensaje si no hay productos (p. ej. catálogo Firestore vacío en producción). */
  emptyMessage?: string;
};

const scrollStepPx = 320;

export const HomeProductRail = ({
  id,
  title,
  description,
  products,
  prioritizeFirstImage = false,
  titleClassName,
  cta,
  emptyMessage = "Aún no hay monturas publicadas en el catálogo. Crea productos en Admin o revisa que en Firestore tengan el estado publicado.",
}: HomeProductRailProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hasProducts = products.length > 0;

  const handleScrollPrev = () => {
    scrollerRef.current?.scrollBy({ left: -scrollStepPx, behavior: "smooth" });
  };

  const handleScrollNext = () => {
    scrollerRef.current?.scrollBy({ left: scrollStepPx, behavior: "smooth" });
  };

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleScrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleScrollNext();
    }
  };

  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:max-w-7xl">
          <div className="max-w-2xl space-y-2">
            <h2
              id={headingId}
              className={cn(
                "text-2xl font-semibold tracking-tight text-ink sm:text-3xl",
                titleClassName,
              )}
            >
              {title}
            </h2>
            {description ? (
              <p className="text-sm leading-relaxed text-muted sm:text-base">{description}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3 self-start sm:self-auto">
            {cta ? (
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {cta.label}
              </Link>
            ) : null}
            {hasProducts ? (
              <>
                <button
                  type="button"
                  onClick={handleScrollPrev}
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-ink shadow-sm transition-colors",
                    "hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  )}
                  aria-label={`Anterior: ${title}`}
                >
                  <span className="sr-only">Anterior</span>
                  <Chevron direction="left" />
                </button>
                <button
                  type="button"
                  onClick={handleScrollNext}
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-ink shadow-sm transition-colors",
                    "hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  )}
                  aria-label={`Siguiente: ${title}`}
                >
                  <span className="sr-only">Siguiente</span>
                  <Chevron direction="right" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription={hasProducts ? "carrusel" : undefined}
        aria-label={title}
        tabIndex={hasProducts ? 0 : -1}
        onKeyDown={hasProducts ? handleRailKeyDown : undefined}
        className={cn(
          "mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-4 pr-4 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none]",
          "sm:mt-8 sm:gap-5 sm:pl-6 sm:pr-6 lg:pl-10 lg:pr-10",
          "[&::-webkit-scrollbar]:hidden",
          !hasProducts && "justify-center",
        )}
      >
        {!hasProducts ? (
          <div className="mx-auto w-full max-w-2xl rounded-2xl border border-dashed border-border bg-secondary-bg px-6 py-10 text-center sm:px-8 sm:py-12">
            <p className="text-sm leading-relaxed text-muted sm:text-base">{emptyMessage}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {imageUploadSiteUrl ? (
                <a
                  href={imageUploadSiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={getButtonClasses({
                    variant: "primary",
                    size: "sm",
                    className: "justify-center no-underline",
                  })}
                >
                  Portal de imágenes
                </a>
              ) : null}
              <Link
                href={routes.catalog}
                className={getButtonClasses({ variant: "secondary", size: "sm", className: "justify-center no-underline" })}
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        ) : null}
        {products.map((product, index) => (
          <article
            key={product.id}
            className="w-[min(17.5rem,calc(100vw-2.5rem))] shrink-0 snap-start sm:w-[18.5rem]"
            aria-label={`${index + 1} de ${products.length}`}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-secondary-bg shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-border hover:shadow-soft">
              <Link
                href={routes.product(product.slug)}
                className="block min-h-0 outline-none ring-offset-2 ring-offset-surface focus-visible:ring-2 focus-visible:ring-ring/35"
                aria-label={`Ver ${product.name}`}
              >
                <ProductVisual
                  tone={product.imageTone}
                  label={product.name}
                  imageUrl={product.imageUrls?.[0]}
                  className="aspect-[5/6] bg-surface-muted/50"
                  sizes="280px"
                  priority={prioritizeFirstImage && index === 0}
                />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="space-y-1">
                  <Link
                    href={routes.product(product.slug)}
                    className="block font-semibold tracking-tight text-ink transition-colors hover:text-accent"
                  >
                    {product.name}
                  </Link>
                  <p className="text-lg font-semibold tabular-nums text-ink">
                    Desde {formatMoney(product.priceFrom, product.currency)}
                  </p>
                </div>
                <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={routes.lensWizard(product.slug)}
                    className="text-sm font-medium text-muted underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    Configurar lentes
                  </Link>
                  <Link
                    href={routes.product(product.slug)}
                    className={getButtonClasses({
                      variant: "primary",
                      size: "sm",
                      className: "w-full justify-center no-underline sm:w-auto",
                    })}
                  >
                    Ver ficha
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

type ChevronProps = { direction: "left" | "right" };

const Chevron = ({ direction }: ChevronProps) => {
  const rotate = direction === "right" ? "" : "rotate-180";
  return (
    <span className={cn("inline-flex size-5 items-center justify-center", rotate)} aria-hidden>
      <svg viewBox="0 0 20 20" fill="none" className="size-5" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.5 4.5 12.5 10l-5 5.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
