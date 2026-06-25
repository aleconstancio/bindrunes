# bindrunes v3.0 Phase 1 — Server-First Foundation (Revised)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make bindrunes components SSR-first by design. Provide server-side utilities for theme/density resolution from request context. Leverage SvelteKit's native SSR patterns (load functions, streaming, per-route `ssr` option). Add progressive hydration via `<svelte:boundary>` and SvelteKit's `csr` option.

**Architecture:** This is NOT React Server Components. Svelte 5 components are universal — they render on both server and client. "Server-first" means:
1. Components are SSR-safe by default (no browser APIs in script setup)
2. Server utilities resolve theme/density from request cookies/headers
3. SvelteKit load functions handle data fetching on the server
4. Progressive hydration uses SvelteKit's native patterns (`ssr`, `csr`, `<svelte:boundary>`)
5. `bindrunes/server` exports pure utility functions safe for any server context

**Tech Stack:** Svelte 5 (runes, `render()` from `svelte/server`, `<svelte:boundary>`), SvelteKit (load functions, streaming, per-route options), Tailwind v4 (container queries via `@` prefix), CSS container queries.

---

## Key Differences from Original Plan

| Original (Wrong) | Revised (Correct) |
|-------------------|-------------------|
| `<script lang="server">` | Doesn't exist in Svelte — use universal components |
| Custom hydration system | Use SvelteKit's native `ssr`/`csr` options + `<svelte:boundary>` |
| Server component variants | SSR-safe universal components (same component works server + client) |
| Custom IntersectionObserver hydration | SvelteKit's built-in hydration + `export const csr = false` |
| `createHydrationMarker()` | Not needed — SvelteKit handles hydration markers |

---

## File Map

### Files to Create (~8)
| File | Purpose |
|------|---------|
| `src/server/index.ts` | Server export barrel |
| `src/utils/createServerTheme.ts` | Server-side theme resolver (no runes, pure functions) |
| `src/utils/useThemeServer.ts` | SSR-safe theme from request cookies/headers |
| `src/utils/useDensityServer.ts` | SSR-safe density from request cookies/headers |
| `src/utils/useViewport.ts` | Client-side viewport composable (replaces responsive density) |
| `src/styles/responsive.css` | Fluid tokens + container query utilities |
| `src/utils/hydrate.ts` | Thin wrapper around SvelteKit's hydration patterns |
| `src/utils/createRender.ts` | Helper to render components to HTML via `svelte/server` |

### Files to Modify (~4)
| File | Change |
|------|--------|
| `packages/bindrunes/package.json` | Add `./server` and `./responsive` export paths |
| `src/styles/global.css` | Import responsive.css |
| `.agents/AGENTS.md` | Add server-first conventions |

---

## Task 1: Create Server Export Path + Barrel

**Files:**
- Create: `src/server/index.ts`
- Modify: `packages/bindrunes/package.json`

- [ ] **Step 1: Create server barrel**

```ts
// src/server/index.ts
// Server-safe utilities — no Svelte runes, no browser APIs
// Works in SvelteKit +page.server.ts, +layout.server.ts, hooks, and any Node.js context

export { createServerTheme } from "../utils/createServerTheme.ts";
export { useThemeServer } from "../utils/useThemeServer.ts";
export { useDensityServer } from "../utils/useDensityServer.ts";
export { createRender } from "../utils/createRender.ts";
```

- [ ] **Step 2: Add export path to package.json**

Edit `packages/bindrunes/package.json` — add to `"exports"`:

```json
"./server": {
  "types": "./dist/server/index.d.ts",
  "default": "./dist/server/index.js"
},
"./responsive": {
  "types": "./dist/utils/useViewport.d.ts",
  "svelte": "./dist/utils/useViewport.js",
  "default": "./dist/utils/useViewport.js"
}
```

- [ ] **Step 3: Verify build**

