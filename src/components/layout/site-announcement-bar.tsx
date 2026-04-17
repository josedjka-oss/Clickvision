import { Container } from "@/components/ui/container";

export const SiteAnnouncementBar = () => {
  return (
    <div className="border-b border-border/60 bg-accent-soft/80 text-center text-ink">
      <Container className="px-4 py-2.5 text-xs font-medium text-muted sm:text-sm">
        <p className="leading-relaxed">
          Envíos a todo Colombia · Pruébalas en casa · 5 días para cambios o devolución
        </p>
      </Container>
    </div>
  );
};
