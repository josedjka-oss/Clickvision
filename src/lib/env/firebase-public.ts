/**
 * Configuración pública de Firebase (expuesta al cliente vía NEXT_PUBLIC_*).
 * La seguridad real depende de reglas de Firestore / Storage y de App Check.
 */
export type FirebasePublicConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const ENV_KEYS: Record<keyof FirebasePublicConfig, string> = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
};

const readEnv = (key: keyof FirebasePublicConfig) => {
  return process.env[ENV_KEYS[key]]?.trim() ?? "";
};

export const isFirebasePublicConfigured = (): boolean => {
  return Boolean(readEnv("apiKey") && readEnv("projectId"));
};

export const getFirebasePublicConfig = (): FirebasePublicConfig => {
  const config: FirebasePublicConfig = {
    apiKey: readEnv("apiKey"),
    authDomain: readEnv("authDomain"),
    projectId: readEnv("projectId"),
    storageBucket: readEnv("storageBucket"),
    messagingSenderId: readEnv("messagingSenderId"),
    appId: readEnv("appId"),
  };

  const missing = (Object.keys(config) as (keyof FirebasePublicConfig)[]).filter(
    (key) => !config[key],
  );

  if (missing.length > 0) {
    throw new Error(
      `Firebase: faltan variables NEXT_PUBLIC_FIREBASE_* (${missing.join(", ")}). ` +
        "Copia .env.example a .env.local y completa los valores.",
    );
  }

  return config;
};
