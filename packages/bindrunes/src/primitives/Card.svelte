<script lang="ts">
import type { Snippet } from "svelte";

type Variant = "surface" | "glass" | "tinted" | "outlined" | "ghost";

let {
	variant = "surface" as Variant,
	interactive = false,
	padding = true,
	responsive = false,
	href = undefined as string | undefined,
	ariaLabel = undefined as string | undefined,
	onclick = undefined as ((e: MouseEvent) => void) | undefined,
	header,
	children,
	footer,
	class: className = "",
	...restProps
}: {
	variant?: Variant;
	interactive?: boolean;
	padding?: boolean;
	responsive?: boolean;
	href?: string;
	ariaLabel?: string;
	onclick?: (e: MouseEvent) => void;
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;
	class?: string;
} = $props();

const vars: Record<Variant, string> = {
	surface: "bg-card text-card-foreground shadow-[--shadow-sm] border border-border",
	glass:
		"bg-[--glass-surface] text-card-foreground border border-[--glass-border] backdrop-blur-[--blur-heavy,16px]",
	tinted: "bg-[--surface-2] text-card-foreground shadow-[--shadow-sm] border border-border/50",
	outlined: "bg-transparent border border-border",
	ghost: "bg-transparent",
};
</script>

{#if href}
  <a
    {href}
    aria-label={interactive ? ariaLabel : undefined}
    class="block rounded-[--radius,0.5rem] transition-all duration-[--duration-fluid]
           {vars[variant]} {padding ? 'p-[--card-padding,1rem]' : ''}
           {interactive ? 'bindrunes-card-interactive' : ''}
           {responsive ? 'container-queries' : ''}
           {className}"
    {...restProps}
  >
    {#if header}<div class="mb-2">{@render header()}</div>{/if}
    {#if children}<div>{@render children()}</div>{/if}
    {#if footer}<div class="mt-2 pt-2 border-t border-border">{@render footer()}</div>{/if}
  </a>
{:else}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="rounded-[--radius,0.5rem] transition-all duration-[--duration-fluid]
           {vars[variant]} {padding ? 'p-[--card-padding,1rem]' : ''}
           {interactive ? 'bindrunes-card-interactive' : ''}
           {responsive ? 'container-queries' : ''}
           {className}"
    role={interactive ? 'button' : undefined}
    aria-label={interactive ? ariaLabel : undefined}
    tabindex={interactive ? 0 : undefined}
    onclick={interactive ? onclick : undefined}
    onkeydown={interactive ? (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onclick?.(e as unknown as MouseEvent); } : undefined}
    {...restProps}
  >
    {#if header}<div class="mb-2">{@render header()}</div>{/if}
    {#if children}<div>{@render children()}</div>{/if}
    {#if footer}<div class="mt-2 pt-2 border-t border-border">{@render footer()}</div>{/if}
  </div>
{/if}

<style>
  :global(.bindrunes-card-interactive) {
    cursor: pointer;
    transition: border-color var(--duration-fluid), box-shadow var(--duration-fluid), transform var(--duration-fluid);
  }
  :global(.bindrunes-card-interactive:hover) {
    border-color: oklch(from var(--primary) l c h / 0.22);
    box-shadow: var(--shadow-emphasis-resolved, var(--shadow-lg));
    transform: translateY(-2px);
  }
  :global(.bindrunes-card-interactive:active) {
    transform: translateY(0) scale(0.99);
    box-shadow: var(--shadow-sm);
  }
</style>
