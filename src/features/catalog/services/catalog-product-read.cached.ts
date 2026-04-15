import { unstable_cache } from "next/cache";
import { getPublishedProductBySlug } from "@/features/catalog/services/catalog-products.service";

/**
 * Lectura de producto para RSC con caché breve (wizard, metadata).
 * Reduce lecturas repetidas al cambiar de paso o al duplicar fetch metadata + layout.
 */
export const getPublishedProductBySlugCached = unstable_cache(
  async (slug: string) => getPublishedProductBySlug(slug),
  ["published-product-by-slug"],
  { revalidate: 120 },
);
