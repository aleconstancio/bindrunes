# Architecture

## Directory Structure

```
packages/bindrunes/src/
├── index.ts                # Barrel exports (root entry point)
├── shared-types.ts         # Global shared types
├── primitives/             # Layer 1: Low-level UI components (Button, Card, Input, etc.)
├── layouts/                # Layer 2: Layout components (PageShell, sidebar, dashboard shell, etc.)
│   ├── dashboard/          # Dashboard shell variants
│   └── sidebar/            # Sidebar component hierarchy
├── domains/                # Layer 3: Domain-specific components & composables
│   ├── auth/               # Authentication forms & context
│   ├── calendar/           # Calendar components
│   ├── chat/               # Chat components
│   ├── data/               # CRUD, tables, forms
│   ├── ecommerce/          # Product, cart, checkout
│   ├── landing/            # Hero, features, pricing, etc.
│   ├── marketing/          # Blog, changelog, comments
│   ├── media/              # Image, video, audio
│   ├── portfolio/          # Project showcase
│   └── settings/           # Settings pages
├── templates/              # Layer 4: Pre-composed full-page templates
├── components/             # Shared cross-cutting components (DataTable, Toast, Theme, etc.)
├── utils/                  # Composables, context helpers, API clients, formatters
│   └── agentic/            # Agentic subsystem (LLM tool calling, agent loops)
├── helpers/                # Test helpers, mocks, polyfills
├── i18n/                   # Translation dictionaries
├── styles/                 # Global styles, token sheets, & presets
├── types/                  # Shared type definitions
├── test/                   # Test configuration
├── test-utils.ts           # Test utility helpers
├── test-fixtures/          # Test fixture data
└── playground/             # Dev playground components
```

---

## Four-Layer Component Hierarchy

The v2.0 architecture organizes components into four distinct layers with clear dependency direction:

```
Templates (Layer 4)
  └── Domains (Layer 3)
       └── Layouts (Layer 2)
            └── Primitives (Layer 1)
```

### Layer 1: Primitives (`bindrunes`)
Low-level, reusable UI components with no domain knowledge. These are the building blocks of the design system.
- Import path: `bindrunes`
- Examples: `Button`, `Card`, `Input`, `Dialog`, `Select`, `Badge`, `Tabs`

### Layer 2: Layouts (`bindrunes/layouts`)
Structural components that define page zones, containers, and navigation shells.
- Import path: `bindrunes/layouts`
- Examples: `PageShell`, `PageSection`, `MetaLayout`, `MetaContainer`, `DashboardShell`, `Sidebar`

### Layer 3: Domains (`bindrunes/domains` or `bindrunes/domains/<name>`)
Domain-specific components and composables that compose primitives and layouts into feature areas.
- Import path: `bindrunes/domains` (all) or `bindrunes/domains/auth` (single domain)
- Examples: `LoginForm`, `AdvancedTable`, `ProductGrid`, `ChatThread`, `EventCalendar`

### Layer 4: Templates (`bindrunes/templates`)
Pre-composed full-page templates that combine all layers into ready-to-use page layouts.
- Import path: `bindrunes/templates`
- Examples: `DashboardTemplate`, `AuthTemplate`, `CrudTemplate`, `SettingsTemplate`

---

## Design Principles

### 1. The `useX()` Composable Pattern
All state containers and context getters are exported as composable functions leveraging Svelte 5 runes:
- Read-only getters are returned for consumer-facing reactive properties.
- State changes are driven through explicit returned action functions.
- Runes-containing files use the `.svelte.ts` extension.
- Context providers follow the `createX()` / `useX()` dual pattern.

```ts
export function useCounter() {
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
export function useSubsystemContext() {
  return useMetaContext(KEY);
}
```

### 3. Orthogonal Design Axes
- **Themes** override color custom properties exclusively (`data-theme`).
- **Aesthetics** override corner radius, shadows, and easing scales exclusively (`data-aesthetic`).
- **Density** overrides spacing margins and paddings exclusively (`data-density`).

### 4. Page Composition Architecture
Pages are composed from four layers:
- **`PageShell`** — Layout primitive with composable topbar/left/right/main zones. Handles sidebar width and collapsibility.
- **`PageSection`** — Content zone wrapper with container sizing, spacing, and section-reveal animation.
- **Templates** — Pre-composed full-page components (`DashboardTemplate`, `AuthTemplate`, `CrudTemplate`, `SettingsTemplate`, `ChatTemplate`, `CalendarTemplate`, `EcommerceTemplate`, `MarketingTemplate`, `PortfolioTemplate`, `MediaTemplate`) that accept data props and render complete pages.

```
Template (DashboardTemplate, AuthTemplate, CrudTemplate, SettingsTemplate, ...)
  └── Domain Components (LoginForm, AdvancedTable, etc.)
       └── Layouts (PageShell, PageSection, MetaLayout)
            └── Primitives (Button, Card, Input, Badge, ...)
```

---

## Export Structure

| Import Path | Contents |
|---|---|
| `bindrunes` | Primitives, shared components, composables, types, utilities |
| `bindrunes/layouts` | Layout components (PageShell, sidebar, dashboard shell, etc.) |
| `bindrunes/domains` | All domain components and composables |
| `bindrunes/domains/<name>` | Individual domain (e.g., `bindrunes/domains/auth`) |
| `bindrunes/templates` | Pre-composed full-page templates |
| `bindrunes/agentic` | Agentic subsystem (LLM tool calling, agent loops) |
| `bindrunes/tailwind` | Tailwind CSS plugin |
| `bindrunes/styles/*` | Global styles and token sheets |

---

## Agentic Subsystem

The `src/utils/agentic/` module provides composable building blocks for LLM-powered agent workflows. It includes tool-calling primitives, agent loop orchestration, and structured output helpers. These composables follow the same `useX()` / `createX()` pattern as the rest of the library and are designed to be composed into higher-level agent pipelines.

---

## Testing Convention

Composable tests use the `.svelte.test.ts` extension to ensure they run within Svelte's reactive context (enabling `$state`, `$derived`, `$effect`). Co-locate tests next to their source files:

```
src/utils/useAuth.svelte.ts
src/utils/useAuth.svelte.test.ts
src/primitives/Button.svelte
src/primitives/Button.svelte.test.ts
```

---

## Bundling & Exports

- **Build**: Built using `@sveltejs/package` outputting to the `dist/` directory.
- **Vite Integration**: Consumers must exclude `bindrunes` in `optimizeDeps` to prevent duplicate Svelte compilation instances.
