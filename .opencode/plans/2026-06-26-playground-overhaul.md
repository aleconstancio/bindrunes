# Playground Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate three fragmented playgrounds into one unified, feature-rich playground with full component coverage, URL state persistence, responsive preview, and sandbox export.

**Architecture:** Enhance the docs-site playground as the single source of truth. Create a reusable playground component library in `packages/bindrunes/src/playground/` that powers both docs-site and showcase. Add URL search param state management for shareability.

**Tech Stack:** Svelte 5 runes, URL search params, iframe-based responsive preview, CodeSandbox API

---

## File Map

### Phase 1 — Component Registry & Unified Playground Core

| Action | File |
|--------|------|
| Create | `packages/bindrunes/src/playground/component-registry.ts` |
| Create | `packages/bindrunes/src/playground/Playground.svelte` |
| Create | `packages/bindrunes/src/playground/PropControls.svelte` |
| Create | `packages/bindrunes/src/playground/CodePreview.svelte` |
| Create | `packages/bindrunes/src/playground/playground-state.svelte.ts` |
| Modify | `packages/bindrunes/src/playground/index.ts` |

### Phase 2 — URL State & Responsive Preview

| Action | File |
|--------|------|
| Create | `packages/bindrunes/src/playground/ResponsiveFrame.svelte` |
| Create | `packages/bindrunes/src/playground/ExportButton.svelte` |
| Modify | `packages/bindrunes/src/playground/Playground.svelte` |

### Phase 3 — Docs-Site Integration

| Action | File |
|--------|------|
| Modify | `docs-site/src/routes/docs/playground/+page.svelte` |
| Modify | `docs-site/src/lib/navigation.ts` |

### Phase 4 — Showcase Migration & Component Index Fix

| Action | File |
|--------|------|
| Modify | `examples/showcase/src/routes/playground/+page.svelte` |
| Modify | `examples/showcase/src/routes/components/+page.svelte` |

---

## Phase 1 Tasks

### Task 1: Create Component Registry

**Files:**
- Create: `packages/bindrunes/src/playground/component-registry.ts`

- [ ] **Step 1: Create the component registry file**

