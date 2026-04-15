type CatalogPageHeaderProps = {
  title: string;
  description: string;
  visibleCount: number;
  totalCount: number;
};

export const CatalogPageHeader = ({
  title,
  description,
  visibleCount,
  totalCount,
}: CatalogPageHeaderProps) => {
  const countLabel =
    visibleCount === totalCount
      ? `${totalCount} modelos`
      : `Mostrando ${visibleCount} de ${totalCount} modelos`;

  return (
    <header className="space-y-4 border-b border-border pb-10 sm:space-y-5 sm:pb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
        {countLabel}
      </p>
      <div className="max-w-2xl space-y-3 sm:space-y-4">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      </div>
    </header>
  );
};
