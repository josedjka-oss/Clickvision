"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storagePathBuilders } from "@/services/firebase/storage-paths";
import { getFirebaseStorage } from "@/services/firebase/storage";
import { AdminRequestError } from "@/features/admin/errors/admin-request-error";

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

export const uploadProductImage = async (productDocumentId: string, file: File): Promise<string> => {
  try {
    const rawExt = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() ?? "jpg" : "jpg";
    const ext = ALLOWED_EXT.has(rawExt) ? rawExt : "jpg";
    const fileId = `${crypto.randomUUID()}.${ext}`;
    const path = storagePathBuilders.productImage(productDocumentId, fileId);
    const storageRef = ref(getFirebaseStorage(), path);
    await uploadBytes(storageRef, file, {
      contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
    });
    return getDownloadURL(storageRef);
  } catch (error) {
    throw new AdminRequestError(
      "ADMIN_STORAGE",
      error instanceof Error ? error.message : "No se pudo subir la imagen",
    );
  }
};
