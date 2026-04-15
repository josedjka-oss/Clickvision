import type { Product } from "@/features/catalog/types/product.types";

type ProductHighlightsProps = {
  product: Product;
};

export const ProductHighlights = ({ product }: ProductHighlightsProps) => {
  if (product.highlights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-subtle">
        Detalles
      </h2>
      <ul className="space-y-2 text-sm leading-relaxed text-muted">
        {product.highlights.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
