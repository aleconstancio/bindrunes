# bindrunes Testing Elevation — 2026-06-05

| Field | Value |
|---|---|
| Status | Draft (brainstorming approved, awaiting user spec review) |
| Date | 2026-06-05 |
| Author | opencode (brainstorming skill) |
| Target | bindrunes v1.0.x (testing elevation, no API changes) |
| Type | Design spec + implementation plan |
| Supersedes | n/a (additive; no API or behavior changes) |

---

## 1. Why this spec exists

bindrunes v1.0 ships 88 Svelte 5 components, 25+ composables, a complete token contract, six themes, four aesthetics, and three density modes. The v1.0 audit added 16 test files in a single commit (`8cabec7`) — the testing culture is real, but the suite is **uneven and incomplete**:

- ~75 test files exist, but depth varies wildly (Button has 8 cases, RangeCalendar has 4 lines, Form has 2 cases).
- 15+ components have no tests at all (`AccordionItem`, `Breadcrumb`, `DataChart`, `FormField`, `PageHeader`, `RichTextEditor`, `SEO`, `Stepper`, all 16 landing components, all 14 sidebar internals, all 5 dashboard subcomponents, `ThemeBuilder/Studio/Preview/Tabs`).
- 9+ utils have no tests (`colorConvert`, `createAccess`, `extendTheme`, `hasRole`, `navigation`, `url`, `useBreakpoint`, `useHead`, `theme-defaults`, `createDarkMode`).
- `vitest.config.ts` excludes `src/test-utils.ts` from coverage but has **no threshold**; `@vitest/coverage-v8` is installed but no `test:coverage` script exists.
- `__tests__/` and `tests/` are both top-level; `tests/` is an empty placeholder; `__tests__/` mixes component and composable tests in two subfolders.
- No CI workflow runs the test suite.
- No `docs/testing.md` documents the conventions.
- No a11y testing exists.
- No curated bits-ui mock — every test that touches a bits-ui primitive re-invents `vi.mock('bits-ui', () => ({...}))`.

This spec resolves all eight with one cohesive elevation. No new public API, no new exported component, no breaking change. Pure test infrastructure + coverage work.

---

## 2. Goals & non-goals

### 2.1 Goals

- **G1.** Migrate all tests to co-located `*.svelte.test.ts` / `*.test.ts` next to source. Remove `__tests__/` and `tests/`.
- **G2.** Reach **≥80% line / 80% function / 80% statement / 70% branch** coverage on `src/**` (excluding test files), enforced in CI.
- **G3.** Add accessibility testing with `vitest-axe` on every component test.
- **G4.** Build a curated `src/helpers/bits-ui-mock.ts` factory for 24 bits-ui primitives.
- **G5.** Add `docs/testing.md` documenting patterns, helpers, mock strategy, coverage rules.
- **G6.** Add CI workflow `.github/workflows/test.yml` running `lint + check + test:ci`.
- **G7.** Add a `test:coverage` and `test:ci` npm script.
- **G8.** Maintain ARCHON's verification matrix discipline — pure test changes = `bun run test:ci` passes; config changes = `bun run build` still excludes tests from `dist/`.
- **G9.** Honor AGENTS.md laws: tests must not pull in new runtime deps, must use Valibot where schemas are involved, must use Svelte 5 runes patterns (no legacy stores).
- **G10.** Preserve all existing test semantics — no test that currently passes may be deleted or weakened (only deepened).

### 2.2 Non-goals

- **N1.** No visual regression / screenshot testing (Playwright) — defer to a future spec.
- **N2.** No mutation testing (Stryker) — defer.
- **N3.** No E2E tests — defer.
- **N4.** No new public API exports.
- **N5.** No behavior changes to existing components or composables.
- **N6.** No new test framework (stick with vitest + @testing-library/svelte).
- **N7.** No new peer dependencies. `vitest-axe` is a devDep.

---

## 3. Architecture

### 3.1 File layout

