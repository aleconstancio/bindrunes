<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';

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

  const gridClass = $derived(
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  );

  const variantColors: Record<string, string> = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
  };
</script>

<div class="grid {gridClass} gap-6">
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
