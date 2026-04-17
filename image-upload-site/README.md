# Clickvision — portal de imágenes

App **aparte** de la tienda pública: solo inicio de sesión Firebase y subida de fotos a **Storage** + campo **`images`** en Firestore (`products/{id}`).

## Local

```bash
cd image-upload-site
cp .env.example .env.local
# completa las variables
npm install
npm run dev
```

Abre `http://localhost:3001`.

### Uso rápido

1. Inicia sesión (mismo correo que en `NEXT_PUBLIC_ADMIN_EMAILS`).
2. Pega la **URL de la ficha** en la tienda (con `/gafas/…`) o solo el **slug** → **Buscar montura**.
3. **Arrastra** las fotos a la zona grande o haz clic en **Elegir archivos**.

Opcional: despliega **«Lista de todos los productos»** si prefieres elegir por slug desde la tabla.

## Vercel (segundo proyecto)

1. New Project → importa el mismo repo **Clickvision**.
2. **Root Directory:** `image-upload-site`.
3. Framework: Next.js.
4. Variables de entorno: copia las `NEXT_PUBLIC_FIREBASE_*` y `NEXT_PUBLIC_ADMIN_EMAILS` del proyecto de la tienda.
5. Deploy.

En la tienda, define `NEXT_PUBLIC_IMAGE_UPLOAD_SITE_URL` con la URL de este proyecto (ej. `https://tu-upload.vercel.app`) para que el mensaje de catálogo vacío enlace al portal.

## Firestore / Storage

- Las reglas deben permitir al usuario autenticado **listar** `products`, **leer** un documento y **actualizar** `images` / `updatedAt`.
- Storage: escritura en `products/{productId}/images/*` para ese mismo usuario (o admins).

La tienda en producción **no expone** `/admin` salvo que definas `NEXT_PUBLIC_STOREFRONT_ADMIN_ROUTES=true` en ese proyecto.