```
src/
├── test-setup.ts                        # global vi.mock for svelte-sonner, mode-watcher, lucide
├── test-utils.ts                        # thin re-export of @testing-library/svelte
├── helpers/
│   ├── mount.svelte                     # composable mount harness (moved from __tests__/helpers)
│   ├── test-wrapper.svelte.ts           # mountComposable() helper (moved)
│   ├── axe.ts                           # expectNoAxeViolations(container) wrapper  [NEW]
│   ├── bits-ui-mock.ts                  # mockBitsUi() factory for 24 primitives  [NEW]
│   └── theme.ts                         # renderWithTheme(component, theme, props)  [NEW]
├── components/
│   ├── Button.svelte
│   ├── Button.svelte.test.ts            # NEW co-located (deepened from existing 8 cases)
│   ├── Card.svelte
│   ├── Card.svelte.test.ts              # NEW
│   ├── ...
│   └── landing/
│       ├── HeroBanner.svelte
│       ├── HeroBanner.svelte.test.ts    # NEW
│       └── ...
└── utils/
    ├── createForm.svelte.ts
    ├── createForm.svelte.test.ts        # NEW co-located (migrated + deepened)
    └── ...
```

### 3.2 Removed

- `__tests__/` directory (all 75 files migrated to co-located positions)
- `tests/` directory (empty placeholder, removed)

### 3.3 Configuration changes

**`vitest.config.ts`:**
- `coverage.exclude` gains `'src/**/*.test.ts'`, `'src/**/*.spec.ts'`, `'src/helpers/**'`
- `coverage.thresholds`: start at `lines: 0, functions: 0, statements: 0, branches: 0`; ratchet to 80/80/80/70 in phase 10
- No other changes (existing `include`, `setupFiles`, `environment` are correct)

**`package.json`:**
- New `scripts.test:coverage`: `vitest run --coverage`
- New `scripts.test:ci`: `vitest run --coverage --reporter=verbose`
- New `scripts.test:watch:coverage`: `vitest --coverage`
- New `devDependencies.vitest-axe`: pin to the version compatible with vitest 4.x at install time (verify in phase 1 with a smoke test)

**`package.json` `files` field:** verify that `dist/` (output of `svelte-package`) excludes `*.test.ts`. If not, explicitly add `!src/**/*.test.ts` patterns. Validate with `bun run build` then `ls dist/components/Button.svelte.test*` (should not exist).

### 3.4 CI

**`.github/workflows/test.yml` (NEW):**
- Triggers: `push` to `main`, `pull_request` to `main` (with `paths-ignore: ['docs/**', '**/*.md']` to avoid doc-only runs)
- Steps: `actions/checkout@v4`, `oven-sh/setup-bun@v1` (with `cache: true` for `bun.lock`), `bun install --frozen-lockfile`, `bun run lint`, `bun run check`, `bun run test:ci`
- Cache: `bun install` cache keyed on `bun.lock`
- Fails on coverage threshold miss

### 3.5 Documentation

**`docs/testing.md` (NEW):**
- §1 Test directory layout (co-located convention)
- §2 Naming (`*.svelte.test.ts` for Svelte, `*.test.ts` for plain TS)
- §3 Helpers reference (`mountComposable`, `expectNoAxeViolations`, `renderWithTheme`, `mockBitsUi`)
- §4 Patterns A–E with examples
- §5 Coverage rules (80% target, allowlist for colorConvert / theme-defaults)
- §6 How to add a test for a new component
- §7 How to add a new bits-ui mock primitive

**`docs/architecture.md`:** update the directory map to reflect co-located tests and the `src/helpers/` dir.

**`docs/components.md`:** add a "Tested?" column (or link each row to its `.svelte.test.ts`).

**`CHANGELOG.md`:** add `v1.0.x` (or `Unreleased`) entry: "Testing elevation — co-located tests, a11y via vitest-axe, curated bits-ui mock, 80% coverage threshold, CI workflow, docs/testing.md".

---

## 4. Test patterns

### 4.1 Pattern A — Component test (high-traffic, 10-20 cases)

