import type { Product } from "@/features/catalog/types/product.types";
import { ProductConversionCta } from "@/features/product-detail/components/product-conversion-cta";
import { ProductDescriptionSection } from "@/features/product-detail/components/product-description-section";
import { ProductDetailBreadcrumbs } from "@/features/product-detail/components/product-detail-breadcrumbs";
import { ProductGallery } from "@/features/product-detail/components/product-gallery";
import { ProductHeroSummary } from "@/features/product-detail/components/product-hero-summary";
import { ProductHighlights } from "@/features/product-detail/components/product-highlights";
import { ProductLensConfiguratorSlot } from "@/features/product-detail/components/product-lens-configurator-slot";
import { ProductMaterialsSection } from "@/features/product-detail/components/product-materials-section";
import { ProductMeasurementStrip } from "@/features/product-detail/components/product-measurement-strip";
import { ProductMeasurements } from "@/features/product-detail/components/product-measurements";
import { ProductRelatedProducts } from "@/features/product-detail/components/product-related-products";
import { Container } from "@/components/ui/container";

type ProductDetailViewProps = {
  product: Product;
  relatedProducts: Product[];
};

export const ProductDetailView = ({
  product,
  relatedProducts,
}: ProductDetailViewProps) => {
  return (
    <Container className="flex flex-1 flex-col gap-10 py-10 sm:gap-12 sm:py-12 lg:gap-14 lg:py-14">
      <ProductDetailBreadcrumbs product={product} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
        <ProductGallery key={product.id} product={product} />
        <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
          <ProductHeroSummary product={product} />
          <ProductMeasurementStrip product={product} />
          <ProductMaterialsSection product={product} />
          <ProductLensConfiguratorSlot product={product} />
          <ProductHighlights product={product} />
          <ProductConversionCta product={product} />
        </aside>
      </div>

      <div className="space-y-10 lg:space-y-12">
        <ProductDescriptionSection product={product} />
        <ProductMeasurements product={product} />
        <ProductRelatedProducts products={relatedProducts} />
      </div>
    </Container>
  );
};
