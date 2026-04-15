import type { Metadata } from "next";
import { FaqAccordion } from "@/features/help/components/faq-accordion";
import { HelpPageHero } from "@/features/help/components/help-page-hero";
import { mockFaqItems } from "@/features/help/data/faq.mock";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Ayuda",
  description: `Preguntas frecuentes y guía rápida — ${siteConfig.name}.`,
};

const HelpPage = () => {
  return (
    <Container className="flex flex-1 flex-col gap-10 py-10 sm:gap-12 sm:py-12 lg:py-14">
      <HelpPageHero
        title="Preguntas frecuentes"
        description="Respuestas cortas mientras terminamos el flujo real de pedidos, envíos y
          recetas. Si necesitas algo urgente, el contacto directo se habilitará más
          adelante."
      />
      <FaqAccordion items={mockFaqItems} />
    </Container>
  );
};

export default HelpPage;
