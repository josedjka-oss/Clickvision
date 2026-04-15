import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format-money";

type CartSummaryProps = {
  subtotal: number;
  currency: "MXN";
};

export const CartSummary = ({ subtotal, currency }: CartSummaryProps) => {
  return (
    <Card className="h-fit shadow-soft lg:sticky lg:top-28">
      <CardHeader>
        <CardTitle>Resumen</CardTitle>
        <CardDescription>
          Subtotal según cantidades del carrito. Sin pago ni envío hasta la siguiente
          fase.
        </CardDescription>
      </CardHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold text-ink">
            {formatMoney(subtotal, currency)}
          </span>
        </div>
        <Button type="button" variant="primary" size="lg" className="w-full" disabled aria-disabled>
          Ir a pago
        </Button>
        <p className="text-center text-xs text-subtle">
          Envío e impuestos se calcularán en una fase posterior.
        </p>
      </div>
    </Card>
  );
};
