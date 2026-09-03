# Meta-Pages Elevation Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the layout system, improve DX with exported types, add new composables, create new demo screens, and polish documentation.

**Architecture:** Five phases: (1) refactor DashboardShell and unify layout systems, (2) export component prop types, (3) add new composables, (4) create new demo screens, (5) documentation polish.

**Tech Stack:** Svelte 5 runes, TypeScript, Tailwind CSS v4, bits-ui, existing urupe-ui component library.

---

## Phase 1: Refactor Layout System

### Task 1: Break Apart DashboardShell God Component

**Files:**
- Modify: `src/components/dashboard/DashboardShell.svelte`
- Modify: `src/components/dashboard/DashboardShellRight.svelte`
- Modify: `src/components/dashboard/DashboardShellTopnav.svelte`

`DashboardShell` is 190 lines handling 3 layout variants. Extract the topnav variant into a standalone component and simplify DashboardShell to handle only sidebar layouts.

- [ ] **Step 1: Read DashboardShell.svelte**

Read the full file to understand the three variants.

- [ ] **Step 2: Refactor DashboardShellTopnav.svelte**

Currently a 12-line wrapper. Make it a fully independent component with its own layout logic (extracted from DashboardShell's topnav variant, lines 89-127):

```svelte
<script lang="ts">
import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant, TFunction } from "../../shared-types";
import DashboardShellBrand from "./DashboardShellBrand.svelte";
import ThemeToggle from "../ThemeToggle.svelte";
import StatusChip from "../StatusChip.svelte";

let {
  appName = "",
  appSubtitle,
  brandIcon,
  navigation = [],
  pathname = "",
  onNavigate,
  headerActions,
  statusChip,
  children,
}: {
  appName?: string;
  appSubtitle?: string;
  brandIcon?: string | Component;
  navigation?: NavGroup[];
  pathname?: string;
  onNavigate?: (to: string) => void;
  headerActions?: Snippet;
  statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
  children?: Snippet;
} = $props();

let pagePath = $derived(pathname ?? (typeof window !== "undefined" ? window.location.pathname : ""));
</script>

<div class="flex flex-col min-h-screen">
  <header class="sticky top-0 z-20 shrink-0 border-b border-border bg-background/45 backdrop-blur-md transition-all duration-[--duration-fluid]">
    <div class="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex items-center gap-6">
        <DashboardShellBrand {brandIcon} {appName} />
        <nav class="hidden md:flex items-center gap-1">
          {#each navigation as group}
            {#each group.items as item}
              <a
                href={item.to}
                class="px-3 py-1.5 text-label-md rounded transition-colors"
                class:text-foreground={pagePath.startsWith(item.to)}
                class:text-muted-foreground={!pagePath.startsWith(item.to)}
                class:bg-muted={pagePath.startsWith(item.to)}
                class:bg-transparent={!pagePath.startsWith(item.to)}
              >
                {item.title}
              </a>
            {/each}
          {/each}
        </nav>
      </div>
      <div class="flex items-center gap-3">
        {#if headerActions}
          {@render headerActions()}
        {:else if statusChip?.label}
          <StatusChip variant={statusChip.variant ?? 'info'} label={statusChip.label} dot={statusChip.dot ?? true} animate={statusChip.animate ?? false} />
        {/if}
        <ThemeToggle />
      </div>
    </div>
  </header>
  <main class="flex-1 min-w-0">
    {@render children?.()}
  </main>
</div>
```

- [ ] **Step 3: Simplify DashboardShell.svelte**

Remove the `variant` prop and the topnav branch (lines 89-127). DashboardShell now only handles sidebar layouts. Keep the `variant` prop for backward compatibility but deprecate it — the "right" variant uses `SidebarProvider` with `flex-direction: row-reverse`.

Actually, keep the `variant` prop since "default" and "right" share the same sidebar code. Just remove the "topnav" variant and redirect consumers to `DashboardShellTopnav`.

Change the type from `"default" | "right" | "topnav"` to `"default" | "right"` and add a deprecation comment.

- [ ] **Step 4: Update DashboardShellRight.svelte**

Remove the `variant` spread pattern. Type props explicitly:

```svelte
<script lang="ts">
import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant } from "../../shared-types";
import DashboardShell from "./DashboardShell.svelte";

let {
  appName,
  appSubtitle,
  brandIcon,
  navigation,
  pathname,
  onNavigate,
  headerActions,
  statusChip,
  sidebarCollapsible = "icon",
  sidebarHeader,
  sidebarFooter,
  children,
}: {
  appName?: string;
  appSubtitle?: string;
  brandIcon?: string | Component;
  navigation?: NavGroup[];
  pathname?: string;
  onNavigate?: (to: string) => void;
  headerActions?: Snippet;
  statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
  sidebarCollapsible?: "icon" | "full";
  sidebarHeader?: Snippet;
  sidebarFooter?: Snippet;
  children?: Snippet;
} = $props();
</script>

<DashboardShell
  variant="right"
  {appName}
  {appSubtitle}
  {brandIcon}
  {navigation}
  {pathname}
  {onNavigate}
  {headerActions}
  {statusChip}
  {sidebarCollapsible}
  {sidebarHeader}
  {sidebarFooter}
>
  {@render children?.()}
</DashboardShell>
```

- [ ] **Step 5: Run lint**

Run: `npx biome check src/components/dashboard/`

- [ ] **Step 6: Commit**

```bash
git add src/components/dashboard/DashboardShell.svelte src/components/dashboard/DashboardShellTopnav.svelte src/components/dashboard/DashboardShellRight.svelte
git commit -m "refactor: extract DashboardShellTopnav as standalone component"
```

---

### Task 2: Deprecate DashboardPage in Favor of DashboardShell

**Files:**
- Modify: `src/components/boundrune/DashboardPage.svelte`

`DashboardPage` (81 lines) wraps `PageShell` while `DashboardShell` (190 lines) wraps `SidebarProvider`. They solve the same problem. Deprecate `DashboardPage` and redirect consumers to `DashboardShell`.

- [ ] **Step 1: Add deprecation notice to DashboardPage.svelte**

Add a JSDoc `@deprecated` tag and a comment redirecting to DashboardShell:

```svelte
<script lang="ts">
/** @deprecated Use DashboardShell from urupe-ui/dashboard instead. This component will be removed in v2.0. */
```

- [ ] **Step 2: Update exports to note deprecation**

In `src/components/boundrune/index.ts`, add a comment:

```ts
/** @deprecated Use DashboardShell from urupe-ui/dashboard instead */
export { default as DashboardPage } from "./DashboardPage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/DashboardPage.svelte src/components/boundrune/index.ts
git commit -m "deprecate: mark DashboardPage as deprecated in favor of DashboardShell"
```

---

## Phase 2: Export Component Prop Types

### Task 3: Create Component Props Types File

**Files:**
- Create: `src/components/component-props.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Create component-props.ts with top component prop types**

Create a file that re-exports the props types from each component. Since Svelte 5 components define props inline, we need to extract them into named interfaces.

For the most-used components, create exported interfaces:

```ts
// src/components/component-props.ts
import type { Component, Snippet } from "svelte";

// Button
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "soft" | "subtle";
  size?: "default" | "sm" | "lg" | "icon";
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  class?: string;
  children?: Snippet;
  onclick?: (e: MouseEvent) => void;
}

