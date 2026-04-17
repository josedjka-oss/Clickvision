/**
 * Convención de rutas en Storage (sin subidas aún).
 * Ej.: `prescriptions/{uid}/{fileId}.pdf`
 */
export const storagePathBuilders = {
  prescriptionUpload: (userId: string, fileId: string) =>
    `prescriptions/${userId}/${fileId}`,
  /** Imágenes de producto (admin local o portal `image-upload-site`). Reglas de Storage deben limitar escritura. */
  productImage: (productId: string, fileId: string) => `products/${productId}/images/${fileId}`,
} as const;
