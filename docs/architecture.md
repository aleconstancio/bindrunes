# Architecture

## Directory Map

```
src/
├── index.ts                            # barrel exports
├── shared-types.ts                     # shared type definitions
├── actions/shortcut.ts                 # use:shortcut Svelte action
├── components/                         # Svelte components
│   ├── Button.svelte, Card.svelte, ...
│   ├── MetaLayout.svelte               # shared position-based snippet slots
│   ├── MetaContainer.svelte            # token-aware content width wrapper
│   ├── MetaScrollable.svelte           # standardized overflow container
│   ├── dashboard/                      # DashboardShell, NavMenu
│   ├── landing/                        # 17 landing page components
│   └── sidebar/                        # SidebarProvider, Sidebar*, ...
├── i18n/
│   └── pt-BR.ts                        # default pt-BR dictionary
├── styles/
│   ├── global.css                      # base reset + preset + utilities
│   ├── preset.css                      # @theme inline tokens
│   ├── utilities.css                   # keyframe animations
│   ├── landing.css                     # landing page animations
│   └── themes/                         # 6 theme presets + 4 aesthetic presets
└── utils/
    ├── createMetaContext.svelte.ts      # two-function context pattern (createMetaContext / useMetaContext)
    ├── readonlyGetters.ts              # readonly state exposure utility
    ├── createAuth.svelte.ts            # reactive auth
    ├── createForm.svelte.ts            # valibot form validation
    ├── createI18n.svelte.ts            # i18n composable
    ├── createTheme.svelte.ts           # runtime theme switching (v1.0: 6 themes)
    ├── createAesthetic.svelte.ts       # form aesthetic switching (v1.0)
    ├── createDensity.svelte.ts         # spacing density switching (v1.0)
    ├── createPrefersTheme.svelte.ts    # prefers-color-scheme detection (v1.0)
    ├── defineTheme.svelte.ts           # runtime per-tenant CSS injection (v1.0)
    ├── createThemeBuilder.svelte.ts    # programmatic theme token generation (v1.0)
    ├── extendTheme.svelte.ts           # extend built-in preset (v1.0)
    ├── createDarkMode.svelte.ts        # mode-watcher wrapper (v1.0)
    ├── createMutation.svelte.ts        # mutation composable
    ├── createQuery.svelte.ts           # query composable
    ├── createApiClient.ts              # typed fetch wrapper
    ├── createStorage.ts                # typed localStorage
    ├── createTable.svelte.ts           # DataTable state management
    ├── createWizard.svelte.ts          # multi-step form wizard
    ├── createOmnibar.svelte.ts         # command palette state
    ├── createToast.svelte.ts           # typed svelte-sonner wrapper
    ├── chartTheme.ts                   # CSS token reader for charts
    ├── formatters.ts                   # pt-BR formatters
    ├── navigation.ts                   # derivePageInfo, deriveOmnibarOptions
    ├── queryCache.ts                   # module-level cache backend
    ├── RealtimeClient.svelte.ts        # SSE client
    └── colorConvert.ts                 # hex <-> OKLCH conversion
```

## Three-Axis Design System (v1.0)

bindrunes v1.0 introduces three orthogonal customization axes that never collide:

| Axis | Attribute | Values | Controls | Composable |
|------|-----------|--------|----------|-----------|
| **Theme** | `data-theme` | editorial, dracula, nord, catppuccin, rose-pine, github | Color identity (all color tokens) | `createTheme()` |
| **Aesthetic** | `data-aesthetic` | editorial, glass, bento, expressive | Form (radius, shadow, motion, button treatment) | `createAesthetic()` |
| **Density** | `data-density` | compact, comfortable, spacious | Spacing scale (`--space-*` tokens) | `createDensity()` |

Token resolution order: `:root` defaults → aesthetic overrides form tokens → theme overrides color tokens → density overrides spacing tokens. No two axes override the same token category.

Each axis is independently composable: `dracula × bento × spacious` is a valid configuration.

## Design Principles

### `createX()` Composable Pattern

All composables follow this pattern:

```ts
// src/utils/createMyThing.svelte.ts
export function createMyThing(options: Options): Result {
  let state = $state(initial);
  let derived = $derived(state > 0);

  $effect(() => {
    // setup: subscribe, addEventListener, etc.
    return () => cleanup;
  });

  return {
    get state() { return state; },
    get derived() { return derived; },
    action() { /* modify state */ },
  };
}
```

- Use `.svelte.ts` extension for files containing runes
- Export types alongside the function
- Return readonly getters for reactive state

### Context Pattern

Shared component state uses `createMetaContext` / `useMetaContext` with module-scoped Symbol keys:

```ts
// src/components/sidebar/sidebar-context.svelte.ts
import { createMetaContext, useMetaContext } from '../../utils/createMetaContext.svelte';

const KEY = Symbol('bindrunes-sidebar');

export function createSidebarState(initialOpen = true) {
  return createMetaContext(KEY, () => {
    // runes + state + actions
  });
}

export function getSidebarContext() {
  return useMetaContext<SidebarState>(KEY);
}
```

Each subsystem defines its own Symbol key and wraps `createMetaContext`/`useMetaContext` with named functions. Consumers never import the generics directly.

### Styling Strategy

- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- CSS custom properties for theming (OKLCH color space)
- `@theme inline` in `preset.css` maps tokens to Tailwind utilities
- Component variants use `Record<Variant, string>` class maps
- Scoped `<style>` blocks for component-specific CSS

### Tailwind Plugin

The `bindrunes/tailwind` plugin registers:
- All color tokens as Tailwind theme colors
- Utility classes (glass, gradients, animations)
- Font family, border radius, duration, z-index tokens

Alternative CSS-only path: `preset.css` + `utilities.css`.

## Build

```bash
bun run build    # svelte-package -i src -o dist
bun run check   # tsc --noEmit
bun run test    # vitest run
bun run lint    # biome check
```

`package.json` exports:
- `.` — main entry (all components + composables)
- `./landing` — landing page components only
- `./tailwind` — Tailwind CSS v4 plugin
- `./styles/*` — CSS files (presets, themes, utilities)
