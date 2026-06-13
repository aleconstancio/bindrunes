# Getting Started

## Installation

```bash
bun add bindrunes
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
```

### Optional Feature Dependencies
```bash
# RichTextEditor
bun add prosemirror-commands prosemirror-history prosemirror-keymap \
        prosemirror-markdown prosemirror-model prosemirror-state prosemirror-view

# RealtimeClient (SSE)
bun add @microsoft/fetch-event-source localforage

# DataChart
bun add chart.js svelte-chartjs
```

---

## Tailwind Integration

Include the Tailwind CSS v4 plugin and global CSS in your entry stylesheet (e.g., `app.css`):

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

Exclude `bindrunes` from Vite's pre-bundling in `vite.config.ts` to prevent duplicate Svelte instances:

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ['bindrunes'] },
});
```

---

## Quick Start

Wrap your application in `<AppProvider>` to initialize dark mode, notifications, and spacing:

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider
  themeDefault="editorial"
  aestheticDefault="editorial"
  densityDefault="comfortable"
>
  {@render children()}
</AppProvider>
```

---

## Troubleshooting

### "Multiple Svelte instances"
Ensure `vite.config.ts` includes `optimizeDeps: { exclude: ['bindrunes'] }`.

### Tailwind classes not applying
Verify that your entry CSS file imports `@plugin "bindrunes/tailwind"`.

### SSR Hydration Warnings
Ensure browser-only APIs are run within Svelte `$effect` blocks or check if `typeof window !== 'undefined'`.
