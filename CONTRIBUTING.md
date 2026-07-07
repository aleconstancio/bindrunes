# Contributing to bindrunes

## Quick Start

```bash
# Clone the repo
git clone https://github.com/aleconstancio/bindrunes.git
cd bindrunes

# Install dependencies
bun install

# Start the dev server (showcase app)
bun run dev

# Run tests
bun run test

# Run lint
bun run lint
```

## Daily Commands

- `bun run dev` — Start dev server with watch mode.
- `bun run build` — Build packages.
- `bun run check` — TypeScript check.
- `bun run test` — Run all test suites.
- `bun run test:coverage` — Run tests with coverage reports.
- `bun run lint` / `bun run lint:fix` — Format check and fix.

### Just Commands

The `justfile` provides shortcuts for common workflows:

- `just dev` — Watch mode (library only)
- `just dev:all` — Watch mode (library + all demos)
- `just demo` — Run the showcase app
- `just build` — Build all packages
- `just lint` — Lint check
- `just check` — TypeScript check
- `just test` — Run tests
- `just validate` — Build + lint + typecheck + test (pre-PR check)
- `just prepublish` — Build + validate

---

## Showcase as Canonical Demo

`examples/showcase` is the single source of truth for all demos and documentation:

- Contains 75+ routes: interactive demos, full documentation, theme switcher, playground
- Run `bun run dev` from the repo root to start it
- All documentation pages live under `/docs/*`, `/kit/*`, `/migration/*`, `/blog/*`
- Component demos live under `/app`, `/auth/*`, `/dashboard/*`, `/landing/*`, etc.
- The showcase is deployed to Vercel on every push to `main`

---

## Style Guidelines

We use **Biome** for style and quality checking:
- **Indentation**: Tabs
- **Quotes**: Double quotes for JS/TS
- **Semicolons**: Always
- **Line Length**: 100 characters

### CSS Formatting

CSS files are formatted by Biome (tab indentation, 100 char lines) but Biome cannot lint CSS. lint-staged intentionally excludes CSS files from pre-commit hooks. When modifying CSS files (theme tokens, styles), run `biome check --write` manually to format.

---

## AppProvider Requirement

Every app must wrap its root layout in `<AppProvider>` from `bindrunes`:

```svelte
<script lang="ts">
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider themeDefault="editorial" aestheticDefault="minimal" densityDefault="comfortable">
  {@render children()}
</AppProvider>
```

This initializes theme resolution, dark mode (via ModeWatcher), and density. Without it, CSS custom properties won't resolve.

---

## Architecture Conventions

- **Svelte 5 Runes**: Always use `$state`, `$derived`, and `$effect`. Legacy Svelte stores are forbidden.
- **Factory Pattern**: All stateful utilities use the `createX()` composable pattern.
- **Valibot**: Validation schemas must use Valibot, not Zod.
- **Colors**: Colors must use OKLCH color custom properties. Direct hex/HSL styling is forbidden.
- **Pragmas**: Subsystem sharing uses `createMetaContext` / `useMetaContext` and `readonlyGetters`.
- **Dev Warnings**: Use `devWarning()` for development-only console output. Never use `console.warn` in production code.

---

## v2 Anti-Patterns

Avoid these patterns in v2 code:

- **Barrel imports**: Never import from `bindrunes/domains` (barrel removed). Use `bindrunes/domains/<name>` for individual domains.
- **Template imports**: Never import from `bindrunes/templates`. Templates are now in `bindrunes/layouts`.
- **Legacy APIs**: Never use `SimulatorRuntime` or `provideWindowStore`. Use `createSimulatorRuntime` and `createWindowStoreProvider` instead.
- **Console warnings**: Never use `console.warn` in library code. Use `devWarning()` for dev-only output.

---

## Export Paths

The library has 14+ export paths:

```ts
import { /* core */ } from "bindrunes";
import { /* server */ } from "bindrunes/server";
import { /* responsive */ } from "bindrunes/responsive";
import { /* motion */ } from "bindrunes/motion";
import { /* data */ } from "bindrunes/data";
import { /* forms */ } from "bindrunes/forms";
import { /* auth */ } from "bindrunes/auth";
import { /* domain */ } from "bindrunes/domains/<name>";
import { /* layouts */ } from "bindrunes/layouts";
import { /* agentic */ } from "bindrunes/agentic";
import { /* playground */ } from "bindrunes/playground";
import "bindrunes/styles/<name>.css";
import "bindrunes/i18n/<locale>.json";
import "bindrunes/tailwind";
```

---

## Adding Files

1. **Components**: Place in `src/domains/<domain>/` and export from the domain barrel. Add test files co-located next to implementation with `vitest-axe` assertions.
2. **Composables**: Place in `src/utils/` and suffix with `.svelte.ts` if runes are used. Add tests using the `mountComposable` helper.
3. **Layouts**: Place in `src/layouts/` for full-page template components. Export from `bindrunes/layouts`.
4. **Themes & Aesthetics**: Define color custom properties (`themes/`) or layout tokens (`aesthetics/`). Import styles from `bindrunes/styles/`.

---

## PR Requirements

1. Create a topic branch from `main`.
2. Ensure `lint`, `check`, and `test` passes locally.
3. **Add a changeset** for any user-facing change:
   ```bash
   bun run changeset
   ```
   Select the bump type (major/minor/patch) and write a short summary. Changesets are required for all bug fixes, features, and chores that affect the published package.
4. Open a PR with a description of the changes. Commit logs must follow Conventional Commits (e.g. `feat: ...`, `fix: ...`).

---

## Test Coverage Requirements

- **Global floor**: 80% lines/statements, 77% functions, 70% branches.
- **Agentic kernel** (`src/utils/agentic/**`, `src/types/agent.ts`): 90% lines, 88% functions, 85% branches. TDD is required for agentic code.
- Run `bun run test:coverage` to check coverage locally. CI enforces these thresholds.
- Use `vitest-axe` for all component tests: `await expectNoAxeViolations(container)`.

---

## Dependency Management

CI uses `bun install --frozen-lockfile`. Always commit `bun.lock` when adding or changing dependencies.

- Root lockfile is authoritative — never create standalone lockfiles in `examples/*/`
- To regenerate: `bun install` (without `--frozen-lockfile`)
- If CI fails with "lockfile had changes", run `bun install` and commit the updated `bun.lock`

---

## Build Order

Packages build before consumers. `turbo.json` uses `"dependsOn": ["^build"]` for cascading builds:

- `^build` — build upstream dependencies first (e.g., build bindrunes before showcase)
- `build` (no caret) — build the current package only
- Vercel workflow builds bindrunes explicitly first (`bunx turbo run build --filter=bindrunes`), then builds the showcase with `vercel build`

---

## Vercel Deployment

- Required GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- Preview deploys on PRs, production on push to `main`
- Vercel project is linked via `.vercel/project.json` (committed to repo)
- Team protection must be disabled or URL allowlisted for public access
- To set up locally: `cd examples/showcase && npx vercel link`

---

## Common Gotchas

### Svelte: Cannot split HTML elements across `{#if}` blocks

```svelte
<!-- WRONG — will fail -->
{#if condition}
  <div>
{/if}
  <span>content</span>
{#if condition}
  </div>
{/if}

<!-- CORRECT — wrap the whole element -->
{#if condition}
  <div>
    <span>content</span>
  </div>
{:else}
  <span>content</span>
{/if}
```

This matters when building virtualized lists or conditional wrappers inside component templates.
