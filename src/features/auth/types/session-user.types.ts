/**
 * Vista mínima del usuario autenticado para la UI (no exponer el objeto `User` de Firebase).
 */
export type SessionUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};
