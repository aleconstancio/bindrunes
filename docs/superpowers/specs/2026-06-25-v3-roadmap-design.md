# bindrunes v3.0 — Server-First Foundation + Responsive Hybrid (Revised)

## Overview

v3.0 makes bindrunes SSR-first by design. Components are universal (render on both server and client), with server utilities for theme/density resolution from request context. Leverages SvelteKit's native SSR patterns — not custom hydration.

**Key insight:** Svelte 5 doesn't have React-style server components. Components are universal — they render on both server and client. "Server-first" means designing components that are SSR-safe by default.

---

## Roadmap

| Version | Focus | Status |
|---------|-------|--------|
| **v3.0** | Server-first + Responsive hybrid | This spec |
| **v3.1** | Advanced mobile (gestures, swipe, haptic) | Future |
| **v3.2** | Motion & animation (scroll-linked, view transitions) | Future |

---

## 1. Server Architecture

### How Svelte 5 SSR Actually Works

- **Components are universal** — same component renders on server and client
- **`render()` from `svelte/server`** — renders components to HTML strings
- **SvelteKit load functions** — `+page.server.ts` / `+layout.server.ts` fetch data on the server
- **Streaming** — return promises from load functions for progressive rendering
- **Hydration** — SvelteKit automatically hydrates page components on the client
- **Per-route control** — `export const ssr = false` to disable SSR for specific routes

### Export Path

`bindrunes/server` — Pure utility functions safe for any server context (no Svelte runes, no browser APIs).

### Server Utilities

```ts
// bindrunes/server — works in +page.server.ts, hooks, edge functions
import { createServerTheme, useThemeServer, useDensityServer } from "bindrunes/server";

// In +page.server.ts:
export async function load({ request }) {
  const { theme, isDark } = useThemeServer(request);
  const { density } = useDensityServer(request);
  const tokens = createServerTheme(theme, { density });
  return { tokens: tokens.toCSS() };
}
```

### SSR-Safe Components

Components are SSR-safe by default — no browser APIs in top-level script setup. Use `browser` guard for client-only code:

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

---

## 2. Progressive Hydration

Uses SvelteKit's native patterns — no custom hydration system:

| Pattern | Use Case |
|---------|----------|
| `export const ssr = false` | Client-only pages (dashboards, admin panels) |
| `export const csr = false` | Server-only pages (landing pages, blogs) |
| `<svelte:boundary>` | Selective client hydration within a page |
| Default (SSR + hydration) | Most pages — server-rendered, then hydrated |

### Example: Landing Page (Server-Only)

```ts
// +page.server.ts
export const csr = false; // No client JS needed

export async function load() {
  return { pricing: await getPricing() };
}
```

```svelte
<!-- +page.svelte — renders to pure HTML, no client JS -->
<script lang="ts">
  let { data } = $props();
</script>

<PricingTable plans={data.pricing} />
<TestimonialGrid />
```

### Example: Dashboard (Client-Only)

```ts
// +page.ts
export const ssr = false; // Client-only SPA
```

### Example: Mixed Page (Selective Hydration)

```svelte
<!-- Server-rendered content + interactive island -->
<script lang="ts">
  let { data } = $props();
</script>

<!-- Server-rendered: pure HTML -->
<article>{@html data.post.content}</article>

<!-- Client-hydrated: interactive -->
<svelte:boundary>
  <CommentSection postId={data.post.id} />
  {#snippet pending()}
    <Skeleton lines={5} />
  {/snippet}
</svelte:boundary>
```

---

## 3. Responsive Hybrid

### CSS Layer (Zero JS)

Tailwind v4 container queries via `@` prefix + fluid tokens:

```svelte
<!-- Fluid spacing that adapts to viewport -->
<div class="p-[var(--fluid-space-4)] @md:p-[var(--fluid-space-6)]">

<!-- Grid that adapts to container width -->
<div class="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
```

### Auto Density

New `data-density="auto"` mode — CSS media queries derive density from viewport:

- `< 640px` → compact spacing
- `640-1024px` → comfortable spacing
- `> 1024px` → spacious spacing

### JS Layer (Opt-in)

`useViewport()` composable for JS breakpoint detection:

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

---

## 4. Breaking Changes

| v2 API | v3 Change | Migration |
|--------|-----------|-----------|
| `AppProvider` | Rename to `ThemeProvider` | Clearer purpose |
| `useDensity({ responsive })` | Use `useViewport()` + `data-density="auto"` | JS responsive separated from density |
| Peer dep `mode-watcher` | Remove | Absorbed into `useTheme().toggleMode()` |
| Peer dep `lucide-svelte` | Optional | Icons ship as inline SVG |

---

## 5. Implementation Order

1. Create `bindrunes/server` export path and barrel
2. Implement `createServerTheme()` — pure function, no runes
3. Implement `useThemeServer()` + `useDensityServer()` — request cookie readers
4. Implement `createRender()` — wrapper around `svelte/server` render()
5. Implement `useViewport()` — client-side breakpoint composable
6. Add responsive CSS system — fluid tokens, auto density, container queries
7. Add `auto` density mode to `useDensity`
8. Update AGENTS.md with server-first conventions
9. Final validation — build, test, verify exports
