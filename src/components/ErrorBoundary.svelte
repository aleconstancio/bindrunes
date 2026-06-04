<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import Button from './Button.svelte';
  import type { TFunction } from '../shared-types';

  type Variant = 'default' | 'minimal' | 'page';

  let {
    t = undefined as TFunction | undefined,
    fallbackTitle = t?.('error.ErrorBoundary.title') ?? 'Something went wrong',
    fallbackDescription = t?.('error.ErrorBoundary.description') ?? 'An unexpected error occurred.',
    showRetry = true,
    showHome = false,
    homeUrl = '/',
    variant = 'default' as Variant,
    onError,
    onRetry,
    children,
  }: {
    t?: TFunction;
    fallbackTitle?: string;
    fallbackDescription?: string;
    showRetry?: boolean;
    showHome?: boolean;
    homeUrl?: string;
    variant?: Variant;
    onError?: (error: Error) => void;
    onRetry?: () => void;
    children?: import('svelte').Snippet;
  } = $props();

  let error = $state<Error | null>(null);
  let errorInfo = $state<string>('');

  onMount(() => {
    const handler = (event: ErrorEvent) => {
      error = event.error || new Error(event.message);
      errorInfo = event.message;
      onError?.(error);
      toast.error(fallbackTitle, { description: errorInfo.slice(0, 120) });
      event.preventDefault();
    };
    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  });

  function retry() {
    error = null;
    errorInfo = '';
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  }
</script>

{#if error}
  {#if variant === 'minimal'}
    <div class="flex items-center gap-3 p-4 rounded-[--radius] border border-destructive bg-destructive-soft">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p class="text-body-md text-foreground">{fallbackTitle}</p>
      {#if showRetry}
        <Button variant="ghost" size="sm" onclick={retry}>{t?.('common.reload') ?? 'Recarregar'}</Button>
      {/if}
    </div>
  {:else if variant === 'page'}
    <div class="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-background">
      <div class="flex flex-col items-center text-center max-w-md">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h1 class="text-headline-2 font-bold mt-6 text-foreground">{fallbackTitle}</h1>
        <p class="text-body-md mt-3 text-muted-foreground">{fallbackDescription}</p>
        <div class="flex gap-3 mt-8">
          {#if showRetry}
            <Button onclick={retry}>{t?.('common.reload') ?? 'Recarregar'}</Button>
          {/if}
          {#if showHome}
            <Button variant="secondary" href={homeUrl}>{t?.('error.ErrorBoundary.home') ?? 'Página Inicial'}</Button>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center p-8 text-center min-h-[40vh]">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h2 class="text-title-2 font-semibold mt-4 text-foreground">{fallbackTitle}</h2>
      <p class="text-body-md mt-2 max-w-md text-muted-foreground">{fallbackDescription}</p>
      <div class="flex gap-3 mt-6">
        {#if showRetry}
          <Button onclick={retry}>{t?.('common.reload') ?? 'Recarregar'}</Button>
        {/if}
        {#if showHome}
          <Button variant="secondary" href={homeUrl}>{t?.('error.ErrorBoundary.home') ?? 'Página Inicial'}</Button>
        {/if}
      </div>
    </div>
  {/if}
{:else}
  {@render children?.()}
{/if}
