/**
 * Lista de correos con acceso al panel admin (comparación en minúsculas).
 * Definir en .env.local: NEXT_PUBLIC_ADMIN_EMAILS=uno@correo.com,dos@correo.com
 *
 * La seguridad real depende de reglas de Firestore/Storage (y en producción de claims JWT).
 */
export const getAdminEmailAllowlist = (): string[] => {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.trim() ?? "";
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 0);
};

export const isEmailAllowedAsAdmin = (email: string | null | undefined): boolean => {
  if (!email) {
    return false;
  }

  const allowlist = getAdminEmailAllowlist();
  if (allowlist.length === 0) {
    return false;
  }

  return allowlist.includes(email.trim().toLowerCase());
};
