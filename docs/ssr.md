# Server-Side Rendering (SSR)

bindrunes components are SSR-safe by default. They render on both server and client without breaking.

## How It Works

Svelte 5 components are **universal** — the same component renders on the server (to HTML) and on the client (to DOM). bindrunes follows this pattern:

- Components use Svelte 5 runes (`$state`, `$derived`, `$effect`)
- No browser APIs (`window`, `document`) at the top level
- Client-only code uses `browser` guard from `bindrunes`

```svelte
<script lang="ts">
  import { browser } from "bindrunes";

  // This runs on server (returns undefined) and client (returns real value)
  let element = $state<HTMLElement | undefined>(undefined);

  $effect(() => {
    if (!browser) return; // Skip on server
    // Client-only code here
  });
</script>
```

## SvelteKit Integration

### Server Load Functions

Use `bindrunes/server` utilities in `+page.server.ts` or `+layout.server.ts`:

```ts
// src/routes/+layout.server.ts
import { createServerTheme, useThemeServer, useDensityServer } from "bindrunes/server";

export async function load({ request }) {
  const { theme, isDark } = useThemeServer(request);
  const { density } = useDensityServer(request);
  const tokens = createServerTheme(theme, { density });

  return {
    themeCSS: tokens.toCSS(),
    theme,
    density,
    isDark,
  };
}
```

### Layout with Server Theme

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { ThemeProvider } from "bindrunes";
  let { data, children } = $props();
</script>

<svelte:head>
  {@html `<style>${data.themeCSS}</style>`}
</svelte:head>

<ThemeProvider themeDefault={data.theme} densityDefault={data.density}>
  {@render children()}
</ThemeProvider>
```

### Page Components

All bindrunes components work in SvelteKit pages:

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Card, Badge, MetricCard } from "bindrunes";
  let { data } = $props();
</script>

<div class="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
  {#each data.metrics as metric}
    <Card responsive>
      <MetricCard
        label={metric.label}
        value={metric.value}
        detail={metric.detail}
        variant={metric.variant}
        responsive
      />
    </Card>
  {/each}
</div>
```

## Progressive Hydration

Use SvelteKit's native patterns to control hydration:

### Server-Only Pages (No Client JS)

```ts
// src/routes/blog/[slug]/+page.server.ts
export const csr = false; // No client-side JavaScript

export async function load({ params }) {
  return {
    post: await getPost(params.slug),
  };
}
```

### Client-Only Pages (No SSR)

```ts
// src/routes/dashboard/+page.ts
export const ssr = false; // Client-only SPA
```

### Selective Hydration

Use `<svelte:boundary>` to hydrate specific sections:

```svelte
<script lang="ts">
  let { data } = $props();
</script>

<!-- Server-rendered: pure HTML, no client JS -->
<article>{@html data.post.content}</article>

<!-- Client-hydrated: interactive comment section -->
<svelte:boundary>
  <CommentSection postId={data.post.id} />
  {#snippet pending()}
    <Skeleton lines={5} />
  {/snippet}
</svelte:boundary>
```

## Responsive Components

### Container Queries

Add `responsive` prop to components that should adapt to their container width:

```svelte
<Card responsive>
  <!-- Card now uses container queries instead of viewport queries -->
  <div class="grid grid-cols-1 @md:grid-cols-2">
    <div>Column 1</div>
    <div>Column 2</div>
  </div>
</Card>
```

### Auto Density

Use `data-density="auto"` for viewport-derived spacing:

```svelte
<html data-density="auto">
  <!-- Spacing adapts: compact on mobile, comfortable on tablet, spacious on desktop -->
</html>
```

### Viewport Detection

Use `useViewport()` for JS breakpoint detection:

```svelte
<script lang="ts">
  import { useViewport } from "bindrunes/responsive";
  const viewport = useViewport();
</script>

{#if viewport.isMobile}
  <MobileNav />
{:else}
  <DesktopNav />
{/if}
```

## SSR Token Resolution

Resolve theme tokens on the server for inline styles or CSS injection:

```ts
// In +page.server.ts
import { createServerTheme } from "bindrunes/server";

export async function load({ request }) {
  const theme = createServerTheme("dracula", { density: "comfortable" });

  return {
    // Inject as inline style or <style> tag
    css: theme.toCSS('[data-theme="dracula"]'),
    // Or use individual tokens
    primary: theme.tokens["--primary"],
  };
}
```
