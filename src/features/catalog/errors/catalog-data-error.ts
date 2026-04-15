export type CatalogDataErrorCode =
  | "FIRESTORE_LIST_FAILED"
  | "FIRESTORE_GET_BY_SLUG_FAILED"
  | "INVALID_PRODUCT_DOCUMENT";

export class CatalogDataError extends Error {
  readonly code: CatalogDataErrorCode;

  readonly cause?: unknown;

  constructor(code: CatalogDataErrorCode, message: string, cause?: unknown) {
    super(message);
    this.name = "CatalogDataError";
    this.code = code;
    this.cause = cause;
  }
}
