"use client";

import Link from "next/link";
import type { CartLine } from "@/features/cart/types/cart.types";
import { ProductImagePlaceholder } from "@/features/catalog/components/product-image-placeholder";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format-money";
import { routes } from "@/lib/routes";

type CartLineRowProps = {
  line: CartLine;
  onIncrement: (lineId: string) => void;
  onDecrement: (lineId: string) => void;
  onRemove: (lineId: string) => void;
};

export const CartLineRow = ({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartLineRowProps) => {
  const lineTotal = line.unitPrice * line.quantity;

  return (
    <li className="flex flex-col gap-4 border-b border-border py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4 sm:items-center">
        <Link
          href={routes.product(line.slug)}
          className="block w-24 shrink-0 overflow-hidden rounded-lg sm:w-28"
        >
          <ProductImagePlaceholder
            tone={line.imageTone}
            label={line.name}
            className="!aspect-square !rounded-lg max-h-24 sm:max-h-28"
          />
        </Link>
        <div className="min-w-0 space-y-1">
          <Link
            href={routes.product(line.slug)}
            className="block truncate text-base font-semibold text-ink hover:text-accent"
          >
            {line.name}
          </Link>
          <p className="text-sm text-muted">
            {formatMoney(line.unitPrice, line.currency)} c/u
          </p>
          <p className="text-sm font-medium text-ink sm:hidden">
            Subtotal: {formatMoney(lineTotal, line.currency)}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="min-h-9 px-2"
            disabled={line.quantity <= 1}
            aria-label={`Reducir cantidad de ${line.name}`}
            onClick={() => {
              onDecrement(line.id);
            }}
          >
            −
          </Button>
          <span className="min-w-8 text-center text-sm font-semibold tabular-nums text-ink">
            {line.quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="min-h-9 px-2"
            aria-label={`Aumentar cantidad de ${line.name}`}
            onClick={() => {
              onIncrement(line.id);
            }}
          >
            +
          </Button>
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-ink">
            {formatMoney(lineTotal, line.currency)}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            onRemove(line.id);
          }}
        >
          Quitar
        </Button>
      </div>
    </li>
  );
};
