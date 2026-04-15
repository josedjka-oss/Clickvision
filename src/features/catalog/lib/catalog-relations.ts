import type { Product } from "@/features/catalog/types/product.types";

export const getRelatedProductsFromCatalog = (
  product: Product,
  catalog: Product[],
  limit = 4,
): Product[] => {
  const others = catalog.filter((item) => item.id !== product.id);
  const sameMaterial = others.filter(
    (item) => item.materialKey === product.materialKey,
  );
  const sameShape = others.filter(
    (item) =>
      item.shapeKey === product.shapeKey &&
      !sameMaterial.some((match) => match.id === item.id),
  );
  const rest = others.filter(
    (item) =>
      !sameMaterial.some((match) => match.id === item.id) &&
      !sameShape.some((match) => match.id === item.id),
  );

  return [...sameMaterial, ...sameShape, ...rest].slice(0, limit);
};
