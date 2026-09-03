# Playground Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical bugs, architectural issues, DX gaps, and quality problems identified in the playground deep audit.

**Architecture:** Fix in-place — no new files needed. Modify existing playground components to correct API mismatches, add missing features, and improve code quality.

**Tech Stack:** Svelte 5 runes, TypeScript, existing urupe-ui components

---

## File Map

### Critical Bug Fixes

| Action | File |
|--------|------|
| Modify | `packages/bindrunes/src/playground/component-registry.ts` |
| Modify | `docs-site/src/routes/docs/playground/+page.svelte` |
| Modify | `examples/showcase/src/routes/playground/+page.svelte` |
| Modify | `examples/showcase/src/routes/playground/composables/+page.svelte` |

### Architecture Fixes

| Action | File |
|--------|------|
| Modify | `packages/bindrunes/package.json` |
| Modify | `packages/bindrunes/src/playground/Playground.svelte` |

### DX Improvements

| Action | File |
|--------|------|
| Modify | `packages/bindrunes/src/playground/Playground.svelte` |
| Modify | `packages/bindrunes/src/playground/ExportButton.svelte` |

### Quality Polish

| Action | File |
|--------|------|
| Modify | `packages/bindrunes/src/playground/CodePreview.svelte` |
| Modify | `packages/bindrunes/src/playground/PropControls.svelte` |
| Modify | `packages/bindrunes/src/playground/playground-state.svelte.ts` |
| Modify | `packages/bindrunes/src/playground/ResponsiveFrame.svelte` |

---

## Phase 1: Critical Bug Fixes

### Task 1: Fix Component Registry API Mismatches

**Files:**
- Modify: `packages/bindrunes/src/playground/component-registry.ts:227-354`

- [ ] **Step 1: Fix DataTable entry**

The registry entry is named `DataTable` but should reference the domain component. However, the domain component requires complex data structures (`columns`, `rows`) that can't be configured via simple text/select controls. The best approach is to remove this entry since it can't be playground-ready with the current prop control system.

Remove lines 227-236:
```ts
{
    name: "DataTable",
    category: "Data",
    description: "Full data table with sort/filter/pagination",
    importPath: "urupe-ui",
    props: {
        striped: { type: "switch", default: false, label: "Striped" },
        hoverable: { type: "switch", default: true, label: "Hoverable" },
    },
},
```

- [ ] **Step 2: Fix Tabs entry**

The registry correctly defines `value` (line 243), but the consumer pages pass `defaultValue`. The fix is in the consumer pages (Task 2), not the registry.

- [ ] **Step 3: Fix Breadcrumb entry**

Add actual props that Breadcrumb supports:
```ts
{
    name: "Breadcrumb",
    category: "Navigation",
    description: "Breadcrumb navigation",
    importPath: "urupe-ui",
    props: {
        separator: { type: "text", default: "/", label: "Separator" },
    },
},
```

- [ ] **Step 4: Fix Stepper entry**

Replace JSON-in-text with a simpler approach — just show currentStep since steps are complex:
```ts
{
    name: "Stepper",
    category: "Navigation",
    description: "Step-by-step wizard UI",
    importPath: "urupe-ui",
    props: {
        currentStep: { type: "text", default: "step1", label: "Current step ID" },
    },
},
```

- [ ] **Step 5: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/playground/component-registry.ts
git commit -m "fix: correct component registry API mismatches"
```

---

### Task 2: Fix Consumer Page Bugs

**Files:**
- Modify: `docs-site/src/routes/docs/playground/+page.svelte`
- Modify: `examples/showcase/src/routes/playground/+page.svelte`

- [ ] **Step 1: Fix Tabs defaultValue → value in docs-site**

In `docs-site/src/routes/docs/playground/+page.svelte`, find:
```svelte
<Tabs defaultValue={props.defaultValue}>
```
Replace with:
```svelte
<Tabs value={props.value}>
```

- [ ] **Step 2: Fix Tabs defaultValue → value in showcase**

In `examples/showcase/src/routes/playground/+page.svelte`, find:
```svelte
<Tabs defaultValue={props.defaultValue}>
```
Replace with:
```svelte
<Tabs value={props.value}>
```

- [ ] **Step 3: Remove nonexistent size prop from Drawer in docs-site**

In `docs-site/src/routes/docs/playground/+page.svelte`, find:
```svelte
<Drawer bind:open={drawerOpen} side={props.side} size={props.size}>
```
Replace with:
```svelte
<Drawer bind:open={drawerOpen} side={props.side}>
```

- [ ] **Step 4: Remove nonexistent size prop from Drawer in showcase**

In `examples/showcase/src/routes/playground/+page.svelte`, find:
```svelte
<Drawer bind:open={drawerOpen} side={props.side} size={props.size}>
```
Replace with:
```svelte
<Drawer bind:open={drawerOpen} side={props.side}>
```

- [ ] **Step 5: Add missing Breadcrumb and Stepper preview branches in docs-site**

In `docs-site/src/routes/docs/playground/+page.svelte`, add before the `{:else}` branch:
```svelte
{:else if definition.name === "Breadcrumb"}
  <div class="w-full">
    <Breadcrumb items={[
      { label: "Home", href: "/" },
      { label: "Library" },
      { label: "Current Page" },
    ]} separator={props.separator} />
  </div>
{:else if definition.name === "Stepper"}
  <div class="w-full">
    <Stepper
      steps={[
        { id: "step1", label: "Account" },
        { id: "step2", label: "Profile" },
        { id: "step3", label: "Confirm" },
      ]}
      currentStep={props.currentStep}
    />
  </div>
