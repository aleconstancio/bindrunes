# UX/DX & Design System Audit — Design Spec

**Date:** 2026-06-18
**Goal:** Comprehensive audit and fix of residual issues across the urupe-ui component library and showcase demo — covering token architecture, component API contracts, accessibility, docs drift, showcase UX, and consumer DX.

---

## Area A: Token Architecture

### A1. `editorial.css` dark block duplicate
- **File:** `src/styles/themes/editorial.css:2-46`
- **Issue:** The entire dark block (44 tokens) is byte-for-byte identical to `:root` in `src/styles/tokens/root.css:4-60`. Adds zero visual change when `[data-theme="editorial"]` is active.
- **Fix:** Remove the duplicate dark block. Keep only the light-mode override (`:root:not(.dark)[data-theme="editorial"]`) if it differs from root defaults. If it doesn't differ, reduce editorial.css to a no-op stub (matching `comfortable.css` pattern).

### A2. z-index `@property` without `:root` values
- **File:** `src/styles/tokens/property.css:57-85`
- **Issue:** Six z-index properties (`--z-sidebar` through `--z-tooltip`) are declared via `@property` with `initial-value` fallbacks, but `root.css` never defines corresponding `:root` entries. This means z-index values are never themeable — they always use the `@property` initial-value.
- **Fix:** Add explicit `:root` entries in `root.css` for all six z-index tokens, matching the `@property` initial-values.

### A3. Orphaned `_easingDefault` in `tokens.d.ts`
- **File:** `src/styles/tokens.d.ts:148`
- **Issue:** `declare const _easingDefault: never` has no corresponding CSS custom property anywhere in the codebase. The easing tokens are `--ease-standard`, `--ease-emphasized`, `--ease-decelerated`, `--ease-accelerated`, `--ease-spring`.
- **Fix:** Remove the dead declaration.

### A4. `landing.css` depends on `utilities.css` keyframes
- **File:** `src/styles/landing.css:59`
- **Issue:** References `animation: fade-slide-in` which is defined in `utilities.css:23-31`. If `landing.css` is imported standalone (without `global.css`), the animation silently fails.
- **Fix:** Add `@import "./utilities.css"` to `landing.css`, or document the dependency.

### A5. `tailwind-plugin.ts` token duplication
- **File:** `src/tailwind-plugin.ts`
- **Issue:** Intentionally duplicates all token bindings from `tokens/tailwind.css`. Every token change requires updating two files.
- **Fix:** No code change needed — this is a known, documented trade-off. Add a more prominent warning comment and consider a shared token source (JSON/TS) as a future improvement.

### A6. `--radius` / `--radius-md` semantic redundancy
- **File:** `src/styles/tokens/root.css`
- **Issue:** Both are `0.5rem`. The distinction (base generic vs. named scale step) is unclear to consumers.
- **Fix:** Add a comment in `root.css` explaining the distinction. No value change needed.

---

## Area B: Component API Contracts

### B1. Input `name`/`id` coupling
- **File:** `src/components/Input.svelte`
- **Issue:** Uses `name` as both the form field name AND the DOM `id`. Label `for` attribute uses `name`, which fails when `name` is undefined. Two inputs with the same `name` in different contexts would have colliding IDs.
- **Fix:** Add a dedicated `id` prop. Fall back to a generated unique ID (e.g., `input-${crypto.randomUUID().slice(0, 8)}`). Keep `name` for form submission only.

### B2. Select missing `aria-describedby` on error
- **File:** `src/components/Select.svelte`
- **Issue:** Error text is rendered but not linked to the trigger via `aria-describedby`. Screen readers won't associate the error with the control.
- **Fix:** Add `aria-describedby={errorId}` on the `Select.Root` or trigger element when error is present.

