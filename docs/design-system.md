# Design System

The bindrunes design system has three orthogonal customization axes, backed by a complete CSS custom property token contract. Any combination is valid: e.g., `dracula × bento × spacious`.

## The Three Axes

| Axis | Attribute | Presets | Controls | Composable |
|---|---|---|---|---|
| **Theme** | `data-theme` | `editorial` (default), `dracula`, `nord`, `catppuccin`, `rose-pine`, `github` | Color identity | `createTheme()` |
| **Aesthetic** | `data-aesthetic` | `minimal` (default), `glass`, `bento`, `expressive`, `neon`, `brutalist`, `organic` | Form (radius, shadow, motion) | `createAesthetic()` |
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
- **minimal**: 0.5rem radius, flat buttons, snappy 120ms transitions.
- **glass**: 0.625rem radius, gradient buttons, fluid 250ms transitions, grain texture.
- **bento**: 0.875rem radius, inner-light buttons, bouncy 220ms spring transitions.
- **expressive**: 1.0rem radius, gradient buttons, dramatic 300ms transitions, mesh texture.
- **neon**: 0.25rem radius, flat buttons, fast 80ms transitions, neon glow shadows.
- **brutalist**: 0 radius, flat buttons, very fast 50ms transitions, noise texture.
- **organic**: 1.5rem radius, gradient buttons, slow 200ms spring transitions, paper texture.

### 3. Density Modes
- **compact**: Spacing scaled by ~0.8× (data-dense).
- **comfortable**: Spacing at 1× (default).
- **spacious**: Spacing scaled by ~1.25× (generous).

---

## Theme Reference

Each theme defines a complete set of OKLCH color tokens. All values below are for **dark mode** (the default). Light mode values are defined in the same CSS file under `:root:not(.dark)[data-theme="..."]`.

### editorial (default)

Warm grey surfaces with restrained indigo accents. Inspired by Linear/Vercel/Geist.

| Token | Value | Description |
|---|---|---|
| `--background` | `oklch(0.13 0.01 270)` | Page background |
| `--foreground` | `oklch(0.96 0.005 270)` | Default text |
| `--primary` | `oklch(0.65 0.1 265)` | Primary action (indigo) |
| `--primary-foreground` | `oklch(0.13 0 0)` | Text on primary |
| `--accent` | `oklch(0.62 0.13 285)` | Secondary accent (purple) |
| `--accent-foreground` | `oklch(0.13 0 0)` | Text on accent |
| `--card-solid` | `oklch(0.17 0.008 270)` | Solid card background |
| `--surface-1` | `oklch(0.16 0.008 270)` | Lowest surface |
| `--surface-2` | `oklch(0.19 0.008 270)` | Mid surface |
| `--surface-3` | `oklch(0.22 0.008 270)` | Highest surface |
| `--muted-foreground` | `oklch(0.65 0.012 270)` | Muted text |
| `--destructive` | `oklch(0.62 0.22 25)` | Destructive action (red) |
| `--success` | `oklch(0.68 0.16 145)` | Success state (green) |
| `--warning` | `oklch(0.8 0.16 80)` | Warning state (amber) |
| `--info` | `oklch(0.7 0.12 230)` | Info state (blue) |
| `--border` | `oklch(1 0 0 / 0.08)` | Default border |
| `--border-strong` | `oklch(1 0 0 / 0.2)` | Strong border |
| `--ring` | `oklch(0.65 0.1 265)` | Focus ring (matches primary) |
| `--sidebar-background` | `oklch(0.11 0.008 270)` | Sidebar bg |

The editorial theme's light mode uses `oklch(0.98 0.005 270)` for background and `oklch(0.3 0.1 265)` for primary.

### dracula

Deep purple-black surfaces with vibrant magenta/pink accents. Faithful to the Dracula color palette.

| Token | Value | Description |
|---|---|---|
| `--background` | `oklch(0.05 0.01 290)` | Near-black purple bg |
| `--foreground` | `oklch(0.95 0.01 290)` | Light text |
| `--primary` | `oklch(0.75 0.21 310)` | Primary (vivid magenta) |
| `--primary-foreground` | `oklch(0.15 0 0)` | Text on primary |
| `--accent` | `oklch(0.72 0.3 340)` | Accent (hot pink) |
| `--accent-foreground` | `oklch(0.15 0 0)` | Text on accent |
| `--card-solid` | `oklch(0.1 0.015 290)` | Card surface |
| `--surface-1` | `oklch(0.08 0.015 290)` | Low surface |
| `--surface-2` | `oklch(0.11 0.015 290)` | Mid surface |
| `--surface-3` | `oklch(0.14 0.015 290)` | High surface |
| `--destructive` | `oklch(0.65 0.24 30)` | Red (warm) |
| `--success` | `oklch(0.65 0.2 145)` | Green |
| `--warning` | `oklch(0.8 0.18 85)` | Yellow |
| `--info` | `oklch(0.7 0.12 230)` | Blue |
| `--ring` | `oklch(0.75 0.21 310)` | Focus ring |
| `--glass-surface` | `oklch(0 0 0 / 0.4)` | Darker glass for dracula |
| `--sidebar-background` | `oklch(0.05 0.01 290)` | Sidebar bg |

