import type { Product } from "@/features/catalog/types/product.types";

export const pickHomeNovedades = (products: Product[]): Product[] => {
  const withNew = products.filter((p) => p.badges.includes("new"));
  if (withNew.length >= 3) {
    return withNew.slice(0, 10);
  }
  return [...products].slice(0, Math.min(10, products.length));
};

export const pickHomeDestacados = (products: Product[]): Product[] => {
  if (products.length === 0) {
    return [];
  }
  return [...products].sort((a, b) => b.catalogScore - a.catalogScore).slice(0, 10);
};
