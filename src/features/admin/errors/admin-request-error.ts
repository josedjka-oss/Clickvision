export type AdminRequestErrorCode =
  | "ADMIN_FIRESTORE"
  | "ADMIN_STORAGE"
  | "ADMIN_VALIDATION"
  | "ADMIN_SLUG_TAKEN"
  | "ADMIN_NOT_FOUND";

export class AdminRequestError extends Error {
  readonly code: AdminRequestErrorCode;

  constructor(code: AdminRequestErrorCode, message: string) {
    super(message);
    this.name = "AdminRequestError";
    this.code = code;
  }
}
