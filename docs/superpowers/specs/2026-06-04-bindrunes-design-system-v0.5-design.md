# bindrunes Design System v0.5 — 2026 Elevation

| Field | Value |
|---|---|
| Status | Draft (brainstorming approved, awaiting user review) |
| Date | 2026-06-04 |
| Author | opencode (brainstorming skill) |
| Target | bindrunes v0.5.0 (or v1.0.0 — see §18) |
| Type | Design spec (no code changes) |
| Supersedes | v0.4.0 design system (token surface, theme suite, component contract) |

---

## 1. Why this spec exists

bindrunes v0.4.0 ships a working B2B component library: 88 components across 4 subdomains (foundation, landing, dashboard, sidebar), 7 themes, ~16 composables, a Tailwind v4 plugin, and a Svelte 5 runes-first API.

Three things are wrong with the v0.4 design system, listed in priority order:

1. **Token surface is incomplete.** Typography, spacing, shadow, motion, density, font, container, overlay, and soft-state tokens do not exist. Components compensate with hand-rolled `oklch(from var(--primary) l c h / 0.04)` recipes. Drift is structural, not accidental.
2. **The default aesthetic is 2023.** Gradient-filled buttons, 30px hero translate, washed-out glass cards on light backgrounds, gradient glow on a pricing-card highlight. The market in 2026 has settled on flat, hairline-bordered, near-zero-shadow surfaces (Linear, Vercel, Geist, Cal.com) for B2B; glass/gradient/bento is for marketing/landing.
3. **Customization is theme-only.** Color identity is the only axis. A team who likes dracula's purple but wants a more editorial, calmer surface has no way to ask for that.

This spec resolves all three with one change: a two-axis system (**theme × aesthetic**) plus a third orthogonal axis (**density**), backed by a complete token contract, a curated 6-theme palette suite with names the dev community recognizes, and four opinionated form aesthetics (editorial, glass, bento, expressive).

---

## 2. Goals & non-goals

### 2.1 Goals

- **G1.** Land an opinionated default that reads as "calm, flat, confident 2026 web" on first paint, with the **Editorial aesthetic** as the default and the **Editorial theme** as the default palette.
- **G2.** Provide a complete token contract: color, typography, spacing, radius, shadow, motion, font, container, z-index, density, overlay, soft-state, info.
- **G3.** Ship a curated theme suite of 6 palettes the dev community recognizes by name: **editorial, dracula, nord, catppuccin, rose-pine, github**. Each ships with both light and dark variants.
- **G4.** Ship 4 opinionated form aesthetics as switchable CSS presets: **editorial** (default, flat), **glass** (current bindrunes vibe), **bento** (rounded, soft, friendly), **expressive** (gradient/mesh/grain). Aesthetics never touch color tokens.
- **G5.** Ship 3 density modes as a runtime axis: **compact, comfortable (default), spacious**. Affects spacing scale only.
- **G6.** Honor all AGENTS.md laws: createX pattern, Svelte 5 runes, valibot (n/a here), OKLCH, bits-ui, tree-shakeable, no hardcoded colors, no legacy `thoth-` prefix.
- **G7.** Clean v0.5/v1.0 break: refactor all 88 components onto new tokens, retire `thoth-` prefix, retire 6 theme names, ship one CHANGELOG and one migration doc.
- **G8.** Honor ARCHON verification matrix: pure token changes = manual screenshot; component surface changes = mixed (UI + contract test); batch 7+ components = ThemeStudio matrix walk.

### 2.2 Non-goals

- **N1.** No bundled web fonts. Token contract is consumed; consumers wire their own `@font-face`. Inter / Inter Display / JetBrains Mono documented as standard implementations.
- **N2.** No new runtime dependencies beyond what already ships.
- **N3.** No visual-regression test infrastructure (Playwright + snapshot). Call out as a follow-up spec.
- **N4.** No redesign of the RichTextEditor toolbar or any bits-ui-wrapped primitive's internals — we use bits-ui as-is.
- **N5.** No new exported components. v0.5 is a refactor + a few composables, not a surface expansion.
- **N6.** No i18n changes. The design system is language-neutral; the existing pt-BR dictionary is unaffected.

---

## 3. The three orthogonal axes

```
data-theme=editorial|dracula|nord|catppuccin|rose-pine|github   ← color identity
data-aesthetic=editorial|glass|bento|expressive                 ← form (shadow/radius/motion/font)
data-density=compact|comfortable|spacious                        ← spacing scale
class=dark                                                       ← orthogonal light/dark toggle
```

Defaults at first paint when no localStorage value exists: `editorial` × `editorial` × `comfortable`, with `class="dark"` set if `prefers-color-scheme: dark`, else unset.

**Legal combinations**: any theme × any aesthetic × any density. Examples:
- `dracula × bento × spacious` — playful, breathing room, vibrant
- `github × editorial × compact` — corporate, dense, calm
- `catppuccin × glass × comfortable` — soft, atmospheric, modern
- `editorial × editorial × comfortable` — the default, Linear-grade

**Illegal combinations**: none. Axes do not collide.

The `<html>` element ends up with `class="dark" data-theme="dracula" data-aesthetic="glass" data-density="spacious"` at first paint. Components read all four; cascading resolves unambiguously because no two axes override the same token category.

---

## 4. Token cascade

```css
@layer
  bindrunes.reset,
  bindrunes.tokens.contract,   /* @property declarations: type-safety only      */
  bindrunes.tokens.defaults,   /* :root fallbacks (aesthetic=editorial, theme=none, density=comfortable) */
  bindrunes.tokens.aesthetic,  /* form tokens per aesthetic (radius/shadow/motion)  */
  bindrunes.tokens.theme,      /* color tokens per theme                            */
  bindrunes.tokens.density,    /* spacing tokens per density                        */
  bindrunes.utilities,
  bindrunes.components;
```

