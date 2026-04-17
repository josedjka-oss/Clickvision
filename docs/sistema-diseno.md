# Sistema de diseño Clickvision

Referencia rápida. **Los valores canónicos viven en** `src/app/globals.css` (`:root` + `@theme inline`). Rutas de contenido Tailwind: `tailwind.config.ts`.

## Paleta (marca)

| Nombre | Hex | Utilidad Tailwind típica |
|--------|-----|---------------------------|
| primary | `#1B2C4D` | `bg-primary`, `text-primary`; CTA = `bg-accent` (mismo valor) |
| black | `#111111` | `text-black`, `text-ink` |
| background | `#FFFFFF` | `bg-background`, `bg-canvas`, `bg-surface` |
| secondary-bg | `#F5F5F5` | `bg-secondary-bg`, `bg-surface-muted` |
| text-secondary | `#6B7280` | `text-muted` (mismo token `--cv-text-secondary`) |
| success | `#16A34A` | `text-success`, `bg-success-soft` |
| error | `#DC2626` | `text-error`, `text-destructive` |

## Principios

- **Fondo blanco dominante** (`canvas` / `surface` = `#FFFFFF`).
- **Botones oscuros**: primary = `bg-accent` + `text-on-accent`.
- **Minimalista**: sin colores decorativos extra; badges bestseller en neutro.
- Tipografía **Inter** (`font-sans`); monoespaciado solo para código (`font-mono`).
- Espaciado aireado; contenedores con `max-width` vía `Container`.

## Cómo se aplica

| Token / utilidad | Uso típico |
|------------------|------------|
| `bg-canvas` / `bg-background` | Fondo general de página (blanco) |
| `bg-surface` | Tarjetas y bloques sobre el fondo |
| `bg-surface-muted` / `bg-secondary-bg` | Franjas secundarias, fondos suaves |
| `text-ink` / `text-black` | Titulares y texto principal |
| `text-muted` / `text-text-secondary` | Cuerpo secundario |
| `text-subtle` | Placeholders, meta |
| `border-border` | Bordes neutros |
| `bg-accent` + `text-on-accent` | CTA principal (botón primary) |
| `bg-accent-hover` | Hover del primary |
| `text-success` / `bg-success-soft` | Éxito, badge “nuevo” |
| `text-destructive` / `text-error` / `bg-destructive-soft` | Errores y alertas |

## Tipografía (base global)

Definida en `@layer base` en `globals.css`: `h1`–`h3`, párrafos y `label` con tamaños consistentes y legibles en móvil.

## Componentes UI

- `Button`, `Input`, `Card`, `Container`, `Badge` → `src/components/ui/`
- No incluyen lógica de negocio; solo presentación y accesibilidad básica.

## Tarjeta de producto

- `ProductCard` en `src/features/catalog/components/product-card.tsx`
- Área de imagen con fondo blanco y borde suave; hover ligero en el bloque.

Para ampliar la paleta, edita solo `:root` y refleja en `@theme inline` las mismas variables con prefijo `--color-*`.
