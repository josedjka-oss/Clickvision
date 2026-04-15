import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getFirebasePublicConfig,
  isFirebasePublicConfigured,
} from "@/lib/env/firebase-public";

let serverApp: FirebaseApp | null = null;

/**
 * App Firebase para entornos sin `"use client"` (RSC, Route Handlers, `sitemap.ts`).
 * Usa las mismas variables NEXT_PUBLIC_* que el cliente; la seguridad depende de reglas.
 */
export const getFirebaseServerApp = (): FirebaseApp => {
  if (!isFirebasePublicConfigured()) {
    throw new Error(
      "Firebase no está configurado: define NEXT_PUBLIC_FIREBASE_* en .env.local.",
    );
  }

  if (!serverApp) {
    serverApp = getApps().length > 0 ? getApp() : initializeApp(getFirebasePublicConfig());
  }

  return serverApp;
};