```

- [ ] **Step 6: Add missing Breadcrumb and Stepper preview branches in showcase**

Same changes as Step 5 in `examples/showcase/src/routes/playground/+page.svelte`.

- [ ] **Step 7: Verify files compile**

Run: `cd docs-site && bun run check && cd ../examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 8: Commit**

```bash
git add docs-site/src/routes/docs/playground/+page.svelte examples/showcase/src/routes/playground/+page.svelte
git commit -m "fix: correct Tabs/Drawer/Breadcrumb/Stepper in consumer pages"
```

---

### Task 3: Fix Broken useDebouncedCallback Import

**Files:**
- Modify: `examples/showcase/src/routes/playground/composables/+page.svelte`

- [ ] **Step 1: Fix the import**

In `examples/showcase/src/routes/playground/composables/+page.svelte`, find line 3:
```ts
import { useCounter, useToggle, useClipboard, useDebouncedCallback } from "urupe-ui";
```
Replace with:
```ts
import { useCounter, useToggle, useClipboard, useDebounce } from "urupe-ui";
```

- [ ] **Step 2: Fix the usage**

Find the usage of `useDebouncedCallback` and replace with `useDebounce`. The `useDebounce` function when called with a function as first argument returns a debounced wrapper.

- [ ] **Step 3: Verify file compiles**

Run: `cd examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add examples/showcase/src/routes/playground/composables/+page.svelte
git commit -m "fix: correct useDebouncedCallback → useDebounce import"
```

---

## Phase 2: Architecture Fixes

### Task 4: Add Playground Export Path to Package.json

**Files:**
- Modify: `packages/bindrunes/package.json:20-86`

- [ ] **Step 1: Add playground export**

In `packages/bindrunes/package.json`, add after the `"./responsive"` export:
```json
"./playground": {
    "types": "./dist/playground/index.d.ts",
    "svelte": "./dist/playground/index.js",
    "default": "./dist/playground/index.js"
},
```

- [ ] **Step 2: Verify package builds**

Run: `cd packages/bindrunes && bun run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/package.json
git commit -m "feat: add ./playground export path to package.json"
```

---

### Task 5: Fix Dual State Sources in Playground.svelte

**Files:**
- Modify: `packages/bindrunes/src/playground/Playground.svelte:46-75`

- [ ] **Step 1: Remove local state variables**

The current code creates local `$state` variables that shadow `playgroundState.current` and syncs one-way. Remove the local state and use `playgroundState` directly.

Remove lines 46-48:
```ts
let themeValue = $state(playgroundState.current.theme);
let aestheticValue = $state(playgroundState.current.aesthetic);
let densityValue = $state(playgroundState.current.density);
```

- [ ] **Step 2: Remove the one-way sync effects**

Remove lines 65-75:
```ts
$effect(() => {
    playgroundState.setTheme(themeValue);
});

$effect(() => {
    playgroundState.setAesthetic(aestheticValue);
});

$effect(() => {
    playgroundState.setDensity(densityValue);
});
```

- [ ] **Step 3: Update Select bindings**

Replace `bind:value={themeValue}` with direct state binding:
```svelte
<Select
    value={() => playgroundState.current.theme, (v) => playgroundState.setTheme(v)}
    options={[...]}
/>
```

Do the same for aesthetic and density Selects.

- [ ] **Step 4: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/playground/Playground.svelte
git commit -m "fix: remove dual state sources in Playground.svelte"
```

---

## Phase 3: DX Improvements

### Task 6: Add Share URL Button to Playground

**Files:**
- Modify: `packages/bindrunes/src/playground/Playground.svelte:80-95`

- [ ] **Step 1: Add share button to header**

In the header section, add a share button next to the ExportButton:
```svelte
<div class="flex gap-2">
    <Button
        variant="outline"
        size="sm"
        onclick={async () => {
            await playgroundState.copyShareUrl();
        }}
    >
        Share URL
    </Button>
    <ExportButton
        definition={currentDefinition}
        props={playgroundState.current.props}
        theme={playgroundState.current.theme}
        aesthetic={playgroundState.current.aesthetic}
        density={playgroundState.current.density}
    />
