import Image from "next/image";
import Link from "next/link";
import { AccountNavLink } from "@/components/layout/account-nav-link";
import { CartNavLink } from "@/components/layout/cart-nav-link";
import { Container } from "@/components/ui/container";
import { mainNavItems } from "@/config/navigation";
import { routes } from "@/lib/routes";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/95 backdrop-blur-md supports-backdrop-filter:bg-surface/90">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/"
          aria-label="Ir al inicio de ClickVision"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Image
            src="/logo.svg"
            alt="ClickVision"
            width={360}
            height={96}
            className="h-10.5 w-auto md:h-13.5"
            priority
            sizes="(max-width: 768px) 240px, 300px"
          />
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                {item.href === routes.cart ? (
                  <CartNavLink />
                ) : (
                  <Link
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted/60 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-base"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <AccountNavLink />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
