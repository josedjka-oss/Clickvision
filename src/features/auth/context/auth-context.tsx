"use client";

import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { mapFirebaseUserToSessionUser } from "@/features/auth/lib/map-firebase-user";
import {
  signInWithEmailPassword,
  signOutSession,
  signUpWithEmailPassword,
} from "@/features/auth/services/auth.service";
import type { SessionUser } from "@/features/auth/types/session-user.types";
import { isFirebasePublicConfigured } from "@/lib/env/firebase-public";
import { getFirebaseAuth } from "@/services/firebase/auth";

type AuthContextValue = {
  user: SessionUser | null;
  /** True hasta conocer el primer estado de sesión (o hasta saber que Firebase no está listo). */
  initializing: boolean;
  firebaseConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [initializing, setInitializing] = useState(true);
  const firebaseConfigured = isFirebasePublicConfigured();

  useEffect(() => {
    if (!firebaseConfigured) {
      setUser(null);
      setInitializing(false);
      return;
    }

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(mapFirebaseUserToSessionUser(firebaseUser));
      setInitializing(false);
    });

    return () => {
      unsubscribe();
    };
  }, [firebaseConfigured]);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailPassword(email, password);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    await signUpWithEmailPassword(email, password);
  }, []);

  const signOut = useCallback(async () => {
    await signOutSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      firebaseConfigured,
      signIn,
      signUp,
      signOut,
    }),
    [user, initializing, firebaseConfigured, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
};
