"use client";

import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFirebaseClientApp } from "@/services/firebase/client-app";

let cachedStorage: FirebaseStorage | null = null;

/**
 * Instancia de Firebase Storage (cliente).
 * Subidas de recetas u otros archivos usarán referencias construidas aquí más adelante.
 */
export const getFirebaseStorage = (): FirebaseStorage => {
  if (!cachedStorage) {
    cachedStorage = getStorage(getFirebaseClientApp());
  }
  return cachedStorage;
};
