# Architecture

## Directory Structure

```
src/
├── index.ts                    # Primitives + composables + utilities + types
├── shared-types.ts             # Global shared types
├── primitives/                 # Layer 1: Low-level UI components
├── layouts/                    # Layer 2: Layouts + templates (merged)
│   ├── dashboard/
│   ├── sidebar/
│   └── tabs/
├── domains/                    # Layer 3: Domain-specific components
│   ├── auth/
│   ├── calendar/
│   ├── chat/
│   ├── dashboard/
│   ├── data/
│   ├── ecommerce/
│   ├── landing/
│   ├── marketing/
│   ├── media/
│   ├── portfolio/
│   ├── settings/
│   └── types/
├── actions/                    # Svelte actions
├── utils/                      # Composables, context helpers, formatters
│   └── agentic/                # Agentic subsystem
├── helpers/                    # Test helpers, mocks
├── i18n/                       # Translation dictionaries
├── styles/                     # Token sheets, aesthetics, densities
│   ├── aesthetics/
│   ├── densities/
│   ├── themes/
│   └── tokens/
├── types/                      # Shared type definitions
├── test/                       # Test configuration
├── test-utils.ts               # Test utilities
└── test-fixtures/              # Fixture data
```

---

## Four-Layer Hierarchy

```
Templates (Layer 4)
  └── Domains (Layer 3)
       └── Layouts (Layer 2)
            └── Primitives (Layer 1)
```

Each layer depends only on layers below it.

### Layer 1: Primitives (`bindrunes`)

Atomic UI components. No domain knowledge.

- **Path:** `bindrunes`
- **Examples:** `Button`, `Card`, `Input`, `Dialog`, `Select`, `Badge`, `Tabs`, `Switch`, `DataGrid`

### Layer 2: Layouts (`bindrunes/layouts`)

Structural shells, page zones, navigation, and pre-composed templates.

- **Path:** `bindrunes/layouts`
- **Examples:** `PageShell`, `MetaLayout`, `DashboardShell`, `Sidebar`, `DashboardTemplate`, `AuthTemplate`

### Layer 3: Domains (`bindrunes/domains/<name>`)

Feature-specific components composing primitives and layouts.

- **Path:** `bindrunes/domains/<name>`
- **Examples:** `LoginForm`, `AdvancedTable`, `ProductGrid`, `ChatThread`

### Layer 4: Templates

Pre-composed full-page layouts. Now live in `bindrunes/layouts`.

- **Path:** `bindrunes/layouts`
- **Examples:** `DashboardTemplate`, `AuthTemplate`, `CrudTemplate`, `SettingsTemplate`

---

## Design Principles

### `useX()` / `createX()` Pattern

```ts
// Reactive composable — consumer-facing state
export function useCounter() {
  let count = $state(0);
  return {
    get count() { return count; },
    increment() { count++; },
  };
}

// Factory — non-reactive utility creation
export function createApiClient(options: ApiClientOptions) {
  return { get, post, put, del };
}
```

### Context Isolation

Use `createMetaContext` / `useMetaContext` with Symbol keys. Never raw `setContext` / `getContext`.

```ts
const KEY = Symbol("subsystem");
export function createSubsystemState() {
  return createMetaContext(KEY, () => { /* state */ });
}
export function useSubsystemContext() {
  return useMetaContext(KEY);
}
```

### Orthogonal Axes

- **Theme** — colors only (`data-theme`)
- **Aesthetic** — form only: radius, shadow, motion, texture (`data-aesthetic`)
- **Density** — spacing only (`data-density`)

Any combination is valid. Axes never overlap.

### Page Composition

```
Template → Domain Components → Layouts → Primitives
```

- `PageShell` — composable topbar/left/right/main zones
- `PageSection` — content zone with container sizing + reveal animation
- Templates — accept data props, render complete pages

---

## Export Structure

| Path | Contents |
|---|---|
| `bindrunes` | Primitives, composables, utilities, types |
| `bindrunes/layouts` | Layouts + templates |
| `bindrunes/domains/<name>` | Individual domain |
| `bindrunes/agentic` | LLM tool calling, agent loops |
| `bindrunes/tailwind` | Tailwind CSS plugin |
| `bindrunes/styles/*` | Global CSS, token sheets |
| `bindrunes/i18n/*` | Translation dictionaries |

---

## Agentic Subsystem

`src/utils/agentic/` — composable building blocks for LLM-powered workflows. Tool-calling primitives, agent loop orchestration, and structured output helpers. Follows `useX()` / `createX()` conventions.

---

## Testing Convention

Tests use `.svelte.test.ts` for Svelte reactive context. Co-locate next to source:

```
src/utils/useAuth.svelte.ts
src/utils/useAuth.svelte.test.ts
src/primitives/Button.svelte
src/primitives/Button.svelte.test.ts
src/domains/auth/LoginForm.svelte
src/domains/auth/LoginForm.svelte.test.ts
```

---

## Bundling

- Built with `@sveltejs/package` → `dist/`
- Consumers must `optimizeDeps: { exclude: ['bindrunes'] }` to prevent duplicate Svelte instances
