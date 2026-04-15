import type { LensWizardDraft } from "@/features/lens-wizard/types/lens-wizard-draft.types";

export const canProceedFromReceta = (draft: LensWizardDraft) => {
  return draft.recetaSource !== null;
};

export const canProceedFromGraduacion = (draft: LensWizardDraft) => {
  if (draft.recetaSource === "pendiente") {
    return true;
  }

  if (draft.recetaSource === "tengo") {
    const odFilled =
      draft.rx.od.sphere.trim().length > 0 ||
      draft.rx.od.cylinder.trim().length > 0;
    const osFilled =
      draft.rx.os.sphere.trim().length > 0 ||
      draft.rx.os.cylinder.trim().length > 0;
    return odFilled || osFilled;
  }

  return false;
};

export const canProceedFromTipoLente = (draft: LensWizardDraft) => {
  return draft.lensTypeId !== null;
};
