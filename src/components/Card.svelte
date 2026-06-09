<script lang="ts">
  type Variant = 'surface' | 'glass' | 'outlined' | 'ghost';

  let {
    variant = 'surface' as Variant,
    interactive = false,
    padding = true,
    href = undefined as string | undefined,
    ariaLabel = undefined as string | undefined,
    onclick = undefined as ((e: MouseEvent) => void) | undefined,
    header,
    children,
    footer,
    class: className = '',
  }: {
    variant?: Variant;
    interactive?: boolean;
    padding?: boolean;
    href?: string;
    ariaLabel?: string;
    onclick?: (e: MouseEvent) => void;
    header?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
    class?: string;
  } = $props();

  const vars: Record<Variant, string> = {
    surface: 'bg-card text-card-foreground shadow-sm border border-border',
    glass: 'bg-[--glass-surface] text-card-foreground border border-[--glass-border] backdrop-blur-[--glass-blur,16px]',
    outlined: 'bg-transparent border border-border',
    ghost: 'bg-transparent',
  };
</script>

{#if href}
  <a
    {href}
    aria-label={interactive ? ariaLabel : undefined}
    class="block rounded-[--radius,0.5rem] transition-all duration-[--duration-fluid,250ms]
           {vars[variant]} {padding ? 'p-[--radius,0.5rem]' : ''}
           {interactive ? 'card-interactive' : ''}
           {className}"
  >
    {#if header}<div class="mb-2">{@render header()}</div>{/if}
    {#if children}<div>{@render children()}</div>{/if}
    {#if footer}<div class="mt-2 pt-2 border-t border-border">{@render footer()}</div>{/if}
  </a>
{:else}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="rounded-[--radius,0.5rem] transition-all duration-[--duration-fluid,250ms]
           {vars[variant]} {padding ? 'p-[--radius,0.5rem]' : ''}
           {interactive ? 'card-interactive' : ''}
           {className}"
    role={interactive ? 'button' : undefined}
    aria-label={interactive ? ariaLabel : undefined}
    tabindex={interactive ? 0 : undefined}
    onclick={interactive ? onclick : undefined}
    onkeydown={interactive ? (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onclick?.(e as unknown as MouseEvent); } : undefined}
  >
    {#if header}<div class="mb-2">{@render header()}</div>{/if}
    {#if children}<div>{@render children()}</div>{/if}
    {#if footer}<div class="mt-2 pt-2 border-t border-border">{@render footer()}</div>{/if}
  </div>
{/if}

<style>
  :global(.card-interactive.card-interactive) {
    cursor: pointer;
    transition: border-color var(--duration-fluid, 250ms), box-shadow var(--duration-fluid, 250ms), transform var(--duration-fluid, 250ms);
  }
  :global(.card-interactive.card-interactive:hover) {
    border-color: oklch(from var(--primary) l c h / 0.22);
    box-shadow: 
      0 12px 22px -8px oklch(from var(--primary) l c h / 0.08),
      0 0 12px -3px oklch(from var(--primary) l c h / 0.04);
    transform: translateY(-2px);
  }
  :global(.card-interactive.card-interactive:active) {
    transform: translateY(0) scale(0.99);
    box-shadow: 0 4px 10px -4px oklch(from var(--primary) l c h / 0.04);
  }
</style>
