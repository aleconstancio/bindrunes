# Bindrunes Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 pre-built landing page components + Tailwind CSS v4 plugin to bindrunes, making it a complete scaffold for B2B SaaS landing pages.

**Architecture:** New `src/components/landing/` directory with 11 files (context + 10 components). New `src/tailwind-plugin.ts` for JS-based Tailwind configuration. New `src/styles/landing.css` for animations. All exposed via `bindrunes/landing` and `bindrunes/tailwind` export paths.

**Tech Stack:** Svelte 5 (runes), Tailwind CSS v4 (`@theme inline`, `@plugin`), TypeScript, `svelte-package`

---

## File Structure

```
src/
├── tailwind-plugin.ts              # NEW — JS plugin for Tailwind v4
├── components/landing/
│   ├── index.ts                    # barrel exports
│   ├── landing-context.svelte.ts   # shared state (billingAnnual, activeSection, menuOpen)
│   ├── LandingNav.svelte           # sticky nav with scroll progress
│   ├── HeroSection.svelte          # hero with gradient background
│   ├── MetricsBar.svelte           # metric cards grid
│   ├── HowItWorks.svelte           # numbered steps with connector
│   ├── FeatureGrid.svelte          # feature cards (card/minimal variants)
│   ├── PricingTable.svelte         # pricing with toggle + subgrid
│   ├── Testimonial.svelte          # centered testimonial
│   ├── FAQ.svelte                  # accordion-based FAQ
│   ├── FinalCTA.svelte             # final call-to-action
│   └── SiteFooter.svelte           # site footer
├── styles/
│   └── landing.css                 # NEW — animations, text-wrap
├── index.ts                        # MODIFY — add landing re-exports
└── styles/preset.css               # MODIFY — add missing tokens
package.json                        # MODIFY — add export paths
```

---

## Task 1: Add Missing Tokens to preset.css

**Files:**
- Modify: `src/styles/preset.css`

- [ ] **Step 1: Add sidebar z-index token and font-family token**

Add after the existing `--z-omnibar` property (line 79):

```css
@property --z-sidebar {
  syntax: "<integer>";
  initial-value: 20;
  inherits: true;
}
```

Wait — `--z-sidebar` already exists at line 60. Check what's actually missing. The plan mentions `--color-success` and `--color-warning` — but those exist at lines 30-31. Let me verify what tokens VICO uses that aren't in preset.css.

Actually, looking at the existing `preset.css`, all 21 color tokens are present. The only potentially missing token is a font-family declaration. Add `--font-sans` to the `@theme inline` block:

```css
@theme inline {
  /* ...existing colors... */
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

- [ ] **Step 2: Verify build still works**

Run: `bun run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/preset.css
git commit -m "feat: add font-sans token to preset"
```

---

## Task 2: Create Tailwind Plugin

**Files:**
- Create: `src/tailwind-plugin.ts`

- [ ] **Step 1: Create the plugin file**

```ts
// src/tailwind-plugin.ts
import type { Config } from 'tailwindcss';

const plugin = {
  name: 'bindrunes',
  config: {
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: {
            DEFAULT: 'var(--card)',
            foreground: 'var(--card-foreground)',
          },
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
          },
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          accent: {
            DEFAULT: 'var(--accent)',
            foreground: 'var(--accent-foreground)',
          },
          destructive: {
            DEFAULT: 'var(--destructive)',
            foreground: 'var(--destructive-foreground)',
          },
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
          'glass-surface': 'var(--glass-surface)',
          'glass-border': 'var(--glass-border)',
          success: 'var(--success)',
          warning: 'var(--warning)',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        borderRadius: {
          DEFAULT: 'var(--radius)',
        },
        transitionDuration: {
          snappy: 'var(--duration-snappy)',
          fluid: 'var(--duration-fluid)',
          slow: 'var(--duration-slow)',
        },
        zIndex: {
          sidebar: 'var(--z-sidebar)',
          overlay: 'var(--z-overlay)',
          toast: 'var(--z-toast)',
          omnibar: 'var(--z-omnibar)',
        },
      },
    },
    plugins: [
      ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) => {
        addUtilities({
          '.glass-panel': {
            background: 'var(--glass-surface, oklch(0 0 0 / 0.4))',
            'backdrop-filter': 'blur(var(--glass-blur, 16px))',
            '-webkit-backdrop-filter': 'blur(var(--glass-blur, 16px))',
            border: '1px solid var(--glass-border, oklch(1 0 0 / 0.08))',
            'border-radius': 'var(--radius, 0.625rem)',
            transition: 'border-color var(--duration-snappy, 150ms), background-color var(--duration-snappy, 150ms), box-shadow var(--duration-snappy, 150ms), transform var(--duration-snappy, 150ms)',
          },
          '.glass-interactive': {
            cursor: 'pointer',
          },
          '.glass-interactive:hover': {
            'box-shadow': '0 0 30px oklch(from var(--primary, oklch(0.75 0.21 310)) l c h / 0.2)',
            transform: 'translateY(-2px)',
          },
          '.text-gradient-violet': {
            background: 'linear-gradient(135deg, var(--foreground, oklch(0.95 0.01 290)) 30%, var(--primary, oklch(0.75 0.21 310)) 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          },
          '.text-gradient-gold': {
            background: 'linear-gradient(135deg, var(--foreground, oklch(0.95 0.01 290)) 30%, var(--warning, oklch(0.8 0.18 85)) 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          },
          '.mono': {
            'font-family': "'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace",
          },
        });
      },
    ],
  } satisfies Config,
};