Light mode inverts to `oklch(0.98 0.01 290)` background with `oklch(0.3 0.21 310)` primary.

### nord

Cool blue-grey surfaces with icy blue accents. Calm, professional, accessible.

| Token | Value | Description |
|---|---|---|
| `--background` | `oklch(0.18 0.01 250)` | Cool grey bg |
| `--foreground` | `oklch(0.93 0.01 250)` | Light text |
| `--primary` | `oklch(0.78 0.1 230)` | Primary (frost blue) |
| `--primary-foreground` | `oklch(0.13 0 0)` | Text on primary |
| `--accent` | `oklch(0.74 0.08 210)` | Accent (teal) |
| `--accent-foreground` | `oklch(0.13 0 0)` | Text on accent |
| `--card-solid` | `oklch(0.22 0.012 250)` | Card surface |
| `--surface-1` | `oklch(0.21 0.012 250)` | Low surface |
| `--surface-2` | `oklch(0.24 0.012 250)` | Mid surface |
| `--surface-3` | `oklch(0.27 0.012 250)` | High surface |
| `--muted-foreground` | `oklch(0.6 0.03 250)` | Muted text |
| `--ring` | `oklch(0.78 0.1 230)` | Focus ring |
| `--sidebar-background` | `oklch(0.16 0.012 250)` | Sidebar bg |

Light mode uses `oklch(0.96 0.008 250)` background and `oklch(0.3 0.1 230)` primary.

### catppuccin

Soft lavender-mauve surfaces with pastel purple/pink accents. Modern, gentle, and highly readable.

| Token | Value | Description |
|---|---|---|
| `--background` | `oklch(0.16 0.01 290)` | Mauve-black bg |
| `--foreground` | `oklch(0.92 0.02 290)` | Lavender text |
| `--primary` | `oklch(0.8 0.14 280)` | Primary (soft purple) |
| `--primary-foreground` | `oklch(0.13 0 0)` | Text on primary |
| `--accent` | `oklch(0.78 0.18 300)` | Accent (pink) |
| `--accent-foreground` | `oklch(0.13 0 0)` | Text on accent |
| `--card-solid` | `oklch(0.2 0.015 290)` | Card surface |
| `--surface-1` | `oklch(0.19 0.015 290)` | Low surface |
| `--surface-2` | `oklch(0.22 0.015 290)` | Mid surface |
| `--surface-3` | `oklch(0.25 0.015 290)` | High surface |
| `--muted-foreground` | `oklch(0.58 0.04 280)` | Muted text |
| `--ring` | `oklch(0.8 0.14 280)` | Focus ring |
| `--sidebar-background` | `oklch(0.14 0.015 290)` | Sidebar bg |

Light mode uses `oklch(0.97 0.01 290)` background and `oklch(0.3 0.14 280)` primary.

### rose-pine

Warm rose/brown surfaces with muted coral accents. Earthy, cozy, and low-contrast.

| Token | Value | Description |
|---|---|---|
| `--background` | `oklch(0.15 0.01 30)` | Warm brown bg |
| `--foreground` | `oklch(0.92 0.008 30)` | Cream text |
| `--primary` | `oklch(0.72 0.12 15)` | Primary (coral) |
| `--primary-foreground` | `oklch(0.13 0 0)` | Text on primary |
| `--accent` | `oklch(0.7 0.1 350)` | Accent (rose) |
| `--accent-foreground` | `oklch(0.13 0 0)` | Text on accent |
| `--card-solid` | `oklch(0.19 0.01 30)` | Card surface |
| `--surface-1` | `oklch(0.18 0.01 30)` | Low surface |
| `--surface-2` | `oklch(0.21 0.01 30)` | Mid surface |
| `--surface-3` | `oklch(0.24 0.01 30)` | High surface |
| `--muted-foreground` | `oklch(0.6 0.02 30)` | Muted text |
| `--ring` | `oklch(0.72 0.12 15)` | Focus ring |
| `--sidebar-background` | `oklch(0.13 0.01 30)` | Sidebar bg |

Light mode uses `oklch(0.96 0.006 30)` background and `oklch(0.3 0.12 15)` primary.

### github

Neutral grey surfaces with saturated blue accents. High-contrast, accessible, universally recognizable.

| Token | Value | Description |
|---|---|---|
| `--background` | `oklch(0.2 0.01 250)` | Grey bg |
| `--foreground` | `oklch(0.97 0.005 250)` | Near-white text |
| `--primary` | `oklch(0.65 0.18 250)` | Primary (GitHub blue) |
| `--primary-foreground` | `oklch(0.15 0 0)` | Text on primary |
| `--accent` | `oklch(0.6 0.14 240)` | Accent (teal) |
| `--accent-foreground` | `oklch(0.99 0 0)` | Text on accent |
| `--card-solid` | `oklch(0.24 0.012 250)` | Card surface |
| `--surface-1` | `oklch(0.23 0.012 250)` | Low surface |
| `--surface-2` | `oklch(0.26 0.012 250)` | Mid surface |
| `--surface-3` | `oklch(0.29 0.012 250)` | High surface |
| `--muted-foreground` | `oklch(0.7 0.01 250)` | Muted text |
| `--border` | `oklch(1 0 0 / 0.1)` | Slightly stronger borders |
| `--border-strong` | `oklch(1 0 0 / 0.22)` | Strong border |
| `--ring` | `oklch(0.65 0.18 250)` | Focus ring |
| `--sidebar-background` | `oklch(0.18 0.01 250)` | Sidebar bg |

