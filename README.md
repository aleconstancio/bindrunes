# bindrunes — Svelte 5 Component Library & Scaffold

[![CI](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bindrunes)](https://www.npmjs.com/package/bindrunes)
[![license](https://img.shields.io/npm/l/bindrunes)](https://github.com/aleconstancio/bindrunes/blob/main/LICENSE)

160+ components · 47 composables · 12 Boundrune categories · 6 themes · Svelte 5 + Tailwind v4 + bits-ui + valibot.

## Features

- **Three-axis design system** — Fully orthogonal theme (color), aesthetic (form), and density (spacing) scales.
- **Svelte 5 runes** — Built exclusively with `$state`, `$derived`, and `$effect`. No legacy stores.
- **12 Boundrune categories** — Pre-composed page patterns for App, Auth, Dashboard, Settings, Landing, Marketing, Portfolio, Data, E-commerce, Media, Calendar, and Chat.
- **B2B SaaS focus** — Shells, sidebars, data tables, CRUD operations, and pre-built landing sections.
- **Lightweight validation** — Built with Valibot, not Zod.
- **OKLCH color space** — Perceptually uniform theming with 6 curated presets.
- **47 composables** — Reactivity primitives, data fetching, forms, auth, i18n, and more.

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

---

## Export Paths

| Path | Description |
|------|-------------|
| `bindrunes` | Core components & composables |
| `bindrunes/landing` | Marketing landing page sections |
| `bindrunes/boundrune` | Pre-composed page patterns (12 categories) |
| `bindrunes/dashboard` | Dashboard shell components |
| `bindrunes/sidebar` | Sidebar navigation components |
| `bindrunes/tailwind` | Tailwind CSS v4 integration plugin |
| `bindrunes/styles/*` | Presets and theme CSS |

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

We use Changesets for versioning. Push changes to `main` with a changeset, and the release workflow handles the rest.

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