```ts
// src/components/Button.svelte.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expectNoAxeViolations } from '../helpers/axe';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders a button element by default', () => { /* ... */ });
  it('renders as anchor when href is given', () => { /* ... */ });
  it('fires onclick', async () => { /* ... */ });
  it('disabled prevents click', async () => { /* ... */ });
  it('loading shows spinner', () => { /* ... */ });
  it.each(['primary', 'secondary', 'outline', 'ghost', 'destructive'])(
    'variant=%s applies correct classes',
    (variant) => { /* ... */ }
  );
  it('respects fullWidth', () => { /* ... */ });
  it('has no a11y violations', async () => {
    const { container } = render(Button, { props: { children: 'Click' } });
    await expectNoAxeViolations(container);
  });
});
```

### 4.2 Pattern B — Composable test

```ts
// src/utils/createForm.svelte.test.ts
import { mountComposable } from '../helpers/test-wrapper.svelte';
import { createForm } from './createForm.svelte';
// existing pattern, relocated
```

### 4.3 Pattern C — Theme axis test

```ts
// src/components/Card.svelte.test.ts
import { renderWithTheme } from '../helpers/theme';

it.each(['editorial', 'dracula', 'nord', 'catppuccin', 'rose-pine', 'github'])(
  'applies %s theme via data-theme',
  (theme) => {
    const { container } = renderWithTheme(Card, { theme, children: 'X' });
    expect(container.firstElementChild?.closest('[data-theme]'))
      .toHaveAttribute('data-theme', theme);
  }
);
```

### 4.4 Pattern D — Bits-ui mock usage

```ts
// src/components/Dialog.svelte.test.ts
import { mockBitsUi } from '../helpers/bits-ui-mock';
vi.mock('bits-ui', () => mockBitsUi());
// then test that open prop binds correctly
```

### 4.5 Pattern E — Token / CSS contract

`src/styles/tokens.test.ts` covering `preset.css`, `root.css`, `property.css`, `tailwind.css`, and the 6 theme files + 4 aesthetic files. Token presence only — not values.

### 4.6 Conventions

- **Naming:** `<SourceFile>.svelte.test.ts` for Svelte components and `.svelte.ts` composables; `<SourceFile>.test.ts` for plain `.ts` utils.
- **Selectors:** prefer `getByRole` / `getByText` / `getByLabelText`; use `data-testid` only as last resort.
- **Mocks:** prefer per-test `vi.mock` over global setup; the curated factory lives in `src/helpers/bits-ui-mock.ts` and is consumed via `vi.mock('bits-ui', () => mockBitsUi())`.
- **No snapshot tests** (out of scope, would conflict with N1).

---

## 5. Coverage matrix

| Group | Files | Cases each | Notes |
|-------|-------|-----------|-------|
| **High-traffic components** | Button, Form, FormField, DataTable, DataChart, RichTextEditor, Dialog, Sheet, Combobox, DatePicker, Select, DropdownMenu, Omnibar, Popover, Popconfirm, Tooltip, Tabs, Sidebar.svelte (+ 14 internal sidebar files), Pagination, ListPage, ErrorBoundary | 10-20 | Slots, events, keyboard, a11y, edge cases |
| **Form primitives** | Input, Switch, Checkbox, RadioGroup, ToggleGroup, Toggle, Slider, PinInput, RatingGroup, TimeField, RangeCalendar, Stepper | 6-10 | Validation binding, disabled, focus, a11y |
| **Composables** | createForm, createQuery, createMutation, createTable, createWizard, createOmnibar, createApiClient, createAuth, createStorage, createI18n, createToast, createTheme, createAesthetic, createDensity, createPrefersTheme, createThemeBuilder, defineTheme, extendTheme, createDarkMode, createAccess, RealtimeClient, queryCache, sseBridge, navigation, hasRole, url, colorConvert, useBreakpoint, useHead, theme-defaults | 8-15 | State, derived, effects, errors, cleanup |
| **Simple primitives** | Card, Badge, Spinner, Skeleton, Kbd, Label, Avatar, StatusChip, Alert, MetricCard, EmptyState, SectionHeader, RuleFootnote, PageHeader, Separator, Progress, PageLoading, Suspense, LazyLoad, ThemeToggle | 3-5 | Render + key props |
| **Landing components** | 16 files (HeroBanner, PricingTable, FAQ, Testimonial, TestimonialGrid, FeatureGrid, FeatureComparison, HowItWorks, LogoCloud, IntegrationGrid, MetricsBar, Newsletter, StatsCounter, TeamSection, LandingNav, LandingSection, SiteFooter) | 3-5 | Data wiring, slot rendering, default state |
| **Theme / Studio** | ThemeBuilder, ThemeStudio, ThemePreview, AestheticTab, DensityTab, ExportTab, ThemeColorTab | 5-8 | Live CSS generation, axis independence |
| **Sidebar internals** | SidebarProvider, SidebarTrigger, SidebarRail, SidebarHeader, SidebarFooter, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarMenuSkeleton, SidebarSeparator, SidebarLayout | 3-8 | Context wiring, key interactions |
| **Dashboard** | DashboardShell, DashboardShellBrand, DashboardShellHeader, DashboardShellRight, DashboardShellTopnav, DashboardShellSplit, NavMenu | 5-10 | Layout, variant, integration with Sidebar |
| **App / SEO** | AppProvider, AuthGuard, SEO, useHead, useBreakpoint | 5-10 | Wiring through providers |
| **Styles** | preset.css, root.css, property.css, tailwind.css, 6 themes, 4 aesthetics | Contract tests | Token presence |

