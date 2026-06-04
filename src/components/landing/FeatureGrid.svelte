<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';
  import { getGridClass } from './landing-utils';

  import type { Feature } from './landing-types';

  interface Props {
    features: Feature[];
    columns?: 1 | 2 | 3;
    variant?: 'card' | 'minimal';
    children?: Snippet;
    class?: string;
  }

  let { features, columns = 3, variant = 'card', children, class: className = '' }: Props = $props();

</script>

<div class="grid {getGridClass(columns)} gap-6 {className}">
  {#each features as feature}
    {#if variant === 'card'}
      <Card variant="glass" padding class="transition-all hover:scale-[1.02] hover:shadow-xl">
        {#snippet children()}
          <div class="flex flex-col gap-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {#if typeof feature.icon === 'string'}
                <span class="text-title-1">{feature.icon}</span>
              {:else}
                {@const Icon = feature.icon}
                <Icon size={20} />
              {/if}
            </div>
            <h3 class="text-title-2 font-bold text-foreground">{feature.title}</h3>
            <p class="text-body-md text-muted-foreground">{feature.description}</p>
          </div>
        {/snippet}
      </Card>
    {:else}
      <div class="flex gap-4">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {#if typeof feature.icon === 'string'}
            <span class="text-title-1">{feature.icon}</span>
          {:else}
            {@const Icon = feature.icon}
            <Icon size={20} />
          {/if}
        </div>
        <div>
          <h3 class="text-title-2 font-bold text-foreground">{feature.title}</h3>
          <p class="mt-1 text-body-md text-muted-foreground">{feature.description}</p>
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
