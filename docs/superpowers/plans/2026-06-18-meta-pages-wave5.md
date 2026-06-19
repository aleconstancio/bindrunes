# Meta-Pages Wave 5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix critical bugs, add missing tests, expand DX with more exported types, catch up documentation, and polish the UI.

**Architecture:** Five phases: (1) fix critical bugs and API gaps, (2) add missing composable tests, (3) expand component-props.ts, (4) documentation catch-up, (5) UI polish.

---

## Phase 1: Critical Fixes

### Task 1: Fix DashboardPage Broken Imports

**File:** `src/components/boundrune/DashboardPage.svelte`

- [ ] **Step 1:** Read the file and fix the three broken imports:
  - `./dashboard/DashboardShellBrand.svelte` → `../dashboard/DashboardShellBrand.svelte`
  - `./dashboard/DashboardShellHeader.svelte` → `../dashboard/DashboardShellHeader.svelte`
  - `./dashboard/NavMenu.svelte` → `../dashboard/NavMenu.svelte`

- [ ] **Step 2:** Run lint and commit:
```bash
git add src/components/boundrune/DashboardPage.svelte
git commit -m "fix: correct import paths in deprecated DashboardPage"
```

---

### Task 2: Export useClickOutside

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1:** Read `src/utils/useClickOutside.svelte.ts` to verify it exists and is correct.

- [ ] **Step 2:** Add export to `src/index.ts` (find the section where other `use*` composables are exported):
```ts
export { useClickOutside } from "./utils/useClickOutside.svelte.ts";
```

- [ ] **Step 3:** Run lint and commit:
```bash
git add src/index.ts
git commit -m "fix: export useClickOutside from public API"
```

---

### Task 3: Fix CrudPage JSON.stringify Fallback

**File:** `src/components/boundrune/CrudPage.svelte`

- [ ] **Step 1:** Read the file and find the JSON.stringify fallback (around line 93).

- [ ] **Step 2:** Replace with EmptyState or a cleaner fallback:
```svelte
{:else if selectedItem}
  <div class="flex items-center justify-center h-full text-muted-foreground p-6">
    <p class="text-body-md">Select an item from the list to view details.</p>
  </div>
```

- [ ] **Step 3:** Run lint and commit:
```bash
git add src/components/boundrune/CrudPage.svelte
git commit -m "fix: replace CrudPage JSON.stringify fallback with cleaner empty state"
```

---

## Phase 2: Missing Tests

### Task 4: Add Test for useDebouncedCallback

**Files:**
- Create: `src/utils/useDebouncedCallback.svelte.test.ts`

- [ ] **Step 1:** Read an existing composable test for patterns (e.g., `src/utils/useCounter.svelte.test.ts` or `src/utils/useToggle.svelte.test.ts`).

- [ ] **Step 2:** Create test file:
```ts
import { describe, it, expect, vi } from "vitest";
import { useDebouncedCallback } from "./useDebouncedCallback.svelte";

describe("useDebouncedCallback", () => {
  it("delays function execution", async () => {
    const fn = vi.fn();
    const debounced = useDebouncedCallback(fn, 100);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();

    await new Promise((r) => setTimeout(r, 150));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("passes arguments to the debounced function", async () => {
    const fn = vi.fn();
    const debounced = useDebouncedCallback(fn, 50);

    debounced("hello", 42);

    await new Promise((r) => setTimeout(r, 100));
    expect(fn).toHaveBeenCalledWith("hello", 42);
  });

  it("resets timer on subsequent calls", async () => {
    const fn = vi.fn();
    const debounced = useDebouncedCallback(fn, 100);

    debounced();
    await new Promise((r) => setTimeout(r, 50));
    debounced();
    await new Promise((r) => setTimeout(r, 50));
    expect(fn).not.toHaveBeenCalled();

    await new Promise((r) => setTimeout(r, 100));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 3:** Run test: `bun run test src/utils/useDebouncedCallback.svelte.test.ts`

- [ ] **Step 4:** Commit:
```bash
git add src/utils/useDebouncedCallback.svelte.test.ts
git commit -m "test: add tests for useDebouncedCallback"
```

---

### Task 5: Add Test for useVirtualList

**Files:**
- Create: `src/utils/useVirtualList.svelte.test.ts`

- [ ] **Step 1:** Create test file:

```ts
import { describe, it, expect } from "vitest";
import { useVirtualList } from "./useVirtualList.svelte";

