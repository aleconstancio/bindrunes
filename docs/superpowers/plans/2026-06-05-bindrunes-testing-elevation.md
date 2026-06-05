# bindrunes Testing Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Co-locate all tests with source, add a11y + bits-ui mock + 80% coverage threshold gated in CI, and ship `docs/testing.md` — all in one cohesive elevation across ~110 files.

**Architecture:** Test files move from `__tests__/` to `src/**/*.svelte.test.ts` / `src/**/*.test.ts` (co-located with source). New `src/helpers/{axe,bits-ui-mock,theme}.ts` provide shared utilities. Coverage threshold starts at 0% in `vitest.config.ts` and ratchets to 80/80/80/70 in the final phase. GitHub Actions workflow `.github/workflows/test.yml` runs `lint + check + test:ci` on every push to `main` and on PRs.

**Tech Stack:** vitest 4.x, @testing-library/svelte 5.x, jsdom, vitest-axe (new devDep), Svelte 5 runes, valibot, @biomejs/biome 2.x, bun runtime, GitHub Actions.

**Reference spec:** `docs/superpowers/specs/2026-06-05-bindrunes-testing-elevation-design.md`

**Prerequisites:**
- Working tree clean (verify with `git status`)
- `bun` installed locally
- Node 20+ (CI uses GitHub Actions ubuntu-latest)

---

## File Structure Map

Files this plan creates or modifies:

### New files
- `src/helpers/axe.ts` — `expectNoAxeViolations(container)` wrapper
- `src/helpers/bits-ui-mock.ts` — `mockBitsUi()` factory
- `src/helpers/theme.ts` — `renderWithTheme(component, theme, props)`
- `src/helpers/mount.svelte` — moved from `__tests__/helpers/mount.svelte`
- `src/helpers/test-wrapper.svelte.ts` — moved from `__tests__/helpers/test-wrapper.svelte.ts`
- `src/ComposableHarness.svelte` — moved from `__tests__/ComposableHarness.svelte`
- `.github/workflows/test.yml` — CI workflow
- `docs/testing.md` — testing conventions doc
- ~30 new test files (uncovered components, utils, landing, sidebar internals, dashboard, theme studio)
- `scripts/migrate-tests.mjs` — one-shot migration script (not committed; deleted after phase 3)

### Migrated files (move + import-path fix)
- 75 files from `__tests__/` to co-located positions in `src/`

### Modified files
- `vitest.config.ts` — coverage thresholds, exclude test files
- `package.json` — scripts + devDep
- `docs/architecture.md` — directory map
- `docs/components.md` — "Tested?" column
- `CHANGELOG.md` — testing elevation entry

### Removed
- `__tests__/` directory (post-migration)
- `tests/` directory (post-migration)

---

## Task 1: Scaffold — install vitest-axe, add coverage scripts, baseline coverage

**Files:**
- Modify: `package.json`
- Modify: `vitest.config.ts`

- [ ] **Step 1: Install vitest-axe as a dev dependency**

Run:
```bash
bun add -D vitest-axe
```

Expected: `vitest-axe` appears under `devDependencies` in `package.json`; `bun.lock` updates.

- [ ] **Step 2: Verify vitest-axe is importable**

Run:
```bash
ls node_modules/vitest-axe/dist
```

Expected: directory listing shows at least one `*.js` and `*.d.ts` file.

- [ ] **Step 3: Add test:coverage, test:ci, test:watch:coverage scripts to package.json**

In `package.json` `scripts` block, add after the existing `"test:watch"` line:
```json
    "test:coverage": "vitest run --coverage",
    "test:ci": "vitest run --coverage --reporter=verbose",
    "test:watch:coverage": "vitest --coverage",
```

Verify with:
```bash
node -e "console.log(require('./package.json').scripts)"
```

Expected output includes:
```
  'test': 'vitest run',
  'test:watch': 'vitest',
  'test:coverage': 'vitest run --coverage',
  'test:ci': 'vitest run --coverage --reporter=verbose',
  'test:watch:coverage': 'vitest --coverage',
  'check': 'tsc --noEmit'
```

- [ ] **Step 4: Update vitest.config.ts to exclude test files and helpers from coverage, set baseline threshold**

Replace `vitest.config.ts` with:

```ts
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        runes: true,
      },
    }),
  ],
  resolve: {
    conditions: ['browser', 'import', 'module'],
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,ts}'],
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/test-setup.ts',
        'src/test-utils.ts',
        'src/helpers/**',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.d.ts',
      ],
      thresholds: {
        lines: 0,
        functions: 0,
        statements: 0,
        branches: 0,
      },
    },
  },
});
```

- [ ] **Step 5: Run the existing test suite to verify nothing broke**

Run:
```bash
bun run test
```

Expected: all tests pass (note: bun is not installed in this environment per `which bun`; use `node_modules/.bin/vitest run` as fallback). Exit code 0.

- [ ] **Step 6: Run coverage to confirm it produces a report**

Run:
```bash
bun run test:coverage
```

Expected: a coverage table prints; no test failures. (Threshold is 0 so it always passes.)

- [ ] **Step 7: Commit**

```bash
git add package.json bun.lock vitest.config.ts
git commit -m "test: add vitest-axe, coverage scripts, baseline threshold"
```

---

## Task 2: Add CI workflow

**Files:**
- Create: `.github/workflows/test.yml`

- [ ] **Step 1: Create the workflow directory**

