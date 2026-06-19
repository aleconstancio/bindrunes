# bindrunes Full Potential — Design Spec

**Date:** 2026-06-19
**Goal:** Complete all outstanding audit items, build the interactive playground, and raise test coverage — making bindrunes production-ready for its consumers.

---

## Workstream A: UX/DX Audit Completion

All 30 items from the `2026-06-18-ux-dx-audit-design.md` spec, organized by priority.

### A1. Token Architecture

| ID | Issue | Fix |
|----|-------|-----|
| A1 | editorial.css dark block duplicates root.css (44 tokens) | Remove duplicate dark block |
| A2 | z-index @property without :root values (6 tokens) | Add `:root` entries in root.css |
| A3 | Orphaned `_easingDefault` in tokens.d.ts | Remove dead declaration |
| A4 | landing.css silently depends on utilities.css keyframes | Add `@import "./utilities.css"` |
| A5 | tailwind-plugin.ts intentionally duplicates tokens | Add warning comment (no code change) |
| A6 | `--radius` / `--radius-md` semantic redundancy | Add clarifying comment |

### A2. Component API Contracts

| ID | Issue | Fix |
|----|-------|-----|
| B1 | Input `name`/`id` coupling | Add `id` prop with generated fallback |
| B2 | Select missing `aria-describedby` on error | Link error text via aria-describedby |
| B3 | Checkbox missing `name` prop and visible error | Add `name` + optional `error` string prop |
| B4 | DropdownMenu missing `open` bindable | Add `$bindable()` for `open` |
| B5 | Dialog `sizeClasses` weak typing | Type as `Record<"sm"\|"md"\|"lg"\|"xl"\|"full", string>` |
| B6 | Tooltip per-instance Provider | Extract shared TooltipProvider |
| B7 | Popover redundant wrapper div | Remove wrapper, let bits-ui handle a11y |
| B8 | Inconsistent Snippet type imports | Standardize on `import type { Snippet }` |

### A3. Accessibility Gaps

| ID | Issue | Fix |
|----|-------|-----|
| C1 | Alert missing `role="alert"` | Add `role={variant === "destructive" ? "alert" : "status"}` |
| C2 | WizardForm missing ARIA semantics | Add `aria-current="step"` + progressbar role |
| C3 | LoginForm error missing `role="alert"` | Add `role="alert"` to error container |
| C4 | LoginForm labels not connected to inputs | Connect via matching `for`/`id` |

### A4. Docs Drift

| ID | Issue | Fix |
|----|-------|-----|
| D1 | Alert variant styling mismatch in docs | Update component-states.md to match implementation |
| D2 | PricingTable hardcoded Portuguese fallbacks | Change to English |
| D3 | landing.css `:global()` wrappers | Remove `:global()` for standalone CSS |

### A5. Showcase UX

| ID | Issue | Fix |
|----|-------|-----|
| E1 | Dead ThemeToggle import | Remove unused import |
| E2 | Legacy `on:click` syntax | Replace with `onclick` |
| E3 | Data/List page tab overflow | Add `overflow-x-auto` |
| E4 | Calendar non-deterministic state | Replace `Math.random()` with seeded |
| E5 | Portfolio broken anchor | Add `id="case-study"` to h2 |
| E6 | Dashboard nested shell layout | Remove outer `max-w-7xl` constraint |
| E7 | App page fake composable demos | Use actual composables |
| E8 | Inconsistent code snippets | Add Collapsible+CodeSnippet to missing pages |

### A6. DX

| ID | Issue | Fix |
|----|-------|-----|
| F2 | No `$$restProps` forwarding | Add `...restProps` to Button, Card, Input, Dialog, Alert, Badge |

---

## Workstream B: Interactive Playground

Build an interactive component playground in the showcase app:
- Component selector (Button, Badge, Card, Input, Dialog, Alert)
- Live prop controls (Select for enums, Switch for booleans, Input for strings)
- Real-time preview with current props
- Auto-generated code snippet
- 3-column responsive layout

---

## Workstream C: Test Coverage Push

- Raise global thresholds: lines=85%, branches=75%, functions=82%, statements=85%
- Add missing component tests for components without `.svelte.test.ts`
- Verify all tests pass with new thresholds

---

## Execution Strategy

Three parallel sub-agents:
1. **Agent A: Audit Fixes** — All Workstream A items
2. **Agent B: Playground** — Workstream B
3. **Agent C: Test Coverage** — Workstream C
