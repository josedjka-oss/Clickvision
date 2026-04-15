"use client";

import { useCallback, useMemo, useState } from "react";
import { applyCatalogBrowse, buildFacetSnapshot } from "@/features/catalog/lib/catalog-query";
import type { CatalogBrowseCriteria, CatalogSortKey } from "@/features/catalog/types/catalog-query.types";
import type { Product, ProductBadgeId } from "@/features/catalog/types/product.types";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

const PROMO_DEFS: { id: ProductBadgeId; label: string }[] = [
  { id: "new", label: "Nuevo" },
  { id: "sale", label: "Oferta" },
  { id: "bestseller", label: "Bestseller" },
];

export const useCatalogBrowse = (products: Product[]) => {
  const facets = useMemo(() => buildFacetSnapshot(products), [products]);

  const promoFacets = useMemo(() => {
    return PROMO_DEFS.map((def) => ({
      id: def.id,
      label: def.label,
      count: products.filter((product) => product.badges.includes(def.id)).length,
    })).filter((row) => row.count > 0);
  }, [products]);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 220);
  const [sort, setSort] = useState<CatalogSortKey>("featured");
  const [materialKeys, setMaterialKeys] = useState<string[]>([]);
  const [shapeKeys, setShapeKeys] = useState<string[]>([]);
  const [promoBadges, setPromoBadges] = useState<ProductBadgeId[]>([]);

  const criteria: CatalogBrowseCriteria = useMemo(
    () => ({
      query: debouncedQuery,
      sort,
      materialKeys,
      shapeKeys,
      promoBadges,
    }),
    [debouncedQuery, sort, materialKeys, shapeKeys, promoBadges],
  );

  const visibleProducts = useMemo(
    () => applyCatalogBrowse(products, criteria),
    [products, criteria],
  );

  const handleToggleMaterial = useCallback((key: string) => {
    setMaterialKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  }, []);

  const handleToggleShape = useCallback((key: string) => {
    setShapeKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  }, []);

  const handleTogglePromo = useCallback((id: ProductBadgeId) => {
    setPromoBadges((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const reset = useCallback(() => {
    setQuery("");
    setSort("featured");
    setMaterialKeys([]);
    setShapeKeys([]);
    setPromoBadges([]);
  }, []);

  const showReset =
    query.trim().length > 0 ||
    materialKeys.length > 0 ||
    shapeKeys.length > 0 ||
    promoBadges.length > 0 ||
    sort !== "featured";

  return {
    facets,
    promoFacets,
    query,
    setQuery,
    sort,
    setSort,
    selectedMaterials: materialKeys,
    selectedShapes: shapeKeys,
    selectedPromos: promoBadges,
    handleToggleMaterial,
    handleToggleShape,
    handleTogglePromo,
    visibleProducts,
    reset,
    showReset,
  };
};
