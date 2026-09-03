# urupe-ui CI/CD & Playground Audit Fixes

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the CI/CD pipeline, fix configuration drift, remove orphaned artifacts, and improve developer experience across the monorepo.

**Architecture:** 8 independent tasks touching GitHub Actions workflows, package.json configs, vitest config, Turbo config, AGENTS.md, and Playwright test files. Each task is self-contained and can be executed in any order. No cross-task dependencies.

**Tech Stack:** GitHub Actions, Bun, Turborepo, Vitest, Changesets, Biome, Playwright (removal only).

---

## File Map

| File | Action | Tasks |
|------|--------|-------|
| `.tool-versions` | Modify | 1 |
| `package.json` (root) | Modify | 1, 2 |
| `turbo.json` | Modify | 1 |
| `.github/workflows/ci.yml` | Modify | 2, 3 |
| `.github/workflows/release.yml` | Modify | 4 |
| `packages/bindrunes-kit/vitest.config.ts` | Modify | 6 |
| `.agents/AGENTS.md` | Modify | 7 |
| `packages/bindrunes/tests/visual/primitives/button.spec.ts` | Delete | 5 |
| `packages/bindrunes/tests/visual/primitives/card.spec.ts` | Delete | 5 |
| `packages/bindrunes/tests/visual/primitives/input.spec.ts` | Delete | 5 |
| `packages/bindrunes/tests/visual/primitives/` | Delete dir | 5 |

---

### Task 1: Fix version mismatches and turbo.json validate task

**Why:** `.tool-versions` says `bun 1.3.13` but `package.json` says `bun@1.3.14`. The root `package.json` has `"validate": "turbo run validate"` but `turbo.json` has no `validate` task defined — Turbo will silently skip it or error. The justfile `validate` runs commands directly and works correctly, but the npm script path is broken.

**Files:**
- Modify: `.tool-versions`
- Modify: `turbo.json`

- [ ] **Step 1: Align Bun version in `.tool-versions`**

```bash
echo "bun 1.3.14" > .tool-versions
```

- [ ] **Step 2: Add `validate` task to `turbo.json`**

The `validate` task in Turbo should run lint, check, and test. It depends on `build` (same as `test` and `check`). Add it between the existing `check` and the closing brace.

Read `turbo.json`, then edit it to add the `validate` task after the `check` task:

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
		},
		"validate": {
			"dependsOn": ["build"]
		}
	}
}
```

- [ ] **Step 3: Verify the fix**

```bash
cd /home/ale/Projects/urupe-ui
cat .tool-versions
# Expected: bun 1.3.14

cat turbo.json | grep -A2 validate
# Expected: "validate": { "dependsOn": ["build"] }
```

- [ ] **Step 4: Commit**

```bash
git add .tool-versions turbo.json
git commit -m "fix: align bun version and add validate task to turbo.json"
```

---

### Task 2: Harden CI workflow with caching and main-push trigger

**Why:** The CI workflow runs `bun install` fresh every time (~15-30s waste), and only triggers on PRs — not on push to main. If a PR is admin-merged without CI or a hotfix is pushed directly, there's no safety net. Also, `bun run test:ci` is defined only in `packages/bindrunes/package.json`, not root — the root `test` script goes through Turbo which doesn't pass `--coverage --reporter=verbose`.

**Files:**
- Modify: `.github/workflows/ci.yml`
- Modify: `package.json` (root) — add `test:ci` script

- [ ] **Step 1: Add `test:ci` script to root `package.json`**

Read `package.json`, then add `"test:ci": "turbo run test:ci"` to the scripts section (after `"test": "turbo run test"`).

The scripts block should become:

```json
"scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "lint:fix": "turbo run lint -- --write .",
    "format": "turbo run lint -- --write .",
    "test": "turbo run test",
    "test:ci": "turbo run test:ci",
    "test:watch": "turbo run test:watch",
    "test:coverage": "turbo run test:coverage",
    "check": "turbo run check",
    "validate": "turbo run validate",
    "changeset": "changeset",
    "release:version": "changeset version",
    "release:publish": "changeset publish",
    "prepare": "husky",
    "size": "size-limit"
}
```

- [ ] **Step 2: Add `test:ci` to `turbo.json`**

Read `turbo.json`, then add the `test:ci` task (same shape as `test`):

```json
"test:ci": {
    "dependsOn": ["build"]
}
```

- [ ] **Step 3: Rewrite `.github/workflows/ci.yml`**

Replace the entire file with:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10 # v6.0.3

      - uses: oven-sh/setup-bun@735343b667d3e6f658f44d0eca948eb6282f2b76 # v2.0.2
        with:
          bun-version-file: .tool-versions
          cache: true

      - name: Install dependencies
        run: bun install

      - name: Lint
        run: bun run lint

      - name: Type check
        run: bun run check

      - name: Test
        run: bun run test:ci

      - name: Build
        run: bun run build

      - name: Bundle size check
        run: bun run size

      - name: Verify examples build
        run: |
          for dir in examples/*/; do
            if [ -f "${dir}package.json" ]; then
              echo "Building ${dir}..."
              (cd "$dir" && bun install --frozen-lockfile 2>/dev/null && bun run build 2>/dev/null) || echo "WARN: ${dir} build failed (may need library linked)"
            fi
          done
```

