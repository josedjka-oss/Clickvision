import { cn } from "@/lib/cn";

type CatalogFilterChipProps = {
  label: string;
  count?: number;
  selected: boolean;
  onToggle: () => void;
};

export const CatalogFilterChip = ({
  label,
  count,
  selected,
  onToggle,
}: CatalogFilterChipProps) => {
  const ariaLabelParts = [
    label,
    typeof count === "number" ? `${count} modelos` : null,
    selected ? "filtro activo" : "filtro inactivo",
  ].filter(Boolean);

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabelParts.join(", ")}
      onClick={onToggle}
      className={cn(
        "inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full border px-3.5 py-2 text-sm font-medium tracking-tight transition-colors",
        selected
          ? "border-accent bg-accent-soft text-accent"
          : "border-border bg-surface text-muted hover:border-border hover:bg-surface-muted hover:text-ink",
      )}
    >
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className="tabular-nums text-subtle">{count}</span>
      ) : null}
    </button>
  );
};
