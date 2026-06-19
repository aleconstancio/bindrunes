# bindrunes Full Potential Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete all 30 audit items, build the interactive playground, and raise test coverage to 85/75/82/85.

**Architecture:** Three parallel workstreams: (A) UX/DX audit fixes across tokens, components, a11y, docs, showcase, (B) interactive playground page, (C) test coverage threshold bump and missing tests.

**Tech Stack:** Svelte 5 runes, TypeScript, Tailwind CSS v4, bits-ui, valibot, Vitest, happy-dom

---

## Workstream A: Audit Fixes

### Task 1: Token Architecture Cleanup

**Files:**
- Modify: `src/styles/themes/editorial.css`
- Modify: `src/styles/tokens/root.css`
- Modify: `src/styles/tokens.d.ts`
- Modify: `src/styles/landing.css`
- Modify: `src/tailwind-plugin.ts`

- [ ] **Step 1: Read editorial.css to identify the duplicate dark block**

Read `src/styles/themes/editorial.css` and find the dark block that duplicates root.css.

- [ ] **Step 2: Remove duplicate dark block from editorial.css**

Remove the `:root[data-theme="editorial"].dark` block (or equivalent) that is byte-for-byte identical to `:root` in `src/styles/tokens/root.css`.

- [ ] **Step 3: Add :root z-index entries to root.css**

Add to `src/styles/tokens/root.css` inside the `:root` block:

```css
--z-sidebar: 40;
--z-overlay: 50;
--z-modal: 60;
--z-popover: 70;
--z-toast: 80;
--z-tooltip: 90;
```

- [ ] **Step 4: Remove orphaned _easingDefault from tokens.d.ts**

Remove the line `declare const _easingDefault: never;` from `src/styles/tokens.d.ts`.

- [ ] **Step 5: Add utilities.css import to landing.css**

Add at the top of `src/styles/landing.css`:

```css
@import "./utilities.css";
```

- [ ] **Step 6: Add warning comment to tailwind-plugin.ts**

Add a prominent comment at the top of `src/tailwind-plugin.ts`:

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

Run: `bun run lint`
Expected: Pass

- [ ] **Step 9: Run tests**

Run: `bun run test`
Expected: All tests pass

- [ ] **Step 10: Commit**

```bash
git add src/styles/themes/editorial.css src/styles/tokens/root.css src/styles/tokens.d.ts src/styles/landing.css src/tailwind-plugin.ts
git commit -m "fix: token architecture cleanup — remove duplicates, add z-index roots, fix imports"
```

---

### Task 2: Component API Contracts — Input, Select, Checkbox

**Files:**
- Modify: `src/components/Input.svelte`
- Modify: `src/components/Select.svelte`
- Modify: `src/components/Checkbox.svelte`
- Modify: `src/components/Input.svelte.test.ts`
- Modify: `src/components/Select.svelte.test.ts`
- Modify: `src/components/Checkbox.svelte.test.ts`

- [ ] **Step 1: Read Input.svelte to understand current name/id coupling**

Read `src/components/Input.svelte`.

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

Read `src/components/Select.svelte`. When `error` is present, add `aria-describedby` pointing to the error element's ID. Generate an error ID:

```ts
const errorId = $derived(`select-error-${Math.random().toString(36).slice(2, 10)}`);
```

Add `id={errorId}` to the error text element and `aria-describedby={errorId}` to the trigger when error is present.

- [ ] **Step 4: Add `name` and `error` props to Checkbox**

Read `src/components/Checkbox.svelte`. Add:

```ts
name = undefined as string | undefined,
error = undefined as string | undefined,
```