Key changes:
1. Added `push: branches: [main]` trigger (with concurrency still canceling in-progress — CI on main is a safety net, not a release gate)
2. Added `cache: true` to `oven-sh/setup-bun` (caches `~/.bun/install/cache`)

- [ ] **Step 4: Verify the workflow syntax**

```bash
cd /home/ale/Projects/urupe-ui
cat .github/workflows/ci.yml | head -10
# Expected: triggers on both push and pull_request
grep "cache: true" .github/workflows/ci.yml
# Expected: cache found
```

- [ ] **Step 5: Commit**

```bash
git add package.json turbo.json .github/workflows/ci.yml
git commit -m "ci: add caching, main-push trigger, and root test:ci script"
```

---

### Task 3: Add dependency audit step to CI

**Why:** No `bun audit` or equivalent runs in CI. Vulnerable dependencies can slip through undetected. Bun doesn't have a native `audit` command yet, so we use `npm audit` which works with bun's lockfile.

**Files:**
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Add audit step to CI workflow**

Read `.github/workflows/ci.yml`. Add a new step after "Install dependencies" and before "Lint":

```yaml
      - name: Audit dependencies
        run: npm audit --omit=dev || echo "WARN: audit found issues (non-blocking for now)"
```

The full workflow becomes:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10 # v6.0.3

      - uses: oven-sh/setup-bun@735343b667d3e6f658f44d0eca948eb6282f2b76 # v2.0.2
        with:
          bun-version-file: .tool-versions
          cache: true

      - name: Install dependencies
        run: bun install

      - name: Audit dependencies
        run: npm audit --omit=dev || echo "WARN: audit found issues (non-blocking for now)"

      - name: Lint
        run: bun run lint

      - name: Type check
        run: bun run check

      - name: Test
        run: bun run test:ci

      - name: Build
        run: bun run build

      - name: Bundle size check
        run: bun run size

      - name: Verify examples build
        run: |
          for dir in examples/*/; do
            if [ -f "${dir}package.json" ]; then
              echo "Building ${dir}..."
              (cd "$dir" && bun install --frozen-lockfile 2>/dev/null && bun run build 2>/dev/null) || echo "WARN: ${dir} build failed (may need library linked)"
            fi
          done
```

Note: The audit is non-blocking (`|| echo "WARN:..."`) for now. Once the team is confident the audit is clean, remove the `|| echo` fallback to make it a hard gate.

- [ ] **Step 2: Verify the step is present**

```bash
grep "Audit dependencies" .github/workflows/ci.yml
# Expected: found
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add dependency audit step"
```

---

### Task 4: Add test step to release workflow

**Why:** The release workflow runs `build` but not `test`. A broken release could be published if `main` has failing tests. The release workflow should validate before publishing.

**Files:**
- Modify: `.github/workflows/release.yml`

- [ ] **Step 1: Add test and lint steps to release workflow**

Read `.github/workflows/release.yml`. Add lint, typecheck, and test steps after "Install dependencies" and before "Build":

```yaml
name: Release

on:
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      id-token: write
    steps:
      - uses: actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10 # v6.0.3

      - uses: oven-sh/setup-bun@735343b667d3e6f658f44d0eca948eb6282f2b76 # v2.0.2
        with:
          bun-version-file: .tool-versions
          cache: true

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Lint
        run: bun run lint

      - name: Type check
        run: bun run check

      - name: Test
        run: bun run test:ci

      - name: Build
        run: bun run build

      - name: Create Release Pull Request or Publish
        uses: changesets/action@06245a4e0a36c064a573d4150030f5ec548e4fcc # v1.4.10
        with:
          publish: bun run release:publish
          version: bun run release:version
          title: "chore: version packages"
          commit: "chore: version packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Key changes:
1. Added `cache: true` to `oven-sh/setup-bun`
2. Added lint, typecheck, and test steps before build
3. These run even though `release:publish` in the justfile already calls `just prepublish` (which does build + validate) — belt and suspenders. The CI steps catch issues early; the justfile steps are a final guard.

- [ ] **Step 2: Verify the steps are present**

```bash
grep -c "Lint\|Type check\|Test" .github/workflows/release.yml
# Expected: 3
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/release.yml
git commit -m "ci: add lint, typecheck, and test steps to release workflow"
```

---

### Task 5: Remove orphaned Playwright visual regression specs

**Why:** Three `.spec.ts` files exist under `packages/bindrunes/tests/visual/primitives/` that import from `@playwright/test`, but there is no `playwright.config.ts` anywhere in the project, no Playwright dependency in `package.json`, and no CI step to run them. These are aspirational stubs that will confuse contributors. Remove them until Playwright is properly set up.

**Files:**
- Delete: `packages/bindrunes/tests/visual/primitives/button.spec.ts`
- Delete: `packages/bindrunes/tests/visual/primitives/card.spec.ts`
- Delete: `packages/bindrunes/tests/visual/primitives/input.spec.ts`
- Delete: `packages/bindrunes/tests/visual/` (directory)

- [ ] **Step 1: Delete the orphaned spec files and directory**

```bash
rm -rf packages/bindrunes/tests/visual/
```

- [ ] **Step 2: Verify the directory is gone**

```bash
ls packages/bindrunes/tests/visual/ 2>&1
# Expected: "No such file or directory"
```

- [ ] **Step 3: Commit**

```bash
git add -A packages/bindrunes/tests/visual/
git commit -m "chore: remove orphaned playwright visual regression stubs"
```

---

### Task 6: Add coverage thresholds to bindrunes-kit

**Why:** `packages/bindrunes-kit/vitest.config.ts` is bare minimum — no coverage thresholds, no coverage provider configured. The main `urupe-ui` package enforces 90%+ thresholds; `bindrunes-kit` should have at least a basic floor.

**Files:**
- Modify: `packages/bindrunes-kit/vitest.config.ts`

- [ ] **Step 1: Rewrite `packages/bindrunes-kit/vitest.config.ts`**

Replace the entire file with:

```ts
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte({ compilerOptions: { runes: true } })],
	test: {
		environment: "happy-dom",
		include: ["src/**/*.test.ts", "src/**/*.svelte.test.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.{ts,svelte}"],
			exclude: ["src/**/*.test.ts", "src/**/*.d.ts"],
			thresholds: {
				global: {
					lines: 80,
					branches: 75,
					functions: 80,
					statements: 80,
				},
			},
		},
	},
});
```

The thresholds are intentionally lower than the main library (80% vs 90%) because `bindrunes-kit` is at v0.1.1 and still evolving. Raise them as the package matures.

- [ ] **Step 2: Verify the config is valid**

```bash
cd /home/ale/Projects/urupe-ui
cat packages/bindrunes-kit/vitest.config.ts | grep -A5 thresholds
# Expected: global thresholds at 80/75/80/80
```

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes-kit/vitest.config.ts
git commit -m "test: add coverage thresholds to bindrunes-kit"
```