**Resolution order**:
- Aesthetic overrides form tokens; theme overrides color tokens; density overrides spacing tokens.
- Aesthetic NEVER touches color. Theme NEVER touches form. Density NEVER touches color or form.
- When two layers define the same token, the later layer wins. Components that want to opt out of a layer (e.g., a pricing card that uses the same surface in every aesthetic) read the token directly.

---

## 5. Token contract — color

### 5.1 Existing tokens (preserved)

```
--background, --foreground,
--card, --card-foreground,
--muted, --muted-foreground,
--secondary, --secondary-foreground,
--primary, --primary-foreground,
--accent, --accent-foreground,
--destructive, --destructive-foreground,
--border, --input, --ring,
--glass-surface, --glass-border,
--sidebar-background, --sidebar-foreground, --sidebar-primary,
--sidebar-primary-foreground, --sidebar-accent, --sidebar-accent-foreground,
--sidebar-border, --sidebar-ring,
--success, --success-foreground,
--warning, --warning-foreground,
--radius, --glass-blur
```

### 5.2 New tokens

| Token | Type | Default | Notes |
|---|---|---|---|
| `--info` | `<color>` | `oklch(0.70 0.12 230)` | Desaturated blue, distinct from primary. Alert info variant rebases to this. |
| `--info-foreground` | `<color>` | `oklch(0.15 0 0)` | Light/dark auto-flipped by theme. |
| `--border-strong` | `<color>` | `oklch(from var(--foreground) l c h / 0.20)` | For table chrome, divider hierarchy. |
| `--border-subtle` | `<color>` | `oklch(from var(--foreground) l c h / 0.05)` | For hairlines, focused-but-not-emphasized borders. |
| `--overlay` | `<color>` | `oklch(0 0 0 / 0.55)` | Modal scrim. Replaces `bg-black/50`. |
| `--overlay-strong` | `<color>` | `oklch(0 0 0 / 0.75)` | Heavier scrim (omnibar, command palette). Replaces `bg-black/75`. |
| `--success-soft` | `<color>` | `oklch(from var(--success) l c h / 0.12)` | Tinted success surface. Replaces `bg-emerald-500/15`. |
| `--warning-soft` | `<color>` | `oklch(from var(--warning) l c h / 0.12)` | Tinted warning surface. Replaces `bg-amber-500/15`. |
| `--info-soft` | `<color>` | `oklch(from var(--info) l c h / 0.12)` | Tinted info surface. |
| `--destructive-soft` | `<color>` | `oklch(from var(--destructive) l c h / 0.12)` | Tinted destructive surface. Replaces `bg-destructive/15`. |
| `--card-solid` | `<color>` | `oklch(from var(--background) calc(l + 0.04) 0 h)` | Solid card surface for light mode (replaces washed `oklch(1 0 0 / 0.80)`). |
| `--surface-1` | `<color>` | `oklch(from var(--background) calc(l + 0.025) 0 h)` | Subtle elevation step 1. |
| `--surface-2` | `<color>` | `oklch(from var(--background) calc(l + 0.05) 0 h)` | Subtle elevation step 2. |
| `--surface-3` | `<color>` | `oklch(from var(--background) calc(l + 0.08) 0 h)` | Subtle elevation step 3. |

All soft-state tokens are derived from their non-soft counterpart via `oklch(from var(--X) l c h / 0.12)`, so they automatically track the active theme.

---

## 6. Token contract — typography

### 6.1 Font tokens

```css
--font-sans:    'Inter', system-ui, sans-serif;
--font-display: 'Inter Display', 'Inter', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
```

`--font-mono` is **new** (promised in README, missing in preset.css — fix in this round).

### 6.2 Type scale (paired bundle per token)

Each `--text-*` token resolves to a bundle:
- `--text-<name>-size`
- `--text-<name>-line-height`
- `--text-<name>-tracking`
- `--text-<name>-weight`

| Token | Size | Lh | Tracking | Weight | Font | Use |
|---|---|---|---|---|---|---|
| `--text-display-1` | 4.5rem (72px) | 1.05 | -0.035em | 700 | display | Hero h1, marketing |
| `--text-display-2` | 3.75rem (60px) | 1.05 | -0.030em | 700 | display | Hero h1 alt |
| `--text-display-3` | 3rem (48px) | 1.10 | -0.025em | 700 | display | Marketing h2 |
| `--text-headline-1` | 2.25rem (36px) | 1.20 | -0.020em | 600 | display | Page h1 (inside app) |
| `--text-headline-2` | 1.875rem (30px) | 1.25 | -0.015em | 600 | display | Page h2 |
| `--text-headline-3` | 1.5rem (24px) | 1.30 | -0.010em | 600 | display | Section h3 |
| `--text-title-1` | 1.25rem (20px) | 1.40 | -0.005em | 600 | sans | Card title, dialog title |
| `--text-title-2` | 1.125rem (18px) | 1.45 | 0em | 600 | sans | Subtitle |
| `--text-title-3` | 1rem (16px) | 1.50 | 0em | 600 | sans | Inline heading |
| `--text-body-lg` | 1.0625rem (17px) | 1.60 | 0em | 400 | sans | Long-form reading |
| `--text-body-md` | 0.9375rem (15px) | 1.55 | 0em | 400 | sans | Default body |
| `--text-body-sm` | 0.8125rem (13px) | 1.55 | 0em | 400 | sans | Dense body |
| `--text-label-lg` | 0.9375rem (15px) | 1.30 | 0em | 500 | sans | Button lg |
| `--text-label-md` | 0.8125rem (13px) | 1.30 | 0em | 500 | sans | Button md, form label |
| `--text-label-sm` | 0.75rem (12px) | 1.30 | 0.005em | 500 | sans | Button sm, chip |
| `--text-mono-md` | 0.875rem (14px) | 1.40 | 0em | 400 | mono | Metric value, code |
| `--text-mono-sm` | 0.75rem (12px) | 1.40 | 0em | 400 | mono | Badge text mono, keycap |
| `--text-mono-xs` | 0.6875rem (11px) | 1.30 | 0.08em (uppercase) | 500 | mono | Section eyebrow |

