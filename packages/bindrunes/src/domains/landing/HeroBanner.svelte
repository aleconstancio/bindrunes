<script lang="ts">
import type { Snippet } from "svelte";
import DynamicIcon from "../../layouts/DynamicIcon.svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import Badge from "../../primitives/Badge.svelte";
import Button from "../../primitives/Button.svelte";
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

const _tag = $derived(level === 1 ? "h1" : "h2");
</script>

<section
  class="hero-banner relative overflow-hidden px-6 py-12 sm:py-24 section-reveal {className}"
  class:hero-gradient={background === 'gradient'}
>
  {#if background === 'gradient'}
    <div class="pointer-events-none absolute inset-0 bg-gradient-hero"></div>
  {/if}
  <MetaContainer size="lg" padding={false} class="text-center relative">
    {#if badge}
      <div class="mb-6 flex justify-center">
        <Badge variant="primary">{badge}</Badge>
      </div>
    {/if}
    {#if level === 1}
      <h1
        class="font-display text-display-2 sm:text-display-2 md:text-display-1"
        class:text-gradient-violet={titleGradient}
      >
        {@render title()}
      </h1>
    {:else}
      <h2
        class="font-display text-display-3 sm:text-display-2 md:text-display-1"
        class:text-gradient-violet={titleGradient}
      >
        {@render title()}
      </h2>
    {/if}
    {#if description}
      <p class="mx-auto mt-6 max-w-[var(--container-lg)] text-body-lg text-muted-foreground">
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
            <DynamicIcon icon={cta.icon} size={18} />
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
    background: var(--gradient-hero);
  }
</style>
