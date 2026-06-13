# Contributing to bindrunes

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
3. Open a PR with a description of the changes. Commit logs must follow Conventional Commits (e.g. `feat: ...`, `fix: ...`).
