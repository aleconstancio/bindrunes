# urupe-ui Platform Vision: Maximum Product Scope

## The Thesis

**urupe-ui becomes the fastest path from zero to production B2B SaaS in the Svelte ecosystem.**

Not a component library. Not a utility layer. A **platform** that generates running applications with auth, billing, AI copilot, multi-tenancy, and a polished UI — all from a single CLI command.

## The Three Layers

```
┌─────────────────────────────────────────────┐
│  Layer 3: Platform (urupe-ui-cloud)         │
│  Plugin registry, marketplace, cloud dashboard│
├─────────────────────────────────────────────┤
│  Layer 2: Framework (bindrunes-kit)          │
│  Client/server utils, CLI, templates, adapters│
├─────────────────────────────────────────────┤
│  Layer 1: Core (urupe-ui)                   │
│  220+ components, 47+ composables, design sys │
└─────────────────────────────────────────────┘
```

## Layer 1: Core Library Enhancements

### 1A. New Components (Priority: HIGH)

| Component | Purpose | Complexity |
|-----------|---------|-----------|
| `DatePicker` | Enhanced date picker with calendar, range, presets | Medium |
| `RichTextEditor` | ProseMirror-based editor (already in Vico, extract to library) | High |
| `FileUpload` | Enhanced drag-and-drop with preview, progress, chunked upload | Medium |
| `CommandPalette` | Global search/command (Cmd+K) — already have Omnibar, enhance it | Low |
| `Notifications` | Notification center with bell icon, dropdown, read/unread | Medium |
| `Analytics` | Chart wrapper (Chart.js integration, already optional dep) | Medium |
| `Kanban` | Drag-and-drop kanban board | High |
| `Calendar` | Full calendar component (month/week/day views) | High |

### 1B. New Composables (Priority: HIGH)

| Composable | Purpose | Complexity |
|-----------|---------|-----------|
| `createClientAuth` | Reactive auth state (user, tenant, loading, isAuthenticated) | High |
| `createApiClient` | Client-side typed API client with CSRF, 401 handling | Medium |
| `createQuery` | Reactive data fetching with cache, stale-time, refetch | High |
| `createMutation` | Reactive mutations with optimistic updates | Medium |
| `createSSEClient` | SSE client with reconnection, gap detection | Medium |
| `createWebSocketClient` | WebSocket client with lifecycle management | Medium |
| `createForm` | Valibot-integrated form state with validation | Medium |
| `createSession` | Session timeout, activity monitoring, auto-refresh | Low |
| `createAutosave` | Debounced save with status tracking | Low |
| `createMultiTenant` | Tenant context, tenant switching, tenant-scoped queries | Medium |

### 1C. SSR Enhancements (Priority: MEDIUM)

- SSR-safe versions of all browser-dependent composables
- `$state.server` awareness in components
- Server-side streaming support
- Hydration-safe defaults for all components

## Layer 2: Framework Expansion

### 2A. Client-Side Infrastructure (Priority: CRITICAL)

**This is the biggest gap.** Vico had to build these from scratch:

#### `createClientAuth` — Reactive Auth State
```ts
import { createClientAuth } from "bindrunes-kit";

const auth = createClientAuth({
  // Profile fetch on bootstrap
  fetchProfile: async () => {
    const res = await fetch("/api/auth/me");
    return res.json();
  },
  // Login handler
  login: async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return res.json(); // { token, user }
  },
  // Logout handler
  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
  },
  // 401 interceptor
  onUnauthorized: () => {
    goto("/login");
  },
});

// Reactive state
auth.user        // Current user (reactive)
auth.tenant      // Current tenant (reactive)
auth.isAuthenticated // boolean (reactive)
auth.loading     // boolean (reactive)
auth.login(email, password) // Async login
auth.logout()    // Async logout
auth.refresh()   // Token refresh
```

#### `createApiClient` — Client-Side Typed API
```ts
import { createApiClient } from "bindrunes-kit";

const api = createApiClient({
  baseUrl: "/api",
  // Auto-attach CSRF token from cookies
  csrf: true,
  // Auto-logout on 401
  onUnauthorized: () => auth.logout(),
  // Domain namespaces
  domains: {
    auth: { login: "/auth/login", logout: "/auth/logout", me: "/auth/me" },
    items: { list: "/items", get: "/items/:id", create: "/items" },
  },
});

// Usage
const items = await api.items.list({ search: "test", page: 1 });
const item = await api.items.get("123");
await api.items.create({ name: "New item" });
await api.upload("/files", formData); // FormData upload
```

#### `createQuery` — Reactive Data Fetching
```ts
import { createQuery } from "bindrunes-kit";

const items = createQuery({
  key: "items",
  fetcher: async () => {
    const res = await fetch("/api/items");
    return res.json();
  },
  staleTime: 30_000, // 30 seconds
  refetchOnWindowFocus: true,
});

// Reactive state
items.data       // Current data (reactive)
items.isLoading  // boolean (reactive)
items.isError    // boolean (reactive)
items.error      // Error | null (reactive)
items.refetch()  // Manual refetch

// In validation
invalidateQuery("items"); // Refetch all queries with "items" key
```

#### `createSSEClient` — Realtime SSE
```ts
import { createSSEClient } from "bindrunes-kit";

const realtime = createSSEClient({
  url: "/api/events",
  // Reconnection
  reconnect: true,
  reconnectDelay: 1000,
  maxReconnectDelay: 30_000,
  // Gap detection
  gapDetection: true,
  lastEventIdStorage: "localStorage",
  // Event handlers
  onMessage: (event) => {
    if (event.type === "item.updated") {
      invalidateQuery("items");
    }
  },
  onConnect: () => console.log("Connected"),
  onDisconnect: () => console.log("Disconnected"),
});

// Reactive state
realtime.status // "connected" | "disconnected" | "reconnecting"
realtime.connect()
realtime.disconnect()
```

