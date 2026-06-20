# Framework Elevation Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate bindrunes from "great library" to "THE framework for Svelte" by fixing critical gaps, adding production composables, building marketing assets, and establishing community infrastructure.

**Architecture:** Four phases: (1) fix critical foundation issues, (2) add production composables, (3) build marketing/adoption assets, (4) community infrastructure.

---

## Phase 1: Fix Critical Foundation

### Task 1: Fix Broken Test Pipeline

**Files:**
- Modify: root `package.json`

- [ ] **Step 1:** Read root `package.json`.

- [ ] **Step 2:** Add `packageManager` field:
```json
"packageManager": "bun@1.3.0"
```

- [ ] **Step 3:** Verify turbo works:
```bash
cd /home/ale/Projects/bindrunes && bun run test 2>&1 | tail -10
```

- [ ] **Step 4:** Commit:
```bash
git add package.json
git commit -m "fix: add packageManager field to fix turbo workspace resolution"
```

---

### Task 2: Add Kit Test Infrastructure

**Files:**
- Create: `packages/bindrunes-kit/vitest.config.ts`
- Create: `packages/bindrunes-kit/src/server/auth.test.ts`
- Create: `packages/bindrunes-kit/src/server/hooks.test.ts`

- [ ] **Step 1:** Read `packages/bindrunes/vitest.config.ts` for the pattern.

- [ ] **Step 2:** Create `packages/bindrunes-kit/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 3:** Create `packages/bindrunes-kit/src/server/auth.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { createServerAuth } from "./auth";

describe("createServerAuth", () => {
  it("creates auth with handle function", () => {
    const auth = createServerAuth({
      validate: async () => null,
    });
    expect(auth.handle).toBeDefined();
    expect(typeof auth.handle).toBe("function");
  });

  it("getSession returns null when no cookie", async () => {
    const auth = createServerAuth({
      validate: async () => null,
    });
    const event = {
      cookies: { get: () => undefined },
    } as any;
    const session = await auth.getSession(event);
    expect(session).toBeNull();
  });

  it("setSession sets cookie", async () => {
    const auth = createServerAuth({
      validate: async () => null,
    });
    const cookies: Record<string, string> = {};
    const event = {
      cookies: {
        set: (name: string, value: string) => { cookies[name] = value; },
        get: () => undefined,
        delete: () => {},
      },
    } as any;
    auth.setSession(event, { user: { id: "1", email: "a@b.com" }, expiresAt: Date.now() });
    expect(cookies["bindrunes-session"]).toBeDefined();
  });
});
```

- [ ] **Step 4:** Create `packages/bindrunes-kit/src/server/hooks.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { createAuthGuard, createCsrfGuard } from "./hooks";

describe("createAuthGuard", () => {
  it("creates a handle function", () => {
    const handle = createAuthGuard();
    expect(typeof handle).toBe("function");
  });
});

