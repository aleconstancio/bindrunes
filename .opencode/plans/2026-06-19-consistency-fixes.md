# v2.0 Consistency & Quality Fixes

## Overview

Fix all critical, high, and medium priority issues identified in the post-overhaul audit. The framework is currently non-functional due to broken imports, wrong export paths, and incomplete file moves.

## Goals

- Fix all critical issues that make the framework non-functional
- Complete the 4-layer architecture by moving remaining components
- Update all documentation to reflect new structure
- Improve component quality and test coverage

## Non-Goals

- Adding new features (this is a fix/improvement pass)
- Changing the underlying Svelte 5 patterns
- Modifying the CSS token system

---

## Phase 1: Critical Fixes (Ship Blockers)

### Task 1.1: Fix package.json `"."` export

**Files:**
- Modify: `packages/bindrunes/package.json`

**Change:**
```json
// Before
".": {
  "types": "./dist/primitives/index.d.ts",
  "svelte": "./dist/primitives/index.js",
  "default": "./dist/primitives/index.js"
}

// After
".": {
  "types": "./dist/index.d.ts",
  "svelte": "./dist/index.js",
  "default": "./dist/index.js"
}
```

### Task 1.2: Fix AppProvider and AuthGuard imports

**Files:**
- Modify: `packages/bindrunes/src/index.ts`

**Change:**
```typescript
// Before
export { default as AppProvider } from "./primitives/AppProvider.svelte";
export { default as AuthGuard } from "./primitives/AuthGuard.svelte";

// After
export { default as AppProvider } from "./components/AppProvider.svelte";
export { default as AuthGuard } from "./components/AuthGuard.svelte";
```

### Task 1.3: Fix domain component imports

**Files:**
- All files in `src/domains/auth/`
- All files in `src/domains/chat/`
- All files in `src/domains/data/`
- All files in `src/domains/landing/`
- All files in `src/domains/media/`
- All files in `src/domains/calendar/`
- All files in `src/domains/ecommerce/`
- All files in `src/domains/portfolio/`
- All files in `src/domains/settings/`
- All files in `src/domains/marketing/`

**Pattern:**
- `../../Button.svelte` → `../../primitives/Button.svelte`
- `../../Card.svelte` → `../../primitives/Card.svelte`
- `../../Input.svelte` → `../../primitives/Input.svelte`
- `../../Form.svelte` → `../../components/Form.svelte`
- `../Button.svelte` → `../../primitives/Button.svelte` (for nested domains)

### Task 1.4: Fix template imports

**Files:**
- All files in `src/templates/`

**Change:**
- `../domains/dashboard/DashboardShellBrand.svelte` → `../layouts/dashboard/DashboardShellBrand.svelte`
- `../domains/dashboard/DashboardShellHeader.svelte` → `../layouts/dashboard/DashboardShellHeader.svelte`
- `../domains/dashboard/NavMenu.svelte` → `../layouts/dashboard/NavMenu.svelte`

---

## Phase 2: Complete 4-Layer Architecture

### Task 2.1: Move AppProvider and AuthGuard to primitives

**Files:**
- Move: `src/components/AppProvider.svelte` → `src/primitives/`
- Move: `src/components/AppProvider.svelte.test.ts` → `src/primitives/`
- Move: `src/components/AuthGuard.svelte` → `src/primitives/`
- Move: `src/components/AuthGuard.svelte.test.ts` → `src/primitives/`

### Task 2.2: Move Form components to domains/data

**Files:**
- Move: `src/components/Form.svelte` → `src/domains/data/`
- Move: `src/components/Form.svelte.test.ts` → `src/domains/data/`
- Move: `src/components/FormField.svelte` → `src/domains/data/`
- Move: `src/components/FormField.svelte.test.ts` → `src/domains/data/`

### Task 2.3: Move data visualization to domains/data

**Files:**
- Move: `src/components/DataTable.svelte` → `src/domains/data/`
- Move: `src/components/DataTable.svelte.test.ts` → `src/domains/data/`
- Move: `src/components/DataChart.svelte` → `src/domains/data/`

### Task 2.4: Move theme components to primitives

