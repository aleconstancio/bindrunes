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

---

## Style Guidelines

We use **Biome** for style and quality checking:
- **Indentation**: Tabs
- **Quotes**: Double quotes for JS/TS
- **Semicolons**: Always
- **Line Length**: 100 characters

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

v2 has exactly 7 export paths:

```ts
import { /* core */ } from "bindrunes";
import { /* layouts */ } from "bindrunes/layouts";
import { /* domain */ } from "bindrunes/domains/<name>";
import { /* agentic */ } from "bindrunes/agentic";
import { /* tailwind */ } from "bindrunes/tailwind";
import "bindrunes/styles/<name>.css";
import "bindrunes/i18n/<locale>.json";
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
