import type { Product } from "@/features/catalog/types/product.types";

type ProductDescriptionSectionProps = {
  product: Product;
};

export const ProductDescriptionSection = ({
  product,
}: ProductDescriptionSectionProps) => {
  return (
    <section aria-labelledby="product-description-title" className="space-y-4">
      <div className="space-y-2">
        <h2
          id="product-description-title"
          className="text-lg font-semibold tracking-tight text-ink sm:text-xl"
        >
          Descripción
        </h2>
        <p className="max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {product.description}
        </p>
      </div>
    </section>
  );
};
