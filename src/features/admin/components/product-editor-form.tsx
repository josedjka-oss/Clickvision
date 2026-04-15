"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { formatAdminError } from "@/features/admin/lib/format-admin-error";
import { uploadProductImage } from "@/features/admin/services/admin-product-images.service";
import {
  createAdminProduct,
  getAdminProductForEdit,
  updateAdminProduct,
  type AdminProductWriteInput,
} from "@/features/admin/services/admin-products.service";
import type {
  FrameShapeKey,
  MaterialKey,
  Product,
  ProductBadgeId,
  ProductImageTone,
} from "@/features/catalog/types/product.types";
import { Button, getButtonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

type ProductEditorFormProps = {
  mode: "create" | "edit";
  documentId: string;
};

type FormState = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlightsText: string;
  priceFrom: string;
  compareAtPrice: string;
  frameMaterial: string;
  materialKey: MaterialKey;
  shapeKey: FrameShapeKey;
  catalogScore: string;
  badges: ProductBadgeId[];
  lensWidthMm: string;
  bridgeMm: string;
  templeMm: string;
  imageTone: ProductImageTone;
  published: boolean;
  images: string[];
};

const MATERIAL_OPTIONS: { value: MaterialKey; label: string }[] = [
  { value: "acetate", label: "Acetato" },
  { value: "titanium", label: "Titanio" },
  { value: "steel", label: "Acero" },
];

const SHAPE_OPTIONS: { value: FrameShapeKey; label: string }[] = [
  { value: "round", label: "Redonda" },
  { value: "rectangular", label: "Rectangular" },
  { value: "geometric", label: "Geométrica" },
  { value: "aviator", label: "Aviador" },
];

const TONE_OPTIONS: { value: ProductImageTone; label: string }[] = [
  { value: "navy", label: "Navy" },
  { value: "sand", label: "Sand" },
  { value: "sage", label: "Sage" },
  { value: "stone", label: "Stone" },
  { value: "mist", label: "Mist" },
  { value: "graphite", label: "Graphite" },
];

const BADGE_OPTIONS: { id: ProductBadgeId; label: string }[] = [
  { id: "new", label: "Nuevo" },
  { id: "sale", label: "Oferta" },
  { id: "bestseller", label: "Bestseller" },
];

const emptyForm = (): FormState => ({
  slug: "",
  name: "",
  tagline: "",
  description: "",
  highlightsText: "",
  priceFrom: "1890",
  compareAtPrice: "",
  frameMaterial: "Acetato",
  materialKey: "acetate",
  shapeKey: "round",
  catalogScore: "50",
  badges: [],
  lensWidthMm: "50",
  bridgeMm: "18",
  templeMm: "140",
  imageTone: "navy",
  published: true,
  images: [],
});

const formFromProduct = (product: Product, published: boolean): FormState => ({
  slug: product.slug,
  name: product.name,
  tagline: product.tagline,
  description: product.description,
  highlightsText: product.highlights.join("\n"),
  priceFrom: String(product.priceFrom),
  compareAtPrice: product.compareAtPrice != null ? String(product.compareAtPrice) : "",
  frameMaterial: product.frameMaterial,
  materialKey: product.materialKey,
  shapeKey: product.shapeKey,
  catalogScore: String(product.catalogScore),
  badges: [...product.badges],
  lensWidthMm: String(product.lensWidthMm),
  bridgeMm: String(product.bridgeMm),
  templeMm: String(product.templeMm),
  imageTone: product.imageTone,
  published,
  images: [...(product.imageUrls ?? [])],
});

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink shadow-sm outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/25";

const labelClass = "block text-sm font-medium text-ink";

const buildPayload = (form: FormState): AdminProductWriteInput => {
  const priceFrom = Number(form.priceFrom);
  const catalogScore = Number(form.catalogScore);
  const lensWidthMm = Number(form.lensWidthMm);
  const bridgeMm = Number(form.bridgeMm);
  const templeMm = Number(form.templeMm);

  if (!Number.isFinite(priceFrom) || priceFrom < 0) {
    throw new Error("Precio desde: número inválido.");
  }

  if (!Number.isFinite(catalogScore)) {
    throw new Error("Score de catálogo: número inválido.");
  }

  if (!Number.isFinite(lensWidthMm) || !Number.isFinite(bridgeMm) || !Number.isFinite(templeMm)) {
    throw new Error("Medidas: números inválidos.");
  }

  const compareTrim = form.compareAtPrice.trim();
  let compareAtPrice: number | undefined;
  if (compareTrim.length > 0) {
    const n = Number(compareTrim);
    if (!Number.isFinite(n) || n < 0) {
      throw new Error("Precio de comparación: número inválido.");
    }
    compareAtPrice = n;
  }

  const highlights = form.highlightsText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const base: AdminProductWriteInput = {
    slug: form.slug.trim(),
    name: form.name.trim(),
    tagline: form.tagline.trim(),
    description: form.description.trim(),
    highlights,
    priceFrom,
    currency: "MXN",
    frameMaterial: form.frameMaterial.trim(),
    materialKey: form.materialKey,
    shapeKey: form.shapeKey,
    catalogScore,
    badges: form.badges,
    lensWidthMm,
    bridgeMm,
    templeMm,
    imageTone: form.imageTone,
    published: form.published,
    images: form.images,
  };

  if (compareAtPrice !== undefined) {
    return { ...base, compareAtPrice };
  }

  return base;
};

