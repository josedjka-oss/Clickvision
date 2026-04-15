import type { Product } from "@/features/catalog/types/product.types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProductMeasurementsProps = {
  product: Product;
};

const rows = (product: Product) => [
  { label: "Ancho de lente", value: `${product.lensWidthMm} mm` },
  { label: "Puente", value: `${product.bridgeMm} mm` },
  { label: "Patilla", value: `${product.templeMm} mm` },
];

export const ProductMeasurements = ({ product }: ProductMeasurementsProps) => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Medidas</CardTitle>
        <CardDescription>Referencia para ajuste y lentes formulados.</CardDescription>
      </CardHeader>
      <dl className="grid gap-3 sm:grid-cols-3">
        {rows(product).map((row) => (
          <div
            key={row.label}
            className="rounded-lg border border-border bg-surface-muted/60 px-3 py-3"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-subtle">
              {row.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};
