# urupe-ui Full Potential — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete all 30 audit items, expand the interactive playground, and add missing tests.

**Architecture:** Three parallel workstreams: (A) UX/DX audit fixes across tokens, components, a11y, docs, showcase, (B) playground expansion, (C) missing test coverage.

**Tech Stack:** Svelte 5 runes, TypeScript, Tailwind CSS v4, bits-ui, valibot, Vitest, happy-dom

**Note:** All `src/` paths are relative to `packages/bindrunes/`. All component files were recently moved from `src/components/` to `src/primitives/` (primitives) or `src/domains/` (domain components).

---

## Workstream A: Audit Fixes

### Task 1: Token Architecture Cleanup

**Files:**
- Modify: `packages/bindrunes/src/styles/themes/editorial.css`
- Modify: `packages/bindrunes/src/styles/tokens/root.css`
- Modify: `packages/bindrunes/src/styles/tokens.d.ts`
- Modify: `packages/bindrunes/src/styles/landing.css`
- Modify: `packages/bindrunes/src/tailwind-plugin.ts`

- [ ] **Step 1: Read editorial.css to identify the duplicate dark block**

Read `packages/bindrunes/src/styles/themes/editorial.css` and find the dark block that duplicates root.css.

- [ ] **Step 2: Remove duplicate dark block from editorial.css**

Remove the `:root[data-theme="editorial"].dark` block (or equivalent) that is byte-for-byte identical to `:root` in `packages/bindrunes/src/styles/tokens/root.css`.

- [ ] **Step 3: Add :root z-index entries to root.css**

Add to `packages/bindrunes/src/styles/tokens/root.css` inside the `:root` block:

```css
--z-sidebar: 40;
--z-overlay: 50;
--z-modal: 60;
--z-popover: 70;
--z-toast: 80;
--z-tooltip: 90;
```

- [ ] **Step 4: Remove orphaned _easingDefault from tokens.d.ts**

Remove the line `declare const _easingDefault: never;` from `packages/bindrunes/src/styles/tokens.d.ts`.

- [ ] **Step 5: Add utilities.css import to landing.css**

Add at the top of `packages/bindrunes/src/styles/landing.css`:

```css
@import "./utilities.css";
```

- [ ] **Step 6: Add warning comment to tailwind-plugin.ts**

Add a prominent comment at the top of `packages/bindrunes/src/tailwind-plugin.ts`:

```ts
// WARNING: This file intentionally duplicates token bindings from tokens/tailwind.css.
// Every token change requires updating BOTH files. A shared token source (JSON/TS)
// is a future improvement.
```

- [ ] **Step 7: Add clarifying comment to root.css for radius tokens**

Add a comment above `--radius` and `--radius-md` in root.css:

```css
/* --radius is the base generic radius. --radius-md is the named scale step (medium). */
```

- [ ] **Step 8: Run lint**

Run: `cd packages/bindrunes && bun run lint`
Expected: Pass

- [ ] **Step 9: Run tests**

Run: `cd packages/bindrunes && bun run test`
Expected: All tests pass

- [ ] **Step 10: Commit**

```bash
git add packages/bindrunes/src/styles/themes/editorial.css packages/bindrunes/src/styles/tokens/root.css packages/bindrunes/src/styles/tokens.d.ts packages/bindrunes/src/styles/landing.css packages/bindrunes/src/tailwind-plugin.ts
git commit -m "fix: token architecture cleanup — remove duplicates, add z-index roots, fix imports"
```

---

### Task 2: Component API Contracts — Input, Select, Checkbox

**Files:**
- Modify: `packages/bindrunes/src/primitives/Input.svelte`
- Modify: `packages/bindrunes/src/primitives/Select.svelte`
- Modify: `packages/bindrunes/src/primitives/Checkbox.svelte`
- Modify: `packages/bindrunes/src/primitives/Input.svelte.test.ts`
- Modify: `packages/bindrunes/src/primitives/Select.svelte.test.ts`
- Modify: `packages/bindrunes/src/primitives/Checkbox.svelte.test.ts`

- [ ] **Step 1: Read Input.svelte to understand current name/id coupling**

Read `packages/bindrunes/src/primitives/Input.svelte`.

