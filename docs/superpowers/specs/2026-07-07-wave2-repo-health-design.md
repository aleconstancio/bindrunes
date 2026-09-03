# Wave 2: Pre-existing Fixes + Repo Health

**Date:** 2026-07-07
**Status:** In Progress
**Goal:** Fix all pre-existing issues and add repo health improvements.

## Context

Wave 1 consolidated templates, config, docs, and added missing tests. Wave 2 fixes the remaining pre-existing bugs and improves code quality infrastructure.

## Workstreams

### 1. Fix DashboardShell/NavMenu/SidebarGroup Test Failures

**Problem:** 8+ test files crash because they render components calling `useSidebar()` without providing the sidebar context. A `SidebarProviderHarness` exists at `src/layouts/__tests__/harness/` but no failing test uses it.

**Fix:** Wrap all failing tests in `SidebarProvider`. The pattern exists in `Sidebar.svelte.test.ts`.

**Files:**
- `src/layouts/dashboard/DashboardShell.svelte.test.ts`
- `src/layouts/dashboard/DashboardShellRight.svelte.test.ts`
- `src/layouts/dashboard/NavMenu.svelte.test.ts`
- `src/layouts/sidebar/SidebarGroup.svelte.test.ts`
- `src/components/NavMenu.svelte.test.ts`
- `src/components/Sidebar.svelte.test.ts`
- `src/components/simple-components.test.ts`
- `src/templates/DashboardTemplate.svelte.test.ts`

### 2. Fix `urupe-ui/scaffold` Import

**Problem:** `examples/webapp/src/routes/+layout.svelte` imports from `urupe-ui/scaffold` which doesn't exist. Should be `urupe-ui/playground`.

**Fix:** Change one import line.

### 3. Fix Thin/Import-Only Tests

**Problem:** Several tests are just `expect(Component).toBeDefined()` — no rendering, no props, no a11y.

**Fix:** Add rendering tests, prop tests, and a11y checks.

**Files:**
- `src/domains/landing/HeroBanner.svelte.test.ts`
- `src/domains/landing/LandingNav.svelte.test.ts`
- `src/layouts/sidebar/sidebar-context.svelte.test.ts`
- `src/layouts/sidebar/SidebarRail.svelte.test.ts`
- `src/layouts/sidebar/SidebarTrigger.svelte.test.ts`

### 4. Extract Shared Tailwind Token Source

**Problem:** `tailwind-plugin.ts` and `tokens/tailwind.css` must be kept in sync manually.

**Fix:** Create `tokens/src/tailwind-map.ts` with shared token mapping. Import in `tailwind-plugin.ts`.

### 5. Add `noUncheckedIndexedAccess`

**Problem:** TypeScript strict mode doesn't catch undefined array/object access.

**Fix:** Add `"noUncheckedIndexedAccess": true` to both tsconfig files. Fix resulting type errors.

### 6. Add Agentic Domain to Size-Limit

**Problem:** `urupe-ui/domains/agentic` has no bundle size tracking.

**Fix:** Add entry to `.size-limit.json`.

## Non-Goals

- New components or features
- Storybook setup
- Interactive playground

## Success Criteria

- All pre-existing test failures resolved
- webapp builds without errors
- Thin tests expanded with real coverage
- Tailwind token single source of truth
- TypeScript stricter
- Bundle size tracked for agentic domain