Light mode uses `oklch(0.98 0.005 250)` background and `oklch(0.3 0.18 250)` primary.

---

## Aesthetic Reference

Aesthetics control **form** only — radius, shadows, motion, button treatment, and surface texture. They never modify colors.

### minimal (default)

The calm, flat, hairline aesthetic. Inspired by Linear, Vercel, and Geist.

| Property | Value | Description |
|---|---|---|
| `--radius` / `--radius-md` | `0.5rem` | Base corner radius |
| `--radius-lg` | `0.75rem` | Large corner radius |
| `--radius-xl` | `0.875rem` | XL corner radius |
| `--shadow-xs` | `0 1px 0 oklch(0 0 0 / 0.03)` | Near-zero shadow |
| `--shadow-sm` | `0 1px 0 oklch(0 0 0 / 0.04)` | Hairline shadow |
| `--shadow-md` | `0 1px 0 oklch(0 0 0 / 0.06)` | Subtle shadow |
| `--shadow-lg` | `0 2px 4px oklch(0 0 0 / 0.08)` | Medium shadow |
| `--duration-snappy` | `120ms` | Fast transition |
| `--duration-fluid` | `220ms` | Medium transition |
| `--duration-slow` | `360ms` | Slow transition |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Standard easing |
| `--button-treatment` | `flat` | Solid fill buttons |
| `--card-treatment` | `solid` | Solid card backgrounds |
| `--surface-texture` | `none` | No texture overlay |
| `--hero-translate` | `8px` | Hero parallax distance |
| `--shadow-emphasis` | `low` | Low shadow emphasis |

### glass

Atmospheric, translucent surfaces with blurred backgrounds and ambient shadow bloom.

| Property | Value | Description |
|---|---|---|
| `--radius` / `--radius-md` | `0.625rem` | Slightly rounded |
| `--radius-lg` | `0.875rem` | Large radius |
| `--radius-xl` | `1rem` | XL radius |
| `--shadow-xs` | `0 1px 3px oklch(0 0 0 / 0.04)` | Light shadow |
| `--shadow-sm` | `0 2px 6px -2px oklch(0 0 0 / 0.06)` | Soft shadow |
| `--shadow-md` | `0 6px 16px -4px oklch(0 0 0 / 0.1)` | Ambient bloom |
| `--shadow-lg` | `0 12px 28px -8px oklch(0 0 0 / 0.14)` | Dramatic bloom |
| `--duration-snappy` | `150ms` | Relaxed fast |
| `--duration-fluid` | `250ms` | Fluid transition |
| `--duration-slow` | `400ms` | Slow transition |
| `--ease-decelerated` | `cubic-bezier(0, 0, 0, 1)` | Decelerated easing |
| `--button-treatment` | `gradient` | Gradient fill buttons |
| `--button-bg` | `linear-gradient(135deg, var(--primary) 0%, ...)` | Gradient primary |
| `--card-treatment` | `glass` | Translucent cards |
| `--surface-texture` | `grain` | Film grain overlay |
| `--hero-translate` | `16px` | Hero parallax distance |
| `--shadow-emphasis` | `medium` | Medium shadow emphasis |

### bento

Friendly, rounded, soft. Bento-grid inspired with generous corners and warm shadows.

| Property | Value | Description |
|---|---|---|
| `--radius` / `--radius-md` | `0.875rem` | Generous corners |
| `--radius-lg` | `1rem` | Large radius |
| `--radius-xl` | `1.25rem` | XL radius |
| `--shadow-xs` | `0 1px 4px oklch(0 0 0 / 0.03)` | Soft light shadow |
| `--shadow-sm` | `0 2px 8px -2px oklch(0 0 0 / 0.05)` | Soft shadow |
| `--shadow-md` | `0 4px 12px -4px oklch(0 0 0 / 0.08)` | Warm shadow |
| `--shadow-lg` | `0 8px 20px -6px oklch(0 0 0 / 0.1)` | Elevated shadow |
| `--duration-snappy` | `130ms` | Quick snap |
| `--duration-fluid` | `220ms` | Bouncy transition |
| `--duration-slow` | `360ms` | Slow transition |
| `--ease-spring` | `linear(0, 0.5 7%, 0.95 25%, 1)` | Spring easing |
| `--button-treatment` | `inner-light` | Inner glow buttons |
| `--button-bg` | `var(--primary)` | Solid primary |
| `--card-treatment` | `tinted` | Tinted card backgrounds |
| `--surface-texture` | `dot-grid` | Dot grid overlay |
| `--hero-translate` | `14px` | Hero parallax distance |
| `--shadow-emphasis` | `low` | Low shadow emphasis |

