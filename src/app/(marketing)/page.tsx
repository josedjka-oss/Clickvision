import type { Metadata } from "next";
import { HomeCategoryTiles } from "@/features/marketing/components/home-category-tiles";
import { HomeHero } from "@/features/marketing/components/home-hero";
import { HomeProductRail } from "@/features/marketing/components/home-product-rail";
import { HomeTrustStrip } from "@/features/marketing/components/home-trust-strip";
import { HomeValueProps } from "@/features/marketing/components/home-value-props";
import { pickHomeDestacados, pickHomeNovedades } from "@/features/marketing/lib/home-products";
import { listPublishedProducts } from "@/features/catalog/services/catalog-products.service";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Inicio",
  description: siteConfig.description,
};

const HomePage = async () => {
  const products = await listPublishedProducts();
  const novedades = pickHomeNovedades(products);
  const destacados = pickHomeDestacados(products);

  const novedadesDescription =
    "Aquí verás las monturas con foto en cuanto subas una imagen por producto: en Admin → Productos, edita cada ítem y pega la URL pública HTTPS (idealmente Firebase Storage). Mientras tanto se muestra el color de marca como vista previa.";

  return (
    <div className="flex flex-1 flex-col gap-14 pb-16 pt-0 sm:gap-16 sm:pb-20 lg:gap-20 lg:pb-24">
      <HomeHero />
      <HomeProductRail
        id="home-novedades"
        title="Novedades"
        description={novedadesDescription}
        products={novedades}
        prioritizeFirstImage
        titleClassName="font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-[2.25rem]"
        cta={{ href: routes.catalog, label: "Compra las novedades" }}
      />
      <HomeTrustStrip />
      <HomeCategoryTiles />
      <HomeValueProps />
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
