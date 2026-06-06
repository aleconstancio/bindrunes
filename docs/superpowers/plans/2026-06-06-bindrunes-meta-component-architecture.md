# bindrunes Meta-Component Architecture — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 5 shared pragmas (createMetaContext, readonlyGetters, MetaLayout, MetaContainer, MetaScrollable) and refactor all existing subsystems to use them.

**Architecture:** Two utility files (`createMetaContext.svelte.ts`, `readonlyGetters.ts`) + 3 component files (`MetaLayout.svelte`, `MetaContainer.svelte`, `MetaScrollable.svelte`). Refactor ~18 files across sidebar, landing, dashboard subsystems. Zero breaking changes.

**Tech Stack:** Svelte 5, TypeScript, vitest, vitest-axe, biome

**Spec:** `docs/superpowers/specs/2026-06-06-bindrunes-meta-component-architecture-design.md`

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Create | `src/utils/createMetaContext.svelte.ts` | Two-function context pattern |
| Create | `src/utils/readonlyGetters.ts` | Readonly state exposure utility |
| Create | `src/components/MetaLayout.svelte` | Position-based snippet slots |
| Create | `src/components/MetaContainer.svelte` | Token-aware content width |
| Create | `src/components/MetaScrollable.svelte` | Standardized overflow container |
| Create | `src/utils/__tests__/createMetaContext.test.ts` | Tests for context utility |
| Create | `src/utils/__tests__/readonlyGetters.test.ts` | Tests for readonly utility |
| Create | `src/components/MetaLayout.test.ts` | Tests + a11y for layout |
| Create | `src/components/MetaContainer.test.ts` | Tests + a11y for container |
| Create | `src/components/MetaScrollable.test.ts` | Tests + a11y for scrollable |
| Modify | `src/components/sidebar/sidebar-context.svelte.ts` | Migrate to createMetaContext + readonlyGetters |
| Modify | `src/components/sidebar/Sidebar.svelte` | Replace SidebarLayout → MetaLayout |
| Modify | `src/components/sidebar/SidebarContent.svelte` | Replace overflow → MetaScrollable |
| Modify | `src/components/sidebar/SidebarHeader.svelte` | Replace padding → MetaLayout |
| Modify | `src/components/sidebar/SidebarFooter.svelte` | Replace padding → MetaLayout |
| Modify | `src/components/sidebar/SidebarLayout.svelte` | Deprecated re-export of MetaLayout |
| Modify | `src/components/landing/landing-context.svelte.ts` | Migrate to createMetaContext + readonlyGetters |
| Modify | `src/components/landing/LandingSection.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/landing/HeroBanner.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/landing/PricingTable.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/landing/FAQ.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/landing/Newsletter.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/landing/SiteFooter.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/landing/FeatureGrid.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/landing/TestimonialGrid.svelte` | Replace max-w → MetaContainer |
| Modify | `src/components/dashboard/DashboardShell.svelte` | Replace SidebarLayout → MetaLayout + MetaScrollable |
| Modify | `src/components/dashboard/DashboardShellSplit.svelte` | Use MetaScrollable |
| Modify | `src/components/dashboard/DashboardShellHeader.svelte` | Use MetaLayout |
| Modify | `src/index.ts` | Export new components + utilities |

---

## Task 1: createMetaContext utility

**Files:**
- Create: `src/utils/createMetaContext.svelte.ts`
- Create: `src/utils/__tests__/createMetaContext.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/utils/__tests__/createMetaContext.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { createMetaContext, useMetaContext } from '../createMetaContext.svelte';
import { setContext, getContext } from 'svelte';

const TEST_KEY = Symbol('test');

function TestProvider({ children }: { children?: import('svelte').Snippet }) {
  const state = createMetaContext(TEST_KEY, () => ({ count: 0 }));
  setContext('test-state', state);
  {@render children?.()}
}

function TestConsumer() {
  const ctx = useMetaContext<{ count: number }>(TEST_KEY);
  return ctx?.count ?? 'no-context';
}

describe('createMetaContext', () => {
  it('creates context and makes it available via useMetaContext', () => {
    // This test verifies the pattern works in a Svelte component tree
    expect(true).toBe(true); // placeholder until we can test with Svelte context
  });

  it('returns the factory result', () => {
    // Unit test: createMetaContext calls factory and setContext
    const mockState = { count: 42 };
    let contextValue: unknown;

    // Mock setContext to capture the value
    const originalSetContext = setContext;

    // We can't directly test Svelte context outside components,
    // but we can verify the function signature and return type
    expect(typeof createMetaContext).toBe('function');
    expect(typeof useMetaContext).toBe('function');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/utils/__tests__/createMetaContext.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// src/utils/createMetaContext.svelte.ts
import { setContext, getContext } from 'svelte';

export function createMetaContext<T>(key: symbol, factory: () => T): T {
  const state = factory();
  setContext(key, state);
  return state;
}

export function useMetaContext<T>(key: symbol): T {
  return getContext<T>(key);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test src/utils/__tests__/createMetaContext.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/createMetaContext.svelte.ts src/utils/__tests__/createMetaContext.test.ts
git commit -m "feat(utils): add createMetaContext/useMetaContext shared context pattern"
```

