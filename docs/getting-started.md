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

`AppProvider` sets up `ModeWatcher` (dark/light mode), `Toaster` (svelte-sonner notifications), and the three v1.0 design axes:

- **Theme**: Color identity — `data-theme="editorial|dracula|nord|catppuccin|rose-pine|github"`
- **Aesthetic**: Form (radius, shadow, motion) — `data-aesthetic="editorial|glass|bento|expressive"`
- **Density**: Spacing scale — `data-density="compact|comfortable|spacious"`

All three can be configured via `<AppProvider>` props:

```svelte
<AppProvider
  themeDefault="editorial"
  aestheticDefault="editorial"
  densityDefault="comfortable"
>
  {@render children()}
</AppProvider>
```

## Next Steps

- Browse the [Component Library](components.md)
- Learn about [Composables](composables.md) for data fetching, forms, auth
- Customize your [Theme](themes.md)
- Explore [Aesthetics](aesthetics.md) for form styling
- Build a [Landing Page](landing.md)
- Use [Boundrune page blocks](components.md#boundrune--composable-page-blocks) for rapid CRUD pages

## Examples

The [`examples/landing/`](../examples/landing/) directory contains a complete SvelteKit app demonstrating bindrunes landing page components:

```bash
cd examples/landing
bun install
bun run dev
```

This shows how to use `LandingNav`, `HeroBanner`, `FeatureGrid`, `PricingTable`, `FAQ`, `SiteFooter`, and more in a real SvelteKit project.

## Browser Support

bindrunes requires:

- **ES Modules** — all modern browsers (Chrome 87+, Firefox 78+, Safari 14+, Edge 88+)
- **CSS Custom Properties** — all modern browsers
- **OKLCH color space** — Chrome 111+, Firefox 113+, Safari 15.4+, Edge 111+
- **CSS `@layer`** — Chrome 99+, Firefox 97+, Safari 15.4+, Edge 99+

For older browsers without OKLCH support, provide fallback values in your theme CSS.

## FAQ / Troubleshooting

### "Multiple Svelte instances" error

This happens when Vite pre-bundles bindrunes. Add the exclude in `vite.config.ts`:

```ts
optimizeDeps: { exclude: ['bindrunes'] }
```

### Tailwind classes not working

Ensure you're using the Tailwind CSS v4 plugin, not v3:

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
```

Note: `@plugin` is Tailwind v4 syntax. If you're on v3, you'll need to migrate first.

### Theme tokens not applying

Make sure you've imported `global.css` and the theme CSS file:

```css
@import "bindrunes/styles/global.css";
@import "bindrunes/styles/themes/editorial.css"; /* or any theme */
```

### SSR / SvelteKit hydration warnings

bindrunes composables use browser APIs (`window`, `document`, `localStorage`). They guard against SSR with `typeof window === 'undefined'` checks, but if you see hydration mismatches, wrap browser-only usage in `{#if browser}` or `$effect` that runs after mount.

### Missing peer dependencies

If you see warnings about missing packages, install the peer deps:

```bash
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
```

Optional features require additional packages:

```bash
# RichTextEditor
bun add prosemirror-commands prosemirror-history prosemirror-keymap \
       prosemirror-markdown prosemirror-model prosemirror-state prosemirror-view

# RealtimeClient (SSE)
bun add @microsoft/fetch-event-source localforage

# DataChart
bun add chart.js svelte-chartjs
```