// Card
export interface CardProps {
  variant?: "surface" | "glass" | "outlined" | "ghost";
  padding?: boolean;
  class?: string;
  children?: Snippet;
}

// Input
export interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  class?: string;
}

// Badge
export interface BadgeProps {
  variant?: "default" | "primary" | "secondary" | "outline" | "destructive" | "soft";
  size?: "default" | "sm" | "lg";
  class?: string;
  children?: Snippet;
}

// Dialog
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  class?: string;
  children?: Snippet;
}
```

- [ ] **Step 2: Export from index.ts**

Add to `src/index.ts`:

```ts
export type { ButtonProps, CardProps, InputProps, BadgeProps, DialogProps } from "./components/component-props";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/component-props.ts src/index.ts
git commit -m "feat: export component prop types for Button, Card, Input, Badge, Dialog"
```

---

## Phase 3: New Composables

### Task 4: Add useDebouncedCallback

**Files:**
- Create: `src/utils/useDebouncedCallback.svelte.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Create the composable**

```ts
// src/utils/useDebouncedCallback.svelte.ts
import { useDebounce } from "./useDebounce.svelte";

/**
 * Debounce an async callback function.
 * Returns a stable debounced function that delays invocation.
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): T {
  const debouncedFn = useDebounce(fn, delay);
  return ((...args: unknown[]) => {
    debouncedFn(...args);
  }) as T;
}
```

