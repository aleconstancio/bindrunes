<script lang="ts">
import { Badge, Button } from "bindrunes";
import type { Component, Snippet } from "svelte";
import MetaContainer from "../MetaContainer.svelte";
import type { CTA } from "./landing-types";

interface Props {
	badge?: string;
	title: Snippet;
	titleGradient?: boolean;
	description?: string;
	ctas?: CTA[];
	footnote?: { title: string; description: string };
	background?: "gradient" | "solid" | "none";
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
	background = "gradient",
	level = 1,
	class: className = "",
	children,
}: Props = $props();

const tag = $derived(level === 1 ? "h1" : "h2");
</script>

<section
  class="hero-banner relative overflow-hidden px-6 py-12 sm:py-24 section-reveal {className}"
  class:hero-gradient={background === 'gradient'}
>
  {#if background === 'gradient'}
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
  {/if}
  <MetaContainer size="lg" padding={false} class="text-center relative">
    {#if badge}
      <div class="mb-6 flex justify-center">
        <Badge variant="primary">{badge}</Badge>
      </div>
    {/if}
    {#if level === 1}
      <h1
        class="text-display-2 sm:text-display-1 md:text-display-1"
        class:text-gradient-violet={titleGradient}
      >
        {@render title()}
      </h1>
    {:else}
      <h2
        class="text-display-3 sm:text-display-2 md:text-display-1"
        class:text-gradient-violet={titleGradient}
      >
        {@render title()}
      </h2>
    {/if}
    {#if description}
      <p class="mx-auto mt-6 max-w-2xl text-body-lg text-muted-foreground">
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
              {#if typeof cta.icon === 'string'}
                <span class="text-body-md">{cta.icon}</span>
              {:else}
                {@const Icon = cta.icon}
                <Icon size={18} />
              {/if}
            {/if}
          </Button>
        {/each}
      </div>
    {/if}
    {#if footnote}
      <p class="mt-6 text-body-sm text-muted-foreground">
        <strong>{footnote.title}</strong> {footnote.description}
      </p>
    {/if}
    {#if children}
      <div class="mt-8">
        {@render children()}
      </div>
    {/if}
  </MetaContainer>
</section>

<style>
  :global(.hero-banner.hero-gradient) {
    background:
      radial-gradient(ellipse at 20% 50%, oklch(from var(--primary) l c h / 0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 50%, oklch(from var(--success, oklch(0.55 0.15 150)) l c h / 0.04) 0%, transparent 60%);
  }
</style>