</div>
```

- [ ] **Step 2: Add reset button**

Add a reset button in the header:
```svelte
<Button
    variant="ghost"
    size="sm"
    onclick={() => playgroundState.reset()}
>
    Reset
</Button>
```

- [ ] **Step 3: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes/src/playground/Playground.svelte
git commit -m "feat: add Share URL and Reset buttons to playground"
```

---

### Task 7: Fix CodeSandbox Export Completeness

**Files:**
- Modify: `packages/bindrunes/src/playground/ExportButton.svelte:45-78`

- [ ] **Step 1: Add missing dependencies**

In `packages/bindrunes/src/playground/ExportButton.svelte`, update the `packageJson` derived:

```ts
const packageJson = $derived(
    JSON.stringify(
        {
            name: "urupe-ui-playground",
            private: true,
            scripts: {
                dev: "vite dev",
                build: "vite build",
                preview: "vite preview",
            },
            dependencies: {
                urupe-ui: "latest",
                svelte: "^5.0.0",
                "@sveltejs/kit": "^2.0.0",
                "@sveltejs/adapter-auto": "^3.0.0",
                "@sveltejs/vite-plugin-svelte": "^5.0.0",
                tailwindcss: "^4.0.0",
                "@tailwindcss/vite": "^4.0.0",
                vite: "^6.0.0",
                mode-watcher: "^1.1.0",
                "svelte-sonner": "^1.1.1",
                "lucide-svelte": "^1.0.1",
            },
        },
        null,
        2,
    ),
);
```

- [ ] **Step 2: Fix app.html to include %sveltekit.head%**

Update the `src/app.html` content:

```ts
"src/app.html": {
    content: `<!DOCTYPE html>\n<html lang="en" data-theme="${theme}" data-aesthetic="${aesthetic}" data-density="${density}">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>urupe-ui Playground</title>\n    %sveltekit.head%\n  </head>\n  <body>\n    <div style="display: contents">%sveltekit.body%</div>\n  </body>\n</html>`,
},
```

- [ ] **Step 3: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes/src/playground/ExportButton.svelte
git commit -m "fix: complete CodeSandbox export with missing dependencies"
```

---

### Task 8: Add URL State Validation

**Files:**
- Modify: `packages/bindrunes/src/playground/playground-state.svelte.ts:68-76`

- [ ] **Step 1: Validate component name against registry**

In `packages/bindrunes/src/playground/playground-state.svelte.ts`, add validation when loading from URL:

```ts
import { componentRegistry } from "./component-registry";

// ... in createPlaygroundState function, after loading from URL:

if (isBrowser) {
    const urlState = decodeState(window.location.search);
    
    // Validate component name exists in registry
    if (urlState.component) {
        const exists = componentRegistry.some((c) => c.name === urlState.component);
        if (exists) {
            state.component = urlState.component;
        }
    }
    
    if (urlState.props) state.props = urlState.props;
    if (urlState.theme) state.theme = urlState.theme;
    if (urlState.aesthetic) state.aesthetic = urlState.aesthetic;
    if (urlState.density) state.density = urlState.density;
    if (urlState.previewMode) state.previewMode = urlState.previewMode;
}
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/playground-state.svelte.ts
git commit -m "fix: validate URL state component name against registry"
```

---

## Phase 4: Quality Polish

### Task 9: Fix $derived Misuse in CodePreview

**Files:**
- Modify: `packages/bindrunes/src/playground/CodePreview.svelte:13-28`

- [ ] **Step 1: Fix derived pattern**

Replace:
```ts
const generatedCode = $derived(() => {
    // ... returns a string
});
```

With:
```ts
const generatedCode = $derived.by(() => {
    const propEntries = Object.entries(props)
        .filter(([, v]) => v !== undefined && v !== "" && v !== false)
        .map(([k, v]) => {
            if (typeof v === "boolean") return v ? k : "";
            if (typeof v === "number") return `${k}={${v}}`;
            return `${k}="${v}"`;
        })
        .filter(Boolean)
        .join(" ");

    const propStr = propEntries ? ` ${propEntries}` : "";
    const slotContent = definition.slot ? `\n  ${definition.slot}\n` : "";

    return `import { ${definition.name} } from "${definition.importPath}";\n\n<${definition.name}${propStr}>${slotContent}</${definition.name}>`;
});
```

Then update line 33 from `code={generatedCode()}` to `code={generatedCode}`.

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/CodePreview.svelte
git commit -m "fix: correct $derived usage in CodePreview"
```