### expressive

Dramatic, loud. Mesh gradients, glow shadows, amplified motion. For marketing sites and creative SaaS.

| Property | Value | Description |
|---|---|---|
| `--radius` / `--radius-md` | `1rem` | Large corners |
| `--radius-lg` | `1.25rem` | XL radius |
| `--radius-xl` | `1.5rem` | XXL radius |
| `--shadow-xs` | `0 2px 6px oklch(0 0 0 / 0.08)` | Visible shadow |
| `--shadow-sm` | `0 4px 12px -4px oklch(0 0 0 / 0.12)` | Amplified shadow |
| `--shadow-md` | `0 8px 24px -4px oklch(0 0 0 / 0.18)` | Dramatic shadow |
| `--shadow-lg` | `0 16px 40px -8px oklch(0 0 0 / 0.22)` | Hero shadow |
| `--duration-snappy` | `180ms` | Emphatic fast |
| `--duration-fluid` | `300ms` | Dramatic transition |
| `--duration-slow` | `450ms` | Slow dramatic transition |
| `--ease-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | Emphasized easing |
| `--button-treatment` | `gradient` | Gradient fill buttons |
| `--button-bg` | `linear-gradient(135deg, var(--primary) 0%, ...)` | Gradient primary |
| `--card-treatment` | `glass` | Translucent cards |
| `--surface-texture` | `mesh` | Mesh gradient overlay |
| `--hero-translate` | `24px` | Hero parallax distance |
| `--shadow-emphasis` | `high` | High shadow emphasis |

### neon

Sharp, glowing. Neon glow shadows with snappy motion. For cyberpunk, gaming, or futuristic interfaces.

| Property | Value | Description |
|---|---|---|
| `--radius` / `--radius-md` | `0.25rem` | Sharp corners |
| `--radius-lg` | `0.375rem` | Slightly rounded |
| `--radius-xl` | `0.5rem` | Rounded |
| `--shadow-xs` | `0 0 4px oklch(0.7 0.2 180 / 0.15)` | Subtle glow |
| `--shadow-sm` | `0 0 8px oklch(0.7 0.2 180 / 0.2)` | Neon glow |
| `--shadow-md` | `0 0 16px oklch(0.7 0.2 180 / 0.25)` | Bright glow |
| `--shadow-lg` | `0 0 32px oklch(0.7 0.2 180 / 0.3)` | Dramatic glow |
| `--duration-snappy` | `80ms` | Snappy fast |
| `--duration-fluid` | `150ms` | Fluid transition |
| `--duration-slow` | `250ms` | Slow transition |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Standard easing |
| `--button-treatment` | `flat` | Solid fill buttons |
| `--card-treatment` | `solid` | Solid card backgrounds |
| `--surface-texture` | `none` | No texture overlay |
| `--hero-translate` | `4px` | Hero parallax distance |
| `--shadow-emphasis` | `high` | High shadow emphasis |

### brutalist

Raw, unpolished. No radius, no shadows, noise texture. For bold, anti-design, or developer tool interfaces.

| Property | Value | Description |
|---|---|---|
| `--radius` / `--radius-md` | `0` | No rounding |
| `--radius-lg` | `0` | No rounding |
| `--radius-xl` | `0.125rem` | Minimal rounding |
| `--shadow-xs` | `none` | No shadow |
| `--shadow-sm` | `none` | No shadow |
| `--shadow-md` | `none` | No shadow |
| `--shadow-lg` | `none` | No shadow |
| `--duration-snappy` | `50ms` | Very fast snap |
| `--duration-fluid` | `100ms` | Very fast transition |
| `--duration-slow` | `150ms` | Fast transition |
| `--ease-standard` | `linear` | Linear easing |
| `--button-treatment` | `flat` | Solid fill buttons |
| `--card-treatment` | `solid` | Solid card backgrounds |
| `--surface-texture` | `noise` | Noise texture overlay |
| `--hero-translate` | `2px` | Hero parallax distance |
| `--shadow-emphasis` | `low` | Low shadow emphasis |

### organic

Soft, warm, tactile. Very rounded corners, spring easing, paper texture. For wellness, lifestyle, and gentle apps.

| Property | Value | Description |
|---|---|---|
| `--radius` / `--radius-md` | `1.5rem` | Very rounded |
| `--radius-lg` | `1.75rem` | Large rounded |
| `--radius-xl` | `2rem` | Extra rounded |
| `--shadow-xs` | `0 2px 8px oklch(0.2 0.02 60 / 0.06)` | Soft warm shadow |
| `--shadow-sm` | `0 4px 16px -4px oklch(0.2 0.02 60 / 0.08)` | Warm shadow |
| `--shadow-md` | `0 8px 24px -4px oklch(0.2 0.02 60 / 0.12)` | Elevated warm shadow |
| `--shadow-lg` | `0 16px 40px -8px oklch(0.2 0.02 60 / 0.16)` | Dramatic warm shadow |
| `--duration-snappy` | `200ms` | Relaxed fast |
| `--duration-fluid` | `350ms` | Gentle transition |
| `--duration-slow` | `500ms` | Slow transition |
| `--ease-spring` | `linear(0, 0.5 7%, 0.95 25%, 1)` | Spring easing |
| `--button-treatment` | `gradient` | Gradient fill buttons |
| `--button-bg` | `linear-gradient(135deg, var(--primary) 0%, ...)` | Gradient primary |
| `--card-treatment` | `tinted` | Tinted card backgrounds |
| `--surface-texture` | `paper` | Paper texture overlay |
| `--hero-translate` | `20px` | Hero parallax distance |
| `--shadow-emphasis` | `medium` | Medium shadow emphasis |

---

## Density Reference

Density controls the spacing scale. All `--space-*` tokens are multiplied by the density factor.

### compact

Spacing scaled by ~0.8×. Dense layouts for data-heavy UIs, dashboards, and tables.

```css
[data-density="compact"] {
  --space-1: 0.2rem;    /* 0.25 × 0.8 */
  --space-2: 0.4rem;    /* 0.5  × 0.8 */
  --space-3: 0.6rem;    /* 0.75 × 0.8 */
  --space-4: 0.8rem;    /* 1    × 0.8 */
  --space-6: 1.2rem;    /* 1.5  × 0.8 */
  --space-8: 1.6rem;    /* 2    × 0.8 */
}
```

### comfortable (default)

Standard 1× spacing. Balanced for most application UIs.

| Token | Value |
|---|---|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.25rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-10` | `3rem` |
| `--space-12` | `4rem` |
| `--space-16` | `5rem` |
| `--space-20` | `6rem` |

