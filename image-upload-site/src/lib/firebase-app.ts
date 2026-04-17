"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirebasePublicConfig, isFirebaseConfigured } from "@/lib/firebase-config";

let cached: FirebaseApp | null = null;

export const getFirebaseApp = (): FirebaseApp => {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase no configurado.");
  }
  if (cached) {
    return cached;
  }
  cached = getApps().length > 0 ? getApp() : initializeApp(getFirebasePublicConfig());
  return cached;
};
