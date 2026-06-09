# Contributing to bindrunes

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/aleconstancio/bindrunes.git
cd bindrunes
bun install
```

## Daily Commands

| Command | What it does |
|---------|-------------|
| `bun run build` | Build the package via `svelte-package` |
| `bun run check` | Type-check with `tsc --noEmit` |
| `bun run test` | Run all tests |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Lint and auto-fix |

## Code Style

We use **Biome** for formatting and linting. Key conventions:

- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for JS/TS
- **Semicolons**: Always
- **Line width**: 100 characters
- Run `bun run lint:fix` before committing

## Architecture Rules

See [`.agent/AGENTS.md`](.agent/AGENTS.md) for the full list. Summary:

- **Svelte 5 runes only** — `$state`, `$derived`, `$effect`. No legacy stores, no `export let`.
- **`createX()` pattern** — all composables follow this factory pattern.
- **Valibot for validation** — not Zod.
- **OKLCH color space** — all theme colors use OKLCH.
- **bits-ui for accessible primitives** — we wrap bits-ui, not re-implement.
- **No hardcoded colors** — always use CSS custom properties.
- **No `thoth-` prefix** — retired in v1.0.
- **No `text-sm`/`text-xs`/`text-lg`** — use the 17-step type scale tokens.

## Token Rules

- **Color tokens** → theme layer only. Never touch form.
- **Form tokens** (radius, shadow, motion) → aesthetic layer only. Never touch color.
- **Spacing tokens** (`--space-*`) → density layer only. Never touch color or form.

## File Organization

- **Components**: `src/components/<Name>.svelte`
- **Composables**: `src/utils/<name>.svelte.ts` (use `.svelte.ts` for files with runes)
- **Tests**: Co-located next to source — `src/components/<Name>.svelte.test.ts`
- **Styles**: `src/styles/themes/`, `src/styles/aesthetics/`
- **Landing**: `src/components/landing/`

## Adding a Component

1. Create `src/components/Name.svelte`
2. Export from `src/index.ts`
3. Create `src/components/Name.svelte.test.ts` with 3-20 test cases
4. Include an a11y assertion: `await expectNoAxeViolations(container)`
5. If wrapping bits-ui, add `vi.mock('bits-ui', () => mockBitsUi())` at the top
6. Update `docs/components.md` with the new component

## Adding a Composable

1. Create `src/utils/createThing.svelte.ts` (use `.svelte.ts` if using runes)
2. Export from `src/index.ts`
3. Create `src/utils/createThing.svelte.test.ts`
4. Use `mountComposable` from `src/helpers/test-wrapper.svelte.ts` for testing
5. Update `docs/composables.md` with the new composable

## Adding a Theme

1. Create `src/styles/themes/name.css` with `[data-theme="name"]` selector
2. Define all color tokens (see `editorial.css` for reference)
3. Add legacy forwarding in `src/styles/themes/legacy/` if replacing an old theme
4. Update `docs/themes.md`

## Adding an Aesthetic

1. Create `src/styles/aesthetics/name.css` with `[data-aesthetic="name"]` selector
2. Override radius, shadow, motion, and aesthetic hook tokens
3. Update `docs/aesthetics.md`

## Pull Request Guidelines

1. Create a feature branch from `main`
2. Make your changes following the conventions above
3. Run `bun run lint && bun run check && bun run test` — all must pass
4. Write a clear commit message describing the change
5. Open a PR with a description of what changed and why
6. If it's a breaking change, update `docs/migration.md`

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add RatingGroup component`
- `fix: resolve Input a11y bug with label association`
- `docs: expand composables.md with useBreakpoint`
- `refactor: extract sidebar context to separate file`
- `test: add a11y tests for Dialog component`

## Questions?

Open an issue or start a discussion on GitHub.
