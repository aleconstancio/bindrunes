# bindrunes-kit Architectural Fix Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical architectural issues in bindrunes-kit by eliminating duplicated composables, fixing dependency declarations, unifying auth, and cleaning up templates.

**Architecture:** Delete duplicated composables (createQuery, createForm, createMutation, createApiClient) from kit, re-export them from core, fix all remaining issues.

---

## Phase 1: Fix Dependencies & Package Structure

### Task 1: Fix package.json Dependencies

**File:** `packages/bindrunes-kit/package.json`

- [ ] **Step 1:** Read the current file.

- [ ] **Step 2:** Add missing dependencies:
```json
{
  "dependencies": {
    "bindrunes": "workspace:*",
    "valibot": "^0.42.0"
  },
  "peerDependencies": {
    "svelte": "^5.0.0",
    "@sveltejs/kit": "^2.0.0",
    "vite": "^6.0.0"
  },
  "peerDependenciesMeta": {
    "svelte": { "optional": false },
    "@sveltejs/kit": { "optional": false }
  }
}
```

- [ ] **Step 3:** Fix the `bin` entry to point to a build script, not raw .ts:
```json
"bin": {
  "create-bindrunes": "./dist/cli/index.js"
}
```

Or better: since the package is private and won't be published yet, remove the `bin` field entirely and document that the CLI is run via `node packages/bindrunes-kit/src/cli/index.ts`.