describe("useVirtualList", () => {
  const items = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i}` }));

  it("returns visible items based on scroll position", () => {
    const { visibleItems } = useVirtualList(items, { itemHeight: 40 });

    // Default state (scrollTop=0, containerHeight=0) should return overscan items
    expect(visibleItems.length).toBeGreaterThan(0);
    expect(visibleItems[0].index).toBe(0);
  });

  it("calculates correct styles", () => {
    const { visibleItems } = useVirtualList(items, { itemHeight: 40 });

    const first = visibleItems[0];
    expect(first.style).toContain("position:absolute");
    expect(first.style).toContain("height:40px");
  });

  it("handles empty array", () => {
    const { visibleItems } = useVirtualList([], { itemHeight: 40 });
    expect(visibleItems).toHaveLength(0);
  });

  it("respects overscan option", () => {
    const { visibleItems } = useVirtualList(items, { itemHeight: 40, overscan: 2 });
    expect(visibleItems.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2:** Run test and commit:
```bash
git add src/utils/useVirtualList.svelte.test.ts
git commit -m "test: add tests for useVirtualList"
```

---

### Task 6: Add Test for useInfiniteScroll

**Files:**
- Create: `src/utils/useInfiniteScroll.svelte.test.ts`

- [ ] **Step 1:** Create test file:

```ts
import { describe, it, expect, vi } from "vitest";
import { useInfiniteScroll } from "./useInfiniteScroll.svelte";

describe("useInfiniteScroll", () => {
  it("calls onLoadMore when sentinel intersects", () => {
    const onLoadMore = vi.fn().mockReturnValue(true);
    const sentinel = document.createElement("div");

    // Mock IntersectionObserver
    let callback: IntersectionObserverCallback | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(cb: IntersectionObserverCallback) {
          callback = cb;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );

    useInfiniteScroll(sentinel, { onLoadMore });

    // Simulate intersection
    callback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);

    expect(onLoadMore).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it("does nothing if sentinel is null", () => {
    const onLoadMore = vi.fn();
    useInfiniteScroll(null, { onLoadMore });
    expect(onLoadMore).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2:** Run test and commit:
```bash
git add src/utils/useInfiniteScroll.svelte.test.ts
git commit -m "test: add tests for useInfiniteScroll"
```

---

## Phase 3: Expand Component Prop Types

### Task 7: Add More Component Prop Types

**Files:**
- Modify: `src/components/component-props.ts`

- [ ] **Step 1:** Read the existing component-props.ts.

- [ ] **Step 2:** Read these components to get their actual props:
  - `src/components/DataTable.svelte` (first 40 lines)
  - `src/components/Select.svelte` (first 30 lines)
  - `src/components/TabsList.svelte` (first 30 lines)
  - `src/components/Switch.svelte` (first 25 lines)
  - `src/components/Tooltip.svelte` (first 25 lines)

- [ ] **Step 3:** Add exported interfaces for `DataTableProps`, `SelectProps`, `TabsProps`, `SwitchProps`, `TooltipProps`.

- [ ] **Step 4:** Run lint and commit:
```bash
git add src/components/component-props.ts
git commit -m "feat: add prop types for DataTable, Select, Tabs, Switch, Tooltip"
```

---

## Phase 4: Documentation Catch-up

### Task 8: Update composables.md with New Composables

**Files:**
- Modify: `docs/composables.md`

- [ ] **Step 1:** Read the current file to find where to add new entries.

- [ ] **Step 2:** Add documentation for the three new composables:

### `useDebouncedCallback`
Creates a debounced version of a callback function.

```ts
import { useDebouncedCallback } from "bindrunes";

const debouncedSearch = useDebouncedCallback((query: string) => {
  searchAPI(query);
}, 300);

// Call debouncedSearch(input) — waits 300ms after last call
```

### `useInfiniteScroll`
Triggers a callback when a sentinel element enters the viewport.

```ts
import { useInfiniteScroll } from "bindrunes";

let sentinel: HTMLElement;

useInfiniteScroll(sentinel, {
  onLoadMore: async () => {
    const more = await loadNextPage();
    return more; // false to stop observing
  },
});
```

### `useVirtualList`
Virtual list for rendering large datasets.

```ts
import { useVirtualList } from "bindrunes";

const { visibleItems, containerStyle, scrollTo } = useVirtualList(items, {
  itemHeight: 40,
  overscan: 5,
});

// Use visibleItems in template with position:absolute styling
// Use containerStyle on the scroll container
```

- [ ] **Step 3:** Commit:
```bash
git add docs/composables.md
git commit -m "docs: add documentation for useDebouncedCallback, useInfiniteScroll, useVirtualList"
```

---

### Task 9: Update architecture.md

**Files:**
- Modify: `docs/architecture.md`

- [ ] **Step 1:** Read the current file.

- [ ] **Step 2:** Add missing directories to the directory tree:
- `src/actions/` — Svelte actions (shortcut.ts)
- `src/components/scaffold/` — Demo layout components (DemoLayout, DemoNav, DemoFooter)
- `src/utils/agentic/` — Agentic chat kernel composables

- [ ] **Step 3:** Add a note about the agentic subsystem and the test file naming convention (`.svelte.test.ts`).

- [ ] **Step 4:** Commit:
```bash
git add docs/architecture.md
git commit -m "docs: update architecture.md with missing directories and patterns"
```

---

## Phase 5: UI Polish

### Task 10: Add Sidebar Toggle UI to PageShell

**Files:**
- Modify: `src/components/PageShell.svelte`

- [ ] **Step 1:** Read the current file.

- [ ] **Step 2:** Add optional `leftToggle` and `rightToggle` snippet props that receive the toggle function. When provided, render a toggle button in the sidebar header area.

Add to props:
```ts
leftToggle?: Snippet<[(...args: unknown[]) => void]>;
rightToggle?: Snippet<[(...args: unknown[]) => void]>;
```

Add to template after each sidebar's content:
```svelte
{#if leftToggle && leftCollapsible !== "none"}
  <div class="absolute top-2 right-2">
    {@render leftToggle(toggleLeft)}
  </div>
{/if}
```

Wait — this gets complex with positioning. Let me simplify: just add a `leftTrigger` snippet prop that renders inside the topbar, next to the content.

Actually, the cleanest approach: add a `trigger` snippet that receives `toggleLeft` and `toggleRight`, rendered in the topbar.

- [ ] **Step 3:** Run lint and commit:
```bash
git add src/components/PageShell.svelte
git commit -m "feat: add sidebar toggle trigger snippet to PageShell"
```

---

### Task 11: Clean Up index.ts Section Comments

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1:** Read the current file and fix misplaced section comments:
  - Move `AlertDialog` from "Auth & Access" to "Overlays"
  - Move `Breadcrumb` from "Navigation" to its own section or combine with other navigation
  - Ensure each section comment accurately describes the components below it

- [ ] **Step 2:** Run lint and commit:
```bash
git add src/index.ts
git commit -m "refactor: reorganize index.ts section comments"
```

---

## Phase 6: Final Verification

### Task 12: Final Lint and Verification

- [ ] **Step 1:** Run full lint: `npx biome check src/`
- [ ] **Step 2:** Run tests: `bun run test`
- [ ] **Step 3:** Verify all new exports are accessible
- [ ] **Step 4:** Final commit if any fixes needed