```bash
cd packages/bindrunes && bun run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(v3): add bindrunes/server and bindrunes/responsive export paths"
```

---

## Task 2: Implement createServerTheme

**Files:**
- Create: `src/utils/createServerTheme.ts`
- Create: `src/utils/createServerTheme.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/utils/createServerTheme.test.ts
import { describe, it, expect } from "vitest";
import { createServerTheme } from "./createServerTheme";

describe("createServerTheme", () => {
  it("resolves theme tokens for a given theme name", () => {
    const theme = createServerTheme("editorial");
    expect(theme.tokens["--primary"]).toBeDefined();
    expect(theme.tokens["--background"]).toBeDefined();
  });

  it("returns CSS string for SSR embedding", () => {
    const theme = createServerTheme("dracula");
    const css = theme.toCSS();
    expect(css).toContain('[data-theme="dracula"]');
    expect(css).toContain("--primary:");
  });

  it("applies density multiplier", () => {
    const compact = createServerTheme("editorial", { density: "compact" });
    const spacious = createServerTheme("editorial", { density: "spacious" });
    expect(compact.tokens["--space-4"]).toBe("0.8rem");
    expect(spacious.tokens["--space-4"]).toBe("1.25rem");
  });

  it("merges custom overrides", () => {
    const theme = createServerTheme("editorial", {
      overrides: { "--primary": "oklch(0.5 0.2 260)" },
    });
    expect(theme.tokens["--primary"]).toBe("oklch(0.5 0.2 260)");
  });

  it("defaults to editorial when unknown theme name", () => {
    const theme = createServerTheme("nonexistent");
    expect(theme.tokens["--primary"]).toBe("oklch(0.65 0.10 265)");
  });
});
```

- [ ] **Step 2: Run test — verify FAIL**

```bash
cd packages/bindrunes && bun run test src/utils/createServerTheme.test.ts
```

- [ ] **Step 3: Implement createServerTheme**

