import type { Metadata } from "next";
import Link from "next/link";
import { AdminProductsTable } from "@/features/admin/components/admin-products-table";
import { getButtonClasses } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Admin · Productos",
  description: `Gestión de catálogo — ${siteConfig.name}.`,
};

const AdminProductsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Productos</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Listado de la colección Firestore <span className="font-mono">products</span>. Crear y
            editar escribe en la misma estructura que consume el catálogo público.
          </p>
        </div>
        <Link
          href={routes.adminProductNew}
          className={getButtonClasses({
            variant: "primary",
            size: "md",
            className: "inline-flex items-center justify-center",
          })}
        >
          Nuevo producto
        </Link>
      </div>
      <AdminProductsTable />
    </div>
  );
};

export default AdminProductsPage;
