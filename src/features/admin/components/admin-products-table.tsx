"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listAdminProducts } from "@/features/admin/services/admin-products.service";
import { formatAdminError } from "@/features/admin/lib/format-admin-error";
import type { AdminProductListItem } from "@/features/admin/types/admin-product-list-item.types";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export const AdminProductsTable = () => {
  const [rows, setRows] = useState<AdminProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAdminProducts();
      setRows(data);
    } catch (err) {
      setError(formatAdminError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <p className="text-sm text-muted">Cargando productos…</p>;
  }

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={() => void load()}>
          Reintentar
        </Button>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted">
        No hay documentos en la colección <span className="font-mono">products</span>. Crea el
        primero.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">Listado de productos en Firestore</caption>
        <thead>
          <tr className="border-b border-border bg-surface-muted/50">
            <th scope="col" className="p-3 font-medium">
              Nombre
            </th>
            <th scope="col" className="p-3 font-medium">
              Slug
            </th>
            <th scope="col" className="p-3 font-medium">
              Publicado
            </th>
            <th scope="col" className="p-3 font-medium">
              Score
            </th>
            <th scope="col" className="p-3 font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-b-0">
              <td className="p-3">{row.name}</td>
              <td className="p-3 font-mono text-xs text-muted">{row.slug}</td>
              <td className="p-3">{row.published ? "Sí" : "No"}</td>
              <td className="p-3 tabular-nums">{row.catalogScore}</td>
              <td className="p-3">
                <Link
                  href={routes.adminProductEdit(row.id)}
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
