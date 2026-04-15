import type { Product } from "@/features/catalog/types/product.types";
import type { LensSelectionDraft } from "@/features/lens-prescription/types/lens-selection.types";
import type { CartLine } from "@/features/cart/types/cart.types";

export const mapProductToCartLine = (product: Product): CartLine => {
  return {
    id: `line-${product.id}`,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    quantity: 1,
    unitPrice: product.priceFrom,
    currency: product.currency,
    imageTone: product.imageTone,
  };
};

export const mapProductToConfiguredCartLine = (
  product: Product,
  lensDraft: LensSelectionDraft,
): CartLine => {
  return {
    ...mapProductToCartLine(product),
    lensDraft,
  };
};
