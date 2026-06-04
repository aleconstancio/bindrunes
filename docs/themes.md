# Theming

## Theme Presets

bindrunes ships with 7 built-in theme presets:

| Preset | Primary | Accent | Character |
|--------|---------|--------|-----------|
| `dracula` | Purple | Pink | Dark, moody, hacker |
| `akashic` | Blue | Cyan | Deep knowledge, calm |
| `martian` | Red | Orange | Warm, intense |
| `alchemy` | Gold | Amber | Precious, refined |
| `druidic` | Green | Teal | Natural, balanced |
| `obsidian` | Slate | Neutral | Minimal, professional |
| `contrast` | White | White | High-contrast accessibility |

Import a preset in your `app.css`:

```css
@import "bindrunes/styles/themes/dracula.css";
```

## Runtime Theme Switching

```svelte
<script lang="ts">
  import { createTheme } from "bindrunes";

  const theme = createTheme({ default: "dracula" });
</script>

{#each theme.themes as t}
  <button onclick={() => theme.setTheme(t)}>{t}</button>
{/each}
```

## Custom Themes

Override tokens on `[data-theme="yourname"]`:

```css
[data-theme="custom"] {
  --background: oklch(0.06 0.02 200);
  --primary: oklch(0.70 0.15 200);
  --accent: oklch(0.65 0.20 180);
}
```

## Manual Token Override

Override individual tokens on `:root`:

```css
:root {
  --background: oklch(0.05 0.01 290);
  --foreground: oklch(0.95 0.01 290);
  --primary: oklch(0.75 0.21 310);
  --success: oklch(0.65 0.2 145);
  --warning: oklch(0.80 0.18 85);
  --destructive: oklch(0.65 0.24 30);
  --radius: 0.625rem;
}
```

## Available Tokens

### Color Tokens

| Token | Tailwind Utility | Description |
|-------|-----------------|-------------|
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Default text |
| `--card` | `bg-card` | Card surface |
| `--card-foreground` | `text-card-foreground` | Text on cards |
| `--primary` | `bg-primary`, `text-primary` | Primary brand color |
| `--primary-foreground` | `text-primary-foreground` | Text on primary |
| `--secondary` | `bg-secondary` | Secondary surface |
| `--muted` | `bg-muted` | Muted background |
| `--accent` | `bg-accent` | Accent color |
| `--destructive` | `bg-destructive` | Destructive/error |
| `--border` | `border-border` | Default borders |
| `--input` | `bg-input` | Input background |
| `--ring` | `ring-ring` | Focus ring |
| `--glass-surface` | `bg-glass-surface` | Glass panel bg |
| `--glass-border` | `border-glass-border` | Glass panel border |
| `--success` | `text-success` | Success state |
| `--warning` | `text-warning` | Warning state |

### Sidebar Tokens

| Token | Tailwind Utility | Description |
|-------|-----------------|-------------|
| `--sidebar-background` | `bg-sidebar` | Sidebar background |
| `--sidebar-foreground` | `text-sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | `bg-sidebar-primary` | Sidebar accent |
| `--sidebar-border` | `border-sidebar-border` | Sidebar borders |
| `--sidebar-accent` | `bg-sidebar-accent` | Sidebar highlight |
| `--sidebar-ring` | `ring-sidebar-ring` | Sidebar focus ring |

### Typed Property Tokens

| Token | Type | Default | Description |
|-------|------|---------|-------------|
| `--radius` | `<length>` | `0.625rem` | Border radius |
| `--glass-blur` | `<length>` | `16px` | Glass blur radius |
| `--duration-snappy` | `<time>` | `150ms` | Quick transitions |
| `--duration-fluid` | `<time>` | `250ms` | Standard transitions |
| `--duration-slow` | `<time>` | `400ms` | Slow transitions |
| `--z-sidebar` | `<integer>` | `20` | Sidebar z-index |
| `--z-overlay` | `<integer>` | `30` | Overlay z-index |
| `--z-toast` | `<integer>` | `40` | Toast z-index |
| `--z-omnibar` | `<integer>` | `50` | Omnibar z-index |

## Utility Classes

Available via the Tailwind plugin:

- `.glass-panel` — Glassmorphism panel with backdrop blur
- `.glass-interactive` — Interactive glass panel with hover glow
- `.text-gradient-violet` — Foreground-to-primary text gradient
- `.text-gradient-gold` — Foreground-to-warning text gradient
- `.animate-pulse-glow` — Subtle primary glow pulse
- `.section-reveal` — Scroll-triggered fade-slide animation
- `.mono` — Monospace font stack
