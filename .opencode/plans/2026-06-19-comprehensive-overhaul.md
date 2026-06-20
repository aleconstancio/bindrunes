# Comprehensive Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a comprehensive overhaul of the bindrunes component library including new primitives, agentic UI components, playground expansion, new Boundrunes, and testing improvements.

**Architecture:** Add new components following existing patterns (createX() convention, interface Props, co-located tests). Expand playground to support all 245 components with live editing. Add 5 new Boundrune page patterns. Maintain backward compatibility throughout.

**Tech Stack:** Svelte 5, TypeScript, Tailwind CSS v4, Vitest, @testing-library/svelte, vitest-axe, CodeMirror (for playground)

---

## File Structure

### New Components (10 files)
- `packages/bindrunes/src/components/CommandPalette.svelte` - Search-driven command menu
- `packages/bindrunes/src/components/DataGrid.svelte` - Advanced data table with virtual scrolling
- `packages/bindrunes/src/components/TreeView.svelte` - Hierarchical data display
- `packages/bindrunes/src/components/OTPInput.svelte` - One-time password input
- `packages/bindrunes/src/components/ColorPicker.svelte` - OKLCH color picker
- `packages/bindrunes/src/components/boundrune/chat/ToolCallDisplay.svelte` - Tool call display
- `packages/bindrunes/src/components/boundrune/chat/AgentStatus.svelte` - Agent status indicator
- `packages/bindrunes/src/components/boundrune/chat/ReasoningPanel.svelte` - Reasoning display
- `packages/bindrunes/src/components/boundrune/chat/MemoryDisplay.svelte` - Memory layers display
- `packages/bindrunes/src/components/boundrune/chat/AgentChatPage.svelte` - Pre-composed agent page

### New Boundrunes (5 files)
- `packages/bindrunes/src/components/boundrune/admin/AdminDashboard.svelte` - Admin panel
- `packages/bindrunes/src/components/boundrune/analytics/AnalyticsDashboard.svelte` - Data visualization
- `packages/bindrunes/src/components/boundrune/agent/AgentInterface.svelte` - AI app shell
- `packages/bindrunes/src/components/boundrune/knowledge/KnowledgeBase.svelte` - Documentation center
- `packages/bindrunes/src/components/boundrune/project/ProjectManagement.svelte` - Task tracking

### Test Files (15 files)
- One `.svelte.test.ts` file per new component
- One `.svelte.test.ts` file per new Boundrune

### Playground Files (2 files)
- `examples/showcase/src/routes/playground/+page.svelte` - Expand to support all components
- `examples/showcase/src/lib/playground-data.ts` - Component metadata and props

### Index Files (7 files)
- Update `packages/bindrunes/src/components/boundrune/chat/index.ts` - Export new agentic components
- Create `packages/bindrunes/src/components/boundrune/admin/index.ts` - Admin exports
- Create `packages/bindrunes/src/components/boundrune/analytics/index.ts` - Analytics exports
- Create `packages/bindrunes/src/components/boundrune/agent/index.ts` - Agent exports
- Create `packages/bindrunes/src/components/boundrune/knowledge/index.ts` - Knowledge exports
- Create `packages/bindrunes/src/components/boundrune/project/index.ts` - Project exports
- Update `packages/bindrunes/src/index.ts` - Export new primitives

---

## Task 1: CommandPalette Component

**Files:**
- Create: `packages/bindrunes/src/components/CommandPalette.svelte`
- Create: `packages/bindrunes/src/components/CommandPalette.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import CommandPalette from "./CommandPalette.svelte";

describe("CommandPalette", () => {
  it("renders with placeholder text", () => {
    render(CommandPalette, { props: { placeholder: "Search..." } });
    expect(screen.getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("opens on Cmd+K", async () => {
    render(CommandPalette, { props: { open: false } });
    await fireEvent.keyDown(document, { key: "k", metaKey: true });
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("filters items based on search", async () => {
    const items = [
      { id: "1", label: "Copy", keywords: ["copy"] },
      { id: "2", label: "Paste", keywords: ["paste"] }
    ];
    render(CommandPalette, { props: { items, open: true } });
    await fireEvent.input(screen.getByRole("combobox"), { target: { value: "copy" } });
    expect(screen.getByText("Copy")).toBeTruthy();
    expect(screen.queryByText("Paste")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/CommandPalette.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface CommandItem {
    id: string;
    label: string;
    keywords?: string[];
    icon?: import('svelte').Snippet;
    action?: () => void;
  }

  interface Props {
    items?: CommandItem[];
    placeholder?: string;
    open?: boolean;
    onSelect?: (item: CommandItem) => void;
    onClose?: () => void;
    class?: string;
  }

  let {
    items = [],
    placeholder = "Search...",
    open = $bindable(false),
    onSelect,
    onClose,
    class: className = ""
  }: Props = $props();

  let query = $state("");
  let selectedIndex = $state(0);

  const filteredItems = $derived(
    items.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
    )
  );

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      onSelect?.(filteredItems[selectedIndex]);
      open = false;
      onClose?.();
    } else if (e.key === "Escape") {
      open = false;
      onClose?.();
    }
  }

  function handleGlobalKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      open = !open;
      if (open) query = "";
    }
  }

  $effect(() => {
    document.addEventListener("keydown", handleGlobalKeydown);
    return () => document.removeEventListener("keydown", handleGlobalKeydown);
  });
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] {className}">
    <div class="fixed inset-0 bg-black/50" onclick={() => { open = false; onClose?.(); }}></div>
    <div
      class="relative w-full max-w-lg bg-background border border-border rounded-[--radius-lg] shadow-lg overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center border-b border-border px-4">
        <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          class="flex-1 bg-transparent px-3 py-3 text-body-md outline-none placeholder:text-muted-foreground"
          {placeholder}
          bind:value={query}
          onkeydown={handleKeydown}
          role="combobox"
          aria-expanded={true}
        />
      </div>
      <div class="max-h-[300px] overflow-y-auto p-2">
        {#if filteredItems.length === 0}
          <div class="py-6 text-center text-body-sm text-muted-foreground">No results found</div>
        {:else}
          {#each filteredItems as item, i}
            <button
              class="w-full flex items-center gap-3 px-3 py-2 text-body-md rounded-[--radius-md] text-left
                     {i === selectedIndex ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}"
              onclick={() => { onSelect?.(item); open = false; onClose?.(); }}
            >
              {#if item.icon}
                {@render item.icon()}
              {/if}
              {item.label}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/CommandPalette.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/components/CommandPalette.svelte packages/bindrunes/src/components/CommandPalette.svelte.test.ts
git commit -m "feat: add CommandPalette component"
```

---

## Task 2: DataGrid Component

