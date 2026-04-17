import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getButtonClasses } from "@/components/ui/button";
import { routes } from "@/lib/routes";

const tiles = [
  {
    title: "Monturas",
    description: "Catálogo con filtros por material, silueta y promos.",
    href: routes.catalog,
    cta: "Explorar catálogo",
  },
  {
    title: "Tu cuenta",
    description: "Pedidos, datos y acceso al panel si corresponde.",
    href: routes.account,
    cta: "Ir a cuenta",
  },
  {
    title: "Ayuda",
    description: "Medidas, envíos y cómo seguir el flujo de compra.",
    href: routes.help,
    cta: "Ver ayuda",
  },
] as const;

export const HomeCategoryTiles = () => {
  return (
    <section aria-labelledby="home-categorias-heading" className="scroll-mt-24">
      <Container className="space-y-6 sm:space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2
            id="home-categorias-heading"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Empieza por aquí
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            Tres accesos rápidos al catálogo, a tu área personal y al centro de ayuda.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {tiles.map((tile) => (
            <li key={tile.href}>
              <Link
                href={tile.href}
                className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-surface p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-soft sm:p-7"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{tile.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{tile.description}</p>
                </div>
                <span
                  className={getButtonClasses({
                    variant: "secondary",
                    size: "sm",
                    className: "mt-6 w-full justify-center no-underline sm:mt-8",
                  })}
                >
                  {tile.cta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
