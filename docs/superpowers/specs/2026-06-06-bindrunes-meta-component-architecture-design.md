# bindrunes Meta-Component Architecture — Unified Shared Pragmas

| Field | Value |
|---|---|
| Status | Draft (brainstorming approved, awaiting user review) |
| Date | 2026-06-06 |
| Author | opencode (brainstorming skill) |
| Target | bindrunes v1.x |
| Type | Architecture spec (shared utilities + component primitives + refactoring) |
| Supersedes | Ad-hoc per-subsystem patterns (sidebar, landing, dashboard) |

---

## 1. Why this spec exists

bindrunes has 5 independent subsystems (sidebar, landing, dashboard, theme, agentic) with 88+ components. Each subsystem was built independently and developed its own patterns for three concerns:

1. **Context management** — Sidebar uses 3 functions (`createSidebarState` → `setSidebarContext` → `getSidebarContext`). Landing uses 2 (`createLandingState` → `useLanding`). Agentic has no context yet.
2. **State exposure** — Sidebar returns getters with setters (mutable). Landing returns raw `$state` objects (no protection). Agentic uses readonly getters.
3. **Layout** — SidebarLayout handles position-based slots. LandingSection hardcodes `max-w-*` strings. DashboardShell manages its own layout internally. No shared layout abstraction.

This spec resolves all three with six shared pragmas — focused utilities and components that eliminate inconsistency without imposing a framework.

---

## 2. Goals & non-goals

### 2.1 Goals

- **G1.** Standardize context management across all subsystems with `createMetaContext` / `useMetaContext`.
- **G2.** Enforce readonly state exposure with `readonlyGetters` utility.
- **G3.** Ship 3 shared layout primitives: `MetaLayout`, `MetaContainer`, `MetaScrollable`.
- **G4.** Refactor all existing subsystems to use these pragmas (~18-20 files).
- **G5.** Establish the pattern for agentic M2 components (design reference only — no implementations).
- **G6.** Zero breaking changes — all refactors are internal.
- **G7.** Follow AGENTS.md laws: createX pattern, Svelte 5 runes, no legacy stores.

### 2.2 Non-goals

- **N1.** No meta-component factory or registration system. (Approach B rejected — YAGNI.)
- **N2.** No agentic M2 component implementations (ThreadView, MessageList, etc.) — separate spec.
- **N3.** No new CSS layers or token additions.
- **N4.** No changes to the public API surface.
- **N5.** No visual regression test infrastructure.

---

## 3. The six shared pragmas

| # | Pragma | File | Purpose |
|---|---|---|---|
| 1 | `createMetaContext` | `src/utils/createMetaContext.svelte.ts` | Two-function context pattern |
| 2 | `readonlyGetters` | `src/utils/readonlyGetters.ts` | Readonly state exposure |
| 3 | `MetaLayout` | `src/components/MetaLayout.svelte` | Position-based snippet slots |
| 4 | `MetaContainer` | `src/components/MetaContainer.svelte` | Token-aware content width |
| 5 | `MetaScrollable` | `src/components/MetaScrollable.svelte` | Standardized overflow container |
| 6 | Refactored subsystems | Multiple files | All subsystems use pragmas 1-5 |

---

## 4. `createMetaContext` / `useMetaContext`

### 4.1 Implementation

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

### 4.2 Usage pattern

Each subsystem defines:
1. A module-scoped `Symbol` key
2. A `create*State()` function that wraps `createMetaContext`
3. A `use*()` or `get*Context()` function that wraps `useMetaContext`

```ts
// sidebar-context.svelte.ts
const SIDEBAR_KEY = Symbol('bindrunes-sidebar');

export function createSidebarState(initialOpen = true) {
  return createMetaContext(SIDEBAR_KEY, () => {
    // runes + readonly getters + actions
  });
}

export function getSidebarContext() {
  return useMetaContext<SidebarState>(SIDEBAR_KEY);
}
```

### 4.3 Rules

- Symbol keys are module-scoped constants, never inline `Symbol()` calls.
- `createMetaContext` always calls `setContext` — no silent failures.
- `useMetaContext` always calls `getContext` — returns `undefined` if no provider (Svelte default behavior).
- Each subsystem's public API wraps the generics with named functions — consumers never import `createMetaContext` directly.

---

## 5. `readonlyGetters`

### 5.1 Implementation

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

