# Bindrunes Kit — API Reference

Comprehensive reference for every export in `bindrunes-kit`.

---

## Server API

### `createServerAuth(options)`

Cookie-based session management for SvelteKit server routes.

```ts
import { createServerAuth } from 'bindrunes-kit/server';

const auth = createServerAuth({
  validate: async (token) => {
    // Verify JWT, look up user, etc.
    return { user: { id: '1', email: 'a@b.com' }, expiresAt: Date.now() + 86400000 };
  },
});

export const handle = combineHooks(auth.handle, otherHooks);
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cookieName` | `string` | `"urupe-ui-session"` | Name of the session cookie |
| `maxAge` | `number` | `604800` (7 days) | Cookie max age in seconds |
| `validate` | `(token: string) => Promise<SessionData \| null>` | **required** | Validates a raw cookie token and returns session data |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `getSession(event)` | `(event: RequestEvent) => Promise<SessionData \| null>` | Read session from cookie |
| `setSession(event, data)` | `(event: RequestEvent, data: SessionData) => void` | Set session cookie |
| `deleteSession(event)` | `(event: RequestEvent) => void` | Delete session cookie |
| `handle` | `Handle` | SvelteKit handle hook — sets `event.locals.session` |

#### `SessionData` type

```ts
interface SessionData {
  user: { id: string; email: string; name?: string; roles?: string[] };
  expiresAt: number;
}
```

> **Note:** Installing `createServerAuth` augments `App.Locals` with `session: SessionData | null`.

---

### `createServerApiClient(options)`

Typed HTTP client for calling external APIs from server-side code.

```ts
import { createServerApiClient } from 'bindrunes-kit/server';

const api = createServerApiClient({
  baseUrl: 'https://api.example.com',
  auth: true,
});

// In a +page.server.ts load function:
export const load = async ({ locals }) => {
  const user = await api.get<User>('/me', locals.session ? { locals } : undefined);
  return { user };
};
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `baseUrl` | `string` | **required** | Base URL prepended to all paths |
| `auth` | `boolean` | `false` | When `true`, attaches `Authorization` header from `event.locals.session` |
| `headers` | `Record<string, string>` | `{}` | Default headers for all requests |
| `onError` | `(error: Error) => void` | — | Called on any request error |

#### Returns

| Method | Signature | Description |
|--------|-----------|-------------|
| `get<T>(path, event?)` | `(path: string, event?: RequestEvent) => Promise<T>` | GET request |
| `post<T>(path, body?, event?)` | `(path: string, body?: unknown, event?: RequestEvent) => Promise<T>` | POST request |
| `put<T>(path, body?, event?)` | `(path: string, body?: unknown, event?: RequestEvent) => Promise<T>` | PUT request |
| `patch<T>(path, body?, event?)` | `(path: string, body?: unknown, event?: RequestEvent) => Promise<T>` | PATCH request |
| `delete<T>(path, event?)` | `(path: string, event?: RequestEvent) => Promise<T>` | DELETE request |

All methods automatically set `Content-Type: application/json` when a body is provided.

---

### `combineHooks(...hooks)`

Compose multiple SvelteKit `Handle` hooks into a single hook using `sequence`.

```ts
import { combineHooks } from 'bindrunes-kit/server';
import { createServerAuth } from 'bindrunes-kit/server';
import { createAuthGuard, createCsrfGuard } from 'bindrunes-kit/server';

const auth = createServerAuth({ validate: myValidator });

export const handle = combineHooks(
  auth.handle,
  createAuthGuard({ loginPath: '/login' }),
  createCsrfGuard(['https://example.com']),
);
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `...hooks` | `Handle[]` | SvelteKit handle hooks to compose |

#### Returns

`Handle` — a single handle that runs all hooks in sequence.

---

### `createAuthGuard(options?)`

Route protection hook — redirects unauthenticated users to login, and authenticated users away from auth routes.

```ts
import { createAuthGuard } from 'bindrunes-kit/server';

export const handle = combineHooks(auth.handle, createAuthGuard());
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `requireAuth` | `boolean` | `true` | When `true`, unauthenticated users are redirected |
| `loginPath` | `string` | `"/login"` | Redirect path for unauthenticated users (preserves query string) |
| `appPath` | `string` | `"/app"` | Redirect path for authenticated users on auth routes |

Protected routes are those under `loginPath`, `/register`, and `/forgot-password`.

#### Returns

`Handle` — a SvelteKit handle hook.

---

### `createCsrfGuard(allowedOrigins)`

CSRF protection hook — validates the `Origin` header on non-GET requests.

```ts
import { createCsrfGuard } from 'bindrunes-kit/server';

