"use client";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirebaseApp } from "@/lib/firebase-app";

const PRODUCTS = "products";
const ALLOWED = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

const storagePath = (productId: string, fileId: string) => `${PRODUCTS}/${productId}/images/${fileId}`;

export const uploadProductImage = async (productDocumentId: string, file: File): Promise<string> => {
  const rawExt = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() ?? "jpg" : "jpg";
  const ext = ALLOWED.has(rawExt) ? rawExt : "jpg";
  const fileId = `${crypto.randomUUID()}.${ext}`;
  const storageRef = ref(getStorage(getFirebaseApp()), storagePath(productDocumentId, fileId));
  await uploadBytes(storageRef, file, {
    contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
  });
  return getDownloadURL(storageRef);
};
