"use client";

/**
 * Punto de entrada del SDK Firebase (solo cliente).
 * Importar desde componentes o hooks con `"use client"` o desde código que solo
 * ejecute en el navegador.
 */
export { getFirebaseClientApp } from "@/services/firebase/client-app";
export { getFirebaseAuth } from "@/services/firebase/auth";
export { getFirebaseFirestore } from "@/services/firebase/firestore";
export { getFirebaseStorage } from "@/services/firebase/storage";
