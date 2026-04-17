import { SiteAnnouncementBar } from "@/components/layout/site-announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <a
        href="#contenido-principal"
        className="absolute left-4 top-0 z-50 -translate-y-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent shadow-soft transition-transform focus:translate-y-4 focus:outline-2 focus:outline-offset-2 focus:outline-on-accent"
      >
        Saltar al contenido
      </a>
      <SiteAnnouncementBar />
      <SiteHeader />
      <main
        id="contenido-principal"
        className="flex flex-1 flex-col"
        tabIndex={-1}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};

export default MarketingLayout;
