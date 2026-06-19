# Getting Started

## Installation

```bash
npx create-bindrunes my-app
```

## Project Structure

```
my-app/
  src/
    routes/          # File-based routing
    lib/             # Shared code
    app.css          # Global styles (Tailwind + bindrunes)
    app.html         # HTML template
  svelte.config.js   # SvelteKit config
  vite.config.ts     # Vite config
  tsconfig.json      # TypeScript config
```

## Development

```bash
bun run dev     # Start dev server
bun run build   # Build for production
bun run preview # Preview production build
```

## Design System

bindrunes-kit includes the full bindrunes design system. The generated `app.css` imports Tailwind with the bindrunes plugin:

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

Use components in your Svelte files:

```svelte
<script lang="ts">
  import { Button, Card, Input, PageSection } from "bindrunes";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <Card>
    <Input placeholder="Enter text..." />
    <Button>Submit</Button>
  </Card>
</PageSection>
```

See [bindrunes documentation](https://github.com/bindrunes/bindrunes) for all available components.

## Layout

The generated layout wraps your app with `AppProvider`:

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";

  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```