### spacious

Spacing scaled by ~1.25×. Generous whitespace for marketing pages and content-heavy layouts.

```css
[data-density="spacious"] {
  --space-1: 0.3125rem; /* 0.25 × 1.25 */
  --space-2: 0.625rem;  /* 0.5  × 1.25 */
  --space-3: 0.9375rem; /* 0.75 × 1.25 */
  --space-4: 1.25rem;   /* 1    × 1.25 */
  --space-6: 1.875rem;  /* 1.5  × 1.25 */
  --space-8: 2.5rem;    /* 2    × 1.25 */
}
```

---

## CSS Variable Reference

Complete table of all design tokens available in bindrunes.

### Surface & Color Tokens

| Token | Category | Description |
|---|---|---|
| `--background` | Surface | Page background |
| `--foreground` | Surface | Default text color |
| `--card` | Surface | Card background (alpha) |
| `--card-foreground` | Surface | Card text color |
| `--card-solid` | Surface | Card background (solid) |
| `--surface-1` | Surface | Lowest elevation surface |
| `--surface-2` | Surface | Mid elevation surface |
| `--surface-3` | Surface | Highest elevation surface |
| `--muted` | Surface | Muted background (alpha) |
| `--muted-foreground` | Surface | Muted text |
| `--secondary` | Surface | Secondary background (alpha) |
| `--secondary-foreground` | Surface | Secondary text |

### Accent Tokens

| Token | Category | Description |
|---|---|---|
| `--primary` | Accent | Primary action color |
| `--primary-foreground` | Accent | Text on primary |
| `--accent` | Accent | Secondary accent color |
| `--accent-foreground` | Accent | Text on accent |

### State Tokens

| Token | Category | Description |
|---|---|---|
| `--destructive` | State | Destructive action color |
| `--destructive-foreground` | State | Text on destructive |
| `--destructive-soft` | State | Soft destructive (12% alpha) |
| `--success` | State | Success color |
| `--success-foreground` | State | Text on success |
| `--success-soft` | State | Soft success (12% alpha) |
| `--warning` | State | Warning color |
| `--warning-foreground` | State | Text on warning |
| `--warning-soft` | State | Soft warning (12% alpha) |
| `--info` | State | Info color |
| `--info-foreground` | State | Text on info |
| `--info-soft` | State | Soft info (12% alpha) |

### Border & Input Tokens

| Token | Category | Description |
|---|---|---|
| `--border` | Border | Default border color |
| `--border-strong` | Border | Strong border color |
| `--border-subtle` | Border | Subtle border color |
| `--input` | Border | Input field border |
| `--ring` | Border | Focus ring color |

### Overlay Tokens

| Token | Category | Description |
|---|---|---|
| `--overlay` | Overlay | Modal/overlay backdrop |
| `--overlay-strong` | Overlay | Strong overlay backdrop |
| `--glass-surface` | Overlay | Glass panel background |
| `--glass-border` | Overlay | Glass panel border |

### Sidebar Tokens

| Token | Category | Description |
|---|---|---|
| `--sidebar-background` | Sidebar | Sidebar background |
| `--sidebar-foreground` | Sidebar | Sidebar text |
| `--sidebar-primary` | Sidebar | Sidebar primary action |
| `--sidebar-primary-foreground` | Sidebar | Text on sidebar primary |
| `--sidebar-accent` | Sidebar | Sidebar accent background |
| `--sidebar-accent-foreground` | Sidebar | Sidebar accent text |
| `--sidebar-border` | Sidebar | Sidebar border |
| `--sidebar-ring` | Sidebar | Sidebar focus ring |

### Radius Tokens

