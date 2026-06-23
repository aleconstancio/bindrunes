# Migration Guide: Skeleton UI to bindrunes

This guide covers migrating from Skeleton UI (the SvelteKit-first component library) to bindrunes. Both libraries are component libraries for Svelte with built-in theming, but they differ significantly in theme architecture, color system, and customization model.

## Component Mapping

| Skeleton UI | bindrunes | Notes |
|---|---|---|
| `Accordion`, `AccordionItem`, `AccordionControl`, `AccordionPanel` | `Accordion`, `AccordionItem` | Simplified API |
| `Alert` | `Alert` | Same API |
| `Avatar`, `AvatarGroup` | `Avatar` | Group support may need custom layout |
| `Badge` | `Badge` | Different variant names |
| `Breadcrumb`, `BreadcrumbItem` | `Breadcrumb` | Single component |
| `button` (Tailwind directive) | `Button` | Skeleton uses Tailwind classes; bindrunes uses a component |
| `Card`, `CardHeader`, `CardBody`, `CardFooter` | `Card` | Single component with slots |
| `ConicGradient` | — | Use CSS `conic-gradient()` directly |
| `Drawer` | `Drawer` | Direct mapping |
| `FileUpload` | `FileUpload` | Direct mapping |
| `GradientHeading` | — | Use `.text-gradient-violet` utility class |
| `Input` | `Input` | Same API |
| `InputChip` | `TagInput` | Different name |
| `ListBox`, `ListBoxItem` | `Select` | Different pattern |
| `Modal` | `Dialog` | Different name |
| `Navigation`, `NavigationItem` | `NavigationMenu` | Different decomposition |
| `Pagination` | `Pagination` | Same API |
| `Popover` | `Popover` | Direct mapping |
| `Progress` | `Progress` | Same API |
| `RadioGroup`, `RadioItem` | `RadioGroup` | Simplified |
| `RangeSlider` | `Slider` | Different name |
| `Rating` | `RatingGroup` | Different name |
| `Select` | `Select` | Direct mapping |
| `Separator` | `Separator` | Same API |
| `Skeleton` | `Skeleton` | Same API |
| `SlideToggle` | `Switch` | Different name |
| `Stepper`, `Step` | `Stepper` | Similar pattern |
| `Tab`, `TabGroup`, `TabPanel` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Different decomposition |
| `Table`, `TableHead`, `TableRow`, `TableCell` | `DataTable` | Higher-level component |
| `Toast`, `toastStore` | `ToastProvider` + `createToast()` | Composable-based |
| `Tooltip` | `Tooltip` | Direct mapping |
| — | `Combobox` | bindrunes-only |
| — | `DatePicker` | bindrunes-only |
| — | `TreeView` | bindrunes-only |
| — | `RichTextEditor` | bindrunes-only |
| — | `Stepper` | bindrunes-only |

## Theme System Migration

This is the most significant change. Skeleton uses a single-theme color palette with HSL CSS variables and CSS layers. bindrunes uses a 3-axis system (theme x aesthetic x density) with OKLCH color tokens.

### Before (Skeleton UI)

Skeleton defines themes via `src/theme.postcss` or `src/theme.pcss`:

