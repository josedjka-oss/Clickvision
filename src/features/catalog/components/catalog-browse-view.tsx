"use client";

import type { Product } from "@/features/catalog/types/product.types";
import { CatalogEmptyState } from "@/features/catalog/components/catalog-empty-state";
import { CatalogFiltersPanel } from "@/features/catalog/components/catalog-filters-panel";
import { CatalogPageHeader } from "@/features/catalog/components/catalog-page-header";
import { CatalogToolbar } from "@/features/catalog/components/catalog-toolbar";
import { useCatalogBrowse } from "@/features/catalog/hooks/use-catalog-browse";
import { ProductGrid } from "@/features/catalog/components/product-grid";

type CatalogBrowseViewProps = {
  products: Product[];
};

export const CatalogBrowseView = ({ products }: CatalogBrowseViewProps) => {
  const browse = useCatalogBrowse(products);

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <CatalogPageHeader
        title="Monturas seleccionadas"
        description="Explora con filtros claros y una búsqueda ligera. Los criterios viven en
          cliente hoy; la misma forma se podrá enviar a Firestore cuando conectemos
          catálogo real."
        visibleCount={browse.visibleProducts.length}
        totalCount={products.length}
      />

      <CatalogToolbar
        query={browse.query}
        onQueryChange={browse.setQuery}
        sort={browse.sort}
        onSortChange={browse.setSort}
      />

      <CatalogFiltersPanel
        facets={browse.facets}
        promoFacets={browse.promoFacets}
        selectedMaterials={browse.selectedMaterials}
        selectedShapes={browse.selectedShapes}
        selectedPromos={browse.selectedPromos}
        onToggleMaterial={browse.handleToggleMaterial}
        onToggleShape={browse.handleToggleShape}
        onTogglePromo={browse.handleTogglePromo}
        onReset={browse.reset}
        showReset={browse.showReset}
      />

      {browse.visibleProducts.length === 0 ? (
        <CatalogEmptyState onReset={browse.reset} />
      ) : (
        <ProductGrid products={browse.visibleProducts} />
      )}
    </div>
  );
};
