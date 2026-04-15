"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/features/catalog/types/product.types";
import { useCart } from "@/features/cart/context/cart-context";
import { Button, getButtonClasses } from "@/components/ui/button";
import { routes } from "@/lib/routes";

type ProductConversionCtaProps = {
  product: Product;
};

export const ProductConversionCta = ({ product }: ProductConversionCtaProps) => {
  const { addProduct } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    if (!showAdded) {
      return;
    }

    const id = window.setTimeout(() => {
      setShowAdded(false);
    }, 1800);

    return () => {
      window.clearTimeout(id);
    };
  }, [showAdded]);

  const handleAddToCart = () => {
    addProduct(product);
    setShowAdded(true);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto sm:min-w-[220px]"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </Button>
        <Link
          href={routes.lensWizardStep(product.slug, "montura")}
          className={getButtonClasses({
            variant: "secondary",
            size: "lg",
            className: "w-full justify-center sm:w-auto sm:min-w-[220px]",
          })}
        >
          Configurar lentes
        </Link>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
          disabled
          aria-disabled
          aria-describedby="tryon-hint"
        >
          Probador virtual
        </Button>
        <Link
          href={routes.catalog}
          className={getButtonClasses({ variant: "ghost", size: "lg", className: "w-full sm:w-auto" })}
        >
          Seguir comprando
        </Link>
      </div>
      <p id="tryon-hint" className="text-xs leading-relaxed text-subtle">
        El probador virtual se integrará en una fase posterior sin cambiar la
        estructura de esta ficha.
      </p>
      {showAdded ? (
        <p
          className="text-sm font-medium text-accent"
          role="status"
          aria-live="polite"
        >
          Añadido al carrito.{" "}
          <Link
            href={routes.cart}
            className="underline underline-offset-4 hover:text-accent-hover"
          >
            Ver carrito
          </Link>
        </p>
      ) : null}
    </div>
  );
};