---

### Task 10: Fix PropControls Mixed Binding

**Files:**
- Modify: `packages/bindrunes/src/playground/PropControls.svelte:38-43`

- [ ] **Step 1: Remove bind:value from Select**

Replace:
```svelte
<Select
    bind:value={localValues[key]}
    options={(prop.options ?? []).map((o) => ({ label: o, value: o }))}
    onValueChange={(v) => onChange(key, v)}
/>
```

With:
```svelte
<Select
    value={localValues[key] ?? prop.default}
    options={(prop.options ?? []).map((o) => ({ label: o, value: o }))}
    onValueChange={(v) => onChange(key, v)}
/>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/PropControls.svelte
git commit -m "fix: remove mixed binding pattern in PropControls"
```

---

### Task 11: Add Accessibility Improvements

**Files:**
- Modify: `packages/bindrunes/src/playground/Playground.svelte:148-203`

- [ ] **Step 1: Add aria-label to search input**

Find line 149-154:
```svelte
<input
    type="text"
    bind:value={searchQuery}
    placeholder="Search..."
    class="..."
/>
```

Add `aria-label`:
```svelte
<input
    type="text"
    bind:value={searchQuery}
    placeholder="Search..."
    aria-label="Search components"
    class="..."
/>
```

- [ ] **Step 2: Add aria-pressed to preview mode buttons**

Find the preview mode buttons (lines 195-203). For each button, add `aria-pressed`:
```svelte
<button
    type="button"
    onclick={() => playgroundState.setPreviewMode(mode)}
    aria-pressed={playgroundState.current.previewMode === mode}
    class="..."
>
    {mode}
</button>
```

- [ ] **Step 3: Add aria-pressed to category filter buttons**

Find the category filter buttons (lines 162-170). Add `aria-pressed`:
```svelte
<button
    type="button"
    onclick={() => (selectedCategory = category)}
    aria-pressed={selectedCategory === category}
    class="..."
>
    {category}
</button>
```

- [ ] **Step 4: Add role and aria-label to ResponsiveFrame**

In `packages/bindrunes/src/playground/ResponsiveFrame.svelte`, add to the outer div:
```svelte
<div
    role="region"
    aria-label="Component preview"
    class="..."
>
```

- [ ] **Step 5: Verify files compile**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/playground/Playground.svelte packages/bindrunes/src/playground/ResponsiveFrame.svelte
git commit -m "fix: add accessibility attributes to playground"
```

---

### Task 12: Add Debounce to URL Sync

**Files:**
- Modify: `packages/bindrunes/src/playground/playground-state.svelte.ts:78-85`

- [ ] **Step 1: Add debounce to URL sync effect**

Replace the effect:
```ts
$effect(() => {
    if (isBrowser) {
        const search = encodeState(state);
        const url = new URL(window.location.href);
        url.search = search;
        window.history.replaceState({}, "", url.toString());
    }
});
```

With debounced version:
```ts
let syncTimeout: ReturnType<typeof setTimeout> | undefined;

$effect(() => {
    if (isBrowser) {
        // Read state to track dependencies
        const _ = JSON.stringify(state);
        
        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            const search = encodeState(state);
            const url = new URL(window.location.href);
            url.search = search;
            window.history.replaceState({}, "", url.toString());
        }, 300);
    }
});
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/playground-state.svelte.ts
git commit -m "perf: debounce URL state sync to avoid excessive history updates"
```

---

## Final Verification

- [ ] **Step 1: Run lint**

Run: `bun run lint`
Expected: No errors

- [ ] **Step 2: Run type check**

Run: `bun run check`
Expected: No new errors (pre-existing errors in other files are acceptable)

- [ ] **Step 3: Run tests**

Run: `bun run test`
Expected: All tests pass

- [ ] **Step 4: Build library**

Run: `bun run build`
Expected: Build succeeds

---

## Summary

| Task | Description | Severity |
|------|-------------|----------|
| 1 | Fix component registry API mismatches | Critical |
| 2 | Fix consumer page bugs (Tabs, Drawer, Breadcrumb, Stepper) | Critical |
| 3 | Fix broken useDebouncedCallback import | Critical |
| 4 | Add ./playground export path | Architecture |
| 5 | Fix dual state sources | Architecture |
| 6 | Add Share URL and Reset buttons | DX |
| 7 | Fix CodeSandbox export completeness | DX |
| 8 | Add URL state validation | DX |
| 9 | Fix $derived misuse in CodePreview | Quality |
| 10 | Fix PropControls mixed binding | Quality |
| 11 | Add accessibility improvements | Quality |
| 12 | Add debounce to URL sync | Quality |
