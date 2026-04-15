# Sistema de diseño Clickvision

Referencia rápida. **Los valores canónicos viven en** `src/app/globals.css` (`:root` + `@theme inline`).

## Principios

- Fondo claro (`canvas` + `surface` blanco).
- **Dos tonos principales**: texto `ink` y acción `accent` (azul muy oscuro); el resto son neutros.
- Tipografía **Inter** (`font-sans`); monoespaciado solo para código (`font-mono`).
- Espaciado aireado; contenedores con `max-width` vía `Container`.

## Cómo se aplica

| Token / utilidad | Uso típico |
|------------------|------------|
| `bg-canvas` | Fondo general de página |
| `bg-surface` | Tarjetas, cabeceras, bloques sobre canvas |
| `bg-surface-muted` | Franjas secundarias, inputs inactivos |
| `text-ink` / `text-muted` / `text-subtle` | Jerarquía de texto |
| `border-border` | Bordes neutros |
| `bg-accent` + `text-on-accent` | CTA principal (botón primary) |
| `bg-accent-hover` | Hover del primary (clase en botón) |
| `text-success` / `bg-success-soft` | Estados de éxito, badge “nuevo” |
| `text-destructive` / `bg-destructive-soft` | Errores, badge “oferta” agresiva (opcional) |

## Tipografía (base global)

Definida en `@layer base` en `globals.css`: `h1`–`h3`, párrafos y `label` con tamaños consistentes y legibles en móvil.

## Componentes UI

- `Button`, `Input`, `Card`, `Container`, `Badge` → `src/components/ui/`
- No incluyen lógica de negocio; solo presentación y accesibilidad básica.

## Tarjeta de producto

- `ProductCard` en `src/features/catalog/components/product-card.tsx`
- Área de imagen con fondo blanco y borde suave; hover ligero en el bloque.

Para ampliar la paleta, edita solo `:root` y refleja en `@theme inline` las mismas variables con prefijo `--color-*`.
