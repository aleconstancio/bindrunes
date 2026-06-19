# bindrunes v2.0 Meta-Framework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve bindrunes from a component library into a dual-mode meta-framework (full-stack + SPA+backend) with CLI scaffolding, server utilities, SSR support, and deployment adapters.

**Architecture:** Turborepo monorepo with 3 packages: `bindrunes` (core library), `bindrunes-kit` (SvelteKit meta-framework), `bindrunes-backend` (backend templates).

**Tech Stack:** Svelte 5 runes, TypeScript, Tailwind CSS v4, SvelteKit, Turborepo, Bun, Vitest.

---

## Phase 1: Monorepo Foundation

### Task 1: Restructure to Turborepo

**Files:**
- Create: `turbo.json`
- Create: `packages/bindrunes/package.json`
- Create: `packages/bindrunes-kit/package.json`
- Create: `packages/bindrunes-kit/src/index.ts`
- Modify: root `package.json`

- [ ] **Step 1:** Read the current root `package.json` to understand existing config.

- [ ] **Step 2:** Create the monorepo structure:
```
packages/
  bindrunes/          # Move existing src/ here
    src/              # Current src/ contents
    package.json      # Current package.json adapted
  bindrunes-kit/      # New SvelteKit meta-framework
    src/
      server/
      cli/
      types/
    package.json
```

