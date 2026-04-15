"use client";

import { useLensWizard } from "@/features/lens-wizard/context/lens-wizard-context";
import { LENS_WIZARD_LENS_TYPE_OPTIONS } from "@/features/lens-wizard/lib/lens-wizard-copy";
import type { LensWizardLensTypeId } from "@/features/lens-wizard/types/lens-wizard-snapshot.types";
import { cn } from "@/lib/cn";

export const LensWizardPanelTipoLente = () => {
  const { draft, setLensType } = useLensWizard();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: LensWizardLensTypeId,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    setLensType(id);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        Elige la opción que mejor describe cómo usas las gafas. Si tienes dudas, tu óptico podrá
        ajustar la recomendación final.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {LENS_WIZARD_LENS_TYPE_OPTIONS.map((option) => {
          const selected = draft.lensTypeId === option.id;

          return (
            <div
              key={option.id}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              aria-label={`${option.title}. ${option.description}`}
              onClick={() => {
                setLensType(option.id);
              }}
              onKeyDown={(event) => {
                handleKeyDown(event, option.id);
              }}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:p-5",
                selected
                  ? "border-accent bg-accent/5 ring-2 ring-ring/15"
                  : "border-border bg-surface-muted/25 hover:border-muted",
              )}
            >
              <p className="text-base font-semibold text-ink">{option.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{option.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
