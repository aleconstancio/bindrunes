# bindrunes-kit

SvelteKit meta-framework powered by urupe-ui. Build full-stack or SPA+backend apps with the urupe-ui design system.

## Quick Start

```bash
npx create-bindrunes my-app
cd my-app
bun install
bun run dev
```

## Modes

- **[Full-Stack](full-stack.md)** — SvelteKit with SSR, server load functions, API routes, and hooks
- **[SPA + Backend](spa-backend.md)** — Static SvelteKit frontend with external API backend

## Guides

| Guide | Description |
|-------|-------------|
| [Getting Started](getting-started.md) | Project structure, dev commands, design system setup |
| [Full-Stack Mode](full-stack.md) | SSR, server hooks, load functions, API routes |
| [SPA + Backend Mode](spa-backend.md) | Static frontend with external API |
| [Authentication](auth.md) | Server-side sessions, route protection, CSRF |
| [Internationalization](i18n.md) | Server-side locale detection, client translations |
| [Deployment](deployment.md) | Vercel, Firebase, Node.js, Docker |
| [API Reference](api-reference.md) | Server utility API signatures |

## Server Utilities

```ts
import { createServerAuth, createAuthGuard, createCsrfGuard } from "bindrunes-kit/server";
```

- `createServerAuth` — Cookie-based session management with `handle` hook
- `createAuthGuard` — Route protection middleware (redirects unauthenticated users)
- `createCsrfGuard` — CSRF protection via origin validation
- `createServerI18n` — Server-side locale detection (path, cookie, or header strategies)
- `createServerApiClient` — Typed server API client with auth forwarding
- `combineHooks` — Compose multiple SvelteKit hooks
