<script lang="ts">
  import { Button as BitsButton } from 'bits-ui';

  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  type Size = 'sm' | 'md' | 'lg';

  let {
    variant = 'primary' as Variant,
    size = 'md' as Size,
    fullWidth = false,
    disabled = false,
    loading = false,
    type = 'button' as string,
    href = undefined as string | undefined,
    onclick = undefined as ((e: MouseEvent) => void) | undefined,
    class: className = '',
    style = undefined as string | undefined,
    children,
  }: {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    type?: string;
    href?: string;
    onclick?: (e: MouseEvent) => void;
    class?: string;
    style?: string;
    children?: import('svelte').Snippet;
  } = $props();

  const vars: Record<Variant, string> = {
    primary: 'thoth-btn thoth-btn-primary',
    secondary: 'thoth-btn thoth-btn-secondary text-secondary-foreground',
    outline: 'thoth-btn thoth-btn-outline border border-border text-foreground bg-transparent',
    ghost: 'thoth-btn thoth-btn-ghost text-foreground bg-transparent hover:bg-accent',
    destructive: 'thoth-btn thoth-btn-destructive',
  };

  const sz: Record<Size, string> = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  };
</script>

{#if href}
  <a
    {href}
    {style}
    class="inline-flex items-center justify-center rounded-[--radius,0.625rem] font-medium
           transition-all duration-[--duration-snappy,150ms]
           disabled:pointer-events-none disabled:opacity-50
           {vars[variant]} {sz[size]} {className}"
    class:w-full={fullWidth}
    data-loading={loading || undefined}
  >
    {#if loading}
      <span class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1.5"></span>
    {/if}
    {@render children?.()}
  </a>
{:else}
  <BitsButton.Root
    {type}
    {disabled}
    {style}
    onclick={loading ? undefined : onclick}
    class="inline-flex items-center justify-center rounded-[--radius,0.625rem] font-medium
           transition-all duration-[--duration-snappy,150ms] cursor-pointer
           disabled:pointer-events-none disabled:opacity-50
           {vars[variant]} {sz[size]} {fullWidth ? 'w-full' : ''} {className}"
    data-loading={loading || undefined}
  >
    {#if loading}
      <span class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1.5"></span>
    {/if}
    {@render children?.()}
  </BitsButton.Root>
{/if}

<style>
  :global(.thoth-btn) {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: 
      border-color var(--duration-fluid, 250ms), 
      box-shadow var(--duration-fluid, 250ms), 
      transform var(--duration-snappy, 150ms), 
      background-color var(--duration-snappy, 150ms) !important;
  }
  :global(.thoth-btn:hover) {
    transform: translateY(-1px) !important;
  }
  :global(.thoth-btn:active) {
    transform: translateY(0) scale(0.975) !important;
  }
  :global(.thoth-btn-primary) {
    background: linear-gradient(135deg, var(--primary) 0%, oklch(from var(--primary) calc(l - 0.08) c h) 100%) !important;
    color: var(--primary-foreground) !important;
    box-shadow: 0 4px 12px -3px oklch(from var(--primary) l c h / 0.15);
    border: 1px solid oklch(from var(--primary) l c h / 0.1) !important;
  }
  :global(.thoth-btn-primary:hover) {
    box-shadow: 
      0 6px 16px -3px oklch(from var(--primary) l c h / 0.25),
      0 0 10px -2px oklch(from var(--primary) l c h / 0.15) !important;
    opacity: 0.95 !important;
  }
  :global(.thoth-btn-secondary) {
    background-color: var(--secondary) !important;
    border: 1px solid var(--border) !important;
    box-shadow: 0 2px 6px -2px oklch(0 0 0 / 0.2);
  }
  :global(.thoth-btn-secondary:hover) {
    background-color: oklch(from var(--secondary) l c h / 1.5) !important;
    border-color: oklch(from var(--primary) l c h / 0.15) !important;
  }
  :global(.thoth-btn-outline:hover) {
    border-color: oklch(from var(--primary) l c h / 0.22) !important;
    background-color: oklch(from var(--primary) l c h / 0.03) !important;
  }
  :global(.thoth-btn-destructive) {
    background: linear-gradient(135deg, var(--destructive) 0%, oklch(from var(--destructive) calc(l - 0.08) c h) 100%) !important;
    color: var(--destructive-foreground) !important;
    box-shadow: 0 4px 12px -3px oklch(from var(--destructive) l c h / 0.15);
    border: 1px solid oklch(from var(--destructive) l c h / 0.1) !important;
  }
  :global(.thoth-btn-destructive:hover) {
    box-shadow: 
      0 6px 16px -3px oklch(from var(--destructive) l c h / 0.25),
      0 0 10px -2px oklch(from var(--destructive) l c h / 0.1) !important;
    opacity: 0.95 !important;
  }
</style>
