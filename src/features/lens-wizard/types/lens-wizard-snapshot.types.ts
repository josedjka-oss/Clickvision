/**
 * Resultado serializable del asistente (se guardará en carrito / futuro backend).
 */
export type LensWizardRecetaSource = "tengo" | "pendiente";

export type LensWizardEyeRx = {
  sphere: string;
  cylinder: string;
  axis: string;
  add: string;
};

export type LensWizardLensTypeId = "monofocal" | "progresivo" | "lectura" | "office";

export type LensWizardTreatmentId = "ar" | "photochromic" | "blueLight";

export type LensWizardSnapshot = {
  version: 1;
  completedAt: string;
  recetaSource: LensWizardRecetaSource;
  rx: {
    od: LensWizardEyeRx;
    os: LensWizardEyeRx;
  };
  lensTypeId: LensWizardLensTypeId;
  treatments: LensWizardTreatmentId[];
};
