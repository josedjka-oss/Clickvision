"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/context/cart-context";
import { routes } from "@/lib/routes";

export const CartNavLink = () => {
  const { totalQuantity } = useCart();
  const label =
    totalQuantity > 0 ? `Carrito (${totalQuantity})` : "Carrito";

  return (
    <Link
      href={routes.cart}
      className="rounded-md px-2 py-1.5 text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-base"
    >
      {label}
    </Link>
  );
};
