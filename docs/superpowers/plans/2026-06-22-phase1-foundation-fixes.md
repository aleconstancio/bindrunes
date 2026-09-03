# Phase 1: Foundation Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix critical issues blocking adoption — CLI templates, kit types, bundle tracking, and docs stats.

**Architecture:** Four independent fixes that can be parallelized. Each fix is self-contained and testable.

**Tech Stack:** TypeScript, SvelteKit, size-limit, Bun

---

## File Structure

### Created Files
- `packages/bindrunes-kit/templates/full-stack/package.json`
- `packages/bindrunes-kit/templates/full-stack/svelte.config.js`
- `packages/bindrunes-kit/templates/full-stack/vite.config.ts`
- `packages/bindrunes-kit/templates/full-stack/src/app.css`
- `packages/bindrunes-kit/templates/full-stack/src/app.html`
- `packages/bindrunes-kit/templates/full-stack/src/routes/+layout.svelte`
- `packages/bindrunes-kit/templates/full-stack/src/routes/+page.svelte`
- `packages/bindrunes-kit/templates/full-stack/src/hooks.server.ts`
- `packages/bindrunes-kit/templates/spa-backend/package.json`
- `packages/bindrunes-kit/templates/spa-backend/svelte.config.js`
- `packages/bindrunes-kit/templates/spa-backend/vite.config.ts`
- `packages/bindrunes-kit/templates/spa-backend/src/app.css`
- `packages/bindrunes-kit/templates/spa-backend/src/app.html`
- `packages/bindrunes-kit/templates/spa-backend/src/routes/+layout.svelte`
- `packages/bindrunes-kit/templates/spa-backend/src/routes/+page.svelte`
- `.size-limit.json`

### Modified Files
- `packages/bindrunes-kit/src/types/index.ts`
- `packages/bindrunes-kit/package.json` (add `"templates"` to `"files"`)
- `package.json` (add `size-limit` dev dependency and `"size"` script)
- `docs-site/src/routes/+page.svelte` (fix stats)

---

## Task 1: Fix Kit Types

**Files:**
- Modify: `packages/bindrunes-kit/src/types/index.ts`

- [ ] **Step 1: Read current file**

```bash
cat packages/bindrunes-kit/src/types/index.ts
```

Expected: `export {};`

- [ ] **Step 2: Write the type exports**

```typescript
export type { SessionData } from "../server/auth";
export type { CreateClientAuthOptions, User } from "../client/auth.svelte";
export type { CreateSSEClientOptions, SSEStatus } from "../client/sse.svelte";
```

- [ ] **Step 3: Verify types compile**

```bash
cd packages/bindrunes-kit && bun run check
```

Expected: No errors (or only pre-existing errors unrelated to this change)

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes-kit/src/types/index.ts
git commit -m "fix(kit): export shared types from types/index.ts"
```

---

## Task 2: Create Full-Stack Template

**Files:**
- Create: `packages/bindrunes-kit/templates/full-stack/` (entire directory)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p packages/bindrunes-kit/templates/full-stack/src/routes
```

- [ ] **Step 2: Write package.json**

```json
{
  "name": "my-bindrunes-app",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"
  },
  "dependencies": {
    "urupe-ui": "^1.2.0",
    "svelte": "^5.0.0",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  },
  "type": "module"
}
```

- [ ] **Step 3: Write svelte.config.js**

```javascript
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};

export default config;
```

- [ ] **Step 4: Write vite.config.ts**

```typescript
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ["urupe-ui"] },
});
```

- [ ] **Step 5: Write src/app.css**

```css
@import "tailwindcss";
@plugin "urupe-ui/tailwind";
@import "urupe-ui/styles/global.css";
```

- [ ] **Step 6: Write src/app.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-theme="editorial" data-aesthetic="editorial" data-density="comfortable">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 7: Write src/routes/+layout.svelte**

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "urupe-ui";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

- [ ] **Step 8: Write src/routes/+page.svelte**

```svelte
<script lang="ts">
  import { Button, Card, PageSection } from "urupe-ui";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <div class="text-center space-y-6">
    <h1 class="text-display-1 text-foreground">Welcome to urupe-ui</h1>
    <p class="text-body-lg text-muted-foreground">
      Your app is ready. Start building.
    </p>
    <Button variant="primary" size="lg">Get Started</Button>
  </div>
</PageSection>
```

- [ ] **Step 9: Write src/hooks.server.ts**

```typescript
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
  // TODO: Add your auth logic here
  event.locals.session = null;
  event.locals.user = null;
  return resolve(event);
};

export const handle = sequence(auth);
```

- [ ] **Step 10: Write tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 11: Commit**

```bash
git add packages/bindrunes-kit/templates/full-stack/
git commit -m "feat(kit): add full-stack SvelteKit template for create-bindrunes CLI"
```

---

## Task 3: Create SPA-Backend Template

**Files:**
- Create: `packages/bindrunes-kit/templates/spa-backend/` (entire directory)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p packages/bindrunes-kit/templates/spa-backend/src/routes
```

- [ ] **Step 2: Write package.json**

```json
{
  "name": "my-bindrunes-spa",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"
  },
  "dependencies": {
    "urupe-ui": "^1.2.0",
    "svelte": "^5.0.0",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  },
  "type": "module"
}
```

- [ ] **Step 3: Write svelte.config.js** (same as full-stack)

```javascript
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};

