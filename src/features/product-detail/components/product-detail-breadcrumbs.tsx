import Link from "next/link";
import type { Product } from "@/features/catalog/types/product.types";
import { routes } from "@/lib/routes";

type ProductDetailBreadcrumbsProps = {
  product: Product;
};

export const ProductDetailBreadcrumbs = ({ product }: ProductDetailBreadcrumbsProps) => {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href={routes.home}
            className="font-medium text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Inicio
          </Link>
        </li>
        <li aria-hidden className="text-subtle">
          /
        </li>
        <li>
          <Link
            href={routes.catalog}
            className="font-medium text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Monturas
          </Link>
        </li>
        <li aria-hidden className="text-subtle">
          /
        </li>
        <li className="font-semibold text-ink">{product.name}</li>
      </ol>
    </nav>
  );
};
