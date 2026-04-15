import type { LensWizardSnapshot } from "@/features/lens-wizard/types/lens-wizard-snapshot.types";

/**
 * Pasos del configurador de lentes (arquitectura; UI parcial en PDP).
 * En fases futuras cada paso tendrá su propio formulario y validación.
 */
export type LensConfiguratorStepId =
  | "prescription"
  | "lens-type"
  | "treatments"
  | "review";

/**
 * Borrador ligero asociable a una línea de carrito.
 */
export type LensSelectionDraft = {
  currentStep: LensConfiguratorStepId;
  prescriptionPayload?: LensWizardSnapshot;
};
