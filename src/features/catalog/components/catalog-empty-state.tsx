import { Button } from "@/components/ui/button";

type CatalogEmptyStateProps = {
  onReset: () => void;
};

export const CatalogEmptyState = ({ onReset }: CatalogEmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface/80 px-6 py-12 text-center sm:px-10">
      <div className="mx-auto max-w-md space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
          No hay resultados con estos filtros
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          Prueba quitando una etiqueta o amplía la búsqueda. Más adelante aquí
          podremos sugerir alternativas desde el servidor.
        </p>
      </div>
      <div className="mt-6">
        <Button type="button" variant="primary" size="md" onClick={onReset}>
          Restablecer catálogo
        </Button>
      </div>
    </div>
  );
};