### 2B. CLI Improvements (Priority: HIGH)

The CLI should generate **running applications**, not blank canvases:

```bash
npx create-bindrunes my-saas

? Project name: my-saas
? Mode: Full-stack (SSR + API) / SPA + Backend
? Backend: None / Go / Python / External
? Features:
  ✓ Authentication (email + OAuth)
  ✓ Dashboard with sidebar
  ✓ CRUD data management
  ✓ Billing/credits
  ✓ AI Copilot (optional)
  ✓ i18n (English + Portuguese)
? Database: PostgreSQL / Supabase / Turso
? Deployment: Vercel / Firebase / Node / Docker

# Generates a RUNNING application with:
# - Login/register/forgot-password pages
# - Dashboard with sidebar navigation
# - CRUD list/detail pages for a sample entity
# - Billing page with plan display
# - Settings page with profile/security/notifications
# - API routes for all operations
# - Auth middleware
# - Database schema
# - i18n dictionaries
# - Deploy config
```

### 2C. Template System (Priority: HIGH)

Instead of monolithic templates, use **composable feature modules**:

```
templates/
  base/                    # Minimal SvelteKit + urupe-ui
  features/
    auth-email/            # Email/password auth
    auth-oauth/            # Google/GitHub OAuth
    auth-multi-tenant/     # Multi-tenant auth
    crud/                  # CRUD operations
    billing/               # Billing/credits
    copilot/               # AI copilot (WebSocket)
    realtime/              # SSE realtime updates
    i18n/                  # Internationalization
    analytics/             # Charts and metrics
    notifications/         # Notification center
  layouts/
    sidebar/               # Sidebar navigation
    topnav/                # Top navigation
    split/                 # Split panel
  pages/
    dashboard/             # Dashboard home
    settings/              # Settings pages
    auth/                  # Auth pages
    landing/               # Landing page
```

The CLI composes these:
```bash
npx create-bindrunes my-saas --features=auth-email,crud,billing --layout=sidebar
```

### 2D. Deployment Adapters (Priority: MEDIUM)

Add more targets:
- Cloudflare Workers/Pages
- AWS Lambda + API Gateway
- Railway
- Fly.io
- Coolify (self-hosted)
- Docker Compose (full-stack)

### 2E. Form Actions Integration (Priority: MEDIUM)

Bridge `createForm` with SvelteKit form actions:

```ts
// +page.server.ts
import { createFormAction } from "bindrunes-kit/server";

export const actions = {
  create: createFormAction(createItemSchema, async (data, event) => {
    return db.items.create(data);
  }),
  update: createFormAction(updateItemSchema, async (data, event) => {
    return db.items.update(data.id, data);
  }),
};
```

## Layer 3: Platform

### 3A. Plugin System (Priority: MEDIUM)

A plugin registry where developers can share and install feature modules:

```bash
urupe-ui add plugin @bindrunes/plugin-stripe
urupe-ui add plugin @bindrunes/plugin-sendgrid
urupe-ui add plugin @community/plugin-analytics-mixpanel
```

Plugin interface:
```ts
interface BindrunesPlugin {
  name: string;
  version: string;
  // Server hooks
  hooks?: Handle[];
  // Client composables
  composables?: Record<string, () => unknown>;
  // Components
  components?: Record<string, Component>;
  // Templates
  templates?: Template[];
  // Config
  config?: Record<string, unknown>;
}
```

### 3B. Template Marketplace (Priority: MEDIUM)

Community-contributed project templates:

```bash
npx create-bindrunes --template=@community/saas-starter
npx create-bindrunes --template=@community/ecommerce
npx create-bindrunes --template=@community/portfolio
```

### 3C. Component Marketplace (Priority: LOW)

Shareable component packages:
```bash
urupe-ui add component @bindrunes/kanban
urupe-ui add component @community/chart-dashboard
```

### 3D. Cloud Dashboard (Priority: LOW)

A web dashboard for:
- Project management
- Deployment monitoring
- Analytics (usage, errors, performance)
- Team collaboration
- Plugin management
- Template publishing

## Implementation Phases

### Phase 1: Client Infrastructure (v2.1)
**Goal:** Close the gap between "utility library" and "production framework"

1. `createClientAuth` — reactive auth state
2. `createApiClient` — client-side typed API
3. `createQuery` / `createMutation` — data fetching
4. `createSSEClient` — realtime SSE
5. `createForm` — valibot-integrated forms
6. `createSession` — session lifecycle

### Phase 2: CLI & Templates (v2.2)
**Goal:** Generate running applications, not blank canvases

1. Interactive CLI with feature selection
2. Composable feature modules
3. Pre-built page templates (dashboard, auth, CRUD, settings)
4. Database schema generation
5. More deployment adapters

### Phase 3: Advanced Features (v2.3)
**Goal:** Differentiation through unique capabilities

1. Agentic copilot integration (WebSocket + streaming)
2. Multi-tenancy primitives
3. Server-side streaming
4. Form actions integration
5. Optimistic updates / autosave

### Phase 4: Platform (v3.0)
**Goal:** Ecosystem and community

1. Plugin system
2. Template marketplace
3. Component marketplace
4. Cloud dashboard
5. Team features
