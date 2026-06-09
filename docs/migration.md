# Migration Guide

## v0.4.0 → v1.0.0

| Change | Migration |
|--------|-----------|
| **Theme suite renamed** | `editorial` replaces `dracula` as default. Old names forward via `extendTheme()` but CSS files moved to `themes/legacy/`. See theme table below. |
| **`thoth-` prefix retired** | Search/replace `thoth-btn` → `btn`, `thoth-shimmer` → `bindrunes-shimmer`, `thoth-pulse-glow` → `bindrunes-pulse-glow` |
| **Typography token system** | Replace `text-xs` → `text-body-sm` or `text-mono-xs`, `text-sm` → `text-body-md` or `text-label-md`, `text-lg` → `text-title-2` or `text-body-lg`, `text-base` → `text-body-lg`, `text-2xl font-bold` → `text-headline-2`, `text-3xl font-extrabold` → `text-display-3`, `text-4xl font-extrabold` → `text-display-2`, `text-5xl` → `text-display-1`, `text-xl` → `text-title-1`, `text-[0.65rem]` → `text-mono-xs` |
| **`createTheme()` default** | Changed from `dracula` to `editorial`. First paint respects `prefers-color-scheme`. |
| **New color tokens** | `--info`, `--info-foreground`, `--info-soft`, `--success-soft`, `--warning-soft`, `--destructive-soft`, `--overlay`, `--overlay-strong`, `--border-strong`, `--border-subtle`, `--card-solid`, `--surface-1/2/3` |
| **New font tokens** | `--font-display`, `--font-mono` |
| **Three design axes** | `createAesthetic()` (form), `createDensity()` (spacing), `createTheme()` (color). Previously only theme existed. |
| **ThemeBuilder renamed** | `<ThemeStudio>` is the new name. `<ThemeBuilder>` re-exports as alias through v1.1.x. |
| **`bg-black/50` overlays** | Replace with `bg-[--overlay]` / `bg-[--overlay-strong]`. Already fixed in Dialog, Sheet, Omnibar. |

### Theme migration table

| v0.4 name | v1.0 replacement |
|-----------|-----------------|
| `dracula` | `dracula` (kept) |
| `akashic` | `nord` |
| `martian` | `dracula` (closest warm) |
| `alchemy` | `github` |
| `druidic` | `rose-pine` |
| `obsidian` | `editorial` |
| `contrast` | `github` |

### Typography migration quick reference

| Old | New | Context |
|-----|-----|---------|
| `text-xs` | `text-body-sm` or `text-mono-sm` | Body text vs mono text |
| `text-sm` | `text-body-md` or `text-label-md` | Body text vs labels/buttons |
| `text-base` | `text-body-lg` | Default body |
| `text-lg` | `text-title-2` or `text-body-lg` | Titles vs body |
| `text-xl` | `text-title-1` | Card/dialog titles |
| `text-2xl font-bold` | `text-headline-2` | Page h2 |
| `text-3xl font-extrabold` | `text-display-3` | Marketing h2 |
| `text-4xl font-extrabold` | `text-display-2` | Marketing h1 |
| `text-5xl`, `text-6xl` | `text-display-1` | Hero |
| `text-[0.65rem]` | `text-mono-xs` | Section headers, metadata |
| `mono` | `font-mono` | Tailwind v4 utility |

## v0.4.0 → v0.5.0

| Change | Migration |
|--------|-----------|
| `createAccess()` now requires `auth` param | Update `createAccess()` → `createAccess(auth)` |
| `useChartTheme` renamed to `getChartTheme` | Search/replace `useChartTheme` → `getChartTheme` |
| `HeroSection` + `FinalCTA` merged into `HeroBanner` | Use `<HeroBanner level={1}>` for hero, `<HeroBanner level={2}>` for final CTA |
| `base.css` removed | Use `global.css` instead (already covers base styles) |
| `DEFAULT_SSE_ROUTES` deprecated | Pass your own routes to the SSE client |
| ProseMirror moved to optional deps | Run `bun add prosemirror-*` if using `RichTextEditor` |
| `utilities.css` now only contains keyframes | Utility classes are provided by the Tailwind plugin |
| Accordion context now uses `Symbol` | No migration needed — fully backward compatible |
| Sidebar tokens now in Tailwind plugin | `bg-sidebar-*`, `text-sidebar-*` classes now work with the plugin |
| `landing/` directory added | Import landing components from `bindrunes/landing` |
| `TFunction`, `Column`, `SortState` in `shared-types.ts` | Backward compatible via re-exports from `bindrunes` |

## Migrating to v0.5.0

### createAccess

```diff
- const access = createAccess();
+ const auth = createAuth();
+ const access = createAccess(auth);
```

### HeroBanner

```diff
- <HeroSection title="..." ... />
+ <HeroBanner title="..." ... />

- <FinalCTA title="..." ... />
+ <HeroBanner title="..." level={2} ... />
```

### DataTable Column/SortState

No migration needed. The unified `Column` and `SortState` types are backward compatible.
