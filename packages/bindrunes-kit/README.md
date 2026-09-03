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

### Full-Stack
SvelteKit with SSR, server load functions, API routes, and hooks. For apps where frontend + backend live together.

### SPA + Backend
Static SvelteKit frontend with external API backend (Go, Python, Rust, etc.). For apps that separate concerns.

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

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Full-Stack Mode](./docs/full-stack.md)
- [SPA + Backend Mode](./docs/spa-backend.md)
- [Authentication](./docs/auth.md)
- [Internationalization](./docs/i18n.md)
- [Deployment](./docs/deployment.md)
