# Architecture

## Directory Structure

```
packages/bindrunes/src/
├── index.ts                    # Barrel exports (root entry point)
├── shared-types.ts             # Global shared types
├── primitives/                 # Layer 1: Low-level UI components
├── layouts/                    # Layer 2: Structural layout components
│   ├── dashboard/              # Dashboard shell variants
│   ├── sidebar/                # Sidebar component hierarchy
│   └── tabs/                   # Tabs re-exports
├── domains/                    # Layer 3: Domain-specific components & composables
│   ├── auth/                   # Authentication forms & context
│   ├── calendar/               # Calendar components
│   ├── chat/                   # Chat components
│   ├── dashboard/              # Dashboard feature components
│   ├── data/                   # CRUD, tables, forms, charts
│   ├── ecommerce/              # Product, cart, checkout
│   ├── landing/                # Hero, features, pricing, etc.
│   ├── marketing/              # Blog, changelog, comments
│   ├── media/                  # Image, video, audio
│   ├── portfolio/              # Project showcase
│   ├── settings/               # Settings pages
│   └── types/                  # Domain-specific type definitions
├── templates/                  # Layer 4: Pre-composed full-page templates
├── actions/                    # Svelte actions (e.g., shortcut)
├── utils/                      # Composables, context helpers, API clients, formatters
│   └── agentic/                # Agentic subsystem (LLM tool calling, agent loops)
├── helpers/                    # Test helpers, mocks, polyfills
├── i18n/                       # Translation dictionaries
├── styles/                     # Global styles, token sheets, & presets
│   ├── aesthetics/             # Aesthetic presets
│   ├── densities/              # Density presets
│   ├── themes/                 # Theme presets
│   └── tokens/                 # Design tokens
├── types/                      # Shared type definitions
├── test/                       # Test configuration
├── test-utils.ts               # Test utility helpers
├── test-fixtures/              # Test fixture data
└── playground/                 # Dev playground components
```

---

## Four-Layer Component Hierarchy

The v2.0 architecture organizes components into four distinct layers with strict dependency direction — each layer may only depend on layers below it:

```
Templates (Layer 4)
  └── Domains (Layer 3)
       └── Layouts (Layer 2)
            └── Primitives (Layer 1)
```

### Layer 1: Primitives (`bindrunes`)

Low-level, reusable UI components with no domain knowledge. These are the building blocks of the design system.

- **Import path:** `bindrunes`
- **Contains:** Buttons, inputs, dialogs, badges, cards, selects, switches, tabs, tooltips, progress indicators, data grids, theme controls, and 100+ other atomic components.
- **Examples:** `Button`, `Card`, `Input`, `Dialog`, `Select`, `Badge`, `Tabs`, `Switch`, `DataGrid`, `ThemeStudio`

### Layer 2: Layouts (`bindrunes/layouts`)

Structural components that define page zones, containers, and navigation shells.

- **Import path:** `bindrunes/layouts`
- **Contains:** Page shells, sidebars, dashboard shells, meta containers, page headers, SEO, error boundaries, lazy loading, and tab layouts.
- **Examples:** `PageShell`, `PageSection`, `MetaLayout`, `MetaContainer`, `DashboardShell`, `Sidebar`, `PageHeader`, `SEO`

### Layer 3: Domains (`bindrunes/domains` or `bindrunes/domains/<name>`)

Domain-specific components and composables that compose primitives and layouts into feature areas.

- **Import path:** `bindrunes/domains` (all) or `bindrunes/domains/auth` (single domain)
- **Contains:** Authentication forms, calendar views, chat threads, CRUD pages, product grids, landing sections, media players, portfolio showcases, settings pages, and domain-specific types.
- **Examples:** `LoginForm`, `AdvancedTable`, `ProductGrid`, `ChatThread`, `EventCalendar`

### Layer 4: Templates (`bindrunes/templates`)

Pre-composed full-page templates that combine all layers into ready-to-use page layouts.

- **Import path:** `bindrunes/templates`
- **Contains:** Complete page templates for common application pages.
- **Examples:** `DashboardTemplate`, `AuthTemplate`, `CrudTemplate`, `SettingsTemplate`, `ChatTemplate`, `CalendarTemplate`, `EcommerceTemplate`, `MarketingTemplate`, `PortfolioTemplate`, `MediaTemplate`

---

## Design Principles

### 1. The `useX()` Composable Pattern

All state containers and context getters are exported as composable functions leveraging Svelte 5 runes:

- Read-only getters are returned for consumer-facing reactive properties.
- State changes are driven through explicit returned action functions.
- Runes-containing files use the `.svelte.ts` extension.
- Context providers follow the `createX()` / `useX()` dual pattern.
- Factory functions (non-reactive) use the `createX()` prefix (e.g., `createApiClient`, `createStorage`, `createEnv`).
- Reactive composables use the `useX()` prefix (e.g., `useAuth`, `useTheme`, `useToast`, `useForm`).

```ts
// Reactive composable (useX pattern)
export function useCounter() {
  let count = $state(0);
  return {
    get count() { return count; },
    increment() { count++; }
  };
}

// Factory function (createX pattern)
export function createApiClient(options: ApiClientOptions) {
  return { get, post, put, delete };
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
- **Aesthetics** override corner radius, shadows, motion (duration/easing), gradients, blur, button treatment, card treatment, surface texture, and shadow emphasis exclusively. Never modify colors.
- **Density** overrides spacing margins and paddings exclusively (`data-density`).

### 4. Page Composition Architecture

Pages are composed from four layers:

- **`PageShell`** — Layout primitive with composable topbar/left/right/main zones. Handles sidebar width and collapsibility.
- **`PageSection`** — Content zone wrapper with container sizing, spacing, and section-reveal animation.
- **Templates** — Pre-composed full-page components that accept data props and render complete pages.

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
| `bindrunes/layouts` | Layout components (PageShell, sidebar, dashboard shell, templates) |
| `bindrunes/domains/<name>` | Individual domain (e.g., `bindrunes/domains/auth`) |
| `bindrunes/agentic` | Agentic subsystem (LLM tool calling, agent loops) |
| `bindrunes/tailwind` | Tailwind CSS plugin |
| `bindrunes/styles/*` | Global styles and token sheets |

> **Note:** Templates have been merged into `bindrunes/layouts`. Domain barrel export (`bindrunes/domains`) has been removed — use granular imports like `bindrunes/domains/auth`.

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
src/domains/auth/LoginForm.svelte
src/domains/auth/LoginForm.svelte.test.ts
```

---

## Bundling & Exports

- **Build**: Built using `@sveltejs/package` outputting to the `dist/` directory.
- **Vite Integration**: Consumers must exclude `bindrunes` in `optimizeDeps` to prevent duplicate Svelte compilation instances.
