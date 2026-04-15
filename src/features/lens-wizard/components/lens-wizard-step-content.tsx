"use client";

import type { LensWizardStepId } from "@/features/lens-wizard/lib/lens-wizard-steps";
import { LensWizardPanelMontura } from "@/features/lens-wizard/components/panels/lens-wizard-panel-montura";
import { LensWizardPanelReceta } from "@/features/lens-wizard/components/panels/lens-wizard-panel-receta";
import { LensWizardPanelGraduacion } from "@/features/lens-wizard/components/panels/lens-wizard-panel-graduacion";
import { LensWizardPanelTipoLente } from "@/features/lens-wizard/components/panels/lens-wizard-panel-tipo-lente";
import { LensWizardPanelTratamientos } from "@/features/lens-wizard/components/panels/lens-wizard-panel-tratamientos";
import { LensWizardPanelResumen } from "@/features/lens-wizard/components/panels/lens-wizard-panel-resumen";

type LensWizardStepContentProps = {
  stepId: LensWizardStepId;
};

export const LensWizardStepContent = ({ stepId }: LensWizardStepContentProps) => {
  if (stepId === "montura") {
    return <LensWizardPanelMontura />;
  }

  if (stepId === "receta") {
    return <LensWizardPanelReceta />;
  }

  if (stepId === "graduacion") {
    return <LensWizardPanelGraduacion />;
  }

  if (stepId === "tipo-lente") {
    return <LensWizardPanelTipoLente />;
  }

  if (stepId === "tratamientos") {
    return <LensWizardPanelTratamientos />;
  }

  if (stepId === "resumen") {
    return <LensWizardPanelResumen />;
  }

  return null;
};
