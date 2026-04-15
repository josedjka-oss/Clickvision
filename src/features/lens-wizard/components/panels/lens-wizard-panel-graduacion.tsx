"use client";

import { useLensWizard } from "@/features/lens-wizard/context/lens-wizard-context";
import type { LensWizardEyeRx } from "@/features/lens-wizard/types/lens-wizard-snapshot.types";

const RX_FIELDS: { key: keyof LensWizardEyeRx; label: string; placeholder: string }[] = [
  { key: "sphere", label: "Esfera (SPH)", placeholder: "ej. -2.00" },
  { key: "cylinder", label: "Cilindro (CYL)", placeholder: "ej. -0.75" },
  { key: "axis", label: "Eje (°)", placeholder: "ej. 90" },
  { key: "add", label: "Adición (ADD)", placeholder: "ej. +1.50" },
];

type EyeBlockProps = {
  title: string;
  eye: "od" | "os";
};

const EyeBlock = ({ title, eye }: EyeBlockProps) => {
  const { draft, setRxField } = useLensWizard();
  const values = draft.rx[eye];

  return (
    <fieldset className="space-y-4 rounded-xl border border-border bg-surface-muted/20 p-4 sm:p-5">
      <legend className="text-base font-semibold text-ink">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        {RX_FIELDS.map((field) => {
          const fieldId = `rx-${eye}-${field.key}`;

          return (
            <div key={field.key} className="space-y-1.5">
              <label htmlFor={fieldId} className="text-sm font-medium text-ink">
                {field.label}
              </label>
              <input
                id={fieldId}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(event) => {
                  setRxField(eye, field.key, event.target.value);
                }}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/25"
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export const LensWizardPanelGraduacion = () => {
  const { draft } = useLensWizard();

  if (!draft.recetaSource) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-muted/30 p-6 text-center">
        <p className="text-sm text-muted">
          Primero indica en el paso anterior si tienes fórmula. Usa &quot;Atrás&quot; o el paso
          &quot;Receta&quot; en la barra superior.
        </p>
      </div>
    );
  }

  if (draft.recetaSource === "pendiente") {
    return (
      <div className="space-y-4 rounded-xl border border-border bg-surface-muted/20 p-6">
        <p className="text-base font-medium text-ink">Sin datos por ahora</p>
        <p className="text-sm leading-relaxed text-muted">
          Guardaremos tu pedido como &quot;receta pendiente&quot;. Cuando la tengas, podrás enviarla
          por el canal que habilitemos o en tienda. Puedes seguir eligiendo tipo de lente y
          tratamientos con tranquilidad.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted">
        Los valores son orientativos para cotizar; un profesional validará la receta oficial antes del
        laboratorio.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        <EyeBlock title="Ojo derecho (OD)" eye="od" />
        <EyeBlock title="Ojo izquierdo (OS)" eye="os" />
      </div>
    </div>
  );
};
