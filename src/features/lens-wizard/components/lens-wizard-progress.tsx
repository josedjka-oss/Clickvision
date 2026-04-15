"use client";

import Link from "next/link";
import {
  LENS_WIZARD_STEPS,
  getLensWizardStepIndex,
} from "@/features/lens-wizard/lib/lens-wizard-steps";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

type LensWizardProgressProps = {
  slug: string;
  activePath: string;
};

export const LensWizardProgress = ({ slug, activePath }: LensWizardProgressProps) => {
  const rawIndex = getLensWizardStepIndex(activePath);
  const activeIndex = rawIndex >= 0 ? rawIndex : 0;
  const activeMeta = LENS_WIZARD_STEPS[activeIndex] ?? LENS_WIZARD_STEPS[0];

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-muted">
        Paso {activeIndex + 1} de {LENS_WIZARD_STEPS.length}
      </p>
      <ol
        className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2"
        aria-label="Progreso del asistente de lentes"
      >
        {LENS_WIZARD_STEPS.map((step, index) => {
          const isDone = index < activeIndex;
          const isCurrent = index === activeIndex;
          const href = routes.lensWizardStep(slug, step.path);

          return (
            <li key={step.id} className="min-w-0 flex-1">
              <Link
                href={href}
                aria-label={`Paso ${index + 1}: ${step.title}. ${step.description}`}
                className={cn(
                  "flex flex-col gap-1 rounded-xl border px-3 py-3 text-left transition-colors sm:min-h-[4.5rem]",
                  isCurrent &&
                    "border-accent bg-accent/5 ring-2 ring-ring/20 ring-offset-2 ring-offset-surface",
                  isDone && !isCurrent && "border-border bg-surface-muted/40 hover:border-muted",
                  !isDone && !isCurrent && "border-dashed border-border/80 bg-surface-muted/20 hover:border-border",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {index + 1}. {step.title}
                </span>
                <span className="text-sm text-ink">{step.description}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="space-y-1 border-t border-border pt-4">
        <h2 id="lens-wizard-step-title" className="text-xl font-semibold tracking-tight text-ink">
          {activeMeta.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted">{activeMeta.description}</p>
      </div>
    </div>
  );
};
