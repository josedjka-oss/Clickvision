import type { FaqItem } from "@/features/help/types/faq.types";

export const mockFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "¿Cómo envío mi graduación?",
    answer:
      "En una fase posterior podrás subir una foto o PDF de tu receta y validaremos los datos antes de fabricar los lentes. Por ahora esta tienda es solo demostración.",
  },
  {
    id: "faq-2",
    question: "¿Puedo devolver las gafas?",
    answer:
      "Definiremos una política de devoluciones clara (montura sin uso, plazos y excepciones por lentes personalizados). Consulta de nuevo cuando activemos checkout real.",
  },
  {
    id: "faq-3",
    question: "¿Cuánto tarda el armado?",
    answer:
      "Los tiempos dependen del tipo de lente y laboratorio. Mostraremos un estimado en el checkout y notificaciones por correo cuando el pedido avance.",
  },
  {
    id: "faq-4",
    question: "¿Hacen envíos a todo México?",
    answer:
      "Planeamos cobertura nacional con paqueterías confiables y seguimiento. Indica tu CP en el checkout para ver opciones cuando esté disponible.",
  },
  {
    id: "faq-5",
    question: "¿Puedo probar las monturas virtualmente?",
    answer:
      "Estamos reservando espacio en el roadmap para un probador virtual. Aún no está activo en esta versión base del sitio.",
  },
];
