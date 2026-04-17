export type FirebasePublicConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const read = (key: keyof FirebasePublicConfig): string => {
  const map: Record<keyof FirebasePublicConfig, string> = {
    apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
    authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
  };
  return process.env[map[key]]?.trim() ?? "";
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(read("apiKey") && read("projectId"));
};

export const getFirebasePublicConfig = (): FirebasePublicConfig => {
  const config: FirebasePublicConfig = {
    apiKey: read("apiKey"),
    authDomain: read("authDomain"),
    projectId: read("projectId"),
    storageBucket: read("storageBucket"),
    messagingSenderId: read("messagingSenderId"),
    appId: read("appId"),
  };
  const missing = (Object.keys(config) as (keyof FirebasePublicConfig)[]).filter((k) => !config[k]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables NEXT_PUBLIC_FIREBASE_*: ${missing.join(", ")}`);
  }
  return config;
};