| Token | Description |
|---|---|
| `--radius-xs` | Extra small (0.25rem default) |
| `--radius-sm` | Small (0.375rem default) |
| `--radius` / `--radius-md` | Medium / base (0.5rem default) |
| `--radius-lg` | Large (0.875rem default) |
| `--radius-xl` | Extra large (1.25rem default) |
| `--radius-pill` | Pill shape (9999px) |
| `--radius-full` | Full circle (50%) |

### Shadow Tokens

| Token | Description |
|---|---|
| `--shadow-xs` | Extra subtle shadow |
| `--shadow-sm` | Small shadow |
| `--shadow-md` | Medium shadow |
| `--shadow-lg` | Large shadow |
| `--shadow-xl` | Extra large shadow |
| `--shadow-2xl` | 2x extra large shadow |
| `--shadow-glow-primary` | Primary color glow |
| `--shadow-glow-destructive` | Destructive color glow |
| `--shadow-glow-accent` | Accent color glow |
| `--shadow-glow-success` | Success color glow |
| `--shadow-glow-warning` | Warning color glow |
| `--shadow-glow-info` | Info color glow |
| `--shadow-emphasis-resolved` | Resolved emphasis shadow |
| `--shadow-inset-subtle` | Subtle inset shadow |

### Motion Tokens

| Token | Description |
|---|---|
| `--duration-instant` | 50ms — micro-interactions |
| `--duration-snappy` | 120ms — fast feedback |
| `--duration-fluid` | 220ms — standard transitions |
| `--duration-slow` | 360ms — deliberate transitions |
| `--ease-standard` | Standard easing curve |
| `--ease-emphasized` | Emphasized easing curve |
| `--ease-decelerated` | Decelerated easing curve |
| `--ease-accelerated` | Accelerated easing curve |
| `--ease-spring` | Spring/bounce easing curve |

### Gradient Tokens

| Token | Description |
|---|---|
| `--gradient-angle` | Base angle for all gradients (135deg default) |
| `--gradient-primary` | Primary button/element gradient |
| `--gradient-accent` | Primary-to-accent blend gradient |
| `--gradient-destructive` | Destructive button gradient |
| `--gradient-surface` | Subtle surface gradient |
| `--gradient-hero` | Hero section atmospheric gradient |
| `--gradient-card` | Card background gradient |
| `--gradient-sidebar` | Sidebar background gradient |
| `--gradient-text-primary` | Text gradient (foreground → primary) |
| `--gradient-text-accent` | Text gradient (foreground → accent) |
| `--gradient-shimmer` | Linear gradient for skeleton shimmer animation |

### Surface Gradient Tokens

| Token | Description |
|---|---|
| `--bg-gradient-hero` | Background gradient for hero sections |
| `--bg-gradient-card` | Background gradient for cards |
| `--bg-gradient-sidebar` | Background gradient for sidebar |

### Blur Tokens

| Token | Value | Description |
|---|---|---|
| `--blur-subtle` | 4px | Light blur for small elements |
| `--blur-medium` | 8px | Medium blur |
| `--blur-heavy` | 16px | Heavy blur (glass panels) |
| `--blur-ultra` | 24px | Ultra blur (modals, overlays) |

### Typography Scale Tokens

| Token | Value | Description |
|---|---|---|
| `--text-line-height-tight` | 1.2 | Tight line height |
| `--text-line-height-normal` | 1.5 | Normal line height |
| `--text-line-height-relaxed` | 1.65 | Relaxed line height |
| `--text-letter-spacing-tight` | -0.02em | Tight letter spacing |
| `--text-letter-spacing-normal` | 0 | Normal letter spacing |
| `--text-letter-spacing-wide` | 0.02em | Wide letter spacing |
| `--text-letter-spacing-wider` | 0.05em | Wider letter spacing |
| `--text-letter-spacing-widest` | 0.1em | Widest letter spacing |

### Animation Delay Tokens

| Token | Value | Description |
|---|---|---|
| `--delay-none` | 0ms | No delay |
| `--delay-sm` | 50ms | Small delay |
| `--delay-md` | 100ms | Medium delay |
| `--delay-lg` | 200ms | Large delay |
| `--delay-xl` | 400ms | Extra large delay |

### Spacing Tokens