---

### Task 7: Sync AGENTS.md with actual vitest.config.ts thresholds

**Why:** `AGENTS.md` line 89-91 says "90% lines / 85% branches / 88% functions" and "global floor stays at 80 / 70 / 77" — but `vitest.config.ts` has 90/85/88/90 globally and 95/90/92/95 for agentic. The documentation is out of sync with reality.

**Files:**
- Modify: `.agents/AGENTS.md`

- [ ] **Step 1: Update the Agentic Coverage section in AGENTS.md**

Read `.agents/AGENTS.md`. Replace lines 86-94 (the "Agentic Coverage" section) with:

```markdown
## Agentic Coverage
The agentic folder has a **stricter per-glob threshold** enforced in CI
(`vitest.config.ts#thresholds`):
- `src/utils/agentic/**`: **95% lines / 90% branches / 92% functions / 95% statements**.
- Global and other domain thresholds: **90% lines / 85% branches / 88% functions / 90% statements**.
- `bindrunes-kit`: **80% lines / 75% branches / 80% functions / 80% statements**.
- When adding agentic code, TDD is required — the contract is the API
  surface; logic must be deeply covered.
- Copilot components (`src/domains/agentic/`) follow standard coverage thresholds.
```

- [ ] **Step 2: Verify the update**

```bash
grep -A6 "Agentic Coverage" .agents/AGENTS.md
# Expected: thresholds match vitest.config.ts (95/90/92/95 for agentic, 90/85/88/90 global)
```

- [ ] **Step 3: Commit**

```bash
git add .agents/AGENTS.md
git commit -m "docs: sync AGENTS.md coverage thresholds with vitest.config.ts"
```

---

### Task 8: Add Vercel deployment config for docs-site

**Why:** The docs-site uses `@sveltejs/adapter-auto` but has no platform configuration (no `vercel.json`, `netlify.toml`, or `wrangler.*`). This means `adapter-auto` will fail at build time if no platform is detected. Adding a Vercel config makes the docs-site deployable and enables preview deployments on PRs.

**Files:**
- Create: `docs-site/vercel.json`
- Modify: `docs-site/svelte.config.js` (switch to `@sveltejs/adapter-vercel`)

- [ ] **Step 1: Install Vercel adapter**

```bash
cd /home/ale/Projects/urupe-ui
bun add -D @sveltejs/adapter-vercel --filter docs-site
```

- [ ] **Step 2: Update `docs-site/svelte.config.js`**

Replace the entire file with:

```js
import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() },
};

