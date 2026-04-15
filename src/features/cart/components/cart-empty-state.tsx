import Link from "next/link";
import { getButtonClasses } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export const CartEmptyState = () => {
  return (
    <div className="flex flex-col items-start gap-6 rounded-2xl border border-dashed border-border bg-surface/80 px-6 py-12 sm:px-10">
      <div className="max-w-md space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Tu carrito está vacío
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          Explora el catálogo de monturas y vuelve cuando quieras armar tu par
          con lentes formulados.
        </p>
      </div>
      <Link
        href={routes.catalog}
        className={getButtonClasses({ variant: "primary", size: "lg" })}
      >
        Ver monturas
      </Link>
    </div>
  );
};