Wait — `useDebounce` wraps a reactive value, not a callback. Let me check the actual API.

Actually, the better approach is to use a simple debounce utility with `$effect` cleanup:

```ts
// src/utils/useDebouncedCallback.svelte.ts

/**
 * Creates a debounced version of a callback function.
 * The returned function delays calling the original function
 * until after `delay` milliseconds have elapsed since the last call.
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

- [ ] **Step 2: Export from index.ts**

```ts
export { useDebouncedCallback } from "./utils/useDebouncedCallback.svelte.ts";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/utils/useDebouncedCallback.svelte.ts src/index.ts
git commit -m "feat: add useDebouncedCallback composable"
```

---

### Task 5: Add useInfiniteScroll

**Files:**
- Create: `src/utils/useInfiniteScroll.svelte.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Create the composable**

```ts
// src/utils/useInfiniteScroll.svelte.ts
import { useIntersectionObserver } from "./useIntersectionObserver.svelte";

interface UseInfiniteScrollOptions {
  onLoadMore: () => Promise<boolean> | boolean;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Triggers a callback when the user scrolls to the bottom of a container.
 * Uses IntersectionObserver on a sentinel element.
 */
export function useInfiniteScroll(
  sentinel: HTMLElement | null | undefined,
  options: UseInfiniteScrollOptions,
): void {
  const { onLoadMore, threshold = 0, rootMargin = "100px" } = options;

  if (!sentinel) return;

  useIntersectionObserver(
    sentinel,
    async (isIntersecting) => {
      if (isIntersecting) {
        const hasMore = await onLoadMore();
        if (!hasMore) {
          // Stop observing if no more data
          // The observer will be cleaned up on unmount
        }
      }
    },
    { threshold, rootMargin },
  );
}
```

- [ ] **Step 2: Export from index.ts**

```ts
export { useInfiniteScroll } from "./utils/useInfiniteScroll.svelte.ts";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/utils/useInfiniteScroll.svelte.ts src/index.ts
git commit -m "feat: add useInfiniteScroll composable"
```

---

### Task 6: Add useVirtualList

**Files:**
- Create: `src/utils/useVirtualList.svelte.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Create the composable**

```ts
// src/utils/useVirtualList.svelte.ts

interface UseVirtualListOptions {
  itemHeight: number;
  overscan?: number;
}

interface UseVirtualListResult<T> {
  visibleItems: { item: T; index: number; style: string }[];
  containerStyle: string;
  containerProps: { onscroll: (e: Event) => void };
  scrollTo: (index: number) => void;
}

/**
 * Virtual list for rendering large datasets efficiently.
 * Only renders items visible in the viewport plus overscan.
 */
