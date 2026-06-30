# bindrunes

[![CI](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bindrunes)](https://www.npmjs.com/package/bindrunes)
[![license](https://img.shields.io/npm/l/bindrunes)](https://github.com/aleconstancio/bindrunes/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/bindrunes)](https://bundlephobia.com/package/bindrunes)

**Svelte 5 component library for B2B SaaS.** 270+ components, 60+ composables, server-first rendering, responsive hybrid design, and an agentic copilot kernel.

[Try it live →](https://bindrunes.dev/playground)

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

## Why bindrunes?

| Feature | bindrunes | shadcn-svelte | Skeleton | Melt UI |
|---------|-----------|---------------|----------|---------|
| Svelte 5 runes | ✅ | ✅ | ✅ | ✅ |
| B2B domain components | ✅ (10 categories) | ❌ | ❌ | ❌ |
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

10 pre-built domain categories:

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

## Agentic Copilot Kernel

Build LLM chat interfaces with built-in token budget management, conversation branching, and persistence:

```ts
import { CopilotMessageList, CopilotInput } from "bindrunes/domains/agentic";
```

[Read the tutorial →](https://bindrunes.dev/docs/agentic/build-a-copilot)

## Server-First

All components are SSR-safe. Server utilities work outside SvelteKit:

```ts
import { createServerTheme, useThemeServer } from "bindrunes/server";
```

## Export Paths

| Path | What |
|------|------|
| `bindrunes` | Primitives, composables, utilities, types |
| `bindrunes/server` | SSR-safe utilities |
| `bindrunes/responsive` | Viewport, gesture, haptic, motion |
| `bindrunes/data` | useQuery, useMutation, useTable |
| `bindrunes/forms` | useForm, useWizard |
| `bindrunes/auth` | useAuth, useAccess |
| `bindrunes/domains/<name>` | Domain components |
| `bindrunes/layouts` | Layouts + templates |
| `bindrunes/agentic` | Agentic copilot kernel |
| `bindrunes/tailwind` | Tailwind CSS v4 plugin |

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
bun run dev           # Watch mode
bun run build         # Build library
bun run test          # Run tests
bun run lint          # Lint check
```

## License

MIT
