import type { ProductBadgeId } from "@/features/catalog/types/product.types";
import { Badge } from "@/components/ui/badge";

const BADGE_META: Record<
  ProductBadgeId,
  { label: string; variant: "new" | "sale" | "bestseller" }
> = {
  new: { label: "Nuevo", variant: "new" },
  sale: { label: "Oferta", variant: "sale" },
  bestseller: { label: "Bestseller", variant: "bestseller" },
};

type ProductPromoBadgesProps = {
  badges: ProductBadgeId[];
};

export const ProductPromoBadges = ({ badges }: ProductPromoBadgesProps) => {
  if (badges.length === 0) {
    return null;
  }

  return (
    <>
      {badges.map((badge) => {
        const meta = BADGE_META[badge];
        return (
          <Badge key={badge} variant={meta.variant} size="sm">
            {meta.label}
          </Badge>
        );
      })}
    </>
  );
};