The Tailwind plugin generates `text-display-1` through `text-mono-xs` utilities from these.

### 6.3 Migration examples

| Component | Before | After |
|---|---|---|
| `HeroBanner.svelte:51` | `text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl` | `text-display-2` |
| `HeroBanner.svelte:58` | `text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl` | `text-display-3` |
| `PricingTable.svelte:81` | `text-5xl font-extrabold text-foreground sm:text-6xl` | `text-display-2` |
| `MetricCard.svelte:30` | `mono text-[0.65rem] font-medium text-muted-foreground uppercase tracking-[0.08em]` | `text-mono-xs` |
| `MetricCard.svelte:31` | `text-2xl font-bold text-foreground mt-1` | `text-headline-2` |
| `Button.svelte:43` | `h-8 px-3 text-xs gap-1.5` | `h-8 px-3 text-label-sm gap-1.5` |
| `Input.svelte:32` | `block text-sm font-medium mb-1.5 text-muted-foreground` | `block text-label-md mb-1.5 text-muted-foreground` |

---

## 7. Token contract — spacing (density-aware)

### 7.1 The three scales

```css
/* compact */
--space-0: 0;       --space-1: 0.125rem;  --space-2: 0.25rem;
--space-3: 0.375rem; --space-4: 0.5rem;   --space-5: 0.625rem;
--space-6: 0.75rem;  --space-8: 1rem;     --space-10: 1.5rem;
--space-12: 2rem;    --space-16: 2.5rem;  --space-20: 3rem;

/* comfortable (default) */
--space-0: 0;        --space-1: 0.25rem;  --space-2: 0.5rem;
--space-3: 0.75rem;  --space-4: 1rem;     --space-5: 1.25rem;
--space-6: 1.5rem;   --space-8: 2rem;     --space-10: 3rem;
--space-12: 4rem;    --space-16: 5rem;    --space-20: 6rem;

/* spacious */
--space-0: 0;        --space-1: 0.375rem; --space-2: 0.75rem;
--space-3: 1rem;     --space-4: 1.25rem;  --space-5: 1.75rem;
--space-6: 2rem;     --space-8: 2.75rem;  --space-10: 4rem;
--space-12: 5rem;    --space-16: 6.5rem;  --space-20: 8rem;
```

### 7.2 Tailwind binding

The Tailwind plugin remaps `p-*`, `m-*`, `gap-*`, `space-*` to `var(--space-N)`. Existing `p-3`, `gap-4`, `space-y-2` keep working and become density-aware automatically.

### 7.3 Component-level density override

Layout components (DashboardShell, DataTable, Sidebar) accept an optional `density` prop that sets `data-density` on their own subtree, overriding the global. Example: a dense DataTable in a comfortable-density app.

---

## 8. Token contract — radius

```css
--radius-xs:   0.25rem;
--radius-sm:   0.375rem;
--radius:      0.5rem;   /* default; was 0.625rem — tightened for editorial */
--radius-md:   0.625rem;
--radius-lg:   0.875rem;
--radius-xl:   1.25rem;
--radius-full: 9999px;
```

Aesthetic overrides:
- **editorial**: `--radius` = `0.5rem`, `--radius-md` = `0.5rem`
- **glass**: `--radius` = `0.625rem` (unchanged)
- **bento**: `--radius` = `0.875rem`, `--radius-md` = `0.875rem`
- **expressive**: `--radius` = `1rem`, `--radius-lg` = `1.25rem`

---

## 9. Token contract — shadow / elevation

```css
--shadow-xs:  0 1px 2px oklch(0 0 0 / 0.04);
--shadow-sm:  0 2px 6px -2px oklch(0 0 0 / 0.08);
--shadow-md:  0 6px 16px -4px oklch(0 0 0 / 0.10);
--shadow-lg:  0 16px 32px -8px oklch(0 0 0 / 0.14);
--shadow-glow-primary:     0 0 24px -6px oklch(from var(--primary) l c h / 0.30);
--shadow-glow-destructive: 0 0 24px -6px oklch(from var(--destructive) l c h / 0.25);
--shadow-inset-subtle:     inset 0 1px 0 oklch(1 0 0 / 0.06);
```

Aesthetic overrides:
- **editorial**: `--shadow-sm/md` → near-zero (`0 1px 0 oklch(0 0 0 / 0.04)`)
- **glass**: `--shadow-md` = current ambient bloom (preserved)
- **bento**: `--shadow-md` = softened (`0 4px 12px -4px oklch(0 0 0 / 0.08)`)
- **expressive**: `--shadow-md` = amplified (`0 8px 24px -4px oklch(0 0 0 / 0.18)`)

Every component's `box-shadow:` recipe becomes `box-shadow: var(--shadow-*)`. No more inline `oklch(...)` shadow literals in component styles (currently 9+ instances across `Button`, `Card`, `MetricCard`, `PricingTable`).

---

## 10. Token contract — motion

### 10.1 Durations

```css
--duration-instant: 50ms;
--duration-snappy:  120ms;   /* was 150ms — editorial tightens */
--duration-fluid:   220ms;   /* was 250ms */
--duration-slow:    360ms;   /* was 400ms */
```