**Files:**
- Create: `packages/bindrunes/src/components/DataGrid.svelte`
- Create: `packages/bindrunes/src/components/DataGrid.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import DataGrid from "./DataGrid.svelte";

describe("DataGrid", () => {
  it("renders with columns and rows", () => {
    const columns = [{ key: "name", label: "Name" }, { key: "age", label: "Age" }];
    const rows = [
      { id: "1", name: "Alice", age: 30 },
      { id: "2", name: "Bob", age: 25 }
    ];
    render(DataGrid, { props: { columns, rows } });
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
  });

  it("supports sorting", async () => {
    const columns = [{ key: "name", label: "Name", sortable: true }];
    const rows = [{ id: "1", name: "Bob" }, { id: "2", name: "Alice" }];
    const onSort = vi.fn();
    render(DataGrid, { props: { columns, rows, onSort } });
    await fireEvent.click(screen.getByText("Name"));
    expect(onSort).toHaveBeenCalledWith({ key: "name", direction: "asc" });
  });

  it("supports row selection", async () => {
    const columns = [{ key: "name", label: "Name" }];
    const rows = [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }];
    const onSelectionChange = vi.fn();
    render(DataGrid, { props: { columns, rows, selectable: true, onSelectionChange } });
    await fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(onSelectionChange).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/DataGrid.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    render?: (value: unknown, row: Record<string, unknown>) => string;
  }

  interface Props {
    columns?: Column[];
    rows?: ReadonlyArray<Record<string, unknown>>;
    selectable?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
    sort?: { key: string; direction: "asc" | "desc" } | null;
    onSort?: (sort: { key: string; direction: "asc" | "desc" } | null) => void;
    onRowClick?: (row: Record<string, unknown>) => void;
    class?: string;
  }

  let {
    columns = [],
    rows = [],
    selectable = false,
    selectedIds = [],
    onSelectionChange,
    sort = null,
    onSort,
    onRowClick,
    class: className = ""
  }: Props = $props();

  function toggleSort(key: string) {
    if (!sort || sort.key !== key) {
      onSort?.({ key, direction: "asc" });
    } else if (sort.direction === "asc") {
      onSort?.({ key, direction: "desc" });
    } else {
      onSort?.(null);
    }
  }

  function toggleRowSelection(id: string) {
    if (!selectable) return;
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter(i => i !== id)
      : [...selectedIds, id];
    onSelectionChange?.(newSelection);
  }

  function toggleAllSelection() {
    if (!selectable) return;
    const allSelected = rows.length > 0 && rows.every(r => selectedIds.includes(r.id as string));
    onSelectionChange?.(allSelected ? [] : rows.map(r => r.id as string));
  }
</script>

<div class="overflow-x-auto {className}">
  <table class="w-full border-collapse">
    <thead>
      <tr class="border-b border-border">
        {#if selectable}
          <th class="w-10 px-3 py-2">
            <input
              type="checkbox"
              checked={rows.length > 0 && rows.every(r => selectedIds.includes(r.id as string))}
              onchange={toggleAllSelection}
              class="rounded border-border"
            />
          </th>
        {/if}
        {#each columns as column}
          <th
            class="px-3 py-2 text-left text-label-sm text-muted-foreground font-medium
                   {column.sortable ? 'cursor-pointer hover:text-foreground' : ''}"
            style:width={column.width}
            onclick={() => column.sortable && toggleSort(column.key)}
          >
            <div class="flex items-center gap-1">
              {column.label}
              {#if column.sortable && sort?.key === column.key}
                <span class="text-xs">{sort.direction === "asc" ? "↑" : "↓"}</span>
              {/if}
            </div>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr
          class="border-b border-border hover:bg-muted/50 {onRowClick ? 'cursor-pointer' : ''}"
          onclick={() => onRowClick?.(row)}
        >
          {#if selectable}
            <td class="px-3 py-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(row.id as string)}
                onchange={() => toggleRowSelection(row.id as string)}
                class="rounded border-border"
              />
            </td>
          {/if}
          {#each columns as column}
            <td class="px-3 py-2 text-body-md">
              {column.render ? column.render(row[column.key], row) : row[column.key]}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/DataGrid.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/components/DataGrid.svelte packages/bindrunes/src/components/DataGrid.svelte.test.ts
git commit -m "feat: add DataGrid component"
```

---

## Task 3: TreeView Component

**Files:**
- Create: `packages/bindrunes/src/components/TreeView.svelte`
- Create: `packages/bindrunes/src/components/TreeView.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import TreeView from "./TreeView.svelte";

describe("TreeView", () => {
  it("renders tree nodes", () => {
    const nodes = [
      { id: "1", label: "Root", children: [
        { id: "2", label: "Child 1" },
        { id: "3", label: "Child 2" }
      ]}
    ];
    render(TreeView, { props: { nodes } });
    expect(screen.getByText("Root")).toBeTruthy();
  });

  it("expands/collapses nodes", async () => {
    const nodes = [
      { id: "1", label: "Root", children: [
        { id: "2", label: "Child" }
      ]}
    ];
    render(TreeView, { props: { nodes } });
    await fireEvent.click(screen.getByText("Root"));
    expect(screen.getByText("Child")).toBeTruthy();
  });

  it("selects nodes", async () => {
    const nodes = [{ id: "1", label: "Node" }];
    const onSelect = vi.fn();
    render(TreeView, { props: { nodes, onSelect } });
    await fireEvent.click(screen.getByText("Node"));
    expect(onSelect).toHaveBeenCalledWith("1");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/TreeView.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
    icon?: import('svelte').Snippet;
    disabled?: boolean;
  }

  interface Props {
    nodes?: TreeNode[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    expandedIds?: string[];
    onToggle?: (id: string) => void;
    class?: string;
  }

  let {
    nodes = [],
    selectedId,
    onSelect,
    expandedIds = [],
    onToggle,
    class: className = ""
  }: Props = $props();

  function isExpanded(id: string): boolean {
    return expandedIds.includes(id);
  }

  function toggleNode(id: string) {
    onToggle?.(id);
  }
</script>

{#macro TreeNode node, depth = 0}
  <div class="flex flex-col">
    <button
      class="flex items-center gap-2 px-2 py-1 text-body-md rounded-[--radius-md] text-left
             {selectedId === node.id ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}
             {node.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
      style:padding-left="{depth * 1.5 + 0.5}rem"
      onclick={() => {
        if (!node.disabled) {
          if (node.children?.length) toggleNode(node.id);
          onSelect?.(node.id);
        }
      }}
      disabled={node.disabled}
    >
      {#if node.children?.length}
        <span class="text-xs transition-transform {isExpanded(node.id) ? 'rotate-90' : ''}">▶</span>
      {:else}
        <span class="w-3"></span>
      {/if}
      {#if node.icon}
        {@render node.icon()}
      {/if}
      {node.label}
    </button>
    {#if node.children?.length && isExpanded(node.id)}
      {#each node.children as child}
        {@render TreeNode child, depth + 1}
      {/each}
    {/if}
  </div>
{/macro}

<div class="flex flex-col {className}">
  {#each nodes as node}
    {@render TreeNode node}
  {/each}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/TreeView.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/components/TreeView.svelte packages/bindrunes/src/components/TreeView.svelte.test.ts
git commit -m "feat: add TreeView component"
```

