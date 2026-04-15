const AUTH_UNAVAILABLE = "Firebase no está configurado. Revisa las variables NEXT_PUBLIC_FIREBASE_*.";

const mapFirebaseCode = (code: string): string | null => {
  if (code === "auth/invalid-email") {
    return "El correo no tiene un formato válido.";
  }

  if (code === "auth/user-disabled") {
    return "Esta cuenta está deshabilitada.";
  }

  if (code === "auth/user-not-found" || code === "auth/wrong-password") {
    return "Correo o contraseña incorrectos.";
  }

  if (code === "auth/invalid-credential") {
    return "Credenciales incorrectas.";
  }

  if (code === "auth/email-already-in-use") {
    return "Ya existe una cuenta con este correo.";
  }

  if (code === "auth/weak-password") {
    return "La contraseña es demasiado débil (mínimo 6 caracteres).";
  }

  if (code === "auth/too-many-requests") {
    return "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.";
  }

  if (code === "auth/network-request-failed") {
    return "Error de red. Comprueba tu conexión.";
  }

  return null;
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message === "AUTH_UNAVAILABLE") {
    return AUTH_UNAVAILABLE;
  }

  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  ) {
    const mapped = mapFirebaseCode((error as { code: string }).code);
    if (mapped) {
      return mapped;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Ha ocurrido un error. Inténtalo de nuevo.";
};
