# Testing

bindrunes v1.0+ uses vitest + @testing-library/svelte for all tests, with accessibility checks via `vitest-axe`.

## Layout

Tests live **next to the code they test** (co-located convention):

| Source | Test file |
|--------|-----------|
| `src/components/Button.svelte` | `src/components/Button.svelte.test.ts` |
| `src/utils/createForm.svelte.ts` | `src/utils/createForm.svelte.test.ts` |
| `src/utils/url.ts` | `src/utils/url.test.ts` |
| `src/styles/preset.css` | `src/styles/tokens.test.ts` |

The legacy `__tests__/` and `tests/` directories are gone.

## Naming

- **Svelte components:** `<Name>.svelte.test.ts`
- **Composables (`.svelte.ts`):** `<name>.svelte.test.ts` (lowercase, matches source)
- **Plain TS utilities:** `<name>.test.ts`
- **CSS contracts:** `tokens.test.ts` (lives in `src/styles/`)

## Helpers (`src/helpers/`)

| Helper | Purpose |
|--------|---------|
| `mount.svelte` | Internal harness used by `test-wrapper.svelte.ts` |
| `test-wrapper.svelte.ts` | `mountComposable<T>(() => T): Promise<T>` — runs a composable inside a Svelte component context |
| `axe.ts` | `expectNoAxeViolations(container)` — async a11y assertion |
| `bits-ui-mock.ts` | `mockBitsUi(opts?)` — factory returning 32 mock bits-ui primitives |
| `theme.ts` | `renderWithTheme(component, theme, props?)` — applies `data-theme` to host element |

## Patterns

### Pattern A — Component test (high-traffic, 10-20 cases)

```ts
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expectNoAxeViolations } from '../helpers/axe';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders a button element by default', () => { /* ... */ });
  // ... 8-19 more cases ...
  it('has no a11y violations', async () => {
    const { container } = render(Button, { props: { children: 'Click' } });
    await expectNoAxeViolations(container);
  });
});
```

### Pattern B — Composable test

```ts
import { mountComposable } from '../helpers/test-wrapper.svelte';
import { createForm } from './createForm.svelte';
```

### Pattern C — Theme axis test

```ts
import { renderWithTheme } from '../helpers/theme';
// renders inside a host with data-theme="..."
```

### Pattern D — Bits-ui mock

```ts
import { mockBitsUi } from '../helpers/bits-ui-mock';
vi.mock('bits-ui', () => mockBitsUi());
```

### Pattern E — CSS token contract

Tests in `src/styles/tokens.test.ts` read CSS files and assert token presence.

## Selectors

Prefer user-facing selectors: `getByRole`, `getByText`, `getByLabelText`. Use `data-testid` only as a last resort (the curated bits-ui mock uses `data-testid="bits-{name}"` because the real primitives are visually hidden and don't have stable roles in jsdom).

## Coverage

**Target:** 80% lines / 80% functions / 80% statements / 70% branches on `src/**` (excluding test files and `src/helpers/`).

**Per-file allowlist** (in `vitest.config.ts#coverage.thresholds.perFile`): `src/utils/colorConvert.ts`, `src/utils/theme-defaults.ts` if unreachable.

To see coverage locally:

```bash
bun run test:coverage      # one-shot
bun run test:watch:coverage # watch mode
```

## A11y rules disabled in `vitest-axe`

| Rule | Why |
|------|-----|
| `aria-required-children` | bits-ui primitives (Tooltip, Popover) leave ARIA children empty when collapsed |
| `aria-required-parent` | same family |
| `color-contrast` | jsdom cannot compute real color contrast; visual testing handles this |

All other axe rules are enforced.

## Adding a new test for a new component

1. Create `src/components/<Name>.svelte.test.ts` (or `src/utils/<name>.test.ts`)
2. Import the component, `render` from `@testing-library/svelte`, and `expectNoAxeViolations` from `../helpers/axe`
3. Write 3-20 `it` cases covering: default render, key props, slots, events, edge cases, a11y
4. If the component wraps a bits-ui primitive, add `vi.mock('bits-ui', () => mockBitsUi())` at the top
5. Run `bun run test src/components/<Name>.svelte.test.ts`
6. Commit

## Adding a new bits-ui mock primitive

If a new bits-ui primitive is introduced and the existing `mockBitsUi()` doesn't cover it:

1. Add the primitive name to the `primitives` array in `src/helpers/bits-ui-mock.ts`
2. Run any test that uses it to confirm the mock shape works
3. Update the `primitives` list in this doc

## CI

`.github/workflows/test.yml` runs `lint + check + test:ci` on every push to `main` and on PRs. Coverage threshold is enforced. The workflow also verifies that `bun run build` does not leak test files into `dist/`.
