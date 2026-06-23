<script lang="ts">
import type { Component, Snippet } from "svelte";

interface Logo {
	label: string;
	icon?: Component;
	href?: string;
}

interface Props {
	title?: string;
	logos: Logo[];
	children?: Snippet;
	class?: string;
}

let { title, logos, children, class: className = "" }: Props = $props();
</script>

<div class="px-6 py-12 section-reveal {className}">
  {#if title}
    <p class="text-center text-label-md uppercase tracking-[--text-letter-spacing-widest] text-muted-foreground mb-8">
      {title}
    </p>
  {/if}
  <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
    {#each logos as logo}
      {#if logo.href}
        <a
          href={logo.href}
          class="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={logo.label}
        >
          {#if logo.icon}
            <logo.icon size={24} />
          {:else}
            <span class="text-title-2">{logo.label}</span>
          {/if}
        </a>
      {:else}
        <div class="flex items-center gap-2 text-muted-foreground" aria-label={logo.label}>
          {#if logo.icon}
            <logo.icon size={24} />
          {:else}
            <span class="text-title-2">{logo.label}</span>
          {/if}
        </div>
      {/if}
    {/each}
  </div>

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</div>