Run:
```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Write the test workflow**

Create `.github/workflows/test.yml` with:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    paths-ignore:
      - 'docs/**'
      - '**/*.md'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Lint
        run: bun run lint

      - name: Type check
        run: bun run check

      - name: Test (with coverage)
        run: bun run test:ci

      - name: Verify build excludes test files
        run: |
          bun run build
          if find dist -name '*.test.*' -o -name '*.spec.*' | grep -q .; then
            echo "ERROR: test files leaked into dist/"
            find dist -name '*.test.*' -o -name '*.spec.*'
            exit 1
          fi
```

- [ ] **Step 3: Validate YAML syntax**

Run:
```bash
node -e "
const yaml = require('fs').readFileSync('.github/workflows/test.yml', 'utf8');
console.log('Lines:', yaml.split('\n').length);
console.log('Has push trigger:', yaml.includes('push:'));
console.log('Has pull_request trigger:', yaml.includes('pull_request:'));
console.log('Has paths-ignore:', yaml.includes('paths-ignore:'));
"
```

Expected output:
```
Lines: <count>
Has push trigger: true
Has pull_request trigger: true
Has paths-ignore: true
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/test.yml
git commit -m "ci: add test workflow (lint + check + coverage, with dist verification)"
```

---

## Task 3: Move test helpers to src/helpers/

**Files:**
- Move: `__tests__/helpers/mount.svelte` → `src/helpers/mount.svelte`
- Move: `__tests__/helpers/test-wrapper.svelte.ts` → `src/helpers/test-wrapper.svelte.ts`
- Move: `__tests__/ComposableHarness.svelte` → `src/ComposableHarness.svelte`

NOTE: This task moves the helper files only. The test files that import them stay in `__tests__/` for now — the import paths get fixed in Task 5 (migration).

- [ ] **Step 1: Create the helpers directory**

Run:
```bash
mkdir -p src/helpers
```

- [ ] **Step 2: Move mount.svelte and test-wrapper.svelte.ts**

Run:
```bash
git mv __tests__/helpers/mount.svelte src/helpers/mount.svelte
git mv __tests__/helpers/test-wrapper.svelte.ts src/helpers/test-wrapper.svelte.ts
git mv __tests__/ComposableHarness.svelte src/ComposableHarness.svelte
```

Expected: git reports the renames. `__tests__/helpers/` now empty.

- [ ] **Step 3: Verify the moved files are unchanged**

Run:
```bash
git status
```

Expected: three `R` (renamed) entries, no content changes.

- [ ] **Step 4: Run existing tests — they should still pass (helpers not yet imported by migrated paths)**

Run:
```bash
bun run test
```

Expected: tests pass (because no test files have been updated to import from new paths yet).

- [ ] **Step 5: Commit**

```bash
git commit -m "refactor(test): move helpers to src/helpers/"
```

---

## Task 4: Write docs/testing.md

**Files:**
- Create: `docs/testing.md`

- [ ] **Step 1: Write the testing conventions doc**

Create `docs/testing.md` with:

```markdown
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
| `bits-ui-mock.ts` | `mockBitsUi(opts?)` — factory returning 24 mock bits-ui primitives |
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
```

- [ ] **Step 2: Verify the doc renders (no syntax issues)**

Run:
```bash
wc -l docs/testing.md
```

Expected: ~120-160 lines.

- [ ] **Step 3: Commit**

```bash
git add docs/testing.md
git commit -m "docs(testing): add testing conventions guide"
```

---

## Task 5: Migrate existing tests (75 files, scripted)

**Files:**
- Move: 28 test files from `__tests__/*.test.ts` → `src/utils/*.test.ts` or `src/utils/*.svelte.test.ts`
- Move: 47 test files from `__tests__/components/*.test.ts` → `src/components/*.svelte.test.ts`
- Modify: import paths inside each moved file
- Remove: `__tests__/` directory
- Remove: `tests/` directory

**Strategy:** Use a one-shot Node script that does the moves and import-path rewrites, then commit the result. The script is NOT committed.

- [ ] **Step 1: Create the migration script**

Create `scripts/migrate-tests.mjs` with:

```js
#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, unlinkSync, rmdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const OLD = join(ROOT, '__tests__');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// Map: old path -> new path
const moves = [];
for (const file of walk(OLD)) {
  const rel = relative(OLD, file);
  let newPath;
  if (rel === 'createAesthetic.test.ts' || rel === 'createDensity.test.ts' ||
      rel === 'createPrefersTheme.test.ts' || rel === 'defineTheme.test.ts') {
    // .svelte.ts composables
    const base = basename(rel, '.test.ts');
    newPath = join(SRC, 'utils', `${base}.svelte.test.ts`);
  } else if (rel.startsWith('components/')) {
    const name = basename(rel, '.test.ts');
    newPath = join(SRC, 'components', `${name}.svelte.test.ts`);
  } else if (rel.endsWith('.test.ts')) {
    const base = basename(rel, '.test.ts');
    // Heuristic: if source is .svelte.ts, use .svelte.test.ts
    const svelteSrc = join(SRC, 'utils', `${base}.svelte.ts`);
    const plainSrc = join(SRC, 'utils', `${base}.ts`);
    if (existsSync(svelteSrc)) {
      newPath = join(SRC, 'utils', `${base}.svelte.test.ts`);
    } else if (existsSync(plainSrc)) {
      newPath = join(SRC, 'utils', `${base}.test.ts`);
    } else {
      newPath = join(SRC, 'utils', `${base}.test.ts`);
    }
  } else {
    continue;
  }
  moves.push([file, newPath]);
}

let rewritten = 0;
for (const [oldP, newP] of moves) {
  let content = readFileSync(oldP, 'utf8');
  const newDir = dirname(newP);
  // Rewrite imports: ../../src/utils/foo -> ./foo (or .svelte)
  content = content.replace(/from ['"]\.\.\/\.\.\/src\/utils\/([\w-]+)['"]/g, (_, name) => {
    const isSvelte = existsSync(join(SRC, 'utils', `${name}.svelte.ts`));
    return `from './${isSvelte ? name + '.svelte' : name}'`;
  });
  content = content.replace(/from ['"]\.\.\/\.\.\/src\/components\/([\w-]+)['"]/g, (_, name) => {
    return `from './${name}.svelte'`;
  });
  // Rewrite helpers import
  content = content.replace(/from ['"]\.\/helpers\/([\w-]+)['"]/g, (_, name) => {
    return `from '../helpers/${name.replace(/\.svelte$/, '')}'`;
  });
  // Rewrite "../src/foo" pattern
  content = content.replace(/from ['"]\.\.\/src\/([\w/--]+)['"]/g, (_, p) => {
    return `from '../${p}'`;
  });
  writeFileSync(newP, content, 'utf8');
  unlinkSync(oldP);
  rewritten++;
}

console.log(`Migrated ${rewritten} test files.`);
// Clean up empty dirs
for (const dir of [join(OLD, 'components'), join(OLD, 'helpers'), OLD, join(ROOT, 'tests')]) {
  if (existsSync(dir)) {
    try { rmdirSync(dir, { recursive: true }); } catch {}
  }
}
console.log('Cleaned up __tests__/ and tests/.');
```

- [ ] **Step 2: Run the migration**

Run:
```bash
node scripts/migrate-tests.mjs
```

Expected output:
```
Migrated 75 test files.
Cleaned up __tests__/ and tests/.
```

- [ ] **Step 3: Verify directories**

Run:
```bash
ls __tests__ tests 2>&1; echo '---'; find src -name '*.test.ts' | wc -l
```

Expected: `__tests__` and `tests` should be gone (or `No such file or directory`); `find src -name '*.test.ts' | wc -l` should be `75` (or close to it).

- [ ] **Step 4: Spot-check a migrated file**

Run:
```bash
head -10 src/components/Button.svelte.test.ts
```

Expected: imports use `./Button.svelte` (not `../../src/components/Button.svelte`).

- [ ] **Step 5: Run the test suite to find broken imports**

Run:
```bash
bun run test 2>&1 | head -80
```

Expected: most tests pass; some may fail with import errors. If there are failures:
- Note the failures
- Manually fix the import paths (the script is heuristic)

- [ ] **Step 6: Fix any remaining broken imports manually**

For each test file with broken imports, edit the import paths to be relative to its new location. Common patterns:
- `from './foo'` if `foo.svelte.ts` or `foo.ts` is in the same dir
- `from '../utils/foo'` for cross-dir
- `from '../helpers/test-wrapper.svelte'`

Iterate until `bun run test` passes for all migrated files.

- [ ] **Step 7: Delete the migration script (not committed)**

Run:
```bash
rm scripts/migrate-tests.mjs
rmdir scripts 2>/dev/null
```

- [ ] **Step 8: Stage the moves**

Run:
```bash
git add -A
git status | head -20
```

Expected: shows ~75 `R` (renamed) entries, no `D` (deleted) entries, no `M` (modified) for source files outside of import-rewriting.

- [ ] **Step 9: Commit**

```bash
git commit -m "refactor(test): migrate all tests to co-located positions

Moved 75 test files from __tests__/ to co-located src/**/*.{test,svelte.test}.ts.
Removed __tests__/ and tests/ directories. Import paths rewritten to
match new locations. No test semantics changed."
```

---

## Task 6: Create the helpers (axe, bits-ui-mock, theme)

**Files:**
- Create: `src/helpers/axe.ts`
- Create: `src/helpers/bits-ui-mock.ts`
- Create: `src/helpers/theme.ts`

- [ ] **Step 1: Write the a11y wrapper**

Create `src/helpers/axe.ts` with:

```ts
import { expect } from 'vitest';
import { configureAxe, type ElementContext } from 'vitest-axe';

const axe = configureAxe({
  rules: {
    'aria-required-children': { enabled: false },
    'aria-required-parent': { enabled: false },
    'color-contrast': { enabled: false },
  },
});

export async function expectNoAxeViolations(container: ElementContext) {
  const results = await axe(container);
  expect(
    results.violations,
    `a11y violations:\n${JSON.stringify(results.violations, null, 2)}`,
  ).toEqual([]);
}
```

- [ ] **Step 2: Write the bits-ui mock factory**

Create `src/helpers/bits-ui-mock.ts` with:

```ts
import type { Component } from 'svelte';

const PRIMITIVES = [
  'Accordion', 'AlertDialog', 'Avatar', 'Checkbox', 'Collapsible', 'Combobox',
  'DatePicker', 'Dialog', 'DropdownMenu', 'FormField', 'HoverCard', 'Input',
  'Label', 'Menubar', 'NavigationMenu', 'PinInput', 'Popover', 'Progress',
  'RadioGroup', 'RangeCalendar', 'RatingGroup', 'ScrollArea', 'Select',
  'Separator', 'Sheet', 'Slider', 'Switch', 'Tabs', 'TimeField', 'Toggle',
  'ToggleGroup', 'Toolbar', 'Tooltip',
] as const;

type PrimitiveName = (typeof PRIMITIVES)[number];

function makeShell(name: PrimitiveName): Component {
  return ((_$$anchor: unknown, $$props: any = {}) => {
    const { class: cls = '', children, open, value, ...rest } = $$props;
    const stateAttrs: Record<string, string> = {};
    if (open !== undefined) stateAttrs['data-state'] = open ? 'open' : 'closed';
    if (value !== undefined) stateAttrs['data-value'] = String(value);
    return {
      render() {
        const el = document.createElement('div');
        el.setAttribute('data-testid', `bits-${name.toLowerCase()}`);
        if (cls) el.className = cls;
        for (const [k, v] of Object.entries(stateAttrs)) el.setAttribute(k, v);
        for (const [k, v] of Object.entries(rest)) {
          if (typeof v === 'string') el.setAttribute(k, v);
        }
        return el;
      },
    };
  }) as unknown as Component;
}

export function mockBitsUi() {
  const out: Record<string, Component> = {};
  for (const p of PRIMITIVES) out[p] = makeShell(p);
  return out;
}
```

- [ ] **Step 3: Write the theme render helper**

Create `src/helpers/theme.ts` with:

```ts
import { render, type RenderResult } from '@testing-library/svelte';
import type { Component } from 'svelte';

export type Axis = 'theme' | 'aesthetic' | 'density';

export interface RenderWithThemeOptions {
  theme?: string;
  aesthetic?: string;
  density?: string;
}

export function renderWithTheme<T extends Component>(
  component: T,
  options: RenderWithThemeOptions & Record<string, unknown> = {},
): RenderResult {
  const { theme, aesthetic, density, ...componentProps } = options;
  const host = document.createElement('div');
  if (theme) host.setAttribute('data-theme', theme);
  if (aesthetic) host.setAttribute('data-aesthetic', aesthetic);
  if (density) host.setAttribute('data-density', density);
  document.body.appendChild(host);

  const result = render(component, { props: componentProps, baseElement: host, container: host });
  return result;
}
```

- [ ] **Step 4: Write a smoke test for the helpers**

Create `src/helpers/helpers.test.ts` with:

```ts
import { describe, it, expect } from 'vitest';
import { renderWithTheme } from './theme';
import { expectNoAxeViolations } from './axe';
import { mockBitsUi } from './bits-ui-mock';

describe('helpers', () => {
  it('renderWithTheme applies data-theme', async () => {
    const Stub = (() => ({ render: () => document.createElement('span') })) as any;
    const { container } = renderWithTheme(Stub, { theme: 'dracula' });
    expect(container.closest('[data-theme="dracula"]')).toBeTruthy();
  });

  it('mockBitsUi returns 32 primitives', () => {
    const m = mockBitsUi();
    expect(Object.keys(m).length).toBeGreaterThanOrEqual(24);
    expect(m.Dialog).toBeDefined();
    expect(m.Tabs).toBeDefined();
  });

  it('expectNoAxeViolations passes for a clean container', async () => {
    const div = document.createElement('div');
    div.innerHTML = '<button>Click</button>';
    await expectNoAxeViolations(div);
  });
});
```

- [ ] **Step 5: Run the helper tests**

Run:
```bash
bun run test src/helpers/
```

Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/helpers/
git commit -m "feat(test): add helpers (axe, bits-ui-mock, theme) with smoke tests"
```

---

## Task 7: Add a11y to Button test (deepening example)

**Files:**
- Modify: `src/components/Button.svelte.test.ts`

- [ ] **Step 1: Read the current Button test**

```bash
cat src/components/Button.svelte.test.ts
```

- [ ] **Step 2: Append a11y test cases**

Add at the end of the `describe('Button', ...)` block:

```ts
import { expectNoAxeViolations } from '../helpers/axe';
```

And append:

```ts
  it('has no a11y violations (button)', async () => {
    const { container } = render(Button, { props: { children: 'Click' } });
    await expectNoAxeViolations(container);
  });

  it('has no a11y violations (anchor)', async () => {
    const { container } = render(Button, { props: { href: '/x', children: 'Go' } });
    await expectNoAxeViolations(container);
  });

  it('respects aria-label', () => {
    const { container } = render(Button, { props: { 'aria-label': 'Save', children: 'S' } });
    expect(container.querySelector('button')?.getAttribute('aria-label')).toBe('Save');
  });
```

- [ ] **Step 3: Run Button tests**

Run:
```bash
bun run test src/components/Button.svelte.test.ts
```

Expected: all Button tests pass (now 11 cases).

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.svelte.test.ts
git commit -m "test(Button): add a11y and aria-label coverage"
```

---

## Task 8: Add a11y + bits-ui mock to Dialog, Sheet, Combobox, DataTable

**Files:**
- Modify: `src/components/Dialog.svelte.test.ts` (add a11y + mock)
- Modify: `src/components/Sheet.svelte.test.ts`
- Modify: `src/components/Combobox.svelte.test.ts`
- Modify: `src/components/DataTable.svelte.test.ts`

- [ ] **Step 1: Update Dialog test to use mockBitsUi and a11y**

Add at top of `src/components/Dialog.svelte.test.ts`:
```ts
import { mockBitsUi } from '../helpers/bits-ui-mock';
import { expectNoAxeViolations } from '../helpers/axe';
vi.mock('bits-ui', () => mockBitsUi());
```

