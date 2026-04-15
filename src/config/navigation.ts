import { routes } from "@/lib/routes";
import type { NavItem } from "@/types/navigation.types";

export const mainNavItems: NavItem[] = [
  { href: routes.home, label: "Inicio" },
  { href: routes.catalog, label: "Monturas" },
  { href: routes.help, label: "Ayuda" },
  { href: routes.cart, label: "Carrito" },
];