- [ ] **Step 2: Add `id` prop to Input**

Add an `id` prop with a generated fallback. In the `$props()` block, add:

```ts
id = undefined as string | undefined,
```

Generate a fallback ID:

```ts
const inputId = $derived(id ?? `input-${Math.random().toString(36).slice(2, 10)}`);
```

Use `inputId` for the input element's `id` and the label's `for` attribute. Keep `name` for form submission only.

- [ ] **Step 3: Add aria-describedby to Select on error**

Read `packages/bindrunes/src/primitives/Select.svelte`. When `error` is present, add `aria-describedby` pointing to the error element's ID. Generate an error ID:

```ts
const errorId = $derived(`select-error-${Math.random().toString(36).slice(2, 10)}`);
```

Add `id={errorId}` to the error text element and `aria-describedby={errorId}` to the trigger when error is present.

- [ ] **Step 4: Add `name` and `error` props to Checkbox**

Read `packages/bindrunes/src/primitives/Checkbox.svelte`. Add:

```ts
name = undefined as string | undefined,
error = undefined as string | undefined,
```

Add `name` to the hidden input or checkbox element. Add error text rendering below the checkbox (matching Switch's pattern).

- [ ] **Step 5: Update Input tests**

Read `packages/bindrunes/src/primitives/Input.svelte.test.ts`. Add test for custom `id` prop:

```ts
it("uses custom id when provided", () => {
  const { getByLabelText } = render(Input, {
    props: { label: "Email", id: "custom-id" },
  });
  expect(getByLabelText("Email").id).toBe("custom-id");
});
```

- [ ] **Step 6: Update Select tests**

Read `packages/bindrunes/src/primitives/Select.svelte.test.ts`. Add test for aria-describedby on error.

- [ ] **Step 7: Update Checkbox tests**

Read `packages/bindrunes/src/primitives/Checkbox.svelte.test.ts`. Add tests for `name` prop and error rendering.

- [ ] **Step 8: Run tests**

Run: `cd packages/bindrunes && bun run test src/primitives/Input.svelte.test.ts src/primitives/Select.svelte.test.ts src/primitives/Checkbox.svelte.test.ts`
Expected: All pass

- [ ] **Step 9: Commit**

```bash
git add packages/bindrunes/src/primitives/Input.svelte packages/bindrunes/src/primitives/Select.svelte packages/bindrunes/src/primitives/Checkbox.svelte packages/bindrunes/src/primitives/Input.svelte.test.ts packages/bindrunes/src/primitives/Select.svelte.test.ts packages/bindrunes/src/primitives/Checkbox.svelte.test.ts
git commit -m "fix: Input id prop, Select aria-describedby, Checkbox name+error props"
```

---

### Task 3: Component API Contracts — DropdownMenu, Dialog, Tooltip, Popover

**Files:**
- Modify: `packages/bindrunes/src/primitives/DropdownMenu.svelte`
- Modify: `packages/bindrunes/src/primitives/Dialog.svelte`
- Modify: `packages/bindrunes/src/primitives/Tooltip.svelte`
- Modify: `packages/bindrunes/src/primitives/Popover.svelte`
- Modify: `packages/bindrunes/src/index.ts`
- Modify: `packages/bindrunes/src/primitives/DropdownMenu.svelte.test.ts`
- Modify: `packages/bindrunes/src/primitives/Dialog.svelte.test.ts`
- Modify: `packages/bindrunes/src/primitives/Tooltip.svelte.test.ts`
- Modify: `packages/bindrunes/src/primitives/Popover.svelte.test.ts`

Note: `TooltipProvider.svelte` already exists at `src/primitives/TooltipProvider.svelte` and is already exported.

- [ ] **Step 1: Add $bindable open to DropdownMenu**

Read `packages/bindrunes/src/primitives/DropdownMenu.svelte`. Change the `open` prop to use `$bindable()`:

```ts
open = $bindable(false),
```

- [ ] **Step 2: Type Dialog sizeClasses properly**

Read `packages/bindrunes/src/primitives/Dialog.svelte`. Change `sizeClasses` type from `Record<string, string>` to:

```ts
sizeClasses?: Record<"sm" | "md" | "lg" | "xl" | "full", string>;
```

- [ ] **Step 3: Update Tooltip to remove per-instance Provider**

Read `packages/bindrunes/src/primitives/Tooltip.svelte`. If it wraps content in `<TooltipPrimitive.Provider>`, remove that wrapper. The shared `TooltipProvider` component already exists and should be used at the app/layout level instead.

- [ ] **Step 4: Remove Popover redundant wrapper div**

Read `packages/bindrunes/src/primitives/Popover.svelte`. Remove the `<div role="button" aria-haspopup aria-expanded>` wrapper. Let bits-ui's `Popover.Trigger` handle accessibility directly.

- [ ] **Step 5: Standardize Snippet imports**

Check all modified components for inline `import("svelte").Snippet` and replace with top-level `import type { Snippet } from "svelte"`.

- [ ] **Step 6: Update tests**

Update tests for each modified component to verify new behavior.

- [ ] **Step 7: Run tests**

Run: `cd packages/bindrunes && bun run test`
Expected: All pass

- [ ] **Step 8: Commit**

```bash
git add packages/bindrunes/src/primitives/DropdownMenu.svelte packages/bindrunes/src/primitives/Dialog.svelte packages/bindrunes/src/primitives/Tooltip.svelte packages/bindrunes/src/primitives/Popover.svelte packages/bindrunes/src/primitives/DropdownMenu.svelte.test.ts packages/bindrunes/src/primitives/Dialog.svelte.test.ts packages/bindrunes/src/primitives/Tooltip.svelte.test.ts packages/bindrunes/src/primitives/Popover.svelte.test.ts
git commit -m "fix: DropdownMenu bindable open, Dialog typed sizeClasses, Tooltip Provider cleanup, Popover a11y"
```

---

### Task 4: Accessibility Gaps

**Files:**
- Modify: `packages/bindrunes/src/primitives/Alert.svelte`
- Modify: `packages/bindrunes/src/domains/data/WizardForm.svelte`
- Modify: `packages/bindrunes/src/domains/auth/LoginForm.svelte`
- Modify: `packages/bindrunes/src/primitives/Alert.svelte.test.ts`

- [ ] **Step 1: Add role to Alert**

Read `packages/bindrunes/src/primitives/Alert.svelte`. Add:

```ts
role = $derived(variant === "destructive" ? "alert" : "status");
```

Apply `role` to the root element.

- [ ] **Step 2: Add ARIA to WizardForm**

Read `packages/bindrunes/src/domains/data/WizardForm.svelte`. Add `aria-current="step"` to the active step indicator. Add `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` to the progress bar.

- [ ] **Step 3: Fix LoginForm error announcements**

Read `packages/bindrunes/src/domains/auth/LoginForm.svelte`. Add `role="alert"` to the error `<div>`. Connect labels to inputs via matching `for`/`id` attributes.

- [ ] **Step 4: Update Alert tests**

Add test for role attribute:

```ts
it("has role=alert for destructive variant", () => {
  const { getByRole } = render(Alert, {
    props: { variant: "destructive", children: "Error" },
  });
  expect(getByRole("alert")).toBeTruthy();
});

it("has role=status for non-destructive variant", () => {
  const { getByRole } = render(Alert, {
    props: { variant: "default", children: "Info" },
  });
  expect(getByRole("status")).toBeTruthy();
});
```

- [ ] **Step 5: Run tests**

Run: `cd packages/bindrunes && bun run test`
Expected: All pass

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/primitives/Alert.svelte packages/bindrunes/src/domains/data/WizardForm.svelte packages/bindrunes/src/domains/auth/LoginForm.svelte packages/bindrunes/src/primitives/Alert.svelte.test.ts
git commit -m "fix: Alert role, WizardForm ARIA, LoginForm error announcements and label connections"
```

---

### Task 5: Docs Drift Fixes

**Files:**
- Modify: `docs/component-states.md`
- Modify: `packages/bindrunes/src/domains/landing/PricingTable.svelte`
- Modify: `packages/bindrunes/src/styles/landing.css`

- [ ] **Step 1: Update Alert docs in component-states.md**

Read `docs/component-states.md`. Find the Alert variant section (around line 78-84) that says variants use `--destructive-soft` backgrounds. Update to match the actual border-only implementation (`border-l-4` with `bg-card`).

- [ ] **Step 2: Fix PricingTable Portuguese fallbacks**

Read `packages/bindrunes/src/domains/landing/PricingTable.svelte`. Change:
- "Mensal" → "Monthly"
- "Anual" → "Annual"
- "Economize até 20%" → "Save up to 20%"

- [ ] **Step 3: Remove :global() from landing.css**

Read `packages/bindrunes/src/styles/landing.css`. Remove `:global()` wrappers from `.landing-page`, `.section-reveal`, `.stagger-enter` selectors.

- [ ] **Step 4: Run lint**

Run: `cd packages/bindrunes && bun run lint`
Expected: Pass

- [ ] **Step 5: Commit**

```bash
git add docs/component-states.md packages/bindrunes/src/domains/landing/PricingTable.svelte packages/bindrunes/src/styles/landing.css
git commit -m "fix: docs drift — Alert states, PricingTable English, landing.css :global cleanup"
```

---

### Task 6: Showcase UX Fixes

**Files:**
- Modify: `examples/showcase/src/routes/+page.svelte`
- Modify: `examples/showcase/src/routes/ecommerce/+page.svelte`
- Modify: `examples/showcase/src/routes/data/list/+page.svelte`
- Modify: `examples/showcase/src/routes/calendar/+page.svelte`
- Modify: `examples/showcase/src/routes/portfolio/+page.svelte`
- Modify: `examples/showcase/src/routes/dashboard/+page.svelte`
- Modify: `examples/showcase/src/routes/app/+page.svelte`

- [ ] **Step 1: Remove dead ThemeToggle import**

Read `examples/showcase/src/routes/+page.svelte`. Remove `ThemeToggle` from the import statement.

- [ ] **Step 2: Fix legacy on:click syntax**

Read `examples/showcase/src/routes/ecommerce/+page.svelte`. Replace `on:click` with `onclick`.

- [ ] **Step 3: Fix tab overflow**

Read `examples/showcase/src/routes/data/list/+page.svelte`. Add `class="overflow-x-auto"` to the `<TabsList>` element.

- [ ] **Step 4: Fix calendar non-deterministic state**

Read `examples/showcase/src/routes/calendar/+page.svelte`. Replace `Math.random()` with a seeded deterministic pattern (e.g., use index-based values).

- [ ] **Step 5: Fix portfolio broken anchor**

Read `examples/showcase/src/routes/portfolio/+page.svelte`. Add `id="case-study"` to the `<h2>` element.

- [ ] **Step 6: Fix dashboard nested shell layout**

Read `examples/showcase/src/routes/dashboard/+page.svelte`. Remove the outer `max-w-7xl` wrapper around `DashboardShell` instances.

- [ ] **Step 7: Fix app page fake composable demos**

Read `examples/showcase/src/routes/app/+page.svelte`. Import actual `useToggle` and `useCounter` from `urupe-ui` and use them instead of raw `$state`.

- [ ] **Step 8: Run lint and typecheck**

Run: `cd examples/showcase && bun run lint && bun run check`
Expected: Pass

- [ ] **Step 9: Commit**

```bash
git add examples/showcase/src/routes/
git commit -m "fix: showcase UX — dead imports, legacy syntax, tab overflow, broken anchors, fake demos"
```

---

### Task 7: $$restProps Forwarding

**Files:**
- Modify: `packages/bindrunes/src/primitives/Button.svelte`
- Modify: `packages/bindrunes/src/primitives/Card.svelte`
- Modify: `packages/bindrunes/src/primitives/Input.svelte`
- Modify: `packages/bindrunes/src/primitives/Dialog.svelte`
- Modify: `packages/bindrunes/src/primitives/Alert.svelte`
- Modify: `packages/bindrunes/src/primitives/Badge.svelte`

- [ ] **Step 1: Add $$restProps to Button**

Read `packages/bindrunes/src/primitives/Button.svelte`. Add `...restProps` to the `$props()` destructuring. Spread onto the root `<button>` or `<a>` element:

```svelte
<button ...restProps class={buttonClasses} ...>
```

Filter out `class` from restProps to avoid conflicts with the computed `buttonClasses`.

- [ ] **Step 2: Add $$restProps to Card**

Read `packages/bindrunes/src/primitives/Card.svelte`. Spread `...restProps` onto the root element.

- [ ] **Step 3: Add $$restProps to Input**

Read `packages/bindrunes/src/primitives/Input.svelte`. Spread `...restProps` onto the `<input>` element (not the wrapper).

- [ ] **Step 4: Add $$restProps to Dialog**

Read `packages/bindrunes/src/primitives/Dialog.svelte`. Spread `...restProps` onto the `Dialog.Content` element.

- [ ] **Step 5: Add $$restProps to Alert**

Read `packages/bindrunes/src/primitives/Alert.svelte`. Spread `...restProps` onto the root element.

- [ ] **Step 6: Add $$restProps to Badge**

Read `packages/bindrunes/src/primitives/Badge.svelte`. Spread `...restProps` onto the root element.

- [ ] **Step 7: Run tests**

Run: `cd packages/bindrunes && bun run test`
Expected: All pass

- [ ] **Step 8: Commit**

```bash
git add packages/bindrunes/src/primitives/Button.svelte packages/bindrunes/src/primitives/Card.svelte packages/bindrunes/src/primitives/Input.svelte packages/bindrunes/src/primitives/Dialog.svelte packages/bindrunes/src/primitives/Alert.svelte packages/bindrunes/src/primitives/Badge.svelte
git commit -m "feat: add $$restProps forwarding to Button, Card, Input, Dialog, Alert, Badge"
```

---

## Workstream B: Interactive Playground

### Task 8: Expand Interactive Playground

The playground already exists at `examples/showcase/src/routes/playground/+page.svelte` with Button, Badge, Card, Input, Checkbox, Select, Switch, and DataTable. Expand it to 15+ components.

**Files:**
- Modify: `examples/showcase/src/lib/playground-data.ts`
- Modify: `examples/showcase/src/routes/playground/+page.svelte`

- [ ] **Step 1: Read current playground data and page**

Read `examples/showcase/src/lib/playground-data.ts` and `examples/showcase/src/routes/playground/+page.svelte`.

- [ ] **Step 2: Add Foundation components to playground-data.ts**

Add to the `components` array in `playground-data.ts`:

```ts
{
  name: "Alert",
  category: "Foundation",
  props: {
    variant: { type: "select", options: ["info", "success", "warning", "destructive"], default: "info" },
    title: { type: "text", default: "Information" }
  },
  slot: "This is an informational message."
},
{
  name: "Separator",
  category: "Foundation",
  props: {
    orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" }
  }
},
{
  name: "Skeleton",
  category: "Foundation",
  props: {
    class: { type: "text", default: "h-4 w-[250px]" }
  }
},
{
  name: "Progress",
  category: "Foundation",
  props: {
    value: { type: "number", default: 60 },
    max: { type: "number", default: 100 }
  }
},
```

- [ ] **Step 3: Add Overlays components**

```ts
{
  name: "Dialog",
  category: "Overlays",
  props: {
    title: { type: "text", default: "Dialog Title" }
  },
  slot: "Dialog content goes here."
},
{
  name: "Tooltip",
  category: "Overlays",
  props: {
    side: { type: "select", options: ["top", "right", "bottom", "left"], default: "top" }
  },
  slot: "Hover me"
},
{
  name: "Sheet",
  category: "Overlays",
  props: {
    side: { type: "select", options: ["top", "right", "bottom", "left"], default: "right" }
  }
},
```

- [ ] **Step 4: Add Navigation components**

```ts
{
  name: "Breadcrumb",
  category: "Navigation",
  props: {},
  slot: ""
},
{
  name: "Tabs",
  category: "Navigation",
  props: {
    defaultValue: { type: "text", default: "tab1" }
  }
},
{
  name: "Pagination",
  category: "Navigation",
  props: {
    totalPages: { type: "number", default: 10 },
    currentPage: { type: "number", default: 1 }
  }
},
```

- [ ] **Step 5: Add Feedback components**

```ts
{
  name: "Spinner",
  category: "Feedback",
  props: {
    size: { type: "select", options: ["sm", "md", "lg"], default: "md" }
  }
},
{
  name: "EmptyState",
  category: "Feedback",
  props: {
    title: { type: "text", default: "No items found" },
    description: { type: "text", default: "Create your first item to get started." }
  }
},
```

- [ ] **Step 6: Update playground page preview section**

In `examples/showcase/src/routes/playground/+page.svelte`, add preview cases for the new components in the `{#if current?.name === ...}` chain. Import the necessary urupe-ui components.

- [ ] **Step 7: Verify**

Run: `cd examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 8: Commit**

```bash
git add examples/showcase/src/lib/playground-data.ts examples/showcase/src/routes/playground/+page.svelte
git commit -m "feat: expand playground to 15+ components across Foundation, Overlays, Navigation, Feedback"
```

---

## Workstream C: Test Coverage

### Task 9: Add Missing Tests for Primitives

8 primitive components lack test files: AccordionItem, DatePicker, RangeCalendar, RuleFootnote, TabsContent, TabsList, TimeField, TooltipProvider.

**Files:**
- Create: `packages/bindrunes/src/primitives/AccordionItem.svelte.test.ts`
- Create: `packages/bindrunes/src/primitives/DatePicker.svelte.test.ts`
- Create: `packages/bindrunes/src/primitives/RangeCalendar.svelte.test.ts`
- Create: `packages/bindrunes/src/primitives/RuleFootnote.svelte.test.ts`
- Create: `packages/bindrunes/src/primitives/TabsContent.svelte.test.ts`
- Create: `packages/bindrunes/src/primitives/TabsList.svelte.test.ts`
- Create: `packages/bindrunes/src/primitives/TimeField.svelte.test.ts`
- Create: `packages/bindrunes/src/primitives/TooltipProvider.svelte.test.ts`

- [ ] **Step 1: Read an existing primitive test for the pattern**

Read `packages/bindrunes/src/primitives/Badge.svelte.test.ts` to understand the test pattern (imports, render, assertions).

- [ ] **Step 2: Write AccordionItem smoke test**

Create `packages/bindrunes/src/primitives/AccordionItem.svelte.test.ts`:

```ts
import { render } from "@testing-library/svelte";
import AccordionItem from "./AccordionItem.svelte";

describe("AccordionItem", () => {
  it("renders content", () => {
    const { getByText } = render(AccordionItem, {
      props: { value: "item-1" },
      slots: { default: "Accordion content" },
    });
    expect(getByText("Accordion content")).toBeTruthy();
  });

  it("passes a11y check", async () => {
    const { container } = render(AccordionItem, {
      props: { value: "item-1" },
      slots: { default: "Content" },
    });
    await expect(container).toBeAccessible();
  });
});
```

- [ ] **Step 3: Run AccordionItem test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/primitives/AccordionItem.svelte.test.ts`
Expected: PASS

- [ ] **Step 4: Write remaining smoke tests**

Create minimal smoke tests for: DatePicker, RangeCalendar, RuleFootnote, TabsContent, TabsList, TimeField, TooltipProvider. Each test should:
1. Import the component
2. Render with minimal required props
3. Assert content renders
4. Run a11y check

- [ ] **Step 5: Run all new tests**

Run: `cd packages/bindrunes && bun run test src/primitives/AccordionItem.svelte.test.ts src/primitives/DatePicker.svelte.test.ts src/primitives/RangeCalendar.svelte.test.ts src/primitives/RuleFootnote.svelte.test.ts src/primitives/TabsContent.svelte.test.ts src/primitives/TabsList.svelte.test.ts src/primitives/TimeField.svelte.test.ts src/primitives/TooltipProvider.svelte.test.ts`
Expected: All pass

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/primitives/*.svelte.test.ts
git commit -m "test: add smoke tests for 8 untested primitives"
```

---

## Final Verification

- [ ] **Step 1: Run full lint**

Run: `cd packages/bindrunes && bun run lint`
Expected: No errors

- [ ] **Step 2: Run type check**

Run: `cd packages/bindrunes && bun run check`
Expected: No errors

- [ ] **Step 3: Run full test suite**

Run: `cd packages/bindrunes && bun run test`
Expected: All tests pass

- [ ] **Step 4: Build library**

Run: `cd packages/bindrunes && bun run build`
Expected: Build succeeds
