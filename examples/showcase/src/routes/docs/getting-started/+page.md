# Getting Started

## Install

```bash
bun add urupe-ui svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
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
@plugin "urupe-ui/tailwind";
@import "urupe-ui/styles/global.css";
```

Exclude `urupe-ui` from Vite pre-bundling in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ['urupe-ui'] },
});
```

---

## First Component

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "urupe-ui";
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
  import { Button, Card } from "urupe-ui";
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
| `urupe-ui` | Primitives, composables, utilities, types | `import { Button, useTheme } from "urupe-ui"` |
| `urupe-ui/layouts` | Layouts + templates | `import { PageShell, DashboardShell } from "urupe-ui/layouts"` |
| `urupe-ui/domains/<name>` | Single domain components | `import { LoginForm } from "urupe-ui/domains/auth"` |
| `urupe-ui/agentic` | LLM agent tools | `import { createAgentLoop } from "urupe-ui/agentic"` |
| `urupe-ui/tailwind` | Tailwind CSS plugin | `@plugin "urupe-ui/tailwind"` |
| `urupe-ui/styles/*` | Global CSS + token sheets | `@import "urupe-ui/styles/global.css"` |
| `urupe-ui/i18n/*` | Translation dictionaries | `import en from "urupe-ui/i18n/en"` |

---

## Troubleshooting

**Multiple Svelte instances** — Add `optimizeDeps: { exclude: ['urupe-ui'] }` to `vite.config.ts`.

**Tailwind classes not applying** — Verify `@plugin "urupe-ui/tailwind"` is in your entry CSS.

**SSR hydration warnings** — Wrap browser-only APIs in `$effect` or check `typeof window !== 'undefined'`.