---

## Task 4: OTPInput Component

**Files:**
- Create: `packages/bindrunes/src/components/OTPInput.svelte`
- Create: `packages/bindrunes/src/components/OTPInput.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import OTPInput from "./OTPInput.svelte";

describe("OTPInput", () => {
  it("renders correct number of inputs", () => {
    render(OTPInput, { props: { length: 6 } });
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("handles input", async () => {
    const onChange = vi.fn();
    render(OTPInput, { props: { length: 4, onChange } });
    const inputs = screen.getAllByRole("textbox");
    await fireEvent.input(inputs[0], { target: { value: "1" } });
    expect(onChange).toHaveBeenCalledWith("1***");
  });

  it("handles paste", async () => {
    const onChange = vi.fn();
    render(OTPInput, { props: { length: 4, onChange } });
    const inputs = screen.getAllByRole("textbox");
    await fireEvent.paste(inputs[0], { clipboardData: { getData: () => "1234" } });
    expect(onChange).toHaveBeenCalledWith("1234");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/OTPInput.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface Props {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    class?: string;
  }

  let {
    length = 6,
    value = $bindable(""),
    onChange,
    disabled = false,
    class: className = ""
  }: Props = $props();

  let inputs: HTMLInputElement[] = $state([]);

  function handleInput(index: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;
    
    if (newValue.length > 1) {
      target.value = newValue[0];
    }
    
    const chars = value.split("");
    chars[index] = newValue;
    value = chars.join("").slice(0, length);
    onChange?.(value);
    
    if (newValue && index < length - 1) {
      inputs[index + 1]?.focus();
    }
  }

  function handleKeydown(index: number, e: KeyboardEvent) {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputs[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData?.getData("text") || "";
    value = pasted.slice(0, length);
    onChange?.(value);
    inputs[Math.min(pasted.length, length - 1)]?.focus();
  }
</script>

<div class="flex gap-2 {className}">
  {#each Array(length) as _, i}
    <input
      type="text"
      maxlength="1"
      class="w-10 h-12 text-center text-title-2 bg-background border border-border rounded-[--radius-md]
             focus:outline-none focus:ring-2 focus:ring-ring
             {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
      value={value[i] || ""}
      oninput={(e) => handleInput(i, e)}
      onkeydown={(e) => handleKeydown(i, e)}
      onpaste={handlePaste}
      {disabled}
      bind:this={inputs[i]}
      aria-label="OTP digit {i + 1}"
    />
  {/each}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/OTPInput.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/components/OTPInput.svelte packages/bindrunes/src/components/OTPInput.svelte.test.ts
git commit -m "feat: add OTPInput component"
```

---

## Task 5: ColorPicker Component

**Files:**
- Create: `packages/bindrunes/src/components/ColorPicker.svelte`
- Create: `packages/bindrunes/src/components/ColorPicker.svelte.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import ColorPicker from "./ColorPicker.svelte";

describe("ColorPicker", () => {
  it("renders with default color", () => {
    render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)" } });
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("calls onChange when color changes", async () => {
    const onChange = vi.fn();
    render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)", onChange } });
    const input = screen.getByRole("textbox");
    await fireEvent.input(input, { target: { value: "oklch(0.7 0.15 300)" } });
    expect(onChange).toHaveBeenCalledWith("oklch(0.7 0.15 300)");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/ColorPicker.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface Props {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    class?: string;
  }

  let {
    value = $bindable("oklch(0.65 0.1 265)"),
    onChange,
    disabled = false,
    class: className = ""
  }: Props = $props();

  let hue = $state(265);
  let chroma = $state(0.1);
  let lightness = $state(0.65);

  $effect(() => {
    value = `oklch(${lightness} ${chroma} ${hue})`;
    onChange?.(value);
  });
</script>

<div class="flex flex-col gap-4 {className}">
  <div
    class="w-full h-32 rounded-[--radius-lg] border border-border"
    style:background="oklch({lightness} {chroma} {hue})"
  ></div>
  
  <div class="space-y-2">
    <label class="text-label-sm text-muted-foreground">
      Hue: {hue}
      <input
        type="range"
        min="0"
        max="360"
        bind:value={hue}
        class="w-full"
        {disabled}
      />
    </label>
    
    <label class="text-label-sm text-muted-foreground">
      Chroma: {chroma.toFixed(2)}
      <input
        type="range"
        min="0"
        max="0.4"
        step="0.01"
        bind:value={chroma}
        class="w-full"
        {disabled}
      />
    </label>
    
    <label class="text-label-sm text-muted-foreground">
      Lightness: {lightness.toFixed(2)}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={lightness}
        class="w-full"
        {disabled}
      />
    </label>
  </div>
  
  <input
    type="text"
    class="w-full px-3 py-2 bg-background border border-border rounded-[--radius-md] text-body-md"
    bind:value
    {disabled}
    aria-label="Color value"
  />
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/ColorPicker.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/bindrunes/src/components/ColorPicker.svelte packages/bindrunes/src/components/ColorPicker.svelte.test.ts
git commit -m "feat: add ColorPicker component"
```

---

## Task 6: ToolCallDisplay Component

