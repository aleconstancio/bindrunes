<script lang="ts">
  type Type = 'table' | 'cards' | 'form' | 'text';
  type TFunction = (key: string, params?: Record<string, string | number>) => string;

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
        <div class="h-4 flex-1 rounded bg-muted animate-pulse" />
      {/each}
    </div>
    {#each Array(rows) as _, r}
      <div class="flex gap-4 py-3" style="border-bottom: 1px solid var(--border)">
        {#each Array(4) as _, c}
          <div class="h-4 flex-1 rounded" style="background: var(--muted); animation: thoth-shimmer 1.5s ease-in-out infinite; animation-delay: {(r * 4 + c) * 0.05}s" />
        {/each}
      </div>
    {/each}
  </div>
{:else if type === 'cards'}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="status" aria-label={t?.('common.loading') ?? 'Carregando'}>
    {#each Array(rows) as _, r}
      <div class="rounded-[--radius] border p-4" style="border-color: var(--border)">
        <div class="h-4 w-1/3 rounded bg-muted animate-pulse mb-3" />
        <div class="h-6 w-2/3 rounded bg-muted animate-pulse mb-2" />
        <div class="h-3 w-full rounded bg-muted animate-pulse" />
      </div>
    {/each}
  </div>
{:else if type === 'form'}
  <div class="space-y-4" role="status" aria-label={t?.('common.loading') ?? 'Carregando'}>
    {#each Array(lines) as _, f}
      <div>
        <div class="h-3 w-1/4 rounded bg-muted animate-pulse mb-1.5" />
        <div class="h-10 w-full rounded bg-muted animate-pulse" />
      </div>
    {/each}
    <div class="h-10 w-1/3 rounded bg-muted animate-pulse mt-2" />
  </div>
{:else}
  <div class="space-y-2" role="status" aria-label={t?.('common.loading') ?? 'Carregando'}>
    {#each Array(lines) as _, l}
      <div class="h-4 rounded" style="width: {60 + Math.random() * 40}%; background: var(--muted); animation: thoth-shimmer 1.5s ease-in-out infinite; animation-delay: {l * 0.15}s" />
    {/each}
  </div>
{/if}