```ts
// packages/bindrunes/src/playground/component-registry.ts

export interface PropDefinition {
  type: "select" | "switch" | "text" | "number" | "color";
  options?: string[];
  default: unknown;
  label?: string;
  description?: string;
}

export interface ComponentDefinition {
  name: string;
  category: string;
  description: string;
  importPath: string;
  props: Record<string, PropDefinition>;
  slot?: string;
  slotType?: "text" | "snippet";
  examples?: string[];
}

export const componentRegistry: ComponentDefinition[] = [
  // Foundation
  {
    name: "Button",
    category: "Foundation",
    description: "Button with aesthetic hooks",
    importPath: "bindrunes",
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
    category: "Foundation",
    description: "Status/tag badge",
    importPath: "bindrunes",
    props: {
      variant: { type: "select", options: ["primary", "secondary", "outline", "soft", "destructive", "success", "warning", "info"], default: "primary" },
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
    },
    slot: "Label",
  },
  {
    name: "Card",
    category: "Foundation",
    description: "Card container",
    importPath: "bindrunes",
    props: {
      variant: { type: "select", options: ["surface", "glass", "outlined", "ghost"], default: "surface" },
      padding: { type: "switch", default: true },
      interactive: { type: "switch", default: false },
    },
    slot: "Card content goes here.",
  },
  {
    name: "Alert",
    category: "Foundation",
    description: "Alert messages with variants",
    importPath: "bindrunes",
    props: {
      variant: { type: "select", options: ["info", "success", "warning", "destructive"], default: "info" },
      title: { type: "text", default: "Information" },
    },
    slot: "This is an informational message.",
  },
  {
    name: "Avatar",
    category: "Foundation",
    description: "User avatar",
    importPath: "bindrunes",
    props: {
      size: { type: "select", options: ["sm", "md", "lg", "xl"], default: "md" },
      name: { type: "text", default: "John Doe" },
    },
  },
  {
    name: "Separator",
    category: "Foundation",
    description: "Visual divider",
    importPath: "bindrunes",
    props: {
      orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
    },
  },
  {
    name: "Skeleton",
    category: "Foundation",
    description: "Loading skeleton",
    importPath: "bindrunes",
    props: {
      lines: { type: "number", default: 3 },
      width: { type: "text", default: "100%" },
    },
  },
  {
    name: "Progress",
    category: "Foundation",
    description: "Progress bar",
    importPath: "bindrunes",
    props: {
      value: { type: "number", default: 60 },
      max: { type: "number", default: 100 },
      showValue: { type: "switch", default: true },
    },
  },

  // Forms
  {
    name: "Input",
    category: "Forms",
    description: "Text input",
    importPath: "bindrunes",
    props: {
      placeholder: { type: "text", default: "Enter text..." },
      disabled: { type: "switch", default: false },
      required: { type: "switch", default: false },
      type: { type: "select", options: ["text", "email", "password", "number", "search", "tel", "url"], default: "text" },
    },
  },
  {
    name: "Checkbox",
    category: "Forms",
    description: "Checkbox input",
    importPath: "bindrunes",
    props: {
      disabled: { type: "switch", default: false },
      label: { type: "text", default: "Accept terms" },
    },
  },
  {
    name: "Select",
    category: "Forms",
    description: "Select dropdown",
    importPath: "bindrunes",
    props: {
      placeholder: { type: "text", default: "Select an option..." },
      disabled: { type: "switch", default: false },
    },
  },
  {
    name: "Switch",
    category: "Forms",
    description: "Toggle switch",
    importPath: "bindrunes",
    props: {
      disabled: { type: "switch", default: false },
    },
  },
  {
    name: "Slider",
    category: "Forms",
    description: "Range slider",
    importPath: "bindrunes",
    props: {
      min: { type: "number", default: 0 },
      max: { type: "number", default: 100 },
      step: { type: "number", default: 1 },
      disabled: { type: "switch", default: false },
    },
  },

  // Data Display
  {
    name: "DataTable",
    category: "Data",
    description: "Full data table with sort/filter/pagination",
    importPath: "bindrunes",
    props: {
      striped: { type: "switch", default: false },
      hoverable: { type: "switch", default: true },
    },
  },
  {
    name: "Tabs",
    category: "Data",
    description: "Tab system",
    importPath: "bindrunes",
    props: {
      defaultValue: { type: "text", default: "tab1" },
    },
  },
  {
    name: "Pagination",
    category: "Data",
    description: "Page navigation",
    importPath: "bindrunes",
    props: {
      totalPages: { type: "number", default: 10 },
      currentPage: { type: "number", default: 1 },
    },
  },

  // Overlays
  {
    name: "Dialog",
    category: "Overlays",
    description: "Modal dialog",
    importPath: "bindrunes",
    props: {
      title: { type: "text", default: "Dialog Title" },
      size: { type: "select", options: ["sm", "md", "lg", "xl", "full"], default: "md" },
    },
    slot: "Dialog content goes here.",
  },
  {
    name: "Tooltip",
    category: "Overlays",
    description: "Tooltip",
    importPath: "bindrunes",
    props: {
      side: { type: "select", options: ["top", "right", "bottom", "left"], default: "top" },
      content: { type: "text", default: "Tooltip content" },
    },
    slot: "Hover me",
  },
  {
    name: "Drawer",
    category: "Overlays",
    description: "Side drawer",
    importPath: "bindrunes",
    props: {
      side: { type: "select", options: ["left", "right", "top", "bottom"], default: "right" },
      size: { type: "select", options: ["sm", "md", "lg", "full"], default: "md" },
    },
    slot: "Drawer content goes here.",
  },

  // Feedback
  {
    name: "Spinner",
    category: "Feedback",
    description: "Loading spinner",
    importPath: "bindrunes",
    props: {
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
    },
  },
  {
    name: "EmptyState",
    category: "Feedback",
    description: "Empty state placeholders",
    importPath: "bindrunes",
    props: {
      title: { type: "text", default: "No items found" },
      description: { type: "text", default: "Create your first item to get started." },
    },
  },

  // Navigation
  {
    name: "Breadcrumb",
    category: "Navigation",
    description: "Breadcrumb navigation",
    importPath: "bindrunes",
    props: {},
  },
  {
    name: "Stepper",
    category: "Navigation",
    description: "Step-by-step wizard UI",
    importPath: "bindrunes",
    props: {
      currentStep: { type: "number", default: 1 },
      totalSteps: { type: "number", default: 4 },
    },
  },
];

export const categories = [...new Set(componentRegistry.map(c => c.category))];

export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return componentRegistry.filter(c => c.category === category);
}

export function searchComponents(query: string): ComponentDefinition[] {
  const q = query.toLowerCase();
  return componentRegistry.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q)
  );
}
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/component-registry.ts
git commit -m "feat: add centralized component registry for playground"
```

---

### Task 2: Create Playground State Management

**Files:**
- Create: `packages/bindrunes/src/playground/playground-state.svelte.ts`

- [ ] **Step 1: Create the playground state manager**

