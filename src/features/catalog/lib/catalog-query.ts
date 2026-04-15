import type {
  CatalogBrowseCriteria,
  CatalogFacetSnapshot,
  CatalogSortKey,
  FacetOption,
} from "@/features/catalog/types/catalog-query.types";
import type {
  FrameShapeKey,
  MaterialKey,
  Product,
  ProductBadgeId,
} from "@/features/catalog/types/product.types";

const normalizeText = (value: string) => value.trim().toLowerCase();

const SHAPE_LABELS: Record<FrameShapeKey, string> = {
  round: "Redonda",
  rectangular: "Rectangular",
  geometric: "Geométrica",
  aviator: "Aviador",
};

export const getShapeLabel = (shape: FrameShapeKey) => SHAPE_LABELS[shape];

const MATERIAL_LABELS: Record<MaterialKey, string> = {
  acetate: "Acetato",
  titanium: "Titanio",
  steel: "Acero",
};

export const buildFacetSnapshot = (products: Product[]): CatalogFacetSnapshot => {
  const materialCounts = new Map<MaterialKey, number>();
  const shapeCounts = new Map<FrameShapeKey, number>();

  for (const product of products) {
    materialCounts.set(
      product.materialKey,
      (materialCounts.get(product.materialKey) ?? 0) + 1,
    );
    shapeCounts.set(product.shapeKey, (shapeCounts.get(product.shapeKey) ?? 0) + 1);
  }

  const materials: FacetOption<MaterialKey>[] = (
    Object.keys(MATERIAL_LABELS) as MaterialKey[]
  )
    .map((value) => ({
      value,
      label: MATERIAL_LABELS[value],
      count: materialCounts.get(value) ?? 0,
    }))
    .filter((option) => option.count > 0);

  const shapes: FacetOption<FrameShapeKey>[] = (
    Object.keys(SHAPE_LABELS) as FrameShapeKey[]
  )
    .map((value) => ({
      value,
      label: SHAPE_LABELS[value],
      count: shapeCounts.get(value) ?? 0,
    }))
    .filter((option) => option.count > 0);

  return { materials, shapes };
};

const matchesQuery = (product: Product, query: string) => {
  if (!query) {
    return true;
  }

  const q = normalizeText(query);
  const haystack = [
    product.name,
    product.tagline,
    product.description,
    product.frameMaterial,
    product.slug,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
};

const matchesMaterials = (product: Product, keys: string[]) => {
  if (keys.length === 0) {
    return true;
  }

  return keys.includes(product.materialKey);
};

const matchesShapes = (product: Product, keys: string[]) => {
  if (keys.length === 0) {
    return true;
  }

  return keys.includes(product.shapeKey);
};

const matchesPromoBadges = (product: Product, badges: ProductBadgeId[]) => {
  if (badges.length === 0) {
    return true;
  }

  return badges.some((badge) => product.badges.includes(badge));
};

export const filterCatalogProducts = (
  products: Product[],
  criteria: CatalogBrowseCriteria,
): Product[] => {
  return products.filter((product) => {
    if (!matchesQuery(product, criteria.query)) {
      return false;
    }

    if (!matchesMaterials(product, criteria.materialKeys)) {
      return false;
    }

    if (!matchesShapes(product, criteria.shapeKeys)) {
      return false;
    }

    if (!matchesPromoBadges(product, criteria.promoBadges)) {
      return false;
    }

    return true;
  });
};

export const sortCatalogProducts = (
  products: Product[],
  sort: CatalogSortKey,
): Product[] => {
  const next = [...products];

  if (sort === "price-asc") {
    next.sort((a, b) => a.priceFrom - b.priceFrom || a.name.localeCompare(b.name));
    return next;
  }

  if (sort === "price-desc") {
    next.sort((a, b) => b.priceFrom - a.priceFrom || a.name.localeCompare(b.name));
    return next;
  }

  if (sort === "name-asc") {
    next.sort((a, b) => a.name.localeCompare(b.name, "es"));
    return next;
  }

  next.sort(
    (a, b) => b.catalogScore - a.catalogScore || a.name.localeCompare(b.name, "es"),
  );
  return next;
};

export const applyCatalogBrowse = (
  products: Product[],
  criteria: CatalogBrowseCriteria,
): Product[] => {
  const filtered = filterCatalogProducts(products, criteria);
  return sortCatalogProducts(filtered, criteria.sort);
};