export default config;
```

- [ ] **Step 3: Create `docs-site/vercel.json`**

```json
{
	"framework": "sveltekit",
	"buildCommand": "bun run build",
	"installCommand": "bun install"
}
```

- [ ] **Step 4: Verify the config**

```bash
cat docs-site/svelte.config.js | grep adapter
# Expected: import adapter from "@sveltejs/adapter-vercel"
cat docs-site/vercel.json
# Expected: valid JSON with buildCommand and installCommand
```

- [ ] **Step 5: Commit**

```bash
git add docs-site/svelte.config.js docs-site/vercel.json docs-site/package.json
git commit -m "docs: add Vercel deployment config for docs-site"
```

---

## Execution Summary

| Task | Scope | Risk | Time |
|------|-------|------|------|
| 1. Fix versions + turbo validate | `.tool-versions`, `turbo.json` | Low | 2 min |
| 2. Harden CI workflow | `ci.yml`, `package.json`, `turbo.json` | Low | 5 min |
| 3. Add dependency audit | `ci.yml` | Low | 2 min |
| 4. Harden release workflow | `release.yml` | Low | 3 min |
| 5. Remove orphaned Playwright specs | 3 files + dir | None | 1 min |
| 6. Add kit coverage thresholds | `vitest.config.ts` | Low | 2 min |
| 7. Sync AGENTS.md | `AGENTS.md` | None | 2 min |
| 8. Add Vercel deploy config | `svelte.config.js`, `vercel.json` | Medium | 3 min |

**Total: ~20 minutes of work across 8 commits.**

## Verification After All Tasks

Run the full validation pipeline to confirm nothing is broken:

```bash
cd /home/ale/Projects/urupe-ui
just validate
# Expected: lint passes, typecheck passes, tests pass, size-limit passes
```