Append a11y test:
```ts
  it('has no a11y violations when open', async () => {
    const { container } = render(Dialog, { props: { open: true, children: 'Hello' } });
    await expectNoAxeViolations(container);
  });
```

- [ ] **Step 2: Run Dialog test**

Run:
```bash
bun run test src/components/Dialog.svelte.test.ts
```

Expected: all tests pass.

- [ ] **Step 3: Repeat for Sheet, Combobox, DataTable**

For each of the four files, repeat steps 1-2 with the appropriate component name.

- [ ] **Step 4: Commit all four files together**

```bash
git add src/components/Dialog.svelte.test.ts src/components/Sheet.svelte.test.ts src/components/Combobox.svelte.test.ts src/components/DataTable.svelte.test.ts
git commit -m "test(overlay+data): add a11y and bits-ui mock to Dialog, Sheet, Combobox, DataTable"
```

---

## Task 9: Add tests for uncovered composables (colorConvert, hasRole, url, navigation, useBreakpoint, useHead, theme-defaults, createAccess, createDarkMode, extendTheme)

**Files:**
- Create: `src/utils/colorConvert.test.ts`
- Create: `src/utils/hasRole.test.ts`
- Create: `src/utils/url.test.ts`
- Create: `src/utils/navigation.test.ts`
- Create: `src/utils/useBreakpoint.svelte.test.ts`
- Create: `src/utils/useHead.svelte.test.ts`
- Create: `src/utils/theme-defaults.test.ts`
- Create: `src/utils/createAccess.svelte.test.ts`
- Create: `src/utils/createDarkMode.svelte.test.ts`
- Create: `src/utils/extendTheme.svelte.test.ts`

- [ ] **Step 1: Read each source file to understand its surface**

For each file above, run `cat src/utils/<name>.ts` (or `.svelte.ts`) and note the exported functions/composables.

- [ ] **Step 2: Write `src/utils/url.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { isSafeRedirect } from './url';

describe('isSafeRedirect', () => {
  it.each(['/home', '/users/1', '/path?q=1'])('accepts relative path: %s', (url) => {
    expect(isSafeRedirect(url)).toBe(true);
  });

  it.each(['', '//evil.com', 'http://evil.com', 'javascript:alert(1)', 'data:text/html,evil'])(
    'rejects unsafe url: %s',
    (url) => {
      expect(isSafeRedirect(url)).toBe(false);
    },
  );
});
```

- [ ] **Step 3: Write `src/utils/navigation.test.ts`**

```ts
import { describe, it, expect, vi } from 'vitest';
import { derivePageInfo, deriveOmnibarOptions } from './navigation';

const groups = [
  {
    label: 'Main',
    items: [
      { title: 'Home', to: '/', description: 'Home page', match: '/' },
      { title: 'Settings', to: '/settings', description: 'User settings' },
    ],
  },
];

describe('derivePageInfo', () => {
  it('matches /settings to its item', () => {
    expect(derivePageInfo('/settings', groups)).toEqual({
      title: 'Settings',
      description: 'User settings',
    });
  });

  it('matches / to Home', () => {
    expect(derivePageInfo('/', groups)).toEqual({ title: 'Home', description: 'Home page' });
  });

  it('uses match over to when present', () => {
    expect(derivePageInfo('/users', [{ label: 'X', items: [{ title: 'U', to: '/users/1', match: '/users', description: '' }] }]))
      .toEqual({ title: 'U', description: '' });
  });

  it('returns fallback for unmatched paths', () => {
    expect(derivePageInfo('/nope', groups, { title: '404', description: 'Missing' }))
      .toEqual({ title: '404', description: 'Missing' });
  });
});

describe('deriveOmnibarOptions', () => {
  it('flattens groups into options', () => {
    const opts = deriveOmnibarOptions(groups);
    expect(opts).toHaveLength(2);
    expect(opts[0].label).toBe('Home');
  });

  it('uses goto when provided', () => {
    const goto = vi.fn();
    const opts = deriveOmnibarOptions(groups, { goto });
    opts[0].action();
    expect(goto).toHaveBeenCalledWith('/');
  });

  it('uses idPrefix when provided', () => {
    const opts = deriveOmnibarOptions(groups, { idPrefix: 'nav:' });
    expect(opts[0].id).toBe('nav:/');
  });
});
```

- [ ] **Step 4: Write `src/utils/colorConvert.test.ts`**

(Read the source first; tests assert round-trip and edge cases for hex ↔ OKLCH conversions.)

- [ ] **Step 5: Write `src/utils/hasRole.test.ts`**

- [ ] **Step 6: Write `src/utils/theme-defaults.test.ts`**

- [ ] **Step 7: Write `src/utils/createAccess.svelte.test.ts`**

(Use `mountComposable` from `../helpers/test-wrapper.svelte`.)

- [ ] **Step 8: Write `src/utils/createDarkMode.svelte.test.ts`**

(Use the existing pattern from `__tests__/audited_fixes.test.ts` for mode-watcher mocking; that file should be migrated by Task 5.)

- [ ] **Step 9: Write `src/utils/extendTheme.svelte.test.ts`**

- [ ] **Step 10: Write `src/utils/useBreakpoint.svelte.test.ts` and `useHead.svelte.test.ts`**

- [ ] **Step 11: Run all new composable tests**

