# bindrunes Documentation

> Svelte 5 Component Library & B2B SaaS Scaffold — 160+ components, 47 composables, 12 Boundrune categories, 6 themes.

## Overview

bindrunes is a toolkit for building SaaS interfaces. It provides a three-axis design system: theme (color), aesthetic (form), and density (spacing).

```svelte
<script lang="ts">
  import { AppProvider, Button, Card, createQuery } from "bindrunes";
  const users = createQuery({
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
- [Components](components.md) — Reference for all 160+ components
- [Composables](composables.md) — Reference for state, fetching, forms, auth, i18n
- [Design System](design-system.md) — Orthogonal theme, aesthetic, and density customizer
- [Landing Pages](landing.md) — Pre-built marketing sections
- [Boundrunes](boundrunes.md) — Pre-composed page patterns by category
- [Architecture](architecture.md) — Folder mapping, composite patterns, context rules
- [Security](security.md) — Token storage and redirect sanitization
- [Testing](testing.md) — Test conventions, helpers, and coverage
- [Agentic Chat](agentic/overview.md) — Core agent memory and budget kernel

## Exports

- `bindrunes` — Core components & composables
- `bindrunes/landing` — Marketing landing page sections
- `bindrunes/boundrune` — Pre-composed page patterns (12 categories)
- `bindrunes/dashboard` — Dashboard shell components
- `bindrunes/sidebar` — Sidebar navigation components
- `bindrunes/tailwind` — Tailwind CSS v4 integration plugin
- `bindrunes/styles/*` — Presets and theme CSS