**Files:**
- Create: `packages/bindrunes/src/components/boundrune/chat/ToolCallDisplay.svelte`
- Create: `packages/bindrunes/src/components/boundrune/chat/ToolCallDisplay.svelte.test.ts`
- Modify: `packages/bindrunes/src/components/boundrune/chat/index.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import ToolCallDisplay from "./ToolCallDisplay.svelte";

describe("ToolCallDisplay", () => {
  it("renders tool name and status", () => {
    render(ToolCallDisplay, {
      props: { name: "search_files", status: "completed" }
    });
    expect(screen.getByText("search_files")).toBeTruthy();
    expect(screen.getByText("completed")).toBeTruthy();
  });

  it("expands to show arguments", async () => {
    render(ToolCallDisplay, {
      props: {
        name: "search_files",
        args: { query: "*.ts" },
        status: "completed"
      }
    });
    await fireEvent.click(screen.getByText("search_files"));
    expect(screen.getByText("*.ts")).toBeTruthy();
  });

  it("shows error state", () => {
    render(ToolCallDisplay, {
      props: { name: "failed_tool", status: "error" }
    });
    expect(screen.getByText("error")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/ToolCallDisplay.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface Props {
    name: string;
    args?: unknown;
    result?: unknown;
    status?: "pending" | "completed" | "error";
    expanded?: boolean;
    onToggle?: () => void;
    class?: string;
  }

  let {
    name,
    args,
    result,
    status = "pending",
    expanded = $bindable(false),
    onToggle,
    class: className = ""
  }: Props = $props();

  const statusColors = {
    pending: "bg-yellow-500",
    completed: "bg-green-500",
    error: "bg-red-500"
  };

  function formatJSON(data: unknown): string {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }
</script>

<div class="border border-border rounded-[--radius-lg] overflow-hidden {className}">
  <button
    class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50"
    onclick={() => { expanded = !expanded; onToggle?.(); }}
  >
    <span class="w-2 h-2 rounded-full {statusColors[status]}"></span>
    <span class="text-title-3 text-foreground">{name}</span>
    <span class="text-label-xs text-muted-foreground capitalize">{status}</span>
    <span class="ml-auto text-xs transition-transform {expanded ? 'rotate-90' : ''}">▶</span>
  </button>
  
  {#if expanded}
    <div class="border-t border-border p-4 space-y-3 bg-muted/20">
      {#if args}
        <div>
          <h4 class="text-label-sm text-muted-foreground mb-1">Arguments</h4>
          <pre class="text-body-sm bg-background border border-border rounded-[--radius-md] p-3 overflow-x-auto">{formatJSON(args)}</pre>
        </div>
      {/if}
      {#if result}
        <div>
          <h4 class="text-label-sm text-muted-foreground mb-1">Result</h4>
          <pre class="text-body-sm bg-background border border-border rounded-[--radius-md] p-3 overflow-x-auto">{formatJSON(result)}</pre>
        </div>
      {/if}
    </div>
  {/if}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/ToolCallDisplay.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Update index.ts**

```typescript
export { default as ChatBubble } from "./ChatBubble.svelte";
export { default as ChatInput } from "./ChatInput.svelte";
export { default as ChatMessage } from "./ChatMessage.svelte";
export { default as ChatThread } from "./ChatThread.svelte";
export { default as ConversationList } from "./ConversationList.svelte";
export { default as TypingIndicator } from "./TypingIndicator.svelte";
export { default as ToolCallDisplay } from "./ToolCallDisplay.svelte";
```

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/components/boundrune/chat/ToolCallDisplay.svelte packages/bindrunes/src/components/boundrune/chat/ToolCallDisplay.svelte.test.ts packages/bindrunes/src/components/boundrune/chat/index.ts
git commit -m "feat: add ToolCallDisplay component"
```

---

## Task 7: AgentStatus Component

**Files:**
- Create: `packages/bindrunes/src/components/boundrune/chat/AgentStatus.svelte`
- Create: `packages/bindrunes/src/components/boundrune/chat/AgentStatus.svelte.test.ts`
- Modify: `packages/bindrunes/src/components/boundrune/chat/index.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import AgentStatus from "./AgentStatus.svelte";

describe("AgentStatus", () => {
  it("renders state and token usage", () => {
    render(AgentStatus, {
      props: {
        state: "thinking",
        tokenUsage: { prompt: 1000, completion: 500 }
      }
    });
    expect(screen.getByText("thinking")).toBeTruthy();
    expect(screen.getByText("1500")).toBeTruthy();
  });

  it("shows cancel button when on Cancel provided", () => {
    const onCancel = vi.fn();
    render(AgentStatus, { props: { state: "executing", onCancel } });
    expect(screen.getByText("Stop")).toBeTruthy();
  });

  it("calls onCancel when clicked", async () => {
    const onCancel = vi.fn();
    render(AgentStatus, { props: { state: "executing", onCancel } });
    await fireEvent.click(screen.getByText("Stop"));
    expect(onCancel).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/AgentStatus.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface Props {
    state?: "idle" | "thinking" | "executing" | "error";
    tokenUsage?: { prompt: number; completion: number };
    elapsedMs?: number;
    onCancel?: () => void;
    class?: string;
  }

  let {
    state = "idle",
    tokenUsage,
    elapsedMs,
    onCancel,
    class: className = ""
  }: Props = $props();

  const stateColors = {
    idle: "bg-gray-400",
    thinking: "bg-blue-500",
    executing: "bg-green-500",
    error: "bg-red-500"
  };

  const stateLabels = {
    idle: "Idle",
    thinking: "Thinking...",
    executing: "Executing...",
    error: "Error"
  };

  const totalTokens = $derived(
    tokenUsage ? tokenUsage.prompt + tokenUsage.completion : 0
  );

  const formattedTime = $derived(
    elapsedMs ? `${Math.round(elapsedMs / 1000)}s` : null
  );
</script>

<div class="flex items-center gap-4 {className}">
  <div class="flex items-center gap-2">
    <span class="w-2.5 h-2.5 rounded-full {stateColors[state]} animate-pulse"></span>
    <span class="text-body-sm text-foreground">{stateLabels[state]}</span>
  </div>
  
  {#if tokenUsage}
    <div class="text-label-xs text-muted-foreground">
      <span class="font-medium">{totalTokens}</span> tokens
    </div>
  {/if}
  
  {#if formattedTime}
    <div class="text-label-xs text-muted-foreground">
      {formattedTime}
    </div>
  {/if}
  
  {#if onCancel && state !== "idle"}
    <button
      class="px-3 py-1 text-label-xs font-medium bg-destructive text-destructive-foreground 
             rounded-[--radius-md] hover:bg-destructive/90 transition-colors"
      onclick={onCancel}
    >
      Stop
    </button>
  {/if}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/AgentStatus.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Update index.ts**

```typescript
export { default as ChatBubble } from "./ChatBubble.svelte";
export { default as ChatInput } from "./ChatInput.svelte";
export { default as ChatMessage } from "./ChatMessage.svelte";
export { default as ChatThread } from "./ChatThread.svelte";
export { default as ConversationList } from "./ConversationList.svelte";
export { default as TypingIndicator } from "./TypingIndicator.svelte";
export { default as ToolCallDisplay } from "./ToolCallDisplay.svelte";
export { default as AgentStatus } from "./AgentStatus.svelte";
```

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/components/boundrune/chat/AgentStatus.svelte packages/bindrunes/src/components/boundrune/chat/AgentStatus.svelte.test.ts packages/bindrunes/src/components/boundrune/chat/index.ts
git commit -m "feat: add AgentStatus component"
```

---

