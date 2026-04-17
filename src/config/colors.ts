/**
 * Referencia de marca (hex). La fuente de verdad para Tailwind es `src/app/globals.css` (`:root`).
 * Usar solo donde haga falta TypeScript (p. ej. canvas, SVG inline); en UI preferir clases `bg-*` / `text-*`.
 */
export const palette = {
  primary: "#1B2C4D",
  black: "#111111",
  background: "#FFFFFF",
  secondaryBg: "#F5F5F5",
  textSecondary: "#6B7280",
  success: "#16A34A",
  error: "#DC2626",
} as const;