### 10.2 Easings

```css
--ease-standard:    cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized:  cubic-bezier(0.3, 0, 0, 1);
--ease-decelerated: cubic-bezier(0, 0, 0, 1);
--ease-accelerated: cubic-bezier(0.3, 0, 1, 1);
--ease-spring:      linear(0, 0.5 7%, 0.95 25%, 1);
```

Aesthetic motion weight:
- **editorial**: `--duration-snappy` 120ms + `--ease-standard`
- **glass**: `--duration-fluid` 220ms + `--ease-decelerated`
- **bento**: `--duration-fluid` 220ms + `--ease-spring`
- **expressive**: `--duration-slow` 360ms + `--ease-emphasized`

### 10.3 Reduced motion

`prefers-reduced-motion: reduce` shortens all durations to `0.01ms` and all easings to `linear` (existing behavior in `global.css`; preserved).

### 10.4 fade-slide-in drop

`fade-slide-in` in `utilities.css` translates from `30px` → `12px` (editorial) / `20px` (others). Heavy 30px lifts are a 2023 pattern; modern hero reveals are subtle.

---

## 11. Token contract — container

```css
--container-prose: 65ch;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;
```

Landing section max-widths reroute to `max-w-[var(--container-*)]`. Currently hardcoded as `max-w-4xl`, `max-w-6xl`, `max-w-3xl`, `max-w-2xl` across HeroBanner, PricingTable, FAQ, Newsletter, SiteFooter, FeatureGrid, etc.

---

## 12. Token contract — z-index (extend existing)

```css
--z-base:     0;
--z-raised:   10;
--z-sidebar:  20;
--z-overlay:  30;
--z-popover:  35;
--z-toast:    40;
--z-omnibar:  50;
--z-tooltip:  60;
```

`@property` blocks for these stay typed (integer, initial-value preserved).

---

## 13. Aesthetic preset architecture

### 13.1 Four CSS files

```
src/styles/aesthetics/
  editorial.css   ← default; auto-loaded by global.css
  glass.css
  bento.css
  expressive.css
```

Each file:
- Sets `data-aesthetic="<name>"` selector on `:root` or any subtree
- Overrides **form tokens only** (radius scale, shadow scale, motion easings, motion weight, surface texture, button treatment, card treatment)
- Never touches color tokens
- Capped at ~200 lines per file

### 13.2 Aesthetic-coupled component hooks

Components read these aesthetic-set tokens to switch form behavior:

| Hook | Values | Used by |
|---|---|---|
| `--button-treatment` | `flat` \| `gradient` \| `inner-light` | Button |
| `--card-treatment` | `solid` \| `glass` \| `tinted` | Card |
| `--surface-texture` | `none` \| `grain` \| `dot-grid` \| `mesh` | SectionHeader, Card |
| `--hero-translate` | `<length>` (e.g., 8px, 20px) | fade-slide-in, PricingTable highlight |
| `--shadow-emphasis` | `low` \| `medium` \| `high` | Card, MetricCard |

| Aesthetic | button-treatment | card-treatment | surface-texture | hero-translate |
|---|---|---|---|---|
| editorial | flat | solid | none | 8px |
| glass | gradient | glass | grain | 16px |
| bento | inner-light | tinted | dot-grid | 14px |
| expressive | gradient | glass | mesh | 24px |

### 13.3 `createAesthetic()` composable

```ts
// src/utils/createAesthetic.svelte.ts
import { createStorage } from './createStorage';

const AESTHETICS = ['editorial', 'glass', 'bento', 'expressive'] as const;
export type Aesthetic = (typeof AESTHETICS)[number];

export function createAesthetic(options?: { default?: Aesthetic }) {
  const storage = createStorage('bindrunes');
  let aesthetic = $state<Aesthetic>(
    (storage.get<string>('aesthetic') as Aesthetic) ?? options?.default ?? 'editorial'
  );

  $effect(() => {
    document.documentElement.setAttribute('data-aesthetic', aesthetic);
    storage.set('aesthetic', aesthetic);
  });

  return {
    get aesthetic() { return aesthetic; },
    setAesthetic(a: Aesthetic) { aesthetic = a; },
    aesthetics: AESTHETICS,
  };
}
```

Visual side effect: requires the consumer to import the matching CSS file. Documented in `docs/aesthetics.md`.

---

## 14. Theme suite (6 themes × light + dark)

### 14.1 Suite roster

| # | Name | Dark primary (OKLCH) | Light primary | Character | Status |
|---|---|---|---|---|---|
| 1 | **editorial** | `0.65 0.10 265` | `0.45 0.12 265` | Warm grey + restrained indigo | **NEW DEFAULT** |
| 2 | **dracula** | `0.75 0.21 310` | `0.60 0.18 290` | Purple/pink, expressive | **KEPT** |
| 3 | **nord** | `0.78 0.10 230` | `0.55 0.12 230` | Nordic blue-grey, calm professional | NEW |
| 4 | **catppuccin** | `0.80 0.14 280` | `0.55 0.12 280` | Modern pastel; mocha dark / latte light | NEW |
| 5 | **rose-pine** | `0.72 0.12 15` | `0.50 0.10 15` | Warm muted, calm reading | NEW |
| 6 | **github** | `0.65 0.18 250` | `0.45 0.18 250` | Accessibility-safe, near-universal | NEW |

### 14.2 File shape (per theme)

Each theme file is ~80 lines:

```css
[data-theme="<name>"] {
  /* 26 color tokens: background/foreground/card/muted/secondary/primary/accent/
     destructive/border/input/ring/glass-surface/glass-border/
     success/warning/info/...
     sidebar-* */
  /* Soft-state surfaces derived from base colors */
}

:root:not(.dark) [data-theme="<name>"], :root:not(.dark)[data-theme="<name>"] {
  /* Light variant block */
}
```

