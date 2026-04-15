import type { LensWizardDraft } from "@/features/lens-wizard/types/lens-wizard-draft.types";

const emptyEye = () => ({
  sphere: "",
  cylinder: "",
  axis: "",
  add: "",
});

export const createInitialLensWizardDraft = (): LensWizardDraft => {
  return {
    recetaSource: null,
    rx: { od: emptyEye(), os: emptyEye() },
    lensTypeId: null,
    treatments: [],
  };
};
