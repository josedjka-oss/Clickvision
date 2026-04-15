import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { CatalogDataError } from "@/features/catalog/errors/catalog-data-error";
import { mapFirestoreDocToProduct } from "@/features/catalog/lib/map-product-from-firestore";
import type { Product } from "@/features/catalog/types/product.types";
import { getServerFirestore } from "@/services/firebase/server-firestore";
import { firestoreCollections } from "@/types/firestore.collections";

const isPublicProductData = (data: Record<string, unknown>) => {
  return data.published !== false;
};

export const listPublishedProductsFromFirestore = async (): Promise<Product[]> => {
  try {
    const db = getServerFirestore();
    const colRef = collection(db, firestoreCollections.products);
    const snapshot = await getDocs(colRef);

    const products = snapshot.docs
      .map((docSnap) => {
        const data = docSnap.data() as Record<string, unknown>;
        if (!isPublicProductData(data)) {
          return null;
        }

        try {
          return mapFirestoreDocToProduct(docSnap.id, data);
        } catch {
          return null;
        }
      })
      .filter((item): item is Product => item !== null)
      .sort((a, b) => b.catalogScore - a.catalogScore || a.name.localeCompare(b.name, "es"));

    return products;
  } catch (error) {
    throw new CatalogDataError(
      "FIRESTORE_LIST_FAILED",
      "No se pudo listar productos en Firestore",
      error,
    );
  }
};

export const getPublishedProductBySlugFromFirestore = async (
  slug: string,
): Promise<Product | null> => {
  try {
    const db = getServerFirestore();
    const colRef = collection(db, firestoreCollections.products);
    const q = query(colRef, where("slug", "==", slug), limit(5));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as Record<string, unknown>;
      if (!isPublicProductData(data)) {
        continue;
      }

      try {
        return mapFirestoreDocToProduct(docSnap.id, data);
      } catch {
        continue;
      }
    }

    return null;
  } catch (error) {
    throw new CatalogDataError(
      "FIRESTORE_GET_BY_SLUG_FAILED",
      `No se pudo obtener el producto con slug "${slug}"`,
      error,
    );
  }
};
