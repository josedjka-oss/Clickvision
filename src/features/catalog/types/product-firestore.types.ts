import type { Product } from "@/features/catalog/types/product.types";

/**
 * Campos persistidos en Firestore (sin `id`: corresponde al id del documento).
 * `published === false` excluye el producto del catálogo público.
 */
export type ProductFirestoreFields = Omit<Product, "id"> & {
  published?: boolean;
};
