import type { ProductImageTone } from "@/features/catalog/types/product.types";
import type { CartLine } from "@/features/cart/types/cart.types";

export const CART_STORAGE_KEY = "clickvision.cart.v1";

const IMAGE_TONES: ProductImageTone[] = [
  "navy",
  "sand",
  "sage",
  "stone",
  "mist",
  "graphite",
];

const isCartLine = (row: unknown): row is CartLine => {
  if (!row || typeof row !== "object") {
    return false;
  }

  const r = row as Record<string, unknown>;

  return (
    typeof r.id === "string" &&
    typeof r.productId === "string" &&
    typeof r.slug === "string" &&
    typeof r.name === "string" &&
    typeof r.quantity === "number" &&
    Number.isInteger(r.quantity) &&
    r.quantity >= 1 &&
    typeof r.unitPrice === "number" &&
    Number.isFinite(r.unitPrice) &&
    r.unitPrice >= 0 &&
    r.currency === "MXN" &&
    typeof r.imageTone === "string" &&
    (IMAGE_TONES as string[]).includes(r.imageTone)
  );
};

export const readStoredCartLines = (): CartLine[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isCartLine);
  } catch {
    return [];
  }
};

export const writeStoredCartLines = (lines: CartLine[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
};
