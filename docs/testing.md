# Testing

All components and utilities are tested using Vitest and `@testing-library/svelte`, with accessibility checked via `vitest-axe`.

## Conventions

- **Co-location**: Test files reside next to their implementation (e.g. `Button.svelte.test.ts` next to `Button.svelte`).
- **Naming**: Components use `<Name>.svelte.test.ts`; composables use `<name>.svelte.test.ts`.

---

## Test Helpers (`src/helpers/`)

- **`mountComposable`**: Instantiates composables inside Svelte component contexts.
- **`expectNoAxeViolations`**: Validates a11y standards.
- **`mockBitsUi`**: Mocks `bits-ui` layout primitives to avoid JSDOM errors.
- **`renderWithTheme`**: Wraps components inside host containers set to target themes.

---

## Example Pattern

```ts
import { describe, it } from "vitest";
import { render } from "@testing-library/svelte";
import { expectNoAxeViolations } from "../helpers/axe";
import Button from "./Button.svelte";

describe("Button", () => {
  it("renders children", () => {
    const { getByText } = render(Button, { props: { children: "Submit" } });
  });

  it("passes accessibility checks", async () => {
    const { container } = render(Button, { props: { children: "A11y" } });
    await expectNoAxeViolations(container);
  });
});
```

---

## Coverage & Commands

vitest enforces coverage targets:
- **Global**: 90% lines & statements, 85% branches, 88% functions.
- **Agentic** (`src/utils/agentic/**`): 95% lines & statements, 90% branches, 92% functions.
- **Primitives** (`src/primitives/**`): 90% lines & statements, 85% branches, 88% functions.
- **Layouts** (`src/layouts/**`): 90% lines & statements, 85% branches, 88% functions.
- **Domains** (`src/domains/**`): 90% lines & statements, 85% branches, 88% functions.

```bash
bun run test           # Run tests
bun run test:coverage  # Coverage report
```