```ts
// packages/bindrunes/src/playground/playground-state.svelte.ts

import { browser } from "../../utils/isBrowser";

export interface PlaygroundState {
  component: string;
  props: Record<string, unknown>;
  theme: string;
  aesthetic: string;
  density: string;
  previewMode: "desktop" | "tablet" | "mobile";
}

function encodeState(state: PlaygroundState): string {
  const params = new URLSearchParams();
  params.set("c", state.component);
  params.set("t", state.theme);
  params.set("a", state.aesthetic);
  params.set("d", state.density);
  params.set("p", state.previewMode);
  
  const propsJson = JSON.stringify(state.props);
  if (propsJson !== "{}") {
    params.set("props", btoa(propsJson));
  }
  
  return params.toString();
}

function decodeState(search: string): Partial<PlaygroundState> {
  const params = new URLSearchParams(search);
  const state: Partial<PlaygroundState> = {};
  
  if (params.has("c")) state.component = params.get("c")!;
  if (params.has("t")) state.theme = params.get("t")!;
  if (params.has("a")) state.aesthetic = params.get("a")!;
  if (params.has("d")) state.density = params.get("d")!;
  if (params.has("p")) state.previewMode = params.get("p") as PlaygroundState["previewMode"];
  
  if (params.has("props")) {
    try {
      state.props = JSON.parse(atob(params.get("props")!));
    } catch {
      state.props = {};
    }
  }
  
  return state;
}

export function createPlaygroundState(defaults: Partial<PlaygroundState> = {}) {
  let state = $state<PlaygroundState>({
    component: defaults.component ?? "Button",
    props: defaults.props ?? {},
    theme: defaults.theme ?? "editorial",
    aesthetic: defaults.aesthetic ?? "minimal",
    density: defaults.density ?? "comfortable",
    previewMode: defaults.previewMode ?? "desktop",
  });

  // Load from URL on init
  if (browser) {
    const urlState = decodeState(window.location.search);
    if (urlState.component) state.component = urlState.component;
    if (urlState.props) state.props = urlState.props;
    if (urlState.theme) state.theme = urlState.theme;
    if (urlState.aesthetic) state.aesthetic = urlState.aesthetic;
    if (urlState.density) state.density = urlState.density;
    if (urlState.previewMode) state.previewMode = urlState.previewMode;
  }

  // Sync to URL on change
  $effect(() => {
    if (browser) {
      const search = encodeState(state);
      const url = new URL(window.location.href);
      url.search = search;
      window.history.replaceState({}, "", url.toString());
    }
  });

  return {
    get current() { return state; },
    setComponent(name: string) {
      state.component = name;
      state.props = {};
    },
    setProp(key: string, value: unknown) {
      state.props = { ...state.props, [key]: value };
    },
    setTheme(theme: string) { state.theme = theme; },
    setAesthetic(aesthetic: string) { state.aesthetic = aesthetic; },
    setDensity(density: string) { state.density = density; },
    setPreviewMode(mode: PlaygroundState["previewMode"]) { state.previewMode = mode; },
    reset() {
      state.component = "Button";
      state.props = {};
      state.theme = "editorial";
      state.aesthetic = "minimal";
      state.density = "comfortable";
      state.previewMode = "desktop";
    },
    getShareUrl(): string {
      return `${window.location.origin}${window.location.pathname}?${encodeState(state)}`;
    },
    copyShareUrl(): Promise<void> {
      return navigator.clipboard.writeText(this.getShareUrl());
    },
  };
}

export type PlaygroundStateInstance = ReturnType<typeof createPlaygroundState>;
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/playground-state.svelte.ts
git commit -m "feat: add URL-state playground manager with share support"
```

---

### Task 3: Create PropControls Component

**Files:**
- Create: `packages/bindrunes/src/playground/PropControls.svelte`

- [ ] **Step 1: Create PropControls component**

```svelte
<!-- packages/bindrunes/src/playground/PropControls.svelte -->
<script lang="ts">
  import type { ComponentDefinition } from "./component-registry";
  import { Input, Select, Switch } from "../../index";

  interface Props {
    definition: ComponentDefinition;
    values: Record<string, unknown>;
    onChange: (key: string, value: unknown) => void;
  }

  let { definition, values, onChange }: Props = $props();
</script>

<div class="space-y-4">
  <h4 class="text-title-3 text-foreground">Props</h4>
  {#each Object.entries(definition.props) as [key, prop]}
    <div class="space-y-1">
      <label class="text-label-sm text-muted-foreground">
        {prop.label ?? key}
        {#if prop.description}
          <span class="text-muted-foreground/60"> — {prop.description}</span>
        {/if}
      </label>
      {#if prop.type === "select"}
        <Select
          value={() => values[key] ?? prop.default, (v) => onChange(key, v)}
          options={(prop.options ?? []).map((o) => ({ label: o, value: o }))}
        />
      {:else if prop.type === "switch"}
        <Switch
          checked={() => (values[key] ?? prop.default) as boolean, (v) => onChange(key, v)}
        />
      {:else if prop.type === "text"}
        <Input
          value={() => (values[key] ?? prop.default) as string, (v) => onChange(key, v)}
        />
      {:else if prop.type === "number"}
        <Input
          type="number"
          value={() => String(values[key] ?? prop.default), (v) => onChange(key, Number(v))}
        />
      {:else if prop.type === "color"}
        <input
          type="color"
          value={String(values[key] ?? prop.default)}
          onchange={(e) => onChange(key, e.currentTarget.value)}
          class="w-full h-10 rounded-[--radius] border border-border cursor-pointer"
        />
      {/if}
    </div>
  {/each}
</div>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/PropControls.svelte
git commit -m "feat: add dynamic PropControls component for playground"
```

---

### Task 4: Create CodePreview Component

