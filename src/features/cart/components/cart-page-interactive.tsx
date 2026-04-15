"use client";

import { useCart } from "@/features/cart/context/cart-context";
import { CartEmptyState } from "@/features/cart/components/cart-empty-state";
import { CartLineRow } from "@/features/cart/components/cart-line-row";
import { CartSummary } from "@/features/cart/components/cart-summary";

export const CartPageInteractive = () => {
  const {
    lines,
    subtotal,
    currency,
    incrementLine,
    decrementLine,
    removeLine,
  } = useCart();

  if (lines.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-12">
      <div className="rounded-2xl border border-border bg-surface px-4 py-2 sm:px-6 sm:py-4">
        <ul>
          {lines.map((line) => (
            <CartLineRow
              key={line.id}
              line={line}
              onIncrement={incrementLine}
              onDecrement={decrementLine}
              onRemove={removeLine}
            />
          ))}
        </ul>
      </div>
      <CartSummary subtotal={subtotal} currency={currency} />
    </div>
  );
};
