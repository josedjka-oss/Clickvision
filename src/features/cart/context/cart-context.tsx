"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { Product } from "@/features/catalog/types/product.types";
import {
  mapProductToCartLine,
  mapProductToConfiguredCartLine,
} from "@/features/cart/lib/cart-line-mapper";
import type { LensWizardSnapshot } from "@/features/lens-wizard/types/lens-wizard-snapshot.types";
import {
  readStoredCartLines,
  writeStoredCartLines,
} from "@/features/cart/lib/cart-storage";
import type { CartLine } from "@/features/cart/types/cart.types";

type CartAction =
  | { type: "HYDRATE"; lines: CartLine[] }
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "ADD_CONFIGURED_LINE"; line: CartLine }
  | { type: "INCREMENT"; lineId: string }
  | { type: "DECREMENT"; lineId: string }
  | { type: "REMOVE"; lineId: string }
  | { type: "RESET" };

const cartReducer = (state: CartLine[], action: CartAction): CartLine[] => {
  if (action.type === "HYDRATE") {
    return action.lines;
  }

  if (action.type === "RESET") {
    return [];
  }

  if (action.type === "ADD_PRODUCT") {
    const existingIndex = state.findIndex(
      (line) => line.productId === action.product.id,
    );

    if (existingIndex >= 0) {
      return state.map((line, index) =>
        index === existingIndex
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      );
    }

    return [...state, mapProductToCartLine(action.product)];
  }

  if (action.type === "ADD_CONFIGURED_LINE") {
    const line = action.line;
    const existingIndex = state.findIndex(
      (item) => item.productId === line.productId,
    );

    if (existingIndex >= 0) {
      return state.map((item, index) =>
        index === existingIndex ? { ...line, quantity: 1 } : item,
      );
    }

    return [...state, { ...line, quantity: 1 }];
  }

  if (action.type === "INCREMENT") {
    return state.map((line) =>
      line.id === action.lineId ? { ...line, quantity: line.quantity + 1 } : line,
    );
  }

  if (action.type === "DECREMENT") {
    return state.map((line) =>
      line.id !== action.lineId
        ? line
        : { ...line, quantity: Math.max(1, line.quantity - 1) },
    );
  }

  if (action.type === "REMOVE") {
    return state.filter((line) => line.id !== action.lineId);
  }

  return state;
};

type CartContextValue = {
  lines: CartLine[];
  totalQuantity: number;
  subtotal: number;
  currency: "MXN";
  addProduct: (product: Product) => void;
  addConfiguredProduct: (
    product: Product,
    snapshot: LensWizardSnapshot,
  ) => void;
  incrementLine: (lineId: string) => void;
  decrementLine: (lineId: string) => void;
  removeLine: (lineId: string) => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const skipPersistRef = useRef(true);

  useEffect(() => {
    dispatch({ type: "HYDRATE", lines: readStoredCartLines() });
    queueMicrotask(() => {
      skipPersistRef.current = false;
    });
  }, []);

  useEffect(() => {
    if (skipPersistRef.current) {
      return;
    }

    writeStoredCartLines(lines);
  }, [lines]);

  const addProduct = useCallback((product: Product) => {
    dispatch({ type: "ADD_PRODUCT", product });
  }, []);

  const addConfiguredProduct = useCallback(
    (product: Product, snapshot: LensWizardSnapshot) => {
      const line = mapProductToConfiguredCartLine(product, {
        currentStep: "review",
        prescriptionPayload: snapshot,
      });
      dispatch({ type: "ADD_CONFIGURED_LINE", line });
    },
    [],
  );

  const incrementLine = useCallback((lineId: string) => {
    dispatch({ type: "INCREMENT", lineId });
  }, []);

  const decrementLine = useCallback((lineId: string) => {
    dispatch({ type: "DECREMENT", lineId });
  }, []);

  const removeLine = useCallback((lineId: string) => {
    dispatch({ type: "REMOVE", lineId });
  }, []);

  const resetCart = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const totalQuantity = useMemo(() => {
    return lines.reduce((sum, line) => sum + line.quantity, 0);
  }, [lines]);

  const subtotal = useMemo(() => {
    return lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  }, [lines]);

  const currency = lines[0]?.currency ?? "MXN";

  const value = useMemo(
    () => ({
      lines,
      totalQuantity,
      subtotal,
      currency,
      addProduct,
      addConfiguredProduct,
      incrementLine,
      decrementLine,
      removeLine,
      resetCart,
    }),
    [
      lines,
      totalQuantity,
      subtotal,
      currency,
      addProduct,
      addConfiguredProduct,
      incrementLine,
      decrementLine,
      removeLine,
      resetCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
};
