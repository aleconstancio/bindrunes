# Architecture

## Directory Map

```
src/
├── index.ts                            # barrel exports
├── shared-types.ts                     # shared type definitions
├── actions/shortcut.ts                 # use:shortcut Svelte action
├── components/                         # Svelte components
│   ├── Button.svelte, Card.svelte, ...
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
│   └── themes/                         # 7 theme presets
└── utils/
    ├── createAuth.svelte.ts            # reactive auth
    ├── createForm.svelte.ts            # valibot form validation
    ├── createI18n.svelte.ts            # i18n composable
    ├── createTheme.svelte.ts           # runtime theme switching
    ├── createMutation.svelte.ts        # mutation composable
    ├── createQuery.svelte.ts           # query composable
    ├── createApiClient.ts              # typed fetch wrapper
    ├── createStorage.ts                # typed localStorage
    ├── createTable.svelte.ts           # DataTable state management
    ├── createWizard.svelte.ts          # multi-step form wizard
    ├── createToast.svelte.ts           # typed svelte-sonner wrapper
    ├── chartTheme.ts                   # CSS token reader for charts
    ├── formatters.ts                   # pt-BR formatters
    ├── navigation.ts                   # derivePageInfo, deriveOmnibarOptions
    ├── queryCache.ts                   # module-level cache backend
    └── RealtimeClient.svelte.ts        # SSE client
```

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

Shared component state uses `Symbol` keys with centralized factories:

```
sidebar: Symbol('thoth-sidebar') + sidebar-context.svelte.ts
landing: Symbol('landing')       + landing-context.svelte.ts
accordion: Symbol('accordion')   + accordionContext.ts
```

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