**Files:**
- Create: `packages/bindrunes/src/playground/CodePreview.svelte`

- [ ] **Step 1: Create CodePreview component**

```svelte
<!-- packages/bindrunes/src/playground/CodePreview.svelte -->
<script lang="ts">
  import type { ComponentDefinition } from "./component-registry";
  import { CodeSnippet } from "../../index";

  interface Props {
    definition: ComponentDefinition;
    props: Record<string, unknown>;
  }

  let { definition, props }: Props = $props();

  const generatedCode = $derived(() => {
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
</script>

<div class="space-y-4">
  <h4 class="text-title-3 text-foreground">Generated Code</h4>
  <CodeSnippet code={generatedCode()} language="svelte" title="App.svelte" />
</div>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/CodePreview.svelte
git commit -m "feat: add CodePreview component with dynamic code generation"
```

---

### Task 5: Create ResponsiveFrame Component

**Files:**
- Create: `packages/bindrunes/src/playground/ResponsiveFrame.svelte`

- [ ] **Step 1: Create ResponsiveFrame component**

```svelte
<!-- packages/bindrunes/src/playground/ResponsiveFrame.svelte -->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    mode: "desktop" | "tablet" | "mobile";
    theme?: string;
    aesthetic?: string;
    density?: string;
    children: Snippet;
  }

  let { mode, theme = "editorial", aesthetic = "minimal", density = "comfortable", children }: Props = $props();

  const widths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  const labels = {
    desktop: "Desktop",
    tablet: "Tablet (768px)",
    mobile: "Mobile (375px)",
  };
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between">
    <span class="text-label-sm text-muted-foreground">{labels[mode]}</span>
    <span class="text-label-xs text-muted-foreground/60">{widths[mode]}</span>
  </div>
  <div
    class="mx-auto border border-border rounded-[--radius-lg] overflow-hidden bg-background transition-all duration-200"
    style:width={widths[mode]}
    style:max-width="100%"
    data-theme={theme}
    data-aesthetic={aesthetic}
    data-density={density}
  >
    <div class="p-4">
      {@render children()}
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/ResponsiveFrame.svelte
git commit -m "feat: add ResponsiveFrame component for device preview modes"
```

---

### Task 6: Create ExportButton Component

**Files:**
- Create: `packages/bindrunes/src/playground/ExportButton.svelte`

- [ ] **Step 1: Create ExportButton component**

```svelte
<!-- packages/bindrunes/src/playground/ExportButton.svelte -->
<script lang="ts">
  import { Button } from "../../index";
  import type { ComponentDefinition } from "./component-registry";

  interface Props {
    definition: ComponentDefinition;
    props: Record<string, unknown>;
    theme?: string;
    aesthetic?: string;
    density?: string;
  }

  let { definition, props, theme = "editorial", aesthetic = "minimal", density = "comfortable" }: Props = $props();

  const propEntries = $derived(
    Object.entries(props)
      .filter(([, v]) => v !== undefined && v !== "" && v !== false)
      .map(([k, v]) => {
        if (typeof v === "boolean") return v ? k : "";
        if (typeof v === "number") return `${k}={${v}}`;
        return `${k}="${v}"`;
      })
      .filter(Boolean)
      .join(" ")
  );

  const propStr = $derived(propEntries ? ` ${propEntries}` : "");
  const slotContent = $derived(definition.slot ? `\n  ${definition.slot}\n` : "");

  const svelteCode = $derived(
    `<script lang="ts">\n  import { ${definition.name} } from "bindrunes";\n<\/script>\n\n<div data-theme="${theme}" data-aesthetic="${aesthetic}" data-density="${density}">\n  <${definition.name}${propStr}>${slotContent}</${definition.name}>\n</div>`
  );

  const packageJson = $derived(JSON.stringify({
    name: "bindrunes-playground",
    private: true,
    scripts: {
      dev: "vite dev",
      build: "vite build",
    },
    dependencies: {
      bindrunes: "latest",
      svelte: "^5.0.0",
      "@sveltejs/kit": "^2.0.0",
      tailwindcss: "^4.0.0",
    },
  }, null, 2));

  async function exportToCodeSandbox() {
    const parameters = {
      files: {
        "package.json": { content: packageJson },
        "src/routes/+page.svelte": { content: svelteCode },
        "src/app.html": { content: `<!DOCTYPE html>\n<html lang="en" data-theme="${theme}" data-aesthetic="${aesthetic}" data-density="${density}">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>bindrunes Playground</title>\n  </head>\n  <body>\n    <div style="display: contents">%sveltekit.body%</div>\n  </body>\n</html>` },
        "src/app.css": { content: `@import "tailwindcss";\n@plugin "bindrunes/tailwind";\n@import "bindrunes/styles/global.css";` },
      },
    };

    const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${encodeURIComponent(btoa(JSON.stringify(parameters)))}`;
    window.open(url, "_blank");
  }

  async function copyCode() {
    await navigator.clipboard.writeText(svelteCode);
  }
</script>

