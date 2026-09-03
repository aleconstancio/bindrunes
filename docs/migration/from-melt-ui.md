# Migration Guide: Melt UI to urupe-ui

This guide covers migrating from Melt UI (the composable-based headless UI library for Svelte) to urupe-ui. Melt UI provides unstyled primitives via builder functions; urupe-ui provides styled, accessible components with a composable-based design system.

## Component Mapping

| Melt UI Builder | urupe-ui Component | Notes |
|---|---|---|
| `createAccordion()` | `Accordion` + `AccordionItem` | Melt uses builders; urupe-ui uses Svelte components |
| `createAlertDialog()` | `AlertDialog` | Direct mapping |
| `createCheckbox()` | `Checkbox` | Direct mapping |
| `createCollapsible()` | `Collapsible` | Direct mapping |
| `createContextMenu()` | `ContextMenu` | Direct mapping |
| `createDatePicker()` | `DatePicker` | Direct mapping |
| `createDialog()` | `Dialog` | Direct mapping |
| `createDropdownMenu()` | `DropdownMenu` | Direct mapping |
| `createHoverCard()` | `Popover` | Use Popover for hover-triggered content |
| `createLabel()` | `Label` | Direct mapping |
| `createListbox()` | `Select` | Melt's Listbox maps to urupe-ui Select |
| `createMenubar()` | `NavigationMenu` | Different pattern, see below |
| `createPopover()` | `Popover` | Direct mapping |
| `createProgress()` | `Progress` | Direct mapping |
| `createRadioGroup()` | `RadioGroup` | Direct mapping |
| `createSeparator()` | `Separator` | Direct mapping |
| `createSlider()` | `Slider` | Direct mapping |
| `createSwitch()` | `Switch` | Direct mapping |
| `createTabs()` | `Tabs` | Direct mapping |
| `createToast()` | `createToast()` | urupe-ui has its own composable |
| `createTooltip()` | `Tooltip` | Direct mapping |
| — | `Button` | urupe-ui-only (Melt has no button builder) |
| — | `Card` | urupe-ui-only |
| — | `Input` | urupe-ui-only |
| — | `Badge` | urupe-ui-only |
| — | `DataTable` | urupe-ui-only |
| — | `DataTable` | urupe-ui-only |
| — | `Stepper` | urupe-ui-only |
| — | `TreeView` | urupe-ui-only |
| — | `Combobox` | urupe-ui-only |
| — | `TagInput` | urupe-ui-only |

## Composable Migration (Melt Builders to urupe-ui Components)

Melt UI uses builder functions that return props objects. urupe-ui uses standard Svelte components with props. Here is how each pattern translates.

### Accordion

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createAccordion } from "@melt-ui/svelte";

  const { content, item, trigger, isSelected } = createAccordion();
</script>

<div {...$root}>
  <div {...$item({ value: "item-1" })}>
    <button {...$trigger({ value: "item-1" })}>
      Trigger 1
    </button>
    {#if $isSelected("item-1")}
      <div {...$content("item-1")}>
        Content 1
      </div>
    {/if}
  </div>
</div>
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { Accordion, AccordionItem } from "urupe-ui";
</script>

<Accordion>
  <AccordionItem value="item-1">
    <button slot="trigger">Trigger 1</button>
    <div slot="content">Content 1</div>
  </AccordionItem>
</Accordion>
```

### Dialog

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createDialog } from "@melt-ui/svelte";

  const { trigger, overlay, content, title, description, close, portalled } =
    createDialog();
</script>

<button {...$trigger}>Open Dialog</button>

{#if $open}
  <div {...$portalled}>
    <div {...$overlay} />
    <div {...$content}>
      <h2 {...$title}>Dialog Title</h2>
      <p {...$description}>Dialog description</p>
      <button {...$close}>Close</button>
    </div>
  </div>
{/if}
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { Dialog } from "urupe-ui";
  let open = $state(false);
</script>

<button onclick={() => open = true}>Open Dialog</button>

<Dialog bind:open>
  <h2>Dialog Title</h2>
  <p>Dialog description</p>
  <button onclick={() => open = false}>Close</button>
</Dialog>
```

### Dropdown Menu

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createDropdownMenu } from "@melt-ui/svelte";

  const { trigger, menu, item, separator, open } = createDropdownMenu();
</script>

<button {...$trigger} use:$trigger.action>Menu</button>

{#if $open}
  <div {...$menu}>
    <div {...$item}>Profile</div>
    <div {...$separator}></div>
    <div {...$item}>Logout</div>
  </div>
{/if}
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { DropdownMenu } from "urupe-ui";
</script>

<DropdownMenu>
  <button slot="trigger">Menu</button>
  <div slot="content">
    <button>Profile</button>
    <hr />
    <button>Logout</button>
  </div>
</DropdownMenu>
```

### Popover

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createPopover } from "@melt-ui/svelte";

  const { trigger, content, open } = createPopover();
</script>

<button {...$trigger}>Toggle</button>

{#if $open}
  <div {...$content}>
    Popover content
  </div>
{/if}
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { Popover } from "urupe-ui";
</script>

<Popover>
  <button slot="trigger">Toggle</button>
  <div slot="content">Popover content</div>
</Popover>
```

### Tabs

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createTabs } from "@melt-ui/svelte";

  const { root, list, trigger, content, value } = createTabs({
    defaultValue: "tab-1",
  });
