# Migration Guide: Bootstrap to bindrunes

This guide covers migrating a web project from Bootstrap to bindrunes. Bootstrap is a CSS/JS framework for general-purpose web development; bindrunes is a Svelte 5 component library with a built-in design system. The migration involves replacing Bootstrap's class-based approach with bindrunes components, swapping jQuery/Bootstrap JS for Svelte components, and adopting a token-based design system.

## Component Mapping

| Bootstrap | bindrunes | Notes |
|---|---|---|
| `btn`, `btn-primary` | `Button variant="primary"` | CSS classes become components |
| `btn-outline-*` | `Button variant="outline"` | Outline variant handled via prop |
| `btn-group` | Flex container with `Button` | Use Tailwind flex utilities |
| `card`, `card-body` | `Card` | Single component with slots |
| `form-control` | `Input` | CSS class becomes component |
| `form-select` | `Select` | CSS class becomes component |
| `form-check`, `form-check-input` | `Checkbox` | CSS class becomes component |
| `form-switch` | `Switch` | CSS class becomes component |
| `form-label` | `Label` | Direct mapping |
| `input-group` | Flex container with `Input` | Use Tailwind flex utilities |
| `modal`, `modal-dialog` | `Dialog` | CSS/JS becomes component |
| `offcanvas` | `Sheet` or `Drawer` | Sheet for side panels, Drawer for bottom sheets |
| `nav`, `nav-tabs` | `Tabs`, `TabsList`, `TabsTrigger` | Component-based tabs |
| `nav-pills` | `Tabs` with variant | Similar pattern |
| `alert`, `alert-*` | `Alert` | CSS class becomes component |
| `badge`, `badge-*` | `Badge` | CSS class becomes component |
| `breadcrumb` | `Breadcrumb` | Single component |
| `dropdown`, `dropdown-menu` | `DropdownMenu` | Component-based dropdown |
| `accordion` | `Accordion`, `AccordionItem` | Component-based accordion |
| `spinner` | `Spinner` | Direct mapping |
| `progress` | `Progress` | Direct mapping |
| `toast` | `ToastProvider` + `createToast()` | Composable-based |
| `tooltip` | `Tooltip` | Direct mapping |
| `popover` | `Popover` | Direct mapping |
| `list-group` | `Card` + flex layout | Use Card with flex children |
| `table` | `DataTable` | Higher-level component with column config |
| `carousel` | — | No direct equivalent; use a Svelte carousel library |
| `collapse` | `Collapsible` | Component-based |
| `tab-content`, `tab-pane` | `TabsContent` | Component-based |

## Class Name Removal

Bootstrap uses utility and component classes extensively. When migrating, you remove Bootstrap classes and replace them with bindrunes components and Tailwind utilities.

### Common Bootstrap Classes to Replace

| Bootstrap Class | bindrunes / Tailwind Replacement |
|---|---|
| `container` | `<div class="container mx-auto">` (Tailwind) |
| `row`, `col-*` | `<div class="grid grid-cols-*">` (Tailwind grid) |
| `d-flex`, `justify-content-*` | `<div class="flex justify-*">` (Tailwind) |
| `text-center`, `text-start` | `<div class="text-center text-left">` (Tailwind) |
| `mt-*`, `mb-*`, `p-*` | Tailwind spacing: `mt-4 mb-2 p-6` |
| `bg-*` | Tailwind background colors or tokens |
| `text-*` | Tailwind text colors or tokens |
| `border` | `<div class="border border-border">` |
| `rounded` | `<div class="rounded-lg">` |
| `shadow-sm`, `shadow-lg` | `<div class="shadow-sm">` or `<div class="shadow-lg">` |
| `fw-bold`, `fw-semibold` | `<div class="font-bold">` / `<div class="font-semibold">` |
| `fs-*` | `<div class="text-sm">` / `<div class="text-lg">` |
| `visible`, `invisible` | `<div class="visible">` / `<div class="invisible">` |
| `d-none`, `d-block` | `<div class="hidden">` / `<div class="block">` |

### Before (Bootstrap)

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Title</h5>
          <p class="card-text">Text</p>
          <button class="btn btn-primary">Click</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="alert alert-success">Success!</div>
    </div>
  </div>
</div>
```

### After (bindrunes + Tailwind)

```svelte
<script lang="ts">
  import { Card, Button, Alert } from "bindrunes";
</script>

<div class="container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card padding>
      <h5 class="text-title-1">Title</h5>
      <p class="text-body text-muted-foreground">Text</p>
      <Button variant="primary">Click</Button>
    </Card>
    <Alert variant="success">Success!</Alert>
  </div>
