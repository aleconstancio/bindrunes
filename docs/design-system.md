# Design System

Three orthogonal axes, backed by a CSS custom property token contract. Any combination is valid.

## The Three Axes

| Axis | Attribute | Presets | Controls | Composable |
|---|---|---|---|---|
| **Theme** | `data-theme` | `editorial` (default), `dracula`, `nord`, `catppuccin`, `rose-pine`, `github` | Colors | `createTheme()` |
| **Aesthetic** | `data-aesthetic` | `minimal` (default), `glass`, `bento`, `expressive`, `neon`, `brutalist`, `organic` | Form | `useAesthetic()` |
| **Density** | `data-density` | `compact`, `comfortable` (default), `spacious` | Spacing | `useDensity()` |

---

## Using `createTheme`

Define or extend themes programmatically. Replaces `defineTheme`, `extendTheme`, and `createThemeBuilder`.

```ts
import { createTheme } from "bindrunes";

// New theme from scratch
const myBrand = createTheme({
  name: "my-brand",
  tokens: {
    "--primary": "oklch(0.55 0.18 260)",
    "--primary-foreground": "oklch(0.99 0 0)",
    "--accent": "oklch(0.65 0.2 310)",
    "--background": "oklch(0.12 0.008 260)",
    "--foreground": "oklch(0.95 0.005 260)",
    "--card-solid": "oklch(0.16 0.01 260)",
    "--border": "oklch(1 0 0 / 0.08)",
    "--ring": "oklch(0.55 0.18 260)",
  },
});

// Extend an existing theme
const customDracula = createTheme({
  base: "dracula",
  tokens: {
    "--primary": "oklch(0.8 0.25 320)",
    "--accent": "oklch(0.75 0.35 350)",
  },
});
```

---

## Using `useTheme`

Reactive theme switching with dark mode control.

```ts
import { useTheme } from "bindrunes";

const theme = useTheme({ default: "editorial" });

theme.setTheme("dracula");
theme.toggleMode();         // light ↔ dark
theme.setMode("dark");      // light | dark | system
theme.isDark;               // boolean
theme.current;              // "editorial" | "dracula" | ...
```

---

## Using `useDensity`

Supports both persisted preference and responsive (viewport-derived) modes.

```ts
import { useDensity } from "bindrunes";

// Persisted preference
const density = useDensity({ default: "comfortable" });
density.setDensity("compact");

// Responsive — derives density from viewport width
const density = useDensity({
  responsive: {
    compact: 768,     // ≤768px → compact
    comfortable: 1024, // ≤1024px → comfortable
    spacious: Infinity, // >1024px → spacious
  },
});
```

---

## CSS Setup

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

Additional aesthetics load on demand:

```css
@import "bindrunes/styles/aesthetics/glass.css";
```

---

## Axis Definitions

### Theme Presets

- **editorial**: Warm grey & indigo. Inspired by Linear/Vercel/Geist.
- **dracula**: Vibrant purple and dark accents.
- **nord**: Nordic blue-grey. Calm, professional.
- **catppuccin**: Soft modern pastels.
- **rose-pine**: Warm muted tones.
- **github**: Neutral grey, accessible blue accents.

### Aesthetic Presets

- **minimal**: 0.5rem radius, flat buttons, 120ms transitions.
- **glass**: 0.625rem radius, gradient buttons, 250ms fluid transitions, grain texture.
- **bento**: 0.875rem radius, inner-light buttons, 220ms spring transitions.
- **expressive**: 1.0rem radius, gradient buttons, 300ms transitions, mesh texture.
- **neon**: 0.25rem radius, flat buttons, 80ms transitions, neon glow shadows.
- **brutalist**: 0 radius, flat buttons, 50ms transitions, noise texture.
- **organic**: 1.5rem radius, gradient buttons, 200ms spring transitions, paper texture.

### Density Modes

- **compact**: 0.8x spacing
- **comfortable**: 1x spacing (default)
- **spacious**: 1.25x spacing

---

## Token Reference

### Surface & Color Tokens

| Token | Description |
|---|---|
| `--background` | Page background |
| `--foreground` | Default text |
| `--card` | Card background (alpha) |
| `--card-foreground` | Card text |
| `--card-solid` | Card background (solid) |
| `--surface-1` | Lowest elevation |
| `--surface-2` | Mid elevation |
| `--surface-3` | Highest elevation |
| `--muted` | Muted background |
| `--muted-foreground` | Muted text |
| `--secondary` | Secondary background |
| `--secondary-foreground` | Secondary text |