**Threshold:** `lines: 80, functions: 80, statements: 80, branches: 70` (per-file allowlist: `colorConvert.ts`, `theme-defaults.ts` if unreachable).

**Estimated file additions:**
- ~30 new test files (uncovered components, utils, sidebar internals, landing, dashboard subcomponents, theme studio)
- ~25 deepened test files (replacing shallow existing tests with the 80% threshold)
- 3 new helper files (`axe.ts`, `bits-ui-mock.ts`, `theme.ts`)
- 1 new doc file (`docs/testing.md`)
- 1 CI workflow file
- ~75 files migrated from `__tests__/` to `src/`

**Total touch surface:** ~110 files.

---

## 6. Bits-ui mock factory design

`src/helpers/bits-ui-mock.ts` exports `mockBitsUi({ openProps?, valueProps? })` returning a map of 24 primitives, each a function that returns a Svelte component shell. The shell:

1. Renders a wrapper `<div data-testid="bits-{name}">` with the first arg as `{ class, children, ...rest }` applied.
2. Forwards `open` and `value` (and any other declared props) onto `data-state` / `data-value` attributes.
3. Emits no-op events (`onOpenChange`, `onValueChange`) for `bind:open` / `bind:value` usage.

This makes the mock behaviorally minimal but DOM-observable — tests assert on attributes, not on internal Svelte 5 state. Avoids the brittle `vi.mock('bits-ui', () => ({ Dialog: { ...deep ceremony } }))` per-file pattern.

A small set of "structural integration" tests should still import the real `bits-ui` where jsdom permits (e.g., `Accordion` keyboard navigation), to keep the mock honest. These are flagged in the spec plan.

---

## 7. A11y wrapper design

`src/helpers/axe.ts` exports `expectNoAxeViolations(container)`. Internally:

```ts
import { expect } from 'vitest';
import { configureAxe } from 'vitest-axe';
import type { Element } from '@testing-library/svelte';

const axe = configureAxe({
  rules: {
    'aria-required-children': { enabled: false },
    'aria-required-parent': { enabled: false },
    'color-contrast': { enabled: false }, // jsdom can't render real contrast
  },
});

export async function expectNoAxeViolations(container: Element) {
  const results = await axe(container);
  expect(
    results.violations,
    `a11y violations:\n${JSON.stringify(results.violations, null, 2)}`
  ).toEqual([]);
}
```

The three disabled rules are documented in `docs/testing.md` §6 with reasoning: bits-ui primitives (Tooltip, Popover, Dialog) leave `aria-controls` empty when collapsed, and jsdom cannot compute real color contrast.

---

## 8. Execution plan (10 phases, single commit series)

