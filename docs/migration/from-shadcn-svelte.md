# Migration Guide: shadcn-svelte to bindrunes

This guide walks you through migrating a SvelteKit project from shadcn-svelte to bindrunes. The two libraries share conceptual DNA (both are component libraries for Svelte) but differ significantly in architecture, theming, and form validation.

## Component Mapping

| shadcn-svelte | bindrunes | Notes |
|---|---|---|
| `Button` | `Button` | Same name; bindrunes uses `variant` prop with different values |
| `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter` | `Card` | bindrunes uses a single `Card` component with slot regions |
| `Input` | `Input` | Same API surface |
| `Label` | `Label` | Same API surface |
| `Badge` | `Badge` | Different variant names (see below) |
| `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` | `Dialog` | bindrunes uses a single `Dialog` with named slots |
| `AlertDialog` | `AlertDialog` | Same pattern |
| `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, etc. | `DropdownMenu` | Simplified API |
| `Select`, `SelectContent`, `SelectItem`, etc. | `Select` | Simplified API |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Same decomposition |
| `Toast`, `ToastProvider` | `ToastProvider` | bindrunes uses composable `createToast()` |
| `Sheet`, `SheetContent` | `Sheet`, `Drawer` | Sheet for side panels, Drawer for bottom sheets |
| `Switch` | `Switch` | Same API |
| `Checkbox` | `Checkbox` | Same API |
| `RadioGroup`, `RadioGroupItem` | `RadioGroup` | Simplified |
| `Slider` | `Slider` | Same API |
| `Progress` | `Progress` | Same API |
| `Avatar`, `AvatarImage`, `AvatarFallback` | `Avatar` | Single component |
| `Separator` | `Separator` | Same API |
| `Skeleton` | `Skeleton` | Same API |
| `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` | `Tooltip`, `TooltipProvider` | Simplified |
| `Popover`, `PopoverContent`, `PopoverTrigger` | `Popover` | Simplified |
| `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | `Collapsible` | Simplified |
| `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | `Accordion`, `AccordionItem` | Simplified |
| `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, etc. | `NavigationMenu` | Single component |
| `Breadcrumb`, `BreadcrumbItem`, etc. | `Breadcrumb` | Single component |
| `ContextMenu`, `ContextMenuContent`, etc. | `ContextMenu` | Simplified |
| `Pagination` | `Pagination` | Same API |
| `ScrollArea` | `ScrollArea` | Same API |
| `Table`, `TableHeader`, `TableBody`, etc. | `DataTable` | bindrunes provides a higher-level `DataTable` with column config |
| `Form`, `FormField` | `Form`, `FormField` | Validation differs (see below) |
| `DatePicker` | `DatePicker` | Same API |
| `Sonner` (toast) | `ToastProvider` + `createToast()` | Composable-based |
| — | `Stepper` | bindrunes-only |
| — | `TreeView` | bindrunes-only |
| — | `RichTextEditor` | bindrunes-only |
| — | `TagInput` | bindrunes-only |
| — | `Combobox` | bindrunes-only |
| — | `TimeField` | bindrunes-only |
| — | `PinInput` | bindrunes-only |
| — | `RatingGroup` | bindrunes-only |

## Theme Variable Migration

shadcn-svelte uses HSL CSS variables. bindrunes uses OKLCH -- a perceptually uniform color space that produces more consistent results across displays.

### Before (shadcn-svelte)

```css
/* app.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

### After (bindrunes)

bindrunes handles dark/light mode automatically. You only need to set the theme attribute:

```html
<!-- In your layout -->
<html data-theme="editorial">
```

Or use the composable for runtime switching:

```svelte
<script lang="ts">
  import { createTheme } from "bindrunes";
  const theme = createTheme({ default: "editorial" });
</script>
```

If you need a custom color palette, use `defineTheme()`:

```ts
import { defineTheme } from "bindrunes";

const myBrand = defineTheme("my-brand", {
  // OKLCH format: oklch(Lightness Chroma Hue)
  "--primary": "oklch(0.55 0.18 260)",
  "--primary-foreground": "oklch(0.99 0 0)",
  "--background": "oklch(0.12 0.008 260)",
  "--foreground": "oklch(0.95 0.005 260)",
  "--card-solid": "oklch(0.16 0.01 260)",
  "--destructive": "oklch(0.6 0.22 25)",
  "--success": "oklch(0.68 0.16 145)",
  "--warning": "oklch(0.8 0.16 80)",
  "--info": "oklch(0.7 0.12 230)",
  "--border": "oklch(1 0 0 / 0.08)",
  "--ring": "oklch(0.55 0.18 260)",
});

myBrand.apply();
```

### HSL to OKLCH Conversion Reference

| shadcn HSL token | bindrunes OKLCH equivalent |
|---|---|
| `0 0% 100%` (white) | `oklch(1 0 0)` |
| `0 0% 0%` (black) | `oklch(0 0 0)` |
| `222.2 84% 4.9%` (dark blue-grey) | `oklch(0.12 0.02 250)` |
| `210 40% 98%` (near-white) | `oklch(0.97 0.005 250)` |
| `0 84.2% 60.2%` (red) | `oklch(0.63 0.23 25)` |
| `142 76% 36%` (green) | `oklch(0.62 0.19 145)` |
| `38 92% 50%` (amber) | `oklch(0.79 0.16 80)` |
| `199 89% 48%` (blue) | `oklch(0.65 0.14 230)` |

### Converting Existing HSL Values

Use this utility to convert HSL to OKLCH:

```ts
import { hexToOklch } from "bindrunes";