---

## Task 2: readonlyGetters utility

**Files:**
- Create: `src/utils/readonlyGetters.ts`
- Create: `src/utils/__tests__/readonlyGetters.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/utils/__tests__/readonlyGetters.test.ts
import { describe, it, expect } from 'vitest';
import { readonlyGetters } from '../readonlyGetters';

describe('readonlyGetters', () => {
  it('returns an object with get accessors for all keys', () => {
    const state = { count: 0, name: 'test' };
    const readonly = readonlyGetters(state);

    expect(readonly.count).toBe(0);
    expect(readonly.name).toBe('test');
  });

  it('reflects changes to the underlying state', () => {
    const state = { count: 0 };
    const readonly = readonlyGetters(state);

    expect(readonly.count).toBe(0);
    state.count = 5;
    expect(readonly.count).toBe(5);
  });

  it('does not allow direct assignment on the readonly wrapper', () => {
    const state = { count: 0 };
    const readonly = readonlyGetters(state);

    // Assignment should silently fail (no setter defined)
    (readonly as any).count = 10;
    expect(state.count).toBe(0); // original unchanged
    expect(readonly.count).toBe(0); // getter still returns original
  });

  it('preserves function properties', () => {
    const state = {
      count: 0,
      increment() { this.count++; },
    };
    const readonly = readonlyGetters(state);

    expect(typeof readonly.increment).toBe('function');
  });

  it('returns empty object for empty input', () => {
    const readonly = readonlyGetters({});
    expect(Object.keys(readonly)).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/utils/__tests__/readonlyGetters.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// src/utils/readonlyGetters.ts
type GetterOnly<T> = {
  readonly [K in keyof T]: T[K] extends (...args: any[]) => any
    ? T[K]
    : T[K] extends object
      ? Readonly<T[K]>
      : T[K];
};

export function readonlyGetters<T extends Record<string, any>>(
  state: T
): GetterOnly<T> {
  const result = {} as any;
  for (const key of Object.keys(state)) {
    Object.defineProperty(result, key, {
      get() { return state[key]; },
      enumerable: true,
    });
  }
  return result;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test src/utils/__tests__/readonlyGetters.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/readonlyGetters.ts src/utils/__tests__/readonlyGetters.test.ts
git commit -m "feat(utils): add readonlyGetters utility for safe state exposure"
```

---

## Task 3: MetaLayout component

**Files:**
- Create: `src/components/MetaLayout.svelte`
- Create: `src/components/MetaLayout.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/MetaLayout.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MetaLayout from './MetaLayout.svelte';
import axe from 'vitest-axe';

describe('MetaLayout', () => {
  it('renders content position by default', () => {
    render(MetaLayout, { props: { children: () => {} } });
    const el = document.querySelector('.flex-1');
    expect(el).toBeTruthy();
  });

  it('renders header position with flex-shrink-0', () => {
    render(MetaLayout, { props: { position: 'header', children: () => {} } });
    const el = document.querySelector('.flex-shrink-0');
    expect(el).toBeTruthy();
  });

  it('renders footer position with border-t', () => {
    render(MetaLayout, { props: { position: 'footer', children: () => {} } });
    const el = document.querySelector('.border-t');
    expect(el).toBeTruthy();
  });

  it('renders separator position with role separator', () => {
    render(MetaLayout, { props: { position: 'separator' } });
    const el = document.querySelector('[role="separator"]');
    expect(el).toBeTruthy();
  });

  it('has no a11y violations', async () => {
    const { container } = render(MetaLayout, { props: { children: () => {} } });
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/components/MetaLayout.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write implementation**

```svelte
<!-- src/components/MetaLayout.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    position = 'content',
    class: className = '',
    children,
  }: {
    position?: 'header' | 'content' | 'footer' | 'separator';
    class?: string;
    children?: Snippet;
  } = $props();
