"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLensWizard } from "@/features/lens-wizard/context/lens-wizard-context";
import { useCart } from "@/features/cart/context/cart-context";
import { buildLensWizardSnapshot } from "@/features/lens-wizard/lib/build-lens-wizard-snapshot";
import {
  getLensTypeCopy,
  getTreatmentCopy,
} from "@/features/lens-wizard/lib/lens-wizard-copy";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format-money";
import { routes } from "@/lib/routes";

const recetaLabel = (source: "tengo" | "pendiente") => {
  if (source === "tengo") {
    return "Tengo fórmula (datos capturados)";
  }

  return "Receta pendiente";
};

export const LensWizardPanelResumen = () => {
  const router = useRouter();
  const { product, draft, resetDraft } = useLensWizard();
  const { addConfiguredProduct } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const lensCopy = draft.lensTypeId ? getLensTypeCopy(draft.lensTypeId) : null;

  const handleAddToCart = () => {
    setError(null);

    try {
      const snapshot = buildLensWizardSnapshot(draft);
      setPending(true);
      addConfiguredProduct(product, snapshot);
      resetDraft();
      router.push(routes.cart);
    } catch {
      setError(
        "Faltan datos obligatorios (receta y tipo de lente). Revisa los pasos anteriores o usa la barra de progreso.",
      );
      setPending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-border bg-surface-muted/20 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Montura</h3>
          <p className="text-lg font-semibold text-ink">{product.name}</p>
          <p className="text-sm text-muted">{product.tagline}</p>
          <p className="text-base font-medium text-ink">
            Desde {formatMoney(product.priceFrom, product.currency)}
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-border bg-surface-muted/20 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Receta</h3>
          <p className="text-base text-ink">
            {draft.recetaSource ? recetaLabel(draft.recetaSource) : "Sin definir"}
          </p>
          {draft.recetaSource === "tengo" ? (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted">
              <dt className="font-medium text-ink">OD esfera</dt>
              <dd>{draft.rx.od.sphere || "—"}</dd>
              <dt className="font-medium text-ink">OS esfera</dt>
              <dd>{draft.rx.os.sphere || "—"}</dd>
            </dl>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-border bg-surface-muted/20 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Tipo de lente</h3>
          <p className="text-base font-medium text-ink">{lensCopy?.title ?? "Sin seleccionar"}</p>
          {lensCopy ? (
            <p className="text-sm text-muted">{lensCopy.description}</p>
          ) : (
            <p className="text-sm text-muted">Elige un tipo en el paso correspondiente.</p>
          )}
        </div>

        <div className="space-y-2 rounded-xl border border-border bg-surface-muted/20 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Tratamientos</h3>
          {draft.treatments.length === 0 ? (
            <p className="text-sm text-muted">Ninguno seleccionado.</p>
          ) : (
            <ul className="list-inside list-disc space-y-1 text-sm text-ink">
              {draft.treatments.map((id) => (
                <li key={id}>{getTreatmentCopy(id)?.title ?? id}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          El pago y la validación clínica llegarán en fases posteriores. Ahora solo guardamos la
          configuración en tu carrito.
        </p>
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto sm:min-w-[240px]"
          disabled={pending}
          onClick={handleAddToCart}
        >
          {pending ? "Añadiendo…" : "Añadir al carrito"}
        </Button>
      </div>
    </div>
  );
};