### 5.2 Usage pattern

```ts
// Before (landing — raw $state, mutation possible):
const state = $state({ billingAnnual: false, activeSection: '' });
setContext(KEY, state);

// After (readonly getters):
const state = $state({ billingAnnual: false, activeSection: '' });
const ctx = readonlyGetters(state);
setContext(KEY, ctx);
return { ...ctx, setBillingAnnual(v: boolean) { state.billingAnnual = v; } };
```

### 5.3 Rules

- All state exposed via `get` accessors only.
- Mutations happen through explicit action methods (`toggle()`, `setTheme()`, `navigate()`).
- Actions are part of the returned object alongside the readonly getters.
- The utility is a pure function — no runes, no context, just `Object.defineProperty`.

---

## 6. `MetaLayout`

### 6.1 Implementation

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

### 6.2 Replaces

- `SidebarLayout.svelte` (becomes deprecated re-export)
- Inline position-based layout logic in `DashboardShell.svelte`

### 6.3 Usage

```svelte
<MetaLayout position="header">
  <DashboardShellBrand {brandIcon} {appName} />
</MetaLayout>
<MetaLayout position="content">
  <NavMenu groups={navigation} />
</MetaLayout>
<MetaLayout position="footer">
  <ThemeToggle />
</MetaLayout>
```

---

## 7. `MetaContainer`

### 7.1 Implementation

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

### 7.2 Replaces

- Inline `max-w-4xl`/`max-w-5xl`/`max-w-6xl` strings in `LandingSection.svelte`
- Hardcoded width classes in `HeroBanner.svelte`, `PricingTable.svelte`, `FAQ.svelte`, etc.

### 7.3 Token mapping

| `size` prop | CSS token | Default |
|---|---|---|
| `prose` | `--container-prose` | 65ch |
| `sm` | `--container-sm` | 640px |
| `md` | `--container-md` | 768px |
| `lg` | `--container-lg` | 1024px |
| `xl` | `--container-xl` | 1280px |
| `2xl` | `--container-2xl` | 1440px |
| `full` | none | 100% |

---

## 8. `MetaScrollable`

### 8.1 Implementation

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

### 8.2 Replaces

- Inline overflow styles in `SidebarContent.svelte`
- Duplicated scroll containers in `DashboardShell.svelte`
- Future: scrollable areas in `ThreadView`, `MessageList`

### 8.3 Key properties

- Thin scrollbar (`scrollbar-width: thin`)
- Border-colored scrollbar thumb (theme-aware via `var(--border)`)
- Hover state darkens scrollbar (`var(--border-strong)`)
- Hides horizontal overflow (`overflow-x-hidden`)

---

## 9. Refactoring plan

### 9a. Sidebar System (5 files)

| File | Change |
|---|---|
| `sidebar-context.svelte.ts` | Replace 3-function pattern with `createMetaContext`/`useMetaContext`. Add `readonlyGetters`. |
| `Sidebar.svelte` | Replace `SidebarLayout` usage with `MetaLayout`. |
| `SidebarContent.svelte` | Replace inline overflow styles with `MetaScrollable`. |
| `SidebarHeader.svelte` | Use `MetaLayout position="header"`. |
| `SidebarFooter.svelte` | Use `MetaLayout position="footer"`. |

`SidebarLayout.svelte` becomes a deprecated re-export of `MetaLayout` (one release).

### 9b. Landing System (9 files)

| File | Change |
|---|---|
| `landing-context.svelte.ts` | Replace with `createMetaContext`/`useMetaContext`. Add `readonlyGetters` + action methods. |
| `LandingSection.svelte` | Replace inline `max-w-*` with `MetaContainer`. |
| `HeroBanner.svelte` | Replace `max-w-4xl` with `MetaContainer size="lg"`. |
| `PricingTable.svelte` | Replace `max-w-6xl` with `MetaContainer size="xl"`. |
| `FAQ.svelte` | Replace `max-w-3xl` with `MetaContainer size="md"`. |
| `Newsletter.svelte` | Replace `max-w-2xl` with `MetaContainer size="lg"`. |
| `SiteFooter.svelte` | Replace `max-w-6xl` with `MetaContainer size="xl"`. |
| `FeatureGrid.svelte` | Replace `max-w-6xl` with `MetaContainer size="xl"`. |
| `TestimonialGrid.svelte` | Replace `max-w-5xl` with `MetaContainer size="xl"`. |

