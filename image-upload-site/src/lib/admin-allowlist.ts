export const getAdminEmailAllowlist = (): string[] => {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.trim() ?? "";
  if (!raw) {
    return [];
  }
  return raw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
};

export const isEmailAllowedAsAdmin = (email: string | null | undefined): boolean => {
  if (!email) {
    return false;
  }
  const list = getAdminEmailAllowlist();
  if (list.length === 0) {
    return false;
  }
  return list.includes(email.trim().toLowerCase());
};