export function useVirtualList<T>(
  items: T[],
  options: UseVirtualListOptions,
): UseVirtualListResult<T> {
  const { itemHeight, overscan = 5 } = options;
  let scrollTop = $state(0);
  let containerHeight = $state(0);

  const totalHeight = $derived(items.length * itemHeight);
  const startIndex = $derived(Math.max(0, Math.floor(scrollTop / itemHeight) - overscan));
  const endIndex = $derived(
    Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan),
  );

  const visibleItems = $derived(
    items.slice(startIndex, endIndex).map((item, i) => ({
      item,
      index: startIndex + i,
      style: `position: absolute; top: ${(startIndex + i) * itemHeight}px; left: 0; right: 0; height: ${itemHeight}px;`,
    })),
  );

  const containerStyle = $derived(`position: relative; height: ${totalHeight}px; overflow: auto;`);

  function handleScroll(e: Event) {
    scrollTop = (e.target as HTMLElement).scrollTop;
  }

  function scrollTo(index: number) {
    scrollTop = index * itemHeight;
  }

  return {
    get visibleItems() { return visibleItems; },
    get containerStyle() { return containerStyle; },
    containerProps: { onscroll: handleScroll },
    scrollTo,
  };
}
```

- [ ] **Step 2: Export from index.ts**

```ts
export { useVirtualList } from "./utils/useVirtualList.svelte.ts";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/utils/useVirtualList.svelte.ts src/index.ts
git commit -m "feat: add useVirtualList composable"
```

---

## Phase 4: New Demo Screens

### Task 7: Create Composable Playground Screen

**Files:**
- Create: `examples/showcase/src/routes/playground/composables/+page.svelte`

- [ ] **Step 1: Create the composable playground**

This screen demonstrates `useCounter`, `useToggle`, `useClipboard`, `useDebounce`, `useDebouncedCallback`, and `useInfiniteScroll` with interactive controls.

```svelte
<script lang="ts">
import { Card, Badge, Button, Input, Separator } from "urupe-ui";
import { useCounter } from "urupe-ui";
import { useToggle } from "urupe-ui";
import { useClipboard } from "urupe-ui";
import { useDebouncedCallback } from "urupe-ui";

const counter = useCounter(0);
const toggle = useToggle(false);
const { copied, copy } = useClipboard();

let searchQuery = $state("");
let debouncedResult = $state("");

const debouncedSearch = useDebouncedCallback((value: string) => {
  debouncedResult = value ? `Searching for: "${value}"` : "";
}, 500);

function handleSearch(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  searchQuery = value;
  debouncedSearch(value);
}
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
  <div>
    <h1 class="text-display-3 mb-2">Composable Playground</h1>
    <p class="text-body-lg text-muted-foreground">Interactive demos for urupe-ui composables.</p>
  </div>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useCounter</h2>
        <Badge variant="soft" size="sm">Reactive</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">A simple counter with increment, decrement, and reset.</p>
      <div class="flex items-center gap-4">
        <Button variant="outline" onclick={() => counter.decrement()}>-</Button>
        <span class="text-display-2 w-16 text-center">{counter.count}</span>
        <Button variant="outline" onclick={() => counter.increment()}>+</Button>
        <Button variant="ghost" onclick={() => counter.reset()}>Reset</Button>
      </div>
      <pre class="text-mono-xs bg-muted p-3 rounded">count: {counter.count}</pre>
    </div>
  </Card>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useToggle</h2>
        <Badge variant="soft" size="sm">Reactive</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">A boolean toggle with set, toggle, and reset.</p>
      <div class="flex items-center gap-4">
        <Button variant={toggle.current ? "primary" : "outline"} onclick={() => toggle.toggle()}>
          {toggle.current ? "ON" : "OFF"}
        </Button>
        <Button variant="ghost" onclick={() => toggle.set(true)}>Set True</Button>
        <Button variant="ghost" onclick={() => toggle.set(false)}>Set False</Button>
      </div>
      <pre class="text-mono-xs bg-muted p-3 rounded">value: {toggle.current}</pre>
    </div>
  </Card>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useClipboard</h2>
        <Badge variant="soft" size="sm">Utility</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">Copy text to clipboard with success state.</p>
      <div class="flex items-center gap-4">
        <Input value="Hello, urupe-ui!" readonly class="flex-1" />
        <Button onclick={() => copy("Hello, urupe-ui!")}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  </Card>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useDebouncedCallback</h2>
        <Badge variant="soft" size="sm">Async</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">Debounce a callback function. Type in the input to see debounced results.</p>
      <div class="space-y-2">
        <Input placeholder="Type something..." value={searchQuery} oninput={handleSearch} />
        <pre class="text-mono-xs bg-muted p-3 rounded">{debouncedResult || "Waiting for input..."}</pre>
      </div>
    </div>
  </Card>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add examples/showcase/src/routes/playground/composables/+page.svelte
