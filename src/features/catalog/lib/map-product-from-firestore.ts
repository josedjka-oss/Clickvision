import { CatalogDataError } from "@/features/catalog/errors/catalog-data-error";
import type {
  FrameShapeKey,
  MaterialKey,
  Product,
  ProductBadgeId,
  ProductImageTone,
} from "@/features/catalog/types/product.types";

const IMAGE_TONES: ProductImageTone[] = [
  "navy",
  "sand",
  "sage",
  "stone",
  "mist",
  "graphite",
];

const MATERIAL_KEYS: MaterialKey[] = ["acetate", "titanium", "steel"];

const SHAPE_KEYS: FrameShapeKey[] = ["round", "rectangular", "geometric", "aviator"];

const BADGE_IDS: ProductBadgeId[] = ["new", "sale", "bestseller"];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const readString = (data: Record<string, unknown>, key: string): string | null => {
  const value = data[key];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
};

const readNumber = (data: Record<string, unknown>, key: string): number | null => {
  const value = data[key];
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const readStringArray = (data: Record<string, unknown>, key: string): string[] => {
  const value = data[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

const readBadges = (data: Record<string, unknown>): ProductBadgeId[] => {
  const value = data.badges;
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is ProductBadgeId =>
    typeof item === "string" ? (BADGE_IDS as string[]).includes(item) : false,
  );
};

const readEnum = <T extends string>(value: unknown, allowed: readonly T[]): T | null => {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : null;
};

export const mapFirestoreDocToProduct = (
  documentId: string,
  raw: unknown,
): Product => {
  if (!isRecord(raw)) {
    throw new CatalogDataError(
      "INVALID_PRODUCT_DOCUMENT",
      `Documento ${documentId}: datos inválidos`,
    );
  }

  const slug = readString(raw, "slug");
  const name = readString(raw, "name");
  const tagline = readString(raw, "tagline");
  const description = readString(raw, "description");
  const frameMaterial = readString(raw, "frameMaterial");
  const materialKey = readEnum(raw["materialKey"], MATERIAL_KEYS);
  const shapeKey = readEnum(raw["shapeKey"], SHAPE_KEYS);
  const imageTone = readEnum(raw["imageTone"], IMAGE_TONES);
  const priceFrom = readNumber(raw, "priceFrom");
  const catalogScore = readNumber(raw, "catalogScore");
  const lensWidthMm = readNumber(raw, "lensWidthMm");
  const bridgeMm = readNumber(raw, "bridgeMm");
  const templeMm = readNumber(raw, "templeMm");

  if (
    !slug ||
    !name ||
    !tagline ||
    !description ||
    !frameMaterial ||
    !materialKey ||
    !shapeKey ||
    !imageTone ||
    priceFrom === null ||
    catalogScore === null ||
    lensWidthMm === null ||
    bridgeMm === null ||
    templeMm === null
  ) {
    throw new CatalogDataError(
      "INVALID_PRODUCT_DOCUMENT",
      `Documento ${documentId}: faltan campos obligatorios o tipos incorrectos`,
    );
  }

  const currency = raw.currency === "MXN" ? "MXN" : null;
  if (!currency) {
    throw new CatalogDataError(
      "INVALID_PRODUCT_DOCUMENT",
      `Documento ${documentId}: currency debe ser MXN`,
    );
  }

  const highlights = readStringArray(raw, "highlights");
  const badges = readBadges(raw);
  const compareAtPrice = readNumber(raw, "compareAtPrice") ?? undefined;
  const imageUrlsRaw = readStringArray(raw, "images");
  const imageUrls =
    imageUrlsRaw.length > 0 ? imageUrlsRaw.filter((url) => url.startsWith("http")) : undefined;

  return {
    id: documentId,
    slug,
    name,
    tagline,
    description,
    highlights,
    priceFrom,
    currency,
    frameMaterial,
    materialKey,
    shapeKey,
    catalogScore,
    badges,
    compareAtPrice,
    lensWidthMm,
    bridgeMm,
    templeMm,
    imageTone,
    ...(imageUrls && imageUrls.length > 0 ? { imageUrls } : {}),
  };
};
