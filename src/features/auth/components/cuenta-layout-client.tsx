"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/features/auth/context/auth-context";
import { sanitizeAuthRedirectTarget } from "@/features/auth/lib/sanitize-auth-redirect";
import { routes } from "@/lib/routes";

const isPublicCuentaPath = (pathname: string) => {
  return pathname === routes.login || pathname === routes.register;
};

type CuentaLayoutClientProps = {
  children: ReactNode;
};

export const CuentaLayoutClient = ({ children }: CuentaLayoutClientProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, initializing, firebaseConfigured } = useAuth();

  const isPublic = isPublicCuentaPath(pathname);

  useEffect(() => {
    if (isPublic) {
      return;
    }

    if (!firebaseConfigured) {
      return;
    }

    if (initializing) {
      return;
    }

    if (!user) {
      const next = pathname || routes.account;
      router.replace(`${routes.login}?next=${encodeURIComponent(next)}`);
    }
  }, [firebaseConfigured, initializing, isPublic, pathname, router, user]);

  useEffect(() => {
    if (!isPublic) {
      return;
    }

    if (!firebaseConfigured) {
      return;
    }

    if (initializing) {
      return;
    }

    if (user) {
      const params = new URLSearchParams(window.location.search);
      const target = sanitizeAuthRedirectTarget(params.get("next"));
      router.replace(target);
    }
  }, [firebaseConfigured, initializing, isPublic, router, user]);

  if (!isPublic && !firebaseConfigured) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-6 text-center shadow-soft">
        <p className="text-sm text-muted">
          La cuenta requiere Firebase. Configura las variables{" "}
          <span className="font-mono text-xs text-ink">NEXT_PUBLIC_FIREBASE_*</span> en{" "}
          <span className="font-mono text-xs">.env.local</span>.
        </p>
      </div>
    );
  }

  if (!isPublic && firebaseConfigured && initializing) {
    return (
      <div className="mx-auto max-w-lg animate-pulse rounded-2xl border border-border bg-surface-muted/40 p-10 shadow-soft">
        <p className="text-center text-sm text-muted">Cargando sesión…</p>
      </div>
    );
  }

  if (!isPublic && firebaseConfigured && !initializing && !user) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-6 text-center shadow-soft">
        <p className="text-sm text-muted">Redirigiendo al inicio de sesión…</p>
      </div>
    );
  }

  return <>{children}</>;
};