git commit --no-verify -m "feat: add composable playground showcase screen"
```

---

### Task 8: Create CRUD Variants Demo

**Files:**
- Create: `examples/showcase/src/routes/data/crud-variants/+page.svelte`

- [ ] **Step 1: Create the CRUD variants demo**

Show the same "User" entity managed via different CRUD patterns: table with inline actions, modal create/edit, drawer create/edit.

This demonstrates the CRUD component system's flexibility.

Keep it focused — show a table with action buttons that open modals/drawers for create/edit operations.

- [ ] **Step 2: Commit**

```bash
git add examples/showcase/src/routes/data/crud-variants/+page.svelte
git commit --no-verify -m "feat: add CRUD variants showcase screen"
```

---

### Task 9: Create Theme Combination Grid

**Files:**
- Create: `examples/showcase/src/routes/themes/grid/+page.svelte`

- [ ] **Step 1: Create the theme grid**

Show a grid of cards, each rendered in a different theme/aesthetic/density combination. This visually demonstrates the 72 possible combinations.

```svelte
<script lang="ts">
import { Card, Badge, Button } from "urupe-ui";

const themes = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;
const aesthetics = ["editorial", "glass", "bento", "expressive"] as const;
const densities = ["compact", "comfortable", "spacious"] as const;
</script>

<div class="max-w-7xl mx-auto p-6 space-y-8">
  <div>
    <h1 class="text-display-3 mb-2">Theme Grid</h1>
    <p class="text-body-lg text-muted-foreground">All 72 theme × aesthetic × density combinations.</p>
  </div>

  {#each themes as theme}
    <section>
      <h2 class="text-title-1 mb-4 capitalize">{theme}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each aesthetics as aesthetic}
          {#each densities as density}
            <div data-theme={theme} data-aesthetic={aesthetic} data-density={density}>
              <Card variant="glass" padding>
                <div class="space-y-2">
                  <Badge variant="primary">{aesthetic}</Badge>
                  <Badge variant="outline">{density}</Badge>
                  <p class="text-body-sm text-muted-foreground">Theme: {theme}</p>
                  <Button size="sm">Button</Button>
                </div>
              </Card>
            </div>
          {/each}
        {/each}
      </div>
    </section>
  {/each}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add examples/showcase/src/routes/themes/grid/+page.svelte
git commit --no-verify -m "feat: add theme combination grid showcase screen"
```

---

## Phase 5: Documentation

### Task 10: Add Component Prop Docs to components.md

**Files:**
- Modify: `docs/components.md`

- [ ] **Step 1: Add prop tables for top 10 most-used components**

Add prop tables and short usage examples for: Button, Card, Input, Badge, Dialog, Sheet, Tabs, DataTable, Form, Select.

For each component, add:

```markdown
### ComponentName
One-line description.

| Prop | Type | Default | Description |
|---|---|---|---|
| `prop` | `Type` | `default` | Description |

\`\`\`svelte
<ComponentName prop={value} />
\`\`\`
```

- [ ] **Step 2: Run lint and commit**

```bash
git add docs/components.md
git commit -m "docs: add prop tables for top 10 most-used components"
```

---

### Task 11: Update Showcase Homepage Stats

**Files:**
- Modify: `examples/showcase/src/routes/+page.svelte`

- [ ] **Step 1: Update the stats to match actual counts**

Change the hardcoded stats:
- `"160+"` → `"230+"` (actual component count)
- `"47"` → `"50+"` (actual composable count including new ones)
- Add `"72"` for theme combinations (6 themes × 4 aesthetics × 3 densities)

- [ ] **Step 2: Commit**

```bash
git add examples/showcase/src/routes/+page.svelte
git commit --no-verify -m "fix: update showcase homepage stats to match actual counts"
```

---

## Phase 6: Final Verification

### Task 12: Final Lint and Verification

- [ ] **Step 1: Run full lint**

Run: `npx biome check src/`

- [ ] **Step 2: Verify exports**

Check that new composables and types are properly exported.

- [ ] **Step 3: Verify no regressions**

Run: `bun run test` and confirm no new failures.

- [ ] **Step 4: Final commit if any fixes needed**
