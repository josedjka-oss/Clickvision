"use client";

import { useLensWizard } from "@/features/lens-wizard/context/lens-wizard-context";
import type { LensWizardRecetaSource } from "@/features/lens-wizard/types/lens-wizard-snapshot.types";
import { cn } from "@/lib/cn";

const OPTIONS: {
  value: LensWizardRecetaSource;
  title: string;
  body: string;
}[] = [
  {
    value: "tengo",
    title: "Ya tengo mi fórmula",
    body: "Introduciré los datos básicos ahora. Un óptico validará todo antes de fabricar.",
  },
  {
    value: "pendiente",
    title: "Aún no la tengo a mano",
    body: "Seguimos con la compra y te pediremos la receta más adelante (o en tienda).",
  },
];

export const LensWizardPanelReceta = () => {
  const { draft, setRecetaSource } = useLensWizard();

  const handleSelect = (value: LensWizardRecetaSource) => {
    setRecetaSource(value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    value: LensWizardRecetaSource,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    setRecetaSource(value);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        Así adaptamos el siguiente paso: si ya tienes graduación, la anotamos; si no, no te frenamos.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((option) => {
          const selected = draft.recetaSource === option.value;

          return (
            <div
              key={option.value}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              aria-label={`${option.title}. ${option.body}`}
              onClick={() => {
                handleSelect(option.value);
              }}
              onKeyDown={(event) => {
                handleKeyDown(event, option.value);
              }}
              className={cn(
                "cursor-pointer rounded-2xl border p-5 text-left shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                selected
                  ? "border-accent bg-accent/5 ring-2 ring-ring/15"
                  : "border-border bg-surface-muted/30 hover:border-muted",
              )}
            >
              <p className="text-base font-semibold text-ink">{option.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{option.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
