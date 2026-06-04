---
name: svelte-best-practices
description: Svelte 5 runes, component patterns, stores, transitions, and SvelteKit routing. Use when writing or reviewing Svelte code.
---

# Svelte 5 Best Practices

## Runes Only

Svelte 5 uses runes. No legacy patterns.

**Use:** `$state`, `$derived`, `$effect`, `$props`, `$bindable`
**Don't use:** `export let`, `$:`, `on:click`, `writable`, `readable`, `derived`

```svelte
<!-- Correct -->
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  function increment() {
    count++;
  }
</script>

<button onclick={increment}>{doubled}</button>
```

## Component Architecture

- One component per file
- Props via `$props()` with TypeScript types
- Events via callback props (not `createEventDispatcher`)
- Slots via `{@render children()}`
- Reactive declarations via `$derived`, not `$:`

## Composable Pattern (`createX()`)

All stateful logic lives in `.svelte.ts` files using the `createX()` pattern:

```ts
export function createCounter(initial = 0) {
  let count = $state(initial);
  let doubled = $derived(count * 2);

  return {
    get count() { return count; },
    get doubled() { return doubled; },
    increment() { count++; },
    reset() { count = initial; },
  };
}
```

Key rules:
- Return readonly getters for state
- Keep state private inside the closure
- Export types alongside the function
- Use `.svelte.ts` extension for files containing runes

## Context Pattern

Shared state uses `Symbol` keys with centralized factories:

```ts
// sidebar-context.svelte.ts
const SidebarContext = Symbol('sidebar');

export function setSidebar(state: SidebarState) {
  setContext(SidebarContext, state);
}

export function getSidebar(): SidebarState {
  return getContext(SidebarContext);
}
```

## Reactivity Rules

- `$state` for mutable reactive state
- `$derived` for computed values (never assign)
- `$effect` for side effects (return cleanup function)
- `$effect.pre` for effects that need to run before DOM update
- `$props()` for component inputs
- `$bindable()` for two-way binding props

## SvelteKit Conventions

- `+page.svelte` for routes
- `+layout.svelte` for shared layout
- `+page.server.ts` for server-side data loading
- `+error.svelte` for error boundaries
- Use `goto()` for programmatic navigation
- Use `invalidateAll()` to refresh data

## Testing

- `@testing-library/svelte` for component tests
- `vitest` for unit tests
- Test user interactions, not implementation details
- Mock external dependencies (API calls, stores)