```ts
// src/utils/createServerTheme.ts
// Pure function — no Svelte runes, no browser APIs
// Safe for SvelteKit +page.server.ts, +layout.server.ts, hooks, edge functions

const THEMES: Record<string, Record<string, string>> = {
  editorial: {
    "--primary": "oklch(0.65 0.10 265)", "--accent": "oklch(0.62 0.13 285)",
    "--destructive": "oklch(0.62 0.22 25)", "--background": "oklch(0.13 0.01 270)",
    "--foreground": "oklch(0.96 0.005 270)", "--card-solid": "oklch(0.17 0.008 270)",
    "--border": "oklch(1 0 0 / 0.08)", "--ring": "oklch(0.65 0.10 265)",
  },
  dracula: {
    "--primary": "oklch(0.75 0.21 310)", "--accent": "oklch(0.72 0.30 340)",
    "--destructive": "oklch(0.65 0.24 30)", "--background": "oklch(0.05 0.01 290)",
    "--foreground": "oklch(0.95 0.01 290)", "--card-solid": "oklch(0.1 0.015 290)",
    "--border": "oklch(1 0 0 / 0.08)", "--ring": "oklch(0.75 0.21 310)",
  },
  nord: {
    "--primary": "oklch(0.78 0.10 230)", "--accent": "oklch(0.74 0.08 210)",
    "--destructive": "oklch(0.62 0.22 25)", "--background": "oklch(0.18 0.01 250)",
    "--foreground": "oklch(0.93 0.01 250)", "--card-solid": "oklch(0.22 0.012 250)",
    "--border": "oklch(1 0 0 / 0.08)", "--ring": "oklch(0.78 0.10 230)",
  },
  catppuccin: {
    "--primary": "oklch(0.80 0.14 280)", "--accent": "oklch(0.78 0.18 300)",
    "--destructive": "oklch(0.65 0.20 20)", "--background": "oklch(0.16 0.01 290)",
    "--foreground": "oklch(0.92 0.02 290)", "--card-solid": "oklch(0.2 0.015 290)",
    "--border": "oklch(1 0 0 / 0.08)", "--ring": "oklch(0.8 0.14 280)",
  },
  "rose-pine": {
    "--primary": "oklch(0.72 0.12 15)", "--accent": "oklch(0.70 0.10 350)",
    "--destructive": "oklch(0.62 0.22 25)", "--background": "oklch(0.15 0.01 30)",
    "--foreground": "oklch(0.92 0.008 30)", "--card-solid": "oklch(0.19 0.01 30)",
    "--border": "oklch(1 0 0 / 0.08)", "--ring": "oklch(0.72 0.12 15)",
  },
  github: {
    "--primary": "oklch(0.65 0.18 250)", "--accent": "oklch(0.60 0.14 240)",
    "--destructive": "oklch(0.65 0.22 25)", "--background": "oklch(0.20 0.01 250)",
    "--foreground": "oklch(0.97 0.005 250)", "--card-solid": "oklch(0.24 0.012 250)",
    "--border": "oklch(1 0 0 / 0.1)", "--ring": "oklch(0.65 0.18 250)",
  },
};

const DENSITY: Record<string, Record<string, string>> = {
  compact:    { "--space-1": "0.2rem",   "--space-2": "0.4rem",   "--space-3": "0.6rem",   "--space-4": "0.8rem",   "--space-6": "1.2rem",   "--space-8": "1.6rem" },
  comfortable:{ "--space-1": "0.25rem",  "--space-2": "0.5rem",   "--space-3": "0.75rem",  "--space-4": "1rem",     "--space-6": "1.5rem",   "--space-8": "2rem" },
  spacious:   { "--space-1": "0.3125rem","--space-2": "0.625rem", "--space-3": "0.9375rem","--space-4": "1.25rem",  "--space-6": "1.875rem", "--space-8": "2.5rem" },
};

type Options = {
  density?: "compact" | "comfortable" | "spacious";
  overrides?: Record<string, string>;
};

export function createServerTheme(name: string, options: Options = {}) {
  const base = THEMES[name] ?? THEMES.editorial;
  const density = DENSITY[options.density ?? "comfortable"];
  const tokens = { ...density, ...base, ...options.overrides };

  function toCSS(selector?: string): string {
    const sel = selector ?? `[data-theme="${name}"]`;
    const body = Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`).join("\n");
    return `${sel} {\n${body}\n}`;
  }

  return { tokens, toCSS };
}
```

- [ ] **Step 4: Run tests — verify PASS**

```bash
cd packages/bindrunes && bun run test src/utils/createServerTheme.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(v3): add createServerTheme for SSR theme resolution"
```

---

## Task 3: Implement useThemeServer + useDensityServer

**Files:**
- Create: `src/utils/useThemeServer.ts`
- Create: `src/utils/useDensityServer.ts`

- [ ] **Step 1: Create useThemeServer**

```ts
// src/utils/useThemeServer.ts
// Reads theme preference from request cookies — no runes, pure function
// Use in SvelteKit +page.server.ts or +layout.server.ts load functions

type Result = { theme: string; isDark: boolean };

function parseCookies(header: string): Record<string, string> {
  return Object.fromEntries(
    header.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    }),
  );
}

export function useThemeServer(request?: Request, opts?: { default?: string }): Result {
  const fallback = opts?.default ?? "editorial";
  if (!request) return { theme: fallback, isDark: true };

  const cookies = parseCookies(request.headers.get("cookie") ?? "");
  return {
    theme: cookies["theme"] ?? fallback,
    isDark: (cookies["color-scheme"] ?? "dark") === "dark",
  };
}
```

- [ ] **Step 2: Create useDensityServer**

```ts
// src/utils/useDensityServer.ts
// Reads density preference from request cookies — no runes, pure function

type Density = "compact" | "comfortable" | "spacious";
type Result = { density: Density };

