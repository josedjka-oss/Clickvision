import type { CatalogFacetSnapshot } from "@/features/catalog/types/catalog-query.types";
import type { ProductBadgeId } from "@/features/catalog/types/product.types";
import { CatalogFilterChip } from "@/features/catalog/components/catalog-filter-chip";
import { Button } from "@/components/ui/button";

type PromoFacet = {
  id: ProductBadgeId;
  label: string;
  count: number;
};

type CatalogFiltersPanelProps = {
  facets: CatalogFacetSnapshot;
  promoFacets: PromoFacet[];
  selectedMaterials: string[];
  selectedShapes: string[];
  selectedPromos: ProductBadgeId[];
  onToggleMaterial: (key: string) => void;
  onToggleShape: (key: string) => void;
  onTogglePromo: (id: ProductBadgeId) => void;
  onReset: () => void;
  showReset: boolean;
};

export const CatalogFiltersPanel = ({
  facets,
  promoFacets,
  selectedMaterials,
  selectedShapes,
  selectedPromos,
  onToggleMaterial,
  onToggleShape,
  onTogglePromo,
  onReset,
  showReset,
}: CatalogFiltersPanelProps) => {
  return (
    <section
      aria-label="Filtros del catálogo"
      className="rounded-2xl border border-border bg-surface p-4 shadow-soft sm:p-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <FilterGroup title="Material">
            <div className="flex flex-wrap gap-2">
              {facets.materials.map((option) => (
                <CatalogFilterChip
                  key={option.value}
                  label={option.label}
                  count={option.count}
                  selected={selectedMaterials.includes(option.value)}
                  onToggle={() => {
                    onToggleMaterial(option.value);
                  }}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Forma">
            <div className="flex flex-wrap gap-2">
              {facets.shapes.map((option) => (
                <CatalogFilterChip
                  key={option.value}
                  label={option.label}
                  count={option.count}
                  selected={selectedShapes.includes(option.value)}
                  onToggle={() => {
                    onToggleShape(option.value);
                  }}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Etiquetas">
            <div className="flex flex-wrap gap-2">
              {promoFacets.map((promo) => (
                <CatalogFilterChip
                  key={promo.id}
                  label={promo.label}
                  count={promo.count}
                  selected={selectedPromos.includes(promo.id)}
                  onToggle={() => {
                    onTogglePromo(promo.id);
                  }}
                />
              ))}
            </div>
          </FilterGroup>
        </div>

        {showReset ? (
          <div className="shrink-0 lg:pl-6">
            <Button type="button" variant="outline" size="md" onClick={onReset}>
              Limpiar filtros
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

type FilterGroupProps = {
  title: string;
  children: React.ReactNode;
};

const FilterGroup = ({ title, children }: FilterGroupProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
        {title}
      </h2>
      {children}
    </div>
  );
};