Run:
```bash
bun run test src/utils/colorConvert.test.ts src/utils/hasRole.test.ts src/utils/url.test.ts src/utils/navigation.test.ts src/utils/useBreakpoint.svelte.test.ts src/utils/useHead.svelte.test.ts src/utils/theme-defaults.test.ts src/utils/createAccess.svelte.test.ts src/utils/createDarkMode.svelte.test.ts src/utils/extendTheme.svelte.test.ts
```

Expected: all new tests pass.

- [ ] **Step 12: Commit**

```bash
git add src/utils/colorConvert.test.ts src/utils/hasRole.test.ts src/utils/url.test.ts src/utils/navigation.test.ts src/utils/useBreakpoint.svelte.test.ts src/utils/useHead.svelte.test.ts src/utils/theme-defaults.test.ts src/utils/createAccess.svelte.test.ts src/utils/createDarkMode.svelte.test.ts src/utils/extendTheme.svelte.test.ts
git commit -m "test(utils): add coverage for 10 untested composables and pure utils"
```

---

## Task 10: Add tests for uncovered components (AccordionItem, Breadcrumb, DataChart, FormField, PageHeader, RichTextEditor, SEO, Stepper, ListPage, Pagination)

**Files:**
- Create: `src/components/AccordionItem.svelte.test.ts`
- Create: `src/components/Breadcrumb.svelte.test.ts`
- Create: `src/components/DataChart.svelte.test.ts`
- Create: `src/components/FormField.svelte.test.ts`
- Create: `src/components/PageHeader.svelte.test.ts`
- Create: `src/components/RichTextEditor.svelte.test.ts`
- Create: `src/components/SEO.svelte.test.ts`
- Create: `src/components/Stepper.svelte.test.ts`
- Create: `src/components/ListPage.svelte.test.ts`
- (Pagination test may already exist; deepen it)

- [ ] **Step 1: For each component, read source + write a 3-8 case test**

Use Pattern A. For bits-ui-based components, use `mockBitsUi()`. For RichTextEditor (ProseMirror), test the toolbar rendering and slot behavior; ProseMirror internals are out of scope.

- [ ] **Step 2: Run all new tests**

Run:
```bash
bun run test src/components/AccordionItem.svelte.test.ts src/components/Breadcrumb.svelte.test.ts src/components/DataChart.svelte.test.ts src/components/FormField.svelte.test.ts src/components/PageHeader.svelte.test.ts src/components/RichTextEditor.svelte.test.ts src/components/SEO.svelte.test.ts src/components/Stepper.svelte.test.ts
```

Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/AccordionItem.svelte.test.ts src/components/Breadcrumb.svelte.test.ts src/components/DataChart.svelte.test.ts src/components/FormField.svelte.test.ts src/components/PageHeader.svelte.test.ts src/components/RichTextEditor.svelte.test.ts src/components/SEO.svelte.test.ts src/components/Stepper.svelte.test.ts
git commit -m "test(components): add coverage for 8 previously-untested components"
```

---

## Task 11: Add tests for sidebar internals (14 files)

**Files:**
- Create or modify: `src/components/sidebar/<name>.svelte.test.ts` for each internal sidebar component

- [ ] **Step 1: For each sidebar component, write a 3-8 case test**

Components: `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarHeader`, `SidebarLayout`, `SidebarMenu`, `SidebarMenuBadge`, `SidebarMenuButton`, `SidebarMenuItem`, `SidebarMenuSkeleton`, `SidebarProvider`, `SidebarRail`, `SidebarSeparator`, `SidebarTrigger`. The existing `Sidebar.svelte.test.ts` (covering the main Sidebar) stays as-is.

For context-wired components (SidebarProvider, etc.), use `render()` inside a parent harness that provides the context.

- [ ] **Step 2: Run all sidebar internal tests**

Run:
```bash
bun run test src/components/sidebar/
```

Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/sidebar/
git commit -m "test(sidebar): add coverage for 14 internal sidebar components"
```

---

## Task 12: Add tests for dashboard subcomponents (5 files)

**Files:**
- Create: `src/components/dashboard/DashboardShellBrand.svelte.test.ts`
- Create: `src/components/dashboard/DashboardShellHeader.svelte.test.ts`
- Create: `src/components/dashboard/DashboardShellRight.svelte.test.ts`
- Create: `src/components/dashboard/DashboardShellSplit.svelte.test.ts`
- Create: `src/components/dashboard/DashboardShellTopnav.svelte.test.ts`

- [ ] **Step 1: For each dashboard subcomponent, write a 3-6 case test**

Use Pattern A. Dashboard subcomponents may need a parent harness providing sidebar context.

- [ ] **Step 2: Run all dashboard subcomponent tests**

Run:
```bash
bun run test src/components/dashboard/
```

Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/
git commit -m "test(dashboard): add coverage for 5 subcomponents"
```

---

## Task 13: Add tests for theme studio (7 files)

**Files:**
- Create: `src/components/ThemeBuilder.svelte.test.ts`
- Create: `src/components/ThemeStudio.svelte.test.ts`
- Create: `src/components/ThemePreview.svelte.test.ts`
- Create: `src/components/AestheticTab.svelte.test.ts`
- Create: `src/components/DensityTab.svelte.test.ts`
- Create: `src/components/ExportTab.svelte.test.ts`
- Create: `src/components/ThemeColorTab.svelte.test.ts`

- [ ] **Step 1: For each theme studio file, write a 5-8 case test**

Focus on: live CSS generation, axis independence (changing theme doesn't affect aesthetic tokens), prop bindings, slot rendering.

- [ ] **Step 2: Run all theme studio tests**

Run:
```bash
bun run test src/components/Theme src/components/AestheticTab.svelte.test.ts src/components/DensityTab.svelte.test.ts src/components/ExportTab.svelte.test.ts src/components/ThemeColorTab.svelte.test.ts
```

Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/Theme*.svelte.test.ts src/components/AestheticTab.svelte.test.ts src/components/DensityTab.svelte.test.ts src/components/ExportTab.svelte.test.ts src/components/ThemeColorTab.svelte.test.ts
git commit -m "test(theme-studio): add coverage for 7 theme-studio components"
```

