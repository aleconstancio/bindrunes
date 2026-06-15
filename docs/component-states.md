# Component States

Visual reference for every component state, the tokens used, and expected behavior.

## Button

| State | Visual | Tokens Used |
|-------|--------|-------------|
| **Default** | Solid bg, border-subtle, shadow-md | `--primary`, `--primary-foreground`, `--border-subtle`, `--shadow-md` |
| **Hover** | Shadow-lg, opacity 95% | `--shadow-lg` |
| **Active/Pressed** | Scale 0.975 | `transform: scale(0.975)` |
| **Focus** | Ring outline | `--ring` via `box-shadow: 0 0 0 2px var(--ring)` |
| **Disabled** | Opacity 50%, pointer-events none | `opacity: 0.5` |
| **Loading** | Spinner replaces content, pointer-events none | `animate-spin` on border spinner |

**Variants:** primary, secondary, outline, ghost, destructive, link, soft, subtle  
**Sizes:** sm (h-8), md (h-10), lg (h-12)

---

## Card

| State | Visual | Tokens Used |
|-------|--------|-------------|
| **Default (surface)** | Solid bg, border, shadow-sm | `--card`, `--card-foreground`, `--border`, `--shadow-sm` |
| **Glass** | Translucent bg, backdrop-blur, glass-border | `--glass-surface`, `--glass-border`, `backdrop-blur(16px)` |
| **Outlined** | Transparent bg, border only | `--border` |
| **Ghost** | No bg, no border | — |
| **Interactive hover** | Border primary/22%, shadow-lg, translateY(-2px) | `--primary` at 22% alpha, `--shadow-lg` |
| **Interactive active** | translateY(0), scale(0.99), shadow-sm | `--shadow-sm` |

Padding is controlled by `--card-padding` (default: 1rem), independent of `--radius`.

---

## Input

| State | Visual | Tokens Used |
|-------|--------|-------------|
| **Default** | Border, bg-input, text-foreground | `--border`, `--input`, `--foreground` |
| **Focus** | Ring + ring-offset | `--ring`, `--ring-offset` (2px ring, 1px offset) |
| **Error** | Border-destructive | `--destructive` |
| **Disabled** | Opacity 50%, cursor not-allowed | `opacity: 0.5` |
| **Placeholder** | Muted text | `--muted-foreground` |

Error/helper text appears below the input: `--destructive` for errors, `--muted-foreground` for helpers.

---

## Badge

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| primary | `--primary` | `--primary-foreground` | none |
| secondary | `--secondary` | `--secondary-foreground` | none |
| destructive | `--destructive` | `--destructive-foreground` | none |
| outline | transparent | `--foreground` | `--border` |
| success | `--success-soft` | `--success` | none |
| warning | `--warning-soft` | `--warning` | none |
| info | `--info-soft` | `--info` | none |

---

## Dialog / Sheet / Drawer

| State | Visual | Tokens Used |
|-------|--------|-------------|
| **Overlay** | Semi-transparent dark backdrop | `--overlay` (default), `--overlay-strong` (intense) |
| **Panel** | Card bg, shadow-lg, rounded | `--card`, `--card-foreground`, `--shadow-lg`, `--radius-lg` |
| **Focus trap** | First focusable element receives focus ring | `--ring` |

Sizes: sm (24rem), md (32rem), lg (40rem), xl (48rem), full (100vw).

---

## Alert

| Variant | Background | Text | Border | Icon Color |
|---------|-----------|------|--------|------------|
| default | `--card` | `--card-foreground` | `--border` | — |
| destructive | `--destructive-soft` | `--destructive` | `--destructive` | `--destructive` |
| success | `--success-soft` | `--success` | `--success` | `--success` |
| warning | `--warning-soft` | `--warning` | `--warning` | `--warning` |
| info | `--info-soft` | `--info` | `--info` | `--info` |

---

## ThemeToggle

Cycles through: system → light → dark → system.

Uses `createDarkMode()` composable. Persisted to `localStorage` via `createPersistedDataAttribute`.

---

## Tabs

| State | Visual | Tokens Used |
|-------|--------|-------------|
| **Active trigger** | Bg-primary, text-primary-foreground, rounded | `--primary`, `--primary-foreground`, `--radius-sm` |
| **Inactive trigger** | Text-muted-foreground, hover bg-muted | `--muted-foreground`, `--muted` |
| **Content** | Visible when `value` matches | — |

---

## Switch / Checkbox

| State | Visual | Tokens Used |
|-------|--------|-------------|
| **Unchecked** | Border-border, bg-transparent | `--border` |
| **Checked** | Bg-primary, border-primary | `--primary` |
| **Focus** | Ring | `--ring` |
| **Disabled** | Opacity 50% | `opacity: 0.5` |

---

## Progress

| State | Visual | Tokens Used |
|-------|--------|-------------|
| **Track** | Bg-muted, rounded-full | `--muted` |
| **Fill** | Bg-primary, transition width | `--primary` |
| **Indeterminate** | Animated shimmer | `bindrunes-shimmer` keyframe |

---

## Skeleton

Animated placeholder using `bindrunes-shimmer` keyframe over `--muted` background.

---

## State Color Mapping

For programmatic use, the `semanticColors` utility provides consistent class mappings:

| Semantic | Background | Text | Border | Dot |
|----------|-----------|------|--------|-----|
| success | `bg-success/12` | `text-success` | `border-success/20` | `bg-success` |
| warning | `bg-warning/12` | `text-warning` | `border-warning/20` | `bg-warning` |
| destructive | `bg-destructive/12` | `text-destructive` | `border-destructive/20` | `bg-destructive` |
| info | `bg-info/12` | `text-info` | `border-info/20` | `bg-info` |
| neutral | `bg-muted` | `text-muted-foreground` | `border-border` | `bg-muted-foreground` |
