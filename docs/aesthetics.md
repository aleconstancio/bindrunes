# Aesthetics

The aesthetic axis controls **form** — radius, shadow, motion, surface texture, and button treatment. Aesthetics never touch color tokens.

## Presets

| Aesthetic | Radius | Shadow | Motion | Texture | Button | Import |
|-----------|--------|--------|--------|---------|--------|--------|
| **editorial** | 0.5rem | Near-zero | Snappy 120ms | none | flat | Auto-loaded by `global.css` |
| **glass** | 0.625rem | Ambient bloom | Fluid 250ms | grain | gradient | `@import "bindrunes/styles/aesthetics/glass.css"` |
| **bento** | 0.875rem | Soft | Spring 220ms | dot-grid | inner-light | `@import "bindrunes/styles/aesthetics/bento.css"` |
| **expressive** | 1rem | Amplified | Emphatic 300ms | mesh | gradient | `@import "bindrunes/styles/aesthetics/expressive.css"` |

## Setup

The editorial aesthetic is loaded automatically by `global.css`. To use a different aesthetic, import its CSS file **after** `global.css`:

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
@import "bindrunes/styles/aesthetics/glass.css";
```

You can import multiple aesthetics — only the one matching `data-aesthetic` on `<html>` will apply.

## Runtime Switching

```svelte
<script lang="ts">
  import { createAesthetic } from "bindrunes";

  const aesthetic = createAesthetic({ default: "editorial" });
</script>

{#each aesthetic.aesthetics as a}
  <button onclick={() => aesthetic.setAesthetic(a)}>{a}</button>
{/each}
```

`createAesthetic()` sets `data-aesthetic` on `<html>` and persists the choice to localStorage.

## Token Override Categories

Each aesthetic overrides these token groups:

| Token Group | What it controls | CSS properties |
|-------------|-----------------|----------------|
| **Radius** | Border corners | `--radius`, `--radius-md`, `--radius-lg`, `--radius-xl` |
| **Shadow** | Elevation/shadow | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| **Motion** | Transition timing | `--duration-snappy`, `--duration-fluid`, `--duration-slow` |
| **Easing** | Bezier curves | `--ease-standard`, `--ease-spring`, `--ease-emphasized`, `--ease-decelerated` |
| **Aesthetic hooks** | Component treatment | `--button-treatment`, `--card-treatment`, `--surface-texture`, `--hero-translate`, `--shadow-emphasis` |

## Aesthetic Hooks

These CSS custom properties are read by components to adjust their rendering:

| Hook | Values | Effect |
|------|--------|--------|
| `--button-treatment` | `flat`, `gradient`, `inner-light` | Button surface style |
| `--card-treatment` | `solid`, `glass`, `tinted` | Card surface rendering |
| `--surface-texture` | `none`, `grain`, `dot-grid`, `mesh` | Background texture overlay |
| `--hero-translate` | `8px` – `24px` | Hero section parallax amount |
| `--shadow-emphasis` | `low`, `medium`, `high` | Global shadow intensity tier |

## CSS Layer Order

Aesthetics are applied in the `bindrunes.tokens.aesthetic` layer, which sits above defaults but below themes:

```css
@layer bindrunes.reset,
       bindrunes.tokens.contract,
       bindrunes.tokens.defaults,
       bindrunes.tokens.aesthetic,  /* ← aesthetic overrides */
       bindrunes.tokens.theme,      /* theme never touches form tokens */
       bindrunes.tokens.density,
       bindrunes.utilities,
       bindrunes.components;
```

## Creating a Custom Aesthetic

Override the same CSS properties under a `[data-aesthetic="your-name"]` selector:

```css
[data-aesthetic="corporate"] {
  --radius: 0.375rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
  --shadow-md: 0 2px 4px oklch(0 0 0 / 0.08);
  --shadow-lg: 0 4px 8px oklch(0 0 0 / 0.12);

  --duration-snappy: 100ms;
  --duration-fluid: 180ms;
  --duration-slow: 300ms;

  --button-treatment: flat;
  --card-treatment: solid;
  --surface-texture: none;
  --hero-translate: 6px;
  --shadow-emphasis: low;
}
```

Then use `createAesthetic()` or set `data-aesthetic="corporate"` on `<html>`.

## Aesthetic × Theme Interactions

Aesthetics and themes are fully orthogonal. Any combination works:

| Combination | Effect |
|-------------|--------|
| `editorial × glass` | Glassmorphism with editorial's warm grey colors |
| `dracula × bento` | Dracula purple with bouncy rounded cards |
| `github × expressive` | GitHub's accessible palette with dramatic shadows |
| `nord × editorial` | Nordic calm with flat, tight surfaces |

The aesthetic controls form, the theme controls color. They never overlap.
