"use client";

import { useLensWizard } from "@/features/lens-wizard/context/lens-wizard-context";
import { LENS_WIZARD_TREATMENT_OPTIONS } from "@/features/lens-wizard/lib/lens-wizard-copy";
import { cn } from "@/lib/cn";

export const LensWizardPanelTratamientos = () => {
  const { draft, toggleTreatment } = useLensWizard();

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        Opcional. Puedes dejar este paso vacío y añadir tratamientos más adelante si lo prefieres.
      </p>
      <ul className="space-y-3">
        {LENS_WIZARD_TREATMENT_OPTIONS.map((option) => {
          const checked = draft.treatments.includes(option.id);
          const inputId = `treatment-${option.id}`;

          return (
            <li key={option.id}>
              <label
                htmlFor={inputId}
                className={cn(
                  "flex cursor-pointer gap-4 rounded-2xl border p-4 transition-colors sm:p-5",
                  checked
                    ? "border-accent bg-accent/5 ring-2 ring-ring/15"
                    : "border-border bg-surface-muted/25 hover:border-muted",
                )}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    toggleTreatment(option.id);
                  }}
                  className="mt-1 size-4 shrink-0 rounded border-border text-accent focus:ring-ring/30"
                  aria-describedby={`${inputId}-hint`}
                />
                <span className="min-w-0 space-y-1">
                  <span className="block text-base font-semibold text-ink">{option.title}</span>
                  <span id={`${inputId}-hint`} className="block text-sm leading-relaxed text-muted">
                    {option.description}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
