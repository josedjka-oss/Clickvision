import type { LensWizardDraft } from "@/features/lens-wizard/types/lens-wizard-draft.types";

export const lensWizardStorageKey = (slug: string) =>
  `clickvision.lens-wizard.v1.${slug}`;

export const readLensWizardDraft = (slug: string): LensWizardDraft | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(lensWizardStorageKey(slug));
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as LensWizardDraft;
  } catch {
    return null;
  }
};

export const writeLensWizardDraft = (slug: string, draft: LensWizardDraft) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    lensWizardStorageKey(slug),
    JSON.stringify(draft),
  );
};

export const clearLensWizardDraft = (slug: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(lensWizardStorageKey(slug));
};