- [ ] **Step 3:** Create `turbo.json`:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    },
    "check": {
      "dependsOn": ["build"]
    }
  }
}
```

- [ ] **Step 4:** Update root `package.json`:
```json
{
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "check": "turbo run check"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

- [ ] **Step 5:** Move existing `src/` to `packages/bindrunes/src/` and update the package.json paths.

- [ ] **Step 6:** Run `bun install` and verify the workspace resolves.

- [ ] **Step 7:** Commit:
```bash
git add -A
git commit -m "chore: restructure to Turborepo monorepo"
```

---

### Task 2: Create bindrunes-kit Package

**Files:**
- Create: `packages/bindrunes-kit/package.json`
- Create: `packages/bindrunes-kit/src/index.ts`
- Create: `packages/bindrunes-kit/src/server/index.ts`
- Create: `packages/bindrunes-kit/svelte.config.js`
- Create: `packages/bindrunes-kit/tsconfig.json`

- [ ] **Step 1:** Create `packages/bindrunes-kit/package.json`:
```json
{
  "name": "bindrunes-kit",
  "version": "2.0.0",
  "description": "SvelteKit meta-framework powered by bindrunes",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./server": "./src/server/index.ts",
    "./types": "./src/types/index.ts"
  },
  "dependencies": {
    "bindrunes": "workspace:*",
    "@sveltejs/kit": "^2.0.0",
    "svelte": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2:** Create the server utilities barrel export.

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/
git commit -m "feat: create bindrunes-kit package scaffold"
```

---

## Phase 2: Server Utilities

### Task 3: Auth Server Utilities

**Files:**
- Create: `packages/bindrunes-kit/src/server/auth.ts`

- [ ] **Step 1:** Create server-side auth utilities:

```ts
import type { Handle, RequestEvent } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

interface SessionData {
  user: { id: string; email: string; name?: string; roles?: string[] };
  expiresAt: number;
}

interface.createServerAuthOptions {
  secret: string;
  cookieName?: string;
  maxAge?: number;
  validate: (token: string) => Promise<SessionData | null>;
}

export function createServerAuth(options: createStoreAuthOptions) {
  const { secret, cookieName = "bindrunes-session", maxAge = 60 * 60 * 24 * 7, validate } = options;

  async function getSession(event: RequestEvent): Promise<SessionData | null> {
    const token = event.cookies.get(cookieName);
    if (!token) return null;
    try {
      return await validate(token);
    } catch {
      return null;
    }
  }

  async function setSession(event: RequestEvent, data: SessionData) {
    event.cookies.set(cookieName, JSON.stringify(data), {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge,
    });
  }

  async function deleteSession(event: RequestEvent) {
    event.cookies.delete(cookieName, { path: "/" });
  }

  const handle: Handle = async ({ event, resolve }) => {
    event.locals.session = await getSession(event);
    return resolve(event);
  };

  return { getSession, setSession, deleteSession, handle };
}

// Type augmentation for SvelteKit locals
declare global {
  namespace App {
    interface Locals {
      session: SessionData | null;
    }
  }
}
```

- [ ] **Step 2:** Commit:
```bash
git add packages/bindrunes-kit/src/server/auth.ts
git commit -m "feat: add server-side auth utilities"
```

---

### Task 4: Hooks Utilities

**Files:**
- Create: `packages/bindrunes-kit/src/server/hooks.ts`

- [ ] **Step 1:** Create hook composition utilities:

```ts
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

/**
 * Combine multiple SvelteKit hooks into one.
 */
export function combineHooks(...hooks: Handle[]): Handle {
  return sequence(...hooks);
}

/**
 * Create a redirect handler for unauthenticated routes.
 */
export function createAuthGuard(requireAuth = true): Handle {
  return async ({ event, resolve }) => {
    const session = event.locals.session;
    const isAuthRoute = event.url.pathname.startsWith("/login") ||
                        event.url.pathname.startsWith("/register") ||
                        event.url.pathname.startsWith("/forgot-password");

    if (requireAuth && !session && !isAuthRoute) {
      return new Response(null, {
        status: 302,
        headers: { Location: `/login?redirect=${event.url.pathname}` },
      });
    }

    if (session && isAuthRoute) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/app" },
      });
    }

    return resolve(event);
  };
}

/**
 * Create a CSRF protection hook.
 */
export function createCsrfGuard(allowedOrigins: string[]): Handle {
  return async ({ event, resolve }) => {
    if (event.request.method === "GET") return resolve(event);

    const origin = event.request.headers.get("origin");
    if (origin && !allowedOrigins.includes(origin)) {
      return new Response("CSRF validation failed", { status: 403 });
    }

    return resolve(event);
  };
}
```

- [ ] **Step 2:** Commit:
```bash
git add packages/bindrunes-kit/src/server/hooks.ts
git commit -m "feat: add hook composition utilities"
```

---

### Task 5: Server i18n

**Files:**
- Create: `packages/bindrunes-kit/src/server/i18n.ts`

- [ ] **Step 1:** Create server-side i18n detection:

```ts
import type { Handle, RequestEvent } from "@sveltejs/kit";

interface.createServerI18nOptions {
  locales: string[];
  defaultLocale: string;
  strategy?: "path" | "cookie" | "header";
}

export function createServerI18n(options: createStoreI18nOptions) {
  const { locales, defaultLocale, strategy = "path" } = options;

  function detectLocale(event: RequestEvent): string {
    if (strategy === "path") {
      const match = event.url.pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
      return match && locales.includes(match[1]) ? match[1] : defaultLocale;
    }

    if (strategy === "cookie") {
      const cookie = event.cookies.get("locale");
      return cookie && locales.includes(cookie) ? cookie : defaultLocale;
    }

    const acceptLanguage = event.request.headers.get("accept-language");
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(",")[0]?.split("-")[0];
      if (preferred && locales.includes(preferred)) return preferred;
    }

    return defaultLocale;
  }

  const handle: Handle = async ({ event, resolve }) => {
    event.locals.locale = detectLocale(event);
    return resolve(event);
  };

  return { detectLocale, handle };
}
```

- [ ] **Step 2:** Commit:
```bash
git add packages/bindrunes-kit/src/server/i18n.ts
git commit -m "feat: add server-side i18n detection"
```

---

### Task 6: Server API Client

**Files:**
- Create: `packages/bindrunes-kit/src/server/api.ts`

- [ ] **Step 1:** Create server-side API client:

```ts
import type { RequestEvent } from "@sveltejs/kit";

interface ServerApiClientOptions {
  baseUrl: string;
  auth?: boolean;
  headers?: Record<string, string>;
}

export function createServerApiClient(options: ServerApiClientOptions) {
  const { baseUrl, auth = false, headers = {} } = options;

  async function request<T>(
    path: string,
    options: RequestInit = {},
    event?: RequestEvent,
  ): Promise<T> {
    const requestHeaders: Record<string, string> = { ...headers };

    if (auth && event?.locals.session) {
      requestHeaders["Authorization"] = `Bearer ${event.locals.session.user.id}`;
    }

    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: { ...requestHeaders, ...Object.fromEntries(Object.entries(options.headers || {})) },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  return {
    get: <T>(path: string, event?: RequestEvent) => request<T>(path, {}, event),
    post: <T>(path: string, body: unknown, event?: RequestEvent) =>
      request<T>(path, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }, event),
    put: <T>(path: string, body: unknown, event?: RequestEvent) =>
      request<T>(path, { method: "PUT", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }, event),
    delete: <T>(path: string, event?: RequestEvent) =>
      request<T>(path, { method: "DELETE" }, event),
  };
}
```

- [ ] **Step 2:** Commit:
```bash
git add packages/bindrunes-kit/src/server/api.ts
git commit -m "feat: add server-side API client"
```

---

## Phase 3: CLI Scaffolding

### Task 7: Create CLI Package

**Files:**
- Create: `packages/bindrunes-kit/src/cli/index.ts`
- Create: `packages/bindrunes-kit/src/cli/prompts.ts`
- Create: `packages/bindrunes-kit/src/cli/scaffold.ts`
- Create: `packages/bindrunes-kit/templates/` (template directories)

- [ ] **Step 1:** Create the CLI entry point:

```ts
#!/usr/bin/env node
import { parseArgs } from "node:util";
import { promptProjectConfig } from "./prompts";
import { scaffoldProject } from "./scaffold";

async function main() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      name: { type: "string", short: "n" },
      mode: { type: "string", short: "m" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) {
    console.log(`
bindrunes — Create a new SvelteKit project

Usage:
  npx create-bindrunes [project-name] [options]

Options:
  -n, --name    Project name
  -m, --mode    full-stack | spa-backend
  -h, --help    Show help
    `);
    return;
  }

  const config = await promptProjectConfig(values.name, values.mode);
  await scaffoldProject(config);
  console.log(`\n✅ Created ${config.name}!`);
  console.log(`   cd ${config.name} && bun run dev`);
}

main().catch(console.error);
```

- [ ] **Step 2:** Create the prompt system:

```ts
import input from "@inquirer/input";
import select from "@inquirer/select";

export interface ProjectConfig {
  name: string;
  mode: "full-stack" | "spa-backend";
  backend: "none" | "go" | "python" | "external";
  database: "none" | "postgres" | "supabase" | "turso";
  auth: "none" | "supabase" | "lucia" | "custom";
  i18n: boolean;
  deployment: "vercel" | "firebase" | "node" | "docker";
}

export async function promptProjectConfig(
  name?: string,
  mode?: string,
): Promise<ProjectConfig> {
  return {
    name: name ?? await input({ message: "Project name:" }),
    mode: (mode as ProjectConfig["mode"]) ?? await select({
      message: "Project mode:",
      choices: [
        { value: "full-stack", name: "Full-stack (SvelteKit + server)" },
        { value: "spa-backend", name: "SPA + external backend" },
      ],
    }),
    backend: await select({
      message: "Backend:",
      choices: [
        { value: "none", name: "None (frontend only)" },
        { value: "go", name: "Go template" },
        { value: "python", name: "Python/FastAPI template" },
        { value: "external", name: "External (already have one)" },
      ],
    }),
    database: await select({
      message: "Database:",
      choices: [
        { value: "none", name: "None" },
        { value: "postgres", name: "PostgreSQL" },
        { value: "supabase", name: "Supabase" },
        { value: "turso", name: "Turso (SQLite)" },
      ],
    }),
    auth: await select({
      message: "Auth:",
      choices: [
        { value: "none", name: "None" },
        { value: "supabase", name: "Supabase Auth" },
        { value: "lucia", name: "Lucia" },
        { value: "custom", name: "Custom" },
      ],
    }),
    i18n: await select({
      message: "Internationalization?",
      choices: [
        { value: true, name: "Yes" },
        { value: false, name: "No" },
      ],
    }),
    deployment: await select({
      message: "Deployment target:",
      choices: [
        { value: "vercel", name: "Vercel" },
        { value: "firebase", name: "Firebase Hosting" },
        { value: "node", name: "Node.js server" },
        { value: "docker", name: "Docker" },
      ],
    }),
  };
}
```

- [ ] **Step 3:** Create the scaffolding function:

```ts
import { mkdir, writeFile, cp } from "node:fs/promises";
import { join } from "node:path";
import type { ProjectConfig } from "./prompts";

export async function scaffoldProject(config: ProjectConfig) {
  const targetDir = join(process.cwd(), config.name);

  // Create directory structure
  await mkdir(join(targetDir, "src/routes"), { recursive: true });
  await mkdir(join(targetDir, "src/lib"), { recursive: true });

  // Write template files based on config
  await writeFile(join(targetDir, "package.json"), generatePackageJson(config));
  await writeFile(join(targetDir, "svelte.config.js"), generateSvelteConfig(config));
  await writeFile(join(targetDir, "src/routes/+layout.svelte"), generateRootLayout(config));
  await writeFile(join(targetDir, "src/routes/+page.svelte"), generateHomePage(config));
  await writeFile(join(targetDir, "src/app.html"), generateAppHtml(config));
  await writeFile(join(targetDir, "src/app.css"), generateAppCss(config));

  if (config.mode === "full-stack") {
    await writeFile(join(targetDir, "src/hooks.server.ts"), generateHooks(config));
    await writeFile(join(targetDir, "src/routes/+layout.server.ts"), generateLayoutServer(config));
  }

  if (config.auth !== "none") {
    await mkdir(join(targetDir, "src/routes/login"), { recursive: true });
    await writeFile(join(targetDir, "src/routes/login/+page.svelte"), generateLoginPage(config));
  }

  console.log(`Scaffolded ${config.name} with ${config.mode} mode`);
}

function generatePackageJson(config: ProjectConfig): string {
  return JSON.stringify({
    name: config.name,
    private: true,
    scripts: {
      dev: "vite dev",
      build: "vite build",
      preview: "vite preview",
    },
    dependencies: {
      bindrunes: "^2.0.0",
      "bindrunes-kit": "^2.0.0",
      svelte: "^5.0.0",
      "@sveltejs/kit": "^2.0.0",
      "@sveltejs/adapter-auto": "^3.0.0",
      vite: "^6.0.0",
    },
    devDependencies: {
      "@sveltejs/vite-plugin-svelte": "^4.0.0",
      tailwindcss: "^4.0.0",
      "@tailwindcss/vite": "^4.0.0",
    },
  }, null, 2);
}

function generateSvelteConfig(config: ProjectConfig): string {
  const adapter = config.deployment === "vercel"
    ? "@sveltejs/adapter-vercel"
    : config.deployment === "firebase"
      ? "@sveltejs/adapter-static"
      : "@sveltejs/adapter-node";

  return `import adapter from "${adapter}";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(${config.deployment === "firebase" ? "{ fallback: 'index.html' }" : ""}),
  },
};

