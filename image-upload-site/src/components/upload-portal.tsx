"use client";

import { useCallback, useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isEmailAllowedAsAdmin } from "@/lib/admin-allowlist";
import { getFirebaseApp } from "@/lib/firebase-app";
import { isFirebaseConfigured } from "@/lib/firebase-config";
import { uploadProductImage } from "@/lib/product-image-upload";

const PRODUCTS_COLLECTION = "products";

type ProductRow = { id: string; name: string; slug: string };

export const UploadPortal = () => {
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [listError, setListError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loadImagesError, setLoadImagesError] = useState<string | null>(null);

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
    setImages([]);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length || !selectedId.trim()) {
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const db = getFirestore(getFirebaseApp());
      const refDoc = doc(db, PRODUCTS_COLLECTION, selectedId.trim());
      for (const file of Array.from(files)) {
        const url = await uploadProductImage(selectedId.trim(), file);
        await updateDoc(refDoc, {
          images: arrayUnion(url),
          updatedAt: serverTimestamp(),
        });
      }
      setMessage("Imágenes subidas y enlazadas en Firestore.");
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
          <h1 className="text-2xl font-semibold text-[#111]">Portal de imágenes</h1>
          <p className="mt-2 text-sm text-[#6b7280]">
            Acceso solo para correos en <span className="font-mono">NEXT_PUBLIC_ADMIN_EMAILS</span>. Las fotos se
            guardan en Storage y la URL en el campo <span className="font-mono">images</span> del producto.
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

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 border-b border-[#e5e7eb] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111]">Imágenes de monturas</h1>
          <p className="text-sm text-[#6b7280]">Sesión: {userEmail}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            void handleLogout();
          }}
          className="self-start rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#111] hover:bg-[#f5f5f5]"
        >
          Cerrar sesión
        </button>
      </header>

      {listError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {listError}
        </p>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">1. Elige producto</h2>
        <div className="max-h-48 overflow-auto rounded-lg border border-[#e5e7eb] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-[#f5f5f5] text-xs text-[#6b7280]">
              <tr>
                <th className="px-3 py-2">ID documento</th>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Slug</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.id === selectedId ? "bg-[#eef2f7]" : "hover:bg-[#fafafa]"}
                >
                  <td className="px-3 py-2 font-mono text-xs">
                    <button
                      type="button"
                      className="text-left text-[#1b2c4d] underline-offset-2 hover:underline"
                      onClick={() => {
                        setSelectedId(row.id);
                      }}
                    >
                      {row.id}
                    </button>
                  </td>
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2 text-[#6b7280]">{row.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#6b7280]">
          ID seleccionado: <span className="font-mono text-[#111]">{selectedId || "—"}</span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">2. Subir imágenes</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={!selectedId.trim() || uploading}
          onChange={(ev) => {
            void handleFiles(ev.target.files);
            ev.target.value = "";
          }}
          className="block w-full text-sm text-[#6b7280] file:mr-3 file:rounded-md file:border file:border-[#e5e7eb] file:bg-[#f5f5f5] file:px-3 file:py-1.5"
        />
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
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">URLs actuales</h2>
        {images.length === 0 ? (
          <p className="text-sm text-[#6b7280]">Sin imágenes en Firestore para este producto.</p>
        ) : (
          <ul className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-4 text-xs">
            {images.map((url) => (
              <li key={url} className="break-all">
                <a href={url} target="_blank" rel="noreferrer" className="text-[#1b2c4d] underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
