# bindrunes — Svelte 5 Component Library & Scaffold

56 components · 12 utilities · 7 themes · 17 landing sections  
Svelte 5 + Tailwind v4 + bits-ui + valibot

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

---

## Documentation

| Topic | File |
|-------|------|
| **Getting Started** | [docs/getting-started.md](docs/getting-started.md) |
| **Components** | [docs/components.md](docs/components.md) |
| **Composables** | [docs/composables.md](docs/composables.md) |
| **Themes & Tokens** | [docs/themes.md](docs/themes.md) |
| **Landing Pages** | [docs/landing.md](docs/landing.md) |
| **Architecture** | [docs/architecture.md](docs/architecture.md) |
| **Migration v0.4→v0.5** | [docs/migration.md](docs/migration.md) |
| **Security** | [docs/security.md](docs/security.md) |

---

## Feature Overview

**Foundation** — Button, Card, Input, Badge, Spinner, Skeleton, Progress, Kbd

**Forms** — Form, Input, Select, Switch, Checkbox, Label, FormField  
**Composables** — `createForm` with valibot validation, `createWizard` for multi-step

**Data** — DataTable with sorting/filtering/pagination, `createQuery`, `createMutation`  
**Dashboard** — DashboardShell (3 variants), Sidebar, NavMenu  
**Auth** — `createAuth`, `AuthGuard`, `createAccess` (RBAC)

**i18n** — `createI18n` with pt-BR dict, locale switching, interpolation

**Theming** — 7 presets (dracula, akashic, martian, alchemy, druidic, obsidian, contrast), runtime switching, custom themes via CSS tokens

**Landing Pages** — 17 pre-built sections (HeroBanner, PricingTable, FAQ, FeatureGrid, etc.), importable from `bindrunes/landing`

**Rich Text** — ProseMirror editor with configurable toolbar (optional deps)

---

## Package Exports

| Import path | What it provides |
|-------------|------------------|
| `bindrunes` | All components + composables |
| `bindrunes/landing` | Landing page components only |
| `bindrunes/tailwind` | Tailwind CSS v4 plugin |
| `bindrunes/styles/*` | CSS files (presets, themes, utilities) |

---

## Development

```bash
bun run build    # svelte-package
bun run check   # tsc --noEmit
bun run test    # vitest
bun run lint    # biome check
```

## License

MIT
