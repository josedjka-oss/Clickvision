# Despliegue a producción — Clickvision

## Comandos locales antes de publicar

```bash
npm run lint
npm run typecheck
npm run build
npm start   # probar build de producción en :3000
```

## Variables de entorno (producción)

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SITE_URL` | URL canónica **https** del dominio (metadata, sitemap, Open Graph). Obligatoria en producción. |
| `NEXT_PUBLIC_FIREBASE_*` | Configuración web de Firebase; sin ellas el catálogo usa mock y Auth/Admin no funcionan. |
| `NEXT_PUBLIC_ADMIN_EMAILS` | Correos permitidos para `/admin` (coma-separados, minúsculas recomendadas). |

No subas secretos de servidor en `NEXT_PUBLIC_*`. Endurecer con reglas Firestore/Storage, App Check y (si aplica) backend propio.

## Rutas relevantes

- Público: `/`, `/gafas`, `/gafas/[slug]`, `/carrito`, `/ayuda`, `/cuenta/*`
- Flujo lentes: `/gafas/[slug]/configurar/*` (metadata `noindex`)
- Admin: `/admin/*` — `robots.txt` incluye `Disallow: /admin`

## Imágenes remotas

`next.config.ts` define `images.remotePatterns` para:

- `firebasestorage.googleapis.com`
- `storage.googleapis.com`

Si usas otro CDN, añade el `hostname` correspondiente y despliega de nuevo.

## Errores frecuentes en producción

1. **`NEXT_PUBLIC_SITE_URL` incorrecta** → metadatos y sitemap con URL errónea.
2. **Reglas Firestore** → lecturas/escrituras denegadas (panel admin, catálogo).
3. **Reglas Storage** → subida de imágenes de producto fallida.
4. **Dominio no autorizado en Firebase Auth** → login con redirect o dominio bloqueado.
5. **Caché CDN** → tras cambios en estáticos, invalidar caché o esperar propagación.

## Checklist rápido CI/CD

- [ ] `npm run build` sin errores
- [ ] Variables de entorno definidas en el proveedor (Vercel, etc.)
- [ ] `NEXT_PUBLIC_SITE_URL` = URL final con `https`
- [ ] Firebase: Email/Password activo si usas cuenta
- [ ] `NEXT_PUBLIC_ADMIN_EMAILS` con los correos reales del equipo admin
- [ ] Reglas Firestore/Storage revisadas para entorno `production`
- [ ] Probar login, carrito, checkout de lentes (flujo), una edición en admin

## Verificación manual antes de publicar

**Dominio y SEO**

- [ ] Abrir la home y una PDP con `NEXT_PUBLIC_SITE_URL` ya en producción: inspeccionar `<head>` (título, descripción, `canonical` si aplica).
- [ ] Revisar `/sitemap.xml` y `/robots.txt` en el dominio real (entradas, `Disallow: /admin`).
- [ ] Confirmar que URLs del asistente `/gafas/.../configurar/...` llevan `noindex` si no quieres indexarlas (ya configurado en layout).

**Firebase**

- [ ] Auth: dominio de producción en “Authorized domains”.
- [ ] Firestore: reglas probadas con usuario real (lectura catálogo, escritura admin).
- [ ] Storage: subida de imagen de producto desde `/admin` y visualización en catálogo/PDP.
- [ ] (Recomendado) App Check si el proyecto lo va a usar.

**Flujos críticos**

- [ ] Registro, login, logout y `/cuenta` con usuario de prueba.
- [ ] Carrito: añadir, cantidad, quitar, persistencia tras recargar.
- [ ] Asistente de lentes hasta carrito (sin pago) con un producto publicado.
- [ ] Admin: listar, crear, editar, `published` true/false reflejado en tienda.

**Rendimiento y UX**

- [ ] PDP con varias imágenes: miniaturas y vista principal.
- [ ] Red móvil lenta: primera carga aceptable (LCP en imagen principal si hay foto).

**Seguridad**

- [ ] No hay API keys secretas en `NEXT_PUBLIC_*`.
- [ ] CORS / dominios de OAuth o magic links si se añaden más adelante.
