import type { Config } from "tailwindcss";

/**
 * Tailwind v4: la paleta y el tema viven en `src/app/globals.css` (`:root` + `@theme inline`).
 * Este archivo define rutas de contenido para el scanner y para el IDE.
 */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
} satisfies Config;

export default config;