### Accent Tokens

| Token | Description |
|---|---|
| `--primary` | Primary action color |
| `--primary-foreground` | Text on primary |
| `--accent` | Secondary accent |
| `--accent-foreground` | Text on accent |

### State Tokens

| Token | Description |
|---|---|
| `--destructive` | Destructive action |
| `--destructive-foreground` | Text on destructive |
| `--destructive-soft` | Soft destructive (12% alpha) |
| `--success` | Success color |
| `--success-foreground` | Text on success |
| `--success-soft` | Soft success (12% alpha) |
| `--warning` | Warning color |
| `--warning-foreground` | Text on warning |
| `--warning-soft` | Soft warning (12% alpha) |
| `--info` | Info color |
| `--info-foreground` | Text on info |
| `--info-soft` | Soft info (12% alpha) |

### Border & Input Tokens

| Token | Description |
|---|---|
| `--border` | Default border |
| `--border-strong` | Strong border |
| `--border-subtle` | Subtle border |
| `--input` | Input field border |
| `--ring` | Focus ring |

### Overlay Tokens

| Token | Description |
|---|---|
| `--overlay` | Modal backdrop |
| `--overlay-strong` | Strong backdrop |
| `--glass-surface` | Glass panel bg |
| `--glass-border` | Glass panel border |

### Sidebar Tokens

| Token | Description |
|---|---|
| `--sidebar-background` | Sidebar bg |
| `--sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | Sidebar primary action |
| `--sidebar-primary-foreground` | Text on sidebar primary |
| `--sidebar-accent` | Sidebar accent bg |
| `--sidebar-accent-foreground` | Sidebar accent text |
| `--sidebar-border` | Sidebar border |
| `--sidebar-ring` | Sidebar focus ring |

### Radius Tokens

| Token | Default |
|---|---|
| `--radius-xs` | 0.25rem |
| `--radius-sm` | 0.375rem |
| `--radius` / `--radius-md` | 0.5rem |
| `--radius-lg` | 0.875rem |
| `--radius-xl` | 1.25rem |
| `--radius-pill` | 9999px |
| `--radius-full` | 50% |

### Shadow Tokens

| Token | Description |
|---|---|
| `--shadow-xs` through `--shadow-2xl` | Elevation scale |
| `--shadow-glow-primary` | Primary color glow |
| `--shadow-glow-destructive` | Destructive glow |
| `--shadow-glow-accent` | Accent glow |
| `--shadow-emphasis-resolved` | Resolved emphasis shadow |
| `--shadow-inset-subtle` | Subtle inset |

### Motion Tokens

| Token | Default |
|---|---|
| `--duration-instant` | 50ms |
| `--duration-snappy` | 120ms |
| `--duration-fluid` | 220ms |
| `--duration-slow` | 360ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` |
| `--ease-decelerated` | `cubic-bezier(0, 0, 0, 1)` |
| `--ease-accelerated` | `cubic-bezier(0.3, 0, 1, 1)` |
| `--ease-spring` | `linear(0, 0.5 7%, 0.95 25%, 1)` |

### Gradient Tokens

| Token | Description |
|---|---|
| `--gradient-angle` | Base angle (135deg) |
| `--gradient-primary` | Primary gradient |
| `--gradient-accent` | Primary-to-accent blend |
| `--gradient-destructive` | Destructive gradient |
| `--gradient-surface` | Subtle surface gradient |
| `--gradient-hero` | Hero section gradient |
| `--gradient-shimmer` | Skeleton shimmer |

### Blur Tokens

| Token | Value |
|---|---|
| `--blur-subtle` | 4px |
| `--blur-medium` | 8px |
| `--blur-heavy` | 16px |
| `--blur-ultra` | 24px |

### Spacing Tokens (comfortable)

| Token | Value |
|---|---|
| `--space-0` | 0 |
| `--space-1` | 0.25rem |
| `--space-2` | 0.5rem |
| `--space-3` | 0.75rem |
| `--space-4` | 1rem |
| `--space-5` | 1.25rem |
| `--space-6` | 1.5rem |
| `--space-8` | 2rem |
| `--space-10` | 3rem |
| `--space-12` | 4rem |
| `--space-16` | 5rem |
| `--space-20` | 6rem |

### Aesthetic Hook Tokens

