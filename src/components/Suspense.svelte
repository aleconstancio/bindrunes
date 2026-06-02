<script lang="ts">
  import EmptyState from './EmptyState.svelte';
  import Button from './Button.svelte';

  type DataState<T> = { status: 'loading' } | { status: 'empty' } | { status: 'error'; error: Error } | { status: 'loaded'; data: T };
  type TFunction = (key: string, params?: Record<string, string | number>) => string;

  let {
    t = undefined as TFunction | undefined,
    state = { status: 'loading' as const } as DataState<any>,
    loadingContent,
    empty,
    error,
    children,
  }: {
    t?: TFunction;
    state?: DataState<any>;
    loadingContent?: import('svelte').Snippet;
    empty?: import('svelte').Snippet;
    error?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();

  function retry() { window.location.reload(); }
</script>

{#if state.status === 'loading'}
  {#if loadingContent}
    {@render loadingContent()}
  {:else}
    <div class="flex justify-center py-12">
      <span class="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  {/if}
{:else if state.status === 'empty'}
  {#if empty}
    {@render empty()}
  {:else}
    <EmptyState>
      {#snippet action()}<Button onclick={retry}>{t?.('common.reload') ?? 'Recarregar'}</Button>{/snippet}
    </EmptyState>
  {/if}
{:else if state.status === 'error'}
  {#if error}
    {@render error()}
  {:else}
    <EmptyState>
      {#snippet action()}<Button onclick={retry}>{t?.('common.reload') ?? 'Recarregar'}</Button>{/snippet}
    </EmptyState>
  {/if}
{:else}
  {@render children?.()}
{/if}
