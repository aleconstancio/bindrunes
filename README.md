# bindrunes — Svelte 5 Component Library & Scaffold

[![CI](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bindrunes)](https://www.npmjs.com/package/bindrunes)
[![license](https://img.shields.io/npm/l/bindrunes)](https://github.com/aleconstancio/bindrunes/blob/main/LICENSE)

245+ components · 48 composables · 10 domain categories · 6 themes · Svelte 5 + Tailwind v4 + bits-ui + valibot.

## Features

- **Three-axis design system** — Fully orthogonal theme (color), aesthetic (form), and density (spacing) scales. 7 aesthetics: minimal, glass, bento, expressive, neon, brutalist, organic.
- **Svelte 5 runes** — Built exclusively with `$state`, `$derived`, and `$effect`. No legacy stores.
- **Page composition** — `PageShell` layout primitive + `MarketingTemplate`, `DashboardTemplate`, `CrudTemplate` templates for no-brainer page building.
- **10 domain categories** — Pre-composed page patterns for Auth, Calendar, Chat, Data, E-commerce, Landing, Marketing, Media, Portfolio, and Settings.
- **B2B SaaS focus** — Shells, sidebars, data tables, CRUD operations, and pre-built landing sections.
- **Lightweight validation** — Built with Valibot, not Zod.
- **OKLCH color space** — Perceptually uniform theming with 6 curated presets.
- **48 composables** — Reactivity primitives, data fetching, forms, auth, i18n, and more.
- **Agentic copilot UI** — Pre-built components for LLM chat interfaces: message lists, tool panels, streaming indicators, suggestion cards, and reasoning displays.
- **Agentic persistence** — Built-in `localStorage` and IndexedDB adapters for cross-session state persistence.
- **AppProvider scoped overrides** — Override `theme`, `aesthetic`, and `density` per subtree without affecting global state.
- **SvelteKit meta-framework** — `bindrunes-kit` provides full-stack and SPA+backend scaffolding with auth, i18n, and deployment helpers.

## Install

```bash
bun add bindrunes
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
```

## Setup

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

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider themeDefault="editorial" aestheticDefault="editorial" densityDefault="comfortable">
  {@render children()}
</AppProvider>
```

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Install, setup, and troubleshooting |
| [Components](docs/components.md) | Component references and details |
| [Component States](docs/component-states.md) | Visual state specs for all components (tokens, hover/focus/disabled) |
| [Composables](docs/composables.md) | Core composable APIs (caching, forms, auth) |
| [Design System](docs/design-system.md) | Customizing themes, aesthetics, and density |
| [Landing Pages](docs/landing.md) | Pre-built landing page sections |
| [Boundrunes](docs/boundrunes.md) | Pre-composed page patterns by category |
| [Architecture](docs/architecture.md) | Codebase design, context, and file mapping |
| [Security](docs/security.md) | Token storage and redirect validation |
| [Testing](docs/testing.md) | Vitest testing rules, helpers, and coverage |
| [Agentic Chat](docs/agentic/overview.md) | LLM agent kernel and copilot components |
| [bindrunes-kit](docs/kit/) | SvelteKit meta-framework (SSR, auth, i18n) |

---

## Export Paths

| Path | Description |
|------|-------------|
| `bindrunes` | Primitives, composables, and utilities |
| `bindrunes/layouts` | Layout components, dashboard shells, and sidebar |
| `bindrunes/domains` | Domain components (auth, calendar, chat, data, e-commerce, landing, marketing, media, portfolio, settings) |
| `bindrunes/domains/*` | Individual domain imports (e.g. `bindrunes/domains/landing`) |
| `bindrunes/domains/agentic` | Agentic copilot UI components |
| `bindrunes/templates` | Pre-composed page templates (10 categories) |
| `bindrunes/agentic` | Agentic chat kernel composables |
| `bindrunes/playground` | Playground and demo components |
| `bindrunes/tailwind` | Tailwind CSS v4 integration plugin |
| `bindrunes/styles/*` | Theme and global CSS |

---

## Development

```bash
bun install           # Dependencies
bun run dev           # Watch mode (library + tests)
bun run build         # Build library
bun run clean         # Clean dist
bun run check         # Type check
bun run test          # Run tests
bun run lint          # Lint check
```

## Releases

We use [Changesets](https://github.com/changesets/changesets) to manage versioning and package publishing.

### 1. Adding a Changeset
Whenever you make a user-facing change (bugfix, feature, chore, etc.), run:
```bash
bun run changeset
```
Follow the prompt to select the bump type (major, minor, patch) and write a short summary of the change.

### 2. Auto-Publish Flow
Our CI/CD pipeline ([release.yml](.github/workflows/release.yml)) automates publication:
1. When changesets are pushed to `main`, Changesets opens a versioning PR containing all accumulated changes.
2. Merging that PR into `main` automatically bumps the version, updates `CHANGELOG.md`, builds the project, and publishes the package to NPM with **Build Provenance** enabled.

## License

MIT