</div>
```

## Grid System Migration

Bootstrap uses a 12-column float-based grid. bindrunes uses Tailwind's utility-first grid system.

| Bootstrap Grid | Tailwind Equivalent |
|---|---|
| `<div class="container">` | `<div class="container mx-auto">` |
| `<div class="row">` | `<div class="grid grid-cols-12 gap-4">` |
| `<div class="col-md-6">` | `<div class="col-span-12 md:col-span-6">` |
| `<div class="col-lg-4 col-md-6">` | `<div class="col-span-12 md:col-span-6 lg:col-span-4">` |
| `<div class="offset-md-2">` | `<div class="col-start-3">` |
| `<div class="col-auto">` | `<div class="col-span-auto">` |
| `<div class="w-25">` (25% width) | `<div class="w-1/4">` |
| `<div class="mx-auto">` (center) | `<div class="mx-auto">` |

### Flex Utilities

| Bootstrap | Tailwind |
|---|---|
| `d-flex` | `flex` |
| `d-inline-flex` | `inline-flex` |
| `justify-content-center` | `justify-center` |
| `justify-content-between` | `justify-between` |
| `align-items-center` | `items-center` |
| `flex-column` | `flex-col` |
| `flex-wrap` | `flex-wrap` |
| `gap-3` | `gap-3` |

## Color System Migration

Bootstrap uses Sass variables with a 10-step color scale. bindrunes uses OKLCH CSS custom properties with a role-based token system.

### Before (Bootstrap Sass)

```scss
// _variables.scss
$primary: #0d6efd;
$secondary: #6c757d;
$success: #198754;
$danger: #dc3545;
$warning: #ffc107;
$info: #0dcaf0;
$light: #f8f9fa;
$dark: #212529;

$body-bg: #fff;
$body-color: #212529;
$link-color: #0d6efd;
```

### After (bindrunes)

```ts
import { defineTheme } from "bindrunes";

const myBrand = defineTheme("my-brand", {
  "--primary": "oklch(0.55 0.18 260)",        // was $primary
  "--primary-foreground": "oklch(0.99 0 0)",
  "--accent": "oklch(0.45 0.06 270)",          // was $secondary
  "--accent-foreground": "oklch(0.99 0 0)",
  "--destructive": "oklch(0.58 0.22 25)",      // was $danger
  "--destructive-foreground": "oklch(0.99 0 0)",
  "--success": "oklch(0.62 0.19 145)",         // was $success
  "--warning": "oklch(0.82 0.18 85)",          // was $warning
  "--info": "oklch(0.7 0.14 230)",             // was $info
  "--background": "oklch(1 0 0)",              // was $body-bg
  "--foreground": "oklch(0.2 0.01 270)",       // was $body-color
  "--border": "oklch(1 0 0 / 0.12)",
});

myBrand.apply();
```

### Bootstrap Color Scale to bindrunes

| Bootstrap Color | bindrunes Token | Notes |
|---|---|---|
| `$primary` | `--primary` | Main brand color |
| `$secondary` | `--accent` | Secondary emphasis |
| `$success` | `--success` | Positive state |
| `$danger` | `--destructive` | Error/negative state |
| `$warning` | `--warning` | Caution state |
| `$info` | `--info` | Informational state |
| `$light` | `--background` or `--surface-1` | Light background |
| `$dark` | `--foreground` or `--card-solid` | Dark foreground |
| `$body-bg` | `--background` | Page background |
| `$body-color` | `--foreground` | Default text color |
| `$link-color` | Use `text-foreground` + `hover:text-primary` | Links use foreground by default |
| `$border-color` | `--border` | Border color |

## JavaScript Plugin Migration

Bootstrap relies on jQuery and Bootstrap JS for interactive behavior. bindrunes replaces these with Svelte components and composables.

| Bootstrap JS | bindrunes Equivalent |
|---|---|
| `bootstrap.Modal` | `<Dialog>` component with `bind:open` |
| `bootstrap.Offcanvas` | `<Sheet>` or `<Drawer>` component |
| `bootstrap.Dropdown` | `<DropdownMenu>` component |
| `bootstrap.Collapse` | `<Collapsible>` component |
| `bootstrap.Tab` | `<Tabs>` + `<TabsTrigger>` + `<TabsContent>` |
| `bootstrap.Toast` | `createToast()` composable |
| `bootstrap.Tooltip` | `<Tooltip>` component |
| `bootstrap.Popover` | `<Popover>` component |
| `bootstrap.Collapse` | `<Accordion>` component |
| `bootstrap.Alert` (dismiss) | `<Alert>` with `onClose` |
| `bootstrap.Spinner` | `<Spinner>` component |
| `bootstrap.Progress` | `<Progress>` component |
| `bootstrap.Carousel` | No direct equivalent |

### Before (Bootstrap JS)

```js
// Bootstrap modal
const modal = new bootstrap.Modal(document.getElementById('myModal'));
modal.show();

// Bootstrap toast
const toastEl = document.getElementById('myToast');
const toast = new bootstrap.Toast(toastEl);
toast.show();
```

### After (bindrunes)

```svelte
<script lang="ts">
  import { Dialog } from "bindrunes";
  import { createToast } from "bindrunes";

  let modalOpen = $state(false);
  const toast = createToast();
</script>

<button onclick={() => modalOpen = true}>Open Modal</button>

<Dialog bind:open={modalOpen}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</Dialog>

