export const CartPageHeader = () => {
  return (
    <header className="space-y-3 border-b border-border pb-8 sm:space-y-4 sm:pb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
        Carrito
      </p>
      <div className="max-w-2xl space-y-2">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Tu selección
        </h1>
        <p className="text-pretty text-sm leading-relaxed text-muted sm:text-base">
          Ajusta cantidades o elimina líneas. El carrito se guarda en este
          navegador (local) hasta conectar cuenta y backend.
        </p>
      </div>
    </header>
  );
};
