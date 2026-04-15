import Link from "next/link";
import { getButtonClasses } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-8 px-4 py-20 text-center">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
          404
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Página no encontrada
        </h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
          La ruta que buscas no existe o fue movida.
        </p>
      </div>
      <Link
        href="/"
        className={getButtonClasses({ variant: "primary", size: "md" })}
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
