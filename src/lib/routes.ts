export const routes = {
  home: "/",
  catalog: "/gafas",
  product: (slug: string) => `/gafas/${slug}`,
  /** Asistente guiado: montura → receta → … → carrito */
  lensWizard: (slug: string) => `/gafas/${slug}/configurar`,
  lensWizardStep: (slug: string, step: string) => `/gafas/${slug}/configurar/${step}`,
  cart: "/carrito",
  help: "/ayuda",
  /** Área de cuenta (protegida salvo login/registro). */
  account: "/cuenta",
  login: "/cuenta/login",
  register: "/cuenta/registro",
  /** Panel administrativo (requiere sesión + correo en NEXT_PUBLIC_ADMIN_EMAILS). */
  admin: "/admin",
  adminProducts: "/admin/productos",
  adminProductNew: "/admin/productos/nuevo",
  adminProductEdit: (id: string) => `/admin/productos/${id}/editar`,
} as const;
