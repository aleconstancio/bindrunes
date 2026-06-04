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
