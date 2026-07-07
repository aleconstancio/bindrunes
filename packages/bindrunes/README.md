# bindrunes

[![CI](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bindrunes)](https://www.npmjs.com/package/bindrunes)
[![license](https://img.shields.io/npm/l/bindrunes)](https://github.com/aleconstancio/bindrunes/blob/main/LICENSE)

Svelte 5 component library for B2B SaaS. Server-first rendering, responsive hybrid, 234 components, 25 composables.

## Quick Start

```bash
bun add bindrunes svelte tailwindcss lucide-svelte svelte-sonner
```

```css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { ThemeProvider } from "bindrunes";
  let { children } = $props();
</script>

<ThemeProvider themeDefault="editorial" densityDefault="comfortable">
  {@render children()}
</ThemeProvider>
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { Button, Card } from "bindrunes";
</script>

<Card variant="glass" responsive>
  <h2>Welcome</h2>
  <Button variant="primary">Get Started</Button>
</Card>
```

## Features

- **Server-first** — All components SSR-safe. Server utilities for theme/density resolution from request context.
- **Responsive hybrid** — CSS container queries + fluid tokens for zero-JS responsiveness. `useViewport()` for JS breakpoints.
- **Mobile gestures** — `useSwipe()`, `useLongPress()`, `useHaptic()` composables. BottomSheet and SwipeableList components.
- **Motion system** — `<Transition>`, `<AnimatePresence>`, `<Stagger>`, `<PageTransition>`, scroll-reveal CSS.
- **Runtime optimization** — `useMemo()`, `useWorker()`, `useLazyLoad()` composables. CSS containment on components.
- **Tree-shakeable** — Split entry points: `bindrunes/data`, `bindrunes/forms`, `bindrunes/auth` for lazy loading.
- **Three-axis design system** — Theme (color), aesthetic (form), density (spacing). Any combination works.
- **Svelte 5 runes** — `$state`, `$derived`, `$effect` only. No legacy stores.
- **4-layer architecture** — Primitives → Layouts → Domains → Templates.
- **10 domain categories** — Auth, Calendar, Chat, Data, E-commerce, Landing, Marketing, Media, Portfolio, Settings.
- **Agentic copilot UI** — LLM chat components: message lists, tool panels, streaming indicators.
- **OKLCH color space** — 6 curated themes: editorial, dracula, nord, catppuccin, rose-pine, github.
- **7 aesthetics** — minimal, glass, bento, expressive, neon, brutalist, organic.
- **Valibot validation** — Lightweight, tree-shakeable schema validation.

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Install, setup, first component |
| [Components](docs/components.md) | Component reference |
| [Composables](docs/composables.md) | Reactivity, data, forms, auth |
| [Design System](docs/design-system.md) | Themes, aesthetics, density |
| [SSR Guide](docs/ssr.md) | Server-side rendering, progressive hydration |
| [Architecture](docs/architecture.md) | 4-layer hierarchy, file structure |
| [Agentic](docs/agentic/overview.md) | LLM chat kernel and copilot UI |
| [Security](docs/security.md) | Token storage, redirects, CSRF |
| [Testing](docs/testing.md) | Vitest conventions and helpers |
| [Migration v2→v3](docs/migration/v2-to-v3.md) | Breaking changes and upgrade guide |
| [bindrunes-kit](docs/kit/) | SvelteKit meta-framework |

## Export Paths

| Path | What |
|------|------|
| `bindrunes` | Primitives, composables, utilities, types |
| `bindrunes/server` | SSR-safe utilities (no runes, no browser APIs) |
| `bindrunes/responsive` | Viewport, gesture, haptic, motion composables |
| `bindrunes/motion` | Transition, AnimatePresence, Stagger, PageTransition |
| `bindrunes/data` | Data layer (useQuery, useMutation, useTable) — lazy-loadable |
| `bindrunes/forms` | Form layer (useForm, useWizard) — lazy-loadable |
| `bindrunes/auth` | Auth layer (useAuth, useAccess) — lazy-loadable |
| `bindrunes/layouts` | Layouts + templates |
| `bindrunes/domains/<name>` | Domain components (e.g. `bindrunes/domains/auth`) |
| `bindrunes/agentic` | Agentic chat kernel |
| `bindrunes/tailwind` | Tailwind CSS v4 plugin |
| `bindrunes/styles/*` | Theme and global CSS |
| `bindrunes/i18n/*` | Translation dictionaries |

## Development

```bash
bun install           # Dependencies
bun run dev           # Watch mode
bun run build         # Build library
bun run test          # Run tests
bun run lint          # Lint check
```

## License

MIT
