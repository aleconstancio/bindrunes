# bindrunes Design System (v1.0)

The bindrunes design system has three orthogonal customization axes, backed by a complete CSS custom property token contract.

## Three Axes

| Axis | Attribute | Values | Controls |
|---|---|---|---|
| Theme | `data-theme` | `editorial`, `dracula`, `nord`, `catppuccin`, `rose-pine`, `github` | Color identity |
| Aesthetic | `data-aesthetic` | `editorial`, `glass`, `bento`, `expressive` | Form (radius, shadow, motion) |
| Density | `data-density` | `compact`, `comfortable`, `spacious` | Spacing scale |

**Any combination is legal:** `dracula × bento × spacious` is a valid configuration.

## Token Cascade

```css
@layer bindrunes.reset,
       bindrunes.tokens.contract,    /* @property type declarations */
       bindrunes.tokens.defaults,    /* :root fallbacks */
       bindrunes.tokens.aesthetic,   /* form overrides per aesthetic */
       bindrunes.tokens.theme,       /* color overrides per theme */
       bindrunes.tokens.density,     /* spacing overrides per density */
       bindrunes.utilities,
       bindrunes.components;
```

Aesthetic NEVER touches color tokens. Theme NEVER touches form tokens. Density NEVER touches color or form.

## Getting Started

```css
/* app.css */
@import "bindrunes/styles/global.css";
@import "bindrunes/styles/themes/editorial.css";    /* optional: explicit theme import */
@import "bindrunes/styles/global.css" already imports the editorial aesthetic by default.
```

```svelte
<!-- root layout -->
<script>
  import { AppProvider } from 'bindrunes';
</script>

<AppProvider
  themeDefault="editorial"
  aestheticDefault="editorial"
  densityDefault="comfortable"
>
  <slot />
</AppProvider>
```

## Token Categories

- **Color tokens** → `assets/styles/themes/<name>.css` (all themes, both light + dark)
- **Typography** → `--font-display`, `--font-mono`, 17-step type scale (`text-display-1` through `text-mono-xs`)
- **Spacing** → `--space-0` through `--space-20` (density-aware via `data-density`)
- **Radius** → `--radius-xs` through `--radius-xl` (6-step, default tightened to 0.5rem)
- **Shadow** → `--shadow-xs` through `--shadow-lg` (editorial default: near-zero)
- **Motion** → `--duration-instant` through `--duration-slow`, `--ease-standard` through `--ease-spring`
- **Container** → `--container-prose` through `--container-2xl`

## Composables

| Function | Import | Purpose |
|---|---|---|
| `createTheme()` | `bindrunes` | Color theme (sets `data-theme`, persists) |
| `createAesthetic()` | `bindrunes` | Form aesthetic (sets `data-aesthetic`, persists) |
| `createDensity()` | `bindrunes` | Spacing density (sets `data-density`, persists) |
| `createPrefersTheme()` | `bindrunes` | `prefers-color-scheme` → `.dark` class |
| `defineTheme()` | `bindrunes` | Runtime per-tenant theme injection |
| `createThemeBuilder()` | `bindrunes` | Programmatic theme token generation |
| `createDarkMode()` | `bindrunes` | Subscribe to mode-watcher toggles |

## ThemeStudio

`<ThemeStudio>` (or legacy `<ThemeBuilder>`) provides a preview UI with tabs for Theme, Aesthetic, Density, and Export. Use it for live theme editing and CSS export.

## Density-Aware Spacing

The `--spacing` Tailwind token maps to `--space-1`, making all Tailwind spacing utilities (`p-3`, `gap-4`, `space-y-2`) respond to the current density. No component changes needed.