export default plugin;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `bun run check`
Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/tailwind-plugin.ts
git commit -m "feat: add Tailwind CSS v4 plugin"
```

---

## Task 3: Create landing.css

**Files:**
- Create: `src/styles/landing.css`

- [ ] **Step 1: Create the landing CSS file**

```css
/* ══════════════════════════════════════════════════
 * bindrunes — Landing Page Styles
 *
 * Import alongside global.css for landing pages:
 * @import "bindrunes/styles/landing.css";
 * ══════════════════════════════════════════════════ */

:root {
  scroll-behavior: smooth;
}

@layer base {
  :global(.landing-page) h1,
  :global(.landing-page) h2,
  :global(.landing-page) h3 {
    text-wrap: balance;
  }

  :global(.landing-page) p,
  :global(.landing-page) li {
    text-wrap: pretty;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@keyframes fade-slide-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

@media (prefers-reduced-motion: no-preference) {
  :global(.section-reveal) {
    animation: fade-slide-in 0.7s ease-out forwards;
  }

  @supports (animation-timeline: scroll()) {
    :global(.section-reveal) {
      animation-timeline: view();
      animation-range: entry 0% entry 30%;
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/landing.css
git commit -m "feat: add landing page CSS (animations, text-wrap)"
```

---

## Task 4: Create landing-context.svelte.ts

**Files:**
- Create: `src/components/landing/landing-context.svelte.ts`

- [ ] **Step 1: Create the context file**

```ts
import { setContext, getContext } from 'svelte';

const KEY = Symbol('landing');

export interface LandingState {
  billingAnnual: boolean;
  activeSection: string;
  menuOpen: boolean;
}

export function createLandingState(): LandingState {
  const state = $state<LandingState>({
    billingAnnual: false,
    activeSection: '',
    menuOpen: false,
  });
  setContext(KEY, state);
  return state;
}

export function useLanding(): LandingState {
  return getContext<LandingState>(KEY);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/landing-context.svelte.ts
git commit -m "feat: add landing context (shared state)"
```

---

## Task 5: Create HeroSection.svelte

**Files:**
- Create: `src/components/landing/HeroSection.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Component } from 'svelte';
  import { Badge, Button } from 'bindrunes';

  interface CTA {
    label: string;
    href: string;
    variant?: 'primary' | 'outline';
    icon?: Component;
  }

  interface Props {
    badge?: string;
    title: string;
    titleGradient?: boolean;
    description: string;
    ctas: CTA[];
    footnote?: { title: string; description: string };
    background?: 'gradient' | 'solid' | 'none';
    children?: Snippet;
  }

  let {
    badge,
    title,
    titleGradient = false,
    description,
    ctas,
    footnote,
    background = 'gradient',
    children,
  }: Props = $props();
</script>

<section
  class="hero-section relative overflow-hidden px-6 py-12 sm:py-24 section-reveal"
  class:hero-gradient={background === 'gradient'}
>
  {#if background === 'gradient'}
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
  {/if}
  <div class="mx-auto max-w-4xl text-center relative">
    {#if badge}
      <div class="mb-6 flex justify-center">
        <Badge variant="primary">{badge}</Badge>
      </div>
    {/if}
    <h1
      class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
      class:text-gradient-violet={titleGradient}
    >
      {@html title}
    </h1>
    <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
      {description}
    </p>
    {#if ctas.length > 0}
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {#each ctas as cta}
          <Button
            variant={cta.variant ?? 'primary'}
            size="lg"
            href={cta.href}
            class="shadow-xl px-8 py-4 font-semibold"
          >
            {cta.label}
            {#if cta.icon}
              <cta.icon size={18} />
            {/if}
          </Button>
        {/each}
      </div>
    {/if}
    {#if footnote}
      <p class="mt-6 text-xs text-muted-foreground">
        <strong>{footnote.title}</strong> {footnote.description}
      </p>
    {/if}
    {#if children}
      <div class="mt-8">
        {@render children()}
      </div>
    {/if}
  </div>
</section>

<style>
  :global(.hero-section.hero-gradient) {
    background:
      radial-gradient(ellipse at 20% 50%, oklch(0.55 0.18 240 / 0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 50%, oklch(0.55 0.15 150 / 0.04) 0%, transparent 60%);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/HeroSection.svelte
git commit -m "feat: add HeroSection component"
```

---

## Task 6: Create MetricsBar.svelte

**Files:**
- Create: `src/components/landing/MetricsBar.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';

  interface Metric {
    value: string;
    label: string;
    description?: string;
    variant?: 'default' | 'success' | 'warning';
  }

  interface Props {
    metrics: Metric[];
    columns?: 1 | 2 | 3;
    children?: Snippet;
  }

  let { metrics, columns = 3, children }: Props = $props();

  const gridClass = $derived(
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  );

  const variantColors: Record<string, string> = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
  };
</script>

<div class="grid {gridClass} gap-6">
  {#each metrics as metric}
    <Card variant="glass" padding class="transition-all hover:scale-[1.02] hover:shadow-xl">
      {#snippet children()}
        <div class="text-center">
          <p class="text-4xl font-extrabold {variantColors[metric.variant ?? 'default']}">
            {metric.value}
          </p>
          <p class="mt-2 text-sm font-medium text-foreground">{metric.label}</p>
          {#if metric.description}
            <p class="mt-1 text-xs text-muted-foreground">{metric.description}</p>
          {/if}
        </div>
      {/snippet}
    </Card>
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/MetricsBar.svelte
git commit -m "feat: add MetricsBar component"
```

---

## Task 7: Create HowItWorks.svelte

**Files:**
- Create: `src/components/landing/HowItWorks.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';
  import { Check } from 'lucide-svelte';

  interface Step {
    icon: Component;
    title: string;
    description: string;
  }

  interface Props {
    steps: Step[];
    showConnector?: boolean;
    children?: Snippet;
  }

  let { steps, showConnector = true, children }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
  {#each steps as step, i}
    <div class="relative">
      <Card variant="glass" padding class="h-full">
        {#snippet children()}
          <div class="flex flex-col items-center text-center gap-4">
            <div class="relative">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon size={24} />
              </div>
              <div class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {#if i < steps.length - 1}
                  <Check size={12} />
                {:else}
                  {i + 1}
                {/if}
              </div>
            </div>
            <h3 class="text-lg font-bold text-foreground">{step.title}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        {/snippet}
      </Card>
      {#if showConnector && i < steps.length - 1}
        <div class="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-border"></div>
      {/if}
    </div>
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/HowItWorks.svelte
git commit -m "feat: add HowItWorks component"
```

---

## Task 8: Create FeatureGrid.svelte

**Files:**
- Create: `src/components/landing/FeatureGrid.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';

  interface Feature {
    icon: Component;
    title: string;
    description: string;
  }

  interface Props {
    features: Feature[];
    columns?: 1 | 2 | 3;
    variant?: 'card' | 'minimal';
    children?: Snippet;
  }

  let { features, columns = 3, variant = 'card', children }: Props = $props();

  const gridClass = $derived(
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  );
</script>

<div class="grid {gridClass} gap-6">
  {#each features as feature}
    {#if variant === 'card'}
      <Card variant="glass" padding class="transition-all hover:scale-[1.02] hover:shadow-xl">
        {#snippet children()}
          <div class="flex flex-col gap-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <feature.icon size={20} />
            </div>
            <h3 class="text-lg font-bold text-foreground">{feature.title}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        {/snippet}
      </Card>
    {:else}
      <div class="flex gap-4">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <feature.icon size={20} />
        </div>
        <div>
          <h3 class="text-lg font-bold text-foreground">{feature.title}</h3>
          <p class="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
      </div>
    {/if}
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/FeatureGrid.svelte
git commit -m "feat: add FeatureGrid component"
```

---

## Task 9: Create PricingTable.svelte

**Files:**
- Create: `src/components/landing/PricingTable.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Card, Badge, Button } from 'bindrunes';
  import { Check } from 'lucide-svelte';
  import { useLanding } from './landing-context.svelte';

  interface Plan {
    name: string;
    monthly: number;
    annual: number;
    features: string[];
    cta: { label: string; href: string; variant?: 'primary' | 'outline' };
    highlight?: boolean;
    badge?: string;
  }

  interface Props {
    plans: Plan[];
    showToggle?: boolean;
    currency?: string;
    locale?: string;
    customCard?: Snippet<[Plan, { annual: boolean; format: (n: number) => string }]>;
    customFeature?: Snippet<[string, Plan]>;
    children?: Snippet;
  }

  let {
    plans,
    showToggle = true,
    currency = 'BRL',
    locale = 'pt-BR',
    customCard,
    customFeature,
    children,
  }: Props = $props();

  const landing = useLanding();

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n);
</script>

<div class="mx-auto max-w-6xl">
  {#if showToggle}
    <div class="flex items-center justify-center gap-3">
      <span class="text-sm font-medium {!landing.billingAnnual ? 'text-foreground' : 'text-muted-foreground'}">Mensal</span>
      <button
        class="relative h-6 w-11 rounded-full transition-colors {landing.billingAnnual ? 'bg-primary' : 'bg-muted-foreground/30'}"
        onclick={() => (landing.billingAnnual = !landing.billingAnnual)}
        aria-label="Alternar para faturamento anual"
      >
        <span class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform {landing.billingAnnual ? 'translate-x-5' : 'translate-x-0'}"></span>
      </button>
      <span class="text-sm font-medium {landing.billingAnnual ? 'text-foreground' : 'text-muted-foreground'}">Anual</span>
      {#if !landing.billingAnnual}
        <Badge variant="primary">Economize até 20%</Badge>
      {/if}
    </div>
  {/if}

  <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 items-start pricing-grid">
    {#each plans as plan}
      <div class="pricing-card-wrapper {plan.highlight ? 'highlight' : ''}">
        {#if customCard}
          {@render customCard(plan, { annual: landing.billingAnnual, format: formatCurrency })}
        {:else}
          <Card variant="glass" padding class="pricing-card-inner transition-all {plan.highlight ? 'pricing-highlight' : ''} {plan.highlight ? 'scale-[1.03] sm:scale-[1.05]' : 'hover:scale-[1.02] hover:shadow-xl'}">
            {#snippet children()}
              <div class="flex flex-col gap-6 pt-2 pricing-content">
                {#if plan.highlight}
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div class="inline-flex items-center rounded-full border border-primary/30 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
                      {plan.badge ?? 'Mais escolhido'}
                    </div>
                  </div>
                {/if}
                <div class="text-center pricing-name">
                  <p class="text-sm font-bold uppercase tracking-widest {plan.highlight ? 'text-primary' : 'text-muted-foreground'}">{plan.name}</p>
                </div>
                <div class="text-center pricing-price">
                  {#if landing.billingAnnual}
                    <p class="text-5xl font-extrabold text-foreground sm:text-6xl">{formatCurrency(plan.annual)}</p>
                    <p class="text-sm text-muted-foreground">por ano <span class="text-xs text-primary font-medium">(economize R$ {(plan.monthly * 12 - plan.annual).toLocaleString(locale)})</span></p>
                  {:else}
                    <p class="text-5xl font-extrabold text-foreground sm:text-6xl">{formatCurrency(plan.monthly)}</p>
                    <p class="text-sm text-muted-foreground">por mês</p>
                  {/if}
                </div>
                <ul class="space-y-3 pricing-features">
                  {#each plan.features as feature}
                    <li class="flex items-start gap-2 text-sm text-foreground">
                      {#if customFeature}
                        {@render customFeature(feature, plan)}
                      {:else}
                        <Check size={16} class="mt-0.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      {/if}
                    </li>
                  {/each}
                </ul>
                <div class="mt-auto pt-4 pricing-cta">
                  <Button variant={plan.cta.variant === 'primary' ? 'primary' : 'outline'} fullWidth href={plan.cta.href}>{plan.cta.label}</Button>
                </div>
              </div>
            {/snippet}
          </Card>
        {/if}
      </div>
    {/each}
  </div>
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}

<style>
  :global(.pricing-grid) {
    display: grid;
    grid-template-rows: 1fr;
  }

  :global(.pricing-content) {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 1.5rem;
  }

  @supports (grid-template-rows: subgrid) {
    :global(.pricing-grid) {
      grid-template-rows: repeat(3, auto auto 1fr auto);
    }

    :global(.pricing-card-wrapper) {
      display: grid;
      grid-row: span 4;
      grid-template-rows: subgrid;
    }

    :global(.pricing-card-inner) {
      height: 100%;
    }

    :global(.pricing-content) {
      display: contents;
    }

    :global(.pricing-name),
    :global(.pricing-price),
    :global(.pricing-features),
    :global(.pricing-cta) {
      grid-row: auto / span 1;
    }
  }

  :global(.pricing-card-inner) {
    border-radius: 1.25rem;
    position: relative;
  }

  :global(.pricing-highlight) {
    box-shadow: 0 0 30px oklch(0.55 0.18 240 / 0.15);
  }

  :global(.pricing-grid:has(.highlight) .pricing-card-wrapper:not(.highlight)) {
    opacity: 0.85;
    transition: opacity 0.3s;
  }

  :global(.pricing-grid:has(.highlight) .pricing-card-wrapper:not(.highlight):hover) {
    opacity: 1;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/PricingTable.svelte
git commit -m "feat: add PricingTable component"
```

---

## Task 10: Create Testimonial.svelte

**Files:**
- Create: `src/components/landing/Testimonial.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
    avatarFallback?: string;
    children?: Snippet;
  }

  let {
    quote,
    author,
    role,
    avatar,
    avatarFallback,
    children,
  }: Props = $props();

  const initials = $derived(
    avatarFallback ?? author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  );
</script>

<div class="mx-auto max-w-2xl text-center px-6 py-12 section-reveal">
  <div class="mb-6 flex justify-center">
    {#if avatar}
      <img
        src={avatar}
        alt={author}
        class="h-16 w-16 rounded-full border-2 border-primary/30 object-cover"
      />
    {:else}
      <div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-lg font-bold text-primary">
        {initials}
      </div>
    {/if}
  </div>
  <blockquote class="text-xl italic text-foreground leading-relaxed">
    &ldquo;{quote}&rdquo;
  </blockquote>
  <div class="mt-6">
    <p class="font-bold text-foreground">{author}</p>
    {#if role}
      <p class="text-sm text-muted-foreground">{role}</p>
    {/if}
  </div>
  {#if children}
    <div class="mt-6">
      {@render children()}
    </div>
  {/if}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/Testimonial.svelte
git commit -m "feat: add Testimonial component"
```

---

## Task 11: Create FAQ.svelte

**Files:**
- Create: `src/components/landing/FAQ.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Accordion, AccordionItem } from 'bindrunes';

  interface FAQItem {
    question: string;
    answer: string;
  }

  interface Props {
    items: FAQItem[];
    defaultOpen?: string;
    children?: Snippet;
  }

  let { items, defaultOpen, children }: Props = $props();

  const openValue = $state(defaultOpen ? [defaultOpen] : [] as string[]);
</script>

<div class="mx-auto max-w-3xl px-6 py-12 section-reveal">
  <Accordion bind:value={openValue}>
    {#each items as item}
      <AccordionItem value={item.question}>
        {#snippet trigger()}
          <span class="text-foreground font-medium">{item.question}</span>
        {/snippet}
        {#snippet children()}
          <p class="text-muted-foreground leading-relaxed">{item.answer}</p>
        {/snippet}
      </AccordionItem>
    {/each}
  </Accordion>
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/FAQ.svelte
git commit -m "feat: add FAQ component"
```

---

## Task 12: Create FinalCTA.svelte

**Files:**
- Create: `src/components/landing/FinalCTA.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';
  import { Button } from 'bindrunes';

  interface CTA {
    label: string;
    href: string;
    variant?: 'primary' | 'outline';
    icon?: Component;
  }

  interface Props {
    title: string;
    description?: string;
    ctas: CTA[];
    footnote?: { title: string; description: string };
    background?: 'gradient' | 'solid' | 'none';
    children?: Snippet;
  }

  let {
    title,
    description,
    ctas,
    footnote,
    background = 'gradient',
    children,
  }: Props = $props();
</script>

<section
  class="final-cta-section relative overflow-hidden px-6 py-16 sm:py-24 section-reveal"
  class:cta-gradient={background === 'gradient'}
>
  {#if background === 'gradient'}
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
  {/if}
  <div class="mx-auto max-w-4xl text-center relative">
    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
      {title}
    </h2>
    {#if description}
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    {/if}
    {#if ctas.length > 0}
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {#each ctas as cta}
          <Button
            variant={cta.variant ?? 'primary'}
            size="lg"
            href={cta.href}
            class="shadow-xl px-8 py-4 font-semibold"
          >
            {cta.label}
            {#if cta.icon}
              <cta.icon size={18} />
            {/if}
          </Button>
        {/each}
      </div>
    {/if}
    {#if footnote}
      <p class="mt-6 text-xs text-muted-foreground">
        <strong>{footnote.title}</strong> {footnote.description}
      </p>
    {/if}
    {#if children}
      <div class="mt-8">
        {@render children()}
      </div>
    {/if}
  </div>
</section>

<style>
  :global(.final-cta-section.cta-gradient) {
    background:
      radial-gradient(ellipse at 20% 50%, oklch(0.55 0.18 240 / 0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 50%, oklch(0.55 0.15 150 / 0.04) 0%, transparent 60%);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/FinalCTA.svelte
git commit -m "feat: add FinalCTA component"
```

---

## Task 13: Create SiteFooter.svelte

**Files:**
- Create: `src/components/landing/SiteFooter.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';

  interface FooterLink {
    label: string;
    href: string;
  }

  interface Props {
    logo?: { label: string; icon?: Component };
    links?: FooterLink[];
    copyright?: string;
    bottomLinks?: FooterLink[];
    children?: Snippet;
  }

  let {
    logo,
    links = [],
    copyright,
    bottomLinks = [],
    children,
  }: Props = $props();

  const year = new Date().getFullYear();
</script>

<footer class="border-t border-border px-6 py-12">
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
      {#if logo}
        <div class="flex items-center gap-2">
          {#if logo.icon}
            <logo.icon size={22} class="text-primary" />
          {/if}
          <span class="text-lg font-bold text-foreground">{logo.label}</span>
        </div>
      {/if}
      {#if links.length > 0}
        <nav class="flex flex-wrap items-center justify-center gap-6">
          {#each links as link}
            <a
              href={link.href}
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          {/each}
        </nav>
      {/if}
    </div>
    <div class="mt-8 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
      <p class="text-xs text-muted-foreground">
        {copyright ?? `\u00a9 ${year}. Todos os direitos reservados.`}
      </p>
      {#if bottomLinks.length > 0}
        <nav class="flex flex-wrap items-center gap-4">
          {#each bottomLinks as link}
            <a
              href={link.href}
              class="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          {/each}
        </nav>
      {/if}
    </div>
    {#if children}
      <div class="mt-8">
        {@render children()}
      </div>
    {/if}
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/SiteFooter.svelte
git commit -m "feat: add SiteFooter component"
```

---

## Task 14: Create LandingNav.svelte

**Files:**
- Create: `src/components/landing/LandingNav.svelte`

- [ ] **Step 1: Create the component**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Button, ThemeToggle } from 'bindrunes';
  import { Menu, X } from 'lucide-svelte';
  import { useLanding } from './landing-context.svelte';

  interface NavLogo {
    href: string;
    label: string;
    icon?: any;
  }

  interface NavLink {
    label: string;
    href: string;
  }

  interface NavCTA {
    label: string;
    href: string;
    variant?: 'primary' | 'outline';
  }

  interface Props {
    logo?: NavLogo;
    links: NavLink[];
    cta?: NavCTA;
    sectionIds?: string[];
    children?: any;
  }

  let { logo, links, cta, sectionIds = [], children }: Props = $props();

  const landing = useLanding();

  let observers: IntersectionObserver[] = [];

  onMount(() => {
    observers = sectionIds
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              landing.activeSection = id;
            }
          },
          { rootMargin: '-40% 0px -45% 0px' },
        );
        observer.observe(el);
        return observer;
      })
      .filter(Boolean) as IntersectionObserver[];

    return () => observers.forEach((o) => o.disconnect());
  });
</script>

<nav class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
  <div class="progress-bar"></div>
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
    {#if logo}
      <a href={logo.href} class="flex items-center gap-2 no-underline">
        {#if logo.icon}
          <logo.icon size={22} class="text-primary" />
        {/if}
        <span class="text-lg font-bold text-foreground">{logo.label}</span>
      </a>
    {:else}
      <div></div>
    {/if}

    <div class="hidden items-center gap-6 md:flex">
      {#each links as link}
        <a
          href={link.href}
          class="text-sm font-medium transition-colors no-underline hover:text-foreground {landing.activeSection === link.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground'}"
        >
          {link.label}
        </a>
      {/each}
    </div>

    <div class="flex items-center gap-2">
      <div class="hidden sm:block">
        <ThemeToggle variant="icon" />
      </div>
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
        onclick={() => (landing.menuOpen = !landing.menuOpen)}
        aria-label="Menu"
      >
        {#if landing.menuOpen}
          <X size={20} class="text-foreground" />
        {:else}
          <Menu size={20} class="text-foreground" />
        {/if}
      </button>
      {#if cta}
        <Button variant={cta.variant ?? 'primary'} href={cta.href} class="text-sm">
          {cta.label}
        </Button>
      {/if}
    </div>
  </div>

  {#if landing.menuOpen}
    <div transition:slide={{ duration: 200 }} class="border-t border-border bg-background/95 backdrop-blur-lg px-6 py-5 md:hidden">
      <div class="flex flex-col gap-5">
        {#each links as link}
          <a
            href={link.href}
            class="text-left text-base font-medium no-underline transition-colors hover:text-foreground {landing.activeSection === link.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground'}"
            onclick={() => (landing.menuOpen = false)}
          >
            {link.label}
          </a>
        {/each}
        <div class="border-t border-border pt-4">
          <div class="flex items-center gap-3">
            <ThemeToggle variant="icon" />
            <span class="text-sm text-muted-foreground">Alternar tema</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</nav>

<style>
  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: oklch(0.55 0.18 240);
    transform-origin: left;
    scale: 0 1;
    animation: progress linear;
    animation-timeline: scroll(root);
  }

  @supports not (animation-timeline: scroll()) {
    .progress-bar {
      display: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/LandingNav.svelte
git commit -m "feat: add LandingNav component"
```

---

## Task 15: Create Barrel Exports

**Files:**
- Create: `src/components/landing/index.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Create the landing barrel file**

```ts
export { default as LandingNav } from './LandingNav.svelte';
export { default as HeroSection } from './HeroSection.svelte';
export { default as MetricsBar } from './MetricsBar.svelte';
export { default as HowItWorks } from './HowItWorks.svelte';
export { default as FeatureGrid } from './FeatureGrid.svelte';
export { default as PricingTable } from './PricingTable.svelte';
export { default as Testimonial } from './Testimonial.svelte';
export { default as FAQ } from './FAQ.svelte';
export { default as FinalCTA } from './FinalCTA.svelte';
export { default as SiteFooter } from './SiteFooter.svelte';
export { createLandingState, useLanding } from './landing-context.svelte';
export type { LandingState } from './landing-context.svelte';
```

- [ ] **Step 2: Add landing re-exports to main index.ts**

Add at the end of `src/index.ts`:

```ts
// ── Landing ──
export {
  LandingNav,
  HeroSection,
  MetricsBar,
  HowItWorks,
  FeatureGrid,
  PricingTable,
  Testimonial,
  FAQ,
  FinalCTA,
  SiteFooter,
  createLandingState,
  useLanding,
} from './components/landing/index.ts';
export type { LandingState } from './components/landing/index.ts';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/index.ts src/index.ts
git commit -m "feat: add landing component barrel exports"
```

---

## Task 16: Update package.json Exports

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add new export paths**

In `package.json`, add these entries to the `"exports"` object:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./landing": {
      "types": "./dist/components/landing/index.d.ts",
      "svelte": "./dist/components/landing/index.js",
      "default": "./dist/components/landing/index.js"
    },
    "./tailwind": {
      "types": "./dist/tailwind-plugin.d.ts",
      "default": "./dist/tailwind-plugin.js"
    },
    "./styles/*": "./src/styles/*",
    "./actions/*": "./dist/actions/*",
    "./utils/*": "./dist/utils/*",
    "./components/*": "./dist/components/*",
    "./i18n/*": "./dist/i18n/*"
  }
}
```

- [ ] **Step 2: Add landing.css to files array**

Update the `"files"` array:

```json
{
  "files": [
    "dist",
    "src/styles",
    "README.md"
  ]
}
```

No change needed — `src/styles` already covers `landing.css`.

- [ ] **Step 3: Build and verify**

Run: `bun run build`
Expected: Build succeeds. Verify `dist/components/landing/` exists with all files. Verify `dist/tailwind-plugin.js` and `dist/tailwind-plugin.d.ts` exist.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "feat: add landing and tailwind export paths"
```

---

## Task 17: Create Example App

**Files:**
- Create: `examples/landing/` (full SvelteKit app)

- [ ] **Step 1: Scaffold SvelteKit app**

Run from repo root:
```bash
cd /home/ale/Projects/bindrunes
bunx sv create examples/landing --template minimal --types ts --no-add-ons
```

- [ ] **Step 2: Configure package.json**

Replace `examples/landing/package.json` with:

```json
{
  "name": "bindrunes-landing-example",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bindrunes": "workspace:*",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte": "^5.0.0",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^7.0.0",
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

- [ ] **Step 3: Configure vite.config.ts**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['bindrunes'],
  },
});
```

- [ ] **Step 4: Create app.css**

```css
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/landing.css";
```

- [ ] **Step 5: Create +layout.svelte**

```svelte
<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

{@render children()}
```

- [ ] **Step 6: Create +page.svelte**

```svelte
<script lang="ts">
  import {
    createLandingState,
    LandingNav,
    HeroSection,
    MetricsBar,
    HowItWorks,
    FeatureGrid,
    PricingTable,
    Testimonial,
    FAQ,
    FinalCTA,
    SiteFooter,
  } from 'bindrunes/landing';
  import { ArrowRight, Zap, Shield, Clock, CheckCircle } from 'lucide-svelte';

  const landing = createLandingState();

  const navLinks = [
    { label: 'Recursos', href: '#features' },
    { label: 'Como funciona', href: '#how-it-works' },
    { label: 'Planos', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const metrics = [
    { value: '10k+', label: 'Usuários ativos', variant: 'default' as const },
    { value: '99.9%', label: 'Uptime', variant: 'success' as const },
    { value: '4.9/5', label: 'Satisfação', variant: 'warning' as const },
  ];

  const steps = [
    { icon: Zap, title: 'Cadastre-se', description: 'Crie sua conta em segundos.' },
    { icon: Shield, title: 'Configure', description: 'Defina suas preferências.' },
    { icon: Clock, title: 'Automatize', description: 'Deixe a IA trabalhar por você.' },
    { icon: CheckCircle, title: 'Resultados', description: 'Acompanhe suas métricas.' },
  ];

  const features = [
    { icon: Zap, title: 'Rápido', description: 'Processamento em tempo real.' },
    { icon: Shield, title: 'Seguro', description: 'Dados protegidos e criptografados.' },
    { icon: Clock, title: 'Automático', description: 'Reduza tarefas manuais.' },
    { icon: CheckCircle, title: 'Confiável', description: '99.9% de uptime garantido.' },
    { icon: Zap, title: 'Escalável', description: 'Cresça sem limites.' },
    { icon: Shield, title: 'Integrável', description: 'API completa e documentada.' },
  ];

  const plans = [
    {
      name: 'Starter',
      monthly: 97,
      annual: 931,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      cta: { label: 'Começar', variant: 'outline' as const, href: '/signup' },
    },
    {
      name: 'Pro',
      monthly: 197,
      annual: 1891,
      highlight: true,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
      cta: { label: 'Começar trial', variant: 'primary' as const, href: '/signup' },
    },
    {
      name: 'Enterprise',
      monthly: 497,
      annual: 4771,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6'],
      cta: { label: 'Falar com vendas', variant: 'outline' as const, href: '/contact' },
    },
  ];

  const faqItems = [
    { question: 'O que é?', answer: 'Uma plataforma incrível.' },
    { question: 'Como funciona?', answer: 'É simples e intuitivo.' },
    { question: 'Tem trial?', answer: 'Sim, 7 dias grátis.' },
  ];
</script>

<div class="landing-page">
  <LandingNav
    logo={{ href: '/', label: 'Minha SaaS' }}
    links={navLinks}
    cta={{ label: 'Começar', href: '/signup' }}
    sectionIds={['features', 'how-it-works', 'pricing', 'faq']}
  />

  <HeroSection
    badge="Nova versão disponível"
    title="Título <br />da Landing Page"
    titleGradient
    description="Uma descrição incrível do seu produto."
    ctas={[
      { label: 'Começar agora', href: '/signup', icon: ArrowRight },
      { label: 'Saiba mais', href: '#features', variant: 'outline' },
    ]}
  />

  <section id="metrics" class="px-6 py-16 section-reveal">
    <MetricsBar {metrics} />
  </section>

  <section id="features" class="px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Recursos</h2>
      <div class="mt-10">
        <FeatureGrid {features} />
      </div>
    </div>
  </section>

  <section id="how-it-works" class="px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Como funciona</h2>
      <div class="mt-10">
        <HowItWorks {steps} />
      </div>
    </div>
  </section>

  <section id="pricing" class="border-t border-border px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Planos</h2>
      <PricingTable {plans} />
    </div>
  </section>

  <section class="px-6 py-16 section-reveal">
    <Testimonial
      quote="Este produto mudou a forma como trabalhamos."
      author="Maria Silva"
      role="CEO da Empresa"
    />
  </section>

  <section id="faq" class="border-t border-border px-6 py-16 section-reveal">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-3xl font-extrabold">Perguntas frequentes</h2>
      <FAQ items={faqItems} />
    </div>
  </section>

  <FinalCTA
    title="Pronto para começar?"
    description="Junte-se a milhares de usuários satisfeitos."
    ctas={[{ label: 'Começar agora', href: '/signup', icon: ArrowRight }]}
  />

  <SiteFooter
    logo={{ label: 'Minha SaaS' }}
    links={[
      { label: 'Sobre', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contato', href: '/contact' },
    ]}
    bottomLinks={[
      { label: 'Termos', href: '/terms' },
      { label: 'Privacidade', href: '/privacy' },
    ]}
  />
</div>
```

- [ ] **Step 7: Install dependencies and verify build**

```bash
cd /home/ale/Projects/bindrunes/examples/landing
bun install
bun run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 8: Commit**

```bash
git add examples/landing
git commit -m "feat: add landing page example app"
```

---

## Task 18: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add landing page section to README**

Add a new section after the existing content:

```markdown
## Landing Pages

bindrunes provides pre-built landing page components for B2B SaaS products.

### Setup

```css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/landing.css";
```

### Usage

```svelte
<script lang="ts">
  import {
    createLandingState,
    LandingNav,
    HeroSection,
    MetricsBar,
    HowItWorks,
    FeatureGrid,
    PricingTable,
    Testimonial,
    FAQ,
    FinalCTA,
    SiteFooter,
  } from 'bindrunes/landing';

  const landing = createLandingState();
</script>

<div class="landing-page">
  <LandingNav
    logo={{ href: '/', label: 'My SaaS' }}
    links={[{ label: 'Features', href: '#features' }]}
    cta={{ label: 'Get Started', href: '/signup' }}
    sectionIds={['features']}
  />
  <HeroSection
    title="My SaaS Title"
    description="The best product ever."
    ctas={[{ label: 'Get Started', href: '/signup' }]}
  />
  <!-- ...more sections... -->
  <SiteFooter logo={{ label: 'My SaaS' }} />
</div>
```

### Components

| Component | Description |
|-----------|-------------|
| `LandingNav` | Sticky nav with scroll progress, mobile menu, theme toggle |
| `HeroSection` | Hero with gradient background, badge, CTAs |
| `MetricsBar` | Responsive metric cards grid |
| `HowItWorks` | Numbered steps with connector line |
| `FeatureGrid` | Feature cards (card/minimal variants) |
| `PricingTable` | Pricing with monthly/annual toggle, subgrid alignment |
| `Testimonial` | Centered testimonial with avatar |
| `FAQ` | Accordion-based FAQ section |
| `FinalCTA` | Final call-to-action with gradient background |
| `SiteFooter` | Site footer with links |

### Customization

All components accept snippets for custom rendering:

```svelte
<PricingTable {plans}>
  {#snippet customCard(plan, { annual, format })}
    <!-- Your custom plan card -->
  {/snippet}
</PricingTable>
```

### CSS

Import `bindrunes/styles/landing.css` for animations and text-wrap utilities.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add landing page documentation"
```

---

## Verification

- [ ] **Step 1: Full build**

Run: `bun run build`
Expected: All files compile to `dist/` without errors.

- [ ] **Step 2: Type check**

Run: `bun run check`
Expected: No TypeScript errors.

- [ ] **Step 3: Tests pass**

Run: `bun run test`
Expected: All existing tests pass (landing components don't need unit tests — they're pure presentational).

- [ ] **Step 4: Example app builds**

Run: `cd examples/landing && bun install && bun run build`
Expected: Build succeeds.

- [ ] **Step 5: Lint**

Run: `bun run lint`
Expected: No lint errors.
