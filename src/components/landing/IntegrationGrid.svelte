<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Component } from 'svelte';

  interface Integration {
    icon: Component;
    title: string;
    description: string;
    href?: string;
  }

  interface Props {
    title?: string;
    integrations: Integration[];
    columns?: 1 | 2 | 3;
    children?: Snippet;
  }

  let { title, integrations, columns = 3, children }: Props = $props();

  const gridClass = $derived(
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  );
</script>

<div class="px-6 py-12 section-reveal">
  {#if title}
    <h2 class="text-center text-3xl font-extrabold text-foreground mb-10">{title}</h2>
  {/if}
  <div class="grid {gridClass} gap-6">
    {#each integrations as integration}
      {#if integration.href}
        <a
          href={integration.href}
          class="flex items-start gap-4 rounded-[--radius] border border-border p-4 transition-all hover:scale-[1.02] hover:shadow-xl no-underline"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <integration.icon size={20} />
          </div>
          <div>
            <h3 class="text-sm font-bold text-foreground">{integration.title}</h3>
            <p class="mt-1 text-xs text-muted-foreground leading-relaxed">{integration.description}</p>
          </div>
        </a>
      {:else}
        <div class="flex items-start gap-4 rounded-[--radius] border border-border p-4">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <integration.icon size={20} />
          </div>
          <div>
            <h3 class="text-sm font-bold text-foreground">{integration.title}</h3>
            <p class="mt-1 text-xs text-muted-foreground leading-relaxed">{integration.description}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