<div class="flex gap-2">
  <Button variant="outline" size="sm" onclick={copyCode}>
    Copy Code
  </Button>
  <Button variant="primary" size="sm" onclick={exportToCodeSandbox}>
    Open in CodeSandbox
  </Button>
</div>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/ExportButton.svelte
git commit -m "feat: add ExportButton with CodeSandbox export and copy code"
```

---

### Task 7: Create Main Playground Component

**Files:**
- Create: `packages/bindrunes/src/playground/Playground.svelte`

- [ ] **Step 1: Create main Playground component**

```svelte
<!-- packages/bindrunes/src/playground/Playground.svelte -->
<script lang="ts">
  import { componentRegistry, categories, type ComponentDefinition } from "./component-registry";
  import { createPlaygroundState } from "./playground-state.svelte";
  import PropControls from "./PropControls.svelte";
  import CodePreview from "./CodePreview.svelte";
  import ResponsiveFrame from "./ResponsiveFrame.svelte";
  import ExportButton from "./ExportButton.svelte";
  import { Badge, Button, Card, Input, Select } from "../../index";

  interface Props {
    initialComponent?: string;
    initialTheme?: string;
    initialAesthetic?: string;
    initialDensity?: string;
  }

  let {
    initialComponent = "Button",
    initialTheme = "editorial",
    initialAesthetic = "minimal",
    initialDensity = "comfortable",
  }: Props = $props();

  const state = createPlaygroundState({
    component: initialComponent,
    theme: initialTheme,
    aesthetic: initialAesthetic,
    density: initialDensity,
  });

  const currentDefinition = $derived(
    componentRegistry.find((c) => c.name === state.current.component) ?? componentRegistry[0]
  );

  let searchQuery = $state("");
  let selectedCategory = $state("All");

  const filteredComponents = $derived(
    componentRegistry.filter((c) => {
      const matchesSearch = searchQuery === "" ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
  );

  function handlePropChange(key: string, value: unknown) {
    state.setProp(key, value);
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <Badge variant="primary">Playground</Badge>
      <h1 class="mt-2 text-display-1 text-foreground">Component Playground</h1>
      <p class="mt-1 text-body-lg text-muted-foreground">
        Interactively explore and configure bindrunes components.
      </p>
    </div>
    <ExportButton
      definition={currentDefinition}
      props={state.current.props}
      theme={state.current.theme}
      aesthetic={state.current.aesthetic}
      density={state.current.density}
    />
  </div>

  <!-- Theme/Aesthetic/Density Controls -->
  <Card padding>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label class="text-label-sm text-muted-foreground mb-1 block">Theme</label>
        <Select
          value={() => state.current.theme, (v) => state.setTheme(v)}
          options={[
            { label: "Editorial", value: "editorial" },
            { label: "Dracula", value: "dracula" },
            { label: "Nord", value: "nord" },
            { label: "Catppuccin", value: "catppuccin" },
            { label: "Rose Pine", value: "rose-pine" },
            { label: "GitHub", value: "github" },
          ]}
        />
      </div>
      <div>
        <label class="text-label-sm text-muted-foreground mb-1 block">Aesthetic</label>
        <Select
          value={() => state.current.aesthetic, (v) => state.setAesthetic(v)}
          options={[
            { label: "Minimal", value: "minimal" },
            { label: "Glass", value: "glass" },
            { label: "Bento", value: "bento" },
            { label: "Expressive", value: "expressive" },
          ]}
        />
      </div>
      <div>
        <label class="text-label-sm text-muted-foreground mb-1 block">Density</label>
        <Select
          value={() => state.current.density, (v) => state.setDensity(v)}
          options={[
            { label: "Compact", value: "compact" },
            { label: "Comfortable", value: "comfortable" },
            { label: "Spacious", value: "spacious" },
          ]}
        />
      </div>
    </div>
  </Card>

  <!-- Main Layout -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Component Selector -->
    <div class="lg:col-span-3 space-y-4">
      <Card padding>
        <h3 class="text-title-3 text-foreground mb-3">Components</h3>
        
        <!-- Search -->
        <div class="relative mb-3">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search..."
            class="w-full h-9 pl-9 pr-3 rounded-[--radius] border border-border bg-background text-body-sm text-foreground"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-1 mb-3">
          {#each ["All", ...categories] as category}
            <button
              type="button"
              onclick={() => (selectedCategory = category)}
              class="px-2 py-1 rounded-[--radius-sm] text-label-xs transition-colors cursor-pointer {selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}"
            >
              {category}
            </button>
          {/each}
        </div>

        <!-- Component List -->
        <div class="space-y-1 max-h-[400px] overflow-y-auto">
          {#each filteredComponents as comp}
            <button
              type="button"
              onclick={() => state.setComponent(comp.name)}
              class="w-full text-left px-3 py-2 rounded-[--radius-sm] text-body-sm transition-colors cursor-pointer {state.current.component === comp.name ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
            >
              <div class="font-medium">{comp.name}</div>
              <div class="text-label-xs opacity-60">{comp.category}</div>
            </button>
          {/each}
        </div>
      </Card>
    </div>

    <!-- Preview -->
    <div class="lg:col-span-5 space-y-4">
      <Card padding>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-title-3 text-foreground">Preview</h3>
          <div class="flex gap-1">
            {#each ["desktop", "tablet", "mobile"] as mode}
              <button
                type="button"
                onclick={() => state.setPreviewMode(mode)}
                class="px-2 py-1 rounded-[--radius-sm] text-label-xs transition-colors cursor-pointer {state.current.previewMode === mode ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}"
              >
                {mode}
              </button>
            {/each}
          </div>
        </div>
        
        <ResponsiveFrame
          mode={state.current.previewMode}
          theme={state.current.theme}
          aesthetic={state.current.aesthetic}
          density={state.current.density}
        >
          <div class="min-h-[200px] flex items-center justify-center">
            <!-- Component preview will be rendered here by the consumer -->
            <slot name="preview" definition={currentDefinition} props={state.current.props} />
          </div>
        </ResponsiveFrame>
      </Card>
    </div>

    <!-- Controls & Code -->
    <div class="lg:col-span-4 space-y-4">
      <Card padding>
        <PropControls
          definition={currentDefinition}
          values={state.current.props}
          onChange={handlePropChange}
        />
      </Card>

      <Card padding>
        <CodePreview
          definition={currentDefinition}
          props={state.current.props}
        />
      </Card>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/Playground.svelte
git commit -m "feat: add main Playground component with full layout"
```

---

### Task 8: Update Playground Exports

**Files:**
- Modify: `packages/bindrunes/src/playground/index.ts`

- [ ] **Step 1: Update the index.ts file**

```ts
// packages/bindrunes/src/playground/index.ts

export { default as DemoFooter } from "./DemoFooter.svelte";
export { default as DemoLayout } from "./DemoLayout.svelte";
export { default as DemoNav } from "./DemoNav.svelte";
export { default as Playground } from "./Playground.svelte";
export { default as PropControls } from "./PropControls.svelte";
export { default as CodePreview } from "./CodePreview.svelte";
export { default as ResponsiveFrame } from "./ResponsiveFrame.svelte";
export { default as ExportButton } from "./ExportButton.svelte";
export type { DemoState } from "./scaffold-context.svelte";
export { createDemoState, useDemo } from "./scaffold-context.svelte";
export { createPlaygroundState } from "./playground-state.svelte";
export { componentRegistry, categories, getComponentsByCategory, searchComponents } from "./component-registry";
export type { ComponentDefinition, PropDefinition } from "./component-registry";
export type {
  AestheticPreset,
  DemoFooterConfig,
  DemoFooterLink,
  DemoNavLink,
  DensityPreset,
  ShellMode,
  ThemePreset,
} from "./scaffold-types";
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/bindrunes && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/playground/index.ts
git commit -m "feat: export all playground components and utilities"
```

---

## Phase 2 Tasks

### Task 9: Integrate Playground into Docs-Site

**Files:**
- Modify: `docs-site/src/routes/docs/playground/+page.svelte`

- [ ] **Step 1: Replace the existing playground page**

```svelte
<!-- docs-site/src/routes/docs/playground/+page.svelte -->
<script lang="ts">
  import { Playground, Button, Badge, Card, Alert, Avatar, Separator, Skeleton, Progress, Input, Checkbox, Select, Switch, Slider, Dialog, Tooltip, TooltipProvider, Tabs, TabsList, TabsTrigger, TabsContent, Pagination, Spinner, EmptyState, Breadcrumb, Stepper, Drawer } from "bindrunes";

  let dialogOpen = $state(false);
  let drawerOpen = $state(false);
</script>

<div class="p-6 lg:p-8 max-w-7xl">
  <Playground>
    {#snippet preview({ definition, props })}
      {#if definition.name === "Button"}
        <Button {...props}>{definition.slot}</Button>
      {:else if definition.name === "Badge"}
        <Badge {...props}>{definition.slot}</Badge>
      {:else if definition.name === "Card"}
        <Card {...props}>{definition.slot}</Card>
      {:else if definition.name === "Alert"}
        <div class="w-full">
          <Alert {...props}>{definition.slot}</Alert>
        </div>
      {:else if definition.name === "Avatar"}
        <Avatar {...props} />
      {:else if definition.name === "Separator"}
        <div class="w-full {props.orientation === 'vertical' ? 'h-8' : ''}">
          <Separator {...props} />
        </div>
      {:else if definition.name === "Skeleton"}
        <div class="w-full">
          <Skeleton {...props} />
        </div>
      {:else if definition.name === "Progress"}
        <div class="w-full">
          <Progress {...props} />
        </div>
      {:else if definition.name === "Input"}
        <div class="w-full">
          <Input {...props} />
        </div>
      {:else if definition.name === "Checkbox"}
        <div class="w-full">
          <Checkbox label={props.label} disabled={props.disabled} />
        </div>
      {:else if definition.name === "Select"}
        <div class="w-full">
          <Select
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            placeholder={props.placeholder}
            disabled={props.disabled}
          />
        </div>
      {:else if definition.name === "Switch"}
        <Switch disabled={props.disabled} />
      {:else if definition.name === "Slider"}
        <div class="w-full">
          <Slider min={props.min} max={props.max} step={props.step} disabled={props.disabled} />
        </div>
      {:else if definition.name === "Dialog"}
        <div>
          <Button variant="outline" onclick={() => (dialogOpen = true)}>Open Dialog</Button>
          <Dialog bind:open={dialogOpen} title={props.title} size={props.size}>
            <p class="text-body-md text-muted-foreground">{definition.slot}</p>
          </Dialog>
        </div>
      {:else if definition.name === "Tooltip"}
        <TooltipProvider>
          <Tooltip content={props.content} side={props.side}>
            <Button variant="outline">{definition.slot}</Button>
          </Tooltip>
        </TooltipProvider>
      {:else if definition.name === "Drawer"}
        <div>
          <Button variant="outline" onclick={() => (drawerOpen = true)}>Open Drawer</Button>
          <Drawer bind:open={drawerOpen} side={props.side} size={props.size}>
            <p class="text-body-md text-muted-foreground">{definition.slot}</p>
          </Drawer>
        </div>
      {:else if definition.name === "Spinner"}
        <Spinner size={props.size} />
      {:else if definition.name === "EmptyState"}
        <div class="w-full">
          <EmptyState {...props} />
        </div>
      {:else if definition.name === "Tabs"}
        <div class="w-full">
          <Tabs defaultValue={props.defaultValue}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 1</p></TabsContent>
            <TabsContent value="tab2"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 2</p></TabsContent>
            <TabsContent value="tab3"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 3</p></TabsContent>
          </Tabs>
        </div>
      {:else if definition.name === "Pagination"}
        <div class="w-full">
          <Pagination totalPages={props.totalPages} currentPage={props.currentPage} />
        </div>
      {:else}
        <p class="text-body-sm text-muted-foreground">Preview not available for {definition.name}</p>
      {/if}
    {/snippet}
  </Playground>
</div>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd docs-site && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add docs-site/src/routes/docs/playground/+page.svelte
git commit -m "feat: integrate unified playground into docs-site"
```

---

### Task 10: Update Showcase Playground

**Files:**
- Modify: `examples/showcase/src/routes/playground/+page.svelte`

- [ ] **Step 1: Replace the showcase playground with unified version**

```svelte
<!-- examples/showcase/src/routes/playground/+page.svelte -->
<script lang="ts">
  import { Playground, Button, Badge, Card, Alert, Avatar, Separator, Skeleton, Progress, Input, Checkbox, Select, Switch, Slider, Dialog, Tooltip, TooltipProvider, Tabs, TabsList, TabsTrigger, TabsContent, Pagination, Spinner, EmptyState, Breadcrumb, Stepper, Drawer } from "bindrunes";

  let dialogOpen = $state(false);
  let drawerOpen = $state(false);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <Playground>
    {#snippet preview({ definition, props })}
      {#if definition.name === "Button"}
        <Button {...props}>{definition.slot}</Button>
      {:else if definition.name === "Badge"}
        <Badge {...props}>{definition.slot}</Badge>
      {:else if definition.name === "Card"}
        <Card {...props}>{definition.slot}</Card>
      {:else if definition.name === "Alert"}
        <div class="w-full">
          <Alert {...props}>{definition.slot}</Alert>
        </div>
      {:else if definition.name === "Avatar"}
        <Avatar {...props} />
      {:else if definition.name === "Separator"}
        <div class="w-full {props.orientation === 'vertical' ? 'h-8' : ''}">
          <Separator {...props} />
        </div>
      {:else if definition.name === "Skeleton"}
        <div class="w-full">
          <Skeleton {...props} />
        </div>
      {:else if definition.name === "Progress"}
        <div class="w-full">
          <Progress {...props} />
        </div>
      {:else if definition.name === "Input"}
        <div class="w-full">
          <Input {...props} />
        </div>
      {:else if definition.name === "Checkbox"}
        <div class="w-full">
          <Checkbox label={props.label} disabled={props.disabled} />
        </div>
      {:else if definition.name === "Select"}
        <div class="w-full">
          <Select
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            placeholder={props.placeholder}
            disabled={props.disabled}
          />
        </div>
      {:else if definition.name === "Switch"}
        <Switch disabled={props.disabled} />
      {:else if definition.name === "Slider"}
        <div class="w-full">
          <Slider min={props.min} max={props.max} step={props.step} disabled={props.disabled} />
        </div>
      {:else if definition.name === "Dialog"}
        <div>
          <Button variant="outline" onclick={() => (dialogOpen = true)}>Open Dialog</Button>
          <Dialog bind:open={dialogOpen} title={props.title} size={props.size}>
            <p class="text-body-md text-muted-foreground">{definition.slot}</p>
          </Dialog>
        </div>
      {:else if definition.name === "Tooltip"}
        <TooltipProvider>
          <Tooltip content={props.content} side={props.side}>
            <Button variant="outline">{definition.slot}</Button>
          </Tooltip>
        </TooltipProvider>
      {:else if definition.name === "Drawer"}
        <div>
          <Button variant="outline" onclick={() => (drawerOpen = true)}>Open Drawer</Button>
          <Drawer bind:open={drawerOpen} side={props.side} size={props.size}>
            <p class="text-body-md text-muted-foreground">{definition.slot}</p>
          </Drawer>
        </div>
      {:else if definition.name === "Spinner"}
        <Spinner size={props.size} />
      {:else if definition.name === "EmptyState"}
        <div class="w-full">
          <EmptyState {...props} />
        </div>
      {:else if definition.name === "Tabs"}
        <div class="w-full">
          <Tabs defaultValue={props.defaultValue}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 1</p></TabsContent>
            <TabsContent value="tab2"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 2</p></TabsContent>
            <TabsContent value="tab3"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 3</p></TabsContent>
          </Tabs>
        </div>
      {:else if definition.name === "Pagination"}
        <div class="w-full">
          <Pagination totalPages={props.totalPages} currentPage={props.currentPage} />
        </div>
      {:else}
        <p class="text-body-sm text-muted-foreground">Preview not available for {definition.name}</p>
      {/if}
    {/snippet}
  </Playground>
</div>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add examples/showcase/src/routes/playground/+page.svelte
git commit -m "feat: migrate showcase playground to unified component"
```

---

### Task 11: Fix Component Index Demo Paths

**Files:**
- Modify: `examples/showcase/src/routes/components/+page.svelte`

- [ ] **Step 1: Update component index with correct demo paths**

Read the file and update all components with `demoPath: ""` to point to the appropriate demo page or mark them as "Coming Soon".

Key fixes:
- `SocialLogin`: Change to `/auth/login`
- `AvailabilityGrid`: Change to `/calendar`
- `Banner`: Change to `/marketing/blog`
- `CommentSection`: Change to `/marketing/blog`
- `CrudForm`: Change to `/data/list`
- `CrudFormDrawer`: Change to `/data/list`
- `CrudFormModal`: Change to `/data/list`
- `CrudDeleteConfirm`: Change to `/data/list`
- `CrudDetailDrawer`: Change to `/data/list`
- `createApiClient`: Change to `/app`
- `createAuth`: Change to `/app`
- `createAccess`: Change to `/app`
- `createToast`: Change to `/app`
- `useDebounce`: Change to `/app`
- `useEventListener`: Change to `/app`
- `useIntersectionObserver`: Change to `/app`
- `useResizeObserver`: Change to `/app`

- [ ] **Step 2: Verify file compiles**

Run: `cd examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add examples/showcase/src/routes/components/+page.svelte
git commit -m "fix: update component index demo paths to working pages"
```

---

## Phase 3 Tasks

### Task 12: Clean Up Legacy Playground Data

**Files:**
- Delete: `examples/showcase/src/lib/playground-data.ts`

- [ ] **Step 1: Remove the old playground data file**

The new unified playground uses `component-registry.ts` from the package. The old `playground-data.ts` is no longer needed.

Run: `rm examples/showcase/src/lib/playground-data.ts`

- [ ] **Step 2: Update composables playground to use new imports**

The composables playground at `examples/showcase/src/routes/playground/composables/+page.svelte` should be kept as-is since it demonstrates composables, not components.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove legacy playground-data.ts"
```

---

### Task 13: Run Full Validation

**Files:**
- None (validation only)

- [ ] **Step 1: Run lint**

Run: `bun run lint`
Expected: No errors

- [ ] **Step 2: Run type check**

Run: `bun run check`
Expected: No errors

- [ ] **Step 3: Run tests**

Run: `bun run test`
Expected: All tests pass

- [ ] **Step 4: Build library**

Run: `bun run build`
Expected: Build succeeds

- [ ] **Step 5: Manual verification**

1. Run `cd docs-site && bun run dev`
2. Navigate to `/docs/playground`
3. Verify:
   - Component selector works
   - Prop controls update preview
   - Code generation works
   - Theme/aesthetic/density switcher works
   - Responsive preview modes work
   - Export button copies code and opens CodeSandbox
   - URL updates with state (shareable)

4. Run `cd examples/showcase && bun run dev`
5. Navigate to `/playground`
6. Verify same functionality

---

## Final Verification Checklist

- [ ] All three playgrounds consolidated into one
- [ ] URL state persistence works (share URLs)
- [ ] Responsive preview (desktop/tablet/mobile) works
- [ ] Code generation produces correct Svelte code
- [ ] Export to CodeSandbox works
- [ ] Copy code button works
- [ ] Theme/aesthetic/density switcher updates preview
- [ ] Component search and filter work
- [ ] All component index demo paths are valid
- [ ] No type errors
- [ ] All tests pass
- [ ] Library builds successfully
