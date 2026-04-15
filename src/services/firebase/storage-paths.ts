/**
 * Convención de rutas en Storage (sin subidas aún).
 * Ej.: `prescriptions/{uid}/{fileId}.pdf`
 */
export const storagePathBuilders = {
  prescriptionUpload: (userId: string, fileId: string) =>
    `prescriptions/${userId}/${fileId}`,
  /** Imágenes de producto (panel admin). Reglas de Storage deben limitar quién puede escribir. */
  productImage: (productId: string, fileId: string) => `products/${productId}/images/${fileId}`,
} as const;
