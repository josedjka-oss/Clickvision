export type LensWizardStepId =
  | "montura"
  | "receta"
  | "graduacion"
  | "tipo-lente"
  | "tratamientos"
  | "resumen";

export type LensWizardStepMeta = {
  id: LensWizardStepId;
  path: string;
  title: string;
  description: string;
};

export const LENS_WIZARD_STEPS: LensWizardStepMeta[] = [
  {
    id: "montura",
    path: "montura",
    title: "Montura",
    description: "Confirmas el modelo que llevará tus lentes.",
  },
  {
    id: "receta",
    path: "receta",
    title: "Receta",
    description: "Indicas si ya tienes graduación o la gestionaremos después.",
  },
  {
    id: "graduacion",
    path: "graduacion",
    title: "Graduación",
    description: "Datos básicos de tu fórmula (se validarán con tu óptico más adelante).",
  },
  {
    id: "tipo-lente",
    path: "tipo-lente",
    title: "Tipo de lente",
    description: "Cómo quieres ver a distintas distancias.",
  },
  {
    id: "tratamientos",
    path: "tratamientos",
    title: "Tratamientos",
    description: "Opciones extra de confort y protección.",
  },
  {
    id: "resumen",
    path: "resumen",
    title: "Resumen",
    description: "Revisas todo y pasas al carrito.",
  },
];

export const getLensWizardStepIndex = (stepPath: string) => {
  return LENS_WIZARD_STEPS.findIndex((step) => step.path === stepPath);
};

export const getLensWizardStepMetaByPath = (stepPath: string) => {
  return LENS_WIZARD_STEPS.find((step) => step.path === stepPath) ?? null;
};
