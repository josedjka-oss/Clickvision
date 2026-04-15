import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/features/product-detail/components/product-detail-view";
import {
  getPublishedProductBySlug,
  getRelatedProductsForProduct,
  listPublishedProductSlugs,
} from "@/features/catalog/services/catalog-products.service";
import { siteConfig } from "@/config/site";

export const dynamicParams = true;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const slugs = await listPublishedProductSlugs();
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    return { title: "Producto" };
  }

  return {
    title: product.name,
    description: `${product.tagline} — ${siteConfig.name}.`,
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProductsForProduct(product, 4);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
};

export default ProductPage;
