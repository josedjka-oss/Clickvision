"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { AdminUserMenu } from "@/features/admin/components/admin-user-menu";
import { routes } from "@/lib/routes";

type AdminShellProps = {
  children: ReactNode;
};

export const AdminShell = ({ children }: AdminShellProps) => {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-canvas text-ink">
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold tracking-tight">Clickvision · Admin</span>
              <nav className="flex flex-wrap gap-3 text-sm text-muted" aria-label="Admin">
                <Link className="hover:text-ink" href={routes.adminProducts}>
                  Productos
                </Link>
                <Link className="hover:text-ink" href={routes.catalog}>
                  Catálogo público
                </Link>
                <Link className="hover:text-ink" href={routes.home}>
                  Inicio
                </Link>
              </nav>
            </div>
            <AdminUserMenu />
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </div>
    </AdminGuard>
  );
};
