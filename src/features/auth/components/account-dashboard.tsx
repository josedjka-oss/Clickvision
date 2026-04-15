"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/context/auth-context";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-error-messages";
import { Button, getButtonClasses } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export const AccountDashboard = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setError(null);
    setPending(true);

    try {
      await signOut();
      router.push(routes.home);
      router.refresh();
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setPending(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-ink">Tu sesión</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-muted">Correo</dt>
            <dd className="text-ink">{user.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted">Identificador</dt>
            <dd className="break-all font-mono text-xs text-ink">{user.uid}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Más adelante podrás enlazar pedidos, direcciones y preferencias a este usuario desde el
          backend o Firestore.
        </p>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={pending}
          onClick={handleSignOut}
        >
          {pending ? "Cerrando sesión…" : "Cerrar sesión"}
        </Button>
        <Link
          href={routes.catalog}
          className={getButtonClasses({
            variant: "ghost",
            size: "lg",
            className: "inline-flex w-full justify-center sm:w-auto",
          })}
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
};
