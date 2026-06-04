# Theming

## v1.0 Design System: Three Axes

bindrunes v1.0 introduces three orthogonal customization axes:

| Axis | Attribute | Values | Controls |
|---|---|---|---|
| **Theme** | `data-theme` | editorial, dracula, nord, catppuccin, rose-pine, github | Color identity (all tokens) |
| **Aesthetic** | `data-aesthetic` | editorial, glass, bento, expressive | Form (radius, shadow, motion) |
| **Density** | `data-density` | compact, comfortable, spacious | Spacing scale |

Any combination is legal: `dracula × bento × spacious` is a valid configuration.

## Theme Presets (6)

| Name | Dark primary | Character | Status |
|------|-------------|-----------|--------|
| **editorial** | `oklch(0.65 0.10 265)` | Warm grey + restrained indigo | **Default** |
| **dracula** | `oklch(0.75 0.21 310)` | Purple/pink, expressive | Kept from v0.4 |
| **nord** | `oklch(0.78 0.10 230)` | Nordic blue-grey, calm professional | New |
| **catppuccin** | `oklch(0.80 0.14 280)` | Modern pastel (mocha dark / latte light) | New |
| **rose-pine** | `oklch(0.72 0.12 15)` | Warm muted, calm reading | New |
| **github** | `oklch(0.65 0.18 250)` | Accessibility-safe, near-universal | New |

Each theme ships both a dark variant (`[data-theme="X"]`) and a light variant (`:root:not(.dark) [data-theme="X"]`).

## Importing a Theme

```css
/* app.css — import any theme CSS file */
@import "bindrunes/styles/themes/editorial.css";
```

Themes only override **color tokens**. Form tokens (radius, shadow, motion) are controlled by the aesthetic axis.

## Runtime Theme Switching

```svelte
<script lang="ts">
  import { createTheme } from "bindrunes";

  const theme = createTheme({ default: "editorial" });
</script>

{#each theme.themes as t}
  <button onclick={() => theme.setTheme(t)}>{t}</button>
{/each}
```

`createTheme()` sets `data-theme` on `<html>` and persists the choice to localStorage. The default is `editorial`. On first paint with no localStorage, `createPrefersTheme()` reads `prefers-color-scheme` to set the `.dark` class.

## Aesthetic Presets

| Aesthetic | Radius | Shadow | Motion | Import |
|-----------|--------|--------|--------|--------|
| editorial | 0.5rem | Near-zero | Snappy 120ms | Auto-loaded by `global.css` |
| glass | 0.625rem | Ambient bloom | Fluid 250ms | `@import "bindrunes/styles/aesthetics/glass.css"` |
| bento | 0.875rem | Soft | Spring 220ms | `@import "bindrunes/styles/aesthetics/bento.css"` |
| expressive | 1rem | Amplified | Emphatic 300ms | `@import "bindrunes/styles/aesthetics/expressive.css"` |

Aesthetics never touch color tokens. Use `createAesthetic()` composable to switch at runtime.

## Density Modes

| Mode | Description | Scale factor |
|------|-------------|-------------|
| compact | Tighter spacing for data-heavy UIs | ~0.8× comfortable |
| comfortable | Balanced spacing (default) | 1× |
| spacious | Generous spacing for reading | ~1.25× comfortable |

Use `createDensity()` composable to switch at runtime. All Tailwind spacing utilities (`p-3`, `gap-4`, etc.) become density-aware automatically via `--spacing: var(--space-1)`.

## Legacy Theme Names

The v0.4 themes have been replaced. Old names forward to their replacements:

| Old name | Forward to |
|----------|-----------|
| `akashic` | `nord` |
| `martian` | `dracula` |
| `alchemy` | `github` |
| `druidic` | `rose-pine` |
| `obsidian` | `editorial` |
| `contrast` | `github` |

These forwards work via `themes/legacy/` re-exports through v1.1.x, then retire in v1.2.0.

