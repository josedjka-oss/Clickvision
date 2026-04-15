import type { MetadataRoute } from "next";
import { listPublishedProducts } from "@/features/catalog/services/catalog-products.service";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();
  const products = await listPublishedProducts();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}${routes.home}`, lastModified: now },
    { url: `${base}${routes.catalog}`, lastModified: now },
    { url: `${base}${routes.cart}`, lastModified: now },
    { url: `${base}${routes.help}`, lastModified: now },
  ];

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}${routes.product(product.slug)}`,
    lastModified: now,
  }));

  return [...staticEntries, ...productEntries];
};

export default sitemap;