```css
@import "@skeletonlabs/skeleton";

@custom-variant dark (&:is(.dark *));

@layer base {
  @apply bg-surface-50-950-token text-on-surface-token;
}

@theme {
  --color-primary-50: oklch(0.97 0.01 270);
  --color-primary-100: oklch(0.93 0.02 270);
  --color-primary-200: oklch(0.87 0.04 270);
  --color-primary-300: oklch(0.78 0.06 270);
  --color-primary-400: oklch(0.68 0.09 270);
  --color-primary-500: oklch(0.58 0.12 270);
  --color-primary-600: oklch(0.50 0.14 270);
  --color-primary-700: oklch(0.42 0.13 270);
  --color-primary-800: oklch(0.35 0.10 270);
  --color-primary-900: oklch(0.28 0.07 270);
  --color-primary-950: oklch(0.20 0.04 270);

  --color-secondary-50: oklch(0.97 0.01 300);
  --color-secondary-100: oklch(0.93 0.02 300);
  /* ... 50-950 scale ... */

  --color-tertiary-50: oklch(0.97 0.01 180);
  /* ... 50-950 scale ... */

  --color-surface-50: oklch(0.97 0.005 270);
  /* ... 50-950 scale ... */

  --color-success-50: oklch(0.97 0.01 145);
  /* ... 50-950 scale ... */

  --color-warning-50: oklch(0.97 0.01 80);
  /* ... 50-950 scale ... */

  --color-error-50: oklch(0.97 0.01 25);
  /* ... 50-950 scale ... */

  --color-on-primary: oklch(1 0 0);
  --color-on-secondary: oklch(1 0 0);
  --color-on-tertiary: oklch(1 0 0);
  --color-on-surface: oklch(0.13 0 0);
  --color-on-success: oklch(1 0 0);
  --color-on-warning: oklch(0.13 0 0);
  --color-on-error: oklch(1 0 0);

  --font-family-heading: "Inter", sans-serif;
  --font-family-default: "Inter", sans-serif;
  --font-family-mono: "JetBrains Mono", monospace;

  --radius-container: 1rem;
  --radius-default: 0.5rem;
  --radius-xl: 1.5rem;
}
```

Skeleton's Tailwind config:
```ts
// tailwind.config.ts
import { skeleton } from "@skeletonlabs/skeleton/plugin";

export default {
  plugins: [skeleton({
    themes: {
      custom: {
        "colors": {
          primary: { ... },
          secondary: { ... },
        },
      },
    },
  })],
};
```

### After (bindrunes)

bindrunes replaces the entire Skeleton theme system. You no longer need a `theme.postcss` file, a custom `tailwind.config.ts` plugin, or a 50-950 color scale.

**Setup (`app.css`):**
```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
```

**Choose a preset theme:**
```html
<html data-theme="editorial">
```

Or pick from any built-in theme:
- `editorial` -- warm grey & indigo (default)
- `dracula` -- vibrant purple & dark
- `nord` -- Nordic blue-grey
- `catppuccin` -- soft pastels
- `rose-pine` -- warm muted tones
- `github` -- neutral & accessible

**Custom theme with `defineTheme()`:**
```ts
import { defineTheme } from "bindrunes";

const myBrand = defineTheme("my-brand", {
  // 16 tokens replace Skeleton's 50-950 scale
  "--primary": "oklch(0.58 0.12 270)",
  "--primary-foreground": "oklch(0.99 0 0)",
  "--accent": "oklch(0.55 0.14 300)",
  "--accent-foreground": "oklch(0.99 0 0)",
  "--background": "oklch(0.13 0.01 270)",
  "--foreground": "oklch(0.96 0.005 270)",
  "--card-solid": "oklch(0.17 0.008 270)",
  "--surface-1": "oklch(0.16 0.008 270)",
  "--surface-2": "oklch(0.19 0.008 270)",
  "--surface-3": "oklch(0.22 0.008 270)",
  "--destructive": "oklch(0.62 0.22 25)",
  "--success": "oklch(0.68 0.16 145)",
  "--warning": "oklch(0.8 0.16 80)",
  "--info": "oklch(0.7 0.12 230)",
  "--border": "oklch(1 0 0 / 0.08)",
  "--ring": "oklch(0.58 0.12 270)",
});

myBrand.apply();
```

### Skeleton vs bindrunes Token Comparison

