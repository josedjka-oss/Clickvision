import { Container } from "@/components/ui/container";

const props = [
  {
    title: "Lentes formulados",
    body: "Flujo guiado desde la montura hasta las opciones de lente, pensado para no perderte.",
  },
  {
    title: "Ficha clara",
    body: "Medidas en milímetros, materiales y badges de campaña visibles desde el listado.",
  },
  {
    title: "Móvil primero",
    body: "Navegación táctil, carrusel deslizable y tipografía legible en pantallas pequeñas.",
  },
] as const;

export const HomeValueProps = () => {
  return (
    <section aria-labelledby="home-valor-heading" className="scroll-mt-24">
      <Container className="space-y-8 sm:space-y-10">
        <h2
          id="home-valor-heading"
          className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          Por qué Clickvision
        </h2>
        <ul className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {props.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-dashed border-border/90 bg-surface/90 px-5 py-6 sm:px-6 sm:py-7"
            >
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
