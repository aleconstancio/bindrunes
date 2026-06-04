# bindrunes Design System v1.0 — Execution Tracking

> **For agentic workers:** This is an execution tracker, not a detailed implementation plan. The full design spec is at `docs/superpowers/specs/2026-06-04-bindrunes-design-system-v0.5-design.md` — read it first.

**Goal:** Implement the v1.0 design system elevation per the locked spec.

**Architecture:** Three orthogonal axes (theme × aesthetic × density) backed by a complete token contract, 4 form aesthetic presets, 6 named theme palettes, and 3 density modes. Refactor all 88 components onto new tokens with clean v1.0 break.

**Tech Stack:** Svelte 5, Tailwind v4, OKLCH, vitest, biome

**Status:** Execution in progress. Working tree has WIP on tokens + themes (see `git diff --stat`).

---

## Phase 1: Token foundations

- [ ] **P1.1** Write failing test: `__tests__/tokens.test.ts` asserting all v1.0 color tokens present in `preset.css`
- [ ] **P1.2** Add new color tokens to `preset.css` `--color-*` block: `--color-info`, `--color-info-foreground`, `--color-info-soft`, `--color-success-soft`, `--color-warning-soft`, `--color-destructive-soft`, `--color-overlay`, `--color-overlay-strong`, `--color-border-strong`, `--color-border-subtle`, `--color-card-solid`, `--color-surface-1`, `--color-surface-2`, `--color-surface-3`
- [ ] **P1.3** Add typography tokens to `preset.css` `--font-*` block: `--font-display`, `--font-mono`
- [ ] **P1.4** Add typography scale bundles to `preset.css` `:root`: `--text-display-1` through `--text-mono-xs` (size, line-height, tracking, weight per spec §6.2)
- [ ] **P1.5** Add spacing scale bundles to `preset.css` `:root`: `--space-0` through `--space-20` (comfortable defaults per spec §7.1)
- [ ] **P1.6** Add radius scale to `preset.css` `:root`: `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` (current `--radius` is 0.5rem; tightened from 0.625rem)
- [ ] **P1.7** Add shadow scale to `preset.css` `:root`: `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow-primary`, `--shadow-glow-destructive`, `--shadow-inset-subtle`
- [ ] **P1.8** Add motion scale to `preset.css` `:root`: `--duration-instant`, `--ease-standard`, `--ease-emphasized`, `--ease-decelerated`, `--ease-accelerated`, `--ease-spring`
- [ ] **P1.9** Add container scale to `preset.css` `:root`: `--container-prose`, `--container-sm`, `--container-md`, `--container-lg`, `--container-xl`, `--container-2xl`
- [ ] **P1.10** Update `tailwind-plugin.ts` to register new tokens in `theme.extend`
- [ ] **P1.11** Add `--font-display` to fontFamily.extend
- [ ] **P1.12** Add spacing utilities that bind to `--space-*`
- [ ] **P1.13** Add typography utilities that bind to `--text-*` bundles (`text-display-1` etc.)
- [ ] **P1.14** Add shadow utilities that bind to `--shadow-*` (`shadow-xs`, `shadow-glow-primary` etc.)
- [ ] **P1.15** Add motion utilities that bind to `--duration-*` and `--ease-*`
- [ ] **P1.16** Add `@property` blocks for new typed tokens
- [ ] **P1.17** Run `npm test` — confirm all tests still pass after token additions
- [ ] **P1.18** Commit: `feat(tokens): add v1.0 design system token contract (color, typography, spacing, shadow, motion, container)`

## Phase 2: Composables

- [ ] **P2.1** Write failing test: `__tests__/createAesthetic.test.ts` (state + persistence + attr set)
- [ ] **P2.2** Implement `src/utils/createAesthetic.svelte.ts`
- [ ] **P2.3** Write failing test: `__tests__/createDensity.test.ts`
- [ ] **P2.4** Implement `src/utils/createDensity.svelte.ts`
- [ ] **P2.5** Write failing test: `__tests__/createPrefersTheme.test.ts`
- [ ] **P2.6** Implement `src/utils/createPrefersTheme.svelte.ts`
- [ ] **P2.7** Write failing test: `__tests__/defineTheme.test.ts`
- [ ] **P2.8** Implement `src/utils/defineTheme.svelte.ts`
- [ ] **P2.9** Update `src/index.ts` to export new composables
- [ ] **P2.10** Run `npm test` — confirm all tests pass
- [ ] **P2.11** Commit: `feat(composables): add createAesthetic, createDensity, createPrefersTheme, defineTheme`

## Phase 3: Aesthetic presets

- [ ] **P3.1** Create `src/styles/aesthetics/editorial.css` (form-token overrides per spec §13)
- [ ] **P3.2** Create `src/styles/aesthetics/glass.css`
- [ ] **P3.3** Create `src/styles/aesthetics/bento.css`
- [ ] **P3.4** Create `src/styles/aesthetics/expressive.css`
- [ ] **P3.5** Update `src/styles/preset.css` to import editorial.css by default
- [ ] **P3.6** Commit: `feat(aesthetics): add 4 form aesthetic presets (editorial, glass, bento, expressive)`

## Phase 4: Theme suite

