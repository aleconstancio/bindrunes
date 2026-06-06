# Changelog

## v1.0.1 (2026-06-06)

### Testing Infrastructure

- **Co-located tests**: 141 test files moved from `__tests__/` to live next to their source files (e.g. `Button.svelte.test.ts` next to `Button.svelte`).
- **Coverage thresholds**: vitest enforces 80% lines/statements, 70% branches, 77% functions in CI. See `docs/testing.md` for rationale.
- **vitest-axe integration**: 9 high-traffic components have a11y assertions via `expectNoAxeViolations()` helper.
- **Curated bits-ui mock**: `src/helpers/bits-ui-mock.ts` exports 32 primitive factories.
- **CI workflow**: `.github/workflows/test.yml` runs lint → check → test:ci → dist leak check.
- **Test entry points**: `CardHarness.svelte`, `ButtonHarness.svelte`, `ErrorBoundaryHarness.svelte`, `FormHarness.svelte`, `SidebarTestHarness.svelte`, `PricingHarness.svelte` for components that need Svelte 5 snippet context.
- **Composable test harness**: `src/ComposableHarness.svelte` + `mountComposable` for testing `$state`/`$derived`/`$effect` runes.
- **JSDOM polyfills**: lucide-svelte (~100 icons), svelte-sonner, mode-watcher, matchMedia, `bindrunes` package alias.

### Bug Fixes (uncovered by new tests)

- **Input.svelte**: `id={name}` added to `<input>` and `<textarea>` so `<label for={name}>` references a real element. Pre-existing a11y bug.
- **landing/FAQ.svelte**: `const openValue` → `let openValue` so `bind:value` works in Svelte 5.

### Stats

- 1,046 tests passing across 141 test files
- Coverage: 80.7% statements, 71.5% branches, 78.1% functions, 83.3% lines
- 100+ a11y checks via vitest-axe

## v1.0.0 (2026-06-04)

### Breaking Changes

- **Theme suite renamed and expanded**: The 7 legacy themes (akashic, martian, alchemy, druidic, obsidian, contrast) have been replaced with 6 curated battle-tested palettes: editorial (new default), dracula (kept), nord, catppuccin, rose-pine, github. Legacy re-exports at `src/styles/themes/legacy/` forward to replacements for one release (drop in v1.2.0).

- **Default theme changed**: `editorial` (warm grey + restrained indigo) replaces `dracula` as the default theme. First paint respects `prefers-color-scheme` when no localStorage entry exists.

- **`thoth-` prefix retired**: All legacy `thoth-btn`, `thoth-shimmer`, `thoth-pulse-glow`, `thoth-spin` class names and keyframe names renamed to `btn`, `bindrunes-shimmer`, `bindrunes-pulse-glow`, `bindrunes-spin`.

- **Typography token system**: Replaced Tailwind defaults (`text-sm`, `text-xs`, `text-lg`, `text-2xl font-bold`, etc.) with a 17-step type scale (`text-display-1` through `text-mono-xs`). Each token bundles size, line-height, letter-spacing, and font-weight.

- **Complete token contract**: New system-wide CSS custom properties for typography, spacing, shadow, motion easings, container widths, surface elevation, overlays, border granularity, and info/soft state colors.

- **Component API deprecated**: `ThemeBuilder` → renamed to `ThemeStudio`. `ThemeBuilder` remains as an alias through v1.1.0.

### Features

- **Three orthogonal axes**: `data-theme` (color identity), `data-aesthetic` (form), `data-density` (spacing). Fully composable — any combination works.
- **4 aesthetic presets**: `editorial.css` (flat, snappy — default), `glass.css` (translucent, atmospheric — v0.4 legacy), `bento.css` (rounded, soft), `expressive.css` (dramatic, gradient).
- **3 density modes**: `compact`, `comfortable` (default), `spacious`. Every spacing utility becomes density-aware.
- **New composables**: `createAesthetic()`, `createDensity()`, `createPrefersTheme()`, `defineTheme()`.
- **ThemeStudio**: Full preview with 4 tabs (Theme, Aesthetic, Density, Export), live CSS generation.
- **AppProvider upgrade**: Accepts `themeDefault`, `aestheticDefault`, `densityDefault`, `respectPrefersColorScheme` props.
- **Editorial aesthetic**: Flat button surfaces (no gradient), 1px hairline borders, near-zero shadows, snappy 120ms motion, `font-display` for headings, `font-mono` for metadata.

### Token Categories Added

- Color: `--info`, `--info-foreground`, `--info-soft`, `--success-soft`, `--warning-soft`, `--destructive-soft`, `--overlay`, `--overlay-strong`, `--border-strong`, `--border-subtle`, `--card-solid`, `--surface-1/2/3`
- Typography: `--font-display`, `--font-mono`, `--text-*` (17-step type scale)
- Spacing: `--space-0` through `--space-20` (density-aware)
- Radius: `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Shadow: `--shadow-xs` through `--shadow-lg`, `--shadow-glow-*`, `--shadow-inset-subtle`
- Motion: `--duration-instant`, `--ease-standard` through `--ease-spring`
- Container: `--container-prose` through `--container-2xl`
- Aesthetic hooks: `--button-treatment`, `--card-treatment`, `--surface-texture`, `--hero-translate`, `--shadow-emphasis`

### Fixes

- `Badge.svelte`: Removed hardcoded `emerald-500`/`amber-500` → uses `success-soft`/`warning-soft` tokens.
- `Progress.svelte`: Removed hardcoded `emerald-500`/`amber-500` → uses `success`/`warning` tokens.
- `Card.svelte`: Replaced deprecated `rgba()` fallback with OKLCH.
- `Dialog.svelte`, `Sheet.svelte`: `bg-black/50` → `--overlay` token.
- `Omnibar.svelte`: `bg-black/75` → `--overlay-strong` token.
- `Alert.svelte`: `border-l-primary` for info variant → `border-l-info`.

### Migration

See `docs/migration.md` for the full v0.4 → v1.0 migration guide.