| Token | Value (comfortable) |
|---|---|
| `--space-0` | `0` |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.25rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-10` | `3rem` |
| `--space-12` | `4rem` |
| `--space-16` | `5rem` |
| `--space-20` | `6rem` |

### Aesthetic Hook Tokens

| Token | Description |
|---|---|
| `--button-treatment` | Button style: `flat`, `gradient`, `inner-light` |
| `--button-bg` | Button background value |
| `--button-bg-destructive` | Destructive button background |
| `--card-treatment` | Card style: `solid`, `glass`, `tinted` |
| `--surface-texture` | Texture overlay: `none`, `grain`, `dot-grid`, `mesh`, `noise`, `paper` |
| `--hero-translate` | Hero section parallax distance |
| `--shadow-emphasis` | Shadow intensity: `low`, `medium`, `high` |

### Component-Specific Tokens

| Token | Description |
|---|---|
| `--card-padding` | Internal card padding (1rem default) |

### Z-Index Tokens

| Token | Value | Description |
|---|---|---|
| `--z-sidebar` | `40` | Sidebar z-index |
| `--z-overlay` | `50` | Overlay z-index |
| `--z-modal` | `60` | Modal z-index |
| `--z-popover` | `70` | Popover z-index |
| `--z-toast` | `80` | Toast z-index |
| `--z-tooltip` | `90` | Tooltip z-index |

---

## Token Cascade Order

Tokens resolve via CSS selector specificity. Later declarations override earlier ones when specificity is equal.

### How Cascade Works

1. **`:root` defaults** (`tokens/root.css`) — Sets all token fallback values (editorial theme, minimal aesthetic, comfortable density).
2. **`[data-aesthetic="..."]` overrides** (`tokens/aesthetics/*.css`) — Overrides form-related tokens: `--radius-*`, `--shadow-*`, `--duration-*`, `--ease-*`, `--gradient-*`, `--blur-*`, `--button-*`, `--card-treatment`, `--surface-texture`.
3. **`[data-theme="..."]` overrides** (`tokens/themes/*.css`) — Overrides color tokens: `--background`, `--primary`, `--border`, `--glass-*`, `--sidebar-*`, etc.
4. **`[data-density="..."]` overrides** (`tokens/densities/*.css`) — Overrides spacing tokens: `--space-*`.

**Key rules:**
- Aesthetics **never** modify colors.
- Themes **never** modify spacing or forms.
- Density **only** modifies spacing tokens.

This means any theme × aesthetic × density combination is guaranteed to be valid — you can swap any axis independently without side effects.

---

## Custom Theme Guide

### Using `defineTheme()`

Create a custom theme programmatically with `defineTheme()`:

```svelte
<script lang="ts">
  import { defineTheme } from "bindrunes";

  const myBrand = defineTheme("my-brand", {
    "--primary": "oklch(0.55 0.18 260)",
    "--primary-foreground": "oklch(0.99 0 0)",
    "--accent": "oklch(0.65 0.2 310)",
    "--accent-foreground": "oklch(0.99 0 0)",
    "--background": "oklch(0.12 0.008 260)",
    "--foreground": "oklch(0.95 0.005 260)",
    "--card-solid": "oklch(0.16 0.01 260)",
    "--destructive": "oklch(0.6 0.22 25)",
    "--success": "oklch(0.68 0.16 145)",
    "--warning": "oklch(0.8 0.16 80)",
    "--info": "oklch(0.7 0.12 230)",
    "--border": "oklch(1 0 0 / 0.08)",
    "--ring": "oklch(0.55 0.18 260)",
  });

  // Inject the stylesheet into the document
  myBrand.apply();
</script>
```

### Using `extendTheme()`

Extend an existing theme with partial overrides:

```svelte
<script lang="ts">
  import { extendTheme } from "bindrunes";

  const customDracula = extendTheme("dracula", "my-dracula", {
    "--primary": "oklch(0.8 0.25 320)",  // Brighter magenta
    "--accent": "oklch(0.75 0.35 350)",  // Hotter pink
  });

  customDracula.apply();
</script>
```

### Using CSS directly

Define a theme via CSS custom properties under the `[data-theme]` selector:

```css
[data-theme="sunset"] {
  --background: oklch(0.14 0.012 40);
  --foreground: oklch(0.94 0.008 40);
  --primary: oklch(0.7 0.18 45);
  --primary-foreground: oklch(0.13 0 0);
  --accent: oklch(0.68 0.2 350);
  --accent-foreground: oklch(0.13 0 0);
  --card-solid: oklch(0.18 0.012 40);
  --surface-1: oklch(0.17 0.012 40);
  --surface-2: oklch(0.2 0.012 40);
  --surface-3: oklch(0.23 0.012 40);
  --destructive: oklch(0.62 0.22 25);
  --success: oklch(0.68 0.16 145);
  --warning: oklch(0.8 0.16 80);
  --info: oklch(0.7 0.12 230);
  --border: oklch(1 0 0 / 0.08);
  --ring: oklch(0.7 0.18 45);
  --sidebar-background: oklch(0.12 0.01 40);
}

:root:not(.dark)[data-theme="sunset"] {
  --background: oklch(0.97 0.008 40);
  --foreground: oklch(0.16 0.012 40);
  --primary: oklch(0.4 0.18 45);
  --primary-foreground: oklch(0.99 0 0);
  /* ... light mode overrides ... */
}
```

### Using the composable

```svelte
<script lang="ts">
  import { createTheme } from "bindrunes";

  const theme = createTheme({
    default: "editorial",
    storageKey: "app-theme",
  });

  // Switch programmatically
  theme.setTheme("my-brand");