Add `name` to the hidden input or checkbox element. Add error text rendering below the checkbox (matching Switch's pattern).

- [ ] **Step 5: Update Input tests**

Read `src/components/Input.svelte.test.ts`. Add test for custom `id` prop:

```ts
it("uses custom id when provided", () => {
  const { getByLabelText } = render(Input, {
    props: { label: "Email", id: "custom-id" },
  });
  expect(getByLabelText("Email").id).toBe("custom-id");
});
```

- [ ] **Step 6: Update Select tests**

Read `src/components/Select.svelte.test.ts`. Add test for aria-describedby on error.

- [ ] **Step 7: Update Checkbox tests**

Read `src/components/Checkbox.svelte.test.ts`. Add tests for `name` prop and error rendering.

- [ ] **Step 8: Run tests**

Run: `bun run test src/components/Input.svelte.test.ts src/components/Select.svelte.test.ts src/components/Checkbox.svelte.test.ts`
Expected: All pass

- [ ] **Step 9: Commit**

```bash
git add src/components/Input.svelte src/components/Select.svelte src/components/Checkbox.svelte src/components/Input.svelte.test.ts src/components/Select.svelte.test.ts src/components/Checkbox.svelte.test.ts
git commit -m "fix: Input id prop, Select aria-describedby, Checkbox name+error props"
```

---

### Task 3: Component API Contracts — DropdownMenu, Dialog, Tooltip, Popover

**Files:**
- Modify: `src/components/DropdownMenu.svelte`
- Modify: `src/components/Dialog.svelte`
- Add: Shared `TooltipProvider.svelte`
- Modify: `src/components/Tooltip.svelte`
- Modify: `src/components/Popover.svelte`
- Modify: `src/index.ts`
- Modify: `src/components/DropdownMenu.svelte.test.ts`
- Modify: `src/components/Dialog.svelte.test.ts`
- Modify: `src/components/Tooltip.svelte.test.ts`
- Modify: `src/components/Popover.svelte.test.ts`

- [ ] **Step 1: Add $bindable open to DropdownMenu**

Read `src/components/DropdownMenu.svelte`. Change the `open` prop to use `$bindable()`:

```ts
open = $bindable(false),
```

- [ ] **Step 2: Type Dialog sizeClasses properly**

Read `src/components/Dialog.svelte`. Change `sizeClasses` type from `Record<string, string>` to:

```ts
sizeClasses?: Record<"sm" | "md" | "lg" | "xl" | "full", string>;
```

- [ ] **Step 3: Extract shared TooltipProvider**

Read `src/components/Tooltip.svelte`. Create `src/components/TooltipProvider.svelte`:

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import { Tooltip as TooltipPrimitive } from "bits-ui";

let {
  delayDuration = 200,
  children,
}: {
  delayDuration?: number;
  children?: Snippet;
} = $props();
</script>

<TooltipPrimitive.Provider {delayDuration}>
  {@render children?.()}
</TooltipPrimitive.Provider>
```

- [ ] **Step 4: Update Tooltip to remove per-instance Provider**

In `src/components/Tooltip.svelte`, remove the `<TooltipPrimitive.Provider>` wrapper. Export the TooltipProvider from `src/index.ts`.

- [ ] **Step 5: Remove Popover redundant wrapper div**

Read `src/components/Popover.svelte`. Remove the `<div role="button" aria-haspopup aria-expanded>` wrapper. Let bits-ui's `Popover.Trigger` handle accessibility directly.

- [ ] **Step 6: Standardize Snippet imports**

Check all modified components for inline `import("svelte").Snippet` and replace with top-level `import type { Snippet } from "svelte"`.

- [ ] **Step 7: Update tests**

Update tests for each modified component to verify new behavior.

- [ ] **Step 8: Run tests**

Run: `bun run test`
Expected: All pass

- [ ] **Step 9: Commit**

```bash
git add src/components/DropdownMenu.svelte src/components/Dialog.svelte src/components/Tooltip.svelte src/components/Popover.svelte src/components/TooltipProvider.svelte src/index.ts
git commit -m "fix: DropdownMenu bindable open, Dialog typed sizeClasses, shared TooltipProvider, Popover a11y cleanup"
```

---

### Task 4: Accessibility Gaps

**Files:**
- Modify: `src/components/Alert.svelte`
- Modify: `src/components/boundrune/data/WizardForm.svelte`
- Modify: `src/components/boundrune/auth/LoginForm.svelte`
- Modify: `src/components/Alert.svelte.test.ts`

- [ ] **Step 1: Add role to Alert**

Read `src/components/Alert.svelte`. Add:

```ts
role = $derived(variant === "destructive" ? "alert" : "status");
```

Apply `role` to the root element.

- [ ] **Step 2: Add ARIA to WizardForm**

Read `src/components/boundrune/data/WizardForm.svelte`. Add `aria-current="step"` to the active step indicator. Add `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` to the progress bar.

- [ ] **Step 3: Fix LoginForm error announcements**

Read `src/components/boundrune/auth/LoginForm.svelte`. Add `role="alert"` to the error `<div>`. Connect labels to inputs via matching `for`/`id` attributes.

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

Run: `bun run test`
Expected: All pass

- [ ] **Step 6: Commit**

```bash
git add src/components/Alert.svelte src/components/boundrune/data/WizardForm.svelte src/components/boundrune/auth/LoginForm.svelte src/components/Alert.svelte.test.ts
git commit -m "fix: Alert role, WizardForm ARIA, LoginForm error announcements and label connections"
```

---

### Task 5: Docs Drift Fixes

**Files:**
- Modify: `docs/component-states.md`
- Modify: `src/components/landing/PricingTable.svelte`
- Modify: `src/styles/landing.css`

- [ ] **Step 1: Update Alert docs in component-states.md**

Read `docs/component-states.md`. Find the Alert variant section (around line 78-84) that says variants use `--destructive-soft` backgrounds. Update to match the actual border-only implementation (`border-l-4` with `bg-card`).

- [ ] **Step 2: Fix PricingTable Portuguese fallbacks**

Read `src/components/landing/PricingTable.svelte`. Change:
- "Mensal" → "Monthly"
- "Anual" → "Annual"  
- "Economize até 20%" → "Save up to 20%"

- [ ] **Step 3: Remove :global() from landing.css**

Read `src/styles/landing.css`. Remove `:global()` wrappers from `.landing-page`, `.section-reveal`, `.stagger-enter` selectors.

- [ ] **Step 4: Run lint**

Run: `bun run lint`
Expected: Pass

- [ ] **Step 5: Commit**

```bash
git add docs/component-states.md src/components/landing/PricingTable.svelte src/styles/landing.css
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

Read `examples/showcase/src/routes/app/+page.svelte`. Import actual `useToggle` and `useCounter` from `bindrunes` and use them instead of raw `$state`.

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
- Modify: `src/components/Button.svelte`
- Modify: `src/components/Card.svelte`
- Modify: `src/components/Input.svelte`
- Modify: `src/components/Dialog.svelte`
- Modify: `src/components/Alert.svelte`
- Modify: `src/components/Badge.svelte`

- [ ] **Step 1: Add $$restProps to Button**

Read `src/components/Button.svelte`. Add `...restProps` to the `$props()` destructuring. Spread onto the root `<button>` or `<a>` element:

```svelte
<button ...restProps class={buttonClasses} ...>
```

Filter out `class` from restProps to avoid conflicts with the computed `buttonClasses`.

- [ ] **Step 2: Add $$restProps to Card**

Read `src/components/Card.svelte`. Spread `...restProps` onto the root element.

- [ ] **Step 3: Add $$restProps to Input**

Read `src/components/Input.svelte`. Spread `...restProps` onto the `<input>` element (not the wrapper).

- [ ] **Step 4: Add $$restProps to Dialog**

Read `src/components/Dialog.svelte`. Spread `...restProps` onto the `Dialog.Content` element.

- [ ] **Step 5: Add $$restProps to Alert**

Read `src/components/Alert.svelte`. Spread `...restProps` onto the root element.

- [ ] **Step 6: Add $$restProps to Badge**

Read `src/components/Badge.svelte`. Spread `...restProps` onto the root element.

- [ ] **Step 7: Run tests**

Run: `bun run test`
Expected: All pass

- [ ] **Step 8: Commit**

```bash
git add src/components/Button.svelte src/components/Card.svelte src/components/Input.svelte src/components/Dialog.svelte src/components/Alert.svelte src/components/Badge.svelte
git commit -m "feat: add $$restProps forwarding to Button, Card, Input, Dialog, Alert, Badge"
```

---

## Workstream B: Interactive Playground

### Task 8: Build Interactive Playground

**Files:**
- Create: `examples/showcase/src/routes/playground/+page.svelte`
- Modify: `examples/showcase/src/routes/+layout.svelte`

- [ ] **Step 1: Read showcase layout to understand nav structure**

Read `examples/showcase/src/routes/+layout.svelte`.

- [ ] **Step 2: Create playground page**

Create `examples/showcase/src/routes/playground/+page.svelte`:

```svelte
<script lang="ts">
  import { PageHeader, Card, Input, Select, Switch, Button, Badge, CodeSnippet } from "bindrunes";

  const components = [
    {
      name: "Button",
      props: {
        variant: { type: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "link", "soft", "subtle"], default: "primary" },
        size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
        disabled: { type: "switch", default: false },
        loading: { type: "switch", default: false },
        fullWidth: { type: "switch", default: false },
      },
      slot: "Click me",
    },
    {
      name: "Badge",
      props: {
        variant: { type: "select", options: ["primary", "secondary", "outline", "soft", "destructive"], default: "primary" },
        size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
      },
      slot: "Label",
    },
    {
      name: "Card",
      props: {
        variant: { type: "select", options: ["surface", "glass", "outlined", "ghost"], default: "surface" },
        padding: { type: "switch", default: true },
        interactive: { type: "switch", default: false },
      },
      slot: "Card content goes here.",
    },
    {
      name: "Input",
      props: {
        placeholder: { type: "text", default: "Enter text..." },
        disabled: { type: "switch", default: false },
        required: { type: "switch", default: false },
      },
      slot: "",
    },
  ];

  let selectedIdx = $state(0);
  let propValues = $state<Record<string, any>>({});

  const current = $derived(components[selectedIdx]);

  $effect(() => {
    const c = components[selectedIdx];
    const initial: Record<string, any> = {};
    for (const [key, prop] of Object.entries(c.props)) {
      initial[key] = prop.default;
    }
    propValues = initial;
  });

  const generatedCode = $derived(() => {
    const c = components[selectedIdx];
    const props = Object.entries(propValues)
      .filter(([, v]) => v !== undefined && v !== "" && v !== false)
      .map(([k, v]) => {
        if (typeof v === "boolean") return v ? k : "";
        return `${k}="${v}"`;
      })
      .filter(Boolean)
      .join(" ");
    const propStr = props ? ` ${props}` : "";
    const slotContent = c.slot ? `\n  ${c.slot}\n` : "";
    return `import { ${c.name} } from "bindrunes";\n\n<${c.name}${propStr}>${slotContent}</${c.name}>`;
  });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
  <PageHeader title="Playground" description="Tweak component props and see live results with generated code" />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Controls -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Component</h3>
      <Select
        value={current.name}
        options={components.map((c) => ({ label: c.name, value: c.name }))}
        onChange={(_, val) => {
          const idx = components.findIndex((c) => c.name === val);
          if (idx >= 0) selectedIdx = idx;
        }}
      />

      <div class="space-y-3 pt-4">
        <h4 class="text-title-3 text-foreground">Props</h4>
        {#each Object.entries(current.props) as [key, prop]}
          <div class="space-y-1">
            <label class="text-label-sm text-muted-foreground">{key}</label>
            {#if prop.type === "select"}
              <Select
                value={propValues[key]}
                options={prop.options.map((o: string) => ({ label: o, value: o }))}
                onChange={(_, val) => (propValues[key] = val)}
              />
            {:else if prop.type === "switch"}
              <Switch checked={propValues[key]} onChange={(v) => (propValues[key] = v)} />
            {:else if prop.type === "text"}
              <Input value={propValues[key]} onInput={(v) => (propValues[key] = v)} />
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Preview -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Preview</h3>
      <Card padding class="min-h-[200px] flex items-center justify-center">
        {#if current.name === "Button"}
          <Button {...propValues}>{current.slot}</Button>
        {:else if current.name === "Badge"}
          <Badge {...propValues}>{current.slot}</Badge>
        {:else if current.name === "Card"}
          <Card {...propValues}>{current.slot}</Card>
        {:else if current.name === "Input"}
          <div class="w-full">
            <Input {...propValues} />
          </div>
        {/if}
      </Card>
    </div>

    <!-- Code -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Generated Code</h3>
      <CodeSnippet code={generatedCode()} language="svelte" title="App.svelte" />
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add playground to navigation**

In `examples/showcase/src/routes/+layout.svelte`, add to the nav array:

```ts
{ href: "/playground", label: "Playground" },
```

- [ ] **Step 4: Verify**

Run: `cd examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add examples/showcase/src/routes/playground/+page.svelte examples/showcase/src/routes/+layout.svelte
git commit -m "feat: add interactive playground with component selector, prop controls, and code generation"
```

---

## Workstream C: Test Coverage

### Task 9: Raise Coverage Thresholds and Add Missing Tests

**Files:**
- Modify: `vitest.config.ts`
- Create/Modify: Various `*.svelte.test.ts` files for components missing tests

- [ ] **Step 1: Raise coverage thresholds in vitest.config.ts**

Read `vitest.config.ts`. Change the global thresholds from:

```ts
lines: 80,
functions: 77,
statements: 80,
branches: 70,
```

To:

```ts
lines: 85,
functions: 82,
statements: 85,
branches: 75,
```

- [ ] **Step 2: Run tests to see current coverage**

Run: `bun run test:ci 2>&1 | tail -30`
Note any failures due to new thresholds.

- [ ] **Step 3: Identify components without tests**

Run: `ls src/components/*.svelte | while read f; do test="${f}.test.ts"; if [ ! -f "$test" ]; then echo "MISSING: $f"; fi; done`

- [ ] **Step 4: Add tests for components missing coverage**

For each component without a test file, create a minimal test file following the existing pattern (render, check a11y, verify key behavior). Priority order:
1. PageShell, PageSection (layout primitives)
2. Breadcrumb, NavigationMenu, Pagination
3. Separator, Skeleton, Progress

- [ ] **Step 5: Run tests with new thresholds**

Run: `bun run test:ci`
Expected: All pass with new thresholds

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts src/components/*.test.ts
git commit -m "test: raise coverage thresholds to 85/75/82/85, add missing component tests"
```

---

## Final Verification

- [ ] **Step 1: Run full lint**

Run: `bun run lint`
Expected: No errors

- [ ] **Step 2: Run type check**

Run: `bun run check`
Expected: No errors

- [ ] **Step 3: Run full test suite**

Run: `bun run test:ci`
Expected: All tests pass with new thresholds

- [ ] **Step 4: Build library**

Run: `bun run build`
Expected: Build succeeds
