import type { LensWizardDraft } from "@/features/lens-wizard/types/lens-wizard-draft.types";
import type { LensWizardSnapshot } from "@/features/lens-wizard/types/lens-wizard-snapshot.types";

export const buildLensWizardSnapshot = (draft: LensWizardDraft): LensWizardSnapshot => {
  if (!draft.recetaSource || !draft.lensTypeId) {
    throw new Error("Borrador incompleto: faltan receta o tipo de lente.");
  }

  return {
    version: 1,
    completedAt: new Date().toISOString(),
    recetaSource: draft.recetaSource,
    rx: draft.rx,
    lensTypeId: draft.lensTypeId,
    treatments: draft.treatments,
  };
};
