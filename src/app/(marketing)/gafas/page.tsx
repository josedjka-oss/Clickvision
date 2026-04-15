import type { Metadata } from "next";
import { CatalogBrowseView } from "@/features/catalog/components/catalog-browse-view";
import { listPublishedProducts } from "@/features/catalog/services/catalog-products.service";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Monturas",
  description: `Catálogo de monturas para lentes formulados — ${siteConfig.name}.`,
};

const CatalogPage = async () => {
  const products = await listPublishedProducts();

  return (
    <Container className="flex flex-1 flex-col py-10 sm:py-12 lg:py-14">
      <CatalogBrowseView products={products} />
    </Container>
  );
};

export default CatalogPage;
