import { Container } from "@/components/ui/container";

const items = [
  { title: "Envío", detail: "Cotizado en checkout según tu zona." },
  { title: "Devoluciones", detail: "Ventana clara antes de fabricar lentes." },
  { title: "Pago seguro", detail: "Procesadores reconocidos (cuando activemos cobro)." },
] as const;

export const HomeTrustStrip = () => {
  return (
    <section aria-label="Garantías y políticas" className="border-y border-border/60 bg-surface-muted/50">
      <Container className="grid gap-6 py-8 sm:grid-cols-3 sm:gap-8 sm:py-10">
        {items.map((item) => (
          <div key={item.title} className="text-center sm:text-left">
            <p className="text-sm font-semibold tracking-tight text-ink">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
          </div>
        ))}
      </Container>
    </section>
  );
};
