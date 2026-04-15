import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between sm:py-14">
        <div className="max-w-md space-y-2">
          <p className="text-sm font-semibold text-ink">{siteConfig.name}</p>
          <p className="text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
        </div>
        <p className="text-sm text-subtle sm:text-right">© {year} {siteConfig.name}</p>
      </Container>
    </footer>
  );
};