- [ ] **Step 4:** Remove `"private": true` (or keep it if we're not publishing yet — your call).

- [ ] **Step 5:** Fix the root `index.ts` to export the client composable barrel:
```ts
export * from "./client/index";
```

- [ ] **Step 6:** Commit:
```bash
git add packages/bindrunes-kit/package.json packages/bindrunes-kit/src/index.ts
git commit -m "fix: add missing dependencies and fix package exports"
```

---

## Phase 2: Eliminate Duplicated Composables

### Task 2: Delete Duplicated Client Composables

The core `bindrunes` library already has superior versions of these. Delete the kit versions and re-export from core.

**Files to delete:**
- `packages/bindrunes-kit/src/client/query.ts` (replaced by `bindrunes.createQuery`)
- `packages/bindrunes-kit/src/client/form.ts` (replaced by `bindrunes.createForm`)
- `packages/bindrunes-kit/src/client/api.ts` (replaced by `bindrunes.createApiClient`)

**File to modify:** `packages/bindrunes-kit/src/client/index.ts`

- [ ] **Step 1:** Read the current `client/index.ts`.

- [ ] **Step 2:** Rewrite it to re-export from core + keep kit-only composables:
```ts
// Re-export core composables that kit consumers need
export { createQuery, createMutation, invalidateQuery } from "bindrunes";
export { createForm } from "bindrunes";
export { createApiClient } from "bindrunes";

// Kit-only composables (not in core)
export { createClientAuth } from "./auth.svelte";
export { createSSEClient } from "./sse.svelte";
export { createSession } from "./session";
```

- [ ] **Step 3:** Delete the 3 duplicated files:
```bash
rm packages/bindrunes-kit/src/client/query.ts
rm packages/bindrunes-kit/src/client/form.ts
rm packages/bindrunes-kit/src/client/api.ts
```

- [ ] **Step 4:** Commit:
```bash
git add -A packages/bindrunes-kit/src/client/
git commit -m "refactor: delete duplicated composables, re-export from core bindrunes"
```

---

### Task 3: Fix Remaining Client Composables

**Files to modify:**
- `packages/bindrunes-kit/src/client/auth.svelte.ts`
- `packages/bindrunes-kit/src/client/sse.svelte.ts`
- `packages/bindrunes-kit/src/client/session.ts`

#### 3a. Fix auth.svelte.ts

- [ ] **Step 1:** Read the file.

- [ ] **Step 2:** Fix issues:
- Add SSR guard to `bootstrap()` call
- Make token getter reactive (use `$state` for token)
- Add `$effect` for cleanup if needed
- Ensure cookie name matches server auth: use `bindrunes-session` as default for both

- [ ] **Step 3:** The auth composable should store the token reactively:
```ts
let _token = $state<string | null>(null);

function getToken(): string | null {
  if (_token !== null) return _token;
  // ... read from cookie/localStorage
  _token = value;
  return _token;
}
```

#### 3b. Fix sse.svelte.ts

- [ ] **Step 1:** Read the file.

- [ ] **Step 2:** Add SSR guards:
```ts
function connect() {
  if (typeof window === "undefined") return; // SSR guard
  // ... existing code
}
```

- [ ] **Step 3:** Add cleanup function that can be called on unmount:
```ts
function destroy() {
  disconnect();
}
```

#### 3c. Fix session.ts

- [ ] **Step 1:** Read the file.

- [ ] **Step 2:** Fix `$derived` misuse — `isExpired` and `showWarning` should be `$state`, not `$derived`, since they're set imperatively.

- [ ] **Step 3:** Add cleanup function.

- [ ] **Step 4:** Commit:
```bash
git add packages/bindrunes-kit/src/client/
git commit -m "fix: fix SSR guards, reactivity, and cleanup in client composables"
```

---

## Phase 3: Fix Server Utilities

### Task 4: Fix Server Auth

**File:** `packages/bindrunes-kit/src/server/auth.ts`

- [ ] **Step 1:** Read the file.

- [ ] **Step 2:** Fix issues:
- Change default `cookieName` from `"bindrunes-session"` to match client (or document the mismatch)
- Add `maxAge: 0` to `deleteSession` for proper cookie clearing
- Add `App.Locals` type augmentation

- [ ] **Step 3:** Add type augmentation:
```ts
// At the bottom of auth.ts
declare global {
  namespace App {
    interface Locals {
      session: SessionData | null;
    }
  }
}
```

- [ ] **Step 4:** Commit:
```bash
git add packages/bindrunes-kit/src/server/auth.ts
git commit -m "fix: fix server auth cookie handling and add App.Locals types"
```

---

### Task 5: Fix Server i18n

**File:** `packages/bindrunes-kit/src/server/i18n.ts`

- [ ] **Step 1:** Read the file.

- [ ] **Step 2:** Add `App.Locals` augmentation for locale:
```ts
declare global {
  namespace App {
    interface Locals {
      locale: string;
      pathLocale: string | null;
    }
  }
}
```

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/src/server/i18n.ts
git commit -m "fix: add App.Locals type augmentation for i18n"
```

---

### Task 6: Fix Server API Client

**File:** `packages/bindrunes-kit/src/server/api.ts`

- [ ] **Step 1:** Read the file.

- [ ] **Step 2:** Fix the broken `content-type` check:
```ts
// Before (broken):
const contentType = fetchOptions.headers?.toString() ?? "";
if (fetchOptions.body && !requestHeaders["Content-Type"]) {

// After (fixed):
if (fetchOptions.body && !requestHeaders["Content-Type"]) {
```

- [ ] **Step 3:** Fix the Bearer token — should use session token, not user ID:
```ts
requestHeaders["Authorization"] = `Bearer ${event.locals.session.user.id}`;
// This is correct if user.id IS the session token. If not, fix it.
```

- [ ] **Step 4:** Commit:
```bash
git add packages/bindrunes-kit/src/server/api.ts
git commit -m "fix: fix content-type check and auth header in server API client"
```

---

## Phase 4: Fix Templates

### Task 7: Fix All Template Files

**Files to fix:**
- `packages/bindrunes-kit/templates/features/dashboard/` — fix `$app/stores` → `$app/state`
- `packages/bindrunes-kit/templates/features/crud/` — fix `$app/stores`, remove double fetch
- `packages/bindrunes-kit/templates/features/settings/` — fix createForm import
- `packages/bindrunes-kit/templates/features/auth-email/` — fix double JSON parse
- `packages/bindrunes-kit/templates/features/realtime/` — fix status reactivity

- [ ] **Step 1:** Read all feature template files.

- [ ] **Step 2:** For each file:
- Replace `import { page } from "$app/stores"` with `import { page } from "$app/state"`
- Replace `$page.url.pathname` with `page.url.pathname`
- Fix any import errors (createForm from bindrunes-kit/client → bindrunes)
- Fix double JSON parse in register page
- Fix realtime status reactivity

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/templates/
git commit -m "fix: fix Svelte 5 syntax and import errors in all templates"
```

---

### Task 8: Fix SPA Template Missing Dependency

**File:** `packages/bindrunes-kit/templates/spa-backend/package.json`

- [ ] **Step 1:** Read the file.

- [ ] **Step 2:** Add `bindrunes-kit` as a dependency:
```json
"bindrunes-kit": "^2.0.0"
```

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/templates/spa-backend/package.json
git commit -m "fix: add missing bindrunes-kit dependency to SPA template"
```

---

### Task 9: Fix Template Version References

**Files:** All `package.json` files in templates

- [ ] **Step 1:** Search for `"^2.0.0"` in template package.json files.

- [ ] **Step 2:** Change to `"^1.0.0"` or `"*"` until we publish v2.

- [ ] **Step 3:** Commit:
```bash
git add packages/bindrunes-kit/templates/
git commit -m "fix: correct package version references in templates"
```

---

## Phase 5: Verification

### Task 10: Final Verification

- [ ] **Step 1:** Run `bun install` from root to verify workspace resolution.

- [ ] **Step 2:** Run `bun --filter bindrunes-kit build` (if build script exists).

- [ ] **Step 3:** Verify all imports resolve:
```bash
cd packages/bindrunes-kit && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4:** Run full lint: `npx biome check packages/bindrunes-kit/src/`

- [ ] **Step 5:** Run tests: `bun run test`

- [ ] **Step 6:** Final commit if any fixes needed.
