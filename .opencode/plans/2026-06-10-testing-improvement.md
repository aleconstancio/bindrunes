# Testing Suite Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 5 broken tests, add tests for 8 new utility files, and upgrade ~15 render-only tests to behavioral tests.

**Architecture:** Fix broken tests first (setter removal, prop API changes, deleted component). Then add focused unit tests for each new utility. Finally, upgrade existing render-only tests to verify actual behavior (click handlers, state changes, conditional rendering).

**Tech Stack:** Vitest, @testing-library/svelte, jsdom, vitest-axe

---

## Phase 1: Fix Broken Tests (5 items)

### Task 1: Fix SidebarTrigger setter usage

**Files:**
- Modify: `src/components/sidebar/SidebarTrigger.svelte:10`

- [ ] **Step 1:** Change `_ctx.open = !_ctx.open` → `_ctx.setOpen(!_ctx.open)`
- [ ] **Step 2:** Run `bun run check` — expect clean

### Task 2: Fix SidebarProvider setter usage

**Files:**
- Modify: `src/components/sidebar/SidebarProvider.svelte:28`

- [ ] **Step 1:** Change `ctx.open = open` → `ctx.setOpen(open)`
- [ ] **Step 2:** Run `bun run check` — expect clean

### Task 3: Fix SidebarRail and SidebarTrigger tests

**Files:**
- Modify: `src/components/Sidebar.svelte.test.ts:105-113`

- [ ] **Step 1:** Wrap SidebarRail and SidebarTrigger tests in SidebarProvider using SidebarTestHarness pattern
- [ ] **Step 2:** Run `npx vitest run src/components/Sidebar.svelte.test.ts` — expect PASS

### Task 4: Fix DashboardShellHeader test

**Files:**
- Modify: `src/components/dashboard/DashboardShellHeader.svelte.test.ts:33-39`

- [ ] **Step 1:** Change `statusChipLabel: "Online", statusChipVariant: "success"` → `statusChip: { label: "Online", variant: "success" }`
- [ ] **Step 2:** Run `npx vitest run src/components/dashboard/DashboardShellHeader.svelte.test.ts` — expect PASS

### Task 5: Remove ThemeBuilder test

**Files:**
- Delete: `src/components/ThemeBuilder.svelte.test.ts`

- [ ] **Step 1:** `rm src/components/ThemeBuilder.svelte.test.ts`
- [ ] **Step 2:** `grep -r "ThemeBuilder" src/ --include="*.ts" --include="*.svelte"` — expect only createThemeBuilder refs

---

## Phase 2: Add Tests for New Utility Files (8 files)

### Task 6: Test isBrowser.ts
- Create: `src/utils/isBrowser.test.ts`
- Test: `isBrowser` is boolean, true in jsdom

### Task 7: Test toError.ts
- Create: `src/utils/toError.test.ts`
- Test: Error passthrough, string/number/null/undefined wrapping

### Task 8: Test validateWithSchema.ts
- Create: `src/utils/validateWithSchema.test.ts`
- Test: valid fields → empty, invalid → error messages, multiple errors

### Task 9: Test tableFallbacks.ts
- Create: `src/utils/tableFallbacks.test.ts`
- Test: table.page formatting, pagination.perPage, unknown key passthrough, missing params

### Task 10: Test semanticColors.ts
- Create: `src/utils/semanticColors.test.ts`
- Test: 5 variants exist, each has bg/text/border/cssVar/dot, correct CSS var names

### Task 11: Test createAsyncState.svelte.ts
- Create: `src/utils/createAsyncState.svelte.test.ts`
- Test: idle init, loading/success/error lifecycle, reset

### Task 12: Test createI18nContext.svelte.ts
- Create: `src/utils/createI18nContext.svelte.test.ts`
- Test: smoke test — t function is callable

### Task 13: Test createMediaQuery.svelte.ts
- Create: `src/utils/createMediaQuery.svelte.test.ts`
- Test: matches is boolean, stop is function, stop doesn't throw

---

## Phase 3: Upgrade Render-Only Tests to Behavioral

### Task 14: Upgrade ThemeToggle test — add click toggle
### Task 15: Upgrade Toggle test — add onclick firing
### Task 16: Upgrade Popover test — add open on trigger click
### Task 17: Upgrade Tooltip test — add hover show
### Task 18: Upgrade Collapsible test — add expand/collapse
### Task 19: Upgrade ScrollArea test — add children rendering
### Task 20: Upgrade EmptyState test — add action callback

Each follows same pattern: add behavioral assertion after existing render test.

---

## Final Verification

### Task 21: Run full test suite, lint, typecheck, build
- `bun run test:ci` — all pass
- `bun run lint && bun run check` — clean
- `bun run build` — success
