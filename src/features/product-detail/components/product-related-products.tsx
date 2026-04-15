import type { Product } from "@/features/catalog/types/product.types";
import { ProductCard } from "@/features/catalog/components/product-card";

type ProductRelatedProductsProps = {
  products: Product[];
};

export const ProductRelatedProducts = ({ products }: ProductRelatedProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-products-title" className="space-y-6">
      <div className="space-y-2">
        <h2
          id="related-products-title"
          className="text-lg font-semibold tracking-tight text-ink sm:text-xl"
        >
          También te puede interesar
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Combinamos misma familia de materiales y siluetas afines para acelerar tu
          decisión.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-4">
        {products.map((item) => (
          <li key={item.id}>
            <ProductCard product={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};
