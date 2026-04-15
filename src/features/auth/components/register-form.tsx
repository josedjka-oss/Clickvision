"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/features/auth/context/auth-context";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-error-messages";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export const RegisterForm = () => {
  const { signUp, firebaseConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signUp(email, password);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="mx-auto max-w-md space-y-6" onSubmit={handleSubmit} noValidate>
      {!firebaseConfigured ? (
        <p className="rounded-lg border border-border bg-surface-muted/50 px-4 py-3 text-sm text-muted">
          Configura Firebase en <span className="font-mono text-xs">.env.local</span> para poder
          registrarte.
        </p>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="register-email" className="text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          id="register-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/25"
          placeholder="tu@correo.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="register-password" className="text-sm font-medium text-ink">
          Contraseña
        </label>
        <input
          id="register-password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/25"
          placeholder="Mínimo 6 caracteres"
        />
        <p className="text-xs text-muted">Firebase exige al menos 6 caracteres.</p>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={submitting || !firebaseConfigured}
      >
        {submitting ? "Creando cuenta…" : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link
          href={routes.login}
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
};
