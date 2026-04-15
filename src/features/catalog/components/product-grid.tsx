import type { Product } from "@/features/catalog/types/product.types";
import { ProductCard } from "@/features/catalog/components/product-card";
import { cn } from "@/lib/cn";

type ProductGridProps = {
  products: Product[];
  className?: string;
};

export const ProductGrid = ({ products, className }: ProductGridProps) => {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10",
        className,
      )}
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