| Skeleton Token | bindrunes Token | Notes |
|---|---|---|
| `--color-primary-50` to `--color-primary-950` | `--primary` + `--primary-foreground` | bindrunes uses single primary color, not a 10-step scale |
| `--color-secondary-50` to `--color-secondary-950` | `--accent` + `--accent-foreground` | Maps to accent |
| `--color-tertiary-*` | `--info` | Tertiary maps to info |
| `--color-surface-50` to `--color-surface-950` | `--background`, `--surface-1/2/3`, `--card-solid` | Surface hierarchy via named tokens |
| `--color-on-primary` | `--primary-foreground` | Same purpose |
| `--color-on-secondary` | `--accent-foreground` | Same purpose |
| `--color-on-surface` | `--foreground` | Same purpose |
| `--color-success-*` | `--success` + `--success-foreground` + `--success-soft` | State color with soft variant |
| `--color-warning-*` | `--warning` + `--warning-foreground` + `--warning-soft` | State color with soft variant |
| `--color-error-*` | `--destructive` + `--destructive-foreground` + `--destructive-soft` | "error" renamed to "destructive" |
| `--font-family-heading` | Not in token system | Use Tailwind `font-heading` class |
| `--font-family-default` | Not in token system | Use Tailwind `font-sans` class |
| `--font-family-mono` | Not in token system | Use Tailwind `font-mono` class |
| `--radius-container` | `--radius-lg` or `--radius-xl` | Maps to larger radius tokens |
| `--radius-default` | `--radius` | Base radius |
| `--radius-xl` | `--radius-xl` | Same |

### Key Theme Differences

| Aspect | Skeleton | bindrunes |
|---|---|---|
| Color space | HSL (via Tailwind `oklch`) | OKLCH (native CSS) |
| Color scale | 50-950 per color | Single token per role |
| Dark mode | Toggle `.dark` class | `data-theme` attribute with built-in light/dark |
| Theme switching | Swap theme object in Tailwind config | `createTheme()` composable at runtime |
| Aesthetic control | None (tailwind classes only) | Built-in aesthetic axis (editorial/glass/bento/expressive) |
| Density control | None | Built-in density axis (compact/comfortable/spacious) |
| Custom themes | Define full 50-950 scale | Define ~16 tokens via `defineTheme()` |
| Components | Pre-styled with Tailwind classes | Pre-styled with CSS custom properties |

## Install Changes

### Before (Skeleton UI)

```bash
npm install @skeletonlabs/skeleton
npm install @skeletonlabs/skeleton-svelte
```

`tailwind.config.ts`:
```ts
import { skeleton } from "@skeletonlabs/skeleton/plugin";

export default {
  plugins: [
    skeleton({
      themes: {
        custom: {
          /* your theme */
        },
      },
    }),
  ],
};
```

`app.css`:
```css
@import "@skeletonlabs/skeleton";
@import "@skeletonlabs/skeleton-svelte/styles";

@custom-variant dark (&:is(.dark *));

@theme {
  /* theme tokens */
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

Optionally import specific aesthetics:
```css
@import "bindrunes/styles/aesthetics/glass.css";
@import "bindrunes/styles/aesthetics/bento.css";
@import "bindrunes/styles/aesthetics/expressive.css";
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

### Remove Skeleton Artifacts

After migration, remove these files and dependencies:

```bash
npm uninstall @skeletonlabs/skeleton @skeletonlabs/skeleton-svelte
rm src/theme.postcss  # or src/theme.pcss
```

Remove from `tailwind.config.ts`:
- The `skeleton()` plugin import and usage
- Any Skeleton-specific theme configuration

### Migration Steps

1. **Install bindrunes:** `npm install bindrunes`
2. **Update `app.css`:** Replace Skeleton imports with bindrunes imports
3. **Choose a theme:** Start with `editorial` or map your Skeleton colors to a preset
4. **Add `AppProvider`:** Wrap your root layout
5. **Replace button classes:** Skeleton's `btn` / `btn-*` classes become `<Button>` components
6. **Replace card markup:** Skeleton's multi-part Card becomes a single `<Card>` component
7. **Replace Modal:** Skeleton's Modal becomes `<Dialog>`
8. **Replace Tab markup:** Skeleton's `TabGroup/Tab/TabPanel` becomes `Tabs/TabsList/TabsTrigger/TabsContent`
9. **Replace Toast:** Skeleton's `toastStore` becomes `createToast()` composable
10. **Remove Skeleton:** Uninstall packages and remove config artifacts
11. **Test:** Verify all components render correctly with the new theme
