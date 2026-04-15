import type {
  LensWizardLensTypeId,
  LensWizardTreatmentId,
} from "@/features/lens-wizard/types/lens-wizard-snapshot.types";

export const LENS_WIZARD_LENS_TYPE_OPTIONS: {
  id: LensWizardLensTypeId;
  title: string;
  description: string;
}[] = [
  {
    id: "monofocal",
    title: "Monofocal",
    description: "Una sola distancia (lejos o cerca, según tu uso principal).",
  },
  {
    id: "progresivo",
    title: "Progresivo",
    description: "Lejos, intermedio y cerca en una sola lente, sin líneas visibles.",
  },
  {
    id: "lectura",
    title: "Solo lectura",
    description: "Pensado para ver de cerca con comodidad (lectura, pantalla cercano).",
  },
  {
    id: "office",
    title: "Office / pantalla",
    description: "Zona amplia de enfoque intermedio y cercano, ideal para oficina.",
  },
];

export const LENS_WIZARD_TREATMENT_OPTIONS: {
  id: LensWizardTreatmentId;
  title: string;
  description: string;
}[] = [
  {
    id: "ar",
    title: "Antirreflejo",
    description: "Menos brillos nocturnos y más contraste al mirar pantallas.",
  },
  {
    id: "photochromic",
    title: "Fotocromático",
    description: "Se oscurece al sol y aclara en interior.",
  },
  {
    id: "blueLight",
    title: "Filtro de luz azul",
    description: "Reduce el brillo azul de pantallas (confort visual).",
  },
];

export const getLensTypeCopy = (id: LensWizardLensTypeId) => {
  return LENS_WIZARD_LENS_TYPE_OPTIONS.find((item) => item.id === id) ?? null;
};

export const getTreatmentCopy = (id: LensWizardTreatmentId) => {
  return LENS_WIZARD_TREATMENT_OPTIONS.find((item) => item.id === id) ?? null;
};
