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
