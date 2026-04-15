"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getFirebasePublicConfig,
  isFirebasePublicConfigured,
} from "@/lib/env/firebase-public";

let cachedApp: FirebaseApp | null = null;

/**
 * Instancia única de la app Firebase en el cliente.
 * Solo debe importarse desde componentes/hooks cliente o acciones que ejecuten en el navegador.
 */
export const getFirebaseClientApp = (): FirebaseApp => {
  if (!isFirebasePublicConfigured()) {
    throw new Error(
      "Firebase no está configurado: define NEXT_PUBLIC_FIREBASE_* en .env.local.",
    );
  }

  if (cachedApp) {
    return cachedApp;
  }

  cachedApp = getApps().length > 0 ? getApp() : initializeApp(getFirebasePublicConfig());
  return cachedApp;
};