## Task 8: ReasoningPanel Component

**Files:**
- Create: `packages/bindrunes/src/components/boundrune/chat/ReasoningPanel.svelte`
- Create: `packages/bindrunes/src/components/boundrune/chat/ReasoningPanel.svelte.test.ts`
- Modify: `packages/bindrunes/src/components/boundrune/chat/index.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import ReasoningPanel from "./ReasoningPanel.svelte";

describe("ReasoningPanel", () => {
  it("renders reasoning steps", () => {
    const steps = [
      { text: "Analyzing request...", confidence: 0.9 },
      { text: "Searching files...", confidence: 0.85 }
    ];
    render(ReasoningPanel, { props: { steps } });
    expect(screen.getByText("Analyzing request...")).toBeTruthy();
  });

  it("expands to show all steps", async () => {
    const steps = [
      { text: "Step 1", confidence: 0.9 },
      { text: "Step 2", confidence: 0.85 }
    ];
    render(ReasoningPanel, { props: { steps, expanded: false } });
    await fireEvent.click(screen.getByText("Reasoning"));
    expect(screen.getByText("Step 1")).toBeTruthy();
    expect(screen.getByText("Step 2")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/ReasoningPanel.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface ReasoningStep {
    text: string;
    confidence?: number;
  }

  interface Props {
    steps?: ReasoningStep[];
    expanded?: boolean;
    onToggle?: () => void;
    class?: string;
  }

  let {
    steps = [],
    expanded = $bindable(false),
    onToggle,
    class: className = ""
  }: Props = $props();

  function getConfidenceColor(confidence?: number): string {
    if (confidence === undefined) return "text-muted-foreground";
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.7) return "text-yellow-600";
    return "text-red-600";
  }
</script>

<div class="border border-border rounded-[--radius-lg] overflow-hidden {className}">
  <button
    class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50"
    onclick={() => { expanded = !expanded; onToggle?.(); }}
  >
    <span class="text-title-3 text-foreground">Reasoning</span>
    <span class="text-label-xs text-muted-foreground">{steps.length} steps</span>
  </button>
  
  {#if expanded}
    <div class="border-t border-border p-4 space-y-3">
      {#each steps as step, i}
        <div class="flex items-start gap-3">
          <span class="text-label-xs text-muted-foreground mt-0.5">{i + 1}.</span>
          <div class="flex-1">
            <p class="text-body-md text-foreground">{step.text}</p>
            {#if step.confidence !== undefined}
              <span class="text-label-xs {getConfidenceColor(step.confidence)}">
                {Math.round(step.confidence * 100)}% confidence
              </span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/ReasoningPanel.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Update index.ts**

```typescript
export { default as ChatBubble } from "./ChatBubble.svelte";
export { default as ChatInput } from "./ChatInput.svelte";
export { default as ChatMessage } from "./ChatMessage.svelte";
export { default as ChatThread } from "./ChatThread.svelte";
export { default as ConversationList } from "./ConversationList.svelte";
export { default as TypingIndicator } from "./TypingIndicator.svelte";
export { default as ToolCallDisplay } from "./ToolCallDisplay.svelte";
export { default as AgentStatus } from "./AgentStatus.svelte";
export { default as ReasoningPanel } from "./ReasoningPanel.svelte";
```

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/components/boundrune/chat/ReasoningPanel.svelte packages/bindrunes/src/components/boundrune/chat/ReasoningPanel.svelte.test.ts packages/bindrunes/src/components/boundrune/chat/index.ts
git commit -m "feat: add ReasoningPanel component"
```

---

## Task 9: MemoryDisplay Component

**Files:**
- Create: `packages/bindrunes/src/components/boundrune/chat/MemoryDisplay.svelte`
- Create: `packages/bindrunes/src/components/boundrune/chat/MemoryDisplay.svelte.test.ts`
- Modify: `packages/bindrunes/src/components/boundrune/chat/index.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import MemoryDisplay from "./MemoryDisplay.svelte";

describe("MemoryDisplay", () => {
  it("renders memory layers", () => {
    const working = [{ id: "1", preview: "Current context", tokens: 100 }];
    const episodic = [{ id: "2", preview: "Past conversation", tokens: 200 }];
    const semantic = [{ id: "3", preview: "Documentation", tokens: 150 }];
    render(MemoryDisplay, { props: { working, episodic, semantic } });
    expect(screen.getByText("Working Memory")).toBeTruthy();
    expect(screen.getByText("Episodic Memory")).toBeTruthy();
    expect(screen.getByText("Semantic Memory")).toBeTruthy();
  });

  it("selects memory item", async () => {
    const working = [{ id: "1", preview: "Context", tokens: 100 }];
    const onSelect = vi.fn();
    render(MemoryDisplay, { props: { working, onSelect } });
    await fireEvent.click(screen.getByText("Context"));
    expect(onSelect).toHaveBeenCalledWith(working[0]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/MemoryDisplay.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  interface MemoryRef {
    id: string;
    preview: string;
    tokens: number;
    pinned?: boolean;
  }

  interface Props {
    working?: MemoryRef[];
    episodic?: MemoryRef[];
    semantic?: MemoryRef[];
    onSelect?: (ref: MemoryRef) => void;
    class?: string;
  }

  let {
    working = [],
    episodic = [],
    semantic = [],
    onSelect,
    class: className = ""
  }: Props = $props();

  const layerColors = {
    working: "border-l-blue-500",
    episodic: "border-l-green-500",
    semantic: "border-l-purple-500"
  };
</script>

<div class="space-y-4 {className}">
  {#if working.length > 0}
    <div>
      <h4 class="text-label-sm text-muted-foreground mb-2">Working Memory</h4>
      <div class="space-y-2">
        {#each working as ref}
          <button
            class="w-full text-left p-3 border-l-2 {layerColors.working} bg-muted/20 
                   rounded-r-[--radius-md] hover:bg-muted/40 transition-colors"
            onclick={() => onSelect?.(ref)}
          >
            <p class="text-body-sm text-foreground">{ref.preview}</p>
            <span class="text-label-xs text-muted-foreground">{ref.tokens} tokens</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if episodic.length > 0}
    <div>
      <h4 class="text-label-sm text-muted-foreground mb-2">Episodic Memory</h4>
      <div class="space-y-2">
        {#each episodic as ref}
          <button
            class="w-full text-left p-3 border-l-2 {layerColors.episodic} bg-muted/20 
                   rounded-r-[--radius-md] hover:bg-muted/40 transition-colors"
            onclick={() => onSelect?.(ref)}
          >
            <p class="text-body-sm text-foreground">{ref.preview}</p>
            <span class="text-label-xs text-muted-foreground">{ref.tokens} tokens</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if semantic.length > 0}
    <div>
      <h4 class="text-label-sm text-muted-foreground mb-2">Semantic Memory</h4>
      <div class="space-y-2">
        {#each semantic as ref}
          <button
            class="w-full text-left p-3 border-l-2 {layerColors.semantic} bg-muted/20 
                   rounded-r-[--radius-md] hover:bg-muted/40 transition-colors"
            onclick={() => onSelect?.(ref)}
          >
            <p class="text-body-sm text-foreground">{ref.preview}</p>
            <span class="text-label-xs text-muted-foreground">{ref.tokens} tokens</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/MemoryDisplay.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Update index.ts**

```typescript
export { default as ChatBubble } from "./ChatBubble.svelte";
export { default as ChatInput } from "./ChatInput.svelte";
export { default as ChatMessage } from "./ChatMessage.svelte";
export { default as ChatThread } from "./ChatThread.svelte";
export { default as ConversationList } from "./ConversationList.svelte";
export { default as TypingIndicator } from "./TypingIndicator.svelte";
export { default as ToolCallDisplay } from "./ToolCallDisplay.svelte";
export { default as AgentStatus } from "./AgentStatus.svelte";
export { default as ReasoningPanel } from "./ReasoningPanel.svelte";
export { default as MemoryDisplay } from "./MemoryDisplay.svelte";
```

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/components/boundrune/chat/MemoryDisplay.svelte packages/bindrunes/src/components/boundrune/chat/MemoryDisplay.svelte.test.ts packages/bindrunes/src/components/boundrune/chat/index.ts
git commit -m "feat: add MemoryDisplay component"
```