### 14.3 Theme files to add

```
src/styles/themes/editorial.css   NEW
src/styles/themes/nord.css        NEW
src/styles/themes/catppuccin.css  NEW
src/styles/themes/rose-pine.css   NEW
src/styles/themes/github.css      NEW
```

### 14.4 Theme files to keep

```
src/styles/themes/dracula.css     KEPT (preserves existing user investment)
```

### 14.5 Theme files to retire

```
src/styles/themes/akashic.css     →  maps to nord
src/styles/themes/martian.css     →  maps to dracula (closest vibrant warm)
src/styles/themes/alchemy.css     →  maps to github (closest neutral default)
src/styles/themes/druidic.css     →  maps to rose-pine
src/styles/themes/obsidian.css    →  maps to editorial (was greyscale, now warm-grey)
src/styles/themes/contrast.css    →  maps to github (light=dark, dark=light max-contrast)
```

`themes/legacy/` directory holds re-exports for one release:

```css
/* themes/legacy/akashic.css */
@import "../nord.css";
```

This lets v0.4 consumers keep their import paths working through v1.1.0. Removed in v1.2.0.

### 14.6 `createTheme()` upgrade

```ts
// src/utils/createTheme.svelte.ts (updated)
const THEMES = ['editorial', 'dracula', 'nord', 'catppuccin', 'rose-pine', 'github'] as const;
export type Theme = (typeof THEMES)[number];

function detectInitialTheme(defaultTheme: Theme = 'editorial'): Theme {
  if (typeof window === 'undefined') return defaultTheme;
  return (localStorage.getItem('bindrunes:theme') as Theme) ?? defaultTheme;
}

export function createTheme(options?: { default?: Theme; respectPrefersColorScheme?: boolean }) {
  const storage = createStorage('bindrunes');
  let theme = $state<Theme>(detectInitialTheme(options?.default));
  // ... unchanged effect block
}
```

---

## 15. Density system

### 15.1 `createDensity()` composable

```ts
// src/utils/createDensity.svelte.ts
import { createStorage } from './createStorage';

const DENSITIES = ['compact', 'comfortable', 'spacious'] as const;
export type Density = (typeof DENSITIES)[number];

export function createDensity(options?: { default?: Density }) {
  const storage = createStorage('bindrunes');
  let density = $state<Density>(
    (storage.get<string>('density') as Density) ?? options?.default ?? 'comfortable'
  );

  $effect(() => {
    document.documentElement.setAttribute('data-density', density);
    storage.set('density', density);
  });

  return {
    get density() { return density; },
    setDensity(d: Density) { density = d; },
    densities: DENSITIES,
  };
}
```

### 15.2 Component-level override

```svelte
<DataTable density="compact" />  // sets data-density on its own subtree
```

---

## 16. Customization API

### 16.1 `defineTheme()` — runtime per-tenant themes

```ts
// src/utils/defineTheme.svelte.ts
export function defineTheme(name: string, tokens: Record<string, string>) {
  if (typeof document === 'undefined') return { apply: () => {}, remove: () => {} };
  const style = document.createElement('style');
  style.setAttribute('data-bindrunes-theme', name);
  const body = Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  style.textContent = `[data-theme="${name}"] {\n${body}\n}`;
  return {
    apply() { document.head.appendChild(style); },
    remove() { style.remove(); },
  };
}
```

Use case: a SaaS consumer with a "white-label" tenant that needs its own OKLCH palette injected at runtime.

### 16.2 `createThemeBuilder()` expansion

The existing builder in `src/utils/createThemeBuilder.svelte.ts` (149 lines) covers 31 tokens. Expand to ~50 tokens to include the full new contract: `--info`, `--border-strong`, `--border-subtle`, `--overlay`, `--overlay-strong`, `--success-soft`, `--warning-soft`, `--info-soft`, `--destructive-soft`, `--card-solid`, `--surface-1/2/3`, plus a few of the form tokens (`--radius`, `--duration-*`, `--ease-*`).

### 16.3 `createPrefersTheme()` composable

```ts
// src/utils/createPrefersTheme.svelte.ts
export function createPrefersTheme() {
  if (typeof window === 'undefined') return { stop: () => {} };

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    document.documentElement.classList.toggle('dark', mql.matches);
  };
  apply();
  mql.addEventListener('change', apply);
  return {
    stop() { mql.removeEventListener('change', apply); },
  };
}
```

Sets `.dark` on `<html>` based on `prefers-color-scheme`. Idempotent with `mode-watcher` (mode-watcher will read the existing class on mount and not fight it). Used by `AppProvider` to ensure the first paint — before any JS runs the user-toggle, but after `global.css` is parsed — reflects the user's OS preference. Without this, the first paint of a v0.5 site is whatever the default dark/light is, with a flash to the user's pref once mode-watcher mounts.

### 16.4 `ThemeBuilder` → `ThemeStudio` upgrade

The existing `ThemeBuilder.svelte` (145 lines) is a working preview with primary/accent/destructive color pickers, radius input, and CSS export. Expand to **ThemeStudio** with tabs:

- **Theme tab** (existing): preset, primary/accent/destructive/success/warning/info pickers, OKLCH sliders, radius
- **Aesthetic tab**: pick editorial/glass/bento/expressive; live preview
- **Density tab**: pick compact/comfortable/spacious; live preview on table+form
- **Typography tab**: override `--font-sans`/`--font-display`/`--font-mono` text inputs
- **Motion tab**: motion weight slider (presets: snappy/fluid/slow); reduced-motion preview toggle
- **Export tab**: copy CSS, copy as `defineTheme()` JS call, copy as Tailwind `@theme` block, download `.css` file

