# bindrunes Documentation

> Svelte 5 Component Library & B2B SaaS Scaffold — 88+ components, 20+ composables, 6 themes, 17 landing sections.

## What is bindrunes?

bindrunes is a comprehensive UI toolkit for building B2B SaaS applications with Svelte 5. It provides:

- **88+ components** — forms, data display, dashboards, overlays, landing pages, theming UI
- **20+ composables** — data fetching, form validation, auth, i18n, RBAC, theming
- **Three-axis design system** — theme (color), aesthetic (form), density (spacing) — fully orthogonal, any combination works
- **6 theme presets** — editorial, dracula, nord, catppuccin, rose-pine, github
- **4 aesthetic presets** — editorial, glass, bento, expressive
- **17 landing page sections** — import from `bindrunes/landing`

## Quick Example

```svelte
<script lang="ts">
  import { AppProvider, Button, Card, createQuery, createTheme } from "bindrunes";

  const theme = createTheme({ default: "editorial" });
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

| Guide | Description |
|-------|-------------|
| [Getting Started](getting-started.md) | Install, setup, quick start |
| [Components](components.md) | Full component reference (88+) |
| [Composables](composables.md) | Data layer, forms, auth, i18n, theming (20+) |
| [Themes](themes.md) | Theme presets, tokens, customization |
| [Aesthetics](aesthetics.md) | Form presets — radius, shadow, motion |
| [Landing Pages](landing.md) | Pre-built landing page sections (17) |
| [Architecture](architecture.md) | Codebase structure, patterns, conventions |
| [Design System](design-system.md) | Token contract, CSS layers, three-axis architecture |
| [Migration](migration.md) | Breaking changes between versions |
| [Security](security.md) | Auth tokens, open redirect, SSE |
| [Testing](testing.md) | Test conventions, helpers, CI |

## Package Exports

| Import path | What it provides |
|-------------|------------------|
| `bindrunes` | All components + composables |
| `bindrunes/landing` | Landing page components only |
| `bindrunes/tailwind` | Tailwind CSS v4 plugin |
| `bindrunes/styles/*` | CSS files (presets, themes, utilities) |
| `bindrunes/actions/*` | Svelte actions (`shortcut`) |
| `bindrunes/utils/*` | Utility modules |
| `bindrunes/components/*` | Individual components |
| `bindrunes/i18n/*` | Internationalization dictionaries |
