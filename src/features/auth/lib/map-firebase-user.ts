import type { User } from "firebase/auth";
import type { SessionUser } from "@/features/auth/types/session-user.types";

export const mapFirebaseUserToSessionUser = (user: User | null): SessionUser | null => {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};
