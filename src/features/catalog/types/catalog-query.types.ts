import type { ProductBadgeId } from "@/features/catalog/types/product.types";

/** Orden del catálogo (misma forma que esperaríamos de una API). */
export type CatalogSortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

/**
 * Criterios de búsqueda/filtro en cliente.
 * Más adelante se pueden mapear 1:1 a consultas Firestore vía stub dedicado.
 */
export type CatalogBrowseCriteria = {
  query: string;
  sort: CatalogSortKey;
  materialKeys: string[];
  shapeKeys: string[];
  /** Productos que incluyan al menos uno de estos badges (OR). */
  promoBadges: ProductBadgeId[];
};

export type FacetOption<T extends string = string> = {
  value: T;
  label: string;
  count: number;
};

export type CatalogFacetSnapshot = {
  materials: FacetOption[];
  shapes: FacetOption[];
};
