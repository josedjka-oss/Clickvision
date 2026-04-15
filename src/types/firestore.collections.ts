/**
 * Nombres de colecciones previstos (contrato temprano; sin lecturas aún).
 * Centraliza strings para evitar typos cuando se conecte Firestore.
 */
export const firestoreCollections = {
  users: "users",
  products: "products",
  orders: "orders",
  prescriptions: "prescriptions",
} as const;

export type FirestoreCollectionKey = keyof typeof firestoreCollections;
