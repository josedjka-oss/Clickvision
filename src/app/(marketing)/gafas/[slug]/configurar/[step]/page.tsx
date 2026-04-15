import { notFound } from "next/navigation";
import { LensWizardStepContent } from "@/features/lens-wizard/components/lens-wizard-step-content";
import { getLensWizardStepMetaByPath } from "@/features/lens-wizard/lib/lens-wizard-steps";

type LensWizardStepPageProps = {
  params: Promise<{ slug: string; step: string }>;
};

const LensWizardStepPage = async ({ params }: LensWizardStepPageProps) => {
  const { step } = await params;
  const meta = getLensWizardStepMetaByPath(step);

  if (!meta) {
    notFound();
  }

  return <LensWizardStepContent stepId={meta.id} />;
};

export default LensWizardStepPage;
