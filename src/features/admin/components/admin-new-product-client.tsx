"use client";

import { collection, doc } from "firebase/firestore";
import { useMemo } from "react";
import { ProductEditorForm } from "@/features/admin/components/product-editor-form";
import { getFirebaseFirestore } from "@/services/firebase/firestore";
import { firestoreCollections } from "@/types/firestore.collections";

export const AdminNewProductClient = () => {
  const documentId = useMemo(
    () => doc(collection(getFirebaseFirestore(), firestoreCollections.products)).id,
    [],
  );

  return <ProductEditorForm mode="create" documentId={documentId} />;
};
