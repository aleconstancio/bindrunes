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
- `bindrunes/scaffold` — Pre-built scaffold/demo layouts
- `bindrunes/agentic` — Agentic chat kernel composables
- `bindrunes/tailwind` — Tailwind CSS v4 integration plugin
- `bindrunes/styles/*` — Presets and theme CSS
- `bindrunes/densities/*` — Density scale CSS
- `bindrunes/actions/*` — Svelte actions
- `bindrunes/utils/*` — Individual utility imports
- `bindrunes/components/*` — Individual component imports
- `bindrunes/i18n/*` — i18n translation files
- `bindrunes/Button` — Direct component import (tree-shakeable)
- `bindrunes/Card` — Direct component import (tree-shakeable)
- `bindrunes/Input` — Direct component import (tree-shakeable)
- `bindrunes/Dialog` — Direct component import (tree-shakeable)
- `bindrunes/Form` — Direct component import (tree-shakeable)
- `bindrunes/Select` — Direct component import (tree-shakeable)
- `bindrunes/Badge` — Direct component import (tree-shakeable)
- `bindrunes/Alert` — Direct component import (tree-shakeable)
- `bindrunes/Sheet` — Direct component import (tree-shakeable)
- `bindrunes/Switch` — Direct component import (tree-shakeable)
- `bindrunes/Checkbox` — Direct component import (tree-shakeable)
- `bindrunes/Tooltip` — Direct component import (tree-shakeable)
- `bindrunes/Popover` — Direct component import (tree-shakeable)
- `bindrunes/DropdownMenu` — Direct component import (tree-shakeable)
