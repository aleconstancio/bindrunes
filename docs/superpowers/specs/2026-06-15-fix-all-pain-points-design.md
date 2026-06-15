# Fix All Pain Points — Design Spec

## Summary

Batch-fix 23 issues across documentation, API consistency, accessibility, exports, and code organization. All fixes applied directly (breaking changes included).

## Batch 1: Quick Wins

### 1.1 README duplicate "Releases" section
- Remove duplicate lines 107-108 in README.md

### 1.2 pt-BR typo
- Fix `"PANDING QUEUE"` → `"PENDÊNCIA NA FILA"` (proper Portuguese) in `src/i18n/pt-BR.ts`

### 1.3 formatters.ts locale mismatch
- Add Spanish locale strings to `src/i18n/es.ts` or remove Spanish from `formatters.ts` relative time
- Decision: Remove Spanish from formatters.ts since i18n only covers EN/PT-BR

### 1.4 Agentic exports
- Add `"./agentic"` entry point to `package.json` exports
- Create `src/utils/agentic/index.ts` barrel export
- Export from `src/index.ts` or via subpath only

### 1.5 Complete createThemeBuilder
- Add missing tokens: shadows, spacing, borders, overlays, info/success/warning-soft, radius scale, aesthetic hooks
- Reference `src/styles/tokens/root.css` as source of truth

## Batch 2: API Consistency & Accessibility

### 2.1 Event handler casing
- `onclose` → `onClose` in: Alert, Sheet, Dialog, Drawer
- `onremove` → `onRemove` in: Badge
- Update all consumers in src/ and examples/

### 2.2 ContextMenu onSelect value
- Change `onSelect?.(item.label)` → `onSelect?.(item.value)` to match DropdownMenu contract
- Add `value` field to ContextMenuItem type if missing

### 2.3 Stepper ARIA
- Add `role="list"` to Stepper container
- Add `role="listitem"` to each step
- Add `aria-current="step"` to active step
- Add `aria-label` prop

### 2.4 Drawer a11y
- Remove `svelte-ignore a11y_no_noninteractive_element_interactions`
- Add proper focus trap using bits-ui Dialog or manual focus management
- Ensure overlay has correct `role="dialog"` and `aria-modal`

### 2.5 RadioGroup label
- Add `label` prop for visible label
- Associate with `aria-labelledby`

### 2.6 Sidebar _variant prop
- Rename `_variant` to `variant` in the component implementation to match type annotation

## Batch 3: Code Organization & Polish

### 3.1 Move test harnesses
- Move `*Harness.svelte` and `*TestWrapper.svelte` files to `src/components/__tests__/harness/`
- Update imports in test files

### 3.2 Unify Snippet imports
- Convert all inline `import("svelte").Snippet` to top-level `import type { Snippet } from "svelte"`

### 3.3 Improve cn.ts
- Add basic Tailwind class conflict resolution (precedence-based merging)
- Keep it lightweight — no full tailwind-merge dependency

## Verification

- `bun run lint` — no new warnings
- `bun run check` — TypeScript passes
- `bun run test` — all tests pass (update tests for changed APIs)
