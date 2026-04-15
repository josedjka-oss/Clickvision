import type { Metadata } from "next";
import { CartPageHeader } from "@/features/cart/components/cart-page-header";
import { CartPageInteractive } from "@/features/cart/components/cart-page-interactive";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Carrito",
  description: `Revisa tu selección de monturas — ${siteConfig.name}.`,
};

const CartPage = () => {
  return (
    <Container className="flex flex-1 flex-col gap-10 py-10 sm:gap-12 sm:py-12 lg:py-14">
      <CartPageHeader />
      <CartPageInteractive />
    </Container>
  );
};

export default CartPage;