export const handle = combineHooks(
  auth.handle,
  createCsrfGuard(['https://example.com', 'https://app.example.com']),
);
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `allowedOrigins` | `string[]` | List of allowed origins. Non-GET requests with an `Origin` not in this list receive a 403. |

#### Returns

`Handle` — a SvelteKit handle hook. GET requests pass through unchanged.

---

### `createLocaleRedirect(defaultLocale?)`

Redirects bare paths (e.g. `/dashboard`) to the default locale path (e.g. `/en/dashboard`). Skips API routes and static files.

```ts
import { createLocaleRedirect } from 'bindrunes-kit/server';

export const handle = combineHooks(
  createLocaleRedirect('en'),
  i18n.handle,
);
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `defaultLocale` | `string` | `"en"` | Default locale to redirect to |

#### Returns

`Handle` — a SvelteKit handle hook.

---

### `createServerI18n(options)`

Server-side locale detection and path locale parsing.

```ts
import { createServerI18n } from 'bindrunes-kit/server';

const i18n = createServerI18n({
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en',
  strategy: 'path',
});

export const handle = combineHooks(i18n.handle);
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `locales` | `string[]` | **required** | Supported locale codes |
| `defaultLocale` | `string` | **required** | Fallback locale |
| `strategy` | `"path" \| "cookie" \| "header"` | `"path"` | Detection strategy: URL path prefix, cookie, or `Accept-Language` header |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `detectLocale(event)` | `(event: RequestEvent) => string` | Detect the current locale |
| `getPathLocale(pathname)` | `(pathname: string) => string \| null` | Extract locale from URL path, or `null` |
| `handle` | `Handle` | SvelteKit handle hook — sets `event.locals.locale` and `event.locals.pathLocale` |

> **Note:** Installing `createServerI18n` augments `App.Locals` with `locale: string` and `pathLocale: string | null`.

---

## Client API

### `createClientAuth(options?)`

Reactive authentication state for Svelte 5 components.

```svelte
<script>
  import { createClientAuth } from 'bindrunes-kit/client';

  const auth = createClientAuth({
    fetchProfile: async () => {
      const res = await fetch('/api/me');
      return res.ok ? res.json() : null;
    },
    login: async (email, password) => {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return res.json();
    },
    logout: async () => { await fetch('/api/logout', { method: 'POST' }); },
  });
</script>

{#if auth.loading}
  <Spinner />
{:else if auth.isAuthenticated}
  <Dashboard user={auth.user} />
{:else}
  <LoginForm onsubmit={(e) => auth.login(e.email, e.password)} />
{/if}
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fetchProfile` | `() => Promise<User \| null>` | — | Called on mount to restore session |
| `login` | `(email: string, password: string) => Promise<{ token?: string; user?: User }>` | — | Login function |
| `logout` | `() => Promise<void>` | — | Logout function |
| `refresh` | `() => Promise<{ token?: string }>` | — | Token refresh function |
| `onUnauthorized` | `() => void` | — | Called when refresh fails |
| `onLogin` | `(user: User) => void` | — | Called after successful login/bootstrap |
| `onLogout` | `() => void` | — | Called after logout |
| `tokenStorage` | `"cookie" \| "localStorage"` | `"cookie"` | Where to persist the auth token |
| `tokenKey` | `string` | `"urupe-ui-session"` | Cookie/localStorage key name |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current user (reactive) |
| `tenant` | `Tenant \| null` | Current tenant (reactive) |
| `isAuthenticated` | `boolean` | Derived — `true` when `user !== null` |
| `loading` | `boolean` | `true` while bootstrap/login is in progress |
| `error` | `string \| null` | Last error message |
| `token` | `string \| null` | Current auth token |
| `login(email, password)` | `() => Promise<{ token?: string; user?: User }>` | Login |
| `logout()` | `() => Promise<void>` | Logout |
| `refresh()` | `() => Promise<void>` | Refresh token |
| `setUser(user)` | `(user: User \| null) => void` | Manually set user |
| `setTenant(tenant)` | `(tenant: Tenant \| null) => void` | Manually set tenant |
| `setToken(token)` | `(token: string) => void` | Manually set token |
| `clearToken()` | `() => void` | Clear stored token |

#### `User` type

```ts
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
}
```

#### `Tenant` type

```ts
interface Tenant {
  id: string;
  name?: string;
}
```

