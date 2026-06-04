# Getting Started

## Installation

```bash
bun add bindrunes
# or
npm install bindrunes
```

### Peer dependencies

```bash
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
```

### Optional dependencies

Only if you use specific features:

```bash
# For RichTextEditor
bun add prosemirror-commands prosemirror-history prosemirror-keymap \
       prosemirror-markdown prosemirror-model prosemirror-state prosemirror-view

# For RealtimeClient (SSE with localforage gap detection)
bun add @microsoft/fetch-event-source localforage
```

## Tailwind Setup

In your `app.css`:

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

The plugin registers all color tokens, utilities (`.glass-panel`, `.text-gradient-violet`, etc.), and sidebar tokens as Tailwind theme values.

Alternatively, use the CSS-only preset:

```css
@import "tailwindcss";
@import "bindrunes/styles/preset.css";
@import "bindrunes/styles/utilities.css";
```

In `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['bindrunes'],
  },
});
```

> **Important:** Vite must exclude bindrunes from pre-bundling to avoid duplicate Svelte instances.

## Quick Start

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

`AppProvider` sets up `ModeWatcher` (dark/light mode) and `Toaster` (svelte-sonner notifications).

## Next Steps

- Browse the [Component Library](components.md)
- Learn about [Composables](composables.md) for data fetching, forms, auth
- Customize your [Theme](themes.md)
- Build a [Landing Page](landing.md)
