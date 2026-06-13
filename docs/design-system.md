# Design System

The bindrunes design system has three orthogonal customization axes, backed by a complete CSS custom property token contract. Any combination is valid: e.g., `dracula × bento × spacious`.

## The Three Axes

| Axis | Attribute | Presets | Controls | Composable |
|---|---|---|---|---|
| **Theme** | `data-theme` | `editorial` (default), `dracula`, `nord`, `catppuccin`, `rose-pine`, `github` | Color identity | `createTheme()` |
| **Aesthetic** | `data-aesthetic` | `editorial` (default), `glass`, `bento`, `expressive` | Form (radius, shadow, motion) | `createAesthetic()` |
| **Density** | `data-density` | `compact`, `comfortable` (default), `spacious` | Spacing scale | `createDensity()` |

---

## Axis Definitions

### 1. Theme Presets
- **editorial**: Warm grey & indigo (minimalist).
- **dracula**: Vibrant purple and dark accents.
- **nord**: Nordic blue-grey (calm and professional).
- **catppuccin**: Soft modern pastels.
- **rose-pine**: Warm muted tones.
- **github**: Accessible, universal palette.

### 2. Aesthetic Presets
- **editorial**: 0.5rem radius, flat buttons, snappy 120ms transitions.
- **glass**: 0.625rem radius, gradient buttons, fluid 250ms transitions, grain texture.
- **bento**: 0.875rem radius, inner-light buttons, bouncy 220ms spring transitions.
- **expressive**: 1.0rem radius, gradient buttons, dramatic 300ms transitions, mesh texture.

### 3. Density Modes
- **compact**: Spacing scaled by ~0.8× (data-dense).
- **comfortable**: Spacing at 1× (default).
- **spacious**: Spacing scaled by ~1.25× (generous).

---

## Token Cascade Order

```css
@layer bindrunes.reset,
       bindrunes.tokens.contract,    /* CSS custom properties types */
       bindrunes.tokens.defaults,    /* Default fallback values */
       bindrunes.tokens.aesthetic,   /* Form overrides (radius, shadow, motion) */
       bindrunes.tokens.theme,       /* Color overrides */
       bindrunes.tokens.density,     /* Spacing overrides */
       bindrunes.utilities,
       bindrunes.components;
```
*Note: Aesthetics never modify colors. Themes never modify spacing or forms.*

---

## Usage & Integration

### CSS Setup
Import the core styles and any desired aesthetics in `app.css`:
```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
@import "bindrunes/styles/aesthetics/glass.css";
```

### Runtime Switching
```svelte
<script lang="ts">
  import { createTheme, createAesthetic, createDensity } from "bindrunes";
  const theme = createTheme({ default: "editorial" });
  const aesthetic = createAesthetic({ default: "editorial" });
  const density = createDensity({ default: "comfortable" });
</script>

<button onclick={() => theme.setTheme("dracula")}>Dracula</button>
<button onclick={() => aesthetic.setAesthetic("glass")}>Glass</button>
<button onclick={() => density.setDensity("compact")}>Compact</button>
```

### Programmatic Themes & Aesthetics

#### Custom Theme
```ts
import { defineTheme } from "bindrunes";
const theme = defineTheme("my-brand", { "--primary": "oklch(0.60 0.15 250)" });
theme.apply(); // Injects stylesheet
```

#### Custom Aesthetic
```css
[data-aesthetic="my-aesthetic"] {
  --radius: 0.25rem;
  --duration-snappy: 100ms;
  --button-treatment: flat;
}
```

---

## Utility Classes
Provided by the Tailwind plugin:
- `.glass-panel`: Glassmorphism backdrop with blur.
- `.glass-interactive`: Hover glow interactive panel.
- `.text-gradient-violet` / `.text-gradient-gold`: Gradient text effects.
- `.section-reveal`: Scroll-triggered reveal animations.
