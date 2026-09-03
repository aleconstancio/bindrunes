# Migration: v2 → v3

## Breaking Changes

### AppProvider → ThemeProvider

```svelte
<!-- v2 -->
<AppProvider themeDefault="editorial" aestheticDefault="minimal" densityDefault="comfortable">
  {@render children()}
</AppProvider>

<!-- v3 -->
<ThemeProvider themeDefault="editorial" densityDefault="comfortable">
  {@render children()}
</ThemeProvider>
```

### useDensity({ responsive }) → useViewport()

```svelte
<!-- v2 -->
<script lang="ts">
  import { useDensity } from "urupe-ui";
  const density = useDensity({ responsive: { default: "comfortable" } });
</script>

<!-- v3 -->
<script lang="ts">
  import { useViewport } from "urupe-ui/responsive";
  const viewport = useViewport();
</script>

{#if viewport.isMobile}
  <MobileLayout />
{:else}
  <DesktopLayout />
{/if}
```

### mode-watcher peer dependency removed

`mode-watcher` is no longer a peer dependency. Use `useTheme().toggleMode()` instead:

```svelte
<script lang="ts">
  import { useTheme } from "urupe-ui";
  const theme = useTheme();
</script>

<button onclick={() => theme.toggleMode()}>Toggle</button>
```

### New SSR utilities

```ts
// Server-side theme resolution (in +page.server.ts)
import { createServerTheme, useThemeServer, useDensityServer } from "urupe-ui/server";

export async function load({ request }) {
  const { theme } = useThemeServer(request);
  const { density } = useDensityServer(request);
  const tokens = createServerTheme(theme, { density });
  return { themeCSS: tokens.toCSS() };
}
```

### New responsive utilities

```svelte
<script lang="ts">
  import { useViewport } from "urupe-ui/responsive";
  const viewport = useViewport();
</script>

<!-- Viewport detection -->
{#if viewport.isMobile} ... {/if}
{#if viewport.above.lg} ... {/if}
```

### Container queries

Add `responsive` prop to components that should adapt to container width:

```svelte
<Card responsive>
  <div class="grid grid-cols-1 @md:grid-cols-2">
    <!-- Adapts to card width, not viewport -->
  </div>
</Card>
```

### Auto density

New `data-density="auto"` mode derives spacing from viewport:

```svelte
<html data-density="auto">
  <!-- compact on mobile, comfortable on tablet, spacious on desktop -->
</html>
```

## What's New

- `urupe-ui/server` — SSR-safe utilities (no runes, no browser APIs)
- `urupe-ui/responsive` — Viewport composable and responsive utilities
- `createServerTheme()` — Pure function for server-side theme resolution
- `useThemeServer()` / `useDensityServer()` — Read preferences from request cookies
- `useViewport()` — Client-side breakpoint detection
- `createRender()` — Helper to render components to HTML via `svelte/server`
- Fluid CSS tokens — `--fluid-space-*`, `--fluid-text-*`
- Auto density — `data-density="auto"` for viewport-derived spacing
- `responsive` prop on Card, MetricCard — container query support