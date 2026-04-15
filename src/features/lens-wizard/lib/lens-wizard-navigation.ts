import type { LensWizardDraft } from "@/features/lens-wizard/types/lens-wizard-draft.types";
import {
  canProceedFromGraduacion,
  canProceedFromReceta,
  canProceedFromTipoLente,
} from "@/features/lens-wizard/lib/lens-wizard-validation";
import type { LensWizardStepId } from "@/features/lens-wizard/lib/lens-wizard-steps";

export const canProceedLensWizardStep = (
  stepId: LensWizardStepId,
  draft: LensWizardDraft,
) => {
  if (stepId === "montura") {
    return true;
  }

  if (stepId === "receta") {
    return canProceedFromReceta(draft);
  }

  if (stepId === "graduacion") {
    return canProceedFromGraduacion(draft);
  }

  if (stepId === "tipo-lente") {
    return canProceedFromTipoLente(draft);
  }

  if (stepId === "tratamientos" || stepId === "resumen") {
    return true;
  }

  return false;
};