- [ ] **P4.1** Create `src/styles/themes/editorial.css` (new default, restrained indigo, both light + dark)
- [ ] **P4.2** Create `src/styles/themes/nord.css` (Nordic blue-grey)
- [ ] **P4.3** Create `src/styles/themes/catppuccin.css` (modern pastel, mocha/latte)
- [ ] **P4.4** Create `src/styles/themes/rose-pine.css` (warm muted)
- [ ] **P4.5** Create `src/styles/themes/github.css` (accessibility-safe, light + dark)
- [ ] **P4.6** Update `src/utils/createTheme.svelte.ts` to use new theme list + prefers-color-scheme first paint
- [ ] **P4.7** Create `src/styles/themes/legacy/{akashic,martian,alchemy,druidic,obsidian,contrast}.css` re-exports
- [ ] **P4.8** Update `src/utils/createThemeBuilder.svelte.ts` to include new tokens (`--info`, soft-state, overlay, border-strong/subtle, card-solid, surface-1/2/3)
- [ ] **P4.9** Run `npm test` — confirm all tests pass
- [ ] **P4.10** Commit: `feat(themes): add editorial, nord, catppuccin, rose-pine, github; preserve dracula; legacy re-exports for 6 retired names`

## Phase 5: Drift fixes

- [ ] **P5.1** Fix `src/components/Badge.svelte` (emerald/amber → success-soft/warning-soft)
- [ ] **P5.2** Fix `src/components/Progress.svelte` (emerald/amber → success/warning)
- [ ] **P5.3** Fix `src/components/Card.svelte` (rgba fallback → OKLCH; glass token usage)
- [ ] **P5.4** Fix `src/components/Dialog.svelte` (bg-black/50 → --overlay)
- [ ] **P5.5** Fix `src/components/Sheet.svelte` (bg-black/50 → --overlay)
- [ ] **P5.6** Fix `src/components/Omnibar.svelte` (bg-black/75 → --overlay-strong)
- [ ] **P5.7** Fix `src/components/Alert.svelte` (info variant → --info token)
- [ ] **P5.8** Retire `thoth-btn` prefix in `Button.svelte` (use scoped Svelte styles)
- [ ] **P5.9** Retire `thoth-shimmer`/`thoth-pulse-glow` keyframe names in `Skeleton.svelte` and `utilities.css`
- [ ] **P5.10** Run `npm test` — confirm all tests pass + update tests that asserted emerald/amber (Badge, Progress)
- [ ] **P5.11** Commit: `fix(drift): token-clean Badge/Progress/Card/Dialog/Sheet/Omnibar/Alert; retire thoth- prefix`

## Phase 6: Component refactor (88 components, 7 batches)

- [ ] **P6.1** Batch 1: Foundation — Badge, Progress, Card, Input, Spinner, Skeleton, Kbd, Label
- [ ] **P6.2** Batch 2: Form primitives — Checkbox, Switch, Select, Form, FormField, Stepper
- [ ] **P6.3** Batch 3: Feedback — Alert, StatusChip, Spinner, PageLoading, ErrorBoundary, Suspense, EmptyState, Skeleton
- [ ] **P6.4** Batch 4: Overlay — Dialog, Sheet, Popover, Popconfirm, Tooltip, DropdownMenu, Omnibar
- [ ] **P6.5** Batch 5: Navigation — Breadcrumb, Pagination, Tabs, TabsList, TabsTrigger, TabsContent
- [ ] **P6.6** Batch 6: Data — DataTable, ListPage, MetricCard, DataChart, FileUpload, RichTextEditor, RuleFootnote, SectionHeader, PageHeader
- [ ] **P6.7** Batch 7: Sidebar + Dashboard + Landing — 15 sidebar + 5 dashboard + 17 landing + ThemeBuilder + ThemeToggle + SEO + LandingSection + LandingNav + AppProvider
- [ ] **P6.8** Commit per batch: `refactor(components): batch N — token refactor across <list>`

## Phase 7: ThemeStudio + AppProvider

- [ ] **P7.1** Create `src/components/ThemeStudio.svelte` with tabs: Theme / Aesthetic / Density / Typography / Motion / Export
- [ ] **P7.2** Create `src/components/ThemeBuilder.svelte` re-export alias
- [ ] **P7.3** Update `src/index.ts` to export ThemeStudio (and keep ThemeBuilder alias)
- [ ] **P7.4** Upgrade `src/components/AppProvider.svelte` to accept `theme`, `aesthetic`, `density`, `respectPrefersColorScheme` props
- [ ] **P7.5** Commit: `feat(theme-studio): ThemeStudio with 6 tabs; AppProvider wires new composables`

## Phase 8: Documentation

- [ ] **P8.1** Write `docs/design-system.md` (axes, token layers, customization story)
- [ ] **P8.2** Write `docs/aesthetics.md` (4 aesthetics, token tables, CSS imports)
- [ ] **P8.3** Rewrite `docs/themes.md` (6-theme suite, per-theme tables)
- [ ] **P8.4** Update `docs/components.md` (typography, density columns)
- [ ] **P8.5** Update `docs/composables.md` (add new composables)
- [ ] **P8.6** Update `docs/migration.md` (v0.4 → v1.0 breaking changes)
- [ ] **P8.7** Update `.agent/AGENTS.md` (3-axis rule, token-only rule)
- [ ] **P8.8** Write `CHANGELOG.md` (v1.0.0 entry)
- [ ] **P8.9** Commit: `docs: design system v1.0 — design-system.md, aesthetics.md, themes.md rewrite, migration.md, AGENTS.md, CHANGELOG`

## Phase 9: Final verification

- [ ] **P9.1** `npm run lint` — fix any issues
- [ ] **P9.2** `npm run check` — fix any TS issues
- [ ] **P9.3** `npm test` — all 387+ tests pass
- [ ] **P9.4** Write `tests/visual-matrix.md` checklist (6 themes × 4 aesthetics × 3 densities × 2 modes = 144 combos)
- [ ] **P9.5** `npm run build` — confirm svelte-package builds
- [ ] **P9.6** Update `package.json` version to 1.0.0
- [ ] **P9.7** Commit: `chore(release): v1.0.0 — design system elevation`

---

## Open issues during execution

Track in this section as work progresses.
