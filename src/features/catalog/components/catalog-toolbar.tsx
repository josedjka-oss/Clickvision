import type { CatalogSortKey } from "@/features/catalog/types/catalog-query.types";
import { Input } from "@/components/ui/input";

type CatalogToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  sort: CatalogSortKey;
  onSortChange: (value: CatalogSortKey) => void;
};

const sortOptions: { value: CatalogSortKey; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre (A–Z)" },
];

export const CatalogToolbar = ({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: CatalogToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1 space-y-2">
        <label
          className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle"
          htmlFor="catalog-search"
        >
          Buscar
        </label>
        <Input
          id="catalog-search"
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          placeholder="Nombre, material, silueta…"
          autoComplete="off"
          inputMode="search"
          aria-describedby="catalog-search-hint"
        />
        <p id="catalog-search-hint" className="text-xs text-subtle">
          La búsqueda se aplica con una pequeña pausa al escribir para mantener la
          interfaz fluida.
        </p>
      </div>

      <div className="w-full space-y-2 sm:w-64">
        <label
          className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle"
          htmlFor="catalog-sort"
        >
          Ordenar
        </label>
        <select
          id="catalog-sort"
          value={sort}
          onChange={(event) => {
            onSortChange(event.target.value as CatalogSortKey);
          }}
          className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm font-medium text-ink shadow-inner shadow-black/[0.03] focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
