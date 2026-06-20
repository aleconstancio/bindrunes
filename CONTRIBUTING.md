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

## Getting Started

```bash
git clone https://github.com/aleconstancio/bindrunes.git
cd bindrunes
bun install
```

---

## Daily Commands

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

---

## Adding Files

1. **Components**: Place in `src/components/` and export from `src/index.ts`. Add test files co-located next to implementation with `vitest-axe` assertions. Update `docs/components.md`.
2. **Composables**: Place in `src/utils/` and suffix with `.svelte.ts` if runes are used. Add tests using the `mountComposable` helper. Update `docs/composables.md`.
3. **Themes & Aesthetics**: Define color custom properties (`themes/`) or layout tokens (`aesthetics/`). Update `docs/design-system.md`.

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