**Files:**
- Move: `src/components/ThemeStudio.svelte` → `src/primitives/`
- Move: `src/components/ThemeStudio.svelte.test.ts` → `src/primitives/`
- Move: `src/components/ThemeToggle.svelte` → `src/primitives/`
- Move: `src/components/ThemeToggle.svelte.test.ts` → `src/primitives/`
- Move: `src/components/ThemePreview.svelte` → `src/primitives/`
- Move: `src/components/ThemePreview.svelte.test.ts` → `src/primitives/`
- Move: `src/components/ThemeColorTab.svelte` → `src/primitives/`
- Move: `src/components/ThemeColorTab.svelte.test.ts` → `src/primitives/`
- Move: `src/components/AestheticTab.svelte` → `src/primitives/`
- Move: `src/components/AestheticTab.svelte.test.ts` → `src/primitives/`
- Move: `src/components/DensityTab.svelte` → `src/primitives/`
- Move: `src/components/DensityTab.svelte.test.ts` → `src/primitives/`
- Move: `src/components/ExportTab.svelte` → `src/primitives/`
- Move: `src/components/ExportTab.svelte.test.ts` → `src/primitives/`

### Task 2.5: Move remaining components to primitives

**Files:**
- Move: `src/components/Omnibar.svelte` → `src/primitives/`
- Move: `src/components/Popconfirm.svelte` → `src/primitives/`
- Move: `src/components/Timeline.svelte` → `src/primitives/`
- Move: `src/components/Timeline.svelte.test.ts` → `src/primitives/`
- Move: `src/components/EmptyState.svelte` → `src/primitives/`
- Move: `src/components/EmptyState.svelte.test.ts` → `src/primitives/`
- Move: `src/components/ErrorMessage.svelte` → `src/primitives/`
- Move: `src/components/ErrorMessage.svelte.test.ts` → `src/primitives/`
- Move: `src/components/Kbd.svelte` → `src/primitives/`
- Move: `src/components/Kbd.svelte.test.ts` → `src/primitives/`
- Move: `src/components/Label.svelte` → `src/primitives/`
- Move: `src/components/Label.svelte.test.ts` → `src/primitives/`
- Move: `src/components/MetricCard.svelte` → `src/primitives/`
- Move: `src/components/MetricCard.svelte.test.ts` → `src/primitives/`
- Move: `src/components/Suspense.svelte` → `src/primitives/`
- Move: `src/components/Suspense.svelte.test.ts` → `src/primitives/`

### Task 2.6: Move ToastProvider to primitives

**Files:**
- Move: `src/components/ToastProvider.svelte` → `src/primitives/`
- Move: `src/components/ToastProvider.svelte.test.ts` → `src/primitives/`

### Task 2.7: Update all imports after moves

- Update `src/index.ts` to use new paths
- Update all internal imports across the codebase
- Update `src/urupe-ui-stub.ts`

### Task 2.8: Clean up empty components directory

- Remove `src/components/` if empty

---

## Phase 3: Documentation & Quality

### Task 3.1: Update README.md

- Fix export paths
- Fix component count
- Update examples to use `useX()` naming

### Task 3.2: Update docs/architecture.md

- Document the 4-layer hierarchy
- Document the `components/` → layer moves
- Update directory structure

### Task 3.3: Update docs/components.md

- Fix import paths
- Update component categorization

### Task 3.4: Update docs/composables.md

- Fix `createQuery` → `useQuery` examples
- Update import paths

### Task 3.5: Update docs/boundrunes.md

- Fix `urupe-ui/boundrune` → `urupe-ui/templates` or `urupe-ui/domains`
- Update component references

### Task 3.6: Update docs/landing.md

- Fix `MarketingPage` → `MarketingTemplate`
- Fix export paths

### Task 3.7: Update docs/index.md

- Fix all export paths
- Remove non-existent paths

### Task 3.8: Add `class` prop to Badge and Switch

### Task 3.9: Add tests for templates (10 files)

### Task 3.10: Add tests for missing primitives (5 files)

### Task 3.11: Clean up orphaned files

- Remove `domains/app/` empty directory
- Remove duplicate `domains/types.ts`

### Task 3.12: Fix naming inconsistencies

- Decide on `createX` vs `useX` convention
- Rename mismatched functions

---

## Verification

After completing all tasks, run:

```bash
cd packages/bindrunes
bun run check    # TypeScript check
bun run test     # Run tests
bun run build    # Build library
```

All should pass without errors.