function parseCookies(header: string): Record<string, string> {
  return Object.fromEntries(
    header.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    }),
  );
}

export function useDensityServer(
  request?: Request,
  opts?: { default?: Density },
): Result {
  const fallback = opts?.default ?? "comfortable";
  if (!request) return { density: fallback };

  const cookies = parseCookies(request.headers.get("cookie") ?? "");
  return { density: (cookies["density"] as Density) ?? fallback };
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(v3): add useThemeServer and useDensityServer for SSR"
```

---

## Task 4: Implement useViewport (Client-Side Responsive)

**Files:**
- Create: `src/utils/useViewport.ts`

- [ ] **Step 1: Create useViewport**

```ts
// src/utils/useViewport.ts
// Client-side viewport composable — uses matchMedia for breakpoint detection
// This is the JS layer for responsive behavior (CSS handles the rest)

import { browser } from "./isBrowser";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const BREAKPOINTS: Record<Breakpoint, string> = {
  xs: "(max-width: 639px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export function useViewport() {
  if (!browser) {
    return {
      get current(): Breakpoint { return "lg"; },
      get above() {
        return { xs: true, sm: true, md: true, lg: true, xl: false, "2xl": false };
      },
      get below() {
        return { xs: false, sm: false, md: false, lg: false, xl: true, "2xl": true };
      },
      get isMobile() { return false; },
      get isTablet() { return false; },
      get isDesktop() { return true; },
    };
  }

  let current = $state<Breakpoint>("lg");

  $effect(() => {
    const mql = Object.entries(BREAKPOINTS).map(([bp, query]) => ({
      bp: bp as Breakpoint,
      mql: window.matchMedia(query),
    }));

    function update() {
      for (const { bp, mql } of mql) {
        if (mql.matches) { current = bp; break; }
      }
    }

    update();
    for (const { mql } of mql) mql.addEventListener("change", update);
    return () => { for (const { mql } of mql) mql.removeEventListener("change", update); };
  });

  const order: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const idx = order.indexOf(current);

  return {
    get current() { return current; },
    get above() {
      return Object.fromEntries(order.map((bp) => [bp, order.indexOf(bp) <= idx])) as Record<Breakpoint, boolean>;
    },
    get below() {
      return Object.fromEntries(order.map((bp) => [bp, order.indexOf(bp) > idx])) as Record<Breakpoint, boolean>;
    },
    get isMobile() { return idx <= 1; },
    get isTablet() { return idx === 2; },
    get isDesktop() { return idx >= 3; },
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(v3): add useViewport composable for responsive breakpoints"
```

---

## Task 5: Implement createRender (SSR Helper)

**Files:**
- Create: `src/utils/createRender.ts`

- [ ] **Step 1: Create createRender**

```ts
// src/utils/createRender.ts
// Helper to render Svelte components to HTML using svelte/server's render()
// Use in SvelteKit hooks, API routes, or any server context

import { render } from "svelte/server";
import type { Component } from "svelte";

export function createRender<T extends Record<string, unknown>>(
  component: Component<T>,
) {
  return function renderToString(props: T): string {
    const result = render(component, { props });
    return result.body;
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(v3): add createRender SSR helper wrapping svelte/server"
```

---

## Task 6: Add Responsive CSS System

**Files:**
- Create: `src/styles/responsive.css`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create responsive.css**

```css
/* src/styles/responsive.css */
/* Fluid tokens + container query utilities */
/* Works with Tailwind v4's @ prefix for container queries */

:root {
  /* Fluid spacing — adapts to viewport width */
  --fluid-space-4: clamp(0.75rem, 1.5vw, 1rem);
  --fluid-space-6: clamp(1rem, 2vw, 1.5rem);
  --fluid-space-8: clamp(1.5rem, 3vw, 2rem);
  --fluid-space-10: clamp(2rem, 4vw, 3rem);
  --fluid-space-12: clamp(2.5rem, 5vw, 4rem);

  /* Fluid typography */
  --fluid-text-xs: clamp(0.6875rem, 0.8vw, 0.75rem);
  --fluid-text-sm: clamp(0.8125rem, 1vw, 0.875rem);
  --fluid-text-base: clamp(0.875rem, 1.2vw, 1rem);
  --fluid-text-lg: clamp(1rem, 1.5vw, 1.125rem);
  --fluid-text-xl: clamp(1.125rem, 2vw, 1.25rem);

  /* Container query breakpoints */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}

/* Auto density — derives from viewport */
@media (max-width: 639px) {
  [data-density="auto"] { --space-1: 0.2rem; --space-2: 0.4rem; --space-3: 0.6rem; --space-4: 0.8rem; --space-6: 1.2rem; --space-8: 1.6rem; }
}
@media (min-width: 640px) and (max-width: 1023px) {
  [data-density="auto"] { --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem; }
}
@media (min-width: 1024px) {
  [data-density="auto"] { --space-1: 0.3125rem; --space-2: 0.625rem; --space-3: 0.9375rem; --space-4: 1.25rem; --space-6: 1.875rem; --space-8: 2.5rem; }
}

/* Container query helpers */
.container-queries { container-type: inline-size; }
```

- [ ] **Step 2: Import in global.css**

Add to `src/styles/global.css`:

```css
@import "./responsive.css";
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(v3): add responsive CSS system (fluid tokens, auto density, container queries)"
```

---

## Task 7: Add Auto Density to useDensity

**Files:**
- Modify: `src/utils/useDensity.svelte.ts`

- [ ] **Step 1: Add "auto" option to useDensity**

Edit `src/utils/useDensity.svelte.ts` — add `auto` as a valid density value that delegates to the CSS `data-density="auto"` attribute:

```ts
// Add "auto" to the DENSITY array
const DENSITIES = ["auto", "compact", "comfortable", "spacious"] as const;
export type Density = (typeof DENSITIES)[number];
```

When `auto` is set, apply `data-density="auto"` to the HTML element and let the CSS media queries in `responsive.css` handle the spacing.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat(v3): add auto density mode to useDensity"
```

---

## Task 8: Update AGENTS.md

**Files:**
- Modify: `.agents/AGENTS.md`

- [ ] **Step 1: Add server-first conventions**

Add to the Laws section:

```markdown
- **Server-first:** Components must be SSR-safe — no browser APIs (`window`, `document`, `localStorage`) in top-level script setup. Use `browser` guard from `src/utils/isBrowser.ts` for client-only code.
- **Server utilities:** `useThemeServer()` and `useDensityServer()` are pure functions — no runes, works in any server context (SvelteKit load functions, hooks, edge functions).
- **Progressive hydration:** Use SvelteKit's native patterns: `export const ssr = false` for client-only pages, `<svelte:boundary>` for selective hydration, `export const csr = false` for server-only pages.
- **Responsive:** CSS container queries (Tailwind v4 `@` prefix) for layout adaptation. `useViewport()` for JS breakpoint detection. `data-density="auto"` for viewport-derived density.
- **Server barrel:** Import from `bindrunes/server` for SSR-safe utilities.
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "docs(v3): add server-first conventions to AGENTS.md"
```

---

## Task 9: Final Validation

- [ ] **Step 1: Run full validation**

```bash
cd packages/bindrunes && bun run validate
```

- [ ] **Step 2: Run build**

```bash
cd packages/bindrunes && bun run build
```

- [ ] **Step 3: Verify server exports exist in dist**

```bash
ls packages/bindrunes/dist/server/
```
Expected: `index.js`, `index.d.ts`

- [ ] **Step 4: Run all tests**

```bash
cd packages/bindrunes && bun run test
```

- [ ] **Step 5: Commit if fixups needed**

```bash
git add -A && git commit -m "chore(v3): final validation fixups"
```