---

### `createAutosave(options)`

Debounced autosave composable for forms. Watches a reactive data source and saves after a debounce period.

```svelte
<script>
  import { createAutosave } from 'bindrunes-kit/client';

  let content = $state('');

  const autosave = createAutosave({
    data: () => content,
    save: async (data) => {
      await fetch('/api/documents', {
        method: 'PATCH',
        body: JSON.stringify({ content: data }),
      });
    },
    delay: 500,
  });
</script>

<textarea bind:value={content}></textarea>

{#if autosave.isSaving}
  <span>Saving...</span>
{:else if autosave.isSaved}
  <span>Saved {autosave.lastSaved.toLocaleTimeString()}</span>
{:else if autosave.isDirty}
  <span>Unsaved changes</span>
{/if}
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `() => T` | **required** | Returns the current data snapshot |
| `save` | `(data: T) => Promise<void>` | **required** | Persist function |
| `delay` | `number` | `1000` | Debounce delay in milliseconds |
| `onError` | `(error: Error) => void` | — | Called on save failure |
| `onSave` | `(data: T) => void` | — | Called after successful save |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `status` | `AutosaveStatus` | `"idle" \| "dirty" \| "saving" \| "saved" \| "error"` |
| `isDirty` | `boolean` | Derived — `true` when unsaved changes exist |
| `isSaving` | `boolean` | Derived — `true` while saving |
| `isSaved` | `boolean` | Derived — `true` after last save succeeded |
| `lastSaved` | `Date \| null` | Timestamp of last successful save |
| `error` | `Error \| null` | Last save error |
| `forceSave()` | `() => Promise<void>` | Bypass debounce, save immediately |
| `destroy()` | `() => void` | Cancel pending timer |

---

### `createSession(options?)`

Session timeout tracking with activity detection and warning callbacks.

```svelte
<script>
  import { createSession } from 'bindrunes-kit/client';

  const session = createSession({
    timeout: 30 * 60 * 1000,
    warningBefore: 5 * 60 * 1000,
    onTimeout: () => { goto('/login'); },
    onWarning: () => { showWarningDialog(); },
  });

  $effect(() => { session.startTracking(); return () => session.destroy(); });
</script>

