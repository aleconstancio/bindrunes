<script lang="ts">
  import type { TFunction } from '../shared-types';

  type Type = 'table' | 'cards' | 'form' | 'text';

  let {
    t = undefined as TFunction | undefined,
    type = 'text' as Type,
    lines = 1,
    rows = 1,
  }: {
    t?: TFunction;
    type?: Type;
    lines?: number;
    rows?: number;
  } = $props();
</script>

{#if type === 'table'}
  <div class="space-y-2" role="status" aria-label={t?.('common.loading') ?? 'Carregando'}>
    <div class="flex gap-4 mb-4">
      {#each Array(4) as _, c}
        <div class="h-4 flex-1 rounded bg-muted animate-pulse"></div>
      {/each}
    </div>
    {#each Array(rows) as _, r}
      <div class="flex gap-4 py-3 border-b border-border">
        {#each Array(4) as _, c}
          <div class="h-4 flex-1 rounded bg-muted" style="animation: bindrunes-shimmer 1.5s var(--ease-standard, ease-in-out) infinite; animation-delay: {(r * 4 + c) * 0.05}s"></div>
        {/each}
      </div>
    {/each}
  </div>
{:else if type === 'cards'}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="status" aria-label={t?.('common.loading') ?? 'Carregando'}>
    {#each Array(rows) as _, r}
      <div class="rounded-[--radius] border border-border p-4">
        <div class="h-4 w-1/3 rounded bg-muted animate-pulse mb-3"></div>
        <div class="h-6 w-2/3 rounded bg-muted animate-pulse mb-2"></div>
        <div class="h-3 w-full rounded bg-muted animate-pulse"></div>
      </div>
    {/each}
  </div>
{:else if type === 'form'}
  <div class="space-y-4" role="status" aria-label={t?.('common.loading') ?? 'Carregando'}>
    {#each Array(lines) as _, f}
      <div>
        <div class="h-3 w-1/4 rounded bg-muted animate-pulse mb-1.5"></div>
        <div class="h-10 w-full rounded bg-muted animate-pulse"></div>
      </div>
    {/each}
    <div class="h-10 w-1/3 rounded bg-muted animate-pulse mt-2"></div>
  </div>
{:else}
  <div class="space-y-2" role="status" aria-label={t?.('common.loading') ?? 'Carregando'}>
    {#each Array(lines) as _, l}
      <div class="h-4 rounded bg-muted" style="width: {60 + Math.random() * 40}%; animation: bindrunes-shimmer 1.5s var(--ease-standard, ease-in-out) infinite; animation-delay: {l * 0.15}s"></div>
    {/each}
  </div>
{/if}