`ThemeBuilder` re-exported as an alias to `ThemeStudio` for one release. Removed in v1.2.0.

---

## 17. Component refactor — the 88

### 17.1 Inventory (verified against src/)

| Subdomain | Count | Files |
|---|---|---|
| Top-level | 50 | `Alert`, `Accordion`, `AccordionItem`, `AppProvider`, `AuthGuard`, `Badge`, `Breadcrumb`, `Button`, `Card`, `Checkbox`, `DataChart`, `DataTable`, `Dialog`, `DropdownMenu`, `EmptyState`, `ErrorBoundary`, `FileUpload`, `Form`, `FormField`, `Input`, `Kbd`, `Label`, `LazyLoad`, `ListPage`, `MetricCard`, `Omnibar`, `PageHeader`, `PageLoading`, `Pagination`, `Popconfirm`, `Popover`, `Progress`, `RichTextEditor`, `RuleFootnote`, `SectionHeader`, `SEO`, `Sheet`, `Skeleton`, `Spinner`, `StatusChip`, `Stepper`, `Suspense`, `Switch`, `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`, `ThemeBuilder`, `ThemeToggle`, `Tooltip` |
| Landing | 17 | `FAQ`, `FeatureComparison`, `FeatureGrid`, `HeroBanner`, `HowItWorks`, `IntegrationGrid`, `LandingNav`, `LandingSection`, `LogoCloud`, `MetricsBar`, `Newsletter`, `PricingTable`, `SiteFooter`, `StatsCounter`, `TeamSection`, `Testimonial`, `TestimonialGrid` |
| Sidebar | 15 | `Sidebar`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarHeader`, `SidebarLayout`, `SidebarMenu`, `SidebarMenuBadge`, `SidebarMenuButton`, `SidebarMenuItem`, `SidebarMenuSkeleton`, `SidebarProvider`, `SidebarRail`, `SidebarSeparator`, `SidebarTrigger` |
| Dashboard | 5 | `DashboardShell`, `DashboardShellRight`, `DashboardShellSplit`, `DashboardShellTopnav`, `NavMenu` |
| Tabs (composite) | 1 | `Tabs` re-exports TabsList/Trigger/Content via `tabs/index.ts` |

Total: **88 .svelte components** + 3 composite barrel files (`dashboard/index.ts`, `sidebar/index.ts`, `tabs/index.ts`).

### 17.2 Per-component refactor checklist

For each component, run this checklist:

1. **Spacing**: replace raw Tailwind spacing (`p-3`, `gap-4`) with token-bound utilities so density works.
2. **Typography**: replace inline `text-4xl font-extrabold tracking-tight` with `text-display-2` / `text-headline-1` / `text-title-2` / `text-body-md` / `text-label-md` token utilities.
3. **Shadow**: replace inline `box-shadow` recipes with `--shadow-*` tokens (or component-specific `--shadow-button`, `--shadow-card-interactive` aliases that resolve to base tokens).
4. **Motion**: replace literal `duration-150` / `ease-out` with `--duration-*` / `--ease-*` tokens.
5. **Color tokens**: replace hardcoded color shortcuts (Badge/Progress `emerald-500/amber-500`) with semantic tokens (`success`/`warning`).
6. **Aesthetic hooks**: read `--button-treatment`, `--card-treatment`, etc. instead of hardcoding gradient/flat.
7. **Inherit style**: replace inline `style="color: var(--foreground)"` with Tailwind token utilities.

### 17.3 Confirmed drift items (today)

| File | Line | Issue | Fix |
|---|---|---|---|
| `Badge.svelte` | 16 | `bg-emerald-500/15 text-emerald-400` | → `bg-success-soft text-success` |
| `Badge.svelte` | 17 | `bg-amber-500/15 text-amber-400` | → `bg-warning-soft text-warning` |
| `Progress.svelte` | 18 | `bg-emerald-500` | → `bg-success` |
| `Progress.svelte` | 19 | `bg-amber-500` | → `bg-warning` |
| `Card.svelte` | 28 | `border-[--glass-border,rgba(255,255,255,0.08)]` | → `oklch(...)` (drop `rgba()`) |
| `Card.svelte` | 28 | `bg-[--glass-surface,oklch(0 0 0 / 0.45)]` | → refactor as Tailwind utility `bg-glass-surface` |
| `Dialog.svelte` | 22 | `bg-black/50` | → `bg-[--overlay]` |
| `Sheet.svelte` | 40 | `bg-black/50` | → `bg-[--overlay]` |
| `Omnibar.svelte` | 21 | `bg-black/75` | → `bg-[--overlay-strong]` |
| `Button.svelte` | 34-38 | `thoth-btn-*` classes | → drop `:global()` style, use scoped Svelte |
| `Button.svelte` | 100-101 | `background: linear-gradient(...)` on primary | → `--button-treatment: flat` default; gradient only in glass/expressive |
| `Button.svelte` | 103 | `box-shadow: 0 4px 12px -3px oklch(...)` | → `var(--shadow-md)` |
| `Button.svelte` | 125-126 | same gradient + shadow pattern on destructive | → tokens |
| `Skeleton.svelte` | 15, 21-31 | `thoth-shimmer` prefix | → `bindrunes-shimmer` |
| `Skeleton.svelte` | 25-27 | hardcoded OKLCH literals in gradient | → tokens |
| `utilities.css` | 13-26 | `thoth-pulse-glow`, `thoth-shimmer` keyframes | → `bindrunes-pulse-glow`, `bindrunes-shimmer` |
| `PricingTable.svelte` | 81, 84 | `text-5xl font-extrabold sm:text-6xl` | → `text-display-2` |
| `PricingTable.svelte` | 163 | `box-shadow: 0 0 30px oklch(...)` literal | → `var(--shadow-glow-primary)` |
| `MetricCard.svelte` | 29 | `border-top: 2px solid <var>` | → token, or visual: `box-shadow: inset 0 2px 0 0 <color>` |
| `MetricCard.svelte` | 30 | `mono text-[0.65rem] ...` | → `text-mono-xs` |
| `MetricCard.svelte` | 38 | `background: {borderTop[variant]}` | → `var(--success/warning/destructive)` |
| `Alert.svelte` | 19 | `border-l-primary` for info variant | → `border-l-info` |
| `Input.svelte` | 32 | `text-sm font-medium` | → `text-label-md` |
| `Input.svelte` | 52, 71 | `rounded-[--radius,0.625rem] border bg-input px-3 py-2 text-sm` | → `rounded-[--radius] border bg-input px-3 py-2 text-body-md` |
| `HeroBanner.svelte` | 41 | `from-primary/10` | → `from-primary/[0.08]` or token |
| `HeroBanner.svelte` | 51 | `text-4xl font-extrabold ...` | → `text-display-2` |
| `Omnibar.svelte` | 52 | inline `oklch(1 0 0 / 0.06)` | → `bg-muted` or `bg-surface-1` |
| `ThemeBuilder.svelte` | 45-50 | hardcoded hex presets for akashic/martian/etc | → all 6 new theme names with real palette values |

### 17.4 Refactor batch plan

Seven batches, each is one or more commits with one type of refactor per file:

1. **Foundation refactor** — Badge, Progress, Card, Input, Spinner, Skeleton, Kbd, Label (8 files)
2. **Form primitives refactor** — Checkbox, Switch, Select, Form, FormField, Stepper (6 files)
3. **Feedback refactor** — Alert, StatusChip, Spinner, PageLoading, ErrorBoundary, Suspense, EmptyState, Skeleton (8 files)
4. **Overlay refactor** — Dialog, Sheet, Popover, Popconfirm, Tooltip, DropdownMenu, Omnibar (7 files)
5. **Navigation refactor** — Breadcrumb, Pagination, Tabs (3 files), TabsList, TabsTrigger, TabsContent (3 files)
6. **Data refactor** — DataTable, ListPage, MetricCard, DataChart, FileUpload, RichTextEditor, RuleFootnote, SectionHeader, PageHeader (9 files)
7. **Sidebar + Dashboard + Landing refactor** — 15 sidebar + 5 dashboard + 17 landing + ThemeBuilder + ThemeToggle + SEO + LandingSection + LandingNav + AppProvider (42 files)

---

## 18. Versioning

**Locked: v1.0.0**, confirmed by user on 2026-06-04. Reasons:
- 7 of 7 themes renamed/retired (consumers must change theme strings)
- `thoth-*` class prefix removed
- Default theme changes from dracula to editorial
- First-paint behavior changes (respects prefers-color-scheme)
- 3 new composables added (`createAesthetic`, `createDensity`, `createPrefersTheme`, `defineTheme`)
- ThemeBuilder renamed to ThemeStudio (one-release alias)
- 88 components refactored onto new token contract

The migration doc flags every breaking change. `themes/legacy/` re-exports hold for one minor (v1.1.0) and retire in v1.2.0.

---

## 19. Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | 88-component refactor regresses visuals | High | High | One batched PR per group (7 total); ThemeStudio used as eyeball verification per batch |
| R2 | Density × aesthetic permutations (3 × 4 = 12 × 6 themes = 72 visual combos) too many to QA | High | Medium | ThemeStudio covers preview; ship a `tests/visual-matrix.md` checklist for manual QA before tagging |
| R3 | Removing 6 theme names breaks consumer apps | High | High | `themes/legacy/` directory with re-exports for one release; migration.md provides exact rename map |
| R4 | `prefers-color-scheme` default may surprise users who set dracula then expect it to stick | Medium | Low | localStorage takes precedence; only first paint reads OS pref |
| R5 | New typography token surface invites bikeshedding on every component | Medium | Medium | Lock the type scale in one PR before component refactor begins |
| R6 | Aesthetic preset CSS files balloon | Low | Low | Cap each file at ~200 lines; anything bigger splits into subfiles |
| R7 | OKLCH `from var()` relative color syntax is Baseline 2024 but not in Safari < 16.4 | Medium | Medium | Tokens always carry explicit OKLCH fallbacks; documented in design-system.md |
| R8 | No visual regression tests | High | Medium | Call out as "follow-up spec" — Playwright + snapshot infrastructure can be its own brainstorm cycle |
| R9 | `data-theme` + `class="dark"` + `data-aesthetic` + `data-density` selector pairing becomes hard to reason about | Medium | Medium | Document the cascade with a single diagram in `docs/design-system.md` |
| R10 | Migration of landing demo (HeroBanner, PricingTable, etc.) breaks existing examples/screenshots | Medium | High | Landing demo gets a full pass during batch 7; example app updated to showcase all 6 themes × 4 aesthetics × 3 densities |

---

## 20. Documentation deliverables

| File | Action | Notes |
|---|---|---|
| `docs/design-system.md` | NEW | Authoritative explanation of axes (theme × aesthetic × density), token layers, customization story. The entry point linked from README. |
| `docs/themes.md` | REWRITE | Cover 6-theme suite, per-theme palette tables, new default, prefers-color-scheme first-paint behavior. |
| `docs/aesthetics.md` | NEW | One section per aesthetic (editorial, glass, bento, expressive) with token-override tables and example CSS imports. |
| `docs/components.md` | REFRESH | Refresh tables; retire `thoth-` mentions; add density column where relevant; reference the new token contract. |
| `docs/composables.md` | REFRESH | Add `createAesthetic`, `createDensity`, `defineTheme`; update `createTheme` to show new default and prefers-color-scheme first-paint. |
| `docs/migration.md` | EXTEND | Add v0.4 → v0.5 section: theme renames (akashic→nord, druidic→rose-pine, etc.), retired components, new tokens, breaking style class changes (thoth- prefix), AppProvider new props. |
| `.agent/AGENTS.md` | EXTEND | Add: "Three axes: theme × aesthetic × density. Form tokens belong to aesthetic, color tokens to theme, spacing to density. Never cross." Add: "All sizes/spacing/shadow/motion go through tokens. No literal box-shadow oklch() in components." |
| `CHANGELOG.md` | NEW | One entry for v0.5/v1.0.0 covering all breaking changes. |

---

## 21. Execution shape

Spec → implementation plan → one execution session per batch:

1. **Tokens & contract** — preset.css expansion (new tokens, @property blocks, theme/preset/tokens layering), plugin expansion, retire utilities.css duplicate, add `--font-mono`, fix `--easing-default` consistency.
2. **Aesthetic presets** — 4 CSS files + `createAesthetic` composable.
3. **Density system** — `--space-*` scale + 3 density modes + `createDensity` composable.
4. **Typography** — type scale tokens + utility classes.
5. **Motion & shadow** — easings + shadow tokens, retire inline shadows.
6. **Theme suite** — 6 new theme files (with light+dark), retire 6 old ones, add `themes/legacy/` re-exports.
7. **Drift fixes** — Badge, Progress, Card, overlay tokens, thoth- prefix removal.
8. **Component refactor** — 7 batches across all 88 components.
9. **ThemeStudio** — expand from ThemeBuilder; add tabs.
10. **AppProvider** — wire `createAesthetic`, `createDensity`, `createPrefersTheme`.
11. **Docs** — design-system.md, aesthetics.md, themes.md rewrite, migration.md, AGENTS.md extension, CHANGELOG.
12. **Verification** — `bun run check`, `bun run lint`, `bun run test`, ThemeStudio matrix walk, `tests/visual-matrix.md` walk.

Per the `writing-plans` skill, each numbered item becomes a discrete task with file paths, checkbox steps, and conventional-commit messages once this spec is approved.

---

## 22. Verification matrix (per ARCHON §5)

| Section | Work type | Verification |
|---|---|---|
| §5–§12 (token additions) | Token/contract only | Manual: take screenshots of homepage + dashboard in default + 1 other theme; visually compare. `bun run check` for CSS validity. |
| §13 (aesthetic presets) | Token/contract | ThemeStudio: switch aesthetic, screenshot each of 4 in default theme; verify form-token overrides apply. |
| §14 (theme suite) | Token/contract | ThemeStudio: switch each of 6 themes × light/dark; verify color tokens shift correctly. |
| §15 (density system) | Token/contract | ThemeStudio: switch each of 3 densities on DataTable; verify row height + gap changes. |
| §16 (customization API) | Mixed | One UI path (ThemeStudio export tab) + one contract path (Vitest test for `createTheme`/`createAesthetic`/`createDensity`/`defineTheme`). |
| §17 (component refactor) | Mixed | For each of 7 batches: typecheck + lint + Vitest + ThemeStudio matrix walk. |
| §20 (docs) | Manual | Read-through + table of contents review + all internal `code:` links resolve. |

---

## 23. Decisions (locked 2026-06-04)

> All decisions confirmed by the user during spec review.

1. **Version target**: **v1.0.0** (major bump). See §18.
2. **Default theme primary color**: **Editorial default** — `oklch(0.65 0.10 265)` restrained indigo.
3. **`createPrefersTheme()` composable**: **Included** in scope. See §16.4.
4. **Aesthetic default**: **editorial** (matches theme default). No separate override.
5. **ThemeBuilder → ThemeStudio rename**: **Rename with one-release alias**. Alias ships through v1.1.0; retired in v1.2.0. See §16.3.

---

## 24. Spec self-review

> Per the brainstorming skill, before offering this spec to the user I am running the spec self-review pass.

- **Problem statement clarity**: §1 articulates the three things wrong with v0.4 and why this spec exists. ✅
- **Goal coverage**: §2 covers the user's brainstorm decisions (all-three-phases, multi-aesthetic, density, 6-theme suite, clean break). ✅
- **Token completeness**: §5–§12 cover every category: color, typography, spacing, radius, shadow, motion, container, z-index. Plus new soft-state, overlay, info, density. ✅
- **Drift identified**: §17.3 enumerates 27+ specific file:line items from the codebase. ✅
- **Rollout plan**: §21 enumerates 12 ordered execution items; §17.4 breaks components into 7 batches. ✅
- **Risks**: §19 names 10 risks with likelihood/impact/mitigation. ✅
- **Migration story**: §14.5 (`themes/legacy/`) + §20 (migration.md) cover the consumer impact. ✅
- **Decisions pending**: §23 lists 5 items to ask the user. None block spec lock. ✅
- **Length/scope**: 24 sections, ~750 lines, scales with the complexity of the change. ✅

This spec is ready for user review at `docs/superpowers/specs/2026-06-04-bindrunes-design-system-v0.5-design.md`.

---

## 25. Next step (per brainstorming skill)

> After spec approval, the next step is to invoke the `writing-plans` skill to produce the implementation plan that derives from this spec. The plan becomes the file at `docs/superpowers/plans/2026-06-04-bindrunes-design-system-v0.5.md`, which then drives execution via the `executing-plans` or `subagent-driven-development` skill.

No plan is generated until the user has reviewed and approved this spec.
