"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { isFirebasePublicConfigured } from "@/lib/env/firebase-public";
import { getFirebaseAuth } from "@/services/firebase/auth";

const ensureAuth = () => {
  if (!isFirebasePublicConfigured()) {
    throw new Error("AUTH_UNAVAILABLE");
  }
  return getFirebaseAuth();
};

export const signUpWithEmailPassword = async (email: string, password: string) => {
  const auth = ensureAuth();
  return createUserWithEmailAndPassword(auth, email.trim(), password);
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  const auth = ensureAuth();
  return signInWithEmailAndPassword(auth, email.trim(), password);
};

export const signOutSession = async () => {
  const auth = ensureAuth();
  await signOut(auth);
};
