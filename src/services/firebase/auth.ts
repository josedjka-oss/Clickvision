"use client";

import { getAuth, type Auth } from "firebase/auth";
import { getFirebaseClientApp } from "@/services/firebase/client-app";

let cachedAuth: Auth | null = null;

/** Instancia de Firebase Auth (cliente). Usar vía `@/features/auth/services/auth.service`. */
export const getFirebaseAuth = (): Auth => {
  if (!cachedAuth) {
    cachedAuth = getAuth(getFirebaseClientApp());
  }
  return cachedAuth;
};