1. **Scaffold helpers + CI + config.** Add `src/helpers/{axe,bits-ui-mock,theme}.ts`; add `vitest-axe` devDep; add `test:coverage` / `test:ci` / `test:watch:coverage` scripts; baseline coverage threshold (0) in `vitest.config.ts`; add `.github/workflows/test.yml`. Verify `bun run test` still runs.
2. **Add `docs/testing.md`.** Document patterns, helpers, mock strategy, coverage rules.
3. **Migrate existing tests.** Move 75 files from `__tests__/` to co-located `src/**`; update import paths. Run `bun run test` to confirm green. Remove `__tests__/` and `tests/` dirs. This is one commit.
4. **New high-traffic component tests with a11y.** Dialog, Sheet, Combobox, DataTable, DataChart, RichTextEditor, Tabs, DropdownMenu, Omnibar, Popover, Popconfirm, Tooltip, Select, Pagination, ListPage, ErrorBoundary, DatePicker, Form, FormField. Use `mockBitsUi()`. For each high-traffic component, add at least one test that uses the *real* bits-ui import (e.g., Accordion keyboard nav) to keep the mock honest.
5. **Composable coverage.** `colorConvert`, `hasRole`, `url`, `navigation`, `useBreakpoint`, `useHead`, `theme-defaults`, `createAccess`, `createDarkMode`, `extendTheme`. Pure functions, lowest risk.
6. **Sidebar internals + dashboard subcomponents + theme studio.** Use context-based testing (existing pattern).
7. **Landing components** (16 files, 3-5 cases each). Test data wiring via prop, not visuals.
8. **Strengthen shallow existing tests.** Form, Card, RangeCalendar, TimeField, NavigationMenu, Avatar, etc. Bring each to 6+ cases with a11y.
9. **Token contract tests** for 6 themes + 4 aesthetics. Move existing `__tests__/tokens.test.ts` to `src/styles/tokens.test.ts` and expand.
10. **Final pass.** Ratchet coverage threshold to 80/80/80/70. Update `docs/architecture.md` / `docs/components.md` / `CHANGELOG.md`. Validate `bun run build` excludes tests from `dist/`. Verify `bun run lint && bun run check && bun run test:ci` all green.

Each phase is one commit (or one logical commit group). The full elevation lands as one squash-merged PR.

---

## 9. Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Co-located `*.test.ts` leaks into published `dist/` | Verify `bun run build` output; add explicit `files` exclusions in `package.json` if `svelte-package` doesn't filter. |
| Bits-ui mock diverges from real behavior | Mark mock tests as "structural" — assert on DOM attributes, not internal Svelte state. Keep 1-2 real-bits-ui integration tests per high-traffic component. |
| `vitest-axe` color-contrast false-positives in jsdom | Disable `color-contrast` rule (documented). |
| 80% threshold unreachable on first pass | Threshold starts at 0%, ratchets up per-pass, lands at 80% in phase 10. |
| Migration breaks `bun run test` mid-PR | Do migration as a single commit (phase 3) before any new test work. CI catches it. |
| Pre-existing shallow tests (RangeCalendar, Form) may break after migration | Run `bun run test` post-migration, fix breakages inline before phase 4. |
| `svelte-package` may not glob-exclude `*.test.ts` | Validate with `bun run build`; if needed, list `!src/**/*.test.ts` in `package.json#files`. |
| `vitest-axe` compatibility with vitest 4.x | Pin to a known-compatible version; verify in phase 1 with a smoke test. |
| CI bloat from running on every push | Use `paths-ignore` for `docs/**` and `*.md` (test docs don't need to retrigger CI). |

---

## 10. Verification

Per ARCHON verification matrix for "test infrastructure change":

| Check | Command | Expected |
|-------|---------|----------|
| All tests pass | `bun run test` | exit 0, all green |
| Coverage report | `bun run test:ci` | ≥80% lines/functions/statements, ≥70% branches |
| Type check | `bun run check` | exit 0, no type errors |
| Lint | `bun run lint` | exit 0, no biome errors |
| Build excludes tests | `bun run build && find dist -name '*.test.*' -o -name '*.spec.*'` | empty result |
| CI green | (workflow runs on push) | all steps pass |
| Docs accurate | (visual review) | architecture.md reflects co-located convention; testing.md is correct |

---

## 11. Out of scope (deferred to future specs)

- Visual regression / screenshot tests (Playwright)
- Mutation testing (Stryker)
- E2E tests for downstream consumers
- Performance benchmarks for high-traffic components
- Bundle-size assertions in CI (could be added to the same `test:ci` script later)