export default config;
```

- [ ] **Step 4:** Add CLI bin to package.json:

In `packages/bindrunes-kit/package.json`, add:
```json
{
  "bin": {
    "create-bindrunes": "./src/cli/index.ts"
  }
}
```

- [ ] **Step 5:** Commit:
```bash
git add packages/bindrunes-kit/src/cli/
git commit -m "feat: create CLI scaffolding tool"
```

---

## Phase 4: SSR Support

### Task 8: SSR Guards on Components

**Files:**
- Modify: Multiple component files in `packages/bindrunes/src/components/`

- [ ] **Step 1:** Identify components that access `window`/`document` without SSR guards.

Search for patterns like `document.`, `window.`, `localStorage`, `sessionStorage` in component files.

- [ ] **Step 2:** Add `isBrowser` guards to each:

```ts
import { isBrowser } from "../utils/isBrowser";

$effect(() => {
  if (!isBrowser) return;
  // ... existing code that accesses browser APIs
});
```

- [ ] **Step 3:** Focus on the most critical components first:
- `AppProvider.svelte` (ModeWatcher access)
- `ThemeToggle.svelte` (localStorage)
- `createDarkMode.svelte.ts` (matchMedia)
- `createMediaQuery.svelte.ts` (matchMedia)

- [ ] **Step 4:** Commit:
```bash
git add packages/bindrunes/src/
git commit -m "feat: add SSR guards to browser-dependent components"
```

---

### Task 9: SSR-Aware AppProvider

**Files:**
- Modify: `packages/bindrunes/src/components/AppProvider.svelte`

- [ ] **Step 1:** Read the current AppProvider.

- [ ] **Step 2:** Wrap ModeWatcher and browser-dependent logic in `isBrowser` checks.

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes/src/components/AppProvider.svelte
git commit -m "feat: make AppProvider SSR-safe"
```

