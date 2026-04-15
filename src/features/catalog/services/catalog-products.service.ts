import { mockProducts } from "@/features/catalog/data/mock-products";
import { getRelatedProductsFromCatalog } from "@/features/catalog/lib/catalog-relations";
import {
  getPublishedProductBySlugFromFirestore,
  listPublishedProductsFromFirestore,
} from "@/features/catalog/services/products-firestore.repository";
import type { Product } from "@/features/catalog/types/product.types";
import { isFirebasePublicConfigured } from "@/lib/env/firebase-public";

const listFromMock = (): Product[] => [...mockProducts];

const getBySlugFromMock = (slug: string): Product | null => {
  return mockProducts.find((item) => item.slug === slug) ?? null;
};

/**
 * Lista productos publicados para catálogo PDP/SEO.
 * Usa Firestore si la configuración pública existe; si no, datos mock locales.
 * Si Firestore falla en runtime, se degrada a mock para no tumbar la vitrina.
 */
export const listPublishedProducts = async (): Promise<Product[]> => {
  if (!isFirebasePublicConfigured()) {
    return listFromMock();
  }

  try {
    return await listPublishedProductsFromFirestore();
  } catch (error) {
    console.error("[catalog] listPublishedProducts: fallback a mock", error);
    return listFromMock();
  }
};

export const getPublishedProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  if (!isFirebasePublicConfigured()) {
    return getBySlugFromMock(slug);
  }

  try {
    return await getPublishedProductBySlugFromFirestore(slug);
  } catch (error) {
    console.error("[catalog] getPublishedProductBySlug: fallback a mock", error);
    return getBySlugFromMock(slug);
  }
};

export const listPublishedProductSlugs = async (): Promise<string[]> => {
  const products = await listPublishedProducts();
  return products.map((item) => item.slug);
};

export const getRelatedProductsForProduct = async (
  product: Product,
  limit = 4,
): Promise<Product[]> => {
  const catalog = await listPublishedProducts();
  return getRelatedProductsFromCatalog(product, catalog, limit);
};