export default config;
```

- [ ] **Step 4: Write vite.config.ts** (same as full-stack)

```typescript
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ["urupe-ui"] },
});
```

- [ ] **Step 5: Write src/app.css** (same as full-stack)

```css
@import "tailwindcss";
@plugin "urupe-ui/tailwind";
@import "urupe-ui/styles/global.css";
```

- [ ] **Step 6: Write src/app.html** (same as full-stack)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-theme="editorial" data-aesthetic="editorial" data-density="comfortable">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 7: Write src/routes/+layout.svelte** (same as full-stack)

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "urupe-ui";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

- [ ] **Step 8: Write src/routes/+page.svelte** (same as full-stack)

```svelte
<script lang="ts">
  import { Button, Card, PageSection } from "urupe-ui";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <div class="text-center space-y-6">
    <h1 class="text-display-1 text-foreground">Your SPA is ready</h1>
    <p class="text-body-lg text-muted-foreground">
      Connect to your backend API and start building.
    </p>
    <Button variant="primary" size="lg">Get Started</Button>
  </div>
</PageSection>
```

- [ ] **Step 9: Write tsconfig.json** (same as full-stack)

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 10: Commit**

```bash
git add packages/bindrunes-kit/templates/spa-backend/
git commit -m "feat(kit): add SPA-backend SvelteKit template for create-bindrunes CLI"
```

---

## Task 4: Update Kit package.json

**Files:**
- Modify: `packages/bindrunes-kit/package.json`

- [ ] **Step 1: Read current file**

```bash
cat packages/bindrunes-kit/package.json
```

- [ ] **Step 2: Add "templates" to "files" array**

Change the `"files"` field from:
```json
"files": [
  "dist",
  "src"
],
```

To:
```json
"files": [
  "dist",
  "src",
  "templates"
],
```

- [ ] **Step 3: Verify the change**

```bash
cat packages/bindrunes-kit/package.json | grep -A 5 '"files"'
```

Expected:
```
"files": [
  "dist",
  "src",
  "templates"
],
```

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes-kit/package.json
git commit -m "fix(kit): include templates directory in published package files"
```

---

## Task 5: Add Bundle Size Tracking

**Files:**
- Create: `.size-limit.json`
- Modify: `package.json` (root)

- [ ] **Step 1: Install size-limit**

```bash
bun add -d size-limit @size-limit/preset-small-lib
```

- [ ] **Step 2: Create .size-limit.json**

```json
[
  {
    "name": "urupe-ui (main)",
    "path": "packages/bindrunes/dist/index.js",
    "limit": "15 kB"
  },
  {
    "name": "urupe-ui/layouts",
    "path": "packages/bindrunes/dist/layouts/index.js",
    "limit": "8 kB"
  },
  {
    "name": "urupe-ui/domains",
    "path": "packages/bindrunes/dist/domains/index.js",
    "limit": "12 kB"
  }
]
```

- [ ] **Step 3: Add "size" script to root package.json**

Add to the `"scripts"` section:
```json
"size": "size-limit"
```

- [ ] **Step 4: Verify the script works**

```bash
bun run size
```

Expected: Output showing current sizes (may show errors if dist/ doesn't exist yet, that's OK)

- [ ] **Step 5: Commit**

```bash
git add .size-limit.json package.json bun.lock
git commit -m "chore: add size-limit for bundle size tracking"
```

---

## Task 6: Fix Homepage Stats

**Files:**
- Modify: `docs-site/src/routes/+page.svelte`

- [ ] **Step 1: Read current file**

```bash
cat docs-site/src/routes/+page.svelte
```

- [ ] **Step 2: Update component count**

Change line 10:
```
245+ components · 49+ composables · 72 theme combinations · The complete design system for B2B SaaS.
```

To:
```
248+ components · 53+ composables · 72 theme combinations · The complete design system for B2B SaaS.
```

- [ ] **Step 3: Update the stats grid**

Change line 52:
```svelte
<h3 class="text-title-1">245+ Components</h3>
```
To:
```svelte
<h3 class="text-title-1">248+ Components</h3>
```

Change line 56:
```svelte
<h3 class="text-title-1">3-Axis Design System</h3>
```
(Keep as-is — "3-Axis" is correct)

Change line 60:
```svelte
<h3 class="text-title-1">SvelteKit Integration</h3>
```
(Keep as-is)

Change line 69:
```svelte
<div class="text-display-1 text-foreground">245+</div>
```
To:
```svelte
<div class="text-display-1 text-foreground">248+</div>
```

Change line 73:
```svelte
<div class="text-display-1 text-foreground">49+</div>
```
To:
```svelte
<div class="text-display-1 text-foreground">53+</div>
```

- [ ] **Step 4: Verify changes**

```bash
grep -n "245\|49+" docs-site/src/routes/+page.svelte
```

Expected: No matches (all instances updated)

- [ ] **Step 5: Commit**

```bash
git add docs-site/src/routes/+page.svelte
git commit -m "docs: fix homepage stats to match actual component/composable counts"
```

---

## Task 7: Validate Everything

- [ ] **Step 1: Run lint**

```bash
bun run lint
```

Expected: Pass (or only pre-existing warnings)

- [ ] **Step 2: Run type check**

```bash
bun run check
```

Expected: Pass (or only pre-existing errors)

- [ ] **Step 3: Run tests**

```bash
bun run test
```

Expected: Pass

- [ ] **Step 4: Run bundle size check**

```bash
bun run size
```

Expected: Output showing sizes under limits

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A && git commit -m "chore: phase 1 foundation fixes validation"
```

---

## Summary

| Task | Description | Dependencies |
|------|-------------|--------------|
| 1 | Fix kit types | None |
| 2 | Create full-stack template | None |
| 3 | Create SPA-backend template | None |
| 4 | Update kit package.json | Tasks 2, 3 |
| 5 | Add bundle size tracking | None |
| 6 | Fix homepage stats | None |
| 7 | Validate everything | Tasks 1-6 |

Tasks 1, 2, 3, 5, 6 can be parallelized. Task 4 depends on 2 and 3. Task 7 depends on all.
