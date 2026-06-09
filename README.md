# bindrunes — Svelte 5 Component Library & Scaffold

[![CI](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bindrunes)](https://www.npmjs.com/package/bindrunes)
[![license](https://img.shields.io/npm/l/bindrunes)](https://github.com/aleconstancio/bindrunes/blob/main/LICENSE)

88+ components · 20+ composables · 6 themes · 17 landing sections · 25 page blocks  
Svelte 5 + Tailwind v4 + bits-ui + valibot

## Why bindrunes?

- **Three-axis design system** — theme (color), aesthetic (form), density (spacing) are fully orthogonal. Mix `dracula × bento × spacious` without token collisions.
- **Svelte 5 runes** — all composables use `$state`, `$derived`, `$effect`. No legacy stores, no `export let`.
- **B2B SaaS focus** — dashboard shells, sidebar system, data tables, auth/RBAC, 17 landing page sections out of the box.
- **Valibot, not Zod** — typesafe validation with smaller bundle size.
- **OKLCH color space** — perceptually uniform theming with 6 curated presets.
- **1,046 tests** — co-located, a11y-checked via vitest-axe, enforced in CI.

## Quick Install

```bash
bun add bindrunes
# peer deps
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
```

## Tailwind Setup

```css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ['bindrunes'] },
});
```

## Quick Start

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

`AppProvider` sets up dark/light mode, toasts, and the three design axes. Configure defaults via props:

```svelte
<AppProvider themeDefault="dracula" aestheticDefault="glass" densityDefault="compact">
  {@render children()}
</AppProvider>
```

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Install, setup, quick start |
| [Components](docs/components.md) | Full component reference (88+) |
| [Composables](docs/composables.md) | Data layer, forms, auth, i18n, theming (20+) |
| [Themes](docs/themes.md) | Theme presets, tokens, customization |
| [Aesthetics](docs/aesthetics.md) | Form presets — radius, shadow, motion |
| [Landing Pages](docs/landing.md) | Pre-built landing page sections (17) |
| [Architecture](docs/architecture.md) | Codebase structure, patterns, conventions |
| [Design System](docs/design-system.md) | Token contract, CSS layers, three-axis architecture |
| [Testing](docs/testing.md) | Test conventions, helpers, CI |
| [Migration](docs/migration.md) | Breaking changes between versions |
| [Security](docs/security.md) | Auth tokens, open redirect, SSE |

---

## Feature Overview

**Foundation** — Button, Card, Input, Badge, Spinner, Skeleton, Progress, Kbd, Avatar

**Forms** — Form, Input, Select, Switch, Checkbox, Label, RadioGroup, Toggle, ToggleGroup, Combobox, Slider, DatePicker, TimeField, PinInput, RangeCalendar, RatingGroup, FileUpload  
**Composables** — `createForm` with valibot validation, `createWizard` for multi-step

**Data** — DataTable with sorting/filtering/pagination, `createQuery`, `createMutation`, DataChart  
**Dashboard** — DashboardShell (3 variants), Sidebar (15 components), NavMenu, DashboardShellSplit  
**Auth** — `createAuth`, `AuthGuard`, `createAccess` (RBAC)

**Overlays** — Dialog, Sheet, Popover, Popconfirm, Tooltip, DropdownMenu, Omnibar (Cmd+K)

**i18n** — `createI18n` with pt-BR dict, locale switching, interpolation

**Theming** — 6 presets (editorial, dracula, nord, catppuccin, rose-pine, github), 4 aesthetics (editorial, glass, bento, expressive), 3 density modes (compact, comfortable, spacious), runtime switching, custom themes via CSS tokens, ThemeStudio live editor

**Landing Pages** — 17 pre-built sections (HeroBanner, PricingTable, FAQ, FeatureGrid, TestimonialGrid, etc.), importable from `bindrunes/landing`

**Rich Text** — ProseMirror editor with configurable toolbar (optional deps)

---

## Package Exports

| Import path | What it provides |
|-------------|------------------|
| `bindrunes` | All components + composables |
| `bindrunes/landing` | Landing page components only |
| `bindrunes/boundrune` | Composable page blocks (CRUD, marketing, auth) |
| `bindrunes/tailwind` | Tailwind CSS v4 plugin |
| `bindrunes/styles/*` | CSS files (presets, themes, utilities) |
| `bindrunes/actions/*` | Svelte actions (`shortcut`) |
| `bindrunes/utils/*` | Utility modules |
| `bindrunes/components/*` | Individual components |
| `bindrunes/i18n/*` | Internationalization dictionaries |

---

## Development

```bash
bun install          # install dependencies
bun run build        # svelte-package
bun run check        # tsc --noEmit
bun run test         # vitest
bun run test:coverage # vitest with coverage
bun run lint         # biome check
```

## Examples

See [`examples/landing/`](examples/landing/) for a complete SvelteKit landing page using bindrunes components.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, PR guidelines, and code style.

## License

MIT
