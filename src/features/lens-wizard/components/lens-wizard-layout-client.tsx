"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { Product } from "@/features/catalog/types/product.types";
import { LensWizardProvider } from "@/features/lens-wizard/context/lens-wizard-context";
import { LensWizardProgress } from "@/features/lens-wizard/components/lens-wizard-progress";
import { LensWizardStepFooter } from "@/features/lens-wizard/components/lens-wizard-step-footer";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

type LensWizardLayoutClientProps = {
  product: Product;
  children: React.ReactNode;
};

export const LensWizardLayoutClient = ({ product, children }: LensWizardLayoutClientProps) => {
  const params = useParams<{ slug?: string; step?: string }>();
  const slug = typeof params.slug === "string" ? params.slug : product.slug;
  const stepParam = params.step;
  const activePath = typeof stepParam === "string" ? stepParam : "montura";

  return (
    <LensWizardProvider product={product}>
      <div className="border-b border-border bg-linear-to-b from-surface-muted/50 to-canvas">
        <Container className="py-8 sm:py-10 lg:py-12">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href={routes.product(slug)}
                className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                ← Volver a la ficha de la montura
              </Link>
              <p className="text-xs text-muted">Asistente guiado · sin pago en este paso</p>
            </div>

            <LensWizardProgress slug={slug} activePath={activePath} />

            <section
              className="rounded-2xl border border-border bg-surface p-5 shadow-soft sm:p-8"
              aria-labelledby="lens-wizard-step-title"
            >
              {children}
            </section>

            <LensWizardStepFooter slug={slug} activePath={activePath} />
          </div>
        </Container>
      </div>
    </LensWizardProvider>
  );
};
