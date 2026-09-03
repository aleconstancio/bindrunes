# urupe-ui

[![CI](https://github.com/aleconstancio/urupe-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/urupe-ui/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/urupe-ui)](https://www.npmjs.com/package/urupe-ui)
[![license](https://img.shields.io/npm/l/urupe-ui)](https://github.com/aleconstancio/urupe-ui/blob/main/LICENSE)

Svelte 5 component library for B2B SaaS. Server-first rendering, responsive hybrid, 234 components, 25 composables.

## Quick Start

```bash
bun add urupe-ui svelte tailwindcss lucide-svelte svelte-sonner
```

```css
/* app.css */
@import "tailwindcss";
@plugin "urupe-ui/tailwind";
@import "urupe-ui/styles/global.css";
```

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { ThemeProvider } from "urupe-ui";
  let { children } = $props();
</script>

<ThemeProvider themeDefault="editorial" densityDefault="comfortable">
  {@render children()}
</ThemeProvider>
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { Button, Card } from "urupe-ui";
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
- **Tree-shakeable** — Split entry points: `urupe-ui/data`, `urupe-ui/forms`, `urupe-ui/auth` for lazy loading.
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
| `urupe-ui` | Primitives, composables, utilities, types |
| `urupe-ui/server` | SSR-safe utilities (no runes, no browser APIs) |
| `urupe-ui/responsive` | Viewport, gesture, haptic, motion composables |
| `urupe-ui/motion` | Transition, AnimatePresence, Stagger, PageTransition |
| `urupe-ui/data` | Data layer (useQuery, useMutation, useTable) — lazy-loadable |
| `urupe-ui/forms` | Form layer (useForm, useWizard) — lazy-loadable |
| `urupe-ui/auth` | Auth layer (useAuth, useAccess) — lazy-loadable |
| `urupe-ui/layouts` | Layouts + templates |
| `urupe-ui/domains/<name>` | Domain components (e.g. `urupe-ui/domains/auth`) |
| `urupe-ui/agentic` | Agentic chat kernel |
| `urupe-ui/tailwind` | Tailwind CSS v4 plugin |
| `urupe-ui/styles/*` | Theme and global CSS |
| `urupe-ui/i18n/*` | Translation dictionaries |

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
