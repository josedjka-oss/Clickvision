import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

const heroBannerSrc = "/hero-banner.png";

const primaryCtaClass = cn(
  "inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-3.5 text-base font-semibold tracking-tight",
  "bg-white text-primary shadow-soft transition-[background-color,color,transform] duration-200",
  "hover:bg-white/90 active:scale-[0.99]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
);

const secondaryCtaClass = cn(
  "inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-white px-6 py-3.5 text-base font-semibold tracking-tight text-white",
  "bg-transparent transition-[background-color,border-color,transform] duration-200",
  "hover:bg-white/10 active:scale-[0.99]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
);

export const HomeHero = () => {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-b border-white/10"
    >
      <div className="relative min-h-88 sm:min-h-104 lg:min-h-128">
        <Image
          src={heroBannerSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/65 via-black/45 to-black/30"
          aria-hidden
        />
        <Container className="relative z-10 flex min-h-88 max-w-full flex-col justify-center py-12 sm:min-h-104 sm:py-16 lg:min-h-128 lg:py-20">
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              Óptica en línea
            </p>
            <h1
              id="home-hero-heading"
              className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
            >
              Gafas con lentes formulados, con la claridad que mereces
            </h1>
            <p className="text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
              Monturas curadas, precios visibles y un flujo pensado para móvil. Explora el
              catálogo y configura lentes cuando estés listo.
            </p>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link href={routes.catalog} className={primaryCtaClass}>
                Ver monturas
              </Link>
              <Link href={routes.help} className={secondaryCtaClass}>
                Ayuda y envíos
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
