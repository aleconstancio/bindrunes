<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';
  import { getGridClass } from './landing-utils';

  import type { Metric } from './landing-types';

  interface Props {
    metrics: Metric[];
    columns?: 1 | 2 | 3;
    children?: Snippet;
    class?: string;
  }

  let { metrics, columns = 3, children, class: className = '' }: Props = $props();

  const variantColors: Record<string, string> = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
  };
</script>

<div class="grid {getGridClass(columns)} gap-6 {className}">
  {#each metrics as metric}
    <Card variant="glass" padding class="transition-all hover:scale-[1.02] hover:shadow-xl">
      {#snippet children()}
        <div class="text-center">
          <p class="text-display-2 {variantColors[metric.variant ?? 'default']}">
            {metric.value}
          </p>
          <p class="mt-2 text-label-md text-foreground">{metric.label}</p>
          {#if metric.description}
            <p class="mt-1 text-body-sm text-muted-foreground">{metric.description}</p>
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
