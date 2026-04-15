import Link from "next/link";
import type { Product } from "@/features/catalog/types/product.types";
import { Badge } from "@/components/ui/badge";
import { getButtonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/lib/routes";

type ProductLensConfiguratorSlotProps = {
  product: Product;
};

export const ProductLensConfiguratorSlot = ({ product }: ProductLensConfiguratorSlotProps) => {
  return (
    <Card className="border-dashed border-border/90 shadow-soft">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>Lentes formulados</CardTitle>
          <Badge variant="outline" size="sm">
            Asistente guiado
          </Badge>
        </div>
        <CardDescription>
          Configura graduación, tipo de lente y tratamientos en pasos claros. El pago llegará en una
          fase posterior.
        </CardDescription>
        <div className="pt-1">
          <Link
            href={routes.lensWizardStep(product.slug, "montura")}
            className={getButtonClasses({
              variant: "secondary",
              size: "md",
              className: "inline-flex w-full justify-center sm:w-auto",
            })}
            aria-label="Abrir asistente de lentes formulados"
          >
            Configurar con graduación
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
};