describe("createCsrfGuard", () => {
  it("creates a handle function", () => {
    const handle = createCsrfGuard(["http://localhost:3000"]);
    expect(typeof handle).toBe("function");
  });

  it("allows GET requests", async () => {
    const handle = createCsrfGuard(["http://localhost:3000"]);
    const event = { request: { method: "GET" } } as any;
    const resolve = vi.fn().mockResolvedValue(new Response("ok"));
    await handle({ event, resolve } as any);
    expect(resolve).toHaveBeenCalled();
  });
});
```

- [ ] **Step 5:** Add test script to `packages/bindrunes-kit/package.json`:
```json
"test": "vitest run"
```

- [ ] **Step 6:** Run tests:
```bash
cd packages/bindrunes-kit && bun run test
```

- [ ] **Step 7:** Commit:
```bash
git add packages/bindrunes-kit/vitest.config.ts packages/bindrunes-kit/src/server/*.test.ts packages/bindrunes-kit/package.json
git commit -m "test: add test infrastructure and tests for kit server utilities"
```

---

### Task 3: Fix Kit Build Pipeline

**Files:**
- Modify: `packages/bindrunes-kit/package.json`

- [ ] **Step 1:** Read the current build script.

- [ ] **Step 2:** The kit's `.svelte.ts` files need svelte-package to build properly. Change the build script to use svelte-package or mark it as `type: "module"` with proper exports that don't need compilation (since the source files are the distributable for a workspace package).

For now, since the kit is private and consumed via workspace, the simplest fix is to ensure the exports map points to the source files directly (which it already does).

- [ ] **Step 3:** Commit if any changes needed.

---

## Phase 2: Production Composables

### Task 4: Create createAutosave Composable

**Files:**
- Create: `packages/bindrunes-kit/src/client/autosave.svelte.ts`

- [ ] **Step 1:** Read Vico's autosave pattern at `/home/ale/Projects/vico/web/src/lib/autosave.svelte.ts` for reference.

- [ ] **Step 2:** Create the composable:

```ts
type AutosaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";

interface CreateAutosaveOptions<T> {
  data: () => T;
  save: (data: T) => Promise<void>;
  delay?: number;
  onError?: (error: Error) => void;
  onSave?: (data: T) => void;
}

export function createAutosave<T>(options: CreateAutosaveOptions<T>) {
  const { data, save, delay = 1000, onError, onSave } = options;

  let status = $state<AutosaveStatus>("idle");
  let lastSaved = $state<Date | null>(null);
  let error = $state<Error | null>(null);

  const isDirty = $derived(status === "dirty");
  const isSaving = $derived(status === "saving");
  const isSaved = $derived(status === "saved");

  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastDataHash = "";

  function hashData(d: T): string {
    return JSON.stringify(d);
  }

  function scheduleSave() {
    if (timer) clearTimeout(timer);
    status = "dirty";
    timer = setTimeout(async () => {
      await doSave();
    }, delay);
  }

  async function doSave() {
    status = "saving";
    error = null;

    try {
      const currentData = data();
      await save(currentData);
      status = "saved";
      lastSaved = new Date();
      lastDataHash = hashData(currentData);
      onSave?.(currentData);
    } catch (err) {
      status = "error";
      error = err instanceof Error ? err : new Error(String(err));
      onError?.(error);
    }
  }

  async function forceSave() {
    if (timer) clearTimeout(timer);
    await doSave();
  }

  function checkForChanges() {
    const currentData = data();
    const currentHash = hashData(currentData);
    if (currentHash !== lastDataHash) {
      scheduleSave();
    }
  }

  // Watch for changes via $effect
  $effect(() => {
    const currentData = data();
    const currentHash = hashData(currentData);
    if (currentHash !== lastDataHash && lastDataHash !== "") {
      scheduleSave();
    }
    lastDataHash = currentHash;
  });

  function destroy() {
    if (timer) clearTimeout(timer);
  }

  return {
    get status() { return status; },
    get isDirty() { return isDirty; },
    get isSaving() { return isSaving; },
    get isSaved() { return isSaved; },
    get lastSaved() { return lastSaved; },
    get error() { return error; },
    forceSave,
    destroy,
  };
}
```

- [ ] **Step 3:** Add to `packages/bindrunes-kit/src/client/index.ts`:
```ts
export { createAutosave } from "./autosave.svelte";
```

- [ ] **Step 4:** Commit:
```bash
git add packages/bindrunes-kit/src/client/autosave.svelte.ts packages/bindrunes-kit/src/client/index.ts
git commit -m "feat: add createAutosave composable with debounced save and status tracking"
```

---

### Task 5: Create createWebSocketSession Composable

**Files:**
- Create: `packages/bindrunes-kit/src/client/websocket.svelte.ts`

- [ ] **Step 1:** Create the WebSocket session composable:

```ts
type WebSocketStatus = "connecting" | "connected" | "disconnected" | "reconnecting";

interface CreateWebSocketSessionOptions {
  url: string;
  protocols?: string | string[];
  reconnect?: boolean;
  reconnectDelay?: number;
  maxReconnectDelay?: number;
  maxRetries?: number;
  onMessage?: (data: unknown) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

export function createWebSocketSession(options: CreateWebSocketSessionOptions) {
  const {
    url,
    protocols,
    reconnect = true,
    reconnectDelay = 1000,
    maxReconnectDelay = 30_000,
    maxRetries = 10,
    onMessage,
    onOpen,
    onClose,
    onError,
  } = options;

  let status = $state<WebSocketStatus>("disconnected");
  let retryCount = $state(0);

  let ws: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let messageQueue: unknown[] = [];

  const isConnected = $derived(status === "connected");

  function connect() {
    if (typeof window === "undefined") return;
    if (ws) disconnect();

    status = "connecting";

    try {
      ws = new WebSocket(url, protocols);

      ws.onopen = () => {
        status = "connected";
        retryCount = 0;
        onOpen?.();

        // Flush queued messages
        while (messageQueue.length > 0) {
          const msg = messageQueue.shift();
          ws?.send(JSON.stringify(msg));
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage?.(data);
        } catch {
          onMessage?.(event.data);
        }
      };

      ws.onclose = () => {
        status = "disconnected";
        onClose?.();

        if (reconnect && retryCount < maxRetries) {
          scheduleReconnect();
        }
      };

      ws.onerror = (error) => {
        onError?.(error);
      };
    } catch (error) {
      status = "disconnected";
      onError?.(error as Event);
    }
  }

  function scheduleReconnect() {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    const delay = Math.min(reconnectDelay * 2 ** retryCount, maxReconnectDelay);
    retryCount++;
    status = "reconnecting";
    reconnectTimer = setTimeout(connect, delay);
  }

  function send(data: unknown) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      messageQueue.push(data);
    }
  }

  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (ws) {
      ws.close();
      ws = null;
    }
    status = "disconnected";
    retryCount = 0;
    messageQueue = [];
  }

  function destroy() {
    disconnect();
  }

  return {
    get status() { return status; },
    get isConnected() { return isConnected; },
    get retryCount() { return retryCount; },
    connect,
    disconnect,
    send,
    destroy,
  };
}
```

- [ ] **Step 3:** Add to `packages/bindrunes-kit/src/client/index.ts`:
```ts
export { createWebSocketSession } from "./websocket.svelte";
```

- [ ] **Step 4:** Commit:
```bash
git add packages/bindrunes-kit/src/client/websocket.svelte.ts packages/bindrunes-kit/src/client/index.ts
git commit -m "feat: add createWebSocketSession composable with reconnection and message queuing"
```

---

## Phase 3: Marketing & Adoption Assets

### Task 6: Deepen Design System Documentation

**Files:**
- Modify: `docs/design-system.md`

- [ ] **Step 1:** Read the current file (104 lines).

- [ ] **Step 2:** Expand to 500+ lines with:
- Visual examples of every theme (editorial, dracula, nord, catppuccin, rose-pine, github)
- Visual examples of every aesthetic (editorial, glass, bento, expressive)
- Visual examples of every density (compact, comfortable, spacious)
- CSS variable reference table
- Guide for creating custom themes with `defineTheme()`
- Guide for creating custom aesthetics
- OKLCH color theory explainer
- Token cascade explanation
- Three-axis combination examples

- [ ] **Step 3:** Commit:
```bash
git add docs/design-system.md
git commit -m "docs: expand design system documentation to 500+ lines"
```

---

### Task 7: Create Migration Guides

**Files:**
- Create: `docs/migration-from-melt-ui.md`
- Create: `docs/migration-from-skeleton.md`
- Create: `docs/migration-from-shadcn-svelte.md`

- [ ] **Step 1:** Create `docs/migration-from-shadcn-svelte.md`:

```markdown
# Migration from shadcn-svelte

## Why Switch?

bindrunes offers everything shadcn-svelte does PLUS:
- 3-axis design system (theme × aesthetic × density = 72 combinations)
- 12 pre-built page patterns (auth, dashboard, CRUD, settings, etc.)
- Server-side utilities (auth, hooks, i18n, API client)
- 49 composables including createForm, createQuery, createAutosave
- SvelteKit meta-framework integration

## Component Mapping

| shadcn-svelte | bindrunes | Notes |
|---------------|-----------|-------|
| Button | Button | Same API, more variants |
| Card | Card | 4 variants (surface/glass/outlined/ghost) |
| Input | Input | Same + PasswordInput, NumberInput |
| Dialog | Dialog | Same + Sheet, AlertDialog |
| Form | Form | Valibot instead of Zod |
| Table | DataTable | More features, pagination built-in |
| Select | Select | Same API |
| Tabs | Tabs | Same + vertical orientation |
| Badge | Badge | More variants |
| Alert | Alert | More variants |

## Theme Migration

shadcn-svelte uses CSS variables. bindrunes uses the same approach with OKLCH colors.

```css
/* shadcn-svelte */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

