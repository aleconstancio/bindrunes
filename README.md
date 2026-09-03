# urupe-ui

[![CI](https://github.com/aleconstancio/urupe-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/urupe-ui/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/urupe-ui)](https://www.npmjs.com/package/urupe-ui)
[![license](https://img.shields.io/npm/l/urupe-ui)](https://github.com/aleconstancio/urupe-ui/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/urupe-ui)](https://bundlephobia.com/package/urupe-ui)

**Svelte 5 component library for B2B SaaS.** 234 components, 25 composables, server-first rendering, responsive hybrid design, and an agentic copilot kernel.

[Try it live →](https://bindrunes.dev)

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
  import { AppProvider } from "urupe-ui";
  let { children } = $props();
</script>

<AppProvider themeDefault="editorial" aestheticDefault="minimal" densityDefault="comfortable">
  {@render children()}
</AppProvider>
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

## Why urupe-ui?

| Feature | urupe-ui | shadcn-svelte | Skeleton | Melt UI |
|---------|-----------|---------------|----------|---------|
| Svelte 5 runes | ✅ | ✅ | ✅ | ✅ |
| B2B domain components | ✅ (12 categories) | ❌ | ❌ | ❌ |
| Agentic copilot UI | ✅ | ❌ | ❌ | ❌ |
| SSR-first | ✅ | Partial | Partial | ❌ |
| Three-axis design system | ✅ (126 combos) | ❌ | ❌ | ❌ |
| SvelteKit meta-framework | ✅ | ❌ | ❌ | ❌ |
| OKLCH theming | ✅ | ❌ | Partial | ❌ |
| 7 aesthetics | ✅ | ❌ | ❌ | ❌ |
| Valibot validation | ✅ | ❌ | ❌ | ❌ |
| Tree-shakeable | ✅ | ✅ | ✅ | ✅ |

## Design System

Three orthogonal axes, 126 visual combinations:

- **Theme** — 6 color themes: editorial, dracula, nord, catppuccin, rose-pine, github
- **Aesthetic** — 7 form styles: minimal, glass, bento, expressive, neon, brutalist, organic
- **Density** — 3 spacing scales: compact, comfortable, spacious

Any combination works. Colors never bleed into form. Form never touches spacing.

## Domain Components

12 pre-built domain categories:

- **Auth** — LoginForm, RegisterForm, ForgotPassword, TwoFactorAuth, SocialLogin
- **Data** — AdvancedTable, CrudListPage, CrudForm, FacetedSearch, WizardForm
- **Landing** — HeroBanner, FeatureGrid, PricingTable, Testimonial, FAQ
- **Chat** — ChatThread, ChatInput, ConversationList, AgentChatPage
- **Agentic** — CopilotMessageList, CopilotInput, CopilotToolPanel, CopilotStreamIndicator
- **E-commerce** — ProductCard, Cart, Checkout, OrderSummary
- **Calendar** — EventCalendar, Scheduler, BookingForm
- **Dashboard** — DashboardHome, StatsOverview, ActivityFeed
- **Marketing** — BlogArticle, ChangelogPage, CookieConsent
- **Settings** — ProfileSettings, SecuritySettings, NotificationSettings
- **Media** — AudioPlayer, VideoPlayer, MediaGallery
- **Portfolio** — ProjectCard, CaseStudy, Portfolio

## Agentic Copilot Kernel

Build LLM chat interfaces with built-in token budget management, conversation branching, and persistence:

```ts
import { CopilotMessageList, CopilotInput } from "urupe-ui/domains/agentic";
```

[Read the tutorial →](https://bindrunes.dev/docs/agentic/build-a-copilot)

## Server-First

All components are SSR-safe. Server utilities work outside SvelteKit:

```ts
import { createServerTheme, useThemeServer } from "urupe-ui/server";
```

## Export Paths

| Path | What |
|------|------|
| `urupe-ui` | Primitives, composables, utilities, types |
| `urupe-ui/server` | SSR-safe utilities |
| `urupe-ui/responsive` | Viewport, gesture, haptic |
| `urupe-ui/motion` | AnimatePresence, PageTransition, Stagger |
| `urupe-ui/data` | useQuery, useMutation, useTable |
| `urupe-ui/forms` | useForm, useWizard |
| `urupe-ui/auth` | useAuth, useAccess |
| `urupe-ui/domains/<name>` | Domain components |
| `urupe-ui/layouts` | Layouts + templates |
| `urupe-ui/agentic` | Agentic copilot kernel |
| `urupe-ui/playground` | Dev playground components |
| `urupe-ui/tailwind` | Tailwind CSS v4 plugin |
| `urupe-ui/styles/*` | Global styles and token sheets |
| `urupe-ui/i18n/<locale>` | Translation dictionaries |

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Install, setup, first component |
| [Components](docs/components.md) | Component reference |
| [Composables](docs/composables.md) | Reactivity, data, forms, auth |
| [Design System](docs/design-system.md) | Themes, aesthetics, density |
| [Architecture](docs/architecture.md) | 4-layer hierarchy |
| [Agentic](docs/agentic/overview.md) | LLM chat kernel |
| [Security](docs/security.md) | Token storage, CSRF, XSS |
| [bindrunes-kit](docs/kit/) | SvelteKit meta-framework |
| [Playground](https://bindrunes.dev/playground) | Interactive component explorer |

## Development

```bash
bun install           # Dependencies
just dev              # Watch mode (library + demos)
just validate         # Build + lint + typecheck + test
bun run test          # Run tests
```

## License

MIT