</script>

<div {...$root}>
  <div {...$list}>
    <button {...$trigger({ value: "tab-1" })}>Tab 1</button>
    <button {...$trigger({ value: "tab-2" })}>Tab 2</button>
  </div>

  <div {...$content("tab-1")}>Content 1</div>
  <div {...$content("tab-2")}>Content 2</div>
</div>
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "urupe-ui";
</script>

<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
  </TabsList>

  <TabsContent value="tab-1">Content 1</TabsContent>
  <TabsContent value="tab-2">Content 2</TabsContent>
</Tabs>
```

### Tooltip

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createTooltip } from "@melt-ui/svelte";

  const { trigger, content, open } = createTooltip({
    positioning: { placement: "top" },
  });
</script>

<span {...$trigger} use:$trigger.action>Hover me</span>

{#if $open}
  <div {...$content}>
    Tooltip text
  </div>
{/if}
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { Tooltip, TooltipProvider } from "urupe-ui";
</script>

<TooltipProvider>
  <Tooltip content="Tooltip text">
    <span>Hover me</span>
  </Tooltip>
</TooltipProvider>
```

### Checkbox

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createCheckbox } from "@melt-ui/svelte";

  const { root, input, checked } = createCheckbox();
</script>

<button {...$root} use:$root.action>
  {#if $checked}
    <svg>check icon</svg>
  {/if}
</button>
<input {...$input} />
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { Checkbox } from "urupe-ui";
  let checked = $state(false);
</script>

<Checkbox bind:checked />
```

### Switch

**Before (Melt UI):**
```svelte
<script lang="ts">
  import { createSwitch } from "@melt-ui/svelte";

  const { root, input, checked } = createSwitch();
</script>

<button {...$root} use:$root.action>
  <span {...$thumb} />
</button>
<input {...$input} />
```

**After (urupe-ui):**
```svelte
<script lang="ts">
  import { Switch } from "urupe-ui";
  let checked = $state(false);
</script>

<Switch bind:checked />
```

## Theming Approach Changes

### Melt UI

Melt UI is headless -- it provides no theming system. You style everything via Tailwind classes or custom CSS:

```svelte
<button class="bg-blue-500 text-white rounded px-4 py-2" {...$trigger}>
  Click me
</button>
```

### urupe-ui

urupe-ui has a built-in 3-axis design system (theme x aesthetic x density). Components are pre-styled using CSS custom properties:

```svelte
<!-- Components are styled automatically -->
<Button>Click me</Button>

<!-- Switch theme at runtime -->
<script lang="ts">
  import { createTheme, createAesthetic, createDensity } from "urupe-ui";
  const theme = createTheme({ default: "dracula" });
  const aesthetic = createAesthetic({ default: "glass" });
  const density = createDensity({ default: "comfortable" });
</script>
```

You can still override styles via Tailwind utility classes or CSS custom properties. The design system provides the foundation; you customize on top.

### Composable Pattern Differences

| Melt UI Pattern | urupe-ui Pattern |
|---|---|
| Builder returns props spread on elements | Svelte components with named slots |
| `use:$action.action` for directive-based rendering | Standard component props |
| Manual open/close state management | `bind:open` two-way binding |
| No built-in theming | CSS custom property token system |
| Each builder is independent | Components compose via slots |
| Styling via Tailwind classes only | Pre-styled components + Tailwind override |

## Install Changes

### Before (Melt UI)

```bash
npm install @melt-ui/svelte
```

No CSS imports required (headless).

### After (urupe-ui)

```bash
npm install urupe-ui
```

Add to `app.css`:
```css
@import "tailwindcss";
@plugin "urupe-ui/tailwind";
@import "urupe-ui/styles/global.css";
```

Add provider to root layout:
```svelte
<script lang="ts">
  import { AppProvider } from "urupe-ui";
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

## Key Differences

| Aspect | Melt UI | urupe-ui |
|---|---|---|
| Approach | Headless primitives | Styled components |
| Theming | None (DIY) | 3-axis system (theme x aesthetic x density) |
| API style | Builder functions returning props | Svelte components with slots |
| Styling | 100% your responsibility | Pre-styled, overridable |
| Accessibility | Manual ARIA wiring | Built into components |
| Bundle | Tree-shakeable builders | Full component library |
| Dark mode | Manual | Automatic via data attributes |
| Form validation | External (Zod, etc.) | Built-in Valibot integration |
| Toast | External (svelte-sonner, etc.) | Built-in `createToast()` composable |