### B3. Checkbox missing `name` prop and visible error
- **File:** `src/components/Checkbox.svelte`
- **Issue:** Unlike Switch, Checkbox has no `name` prop for form submission. Error handling relies on external `aria-describedby` with no visible error text.
- **Fix:** Add `name` prop. Add optional `error` string prop with rendered error text (matching Switch's pattern).

### B4. DropdownMenu missing `open` bindable
- **File:** `src/components/DropdownMenu.svelte`
- **Issue:** Dialog, Popover, and Sheet all expose `$bindable()` for `open` state. DropdownMenu does not.
- **Fix:** Add `$bindable()` for `open` state.

### B5. Dialog `sizeClasses` weak typing
- **File:** `src/components/Dialog.svelte`
- **Issue:** `sizeClasses` typed as `Record<string, string>` instead of the union type.
- **Fix:** Type as `Record<"sm" | "md" | "lg" | "xl" | "full", string>`.

### B6. Tooltip per-instance Provider
- **File:** `src/components/Tooltip.svelte`
- **Issue:** Each Tooltip instance creates its own `Tooltip.Provider`. Pages with many tooltips create redundant providers.
- **Fix:** Extract a shared `TooltipProvider` component. Render it once at the app/layout level. Remove per-instance Provider from `Tooltip.svelte`.

### B7. Popover redundant wrapper div
- **File:** `src/components/Popover.svelte`
- **Issue:** Extra `<div role="button">` wrapper with `aria-haspopup` and `aria-expanded` is redundant — bits-ui's `Popover.Trigger` already handles these semantics.
- **Fix:** Remove the wrapper div. Let bits-ui handle accessibility directly.

### B8. Inconsistent Snippet type imports
- **Files:** Multiple components
- **Issue:** Some use `import("svelte").Snippet` inline, others use top-level `import type { Snippet } from "svelte"`.
- **Fix:** Standardize on `import type { Snippet } from "svelte"` (already the dominant pattern).

---

## Area C: Accessibility Gaps

### C1. Alert missing `role="alert"`
- **File:** `src/components/Alert.svelte`
- **Issue:** Dynamic alert content is not announced to screen readers.
- **Fix:** Add `role={variant === "destructive" ? "alert" : "status"}`.

### C2. WizardForm missing ARIA semantics
- **File:** `src/components/boundrune/data/WizardForm.svelte:44-50`
- **Issue:** Active step lacks `aria-current="step"`. Progress bar lacks `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- **Fix:** Add `aria-current="step"` to active step indicator. Add `role="progressbar"` with value attributes to progress bar.

### C3. LoginForm error missing `role="alert"`
- **File:** `src/components/boundrune/auth/LoginForm.svelte:70`
- **Issue:** Error `<div>` is not announced to screen readers.
- **Fix:** Add `role="alert"` to the error container.

### C4. LoginForm labels not connected to inputs
- **File:** `src/components/boundrune/auth/LoginForm.svelte`
- **Issue:** `<label>` elements exist but aren't connected via `for`/`id` to the actual `<input>` elements. Clicking labels doesn't focus inputs.
- **Fix:** Use the Input component's `label` prop, or manually connect via matching `for`/`id` attributes.

### C5. Select error linking (same as B2)
- See B2.

---

## Area D: Docs ↔ Implementation Drift

### D1. Alert variant styling mismatch
- **Docs:** `docs/component-states.md:78-84` says Alert variants use `--destructive-soft`, `--success-soft`, etc. backgrounds
- **Implementation:** `src/components/Alert.svelte` uses only `border-l-4` with `bg-card` — no soft backgrounds
- **Fix:** Update `component-states.md` to match the border-only implementation, OR update Alert to use soft backgrounds as documented. Recommendation: update docs to match implementation (border-only is cleaner).

### D2. PricingTable hardcoded Portuguese
- **File:** `src/components/landing/PricingTable.svelte`
- **Issue:** Fallback strings are Portuguese ("Mensal", "Anual", "Economize até 20%") while the library targets English-first consumers.
- **Fix:** Change fallback values to English ("Monthly", "Annual", "Save up to 20%").

### D3. `landing.css` uses `:global()` selectors
- **File:** `src/styles/landing.css`
- **Issue:** `:global(.landing-page)`, `:global(.section-reveal)`, `:global(.stagger-enter)` are Svelte-specific. As a standalone CSS import, these wrappers are unnecessary and passed through as-is.
- **Fix:** Remove `:global()` wrappers if this file is meant as a standalone CSS import.

---

## Area E: Showcase Demo UX

### E1. Dead `ThemeToggle` import
- **File:** `examples/showcase/src/routes/+page.svelte:2`
- **Fix:** Remove `ThemeToggle` from the import.

### E2. Legacy `on:click` syntax
- **File:** `examples/showcase/src/routes/ecommerce/+page.svelte:61`
- **Fix:** Replace `on:click` with `onclick`.

### E3. Data/List page tab overflow
- **File:** `examples/showcase/src/routes/data/list/+page.svelte:269-284`
- **Issue:** 15 tabs with no overflow handling.
- **Fix:** Add `overflow-x-auto` to `<TabsList>`. Consider grouping CRUD variants (create-form, create-drawer, create-modal) into a sub-tab structure.

### E4. Calendar non-deterministic state
- **File:** `examples/showcase/src/routes/calendar/+page.svelte:36`
- **Fix:** Replace `Math.random()` with a seeded/deterministic pattern.

### E5. Portfolio broken anchor
- **File:** `examples/showcase/src/routes/portfolio/+page.svelte:26,32`
- **Fix:** Add `id="case-study"` to the `<h2>` on line 32.

### E6. Dashboard nested shell layout
- **File:** `examples/showcase/src/routes/dashboard/+page.svelte:63,117-159`
- **Issue:** `DashboardShell` instances are nested inside a `max-w-7xl` wrapper, defeating full-bleed layout.
- **Fix:** Remove the outer width constraint around `DashboardShell` instances. Render them at full width.

### E7. App page fake composable demos
- **File:** `examples/showcase/src/routes/app/+page.svelte:41-42,274-292`
- **Issue:** Labels say "useToggle"/"useCounter" but the code uses raw `$state` — doesn't call actual composables.
- **Fix:** Import and use actual `useToggle()` and `useCounter()` composables.

### E8. Inconsistent Collapsible code snippets
- **Files:** Multiple showcase pages
- **Issue:** Some pages have Collapsible+CodeSnippet blocks, others don't.
- **Fix:** Standardize: every demo section should have a Collapsible code snippet. Add them to: Aesthetics, Themes, Portfolio, Settings, Data/List (each tab), all Auth pages, Marketing/Blog, Marketing/Changelog, Marketing/Docs, Dashboard/Split.

---

## Area F: DX for Library Consumers

### F1. `landing.css` standalone import breakage (same as A4)
- See A4.

### F2. No `$$restProps` forwarding
- **Files:** All components in `src/components/`
- **Issue:** Consumers cannot pass `data-*`, `aria-*`, or `style` attributes to the root element.
- **Fix:** Add `...restProps` spreading to root elements. Prioritize high-traffic components: Button, Card, Input, Dialog, Alert, Badge.

### F3. Alert docs/implementation mismatch (same as D1)
- See D1.

---

## Execution Order

1. **C (Accessibility)** — highest impact, WCAG compliance
2. **B (API Contracts)** — consistency for all consumers
3. **D (Docs Drift)** — quick wins, builds trust
4. **A (Token Architecture)** — foundational correctness
5. **E (Showcase UX)** — polish the demo experience
6. **F (DX)** — forward-looking improvements

## Verification

After each batch:
- `bun run lint` — no new warnings
- `bun run check` — TypeScript passes
- `bun run test` — all tests pass (update tests for changed APIs)
- Manual check: run showcase app, verify affected pages render correctly
