<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';
  import { getGridClass } from './landing-utils';

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

  const variantColors: Record<string, string> = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
  };
</script>

<div class="grid {getGridClass(columns)} gap-6">
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
