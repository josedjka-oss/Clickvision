import Link from "next/link";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

export const SiteAnnouncementBar = () => {
  return (
    <div className="border-b border-border/60 bg-accent-soft/80 text-center text-ink">
      <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-xs font-medium sm:text-sm">
        <span className="text-muted">Precios en MXN · Monturas curadas</span>
        <span className="hidden text-subtle sm:inline" aria-hidden>
          |
        </span>
        <Link
          href={routes.help}
          className="text-ink underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
        >
          Tiempos de entrega y ayuda
        </Link>
      </Container>
    </div>
  );
};
