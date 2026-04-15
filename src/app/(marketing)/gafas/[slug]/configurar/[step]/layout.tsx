import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProductBySlugCached } from "@/features/catalog/services/catalog-product-read.cached";
import { LensWizardLayoutClient } from "@/features/lens-wizard/components/lens-wizard-layout-client";
import { getLensWizardStepMetaByPath } from "@/features/lens-wizard/lib/lens-wizard-steps";
import { siteConfig } from "@/config/site";

type LensWizardStepLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string; step: string }>;
};

export const generateMetadata = async ({
  params,
}: LensWizardStepLayoutProps): Promise<Metadata> => {
  const { slug, step } = await params;
  const stepMeta = getLensWizardStepMetaByPath(step);
  const product = await getPublishedProductBySlugCached(slug);
  const productLabel = product?.name ?? slug;

  return {
    title: stepMeta ? `${stepMeta.title} · ${productLabel}` : `Configurar · ${productLabel}`,
    description:
      stepMeta?.description ??
      `Configura lentes formulados para ${productLabel} — ${siteConfig.name}.`,
    robots: { index: false, follow: true },
  };
};

const LensWizardStepLayout = async ({ children, params }: LensWizardStepLayoutProps) => {
  const { slug, step } = await params;
  const product = await getPublishedProductBySlugCached(slug);

  if (!product) {
    notFound();
  }

  if (!getLensWizardStepMetaByPath(step)) {
    notFound();
  }

  return <LensWizardLayoutClient product={product}>{children}</LensWizardLayoutClient>;
};

export default LensWizardStepLayout;
