"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isEmailAllowedAsAdmin } from "@/lib/admin-allowlist";
import { getFirebaseApp } from "@/lib/firebase-app";
import { isFirebaseConfigured } from "@/lib/firebase-config";
import { uploadProductImage } from "@/lib/product-image-upload";

const PRODUCTS_COLLECTION = "products";

type ProductRow = { id: string; name: string; slug: string };

/** Acepta slug solo, URL con https, o dominio + ruta sin protocolo. */
const parseSlugFromInput = (raw: string): string => {
  const t = raw.trim();
  const fromPath = t.match(/\/gafas\/([^/?#]+)/i);
  if (fromPath?.[1]) {
    return decodeURIComponent(fromPath[1]);
  }
  if (!t.includes("/")) {
    return t;
  }
  try {
    const withProto = t.includes("://") ? t : `https://${t}`;
    const url = new URL(withProto);
    const m = url.pathname.match(/\/gafas\/([^/]+)/i);
    if (m?.[1]) {
      return decodeURIComponent(m[1]);
    }
  } catch {
    /* ignorar */
  }
  const parts = t.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? t;
};

export const UploadPortal = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [listError, setListError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [slugLoading, setSlugLoading] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loadImagesError, setLoadImagesError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setReady(isFirebaseConfigured());
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const auth = getAuth(getFirebaseApp());
    return onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email ?? null);
      if (user?.email && !isEmailAllowedAsAdmin(user.email)) {
        void signOut(auth);
        setLoginError("Este correo no está autorizado para el portal.");
      }
    });
  }, [ready]);

  const loadProducts = useCallback(async () => {
    if (!ready || !userEmail) {
      return;
    }
    setListError(null);
    try {
      const db = getFirestore(getFirebaseApp());
      const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
      const next: ProductRow[] = snap.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        return {
          id: d.id,
          name: typeof data.name === "string" ? data.name : "—",
          slug: typeof data.slug === "string" ? data.slug : "—",
        };
      });
      next.sort((a, b) => a.name.localeCompare(b.name, "es"));
      setRows(next);
    } catch (e) {
      setListError(e instanceof Error ? e.message : "No se pudo listar productos (revisa reglas Firestore).");
    }
  }, [ready, userEmail]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const loadImagesForProduct = useCallback(async (documentId: string) => {
    if (!documentId.trim()) {
      setImages([]);
      return;
    }
    setLoadImagesError(null);
    try {
      const db = getFirestore(getFirebaseApp());
      const refDoc = doc(db, PRODUCTS_COLLECTION, documentId.trim());
      const snap = await getDoc(refDoc);
      if (!snap.exists()) {
        setImages([]);
        setLoadImagesError("No existe un producto con ese ID.");
        return;
      }
      const data = snap.data() as Record<string, unknown>;
      const raw = data.images;
      const urls = Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string" && x.startsWith("http")) : [];
      setImages(urls);
    } catch (e) {
      setLoadImagesError(e instanceof Error ? e.message : "Error al leer imágenes.");
    }
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setImages([]);
      return;
    }
    void loadImagesForProduct(selectedId);
  }, [selectedId, loadImagesForProduct]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const auth = getAuth(getFirebaseApp());
      const cred = await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      if (!isEmailAllowedAsAdmin(cred.user.email)) {
        await signOut(auth);
        setLoginError("Correo no autorizado.");
        return;
      }
      setLoginPassword("");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Error al iniciar sesión.");
    }
  };

  const handleLogout = async () => {
    await signOut(getAuth(getFirebaseApp()));
    setRows([]);
    setSelectedId("");
    setSelectedLabel("");
    setSlugInput("");
    setImages([]);
    setMessage(null);
  };

  const handleResolveSlug = async () => {
    const slug = parseSlugFromInput(slugInput);
    if (!slug) {
      setSlugError("Pega la URL de la ficha, la ruta /gafas/… o solo el slug.");
      return;
    }
    setSlugError(null);
    setSlugLoading(true);
    setMessage(null);
    try {
      const db = getFirestore(getFirebaseApp());
      const q = query(collection(db, PRODUCTS_COLLECTION), where("slug", "==", slug), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) {
        setSlugError(`No encontramos un producto con slug «${slug}». Revisa mayúsculas y guiones.`);
        setSelectedId("");
        setSelectedLabel("");
        return;
      }
      const d = snap.docs[0];
      const data = d.data() as Record<string, unknown>;
      const name = typeof data.name === "string" ? data.name : slug;
      setSelectedId(d.id);
      setSelectedLabel(`${name} (${slug})`);
      setMessage(`Montura lista. Arrastra las fotos abajo o pulsa «Elegir archivos».`);
    } catch (err) {
      setSlugError(err instanceof Error ? err.message : "Error al buscar.");
    } finally {
      setSlugLoading(false);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length || !selectedId.trim()) {
      if (!selectedId.trim()) {
        setMessage("Primero indica qué montura es: pega la URL o el slug y pulsa «Buscar».");
      }
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const db = getFirestore(getFirebaseApp());
      const refDoc = doc(db, PRODUCTS_COLLECTION, selectedId.trim());
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          continue;
        }
        const url = await uploadProductImage(selectedId.trim(), file);
        await updateDoc(refDoc, {
          images: arrayUnion(url),
          updatedAt: serverTimestamp(),
        });
      }
      setMessage("Listo: imágenes subidas y guardadas en el catálogo.");
      await loadImagesForProduct(selectedId.trim());
      await loadProducts();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Error al subir.");
    } finally {
      setUploading(false);
    }
  };

  if (!ready) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
        Configura las mismas variables <code className="font-mono">NEXT_PUBLIC_FIREBASE_*</code> y{" "}
        <code className="font-mono">NEXT_PUBLIC_ADMIN_EMAILS</code> que en la tienda (archivo{" "}
        <code className="font-mono">.env.local</code> en esta carpeta).
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#111]">Subir fotos de monturas</h1>
          <p className="mt-2 text-sm text-[#6b7280]">
            Tras entrar: pega el enlace de la ficha en la tienda (o solo el slug), busca la montura y arrastra las
            imágenes. Mismo Firebase que Clickvision.
          </p>
        </div>
        <form onSubmit={handleLogin} className="max-w-md space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-[#111]" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={loginEmail}
              onChange={(ev) => {
                setLoginEmail(ev.target.value);
              }}
              className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111]" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={loginPassword}
              onChange={(ev) => {
                setLoginPassword(ev.target.value);
              }}
              className="mt-1 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm"
            />
          </div>
          {loginError ? (
            <p className="text-sm text-red-700" role="alert">
              {loginError}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#1b2c4d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#152a47]"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  const hasProduct = Boolean(selectedId.trim());

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 border-b border-[#e5e7eb] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111]">Subir fotos</h1>
          <p className="text-sm text-[#6b7280]">{userEmail}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            void handleLogout();
          }}
          className="self-start rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#111] hover:bg-[#f5f5f5]"
        >
          Salir
        </button>
      </header>

      {listError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {listError}
        </p>
      ) : null}

      <section className="space-y-3 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-[#111]">1. ¿Qué montura es?</h2>
        <p className="text-sm text-[#6b7280]">
          Copia desde el navegador la URL de la ficha (incluye <span className="font-mono">/gafas/…</span>) o escribe
          solo el <span className="font-mono">slug</span> (la parte final del enlace).
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={slugInput}
            onChange={(ev) => {
              setSlugInput(ev.target.value);
              setSlugError(null);
            }}
            placeholder="https://…vercel.app/gafas/aria-negro-mate  o  aria-negro-mate"
            className="min-w-0 flex-1 rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm"
            aria-label="URL de la ficha o slug del producto"
          />
          <button
            type="button"
            disabled={slugLoading}
            onClick={() => {
              void handleResolveSlug();
            }}
            className="shrink-0 rounded-lg bg-[#1b2c4d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#152a47] disabled:opacity-50"
          >
            {slugLoading ? "Buscando…" : "Buscar montura"}
          </button>
        </div>
        {slugError ? (
          <p className="text-sm text-red-700" role="alert">
            {slugError}
          </p>
        ) : null}
        {selectedLabel ? (
          <p className="text-sm font-medium text-[#1b2c4d]" role="status">
            Seleccionada: {selectedLabel}
          </p>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#111]">2. Suelta las fotos aquí</h2>
        <div
          role="button"
          tabIndex={0}
          aria-label="Zona para arrastrar imágenes o abrir selector de archivos"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            void handleFiles(e.dataTransfer.files);
          }}
          onClick={() => {
            if (hasProduct) {
              fileInputRef.current?.click();
            }
          }}
          className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
            dragActive ? "border-[#1b2c4d] bg-[#eef2f7]" : "border-[#d1d5db] bg-[#fafafa]"
          } ${!hasProduct ? "cursor-not-allowed opacity-60" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={!hasProduct || uploading}
            onChange={(ev) => {
              void handleFiles(ev.target.files);
              ev.target.value = "";
            }}
          />
          <p className="text-sm text-[#374151]">
            {hasProduct
              ? "Arrastra imágenes a esta caja o haz clic para elegir archivos."
              : "Primero busca la montura en el paso 1."}
          </p>
          {hasProduct ? (
            <button
              type="button"
              className="mt-4 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#111] hover:bg-[#f5f5f5]"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Elegir archivos
            </button>
          ) : null}
        </div>
        {uploading ? <p className="text-xs text-[#6b7280]">Subiendo…</p> : null}
        {message ? (
          <p className="text-sm text-[#1b2c4d]" role="status">
            {message}
          </p>
        ) : null}
        {loadImagesError ? (
          <p className="text-sm text-red-700" role="alert">
            {loadImagesError}
          </p>
        ) : null}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">Imágenes guardadas</h2>
        {images.length === 0 ? (
          <p className="text-sm text-[#6b7280]">Aún no hay URLs en Firestore para esta montura.</p>
        ) : (
          <ul className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-[#e5e7eb] bg-white p-4 text-xs">
            {images.map((url) => (
              <li key={url} className="break-all">
                <a href={url} target="_blank" rel="noreferrer" className="text-[#1b2c4d] underline">
                  Vista previa
                </a>
                <span className="ml-2 text-[#9ca3af]">{url.slice(0, 72)}…</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <details className="rounded-lg border border-[#e5e7eb] bg-white p-4 text-sm">
        <summary className="cursor-pointer font-medium text-[#374151]">Lista de todos los productos (opcional)</summary>
        <p className="mt-2 text-xs text-[#6b7280]">Si prefieres, elige por ID de documento desde la tabla.</p>
        <div className="mt-3 max-h-56 overflow-auto rounded-lg border border-[#e5e7eb]">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-[#f5f5f5] text-xs text-[#6b7280]">
              <tr>
                <th className="px-3 py-2">Slug</th>
                <th className="px-3 py-2">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={row.id === selectedId ? "bg-[#eef2f7]" : "hover:bg-[#fafafa]"}>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="text-left font-mono text-xs text-[#1b2c4d] underline-offset-2 hover:underline"
                      onClick={() => {
                        setSelectedId(row.id);
                        setSelectedLabel(`${row.name} (${row.slug})`);
                        setSlugInput(row.slug);
                        setSlugError(null);
                        setMessage("Montura seleccionada desde la lista.");
                      }}
                    >
                      {row.slug}
                    </button>
                  </td>
                  <td className="px-3 py-2">{row.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
};
