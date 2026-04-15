"use client";

import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseClientApp } from "@/services/firebase/client-app";

let cachedDb: Firestore | null = null;

/**
 * Instancia de Firestore (cliente).
 * Las colecciones y consultas de negocio vivirán en servicios dedicados por dominio.
 */
export const getFirebaseFirestore = (): Firestore => {
  if (!cachedDb) {
    cachedDb = getFirestore(getFirebaseClientApp());
  }
  return cachedDb;
};
