"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/features/catalog/types/product.types";
import { createInitialLensWizardDraft } from "@/features/lens-wizard/lib/lens-wizard-initial-draft";
import {
  clearLensWizardDraft,
  readLensWizardDraft,
  writeLensWizardDraft,
} from "@/features/lens-wizard/lib/lens-wizard-storage";
import type { LensWizardDraft } from "@/features/lens-wizard/types/lens-wizard-draft.types";
import type {
  LensWizardEyeRx,
  LensWizardLensTypeId,
  LensWizardRecetaSource,
  LensWizardTreatmentId,
} from "@/features/lens-wizard/types/lens-wizard-snapshot.types";

type LensWizardAction =
  | { type: "HYDRATE"; draft: LensWizardDraft }
  | { type: "SET_RECETA"; value: LensWizardRecetaSource | null }
  | {
      type: "SET_RX_FIELD";
      eye: "od" | "os";
      field: keyof LensWizardEyeRx;
      value: string;
    }
  | { type: "SET_LENS_TYPE"; value: LensWizardLensTypeId | null }
  | { type: "TOGGLE_TREATMENT"; id: LensWizardTreatmentId }
  | { type: "RESET" };

const lensWizardReducer = (
  state: LensWizardDraft,
  action: LensWizardAction,
): LensWizardDraft => {
  if (action.type === "HYDRATE") {
    return action.draft;
  }

  if (action.type === "RESET") {
    return createInitialLensWizardDraft();
  }

  if (action.type === "SET_RECETA") {
    return { ...state, recetaSource: action.value };
  }

  if (action.type === "SET_RX_FIELD") {
    return {
      ...state,
      rx: {
        ...state.rx,
        [action.eye]: {
          ...state.rx[action.eye],
          [action.field]: action.value,
        },
      },
    };
  }

  if (action.type === "SET_LENS_TYPE") {
    return { ...state, lensTypeId: action.value };
  }

  if (action.type === "TOGGLE_TREATMENT") {
    const has = state.treatments.includes(action.id);
    return {
      ...state,
      treatments: has
        ? state.treatments.filter((item) => item !== action.id)
        : [...state.treatments, action.id],
    };
  }

  return state;
};

type LensWizardContextValue = {
  product: Product;
  slug: string;
  draft: LensWizardDraft;
  setRecetaSource: (value: LensWizardRecetaSource | null) => void;
  setRxField: (
    eye: "od" | "os",
    field: keyof LensWizardEyeRx,
    value: string,
  ) => void;
  setLensType: (value: LensWizardLensTypeId | null) => void;
  toggleTreatment: (id: LensWizardTreatmentId) => void;
  resetDraft: () => void;
};

const LensWizardContext = createContext<LensWizardContextValue | null>(null);

type LensWizardProviderProps = {
  product: Product;
  children: ReactNode;
};

export const LensWizardProvider = ({ product, children }: LensWizardProviderProps) => {
  const slug = product.slug;
  const [draft, dispatch] = useReducer(lensWizardReducer, createInitialLensWizardDraft());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readLensWizardDraft(slug);
    dispatch({
      type: "HYDRATE",
      draft: stored ?? createInitialLensWizardDraft(),
    });
    queueMicrotask(() => {
      setHydrated(true);
    });
  }, [slug]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeLensWizardDraft(slug, draft);
  }, [hydrated, slug, draft]);

  const setRecetaSource = useCallback((value: LensWizardRecetaSource | null) => {
    dispatch({ type: "SET_RECETA", value });
  }, []);

  const setRxField = useCallback(
    (eye: "od" | "os", field: keyof LensWizardEyeRx, value: string) => {
      dispatch({ type: "SET_RX_FIELD", eye, field, value });
    },
    [],
  );

  const setLensType = useCallback((value: LensWizardLensTypeId | null) => {
    dispatch({ type: "SET_LENS_TYPE", value });
  }, []);

  const toggleTreatment = useCallback((id: LensWizardTreatmentId) => {
    dispatch({ type: "TOGGLE_TREATMENT", id });
  }, []);

  const resetDraft = useCallback(() => {
    dispatch({ type: "RESET" });
    clearLensWizardDraft(slug);
  }, [slug]);

  const value = useMemo(
    () => ({
      product,
      slug,
      draft,
      setRecetaSource,
      setRxField,
      setLensType,
      toggleTreatment,
      resetDraft,
    }),
    [
      product,
      slug,
      draft,
      setRecetaSource,
      setRxField,
      setLensType,
      toggleTreatment,
      resetDraft,
    ],
  );

  return (
    <LensWizardContext.Provider value={value}>{children}</LensWizardContext.Provider>
  );
};

export const useLensWizard = () => {
  const ctx = useContext(LensWizardContext);
  if (!ctx) {
    throw new Error("useLensWizard debe usarse dentro de LensWizardProvider");
  }
  return ctx;
};
