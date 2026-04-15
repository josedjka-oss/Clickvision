"use client";

/**
 * CRUD de productos desde el navegador (Firestore cliente).
 * En producción: reglas que solo permitan escritura a admins (p. ej. token custom o lista de UID),
 * y nunca confíes solo en NEXT_PUBLIC_ADMIN_EMAILS.
 */

import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { mapFirestoreDocToProduct } from "@/features/catalog/lib/map-product-from-firestore";
import type { Product } from "@/features/catalog/types/product.types";
import { AdminRequestError } from "@/features/admin/errors/admin-request-error";
import type { AdminProductListItem } from "@/features/admin/types/admin-product-list-item.types";
import { getFirebaseFirestore } from "@/services/firebase/firestore";
import { firestoreCollections } from "@/types/firestore.collections";

const productsCollection = () => collection(getFirebaseFirestore(), firestoreCollections.products);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const assertValidProductSlug = (slug: string) => {
  const trimmed = slug.trim();
  if (!trimmed || !SLUG_RE.test(trimmed)) {
    throw new AdminRequestError(
      "ADMIN_VALIDATION",
      "El slug solo puede usar minúsculas, números y guiones (ej. aria-negro-mate).",
    );
  }
};

export const listAdminProducts = async (): Promise<AdminProductListItem[]> => {
  try {
    const snapshot = await getDocs(productsCollection());
    return snapshot.docs
      .map((docSnap) => {
        const data = docSnap.data() as Record<string, unknown>;
        return {
          id: docSnap.id,
          slug: typeof data.slug === "string" ? data.slug : "—",
          name: typeof data.name === "string" ? data.name : "—",
          published: data.published !== false,
          catalogScore: typeof data.catalogScore === "number" ? data.catalogScore : 0,
        };
      })
      .sort((a, b) => b.catalogScore - a.catalogScore || a.name.localeCompare(b.name, "es"));
  } catch (error) {
    throw new AdminRequestError(
      "ADMIN_FIRESTORE",
      error instanceof Error ? error.message : "No se pudo listar productos",
    );
  }
};

export const isProductSlugTaken = async (slug: string, excludeDocumentId?: string): Promise<boolean> => {
  const trimmed = slug.trim();
  const q = query(productsCollection(), where("slug", "==", trimmed), limit(5));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return false;
  }

  if (!excludeDocumentId) {
    return true;
  }

  return snapshot.docs.some((docSnap) => docSnap.id !== excludeDocumentId);
};

export type AdminProductForEdit = {
  documentId: string;
  product: Product;
  published: boolean;
};

export const getAdminProductForEdit = async (
  documentId: string,
): Promise<AdminProductForEdit | null> => {
  try {
    const docRef = doc(getFirebaseFirestore(), firestoreCollections.products, documentId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as Record<string, unknown>;
    const product = mapFirestoreDocToProduct(snapshot.id, data);
    const published = data.published !== false;

    return { documentId: snapshot.id, product, published };
  } catch {
    return null;
  }
};

export type AdminProductWriteInput = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  priceFrom: number;
  currency: "MXN";
  frameMaterial: string;
  materialKey: Product["materialKey"];
  shapeKey: Product["shapeKey"];
  catalogScore: number;
  badges: Product["badges"];
  /** Precio tachado; `undefined` en actualización elimina el campo en Firestore. */
  compareAtPrice?: number;
  lensWidthMm: number;
  bridgeMm: number;
  templeMm: number;
  imageTone: Product["imageTone"];
  published: boolean;
  images: string[];
};

const toFirestorePayload = (input: AdminProductWriteInput, options: { mergeCompareAt: boolean }) => {
  const payload: Record<string, unknown> = {
    slug: input.slug.trim(),
    name: input.name.trim(),
    tagline: input.tagline.trim(),
    description: input.description.trim(),
    highlights: input.highlights,
    priceFrom: input.priceFrom,
    currency: input.currency,
    frameMaterial: input.frameMaterial.trim(),
    materialKey: input.materialKey,
    shapeKey: input.shapeKey,
    catalogScore: input.catalogScore,
    badges: input.badges,
    lensWidthMm: input.lensWidthMm,
    bridgeMm: input.bridgeMm,
    templeMm: input.templeMm,
    imageTone: input.imageTone,
    published: input.published,
    images: input.images,
    updatedAt: serverTimestamp(),
  };

  if (input.compareAtPrice !== undefined && Number.isFinite(input.compareAtPrice)) {
    payload.compareAtPrice = input.compareAtPrice;
  } else if (options.mergeCompareAt) {
    payload.compareAtPrice = deleteField();
  }

  return payload;
};

export const createAdminProduct = async (
  documentId: string,
  input: AdminProductWriteInput,
): Promise<void> => {
  assertValidProductSlug(input.slug);
  if (await isProductSlugTaken(input.slug)) {
    throw new AdminRequestError("ADMIN_SLUG_TAKEN", "Ya existe un producto con ese slug.");
  }

  try {
    const docRef = doc(getFirebaseFirestore(), firestoreCollections.products, documentId);
    await setDoc(docRef, {
      ...toFirestorePayload(input, { mergeCompareAt: false }),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof AdminRequestError) {
      throw error;
    }
    throw new AdminRequestError(
      "ADMIN_FIRESTORE",
      error instanceof Error ? error.message : "No se pudo crear el producto",
    );
  }
};

export const updateAdminProduct = async (
  documentId: string,
  input: AdminProductWriteInput,
): Promise<void> => {
  assertValidProductSlug(input.slug);
  if (await isProductSlugTaken(input.slug, documentId)) {
    throw new AdminRequestError("ADMIN_SLUG_TAKEN", "Ya existe otro producto con ese slug.");
  }

  try {
    const docRef = doc(getFirebaseFirestore(), firestoreCollections.products, documentId);
    await setDoc(docRef, toFirestorePayload(input, { mergeCompareAt: true }), { merge: true });
  } catch (error) {
    if (error instanceof AdminRequestError) {
      throw error;
    }
    throw new AdminRequestError(
      "ADMIN_FIRESTORE",
      error instanceof Error ? error.message : "No se pudo guardar el producto",
    );
  }
};