/* bindrunes */
:root {
  --background: oklch(1.00 0.00 0);
  --foreground: oklch(0.14 0.00 286);
}
```

## Install

```bash
# Remove shadcn-svelte
npm uninstall shadcn-svelte

# Install bindrunes
npm install bindrunes
```

## Setup

```css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```
```

- [ ] **Step 2:** Create similar guides for Melt UI and Skeleton.

- [ ] **Step 3:** Commit:
```bash
git add docs/migration-*.md
git commit -m "docs: add migration guides from shadcn-svelte, Melt UI, and Skeleton"
```

---

### Task 8: Create Community Infrastructure

**Files:**
- Create: `CODE_OF_CONDUCT.md`
- Create: `.github/ISSUE_TEMPLATE/bug_report.md`
- Create: `.github/ISSUE_TEMPLATE/feature_request.md`
- Create: `.github/PULL_REQUEST_TEMPLATE.md`

- [ ] **Step 1:** Create `CODE_OF_CONDUCT.md` (Contributor Covenant v2.1).

- [ ] **Step 2:** Create `.github/ISSUE_TEMPLATE/bug_report.md`:
```markdown
---
name: Bug Report
about: Report a bug in bindrunes
title: "[Bug] "
labels: bug
---

## Describe the bug

## Steps to reproduce

## Expected behavior

## Environment
- bindrunes version:
- Svelte version:
- Browser:
- OS:
```

