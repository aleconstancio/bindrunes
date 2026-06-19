# bindrunes Meta-Framework Design Spec

## Vision

bindrunes evolves from a component library into a **dual-mode meta-framework** for SvelteKit:

- **Full-stack mode**: SvelteKit with SSR, server load, API routes, hooks, form actions. For apps where frontend + backend live in one codebase.
- **SPA + backend mode**: SvelteKit frontend with external API backend (Go, Python, Rust, etc.). For apps like Vico that separate concerns.

Both modes share the same component library, composables, and design system. The difference is server-side integration.

## Architecture

### Package Structure

```
bindrunes/                    # Monorepo root
  packages/
    bindrunes/                # Core library (existing, enhanced)
      src/
        components/           # 220+ UI components
        utils/                # 47+ composables
        styles/               # Design tokens, themes
        i18n/                 # Dictionaries
      package.json            # Main library exports

    bindrunes-kit/            # NEW: SvelteKit meta-framework
      src/
        cli/                  # Project scaffolding CLI
        server/               # Server-side utilities
          auth.ts             # Cookie/session auth for SvelteKit
          api.ts              # Server API client
          hooks.ts            # Shared hook patterns
          i18n.ts             # Server-side i18n detection
          middleware.ts       # Request/response middleware
        adapters/             # Deployment adapters
          firebase.ts         # Firebase Hosting adapter
          vercel.ts           # Vercel adapter
          node.ts             # Node.js adapter
        types/                # SvelteKit-specific types
          load.ts             # PageLoad, LayoutLoad types
          server.ts           # ServerLoad, Action types
      package.json            # exports: bindrunes-kit

    bindrunes-backend/        # NEW: Backend toolkit (optional)
      src/
        go/                   # Go backend templates
        python/               # Python/FastAPI templates
        openapi.ts            # OpenAPI client generator
      package.json
```

### CLI (`create-bindrunes`)

```
npx create-bindrunes my-app
? Mode: (full-stack | spa-backend)
? Backend: (none | go | python | external)
? Database: (none | postgres | supabase | turso)
? Auth: (none | supabase | lucia | custom)
? i18n: (none | yes)
? Deployment: (vercel | firebase | node | docker)
```

**Full-stack mode** generates:
```
my-app/
  src/
    routes/
      +layout.svelte         # Root layout with AppProvider
      +layout.server.ts      # Server hooks, session
      +page.svelte           # Home
      +error.svelte          # Error boundary
      api/                   # API routes (+server.ts)
        auth/
          login/+server.ts
          logout/+server.ts
        items/
          +server.ts
          [id]/+server.ts
    lib/
      server/                # Server-side code
        auth.ts              # Session management
        db.ts                # Database client
        hooks.ts             # Shared hooks
  hooks.server.ts            # SvelteKit hooks
  svelte.config.js           # Full-stack adapter
```

**SPA + backend mode** generates:
```
my-app/
  src/
    routes/
      +layout.svelte         # Root layout with AppProvider
      +layout.ts             # ssr = false
      +page.svelte           # Home
      +error.svelte          # Error boundary
    lib/
      api/                   # Typed API client
        client.ts            # Base client with auth
        auth.ts              # Auth endpoints
        items.ts             # Domain endpoints
      types/                 # Shared types (from OpenAPI)
  svelte.config.js           # Static SPA adapter
```

### Server-Side Utilities (bindrunes-kit)

#### `auth.ts` — Server Session Management
```ts
import { createServerAuth } from "bindrunes-kit/server";

// In hooks.server.ts
export const auth = createServerAuth({
  secret: env.BINDRUNES_AUTH_SECRET,
  cookieName: "session",
  maxAge: 60 * 60 * 24 * 7,
  validate: async (token) => {
    // Validate JWT, fetch user from DB
    return { user, tenantId };
  },
});
```

#### `api.ts` — Server API Client
```ts
import { createServerApiClient } from "bindrunes-kit/server";

export const api = createServerApiClient({
  baseUrl: env.API_BASE_URL,
  auth: true, // Automatically attaches session token
});
```

#### `hooks.ts` — Shared Hook Patterns
```ts
import { combineHooks } from "bindrunes-kit/server";
import { auth } from "./auth";
import { i18n } from "./i18n";

export const handle = combineHooks(auth.handle, i18n.handle);
```

#### `i18n.ts` — Server-Side i18n
```ts
import { createServerI18n } from "bindrunes-kit/server";

export const i18n = createServerI18n({
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
  strategy: "path", // /en/... or /pt-BR/...
});
```

### SPA + Backend Mode Utilities

#### `client.ts` — Typed API Client
```ts
import { createApiClient } from "bindrunes-kit/backend";

export const api = createApiClient({
  baseUrl: "https://api.myapp.com",
  auth: {
    tokenStorage: "cookie", // or "localStorage"
    refreshEndpoint: "/auth/refresh",
  },
});
```

#### `types.ts` — Generated Types
```ts
// Generated from OpenAPI spec
import type { paths, components } from "./api-types";

export type User = components["schemas"]["User"];
export type Item = components["schemas"]["Item"];
```

### SSR-Aware Components

Existing components need SSR guards:

```ts
// Before (client-only)
let theme = $state("light");

// After (SSR-aware)
let theme = $state(typeof window !== "undefined" ? localStorage.getItem("theme") ?? "light" : "light");
```

The `isBrowser` utility already exists. Components that access `window`/`document` need wrapping:

```ts
import { isBrowser } from "bindrunes";

$effect(() => {
  if (!isBrowser) return;
  document.title = title;
});
```

### Data Layer Evolution

#### Full-stack mode:
```ts
// +page.server.ts
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";

export const load: PageServerLoad = async ({ params }) => {
  const item = await db.getItem(params.id);
  return { item };
};

// +page.svelte
let { item } = $props(); // From load function
```

#### SPA + backend mode:
```ts
// +page.ts (universal load)
import type { PageLoad } from "./$types";
import { api } from "$lib/api";

export const load: PageLoad = async ({ params }) => {
  const item = await api.items.get(params.id);
  return { item };
};
```

## Phase 1: Foundation (v2.0-alpha)

### What ships:
1. Monorepo restructure (packages/core, packages/kit)
2. `create-bindrunes` CLI with project templates
3. `bindrunes-kit/server` with auth, hooks, i18n
4. SSR guards on all components
5. Updated examples (showcase → full-stack mode)

### What stays:
- All 220+ components (unchanged)
- All 47+ composables (unchanged)
- All design system tokens (unchanged)
- All themes/aesthetics/densities (unchanged)

## Phase 2: Full-Stack Mode (v2.0-beta)

### What ships:
1. Full-stack project template
2. Server-side auth (cookie sessions)
3. Form action integration with createForm
4. API route patterns
5. Database integration (Prisma/Drizzle adapters)
6. Deployment adapters (Vercel, Firebase, Node)

## Phase 3: SPA + Backend Mode (v2.0)

### What ships:
1. OpenAPI client generator
2. Type-safe API client from spec
3. Backend templates (Go, Python)
4. Auth token management (JWT, refresh)
5. Realtime integration patterns (SSE, WebSocket)

## Phase 4: DX Polish (v2.1)

### What ships:
1. VS Code extension for bindrunes
2. Interactive component playground
3. Storybook integration
4. Migration guide from shadcn-svelte
5. Vico migration as reference implementation
