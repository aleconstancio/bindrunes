# Getting Started

## Install

```bash
bun add bindrunes svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
```

### Optional dependencies

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

## Tailwind Setup

Add to `app.css`:

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

Exclude `bindrunes` from Vite pre-bundling in `vite.config.ts`:

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

## First Component

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

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { Button, Card } from "bindrunes";
</script>

<Card variant="surface">
  <h2 class="text-lg font-semibold">Welcome</h2>
  <p class="text-muted-foreground">Your app is running.</p>
  <Button variant="primary" class="mt-4">Get Started</Button>
</Card>
```

---

## Import Paths

| Path | Contents | Example |
|---|---|---|
| `bindrunes` | Primitives, composables, utilities, types | `import { Button, useTheme } from "bindrunes"` |
| `bindrunes/layouts` | Layouts + templates | `import { PageShell, DashboardShell } from "bindrunes/layouts"` |
| `bindrunes/domains/<name>` | Single domain components | `import { LoginForm } from "bindrunes/domains/auth"` |
| `bindrunes/agentic` | LLM agent tools | `import { createAgentLoop } from "bindrunes/agentic"` |
| `bindrunes/tailwind` | Tailwind CSS plugin | `@plugin "bindrunes/tailwind"` |
| `bindrunes/styles/*` | Global CSS + token sheets | `@import "bindrunes/styles/global.css"` |
| `bindrunes/i18n/*` | Translation dictionaries | `import en from "bindrunes/i18n/en"` |

---

## Troubleshooting

**Multiple Svelte instances** — Add `optimizeDeps: { exclude: ['bindrunes'] }` to `vite.config.ts`.

**Tailwind classes not applying** — Verify `@plugin "bindrunes/tailwind"` is in your entry CSS.

**SSR hydration warnings** — Wrap browser-only APIs in `$effect` or check `typeof window !== 'undefined'`.
