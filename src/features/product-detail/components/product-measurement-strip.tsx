import type { Product } from "@/features/catalog/types/product.types";

type ProductMeasurementStripProps = {
  product: Product;
};

const items = (product: Product) => [
  { label: "Ancho de lente", value: `${product.lensWidthMm} mm` },
  { label: "Puente", value: `${product.bridgeMm} mm` },
  { label: "Patilla", value: `${product.templeMm} mm` },
];

export const ProductMeasurementStrip = ({ product }: ProductMeasurementStripProps) => {
  return (
    <section aria-label="Medidas principales" className="rounded-2xl border border-border bg-surface p-4 shadow-soft sm:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
        Medidas clave
      </h2>
      <dl className="mt-3 grid gap-3 sm:grid-cols-3">
        {items(product).map((row) => (
          <div key={row.label} className="rounded-lg bg-surface-muted/60 px-3 py-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-subtle">
              {row.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