## Custom Themes with `defineTheme`

For per-tenant or runtime-generated themes:

```ts
import { defineTheme } from "bindrunes";

const theme = defineTheme("corporate", {
  "--primary": "oklch(0.50 0.15 250)",
  "--background": "oklch(0.15 0.01 250)",
});
theme.apply(); // injects <style data-bindrunes-theme="corporate">
```

## Available Tokens

### Color Tokens

| Token | Tailwind Utility | Description |
|-------|-----------------|-------------|
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Default text |
| `--card` | `bg-card` | Card surface |
| `--card-foreground` | `text-card-foreground` | Text on cards |
| `--primary` | `bg-primary`, `text-primary` | Primary brand color |
| `--primary-foreground` | `text-primary-foreground` | Text on primary |
| `--secondary` | `bg-secondary` | Secondary surface |
| `--muted` | `bg-muted` | Muted background |
| `--accent` | `bg-accent` | Accent color |
| `--destructive` | `bg-destructive` | Destructive/error |
| `--success` | `bg-success`, `text-success` | Success state |
| `--warning` | `bg-warning`, `text-warning` | Warning state |
| `--info` | `bg-info`, `text-info` | Info state |
| `--*-(soft)` | `bg-*-soft` | Tinted state surfaces |
| `--border` | `border-border` | Default borders |
| `--border-strong` | `border-border-strong` | Emphasized borders |
| `--border-subtle` | `border-border-subtle` | Subtle dividers |
| `--input` | `bg-input` | Input background |
| `--ring` | `ring-ring` | Focus ring |
| `--overlay` | `bg-overlay` | Modal scrim |
| `--overlay-strong` | `bg-overlay-strong` | Heavy scrim |
| `--glass-surface` | `bg-glass-surface` | Glass panel bg |
| `--glass-border` | `border-glass-border` | Glass panel border |

### Sidebar Tokens

| Token | Tailwind Utility | Description |
|-------|-----------------|-------------|
| `--sidebar-background` | `bg-sidebar` | Sidebar background |
| `--sidebar-foreground` | `text-sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | `bg-sidebar-primary` | Sidebar accent |
| `--sidebar-border` | `border-sidebar-border` | Sidebar borders |
| `--sidebar-accent` | `bg-sidebar-accent` | Sidebar highlight |

### Typography Tokens

The 17-step type scale: `text-display-1` through `text-mono-xs`. Each token bundles size, line-height, letter-spacing, and font-weight. Use Tailwind utilities like `text-display-2`, `text-headline-2`, `text-title-1`, `text-body-md`, `text-label-md`, `text-mono-xs`.

### Typed `@property` Tokens

| Token | Type | Default | Description |
|-------|------|---------|-------------|
| `--radius` | `<length>` | `0.5rem` | Border radius |
| `--glass-blur` | `<length>` | `16px` | Glass blur radius |
| `--duration-instant` | `<time>` | `50ms` | Instant transitions |
| `--duration-snappy` | `<time>` | `120ms` | Quick transitions |
| `--duration-fluid` | `<time>` | `220ms` | Standard transitions |
| `--duration-slow` | `<time>` | `360ms` | Slow transitions |
| `--z-sidebar` | `<integer>` | `20` | Sidebar z-index |
| `--z-overlay` | `<integer>` | `30` | Overlay z-index |
| `--z-toast` | `<integer>` | `40` | Toast z-index |
| `--z-omnibar` | `<integer>` | `50` | Omnibar z-index |

## Utility Classes

Available via the Tailwind plugin:

- `.glass-panel` — Glassmorphism panel with backdrop blur
- `.glass-interactive` — Interactive glass panel with hover glow
- `.text-gradient-violet` — Foreground-to-primary text gradient
- `.text-gradient-gold` — Foreground-to-warning text gradient
- `.animate-pulse-glow` — Subtle primary glow pulse (requires `utilities.css`)
- `.section-reveal` — Scroll-triggered fade-slide animation
