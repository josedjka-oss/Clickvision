import type { CatalogBrowseCriteria } from "@/features/catalog/types/catalog-query.types";

/**
 * Contrato hacia un futuro backend (Firestore / REST).
 * Hoy solo devuelve un objeto serializable listo para logging o telemetría.
 */
export const toRemoteCatalogQueryPayload = (criteria: CatalogBrowseCriteria) => {
  return {
    q: criteria.query.trim(),
    sort: criteria.sort,
    filters: {
      materialKeys: criteria.materialKeys,
      shapeKeys: criteria.shapeKeys,
      promoBadges: criteria.promoBadges,
    },
  };
};