{#if session.showWarning}
  <p>Your session will expire in 5 minutes. Click here to extend.</p>
{/if}
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `timeout` | `number` | `1800000` (30 min) | Session timeout in ms |
| `warningBefore` | `number` | `300000` (5 min) | Warning period before timeout (ms) |
| `onTimeout` | `() => void` | — | Called when session expires |
| `onWarning` | `() => void` | — | Called when warning threshold is reached |
| `onActivity` | `() => void` | — | Called on any tracked user activity |
| `autoRefresh` | `boolean` | `false` | Automatically refresh session on interval |
| `refreshInterval` | `number` | `900000` (15 min) | Auto-refresh interval in ms |
| `refreshFn` | `() => Promise<void>` | — | Function called to refresh the session |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `lastActivity` | `number` | Timestamp of last detected activity |
| `isExpired` | `boolean` | `true` after timeout |
| `showWarning` | `boolean` | `true` during warning period |
| `startTracking()` | `() => void` | Begin listening for activity events |
| `stopTracking()` | `() => void` | Stop listening |
| `reset()` | `() => void` | Reset timers and warning state |
| `destroy()` | `() => void` | Alias for `stopTracking()` |

Tracked events: `mousedown`, `keydown`, `touchstart`, `scroll`.

---

### `createSSEClient(options)`

Server-Sent Events client with automatic reconnection and gap detection.

```svelte
<script>
  import { createSSEClient } from 'bindrunes-kit/client';

  const sse = createSSEClient({
    url: '/api/events',
    gapDetection: true,
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      handleEvent(data);
    },
  });

  $effect(() => { sse.connect(); return () => sse.destroy(); });
</script>

<span>Status: {sse.status}</span>
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `url` | `string` | **required** | SSE endpoint URL |
| `headers` | `Record<string, string>` | `{}` | Custom request headers |
| `reconnect` | `boolean` | `true` | Auto-reconnect on disconnect |
| `reconnectDelay` | `number` | `1000` | Initial reconnect delay (ms) |
| `maxReconnectDelay` | `number` | `30000` | Max reconnect delay (exponential backoff cap) |
| `maxRetries` | `number` | `10` | Maximum reconnection attempts |
| `gapDetection` | `boolean` | `false` | Send `Last-Event-ID` header and `?lastEventId` query param |
| `lastEventIdStorage` | `"localStorage" \| "sessionStorage" \| "none"` | `"localStorage"` | Where to persist last event ID |
| `onMessage` | `(event: MessageEvent) => void` | — | Called on each SSE message |
| `onConnect` | `() => void` | — | Called when connection opens |
| `onDisconnect` | `() => void` | — | Called when connection closes |
| `onError` | `(error: Event) => void` | — | Called on error |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `status` | `SSEStatus` | `"connecting" \| "connected" \| "disconnected" \| "reconnecting"` |
| `isConnected` | `boolean` | Derived — `true` when connected |
| `lastEventId` | `string \| null` | Last received event ID |
| `retryCount` | `number` | Current reconnection attempt count |
| `connect()` | `() => void` | Establish connection |
| `disconnect()` | `() => void` | Close connection |
| `destroy()` | `() => void` | Alias for `disconnect()` |

---

### `createWebSocketSession(options)`

WebSocket client with automatic reconnection and message queuing.

```svelte
<script>
  import { createWebSocketSession } from 'bindrunes-kit/client';

  const ws = createWebSocketSession({
    url: 'ws://localhost:5173/api/ws',
    onMessage: (data) => { messages = [...messages, data]; },
  });

  function send(msg) { ws.send({ type: 'chat', text: msg }); }

  $effect(() => { ws.connect(); return () => ws.destroy(); });
</script>

<button onclick={() => send(input)}>Send</button>
<span>Status: {ws.status}</span>
```

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `url` | `string` | **required** | WebSocket endpoint URL |
| `protocols` | `string \| string[]` | — | WebSocket sub-protocols |
| `reconnect` | `boolean` | `true` | Auto-reconnect on close |
| `reconnectDelay` | `number` | `1000` | Initial reconnect delay (ms) |
| `maxReconnectDelay` | `number` | `30000` | Max reconnect delay (exponential backoff cap) |
| `maxRetries` | `number` | `10` | Maximum reconnection attempts |
| `onMessage` | `(data: unknown) => void` | — | Called on each message (auto-parsed from JSON) |
| `onOpen` | `() => void` | — | Called when connection opens |
| `onClose` | `() => void` | — | Called when connection closes |
| `onError` | `(error: Event) => void` | — | Called on error |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `status` | `WebSocketStatus` | `"connecting" \| "connected" \| "disconnected" \| "reconnecting"` |
| `isConnected` | `boolean` | Derived — `true` when connected |
| `retryCount` | `number` | Current reconnection attempt count |
| `connect()` | `() => void` | Establish connection |
| `disconnect()` | `() => void` | Close connection and clear message queue |
| `send(data)` | `(data: unknown) => void` | Send data (JSON-serialized). Queued if not connected. |
| `destroy()` | `() => void` | Alias for `disconnect()` |

---

## CLI

The `bindrunes-kit` CLI scaffolds new projects from templates.

```bash
npx bindrunes-kit create
```

### Modes

| Mode | Description |
|------|-------------|
| `full-stack` | SvelteKit with SSR, server routes, database, and auth |
| `spa-backend` | SPA frontend with a separate backend API server |

### Features

Select one or more features during project creation:

| Feature | Description |
|---------|-------------|
| `auth` | Login, signup, session management |
| `crud` | Database models, API routes, forms |
| `billing` | Stripe integration, pricing pages |
| `realtime` | WebSocket subscriptions, live data |
| `i18n` | Multi-language support, locale routing |

### Deployment Targets

| Target | Adapter |
|--------|---------|
| `vercel` | `@sveltejs/adapter-vercel` |
| `firebase` | `@sveltejs/adapter-firebase` |
| `node` | `@sveltejs/adapter-node` |
| `docker` | `@sveltejs/adapter-node` + Dockerfile |

### `ProjectConfig` type

```ts
interface ProjectConfig {
  name: string;
  mode: 'full-stack' | 'spa-backend';
  features: ('auth' | 'crud' | 'billing' | 'realtime' | 'i18n')[];
  deployment: 'vercel' | 'firebase' | 'node' | 'docker';
}
```

---

## Type Augmentations

### `App.Locals`

The server auth and i18n hooks augment SvelteKit's `App.Locals`:

```ts
declare global {
  namespace App {
    interface Locals {
      session: SessionData | null;  // from createServerAuth
      locale: string;               // from createServerI18n
      pathLocale: string | null;    // from createServerI18n
    }
  }
}
```