---

## Phase 5: Full-Stack Template

### Task 10: Full-Stack Project Template

**Files:**
- Create: `packages/bindrunes-kit/templates/full-stack/` (template directory)

- [ ] **Step 1:** Create the full-stack template files:

```
templates/full-stack/
  src/
    routes/
      +layout.svelte
      +layout.server.ts
      +page.svelte
      +error.svelte
      api/
        auth/
          login/+server.ts
          logout/+server.ts
        items/
          +server.ts
          [id]/+server.ts
    lib/
      server/
        auth.ts
        db.ts
      components/
      types/
  hooks.server.ts
  svelte.config.js
  vite.config.ts
  tailwind.config.ts
  package.json
  tsconfig.json
  .env.example
```

- [ ] **Step 2:** Write the template files with placeholder content.

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/templates/full-stack/
git commit -m "feat: add full-stack project template"
```

---

### Task 11: SPA + Backend Template

**Files:**
- Create: `packages/bindrunes-kit/templates/spa-backend/`

- [ ] **Step 1:** Create the SPA template files:

```
templates/spa-backend/
  src/
    routes/
      +layout.svelte
      +layout.ts
      +page.svelte
      +error.svelte
      app/
        +layout.svelte
        +layout.ts
        +page.svelte
    lib/
      api/
        client.ts
        auth.ts
      components/
      types/
  svelte.config.js
  vite.config.ts
  tailwind.config.ts
  package.json
  tsconfig.json
  .env.example
