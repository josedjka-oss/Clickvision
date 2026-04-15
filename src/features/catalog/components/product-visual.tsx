"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImagePlaceholder } from "@/features/catalog/components/product-image-placeholder";
import type { ProductImageTone } from "@/features/catalog/types/product.types";
import { cn } from "@/lib/cn";

type ProductVisualProps = {
  tone: ProductImageTone;
  label: string;
  /** URL HTTPS (p. ej. Firebase Storage); debe coincidir con `images.remotePatterns` en `next.config`. */
  imageUrl?: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const isAllowedRemoteUrl = (value: string) => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      return false;
    }
    const host = url.hostname.toLowerCase();
    return (
      host === "firebasestorage.googleapis.com" ||
      host === "storage.googleapis.com" ||
      host.endsWith(".googleapis.com")
    );
  } catch {
    return false;
  }
};

export const ProductVisual = ({
  tone,
  label,
  imageUrl,
  className,
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority = false,
}: ProductVisualProps) => {
  const [useFallback, setUseFallback] = useState(false);
  const trimmed = imageUrl?.trim() ?? "";

  if (trimmed && !useFallback && isAllowedRemoteUrl(trimmed)) {
    return (
      <div className={cn("relative w-full min-h-0 overflow-hidden", className)}>
        <Image
          src={trimmed}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => {
            setUseFallback(true);
          }}
        />
      </div>
    );
  }

  return <ProductImagePlaceholder tone={tone} label={label} className={className} />;
};
