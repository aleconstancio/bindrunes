<script lang="ts">
  type Variant = 'surface' | 'glass' | 'outlined' | 'ghost';

  let {
    variant = 'surface' as Variant,
    interactive = false,
    padding = true,
    href = undefined as string | undefined,
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
    onclick?: (e: MouseEvent) => void;
    header?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
    class?: string;
  } = $props();

  const vars: Record<Variant, string> = {
    surface: 'bg-card text-card-foreground shadow-sm border border-border',
    glass: 'bg-[--glass-surface,rgba(0,0,0,0.45)] text-card-foreground border border-[--glass-border,rgba(255,255,255,0.08)] backdrop-blur-[--glass-blur,16px]',
    outlined: 'bg-transparent border border-border',
    ghost: 'bg-transparent',
  };
</script>

{#if href}
  <a
    {href}
    class="block rounded-[--radius,0.625rem] transition-all duration-[--duration-fluid,250ms]
           {vars[variant]} {padding ? 'p-[--radius,0.625rem]' : ''}
           {interactive ? 'card-interactive' : ''}
           {className}"
  >
    {#if header}<div class="mb-2">{@render header()}</div>{/if}
    {#if children}<div>{@render children()}</div>{/if}
    {#if footer}<div class="mt-2 pt-2 border-t border-border">{@render footer()}</div>{/if}
  </a>
{:else}
  <div
    class="rounded-[--radius,0.625rem] transition-all duration-[--duration-fluid,250ms]
           {vars[variant]} {padding ? 'p-[--radius,0.625rem]' : ''}
           {interactive ? 'card-interactive' : ''}
           {className}"
    role={interactive ? 'button' : undefined}
    tabindex={interactive ? 0 : undefined}
    onclick={interactive ? onclick : undefined}
    onkeydown={interactive ? (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onclick?.(e as any); } : undefined}
  >
    {#if header}<div class="mb-2">{@render header()}</div>{/if}
    {#if children}<div>{@render children()}</div>{/if}
    {#if footer}<div class="mt-2 pt-2 border-t border-border">{@render footer()}</div>{/if}
  </div>
{/if}

<style>
  :global(.card-interactive) {
    cursor: pointer;
    transition: border-color var(--duration-fluid, 250ms), box-shadow var(--duration-fluid, 250ms), transform var(--duration-fluid, 250ms) !important;
  }
  :global(.card-interactive:hover) {
    border-color: oklch(from var(--primary) l c h / 0.22) !important;
    box-shadow: 
      0 12px 22px -8px oklch(from var(--primary) l c h / 0.08),
      0 0 12px -3px oklch(from var(--primary) l c h / 0.04) !important;
    transform: translateY(-2px) !important;
  }
  :global(.card-interactive:active) {
    transform: translateY(0) scale(0.99) !important;
    box-shadow: 0 4px 10px -4px oklch(from var(--primary) l c h / 0.04) !important;
  }
</style>