```

- [ ] **Step 2:** Write the template files.

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/templates/spa-backend/
git commit -m "feat: add SPA + backend project template"
```

---

## Phase 6: Deployment Adapters

### Task 12: Firebase Adapter

**Files:**
- Create: `packages/bindrunes-kit/src/adapters/firebase.ts`

- [ ] **Step 1:** Create Firebase Hosting adapter configuration helper.

- [ ] **Step 2:** Commit:
```bash
git add packages/bindrunes-kit/src/adapters/firebase.ts
git commit -m "feat: add Firebase Hosting adapter"
```

---

### Task 13: Vercel Adapter

**Files:**
- Create: `packages/bindrunes-kit/src/adapters/vercel.ts`

- [ ] **Step 1:** Create Vercel adapter configuration helper.

- [ ] **Step 2:** Commit:
```bash
git add packages/bindrunes-kit/src/adapters/vercel.ts
git commit -m "feat: add Vercel adapter"
```

---

### Task 14: Node Adapter

**Files:**
- Create: `packages/bindrunes-kit/src/adapters/node.ts`

- [ ] **Step 1:** Create Node.js server adapter configuration helper.

- [ ] **Step 2:** Commit:
```bash
git add packages/bindrunes-kit/src/adapters/node.ts
git commit -m "feat: add Node.js adapter"
```

---

## Phase 7: Documentation

### Task 15: Meta-Framework Documentation

**Files:**
- Create: `packages/bindrunes-kit/README.md`
- Create: `packages/bindrunes-kit/docs/`
- Modify: root `docs/`

- [ ] **Step 1:** Create `packages/bindrunes-kit/README.md` with:
- Quick start guide
- Mode comparison (full-stack vs SPA)
- Architecture overview
- Link to detailed docs

- [ ] **Step 2:** Create docs:
- `docs/getting-started.md` — Installation and setup
- `docs/full-stack.md` — Full-stack mode guide
- `docs/spa-backend.md` — SPA + backend mode guide
- `docs/auth.md` — Authentication guide
- `docs/i18n.md` — Internationalization guide
- `docs/api-routes.md` — API routes guide
- `docs/forms.md` — Form actions guide
- `docs/deployment.md` — Deployment guide
- `docs/migration.md` — Migration from shadcn-svelte

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/README.md packages/bindrunes-kit/docs/
git commit -m "docs: add meta-framework documentation"
```

---

## Phase 8: Examples & Verification

### Task 16: Update Showcase to Full-Stack Mode

**Files:**
- Modify: `examples/showcase/`

- [ ] **Step 1:** Convert the showcase app to use bindrunes-kit server utilities.

- [ ] **Step 2:** Add hooks.server.ts with auth.

- [ ] **Step 3:** Commit:
```bash
git add examples/showcase/
git commit -m "feat: update showcase to use bindrunes-kit"
```

---

### Task 17: Create Vico Migration Example

**Files:**
- Create: `examples/vico-migration/`

- [ ] **Step 1:** Create a reference migration showing how Vico would adopt bindrunes-kit.

- [ ] **Step 2:** Commit:
```bash
git add examples/vico-migration/
git commit -m "feat: add Vico migration reference example"
```

---

### Task 18: Final Verification

- [ ] **Step 1:** Run `turbo run build` to verify all packages build.
- [ ] **Step 2:** Run `turbo run test` to verify all tests pass.
- [ ] **Step 3:** Run `turbo run lint` to verify lint passes.
- [ ] **Step 4:** Test CLI: `npx create-bindrunes test-app`
- [ ] **Step 5:** Final commit if any fixes needed.
