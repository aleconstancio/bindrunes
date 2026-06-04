<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Component } from 'svelte';
  import { Badge, Button } from 'bindrunes';
  import type { CTA } from './landing-types';

  interface Props {
    badge?: string;
    title: string;
    titleGradient?: boolean;
    description?: string;
    ctas?: CTA[];
    footnote?: { title: string; description: string };
    background?: 'gradient' | 'solid' | 'none';
    level?: 1 | 2;
    class?: string;
    children?: Snippet;
  }

  let {
    badge,
    title,
    titleGradient = false,
    description,
    ctas = [],
    footnote,
    background = 'gradient',
    level = 1,
    class: className = '',
    children,
  }: Props = $props();

  const tag = $derived(level === 1 ? 'h1' : 'h2');
</script>

<section
  class="hero-banner relative overflow-hidden px-6 py-12 sm:py-24 section-reveal {className}"
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
    {#if level === 1}
      <h1
        class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        class:text-gradient-violet={titleGradient}
      >
        {@html title}
      </h1>
    {:else}
      <h2
        class="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
        class:text-gradient-violet={titleGradient}
      >
        {@html title}
      </h2>
    {/if}
    {#if description}
      <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
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
  :global(.hero-banner.hero-gradient) {
    background:
      radial-gradient(ellipse at 20% 50%, oklch(from var(--primary) l c h / 0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 50%, oklch(from var(--success, oklch(0.55 0.15 150)) l c h / 0.04) 0%, transparent 60%);
  }
</style>