// Convert hex to OKLCH
const oklchValue = hexToOklch("#6366f1"); // Returns "oklch(0.55 0.18 260)"
```

Or use an online converter like [oklch.com](https://oklch.com).

## Form Library Migration (Zod to Valibot)

bindrunes uses Valibot instead of Zod for form validation. Valibot is smaller (tree-shakeable) and has a compatible API.

### Before (shadcn-svelte + Zod)

```svelte
<script lang="ts">
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms" }),
    }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <FormField {form} name="username">
    <Control let:attrs>
      <Label>Username</Label>
      <Input {...attrs} bind:value={$formData.username} />
    </Control>
    <FormDescription>Your display name</FormDescription>
    <FormErrors />
  </FormField>
</form>
```

### After (bindrunes + Valibot)

```svelte
<script lang="ts">
  import * as v from "valibot";
  import { createForm, Form, FormField, Input, Label } from "bindrunes";

  const formSchema = v.object({
    username: v.pipe(v.string(), v.minLength(2), v.maxLength(50)),
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(8)),
    agreeToTerms: v.literal(true),
  });

  type FormSchema = v.InferOutput<typeof formSchema>;

  const form = createForm<FormSchema>({
    schema: formSchema,
    initialValues: {
      username: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
    onSubmit: async (values) => {
      // submit to server
    },
  });
</script>

<Form {form}>
  <FormField name="username">
    <Label>Username</Label>
    <Input bind:value={form.values.username} />
    {#if form.errors.username}
      <span class="text-destructive text-sm">{form.errors.username}</span>
    {/if}
  </FormField>

  <FormField name="email">
    <Label>Email</Label>
    <Input type="email" bind:value={form.values.email} />
    {#if form.errors.email}
      <span class="text-destructive text-sm">{form.errors.email}</span>
    {/if}
  </FormField>

  <FormField name="password">
    <Label>Password</Label>
    <Input type="password" bind:value={form.values.password} />
    {#if form.errors.password}
      <span class="text-destructive text-sm">{form.errors.password}</span>
    {/if}
  </FormField>

  <button type="submit" class="btn-primary">Sign Up</button>
</Form>
```

### Zod and Valibot API Reference

| Zod | Valibot |
|---|---|
| `z.string()` | `v.string()` |
| `z.string().min(2)` | `v.pipe(v.string(), v.minLength(2))` |
| `z.string().max(50)` | `v.pipe(v.string(), v.maxLength(50))` |
| `z.string().email()` | `v.pipe(v.string(), v.email())` |
| `z.string().url()` | `v.pipe(v.string(), v.url())` |
| `z.number()` | `v.number()` |
| `z.number().min(0)` | `v.pipe(v.number(), v.minValue(0))` |
| `z.number().max(100)` | `v.pipe(v.number(), v.maxValue(100))` |
| `z.boolean()` | `v.boolean()` |
| `z.literal(true)` | `v.literal(true)` |
| `z.array(z.string())` | `v.array(v.string())` |
| `z.object({...})` | `v.object({...})` |
| `z.union([z.string(), z.number()])` | `v.union([v.string(), v.number()])` |
| `z.enum(["a", "b"])` | `v.enum(["a", "b"])` |
| `z.optional(z.string())` | `v.optional(v.string())` |
| `z.nullable(z.string())` | `v.nullable(v.string())` |
| `z.infer<typeof schema>` | `v.InferOutput<typeof schema>` |

**Key difference:** Valibot uses `v.pipe()` for chaining validation rules instead of method chaining:

```ts
// Zod (method chaining)
z.string().min(2).max(50).email();

// Valibot (pipe)
v.pipe(v.string(), v.minLength(2), v.maxLength(50), v.email());
```

## Install and Setup Changes

### Before (shadcn-svelte)

```bash
npx shadcn-svelte@latest init
npx shadcn-svelte@latest add button card input
```

`components.json`:
```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "$lib/components",
    "utils": "$lib/utils"
  }
}
```

### After (bindrunes)

```bash
npm install bindrunes
```

`app.css`:
```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

`+layout.svelte`:
```svelte
<script lang="ts">
  import { AppProvider } from "bindrunes";
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

### Key Differences

| Aspect | shadcn-svelte | bindrunes |
|---|---|---|
| Install method | `npx shadcn-svelte add` | `npm install bindrunes` |
| Component location | Copied into `$lib/components` | Imported from `bindrunes` package |
| Theming | HSL CSS variables, manual dark mode | OKLCH tokens, automatic dark/light |
| Dark mode | Toggle `.dark` class manually | `data-theme` attribute with built-in light/dark |
| Form validation | Zod + superforms | Valibot + `createForm()` composable |
| Toast notifications | Sonner integration | `createToast()` composable |
| Tailwind config | Custom `tailwind.config.js` | `@plugin "bindrunes/tailwind"` |
| Provider wrapper | Not required | `AppProvider` wraps root layout |
| Customization | Override CSS variables | 3-axis system (theme x aesthetic x density) |

## Migration Steps

1. **Install bindrunes:** `npm install bindrunes`
2. **Update `app.css`:** Replace shadcn imports with bindrunes imports
3. **Add `AppProvider`:** Wrap your root layout
4. **Replace CSS variables:** Swap HSL values for OKLCH (use `hexToOklch()` for conversion)
5. **Replace component imports:** Update import paths from local components to `bindrunes`
6. **Migrate forms:** Replace Zod schemas with Valibot, swap `superForm` for `createForm`
7. **Test theme switching:** Verify your color palette looks correct in both light and dark modes
8. **Remove shadcn artifacts:** Delete `$lib/components`, `components.json`, and unused config files