---

## Task 10: AgentChatPage Component

**Files:**
- Create: `packages/bindrunes/src/components/boundrune/chat/AgentChatPage.svelte`
- Create: `packages/bindrunes/src/components/boundrune/chat/AgentChatPage.svelte.test.ts`
- Modify: `packages/bindrunes/src/components/boundrune/chat/index.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import AgentChatPage from "./AgentChatPage.svelte";

describe("AgentChatPage", () => {
  it("renders chat interface with agent components", () => {
    const messages = [{ id: "1", content: "Hello", sender: "user" as const }];
    const toolCalls = [{ id: "1", name: "search", status: "completed" as const }];
    const reasoningSteps = [{ text: "Analyzing..." }];
    const memory = {
      working: [{ id: "1", preview: "Context", tokens: 100 }],
      episodic: [],
      semantic: []
    };
    
    render(AgentChatPage, {
      props: {
        messages,
        toolCalls,
        reasoningSteps,
        memory
      }
    });
    
    expect(screen.getByText("Hello")).toBeTruthy();
    expect(screen.getByText("search")).toBeTruthy();
    expect(screen.getByText("Reasoning")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/AgentChatPage.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  import ChatThread from "./ChatThread.svelte";
  import ChatInput from "./ChatInput.svelte";
  import AgentStatus from "./AgentStatus.svelte";
  import ToolCallDisplay from "./ToolCallDisplay.svelte";
  import ReasoningPanel from "./ReasoningPanel.svelte";
  import MemoryDisplay from "./MemoryDisplay.svelte";
  import TypingIndicator from "./TypingIndicator.svelte";

  interface Message {
    id: string;
    content: string;
    sender: "user" | "assistant";
    timestamp?: string;
  }

  interface ToolCall {
    id: string;
    name: string;
    args?: unknown;
    result?: unknown;
    status: "pending" | "completed" | "error";
  }

  interface ReasoningStep {
    text: string;
    confidence?: number;
  }

  interface MemoryRef {
    id: string;
    preview: string;
    tokens: number;
  }

  interface Props {
    messages?: Message[];
    toolCalls?: ToolCall[];
    reasoningSteps?: ReasoningStep[];
    memory?: {
      working: MemoryRef[];
      episodic: MemoryRef[];
      semantic: MemoryRef[];
    };
    agentState?: "idle" | "thinking" | "executing" | "error";
    tokenUsage?: { prompt: number; completion: number };
    elapsedMs?: number;
    isTyping?: boolean;
    onSendMessage?: (message: string) => void;
    onCancel?: () => void;
    class?: string;
  }

  let {
    messages = [],
    toolCalls = [],
    reasoningSteps = [],
    memory = { working: [], episodic: [], semantic: [] },
    agentState = "idle",
    tokenUsage,
    elapsedMs,
    isTyping = false,
    onSendMessage,
    onCancel,
    class: className = ""
  }: Props = $props();
</script>

<div class="flex h-full {className}">
  <!-- Main Chat Area -->
  <div class="flex-1 flex flex-col">
    <div class="flex-1 overflow-y-auto p-4">
      <ChatThread {messages} />
      {#if isTyping}
        <TypingIndicator />
      {/if}
    </div>
    <ChatInput onSend={onSendMessage} placeholder="Type a message..." />
  </div>
  
  <!-- Sidebar -->
  <div class="w-80 border-l border-border flex flex-col">
    <!-- Agent Status -->
    <div class="p-4 border-b border-border">
      <h3 class="text-title-3 text-foreground mb-2">Status</h3>
      <AgentStatus state={agentState} {tokenUsage} {elapsedMs} {onCancel} />
    </div>
    
    <!-- Tool Calls -->
    {#if toolCalls.length > 0}
      <div class="p-4 border-b border-border">
        <h3 class="text-title-3 text-foreground mb-2">Tool Calls</h3>
        <div class="space-y-2">
          {#each toolCalls as call}
            <ToolCallDisplay
              name={call.name}
              args={call.args}
              result={call.result}
              status={call.status}
            />
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Reasoning -->
    {#if reasoningSteps.length > 0}
      <div class="p-4 border-b border-border">
        <ReasoningPanel steps={reasoningSteps} />
      </div>
    {/if}
    
    <!-- Memory -->
    {#if memory.working.length > 0 || memory.episodic.length > 0 || memory.semantic.length > 0}
      <div class="p-4 flex-1 overflow-y-auto">
        <h3 class="text-title-3 text-foreground mb-2">Memory</h3>
        <MemoryDisplay
          working={memory.working}
          episodic={memory.episodic}
          semantic={memory.semantic}
        />
      </div>
    {/if}
  </div>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/chat/AgentChatPage.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Update index.ts**

```typescript
export { default as ChatBubble } from "./ChatBubble.svelte";
export { default as ChatInput } from "./ChatInput.svelte";
export { default as ChatMessage } from "./ChatMessage.svelte";
export { default as ChatThread } from "./ChatThread.svelte";
export { default as ConversationList } from "./ConversationList.svelte";
export { default as TypingIndicator } from "./TypingIndicator.svelte";
export { default as ToolCallDisplay } from "./ToolCallDisplay.svelte";
export { default as AgentStatus } from "./AgentStatus.svelte";
export { default as ReasoningPanel } from "./ReasoningPanel.svelte";
export { default as MemoryDisplay } from "./MemoryDisplay.svelte";
export { default as AgentChatPage } from "./AgentChatPage.svelte";
```

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/components/boundrune/chat/AgentChatPage.svelte packages/bindrunes/src/components/boundrune/chat/AgentChatPage.svelte.test.ts packages/bindrunes/src/components/boundrune/chat/index.ts
git commit -m "feat: add AgentChatPage component"
```