</script>
```

---

## Custom Aesthetic Guide

### Using CSS directly

Define a custom aesthetic under the `[data-aesthetic]` selector:

```css
[data-aesthetic="neon"] {
  /* Radius — sharp */
  --radius: 0.25rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;
  --radius-xl: 0.5rem;

  /* Shadow — neon glow */
  --shadow-xs: 0 0 4px oklch(0.7 0.2 180 / 0.15);
  --shadow-sm: 0 0 8px oklch(0.7 0.2 180 / 0.2);
  --shadow-md: 0 0 16px oklch(0.7 0.2 180 / 0.25);
  --shadow-lg: 0 0 32px oklch(0.7 0.2 180 / 0.3);

  /* Motion — fast, snappy */
  --duration-snappy: 80ms;
  --duration-fluid: 150ms;
  --duration-slow: 250ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* Aesthetic hooks */
  --button-treatment: flat;
  --button-bg: var(--primary);
  --card-treatment: solid;
  --surface-texture: none;
  --hero-translate: 4px;
  --shadow-emphasis: high;
}
```

### Using the composable

```svelte
<script lang="ts">
  import { createAesthetic } from "bindrunes";

  const aesthetic = createAesthetic({
    default: "minimal",
    storageKey: "app-aesthetic",
  });

  aesthetic.setAesthetic("neon");
</script>
```

### Aesthetic hook reference

These tokens are read by component styles to adapt their rendering:

| Token | Values | Used by |
|---|---|---|
| `--button-treatment` | `flat`, `gradient`, `inner-light` | Button, Badge, Toggle |
| `--button-bg` | CSS value (solid or gradient) | Button background |
| `--button-bg-destructive` | CSS value | Destructive Button background |
| `--card-treatment` | `solid`, `glass`, `tinted` | Card component |
| `--surface-texture` | `none`, `grain`, `dot-grid`, `mesh` | Page-level texture overlay |
| `--hero-translate` | `px` value | Hero/landing parallax offset |
| `--shadow-emphasis` | `low`, `medium`, `high` | Elevated element shadows |

---

## Three-Axis Combinations

Any theme can be combined with any aesthetic and any density. Here are recommended combinations:

### `minimal × minimal × comfortable` (default)
Clean, minimal, professional. The baseline experience.

### `dracula × glass × comfortable`
Deep purple glassmorphism. Great for developer tools and dark-first apps.

### `nord × bento × compact`
Soft blue-grey with rounded corners, tight spacing. Ideal for data-heavy dashboards.

### `catppuccin × bento × spacious`
Friendly pastels with generous spacing and rounded corners. Perfect for consumer apps.

### `rose-pine × minimal × comfortable`
Warm, earthy, calm. Great for reading apps, journals, and personal projects.

### `github × minimal × compact`
Neutral, high-contrast, dense. Excellent for admin panels and internal tools.

### `minimal × expressive × spacious`
Dramatic indigo with bold shadows and generous whitespace. Marketing and landing pages.

### `dracula × expressive × comfortable`
Vibrant purple with mesh textures and glow shadows. Creative SaaS and portfolio sites.

### `catppuccin × glass × comfortable`
Soft pastels with translucent panels. Modern dashboards and lifestyle apps.

### `nord × neon × comfortable`
Cool blue-grey with cyan neon glow. Cyberpunk meets Nordic calm — great for dev tools.

### `dracula × brutalist × compact`
Purple accents with raw, unpolished form. Bold developer tool UIs and admin panels.

### `rose-pine × organic × spacious`
Warm earth tones with soft rounded corners and paper texture. Wellness apps, journals, and lifestyle sites.

### `catppuccin × neon × comfortable`
Pastel purples with bright neon glow. Playful gaming dashboards and creative tools.

### `github × brutalist × compact`
Neutral grey with zero radius and noise texture. Anti-design admin panels and internal tools.

### `editorial × organic × spacious`
Warm grey with generous rounded corners. Elegant landing pages and content-heavy sites.

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
  const aesthetic = createAesthetic({ default: "minimal" });
  const density = createDensity({ default: "comfortable" });
</script>

<button onclick={() => theme.setTheme("dracula")}>Dracula</button>
<button onclick={() => aesthetic.setAesthetic("glass")}>Glass</button>
<button onclick={() => density.setDensity("compact")}>Compact</button>
```

### Data Attribute Usage

Apply axes via HTML attributes for static configuration:

```svelte
<html data-theme="dracula" data-aesthetic="glass" data-density="comfortable">
```

Or via the composable for runtime reactivity:

```svelte
<script lang="ts">
  import { createTheme, createAesthetic, createDensity } from "bindrunes";
  const theme = createTheme({ default: "dracula" });
  const aesthetic = createAesthetic({ default: "glass" });
  const density = createDensity({ default: "comfortable" });
</script>

<!-- Reactive: updates the data attribute on <html> automatically -->
```

---

## Utility Classes

Provided by the Tailwind plugin:
- `.glass-panel`: Glassmorphism backdrop with blur.
- `.glass-interactive`: Hover glow interactive panel.
- `.text-gradient-violet` / `.text-gradient-gold`: Gradient text effects.
- `.bg-gradient-primary`: Apply primary gradient as background.
- `.bg-gradient-accent`: Apply accent gradient as background.
- `.bg-gradient-hero`: Apply hero atmospheric gradient.
- `.bg-gradient-surface`: Apply subtle surface gradient.
- `.section-reveal`: Scroll-triggered reveal animations.