| Token | Values | Used by |
|---|---|---|
| `--button-treatment` | `flat`, `gradient`, `inner-light` | Button, Badge, Toggle |
| `--button-bg` | CSS value | Button background |
| `--button-bg-destructive` | CSS value | Destructive Button |
| `--card-treatment` | `solid`, `glass`, `tinted` | Card |
| `--surface-texture` | `none`, `grain`, `dot-grid`, `mesh`, `noise`, `paper` | Page overlay |
| `--hero-translate` | px value | Hero parallax |
| `--shadow-emphasis` | `low`, `medium`, `high` | Elevated shadows |

### Z-Index Tokens

| Token | Value |
|---|---|
| `--z-sidebar` | 40 |
| `--z-overlay` | 50 |
| `--z-modal` | 60 |
| `--z-popover` | 70 |
| `--z-toast` | 80 |
| `--z-tooltip` | 90 |

---

## Token Cascade Order

1. **`:root`** — All fallback values (editorial, minimal, comfortable)
2. **`[data-aesthetic]`** — Form tokens: radius, shadow, duration, easing, gradient, blur, button, card, texture
3. **`[data-theme]`** — Color tokens: background, primary, border, glass, sidebar
4. **`[data-density]`** — Spacing tokens: `--space-*`

Rules:
- Aesthetics never modify colors
- Themes never modify spacing or form
- Density only modifies spacing

---

## Dark Mode

`AppProvider` renders `ModeWatcher` from `mode-watcher` to manage dark/light mode. The interplay:

- `ModeWatcher` manages the `.dark` class on `<html>` and a reactive `mode` store
- `useTheme` subscribes to the `mode` store and exposes `isDark`, `toggleMode()`, `setMode()`
- Theme CSS has two blocks per theme: dark (default on `:root`) and light (`:root:not(.dark)[data-theme="X"]`)
- The `.dark` class and `data-theme` attribute are orthogonal: `data-theme` picks the color palette, `.dark` picks the light/dark variant

### Forcing Light Mode

To force light mode (e.g., for documentation sites):

1. Set `class="light"` on the `<html>` tag in `app.html`
2. Add CSS overrides for `html.dark` to re-apply light token values:

```css
html.dark {
  --background: oklch(0.98 0.005 270) !important;
  --foreground: oklch(0.15 0.008 270) !important;
  /* ... all light mode tokens ... */
  color-scheme: light !important;
}
```

Or call `setMode("light")` from `useTheme()` to prevent the dark class from being added.

### Scoped Theme Overrides

`AppProvider` accepts two types of props:

- **Default props** (`themeDefault`, `aestheticDefault`, `densityDefault`): Set the global default. Used by most apps.
- **Scoped props** (`theme`, `aesthetic`, `density`): Wrap children in a `<div>` with those data attributes, enabling mixed axes on one page (e.g., a dark sidebar next to a light content area).

```svelte
<!-- Global defaults -->
<AppProvider themeDefault="editorial" aestheticDefault="minimal">
  <!-- Scoped override — this section uses glass aesthetic -->
  <div data-aesthetic="glass">
    <Card variant="glass">This card uses glass aesthetic</Card>
  </div>
  
  <!-- This card uses the global minimal aesthetic -->
  <Card>This uses the default</Card>
</AppProvider>
```

---

## CSS Custom Properties

All design tokens are exposed as CSS custom properties on `:root`. Components never use hardcoded colors — they reference tokens:

| Token | Purpose |
|-------|---------|
| `--background` | Page background |
| `--foreground` | Default text |
| `--primary` | Primary action color |
| `--border` | Default border |
| `--muted` | Muted background |
| `--muted-foreground` | Muted text |
| `--ring` | Focus ring |

Use `var(--token-name)` in custom CSS. Never hardcode `oklch()` or hex values in components.

---

## Combinations

| Theme | Aesthetic | Density | Use case |
|---|---|---|---|
| `editorial` | `minimal` | `comfortable` | Default baseline |
| `dracula` | `glass` | `comfortable` | Dev tools, dark-first apps |
| `nord` | `bento` | `compact` | Data-heavy dashboards |
| `catppuccin` | `bento` | `spacious` | Consumer apps |
| `github` | `minimal` | `compact` | Admin panels |
| `rose-pine` | `organic` | `spacious` | Wellness, journals |

---

## Utility Classes

Provided by the Tailwind plugin:

- `.glass-panel` — Glassmorphism backdrop
- `.glass-interactive` — Hover glow panel
- `.text-gradient-violet` / `.text-gradient-gold` — Gradient text
- `.bg-gradient-primary` — Primary gradient bg
- `.bg-gradient-accent` — Accent gradient bg
- `.bg-gradient-hero` — Hero atmospheric gradient
- `.section-reveal` — Scroll-triggered reveal
