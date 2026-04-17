import Link from "next/link";
import { getButtonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

export const HomeHero = () => {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="border-b border-border/60 bg-gradient-to-b from-surface to-canvas pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16"
    >
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl space-y-5 sm:space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
            Óptica en línea
          </p>
          <h1
            id="home-hero-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            Gafas con lentes formulados, con la claridad que mereces
          </h1>
          <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Monturas curadas, precios visibles y un flujo pensado para móvil. Explora el
            catálogo y configura lentes cuando estés listo.
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link href={routes.catalog} className={getButtonClasses({ variant: "primary", size: "lg" })}>
              Ver monturas
            </Link>
            <Link href={routes.help} className={getButtonClasses({ variant: "outline", size: "lg" })}>
              Ayuda y envíos
            </Link>
          </div>
        </div>
        <div className="relative hidden min-h-[14rem] flex-1 overflow-hidden rounded-2xl border border-border/70 bg-surface-muted/40 shadow-soft lg:block lg:min-h-[18rem] lg:max-w-md">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,var(--color-accent-soft),transparent_55%),radial-gradient(ellipse_at_80%_80%,var(--color-border),transparent_45%)]"
            aria-hidden
          />
          <p className="relative flex h-full items-end p-6 text-sm font-medium leading-relaxed text-muted">
            Catálogo demo con datos locales o Firestore cuando configures las variables de entorno.
          </p>
        </div>
      </Container>
    </section>
  );
};
