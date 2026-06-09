---
name: tailwind-best-practices
description: Tailwind CSS v4, OKLCH colors, design tokens, component variants, and utility patterns. Use when styling with Tailwind.
---

# Tailwind CSS v4 Best Practices

## v4 Changes

Tailwind v4 is a major rewrite. Key differences from v3:
- CSS-first configuration (no `tailwind.config.js`)
- `@theme` directive for design tokens
- `@import "tailwindcss"` instead of `@tailwind` directives
- Built-in CSS layers (no `@layer` needed for most cases)
- Native OKLCH color support

## Configuration

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.7 0.15 250);
  --color-secondary: oklch(0.6 0.12 280);
  --radius-lg: 1rem;
  --font-display: "Inter", sans-serif;
}
```

## OKLCH Colors

OKLCH is perceptually uniform — better for design systems:

```css
/* Good: OKLCH */
--color-primary: oklch(0.7 0.15 250);

/* Avoid: hex or HSL for design tokens */
--color-primary: #4a90d9;
```

OKLCH syntax: `oklch(lightness chroma hue)`
- Lightness: 0-1 (0 = black, 1 = white)
- Chroma: 0-0.4 (0 = gray, higher = more vivid)
- Hue: 0-360 (color wheel angle)

## Component Variants

Use class maps for component variants:

```svelte
<script lang="ts">
  type Variant = 'primary' | 'secondary' | 'ghost';

  const variantClasses: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
  };

  let { variant = 'primary' }: { variant?: Variant } = $props();
</script>

<button class="px-4 py-2 rounded-lg {variantClasses[variant]}">
  {@render children()}
</button>
```

## Design Tokens

Define tokens in `@theme`, use via CSS variables:

```css
@theme {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --color-surface: oklch(0.14 0.005 250);
  --color-surface-raised: oklch(0.18 0.005 250);
  --color-border: oklch(0.3 0.005 250);

  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px oklch(0 0 0 / 0.1);
}
```

## Utility Patterns

- Use `@apply` sparingly — prefer utility classes directly
- Use `@layer components` for reusable component styles
- Use `@layer utilities` for custom utilities
- Dark mode via `dark:` prefix or `data-theme` attribute

## Responsive Design

```svelte
<!-- Mobile-first -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Animation

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

## Common Mistakes

- Don't use `!important` — fix specificity instead
- Don't use arbitrary values when theme tokens exist
- Don't duplicate colors — use the theme palette
- Don't mix Tailwind with inline styles (except dynamic values)
- Don't use `@apply` for one-off styles
