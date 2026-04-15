import type { ProductImageTone } from "@/features/catalog/types/product.types";
import type { LensSelectionDraft } from "@/features/lens-prescription/types/lens-selection.types";

export type CartLine = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number;
  currency: "MXN";
  imageTone: ProductImageTone;
  /** Configuración de lentes formulados (stub; se completará en fases posteriores). */
  lensDraft?: LensSelectionDraft;
};
