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

## Font Loading

bindrunes uses three font families that you should load for the best experience:

| Token | Font | Fallback |
|-------|------|----------|
| `--font-sans` | Inter | system-ui, sans-serif |
| `--font-display` | Inter Display | Inter, system-ui, sans-serif |
| `--font-mono` | JetBrains Mono | ui-monospace, SF Mono, monospace |

**Recommended:** Use Google Fonts or self-host. Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

If you skip font loading, the system falls back to `system-ui` (sans) and `ui-monospace` (mono). The design will still work but won't match the intended look.

---

## Troubleshooting

### "Multiple Svelte instances"
Ensure `vite.config.ts` includes `optimizeDeps: { exclude: ['bindrunes'] }`.

### Tailwind classes not applying
Verify that your entry CSS file imports `@plugin "bindrunes/tailwind"`.

### SSR Hydration Warnings
Ensure browser-only APIs are run within Svelte `$effect` blocks or check if `typeof window !== 'undefined'`.