<button onclick={() => toast.success("Saved!")}>Show Toast</button>
```

## Form Migration

Bootstrap forms use CSS classes on native HTML elements. bindrunes provides proper Svelte components with built-in validation via Valibot.

### Before (Bootstrap)

```html
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" required>
    <div class="valid-feedback">Looks good!</div>
    <div class="invalid-feedback">Please enter a valid email.</div>
  </div>
  <div class="mb-3">
    <label for="role" class="form-label">Role</label>
    <select class="form-select" id="role">
      <option selected>Choose...</option>
      <option>Admin</option>
      <option>User</option>
    </select>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="agree">
    <label class="form-check-label" for="agree">I agree</label>
  </div>
  <div class="mb-3 form-check form-switch">
    <input type="checkbox" class="form-check-input" id="notifications">
    <label class="form-check-label" for="notifications">Notifications</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### After (bindrunes)

```svelte
<script lang="ts">
  import * as v from "valibot";
  import { createForm, Form, FormField, Input, Select, Checkbox, Switch, Button, Label } from "bindrunes";

  const formSchema = v.object({
    email: v.pipe(v.string(), v.email()),
    role: v.string(),
    agree: v.boolean(),
    notifications: v.boolean(),
  });

  const form = createForm({
    schema: formSchema,
    initialValues: {
      email: "",
      role: "",
      agree: false,
      notifications: false,
    },
    onSubmit: async (values) => {
      // submit to server
    },
  });
</script>

<Form {form}>
  <FormField name="email">
    <Label>Email</Label>
    <Input type="email" bind:value={form.values.email} />
    {#if form.errors.email}
      <span class="text-destructive text-sm">{form.errors.email}</span>
    {/if}
  </FormField>

  <FormField name="role">
    <Label>Role</Label>
    <Select bind:value={form.values.role}>
      <option value="">Choose...</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </Select>
  </FormField>

  <FormField name="agree">
    <Checkbox bind:checked={form.values.agree} />
    <Label>I agree</Label>
  </FormField>

  <FormField name="notifications">
    <Label>Notifications</Label>
    <Switch bind:checked={form.values.notifications} />
  </FormField>

  <Button type="submit" variant="primary">Submit</Button>
</Form>
```

## Common Pitfalls

### 1. CSS Conflicts

Bootstrap and bindrunes both reset base styles. Remove Bootstrap CSS entirely before adding bindrunes -- mixing them will cause conflicts.

```bash
# Remove Bootstrap
npm uninstall bootstrap
# Remove from your CSS
# Delete: @import "bootstrap";
```

### 2. Don't Mix Utility Classes

Bootstrap utility classes (`mt-3`, `text-center`) may conflict with Tailwind classes (`mt-3`, `text-center`). While some overlap, remove Bootstrap's utility CSS and use Tailwind exclusively.

### 3. jQuery Dependency

If your project uses jQuery for Bootstrap JS plugins, replace those calls with bindrunes components. You can remove jQuery entirely once migration is complete.

### 4. Responsive Breakpoints Differ

Bootstrap and Tailwind use different breakpoint names and defaults:

| Bootstrap | Tailwind |
|---|---|
| `xs` (< 576px) | `sm` (≥ 640px) |
| `sm` (≥ 576px) | `md` (≥ 768px) |
| `md` (≥ 768px) | `lg` (≥ 1024px) |
| `lg` (≥ 992px) | `xl` (≥ 1280px) |
| `xl` (≥ 1200px) | `2xl` (≥ 1536px) |

Adjust your responsive class prefixes accordingly.

### 5. Forms Need Validation Libraries

Bootstrap uses native HTML5 validation. bindrunes uses Valibot for schema-based validation. Install it:

```bash
npm install valibot
```

### 6. Toast Is a Composable

Bootstrap toasts are markup-based. bindrunes uses a composable. Add `ToastProvider` to your root layout:

```svelte
<script lang="ts">
  import { AppProvider, ToastProvider } from "bindrunes";
</script>

<AppProvider>
  <ToastProvider>
    {@render children()}
  </ToastProvider>
</AppProvider>
```

### 7. No Bootstrap Grid Classes

Bootstrap's `col-md-6`, `offset-lg-3` etc. don't exist in Tailwind. Use `col-span-*` and `col-start-*` instead. See the Grid System Migration section above.

## Migration Steps

1. **Install bindrunes:** `npm install bindrunes`
2. **Remove Bootstrap:** `npm uninstall bootstrap` and remove CSS imports
3. **Update `app.css`:** Replace Bootstrap imports with bindrunes imports
4. **Add `AppProvider`:** Wrap your root layout with `AppProvider` and `ToastProvider`
5. **Replace Bootstrap grid:** Swap `row`/`col-*` for Tailwind `grid`/`col-span-*`
6. **Replace components:** Swap Bootstrap classes (`btn`, `card`, `form-control`) for bindrunes components (`Button`, `Card`, `Input`)
7. **Replace JS plugins:** Swap `bootstrap.Modal` etc. for bindrunes components
8. **Migrate forms:** Install Valibot, replace native validation with `createForm()`
9. **Replace colors:** Map Bootstrap Sass variables to OKLCH custom properties
10. **Remove jQuery:** If no longer needed, remove it
11. **Test:** Verify all components render correctly with the new design system
