const defaultSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Clickvision",
  description:
    "Gafas con lentes formulados. Tienda en línea pensada para claridad, estilo y una experiencia móvil excelente.",
  /** URL canónica del sitio (producción: definir NEXT_PUBLIC_SITE_URL). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
} as const;
