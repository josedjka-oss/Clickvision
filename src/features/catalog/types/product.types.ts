export type ProductImageTone = "navy" | "sand" | "sage" | "stone" | "mist" | "graphite";

export type ProductBadgeId = "new" | "sale" | "bestseller";

export type FrameShapeKey = "round" | "rectangular" | "geometric" | "aviator";

export type MaterialKey = "acetate" | "titanium" | "steel";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  priceFrom: number;
  currency: "MXN";
  /** Texto legible (etiquetas, SEO). */
  frameMaterial: string;
  /** Clave estable para filtros y futuras consultas indexadas. */
  materialKey: MaterialKey;
  /** Silueta para filtros visuales. */
  shapeKey: FrameShapeKey;
  /** Prioridad en orden “Destacados” (mayor = más arriba). */
  catalogScore: number;
  /** Badges comerciales (nuevo, oferta, bestseller). */
  badges: ProductBadgeId[];
  /** Precio tachado opcional cuando hay oferta. */
  compareAtPrice?: number;
  lensWidthMm: number;
  bridgeMm: number;
  templeMm: number;
  imageTone: ProductImageTone;
  /** URLs públicas (Storage u otro CDN); opcional hasta que el catálogo las consuma. */
  imageUrls?: string[];
};
