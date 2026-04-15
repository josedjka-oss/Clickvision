import type { Product } from "@/features/catalog/types/product.types";
import { getShapeLabel } from "@/features/catalog/lib/catalog-query";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProductMaterialsSectionProps = {
  product: Product;
};

export const ProductMaterialsSection = ({ product }: ProductMaterialsSectionProps) => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Materiales y silueta</CardTitle>
        <CardDescription>
          Datos objetivos para comparar con otras monturas y anticipar el peso en
          nariz y patillas.
        </CardDescription>
      </CardHeader>
      <div className="space-y-3 text-sm leading-relaxed text-muted">
        <p>
          <span className="font-semibold text-ink">Material frontal:</span>{" "}
          {product.frameMaterial}
        </p>
        <p>
          <span className="font-semibold text-ink">Silueta:</span>{" "}
          {getShapeLabel(product.shapeKey)} — ideal como referencia previa a una
          prueba física o asesoría.
        </p>
      </div>
    </Card>
  );
};
