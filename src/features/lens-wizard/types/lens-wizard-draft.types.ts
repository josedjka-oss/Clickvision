import type {
  LensWizardEyeRx,
  LensWizardLensTypeId,
  LensWizardRecetaSource,
  LensWizardTreatmentId,
} from "@/features/lens-wizard/types/lens-wizard-snapshot.types";

export type LensWizardDraftRx = {
  od: LensWizardEyeRx;
  os: LensWizardEyeRx;
};

/** Estado editable del asistente (antes de cerrar en `LensWizardSnapshot`). */
export type LensWizardDraft = {
  recetaSource: LensWizardRecetaSource | null;
  rx: LensWizardDraftRx;
  lensTypeId: LensWizardLensTypeId | null;
  treatments: LensWizardTreatmentId[];
};