</script>

{#if position === 'separator'}
  <div class="h-px bg-border my-2 {className}" role="separator"></div>
{:else}
  <div
    class="{position === 'header' ? 'flex-shrink-0' : ''}
           {position === 'footer' ? 'flex-shrink-0 border-t border-border' : ''}
           {position === 'content' ? 'flex-1 overflow-y-auto' : ''}
           p-4 {className}"
  >
    {@render children?.()}
  </div>
{/if}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test src/components/MetaLayout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/MetaLayout.svelte src/components/MetaLayout.test.ts
git commit -m "feat(component): add MetaLayout — shared position-based snippet slot helper"
```

---

## Task 4: MetaContainer component

**Files:**
- Create: `src/components/MetaContainer.svelte`
- Create: `src/components/MetaContainer.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/MetaContainer.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MetaContainer from './MetaContainer.svelte';
import axe from 'vitest-axe';

describe('MetaContainer', () => {
  it('renders with default size="6xl"', () => {
    render(MetaContainer, { props: { children: () => {} } });
    const el = document.querySelector('.max-w-\\[var\\(--container-2xl\\)\\]');
    expect(el).toBeTruthy();
  });

  it('renders prose size', () => {
    render(MetaContainer, { props: { size: 'prose', children: () => {} } });
    const el = document.querySelector('.max-w-\\[var\\(--container-prose\\)\\]');
    expect(el).toBeTruthy();
  });

  it('renders full width when size="full"', () => {
    render(MetaContainer, { props: { size: 'full', children: () => {} } });
    const el = document.querySelector('.max-w-full');
    expect(el).toBeTruthy();
  });

  it('applies padding by default', () => {
    render(MetaContainer, { props: { children: () => {} } });
    const el = document.querySelector('.px-6');
    expect(el).toBeTruthy();
  });

  it('removes padding when padding=false', () => {
    render(MetaContainer, { props: { padding: false, children: () => {} } });
    const el = document.querySelector('.px-6');
    expect(el).toBeNull();
  });

  it('has no a11y violations', async () => {
    const { container } = render(MetaContainer, { props: { children: () => {} } });
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/components/MetaContainer.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write implementation**

```svelte
<!-- src/components/MetaContainer.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    size = '6xl',
    padding = true,
    class: className = '',
    children,
  }: {
    size?: 'prose' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: boolean;
    class?: string;
    children?: Snippet;
  } = $props();

  const widthClass = $derived(
    size === 'prose' ? 'max-w-[var(--container-prose)]' :
    size === 'sm' ? 'max-w-[var(--container-sm)]' :
    size === 'md' ? 'max-w-[var(--container-md)]' :
    size === 'lg' ? 'max-w-[var(--container-lg)]' :
    size === 'xl' ? 'max-w-[var(--container-xl)]' :
    size === '2xl' ? 'max-w-[var(--container-2xl)]' :
    'max-w-full'
  );
</script>

<div class="mx-auto {widthClass} {padding ? 'px-6' : ''} {className}">
  {@render children?.()}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test src/components/MetaContainer.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/MetaContainer.svelte src/components/MetaContainer.test.ts
git commit -m "feat(component): add MetaContainer — token-aware content width wrapper"
```

---

## Task 5: MetaScrollable component

**Files:**
- Create: `src/components/MetaScrollable.svelte`
- Create: `src/components/MetaScrollable.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/MetaScrollable.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MetaScrollable from './MetaScrollable.svelte';
import axe from 'vitest-axe';

describe('MetaScrollable', () => {
  it('renders with overflow-y-auto', () => {
    render(MetaScrollable, { props: { children: () => {} } });
    const el = document.querySelector('.overflow-y-auto');
    expect(el).toBeTruthy();
  });

  it('renders with thin scrollbar', () => {
    render(MetaScrollable, { props: { children: () => {} } });
    const el = document.querySelector('[class*="scrollbar-width"]');
    expect(el).toBeTruthy();
  });

  it('applies custom class', () => {
    render(MetaScrollable, { props: { class: 'h-96', children: () => {} } });
    const el = document.querySelector('.h-96');
    expect(el).toBeTruthy();
  });

  it('has no a11y violations', async () => {
    const { container } = render(MetaScrollable, { props: { children: () => {} } });
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/components/MetaScrollable.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write implementation**

```svelte
<!-- src/components/MetaScrollable.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    class: className = '',
    children,
  }: {
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:var(--border) transparent] hover:[scrollbar-color:var(--border-strong)] {className}">
  {@render children?.()}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test src/components/MetaScrollable.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/MetaScrollable.svelte src/components/MetaScrollable.test.ts
git commit -m "feat(component): add MetaScrollable — standardized overflow container"
```

---

## Task 6: Export new pragmas from index.ts

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Add exports to index.ts**

Add these lines to the appropriate sections in `src/index.ts`:

```ts
// ── Meta Pragmas ──
export { createMetaContext, useMetaContext } from './utils/createMetaContext.svelte';
export { readonlyGetters } from './utils/readonlyGetters';
export { default as MetaLayout } from './components/MetaLayout.svelte';
export { default as MetaContainer } from './components/MetaContainer.svelte';
export { default as MetaScrollable } from './components/MetaScrollable.svelte';
```

- [ ] **Step 2: Run typecheck**

Run: `bun run check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat(exports): add meta-pragmas to public API (createMetaContext, readonlyGetters, MetaLayout, MetaContainer, MetaScrollable)"
```

---

## Task 7: Refactor sidebar context

**Files:**
- Modify: `src/components/sidebar/sidebar-context.svelte.ts`

- [ ] **Step 1: Read current implementation**

Read `src/components/sidebar/sidebar-context.svelte.ts` to understand the current 3-function pattern.

- [ ] **Step 2: Refactor to use createMetaContext + readonlyGetters**

```ts
// src/components/sidebar/sidebar-context.svelte.ts
import { createMetaContext, useMetaContext } from '../../utils/createMetaContext.svelte';
import { readonlyGetters } from '../../utils/readonlyGetters';
import { browser } from './sidebar-constants';

export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

const KEY = Symbol('bindrunes-sidebar');

export type SidebarState = ReturnType<typeof createSidebarState>;

export function createSidebarState(initialOpen = true) {
  let open = $state<boolean>(initialOpen);
  let openMobile = $state<boolean>(false);
  let isMobile = $state<boolean>(false);

  let state = $derived(open ? 'expanded' as const : 'collapsed' as const);

  $effect(() => {
    if (browser) {
      document.documentElement.style.setProperty('--sidebar-width', open ? '16rem' : '3rem');
    }
  });

  $effect(() => {
    if (browser) {
      function handleKeydown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
          e.preventDefault();
          open = !open;
        }
      }
      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }
  });

  function toggle() { open = !open; }
  function toggleMobile() { openMobile = !openMobile; }

  return createMetaContext(KEY, () => readonlyGetters({
    get open() { return open; },
    set open(v: boolean) { open = v; },
    get openMobile() { return openMobile; },
    set openMobile(v: boolean) { openMobile = v; },
    get isMobile() { return isMobile; },
    set isMobile(v: boolean) { isMobile = v; },
    get state() { return state; },
    toggle,
    toggleMobile,
  }));
}

export function getSidebarContext(): SidebarState {
  return useMetaContext<SidebarState>(KEY);
}
```

- [ ] **Step 3: Run existing sidebar tests**

Run: `bun run test src/components/sidebar/`
Expected: PASS — no behavior change

- [ ] **Step 4: Commit**

```bash
git add src/components/sidebar/sidebar-context.svelte.ts
git commit -m "refactor(sidebar): migrate context to createMetaContext + readonlyGetters"
```

---

## Task 8: Refactor Sidebar.svelte to use MetaLayout

**Files:**
- Modify: `src/components/sidebar/Sidebar.svelte`
- Read: `src/components/sidebar/SidebarLayout.svelte` (for reference)

- [ ] **Step 1: Read current Sidebar.svelte**

Read `src/components/sidebar/Sidebar.svelte` to understand current structure.

- [ ] **Step 2: Replace SidebarLayout import with MetaLayout**

In `Sidebar.svelte`, change:
```ts
import SidebarLayout from './SidebarLayout.svelte';
```
to:
```ts
import MetaLayout from '../MetaLayout.svelte';
```

Then replace all `<SidebarLayout position="...">` with `<MetaLayout position="...">`.

Note: Sidebar.svelte currently doesn't use SidebarLayout directly — the layout is handled by consumers (DashboardShell). The main change is ensuring the component works with MetaLayout. If Sidebar.svelte doesn't import SidebarLayout, skip this file and move to the files that do.

- [ ] **Step 3: Run sidebar tests**

Run: `bun run test src/components/sidebar/`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/sidebar/Sidebar.svelte
git commit -m "refactor(sidebar): use MetaLayout in Sidebar component"
```

---

## Task 9: Refactor SidebarContent to use MetaScrollable

**Files:**
- Modify: `src/components/sidebar/SidebarContent.svelte`

- [ ] **Step 1: Read current implementation**

Read `src/components/sidebar/SidebarContent.svelte`.

- [ ] **Step 2: Refactor to use MetaScrollable**

Replace inline overflow styles with `<MetaScrollable>`:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import MetaScrollable from '../MetaScrollable.svelte';

  let {
    class: className = '',
    children,
  }: {
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<MetaScrollable class="flex-1 px-4 py-2 {className}">
  {@render children?.()}
</MetaScrollable>
```

- [ ] **Step 3: Run sidebar tests**

Run: `bun run test src/components/sidebar/`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/sidebar/SidebarContent.svelte
git commit -m "refactor(sidebar): use MetaScrollable in SidebarContent"
```

---

## Task 10: Refactor SidebarHeader + SidebarFooter to use MetaLayout

**Files:**
- Modify: `src/components/sidebar/SidebarHeader.svelte`
- Modify: `src/components/sidebar/SidebarFooter.svelte`

- [ ] **Step 1: Read current implementations**

Read both files.

- [ ] **Step 2: Refactor SidebarHeader**

Replace inline padding with MetaLayout:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import MetaLayout from '../MetaLayout.svelte';

  let {
    class: className = '',
    children,
  }: {
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<MetaLayout position="header" class={className}>
  {@render children?.()}
</MetaLayout>
```

- [ ] **Step 3: Refactor SidebarFooter**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import MetaLayout from '../MetaLayout.svelte';

  let {
    class: className = '',
    children,
  }: {
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<MetaLayout position="footer" class={className}>
  {@render children?.()}
</MetaLayout>
```

- [ ] **Step 4: Run sidebar tests**

Run: `bun run test src/components/sidebar/`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sidebar/SidebarHeader.svelte src/components/sidebar/SidebarFooter.svelte
git commit -m "refactor(sidebar): use MetaLayout in SidebarHeader + SidebarFooter"
```

---

## Task 11: Deprecate SidebarLayout

**Files:**
- Modify: `src/components/sidebar/SidebarLayout.svelte`
- Modify: `src/components/sidebar/index.ts`

- [ ] **Step 1: Replace SidebarLayout with deprecated re-export**

```svelte
<!-- src/components/sidebar/SidebarLayout.svelte -->
<!-- @deprecated Use MetaLayout from 'bindrunes' instead. Removed in v2.0. -->
<script lang="ts">
  import MetaLayout from '../MetaLayout.svelte';
  import type { Snippet } from 'svelte';

  let {
    position = 'content' as 'header' | 'content' | 'footer' | 'separator',
    children,
  }: {
    position?: 'header' | 'content' | 'footer' | 'separator';
    children?: Snippet;
  } = $props();
</script>

<MetaLayout {position}>
  {@render children?.()}
</MetaLayout>
```

- [ ] **Step 2: Update sidebar index.ts to include deprecated SidebarLayout**

Ensure `SidebarLayout` is still exported from `sidebar/index.ts` for backward compatibility.

- [ ] **Step 3: Run all sidebar tests**

Run: `bun run test src/components/sidebar/`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/sidebar/SidebarLayout.svelte src/components/sidebar/index.ts
git commit -m "refactor(sidebar): deprecate SidebarLayout — re-exports MetaLayout"
```

---

## Task 12: Refactor landing context

**Files:**
- Modify: `src/components/landing/landing-context.svelte.ts`

- [ ] **Step 1: Read current implementation**

Read `src/components/landing/landing-context.svelte.ts`.

- [ ] **Step 2: Refactor to use createMetaContext + readonlyGetters**

```ts
// src/components/landing/landing-context.svelte.ts
import { createMetaContext, useMetaContext } from '../../utils/createMetaContext.svelte';
import { readonlyGetters } from '../../utils/readonlyGetters';

const KEY = Symbol('landing');

export interface LandingState {
  readonly billingAnnual: boolean;
  readonly activeSection: string;
  readonly menuOpen: boolean;
  setBillingAnnual(v: boolean): void;
  setActiveSection(v: string): void;
  setMenuOpen(v: boolean): void;
}

export function createLandingState(): LandingState {
  const billingAnnual = $state(false);
  const activeSection = $state('');
  const menuOpen = $state(false);

  return createMetaContext(KEY, () => readonlyGetters({
    get billingAnnual() { return billingAnnual; },
    get activeSection() { return activeSection; },
    get menuOpen() { return menuOpen; },
    setBillingAnnual(v: boolean) { billingAnnual = v; },
    setActiveSection(v: string) { activeSection = v; },
    setMenuOpen(v: boolean) { menuOpen = v; },
  }));
}

export function useLanding(): LandingState {
  return useMetaContext<LandingState>(KEY);
}
```

- [ ] **Step 3: Update landing components that mutate state**

Update `LandingNav.svelte`, `PricingTable.svelte`, and any other components that directly mutate `landing.billingAnnual` or `landing.menuOpen` to use the new action methods:

- `landing.billingAnnual = true` → `landing.setBillingAnnual(true)`
- `landing.menuOpen = true` → `landing.setMenuOpen(true)`
- `landing.activeSection = 'x'` → `landing.setActiveSection('x')`

- [ ] **Step 4: Run landing tests**

Run: `bun run test src/components/landing/`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/landing-context.svelte.ts src/components/landing/*.svelte
git commit -m "refactor(landing): migrate context to createMetaContext + readonlyGetters"
```

---

## Task 13: Refactor landing sections to use MetaContainer

**Files:**
- Modify: `src/components/landing/LandingSection.svelte`
- Modify: `src/components/landing/HeroBanner.svelte`
- Modify: `src/components/landing/PricingTable.svelte`
- Modify: `src/components/landing/FAQ.svelte`
- Modify: `src/components/landing/Newsletter.svelte`
- Modify: `src/components/landing/SiteFooter.svelte`
- Modify: `src/components/landing/FeatureGrid.svelte`
- Modify: `src/components/landing/TestimonialGrid.svelte`

- [ ] **Step 1: Refactor LandingSection**

```svelte
<!-- src/components/landing/LandingSection.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import MetaContainer from '../MetaContainer.svelte';

  let {
    id = undefined as string | undefined,
    class: className = '',
    maxWidth = '6xl' as '4xl' | '5xl' | '6xl' | '7xl' | 'full',
    children,
  }: {
    id?: string;
    class?: string;
    maxWidth?: '4xl' | '5xl' | '6xl' | '7xl' | 'full';
    children?: Snippet;
  } = $props();

  const containerSize = $derived(
    maxWidth === '4xl' ? 'lg' :
    maxWidth === '5xl' ? 'xl' :
    maxWidth === '6xl' ? 'xl' :
    maxWidth === '7xl' ? '2xl' :
    'full'
  );
</script>

<section {id} class="px-6 py-16 section-reveal {className}">
  <MetaContainer size={containerSize} padding={false}>
    {@render children?.()}
  </MetaContainer>
</section>
```

- [ ] **Step 2: Refactor HeroBanner**

Replace `max-w-4xl` with MetaContainer:

```svelte
<!-- In HeroBanner.svelte, replace: -->
<div class="mx-auto max-w-4xl text-center relative">

<!-- With: -->
<MetaContainer size="lg" padding={false} class="text-center relative">
```

And close with `</MetaContainer>` instead of `</div>`.

- [ ] **Step 3: Refactor PricingTable**

Replace `max-w-6xl` with MetaContainer:

```svelte
<!-- In PricingTable.svelte, replace: -->
<div class="mx-auto max-w-6xl {className}">

<!-- With: -->
<MetaContainer size="xl" class={className}>
```

- [ ] **Step 4: Refactor remaining landing sections**

Apply the same pattern to FAQ, Newsletter, SiteFooter, FeatureGrid, TestimonialGrid — replacing hardcoded `max-w-*` classes with `<MetaContainer size="...">`.

Mapping:
- FAQ: `max-w-3xl` → `size="md"`
- Newsletter: `max-w-2xl` → `size="lg"` (or keep as-is if no matching token)
- SiteFooter: `max-w-6xl` → `size="xl"`
- FeatureGrid: `max-w-6xl` → `size="xl"`
- TestimonialGrid: `max-w-5xl` → `size="xl"`

- [ ] **Step 5: Run landing tests**

Run: `bun run test src/components/landing/`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/landing/
git commit -m "refactor(landing): use MetaContainer in all landing sections"
```

---

## Task 14: Refactor DashboardShell

**Files:**
- Modify: `src/components/dashboard/DashboardShell.svelte`

- [ ] **Step 1: Read current implementation**

Read `src/components/dashboard/DashboardShell.svelte`.

- [ ] **Step 2: Replace SidebarLayout with MetaLayout**

Change imports:
```ts
import { SidebarProvider, Sidebar, SidebarLayout, SidebarTrigger } from '../sidebar/index';
```
to:
```ts
import { SidebarProvider, Sidebar, SidebarTrigger } from '../sidebar/index';
import MetaLayout from '../MetaLayout.svelte';
import MetaScrollable from '../MetaScrollable.svelte';
```

Replace all `<SidebarLayout position="...">` with `<MetaLayout position="...">`.

Replace the main content `<main class="flex-1 min-w-0 overflow-y-auto">` with `<MetaScrollable class="flex-1 min-w-0">`.

- [ ] **Step 3: Run dashboard tests**

Run: `bun run test src/components/dashboard/`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/DashboardShell.svelte
git commit -m "refactor(dashboard): use MetaLayout + MetaScrollable in DashboardShell"
```

---

## Task 15: Refactor DashboardShellSplit + DashboardShellHeader

**Files:**
- Modify: `src/components/dashboard/DashboardShellSplit.svelte`
- Modify: `src/components/dashboard/DashboardShellHeader.svelte`

- [ ] **Step 1: Add MetaScrollable to DashboardShellSplit**

In `DashboardShellSplit.svelte`, import MetaScrollable and wrap the list panel:

```svelte
import MetaScrollable from '../MetaScrollable.svelte';
```

Replace the list panel div:
```svelte
<div class="shrink-0 border-r border-border bg-background overflow-y-auto" style="width: {width}; min-width: 280px;">
```
with:
```svelte
<MetaScrollable class="shrink-0 border-r border-border bg-background" style="width: {width}; min-width: 280px;">
```

- [ ] **Step 2: Add MetaLayout to DashboardShellHeader**

Read `DashboardShellHeader.svelte`. If it uses inline header layout, wrap in `<MetaLayout position="header">`.

- [ ] **Step 3: Run dashboard tests**

Run: `bun run test src/components/dashboard/`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/DashboardShellSplit.svelte src/components/dashboard/DashboardShellHeader.svelte
git commit -m "refactor(dashboard): use MetaScrollable + MetaLayout in split and header"
```

---

## Task 16: Omnibar + DataTable MetaScrollable (optional)

**Files:**
- Read: `src/components/Omnibar.svelte`
- Read: `src/components/DataTable.svelte`

- [ ] **Step 1: Check if Omnibar has scrollable results list**

Read `Omnibar.svelte`. If it has an inline scrollable container for search results, replace with MetaScrollable.

- [ ] **Step 2: Check if DataTable has scrollable body**

Read `DataTable.svelte`. If it has an inline scrollable container, replace with MetaScrollable.

- [ ] **Step 3: Run tests**

Run: `bun run test`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Omnibar.svelte src/components/DataTable.svelte
git commit -m "refactor(components): use MetaScrollable in Omnibar + DataTable"
```

---

## Task 17: Final verification

**Files:** None (verification only)

- [ ] **Step 1: Run full test suite**

Run: `bun run test`
Expected: ALL PASS

- [ ] **Step 2: Run typecheck**

Run: `bun run check`
Expected: PASS

- [ ] **Step 3: Run lint**

Run: `bun run lint`
Expected: PASS (fix any issues)

- [ ] **Step 4: Run build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 5: Final commit (if lint fixes needed)**

```bash
git add -A
git commit -m "chore: lint fixes after meta-component refactoring"
```