- [ ] **Step 3:** Create `.github/ISSUE_TEMPLATE/feature_request.md`:
```markdown
---
name: Feature Request
about: Suggest a new feature
title: "[Feature] "
labels: enhancement
---

## Problem

## Proposed solution

## Alternatives considered

## Additional context
```

- [ ] **Step 4:** Create `.github/PULL_REQUEST_TEMPLATE.md`:
```markdown
## Description

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests pass
- [ ] Lint passes
- [ ] Documentation updated (if applicable)
```

- [ ] **Step 5:** Commit:
```bash
git add CODE_OF_CONDUCT.md .github/
git commit -m "docs: add CODE_OF_CONDUCT, issue templates, and PR template"
```

---

## Phase 4: Documentation Site Foundation

### Task 9: Create Docs Site Scaffold

**Files:**
- Create: `docs-site/` (new SvelteKit app)

- [ ] **Step 1:** Create a minimal SvelteKit app at `docs-site/` that will become the hosted documentation site.

For now, just create the scaffold:
```
docs-site/
  src/
    routes/
      +layout.svelte
      +page.svelte
    app.html
    app.css
  svelte.config.js
  vite.config.ts
  package.json
```

- [ ] **Step 2:** The landing page should showcase bindrunes with:
- Hero section using bindrunes components
- Feature grid showing 245+ components, 49+ composables, 72 theme combos
- Quick start code example
- Links to GitHub, npm

- [ ] **Step 3:** Commit:
```bash
git add docs-site/
git commit -m "feat: scaffold documentation site (docs.bindrunes.dev)"
```

---

## Phase 5: Final Verification

### Task 10: Final Verification

- [ ] **Step 1:** Run full lint: `npx biome check src/ packages/`
- [ ] **Step 2:** Run tests: `bun run test`
- [ ] **Step 3:** Verify kit tests pass: `cd packages/bindrunes-kit && bun run test`
- [ ] **Step 4:** Verify all new exports are accessible
- [ ] **Step 5:** Final commit if any fixes needed
