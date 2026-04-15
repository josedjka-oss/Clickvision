"use client";

import Link from "next/link";
import {
  LENS_WIZARD_STEPS,
  getLensWizardStepMetaByPath,
} from "@/features/lens-wizard/lib/lens-wizard-steps";
import { canProceedLensWizardStep } from "@/features/lens-wizard/lib/lens-wizard-navigation";
import { useLensWizard } from "@/features/lens-wizard/context/lens-wizard-context";
import { routes } from "@/lib/routes";
import { getButtonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type LensWizardStepFooterProps = {
  slug: string;
  activePath: string;
};

export const LensWizardStepFooter = ({ slug, activePath }: LensWizardStepFooterProps) => {
  const { draft } = useLensWizard();
  const meta = getLensWizardStepMetaByPath(activePath);

  if (!meta) {
    return null;
  }

  const stepIndex = LENS_WIZARD_STEPS.findIndex((step) => step.id === meta.id);
  const prevStep = stepIndex > 0 ? LENS_WIZARD_STEPS[stepIndex - 1] : null;
  const nextStep =
    stepIndex >= 0 && stepIndex < LENS_WIZARD_STEPS.length - 1
      ? LENS_WIZARD_STEPS[stepIndex + 1]
      : null;

  const canProceed = canProceedLensWizardStep(meta.id, draft);
  const isResumen = meta.id === "resumen";

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canProceed || !nextStep) {
      event.preventDefault();
    }
  };

  const handleNextKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    if (!canProceed || !nextStep) {
      event.preventDefault();
    }
  };

  return (
    <footer className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {prevStep ? (
          <Link
            href={routes.lensWizardStep(slug, prevStep.path)}
            className={getButtonClasses({
              variant: "ghost",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            Atrás
          </Link>
        ) : (
          <span className="block min-h-12 sm:min-h-0" aria-hidden />
        )}
      </div>

      <div className="flex flex-col gap-2 sm:items-end">
        {!isResumen && nextStep ? (
          <Link
            href={routes.lensWizardStep(slug, nextStep.path)}
            aria-disabled={!canProceed}
            tabIndex={canProceed ? 0 : -1}
            onClick={handleNextClick}
            onKeyDown={handleNextKeyDown}
            className={cn(
              getButtonClasses({
                variant: "primary",
                size: "lg",
                className: "w-full justify-center sm:min-w-[200px] sm:w-auto",
              }),
              !canProceed && "pointer-events-none opacity-50",
            )}
          >
            Continuar
          </Link>
        ) : null}
        {!isResumen && !canProceed ? (
          <p className="text-center text-xs text-muted sm:text-right" role="status">
            Completa los datos de este paso para continuar.
          </p>
        ) : null}
        {isResumen ? (
          <p className="text-center text-xs text-muted sm:text-right">
            Revisa el resumen y usa el botón principal para añadir al carrito.
          </p>
        ) : null}
      </div>
    </footer>
  );
};
