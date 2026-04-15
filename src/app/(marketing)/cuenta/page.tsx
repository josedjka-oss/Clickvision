import type { Metadata } from "next";
import { AccountDashboard } from "@/features/auth/components/account-dashboard";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mi cuenta",
  description: `Tu sesión y datos básicos — ${siteConfig.name}.`,
};

const AccountPage = () => {
  return (
    <Container className="flex flex-1 flex-col gap-8 py-10 sm:gap-10 sm:py-12 lg:py-14">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Mi cuenta</h1>
        <p className="max-w-xl text-sm text-muted">
          Gestiona tu sesión. Las funciones de perfil y pedidos se ampliarán cuando conectemos el
          backend.
        </p>
      </div>
      <AccountDashboard />
    </Container>
  );
};

export default AccountPage;