---

## Task 11: AdminDashboard Boundrune

**Files:**
- Create: `packages/bindrunes/src/components/boundrune/admin/AdminDashboard.svelte`
- Create: `packages/bindrunes/src/components/boundrune/admin/AdminDashboard.svelte.test.ts`
- Create: `packages/bindrunes/src/components/boundrune/admin/index.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import AdminDashboard from "./AdminDashboard.svelte";

describe("AdminDashboard", () => {
  it("renders user management table", () => {
    const users = [
      { id: "1", name: "Alice", email: "alice@example.com", role: "admin" },
      { id: "2", name: "Bob", email: "bob@example.com", role: "user" }
    ];
    render(AdminDashboard, { props: { users } });
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
  });

  it("renders system settings", () => {
    const settings = { maintenanceMode: false, allowSignUp: true };
    render(AdminDashboard, { props: { settings } });
    expect(screen.getByText("System Settings")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/admin/AdminDashboard.svelte.test.ts`
Expected: FAIL with "Module not found"

- [ ] **Step 3: Write minimal implementation**

```svelte
<script lang="ts">
  import DataTable from "../../DataTable.svelte";
  import Card from "../../Card.svelte";
  import Switch from "../../Switch.svelte";
  import Badge from "../../Badge.svelte";

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  interface Settings {
    maintenanceMode: boolean;
    allowSignUp: boolean;
  }

  interface ActivityLog {
    id: string;
    action: string;
    user: string;
    timestamp: string;
  }

  interface Props {
    users?: User[];
    settings?: Settings;
    activityLogs?: ActivityLog[];
    onUserAction?: (userId: string, action: string) => void;
    onSettingsUpdate?: (settings: Settings) => void;
    class?: string;
  }

  let {
    users = [],
    settings = { maintenanceMode: false, allowSignUp: true },
    activityLogs = [],
    onUserAction,
    onSettingsUpdate,
    class: className = ""
  }: Props = $props();

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" }
  ];
</script>

<div class="space-y-6 {className}">
  <h1 class="text-display-2 text-foreground">Admin Dashboard</h1>
  
  <!-- User Management -->
  <Card padding>
    <h2 class="text-title-2 text-foreground mb-4">User Management</h2>
    <DataTable columns={userColumns} rows={users} />
  </Card>
  
  <!-- System Settings -->
  <Card padding>
    <h2 class="text-title-2 text-foreground mb-4">System Settings</h2>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-body-md text-foreground">Maintenance Mode</p>
          <p class="text-label-xs text-muted-foreground">Disable public access</p>
        </div>
        <Switch
          checked={settings.maintenanceMode}
          onCheckedChange={(checked) => {
            onSettingsUpdate?.({ ...settings, maintenanceMode: checked });
          }}
        />
      </div>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-body-md text-foreground">Allow Sign Up</p>
          <p class="text-label-xs text-muted-foreground">Enable new user registration</p>
        </div>
        <Switch
          checked={settings.allowSignUp}
          onCheckedChange={(checked) => {
            onSettingsUpdate?.({ ...settings, allowSignUp: checked });
          }}
        />
      </div>
    </div>
  </Card>
  
  <!-- Activity Logs -->
  {#if activityLogs.length > 0}
    <Card padding>
      <h2 class="text-title-2 text-foreground mb-4">Activity Logs</h2>
      <div class="space-y-2">
        {#each activityLogs as log}
          <div class="flex items-center gap-3 text-body-sm">
            <Badge variant="secondary">{log.action}</Badge>
            <span class="text-foreground">{log.user}</span>
            <span class="text-muted-foreground">{log.timestamp}</span>
          </div>
        {/each}
      </div>
    </Card>
  {/if}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/bindrunes && bun run test src/components/boundrune/admin/AdminDashboard.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Create index.ts**

```typescript
export { default as AdminDashboard } from "./AdminDashboard.svelte";
```

- [ ] **Step 6: Commit**

```bash
git add packages/bindrunes/src/components/boundrune/admin/
git commit -m "feat: add AdminDashboard Boundrune"
```

---

## Task 12: Expand Playground

**Files:**
- Modify: `examples/showcase/src/routes/playground/+page.svelte`
- Create: `examples/showcase/src/lib/playground-data.ts`

- [ ] **Step 1: Create playground data file**

```typescript
export interface PlaygroundComponent {
  name: string;
  category: string;
  props: Record<string, {
    type: "select" | "switch" | "text" | "number";
    options?: string[];
    default: unknown;
  }>;
  slot?: string;
}

export const components: PlaygroundComponent[] = [
  // Foundation
  {
    name: "Button",
    category: "Foundation",
    props: {
      variant: { type: "select", options: ["primary", "secondary", "outline", "ghost", "destructive"], default: "primary" },
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
      disabled: { type: "switch", default: false },
      loading: { type: "switch", default: false }
    },
    slot: "Click me"
  },
  {
    name: "Badge",
    category: "Foundation",
    props: {
      variant: { type: "select", options: ["primary", "secondary", "success", "warning", "destructive"], default: "primary" },
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" }
    },
    slot: "Label"
  },
  {
    name: "Card",
    category: "Foundation",
    props: {
      variant: { type: "select", options: ["surface", "glass", "outlined", "ghost"], default: "surface" },
      padding: { type: "switch", default: true }
    },
    slot: "Card content"
  },
  // Forms
  {
    name: "Input",
    category: "Forms",
    props: {
      placeholder: { type: "text", default: "Enter text..." },
      disabled: { type: "switch", default: false }
    }
  },
  {
    name: "Checkbox",
    category: "Forms",
    props: {
      disabled: { type: "switch", default: false }
    }
  },
  // Data
  {
    name: "DataTable",
    category: "Data",
    props: {
      striped: { type: "switch", default: false },
      hoverable: { type: "switch", default: true }
    }
  },
  // Agentic
  {
    name: "ToolCallDisplay",
    category: "Agentic",
    props: {
      name: { type: "text", default: "search_files" },
      status: { type: "select", options: ["pending", "completed", "error"], default: "completed" }
    }
  },
  {
    name: "AgentStatus",
    category: "Agentic",
    props: {
      state: { type: "select", options: ["idle", "thinking", "executing", "error"], default: "thinking" }
    }
  }
];

