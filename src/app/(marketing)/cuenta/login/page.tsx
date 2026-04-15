import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: `Accede a tu cuenta — ${siteConfig.name}.`,
};

const LoginPage = () => {
  return (
    <Container className="flex flex-1 flex-col gap-8 py-10 sm:gap-10 sm:py-12 lg:py-14">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted">
          <Link href={routes.home} className="text-accent underline-offset-4 hover:underline">
            ← Inicio
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Iniciar sesión</h1>
        <p className="max-w-xl text-sm text-muted">
          Introduce el correo y la contraseña de tu cuenta {siteConfig.name}.
        </p>
      </div>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
