import { routes } from "@/lib/routes";

/**
 * Evita redirecciones abiertas: solo rutas internas relativas.
 */
export const sanitizeAuthRedirectTarget = (value: string | null | undefined): string => {
  if (!value || typeof value !== "string") {
    return routes.account;
  }

  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return routes.account;
  }

  if (trimmed.startsWith("/cuenta/login") || trimmed.startsWith("/cuenta/registro")) {
    return routes.account;
  }

  return trimmed;
};
