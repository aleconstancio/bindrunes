# Architecture

## Directory Structure

```
src/
├── index.ts                # Barrel exports
├── shared-types.ts         # Global types
├── actions/                # Svelte actions (e.g. shortcut binding)
├── components/             # Primitives & layouts (dashboard, sidebar, etc.)
│   └── scaffold/           # Page-level scaffolding components
├── i18n/                   # Translation dictionaries
├── styles/                 # Global styles, token sheets, & presets
└── utils/                  # Composables, context helpers, API clients, & formatters
    └── agentic/            # Agentic subsystem (LLM tool calling, agent loops)
```

---

## Design Principles

### 1. The `createX()` Composable Pattern
All state containers are exported as composable functions leveraging Svelte 5 runes:
- Read-only getters are returned for consumer-facing reactive properties.
- State changes are driven through explicit returned action functions.
- Runes-containing files use the `.svelte.ts` extension.

```ts
export function createCounter() {
  let count = $state(0);
  return {
    get count() { return count; },
    increment() { count++; }
  };
}
```

### 2. Context Isolation Pattern
Subsystem states (e.g. sidebar, dashboard) share information using `createMetaContext` and `useMetaContext` wrapping Symbol keys. Raw Svelte `setContext` / `getContext` are avoided.

```ts
const KEY = Symbol("subsystem");
export function createSubsystemState() {
  return createMetaContext(KEY, () => { /* state */ });
}
export function getSubsystemContext() {
  return useMetaContext(KEY);
}
```

### 3. Orthogonal Design Axes
- **Themes** override color custom properties exclusively (`data-theme`).
- **Aesthetics** override corner radius, shadows, and easing scales exclusively (`data-aesthetic`).
- **Density** overrides spacing margins and paddings exclusively (`data-density`).

### 4. Page Composition Architecture
Pages are composed from three layers:
- **`PageShell`** — Layout primitive with composable topbar/left/right/main zones. Handles sidebar width and collapsibility.
- **`PageSection`** — Content zone wrapper with container sizing, spacing, and section-reveal animation.
- **Page Templates** — Pre-composed full-page components (`MarketingPage`, `DashboardPage`, `CrudPage`, `AuthPage`, `SettingsPage`, `ChatPage`, `CalendarPage`, `EcommercePage`, `BlogPage`, `PortfolioPage`, `MediaPage`) that accept data props and render complete pages.

```
PageTemplate (MarketingPage, DashboardPage, CrudPage, AuthPage, SettingsPage, ChatPage, CalendarPage, EcommercePage, BlogPage, PortfolioPage, MediaPage)
  └── PageShell (topbar, left, right, main)
       └── PageSection (spacing, container, animation)
            └── Content components (FeatureGrid, DataTable, etc.)
```

---

## Agentic Subsystem

The `src/utils/agentic/` module provides composable building blocks for LLM-powered agent workflows. It includes tool-calling primitives, agent loop orchestration, and structured output helpers. These composables follow the same `createX()` pattern as the rest of the library and are designed to be composed into higher-level agent pipelines.

---

## Testing Convention

Composable tests use the `.svelte.test.ts` extension to ensure they run within Svelte's reactive context (enabling `$state`, `$derived`, `$effect`). Co-locate tests next to their source files:

```
src/utils/composables.svelte.ts
src/utils/composables.svelte.test.ts
```

---

## Bundling & Exports

- **Build**: Built using `@sveltejs/package` outputting to the `dist/` directory.
- **Vite Integration**: Consumers must exclude `bindrunes` in `optimizeDeps` to prevent duplicate Svelte compilation instances.
