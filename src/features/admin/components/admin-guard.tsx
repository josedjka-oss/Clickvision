"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/features/auth/context/auth-context";
import { isEmailAllowedAsAdmin } from "@/lib/env/admin-public";
import { routes } from "@/lib/routes";

type AdminGuardProps = {
  children: ReactNode;
};

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, initializing, firebaseConfigured } = useAuth();

  useEffect(() => {
    if (!firebaseConfigured || initializing) {
      return;
    }

    if (!user) {
      router.replace(`${routes.login}?next=${encodeURIComponent(pathname || routes.adminProducts)}`);
    }
  }, [firebaseConfigured, initializing, pathname, router, user]);

  if (!firebaseConfigured) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-border bg-surface p-6 text-center text-sm text-muted">
        Configura Firebase (<span className="font-mono text-xs">NEXT_PUBLIC_FIREBASE_*</span>) para
        usar el panel admin.
      </div>
    );
  }

  if (initializing) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-border bg-surface-muted/40 p-8 text-center text-sm text-muted">
        Comprobando sesión…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-border bg-surface p-6 text-center text-sm text-muted">
        Redirigiendo al inicio de sesión…
      </div>
    );
  }

  if (!isEmailAllowedAsAdmin(user.email)) {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">
          Tu cuenta no tiene acceso al panel. Añade tu correo a{" "}
          <span className="font-mono text-xs">NEXT_PUBLIC_ADMIN_EMAILS</span> en{" "}
          <span className="font-mono text-xs">.env.local</span> y reinicia el servidor de desarrollo.
        </p>
        <Link
          href={routes.home}
          className="inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};