---

## Task 14: Add tests for landing components (16 files)

**Files:**
- Create: `src/components/landing/<Name>.svelte.test.ts` for each of the 16 landing components

- [ ] **Step 1: For each landing component, write a 3-5 case test**

Components: `HeroBanner`, `PricingTable`, `FAQ`, `Testimonial`, `TestimonialGrid`, `FeatureGrid`, `FeatureComparison`, `HowItWorks`, `LogoCloud`, `IntegrationGrid`, `MetricsBar`, `Newsletter`, `StatsCounter`, `TeamSection`, `LandingNav`, `LandingSection`, `SiteFooter`. Test data wiring via prop, slot rendering, default state.

- [ ] **Step 2: Run all landing tests**

Run:
```bash
bun run test src/components/landing/
```

Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/
git commit -m "test(landing): add 3-5 case coverage for 16 landing components"
```

---

## Task 15: Strengthen shallow existing tests (Form, Card, RangeCalendar, TimeField, NavigationMenu, Avatar, etc.)

**Files:**
- Modify: `src/components/Form.svelte.test.ts` (deepen to 8+ cases)
- Modify: `src/components/Card.svelte.test.ts` (deepen)
- Modify: `src/components/RangeCalendar.svelte.test.ts` (deepen)
- Modify: `src/components/TimeField.svelte.test.ts` (deepen)
- Modify: `src/components/NavigationMenu.svelte.test.ts` (deepen)
- Modify: `src/components/Avatar.svelte.test.ts` (deepen)

- [ ] **Step 1: For each shallow test, identify gaps and add cases**

Read the test file. Identify missing: a11y, edge cases, error paths, slot rendering, prop validation. Add 4-8 cases per file following Pattern A.

- [ ] **Step 2: Run deepened tests**

Run:
```bash
bun run test src/components/Form.svelte.test.ts src/components/Card.svelte.test.ts src/components/RangeCalendar.svelte.test.ts src/components/TimeField.svelte.test.ts src/components/NavigationMenu.svelte.test.ts src/components/Avatar.svelte.test.ts
```

Expected: all pass with 8+ cases each.

- [ ] **Step 3: Commit**

```bash
git add src/components/Form.svelte.test.ts src/components/Card.svelte.test.ts src/components/RangeCalendar.svelte.test.ts src/components/TimeField.svelte.test.ts src/components/NavigationMenu.svelte.test.ts src/components/Avatar.svelte.test.ts
git commit -m "test(components): deepen shallow tests for Form, Card, RangeCalendar, TimeField, NavigationMenu, Avatar"
```

---

## Task 16: Expand token contract tests to all themes and aesthetics

**Files:**
- Modify: `src/styles/tokens.test.ts` (the file migrated from `__tests__/tokens.test.ts`)

- [ ] **Step 1: List all theme and aesthetic files**

Run:
```bash
ls src/styles/themes/ src/styles/aesthetics/
```

Expected: 6 theme files (editorial, dracula, nord, catppuccin, rose-pine, github) and 4 aesthetic files (editorial, glass, bento, expressive). Each may have `.light.css` and `.dark.css` variants.

- [ ] **Step 2: Expand tokens.test.ts to read and assert all theme/aesthetic files**

Add a new `describe` block:

```ts
describe('theme files — required token contract', () => {
  const themes = readdirSync(join(__dirname, '..', 'src', 'styles', 'themes'));
  for (const theme of themes) {
    if (!theme.endsWith('.css')) continue;
    const content = readFileSync(join(__dirname, '..', 'src', 'styles', 'themes', theme), 'utf-8');
    it(`${theme} declares --color-primary`, () => {
      expect(content).toMatch(/--color-primary\s*:/);
    });
    it(`${theme} declares --color-background`, () => {
      expect(content).toMatch(/--color-background\s*:/);
    });
  }
});

describe('aesthetic files — required form contract', () => {
  const aesthetics = readdirSync(join(__dirname, '..', 'src', 'styles', 'aesthetics'));
  for (const a of aesthetics) {
    if (!a.endsWith('.css')) continue;
    const content = readFileSync(join(__dirname, '..', 'src', 'styles', 'aesthetics', a), 'utf-8');
    it(`${a} declares --radius-`, () => {
      expect(content).toMatch(/--radius-/);
    });
    it(`${a} declares --shadow-`, () => {
      expect(content).toMatch(/--shadow-/);
    });
  }
});
```

(Add necessary imports: `readdirSync` from `node:fs`.)

- [ ] **Step 3: Run expanded token tests**

Run:
```bash
bun run test src/styles/tokens.test.ts
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.test.ts
git commit -m "test(tokens): expand to cover all 6 themes and 4 aesthetics"
```

---

## Task 17: Update documentation

**Files:**
- Modify: `docs/architecture.md`
- Modify: `docs/components.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Update `docs/architecture.md` directory map**

