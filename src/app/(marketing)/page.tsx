import type { Metadata } from "next";
import { HomeCategoryTiles } from "@/features/marketing/components/home-category-tiles";
import { HomeHero } from "@/features/marketing/components/home-hero";
import { HomeProductRail } from "@/features/marketing/components/home-product-rail";
import { HomeTrustStrip } from "@/features/marketing/components/home-trust-strip";
import { HomeValueProps } from "@/features/marketing/components/home-value-props";
import { pickHomeDestacados, pickHomeNovedades } from "@/features/marketing/lib/home-products";
import { listPublishedProducts } from "@/features/catalog/services/catalog-products.service";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Inicio",
  description: siteConfig.description,
};

const HomePage = async () => {
  const products = await listPublishedProducts();
  const novedades = pickHomeNovedades(products);
  const destacados = pickHomeDestacados(products);

  return (
    <div className="flex flex-1 flex-col gap-14 pb-16 pt-0 sm:gap-16 sm:pb-20 lg:gap-20 lg:pb-24">
      <HomeHero />
      <HomeTrustStrip />
      <HomeCategoryTiles />
      <HomeValueProps />
      <HomeProductRail
        id="home-novedades"
        title="Novedades"
        description="Monturas recién incorporadas o destacadas en campaña."
        products={novedades}
        prioritizeFirstImage
      />
      <HomeProductRail
        id="home-destacados"
        title="Selección destacada"
        description="Ordenadas por relevancia en catálogo (puntuación interna)."
        products={destacados}
      />
    </div>
  );
};

export default HomePage;
