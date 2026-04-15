"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/auth-context";
import { routes } from "@/lib/routes";

const linkClass =
  "rounded-md px-2 py-1.5 text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-base";

export const AccountNavLink = () => {
  const { user, initializing } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || initializing) {
    return (
      <Link
        href={routes.account}
        className={linkClass}
        aria-label="Cuenta"
        aria-busy={initializing ? "true" : undefined}
      >
        Cuenta
      </Link>
    );
  }

  if (user) {
    return (
      <Link href={routes.account} className={linkClass} aria-label="Ir a mi cuenta">
        Cuenta
      </Link>
    );
  }

  return (
    <Link href={routes.login} className={linkClass} aria-label="Iniciar sesión">
      Entrar
    </Link>
  );
};