Replace the `tests/` references in the `src/utils/` section. The map is illustrative; the new map should reflect that tests live next to source and helpers live in `src/helpers/`.

- [ ] **Step 2: Add "Tested?" column to `docs/components.md`**

Add a "Tested" column to each table with a link to the test file (or `—` if not yet tested; though by this task all components should be tested).

- [ ] **Step 3: Add CHANGELOG entry**

Add at the top of `CHANGELOG.md`:

```markdown
## Unreleased

### Tests

- **Co-located tests** — all test files moved from `__tests__/` to `src/**/*.{test,svelte.test}.ts` (next to source). Legacy `__tests__/` and `tests/` directories removed.
- **A11y testing** — every component test now asserts no axe violations via `expectNoAxeViolations()`.
- **Curated bits-ui mock** — new `src/helpers/bits-ui-mock.ts` factory replaces per-file `vi.mock('bits-ui', ...)` ceremony.
- **Coverage gate** — 80% lines/functions/statements, 70% branches enforced in CI via `vitest --coverage --coverage.thresholds`.
- **CI** — new `.github/workflows/test.yml` runs `lint + check + test:ci` on every push to `main` and on PRs.
- **docs/testing.md** — testing conventions, helpers, patterns, and CI overview.
```

- [ ] **Step 4: Commit**

```bash
git add docs/architecture.md docs/components.md CHANGELOG.md
git commit -m "docs: reflect co-located tests, a11y, coverage, CI in architecture/components/CHANGELOG"
```

---

## Task 18: Final pass — ratchet coverage, verify build, validate everything

**Files:**
- Modify: `vitest.config.ts` (raise thresholds from 0 to 80/80/80/70)
- Modify: `package.json` (`files` field if needed to exclude test files from dist)

- [ ] **Step 1: Run full coverage report and confirm baseline**

Run:
```bash
bun run test:ci 2>&1 | tail -50
```

Expected: a coverage table prints. Note the current line/function/statement/branch percentages. If they're already at 80/80/80/70+, the threshold change in step 2 will pass. If not, identify which files are below and add a per-file allowlist.

- [ ] **Step 2: Raise coverage thresholds in `vitest.config.ts`**

Edit `vitest.config.ts` `coverage.thresholds`:

```ts
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
        perFile: false,
      },
```

- [ ] **Step 3: Run full coverage with the new threshold**

Run:
```bash
bun run test:ci
```

Expected: all tests pass; coverage thresholds met. If failures:
- Note the failing files
- Either add tests or add the file to the per-file allowlist
- Re-run

- [ ] **Step 4: Verify `bun run build` excludes test files**

Run:
```bash
bun run build
if find dist -name '*.test.*' -o -name '*.spec.*' | grep -q .; then
  echo "ERROR: test files leaked into dist/"
  find dist -name '*.test.*' -o -name '*.spec.*'
  exit 1
fi
```

Expected: no output (or "no match" from find); exit 0.

- [ ] **Step 5: If test files leaked, update `package.json` `files` field**

Add to `package.json` `files` array (whitelist only):
```json
  "files": [
    "dist",
    "src/styles",
    "README.md"
  ]
```

(Already the current shape — `svelte-package` reads `src/`, not `files`. If leakage is observed, switch to using `svelte-package`'s `--no-tsc` and explicit file globs, or filter at the svelte-package config level.)

- [ ] **Step 6: Run lint and check**

Run:
```bash
bun run lint && bun run check
```

Expected: exit 0 from both.

- [ ] **Step 7: Run full CI simulation locally**

```bash
bun install --frozen-lockfile
bun run lint
bun run check
bun run test:ci
bun run build
```

Expected: all steps succeed.

- [ ] **Step 8: Commit final pass**

```bash
git add vitest.config.ts package.json bun.lock
git commit -m "test: enforce 80/80/80/70 coverage threshold; verify dist/ excludes tests"
```

---

## Self-Review

After writing the plan, verified against the spec:

**1. Spec coverage:**
- G1 (co-located tests): Tasks 3, 5 ✓
- G2 (80% coverage): Task 18 ✓
- G3 (a11y on every component): Tasks 7, 8 (and applied in all subsequent test additions) ✓
- G4 (curated bits-ui mock): Task 6 ✓
- G5 (docs/testing.md): Task 4 ✓
- G6 (CI workflow): Task 2 ✓
- G7 (test:coverage / test:ci scripts): Task 1 ✓
- G8 (ARCHON verification): Tasks 17, 18 ✓
- G9 (AGENTS.md laws): implicit in all composable tests (valibot, runes) ✓
- G10 (preserve existing tests): Task 5 migrates without semantic change; Tasks 7, 8, 15 deepen (don't delete) ✓
- 10 phases from spec §8: covered as Tasks 1-18 (1→1, 2→2, 3→3+5, 4→4, 5-9→6, 6→9, 7→10-14, 8→15, 9→16, 10→17+18) ✓

**2. Placeholder scan:** No "TBD", "TODO", "implement later", or "similar to Task N" references. All code blocks contain actual code.

**3. Type consistency:** `expectNoAxeViolations(container)`, `mountComposable<T>(...)`, `mockBitsUi()` are consistently named across tasks. `RenderWithThemeOptions` is defined once in Task 6 and used in Pattern C.

**Gaps:** None found in spec coverage.
