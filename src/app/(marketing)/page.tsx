import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getButtonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Inicio",
  description: siteConfig.description,
};

const HomePage = () => {
  return (
    <Container className="flex flex-1 flex-col gap-12 py-12 sm:gap-16 sm:py-16 lg:py-20">
      <section className="space-y-6 sm:space-y-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
          Óptica en línea
        </p>
        <div className="space-y-4 sm:max-w-2xl sm:space-y-5">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Gafas con lentes formulados, con la claridad que mereces
          </h1>
          <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Monturas curadas, ficha técnica clara y un flujo de compra que iremos
            activando por fases. Explora el catálogo demo y revisa el carrito de
            ejemplo.
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Badge variant="accent" size="md">
            Demo con datos mock
          </Badge>
          <Link
            href={routes.catalog}
            className={getButtonClasses({ variant: "primary", size: "lg" })}
          >
            Ver monturas
          </Link>
          <Link
            href={routes.help}
            className={getButtonClasses({ variant: "ghost", size: "lg" })}
          >
            Ayuda
          </Link>
        </div>
      </section>

      <Card
        id="base-diseno"
        className="max-w-xl scroll-mt-28 border-dashed border-border/80 bg-surface/80 shadow-soft"
      >
        <CardHeader>
          <CardTitle>Próximos pasos</CardTitle>
          <CardDescription>
            Integración de recetas, checkout real y cuenta de usuario. Por ahora
            todo es estático y sirve para validar diseño, rutas y jerarquía visual.
          </CardDescription>
        </CardHeader>
      </Card>
    </Container>
  );
};

export default HomePage;
