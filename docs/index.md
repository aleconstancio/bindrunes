# bindrunes Documentation

> Svelte 5 Component Library & B2B SaaS Scaffold — 239 components, 33 composables, 13 domain categories, 6 themes.

## Overview

bindrunes is a toolkit for building SaaS interfaces. It provides a three-axis design system: theme (color), aesthetic (form), and density (spacing).

```svelte
<script lang="ts">
  import { AppProvider, Button, Card, useQuery } from "bindrunes";
  const users = useQuery({
    key: "/api/users",
    fetcher: () => fetch("/api/users").then(r => r.json()),
  });
</script>

<AppProvider>
  <Card>
    {#if users.isLoading}
      <p>Loading...</p>
    {:else}
      {#each users.data as user}
        <Button onclick={() => alert(user.name)}>{user.name}</Button>
      {/each}
    {/if}
  </Card>
</AppProvider>
```

## Guides

- [Getting Started](getting-started.md) — Install, setup, and troubleshooting
- [Components](components.md) — Reference for all 239 components
- [Composables](composables.md) — Reference for state, fetching, forms, auth, i18n
- [Design System](design-system.md) — Orthogonal theme, aesthetic, and density customizer
- [Landing Pages](landing.md) — Pre-built marketing sections
- [Templates](components.md#templates) — Pre-composed page templates
- [Architecture](architecture.md) — Folder mapping, composite patterns, context rules
- [Security](security.md) — Token storage and redirect sanitization
- [Testing](testing.md) — Test conventions, helpers, and coverage
- [Agentic Chat](agentic/overview.md) — Core agent memory and budget kernel

## Exports

- `bindrunes` — Core components, composables, and utilities
- `bindrunes/layouts` — Layout shell components (DashboardShell, Sidebar, Tabs, etc.)
- `bindrunes/domains` — Domain-specific components (auth, calendar, chat, data, ecommerce, landing, marketing, media, portfolio, settings)
- `bindrunes/domains/*` — Individual domain imports (e.g., `bindrunes/domains/auth`)
- `bindrunes/templates` — Pre-composed page templates
- `bindrunes/playground` — Demo/scaffold components and utilities
- `bindrunes/agentic` — Agentic chat kernel composables
- `bindrunes/tailwind` — Tailwind CSS v4 integration plugin
- `bindrunes/styles/*` — Theme CSS, presets, aesthetics, and density scales
