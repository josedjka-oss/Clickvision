import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: `Regístrate en ${siteConfig.name}.`,
};

const RegisterPage = () => {
  return (
    <Container className="flex flex-1 flex-col gap-8 py-10 sm:gap-10 sm:py-12 lg:py-14">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted">
          <Link href={routes.home} className="text-accent underline-offset-4 hover:underline">
            ← Inicio
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Crear cuenta</h1>
        <p className="max-w-xl text-sm text-muted">
          Un solo correo y contraseña. Podrás ampliar tu perfil más adelante.
        </p>
      </div>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