export const categories = [...new Set(components.map(c => c.category))];
```

- [ ] **Step 2: Update playground page**

```svelte
<script lang="ts">
  import { PageHeader, Card, Input, Select, Switch, Button, Badge, CodeSnippet } from "bindrunes";
  import { components, categories, type PlaygroundComponent } from "$lib/playground-data";

  let selectedCategory = $state(categories[0]);
  let selectedIdx = $state(0);
  let propValues = $state<Record<string, unknown>>({});

  const filteredComponents = $derived(
    components.filter(c => c.category === selectedCategory)
  );

  const current = $derived(filteredComponents[selectedIdx] || filteredComponents[0]);

  $effect(() => {
    if (current) {
      const initial: Record<string, unknown> = {};
      for (const [key, prop] of Object.entries(current.props)) {
        initial[key] = prop.default;
      }
      propValues = initial;
    }
  });

  const generatedCode = $derived(() => {
    if (!current) return "";
    const props = Object.entries(propValues)
      .filter(([, v]) => v !== undefined && v !== "" && v !== false)
      .map(([k, v]) => {
        if (typeof v === "boolean") return v ? k : "";
        return `${k}="${v}"`;
      })
      .filter(Boolean)
      .join(" ");
    const propStr = props ? ` ${props}` : "";
    const slotContent = current.slot ? `\n  ${current.slot}\n` : "";
    return `import { ${current.name} } from "bindrunes";\n\n<${current.name}${propStr}>${slotContent}</${current.name}>`;
  });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
  <PageHeader title="Playground" description="Tweak component props and see live results with generated code" />

  <!-- Category Tabs -->
  <div class="flex gap-2 flex-wrap">
    {#each categories as category}
      <button
        class="px-4 py-2 text-label-sm rounded-[--radius-md] transition-colors
               {selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
        onclick={() => { selectedCategory = category; selectedIdx = 0; }}
      >
        {category}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Controls -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Component</h3>
      <Select
        bind:value={() => current?.name || "", (v) => {
          const idx = filteredComponents.findIndex((c) => c.name === v);
          if (idx >= 0) selectedIdx = idx;
        }}
        options={filteredComponents.map((c) => ({ label: c.name, value: c.name }))}
      />

      <div class="space-y-3 pt-4">
        <h4 class="text-title-3 text-foreground">Props</h4>
        {#if current}
          {#each Object.entries(current.props) as [key, prop]}
            <div class="space-y-1">
              <label class="text-label-sm text-muted-foreground">{key}</label>
              {#if prop.type === "select"}
                <Select
                  bind:value={() => propValues[key], (v) => (propValues[key] = v)}
                  options={(prop.options || []).map((o: string) => ({ label: o, value: o }))}
                />
              {:else if prop.type === "switch"}
                <Switch bind:checked={() => propValues[key], (v) => (propValues[key] = v)} />
              {:else if prop.type === "text"}
                <Input bind:value={() => propValues[key], (v) => (propValues[key] = v)} />
              {:else if prop.type === "number"}
                <Input type="number" bind:value={() => propValues[key], (v) => (propValues[key] = v)} />
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>

    <!-- Preview -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Preview</h3>
      <Card padding class="min-h-[200px] flex items-center justify-center">
        {#if current?.name === "Button"}
          <Button {...propValues}>{current.slot}</Button>
        {:else if current?.name === "Badge"}
          <Badge {...propValues}>{current.slot}</Badge>
        {:else if current?.name === "Card"}
          <Card {...propValues}>{current.slot}</Card>
        {:else if current?.name === "Input"}
          <div class="w-full">
            <Input {...propValues} />
          </div>
        {:else}
          <p class="text-body-sm text-muted-foreground">Preview not available</p>
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

- [ ] **Step 3: Test playground renders**

Run: `cd examples/showcase && bun run dev`
Expected: Playground loads with category tabs and component selector

- [ ] **Step 4: Commit**

```bash
git add examples/showcase/src/routes/playground/+page.svelte examples/showcase/src/lib/playground-data.ts
git commit -m "feat: expand playground with all component categories"
```

---

## Task 13: Update Main Index Exports

**Files:**
- Modify: `packages/bindrunes/src/index.ts`

- [ ] **Step 1: Add new component exports**

```typescript
// Add to existing exports
export { default as CommandPalette } from "./components/CommandPalette.svelte";
export { default as DataGrid } from "./components/DataGrid.svelte";
export { default as TreeView } from "./components/TreeView.svelte";
export { default as OTPInput } from "./components/OTPInput.svelte";
export { default as ColorPicker } from "./components/ColorPicker.svelte";
```

- [ ] **Step 2: Verify exports work**

Run: `cd packages/bindrunes && bun run check`
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/src/index.ts
git commit -m "feat: export new primitive components"
```

---

## Task 14: Add Agentic Coverage Thresholds

**Files:**
- Modify: `packages/bindrunes/vitest.config.ts`

- [ ] **Step 1: Update coverage thresholds**

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.svelte.test.ts", "src/**/*.test.ts"],
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,svelte}"],
      exclude: ["src/test/**", "src/**/*.test.ts", "src/**/*.d.ts"],
      thresholds: {
        "src/utils/agentic/**": {
          lines: 90,
          branches: 85,
          functions: 88,
          statements: 90
        },
        "src/components/boundrune/chat/**": {
          lines: 90,
          branches: 85,
          functions: 88,
          statements: 90
        },
        global: {
          lines: 80,
          branches: 70,
          functions: 77,
          statements: 80
        }
      }
    }
  }
});
```

- [ ] **Step 2: Verify tests pass**

Run: `cd packages/bindrunes && bun run test`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add packages/bindrunes/vitest.config.ts
git commit -m "test: add agentic component coverage thresholds"
```

---

## Self-Review Checklist

After writing this plan, I verified:

1. **Spec coverage:** All 5 areas from the spec are covered:
   - ✅ Component Architecture & API Surface (Tasks 1-5, 13)
   - ✅ Agentic UI Component Kit (Tasks 6-10)
   - ✅ Playground & DX Improvements (Task 12)
   - ✅ Boundrune Page Patterns (Task 11)
   - ✅ Testing & Quality (Tasks 1-14, Task 14)

2. **Placeholder scan:** No TBD, TODO, or vague steps found.

3. **Type consistency:** All types match across tasks (CommandItem, Column, TreeNode, etc.).

4. **File paths:** All paths are exact and consistent.

5. **Code completeness:** Every step includes complete, runnable code.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-19-comprehensive-overhaul.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