### 9c. Dashboard System (3 files)

| File | Change |
|---|---|
| `DashboardShell.svelte` | Replace `SidebarLayout` with `MetaLayout`. Use `MetaScrollable` for main content. |
| `DashboardShellSplit.svelte` | Use `MetaScrollable` for list panel. |
| `DashboardShellHeader.svelte` | Use `MetaLayout position="header"`. |

### 9d. ThemeStudio + Other (1-3 files)

| File | Change |
|---|---|
| `ThemeStudio.svelte` | No structural changes needed. |
| `Omnibar.svelte` | Use `MetaScrollable` for results list. |
| `DataTable.svelte` | Use `MetaScrollable` for table body if applicable. |

### 9e. Migration order

1. Sidebar (low risk, structural)
2. Landing (medium risk, layout widths shift to tokens)
3. Dashboard (low risk, structural)
4. ThemeStudio + Other (negligible risk)

Each batch is independently committable and testable.

---

## 10. Agentic integration

### 10.1 Context pattern for agentic

```ts
// src/utils/agentic/agentic-context.svelte.ts
const AGENTIC_KEY = Symbol('bindrunes-agentic');

export function createAgenticState(options: AgenticProviderOptions) {
  return createMetaContext(AGENTIC_KEY, () => {
    const windowStore = createWindowStore(options);
    const tokenBudget = createTokenBudget({ cap: options.budgetCap ?? 4096 });
    return readonlyGetters({
      ...windowStore,
      tokenBudget,
    });
  });
}

export function useAgentic() {
  return useMetaContext<AgenticState>(AGENTIC_KEY);
}
```

### 10.2 Component usage (M2 reference)

| Pragma | Used by (M2) |
|---|---|
| `createMetaContext` / `useMetaContext` | `AgentProvider`, `BranchTree` |
| `readonlyGetters` | `createWindowStore`, `createStreamingDelta` |
| `MetaLayout` | `AgentConsole` (header/content/footer) |
| `MetaContainer` | `AgentConsole` (content width) |
| `MetaScrollable` | `ThreadView`, `MessageList`, `MemoryInspector` |

### 10.3 Rule

The agentic M2 spec **must** reference this meta-component spec as the architectural foundation. All agentic context patterns, state exposure, and layout must use these shared pragmas.

---

## 11. Breaking changes

**None.** All refactors are internal. No public API changes.

`SidebarLayout` becomes a deprecated re-export of `MetaLayout` for one release (v1.x). Removed in v2.0.

---

## 12. Testing

- All existing tests must continue passing after each refactoring batch.
- New utility tests: `createMetaContext.test.ts`, `readonlyGetters.test.ts`.
- New component tests: `MetaLayout.test.ts`, `MetaContainer.test.ts`, `MetaScrollable.test.ts` — with a11y checks via vitest-axe.
- Per AGENTS.md: "Adding a new metacomponent → also follow docs/testing.md (a11y + vitest-axe)."

---

## 13. Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Landing layout widths shift breaks visual alignment | Medium | Medium | `MetaContainer` maps to same `--container-*` tokens as current hardcoded values |
| R2 | `readonlyGetters` breaks Svelte reactivity | Low | High | Utility uses `Object.defineProperty` get accessors — Svelte tracks the underlying $state, not the getter wrapper |
| R3 | `SidebarLayout` deprecation confuses consumers | Low | Low | Re-export alias with `@deprecated` JSDoc; removed in v2.0 |
| R4 | `createMetaContext`/`useMetaContext` adds indirection | Low | Low | Two thin wrappers over `setContext`/`getContext` — zero runtime cost |

---

## 14. Spec self-review

- **Problem statement clarity**: §1 articulates the 3 inconsistencies and why this spec exists. ✅
- **Goal coverage**: §2 covers all user decisions (refactor everything, snippet-first, two-function context, readonly getters, pattern only). ✅
- **Implementation detail**: §4-§8 provide exact code for all 5 new pragmas. ✅
- **Refactoring plan**: §9 lists ~18-20 files with specific changes per file. ✅
- **Agentic integration**: §10 establishes the pattern reference without implementing M2. ✅
- **Breaking changes**: §11 confirms none. ✅
- **Testing**: §12 covers new tests + existing test requirements. ✅
- **Risks**: §13 names 4 risks with mitigations. ✅
