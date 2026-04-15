import { AdminRequestError } from "@/features/admin/errors/admin-request-error";

export const formatAdminError = (error: unknown): string => {
  if (error instanceof AdminRequestError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error inesperado.";
};