export const ProductEditorForm = ({ mode, documentId }: ProductEditorFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingDoc, setLoadingDoc] = useState(mode === "edit");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveHint, setSaveHint] = useState<string | null>(null);

  const loadDocument = useCallback(async () => {
    if (mode !== "edit") {
      return;
    }

    setLoadingDoc(true);
    setLoadError(null);

    const snapshot = await getAdminProductForEdit(documentId);
    if (!snapshot) {
      setLoadError("Producto no encontrado.");
      setLoadingDoc(false);
      return;
    }

    setForm(formFromProduct(snapshot.product, snapshot.published));
    setLoadingDoc(false);
  }, [documentId, mode]);

  useEffect(() => {
    void loadDocument();
  }, [loadDocument]);

  const handleBadgeToggle = (id: ProductBadgeId, checked: boolean) => {
    setForm((prev) => {
      const has = prev.badges.includes(id);
      if (checked && !has) {
        return { ...prev, badges: [...prev.badges, id] };
      }
      if (!checked && has) {
        return { ...prev, badges: prev.badges.filter((b) => b !== id) };
      }
      return prev;
    });
  };

  const handleRemoveImage = (url: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((item) => item !== url),
    }));
  };

  const handlePickImages = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);
    setSubmitError(null);

    try {
      for (const file of Array.from(files)) {
        const url = await uploadProductImage(documentId, file);
        setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
      }
    } catch (error) {
      setSubmitError(formatAdminError(error));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSaveHint(null);
    setSaving(true);

    try {
      const payload = buildPayload(form);
      if (mode === "create") {
        await createAdminProduct(documentId, payload);
        router.replace(routes.adminProductEdit(documentId));
        return;
      }

      await updateAdminProduct(documentId, payload);
      setSaveHint("Cambios guardados.");
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Precio")) {
        setSubmitError(error.message);
      } else {
        setSubmitError(formatAdminError(error));
      }
    } finally {
      setSaving(false);
    }
  };

  if (mode === "edit" && loadingDoc) {
    return <p className="text-sm text-muted">Cargando producto…</p>;
  }

  if (mode === "edit" && loadError) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-800" role="alert">
          {loadError}
        </p>
        <Link href={routes.adminProducts} className="text-sm font-medium text-accent underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {mode === "create" ? "Nuevo producto" : "Editar producto"}
        </h1>
        <Link href={routes.adminProducts} className="text-sm text-muted underline-offset-4 hover:underline">
          ← Listado
        </Link>
      </div>

      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Identificación</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="p-slug">
              Slug (URL)
            </label>
            <input
              id="p-slug"
              className={`${inputClass} mt-1 font-mono text-xs`}
              value={form.slug}
              onChange={(e) => {
                setForm((p) => ({ ...p, slug: e.target.value }));
              }}
              required
              autoComplete="off"
            />
            <p className="mt-1 text-xs text-muted">Minúsculas, números y guiones. Ej. aria-negro-mate</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="p-name">
              Nombre
            </label>
            <input
              id="p-name"
              className={`${inputClass} mt-1`}
              value={form.name}
              onChange={(e) => {
                setForm((p) => ({ ...p, name: e.target.value }));
              }}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => {
                  setForm((p) => ({ ...p, published: e.target.checked }));
                }}
                className="size-4 rounded border-border"
              />
              Publicado en catálogo (si está desmarcado, no aparece en la tienda)
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Contenido</h2>
        <div>
          <label className={labelClass} htmlFor="p-tagline">
            Tagline
          </label>
          <input
            id="p-tagline"
            className={`${inputClass} mt-1`}
            value={form.tagline}
            onChange={(e) => {
              setForm((p) => ({ ...p, tagline: e.target.value }));
            }}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="p-description">
            Descripción
          </label>
          <textarea
            id="p-description"
            className={`${inputClass} mt-1 min-h-[120px]`}
            value={form.description}
            onChange={(e) => {
              setForm((p) => ({ ...p, description: e.target.value }));
            }}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="p-highlights">
            Destacados (una línea = un bullet)
          </label>
          <textarea
            id="p-highlights"
            className={`${inputClass} mt-1 min-h-[100px]`}
            value={form.highlightsText}
            onChange={(e) => {
              setForm((p) => ({ ...p, highlightsText: e.target.value }));
            }}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Precio y prioridad</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="p-price">
              Precio desde (MXN)
            </label>
            <input
              id="p-price"
              type="number"
              min={0}
              className={`${inputClass} mt-1`}
              value={form.priceFrom}
              onChange={(e) => {
                setForm((p) => ({ ...p, priceFrom: e.target.value }));
              }}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="p-compare">
              Precio comparación (opcional)
            </label>
            <input
              id="p-compare"
              type="number"
              min={0}
              className={`${inputClass} mt-1`}
              value={form.compareAtPrice}
              onChange={(e) => {
                setForm((p) => ({ ...p, compareAtPrice: e.target.value }));
              }}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="p-score">
              Catalog score
            </label>
            <input
              id="p-score"
              type="number"
              className={`${inputClass} mt-1`}
              value={form.catalogScore}
              onChange={(e) => {
                setForm((p) => ({ ...p, catalogScore: e.target.value }));
              }}
              required
            />
          </div>
        </div>
        <fieldset>
          <legend className={labelClass}>Badges</legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {BADGE_OPTIONS.map((badge) => (
              <label key={badge.id} className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={form.badges.includes(badge.id)}
                  onChange={(e) => {
                    handleBadgeToggle(badge.id, e.target.checked);
                  }}
                  className="size-4 rounded border-border"
                />
                {badge.label}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Montura</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="p-material-label">
              Material (texto)
            </label>
            <input
              id="p-material-label"
              className={`${inputClass} mt-1`}
              value={form.frameMaterial}
              onChange={(e) => {
                setForm((p) => ({ ...p, frameMaterial: e.target.value }));
              }}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="p-material-key">
              Material (clave)
            </label>
            <select
              id="p-material-key"
              className={`${inputClass} mt-1`}
              value={form.materialKey}
              onChange={(e) => {
                setForm((p) => ({ ...p, materialKey: e.target.value as MaterialKey }));
              }}
            >
              {MATERIAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="p-shape">
              Silueta
            </label>
            <select
              id="p-shape"
              className={`${inputClass} mt-1`}
              value={form.shapeKey}
              onChange={(e) => {
                setForm((p) => ({ ...p, shapeKey: e.target.value as FrameShapeKey }));
              }}
            >
              {SHAPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="p-tone">
              Tono de imagen (placeholder catálogo)
            </label>
            <select
              id="p-tone"
              className={`${inputClass} mt-1`}
              value={form.imageTone}
              onChange={(e) => {
                setForm((p) => ({ ...p, imageTone: e.target.value as ProductImageTone }));
              }}
            >
              {TONE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="p-lens">
              Ancho lente (mm)
            </label>
            <input
              id="p-lens"
              type="number"
              min={0}
              className={`${inputClass} mt-1`}
              value={form.lensWidthMm}
              onChange={(e) => {
                setForm((p) => ({ ...p, lensWidthMm: e.target.value }));
              }}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="p-bridge">
              Puente (mm)
            </label>
            <input
              id="p-bridge"
              type="number"
              min={0}
              className={`${inputClass} mt-1`}
              value={form.bridgeMm}
              onChange={(e) => {
                setForm((p) => ({ ...p, bridgeMm: e.target.value }));
              }}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="p-temple">
              Patilla (mm)
            </label>
            <input
              id="p-temple"
              type="number"
              min={0}
              className={`${inputClass} mt-1`}
              value={form.templeMm}
              onChange={(e) => {
                setForm((p) => ({ ...p, templeMm: e.target.value }));
              }}
              required
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Imágenes (Storage)</h2>
        <p className="text-xs text-muted">
          Se suben a <span className="font-mono">products/{documentId}/images/</span>. Las URLs se
          guardan en el documento al pulsar Guardar. Configura reglas de Storage para usuarios
          admin.
        </p>
        <div>
          <label className={labelClass} htmlFor="p-images-file">
            Subir archivos
          </label>
          <input
            id="p-images-file"
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(e) => {
              void handlePickImages(e.target.files);
              e.target.value = "";
            }}
            className="mt-2 block w-full text-sm text-muted file:mr-3 file:rounded-md file:border file:border-border file:bg-surface-muted file:px-3 file:py-1.5 file:text-sm file:text-ink"
          />
          {uploading ? <p className="mt-2 text-xs text-muted">Subiendo…</p> : null}
        </div>
        {form.images.length > 0 ? (
          <ul className="space-y-2">
            {form.images.map((url) => (
              <li
                key={url}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-border px-3 py-2 text-xs"
              >
                <a href={url} target="_blank" rel="noreferrer" className="break-all text-accent underline">
                  {url}
                </a>
                <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveImage(url)}>
                  Quitar
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">Sin imágenes aún.</p>
        )}
      </section>

      {submitError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {submitError}
        </p>
      ) : null}
      {saveHint ? (
        <p className="text-sm font-medium text-accent" role="status">
          {saveHint}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" size="lg" disabled={saving}>
          {saving ? "Guardando…" : "Guardar"}
        </Button>
        <Link
          href={routes.adminProducts}
          aria-disabled={saving}
          className={cn(
            getButtonClasses({
              variant: "secondary",
              size: "lg",
              className: "inline-flex items-center justify-center",
            }),
            saving && "pointer-events-none opacity-60",
          )}
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
};
