"use client";

import { useLensWizard } from "@/features/lens-wizard/context/lens-wizard-context";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { formatMoney } from "@/lib/format-money";

export const LensWizardPanelMontura = () => {
  const { product } = useLensWizard();

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
      <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.04]">
        <ProductVisual
          tone={product.imageTone}
          label={product.name}
          imageUrl={product.imageUrls?.[0]}
          className="aspect-[4/3] rounded-2xl sm:aspect-[5/4]"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">Montura elegida</p>
        <h3 className="text-2xl font-semibold tracking-tight text-ink">{product.name}</h3>
        <p className="text-base leading-relaxed text-muted">{product.tagline}</p>
        <p className="text-lg font-semibold text-ink">
          Desde {formatMoney(product.priceFrom, product.currency)}
        </p>
        <p className="text-sm leading-relaxed text-muted">
          En los siguientes pasos añadiremos tu graduación, el tipo de lente y los tratamientos. Todo
          quedará guardado en esta sesión hasta que pases al carrito.
        </p>
      </div>
    </div>
  );
};
