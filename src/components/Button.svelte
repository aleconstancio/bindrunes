<script lang="ts">
import { Button as BitsButton } from "bits-ui";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

let {
	variant = "primary" as Variant,
	size = "md" as Size,
	fullWidth = false,
	disabled = false,
	loading = false,
	type = "button" as string,
	href = undefined as string | undefined,
	ariaLabel = undefined as string | undefined,
	onclick = undefined as ((e: MouseEvent) => void) | undefined,
	class: className = "",
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
	ariaLabel?: string;
	onclick?: (e: MouseEvent) => void;
	class?: string;
	style?: string;
	children?: import("svelte").Snippet;
} = $props();

const vars: Record<Variant, string> = {
	primary: "btn btn-primary",
	secondary: "btn btn-secondary text-secondary-foreground",
	outline: "btn btn-outline border border-border text-foreground bg-transparent",
	ghost: "btn btn-ghost text-foreground bg-transparent hover:bg-accent",
	destructive: "btn btn-destructive",
};

const sz: Record<Size, string> = {
	sm: "h-8 px-3 text-label-sm gap-1.5",
	md: "h-10 px-4 text-label-md gap-2",
	lg: "h-12 px-6 text-body-lg gap-2.5",
};
</script>

{#if href}
  <a
    {href}
    {style}
    aria-label={ariaLabel}
    class="inline-flex items-center justify-center rounded-[--radius,0.5rem] font-medium
           transition-all duration-[--duration-snappy]
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
    aria-label={ariaLabel}
    onclick={loading ? undefined : onclick}
    class="inline-flex items-center justify-center rounded-[--radius,0.5rem] font-medium
           transition-all duration-[--duration-snappy] cursor-pointer
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
  a.btn,
  :global(button.btn) {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition:
      border-color var(--duration-fluid),
      box-shadow var(--duration-fluid),
      transform var(--duration-snappy),
      background-color var(--duration-snappy);
  }
  a.btn:hover,
  :global(button.btn:hover) {
    transform: translateY(-1px);
  }
  a.btn:active,
  :global(button.btn:active) {
    transform: translateY(0) scale(0.975);
  }
  a.btn-primary,
  :global(button.btn-primary) {
    background: var(--button-bg, var(--primary));
    color: var(--primary-foreground);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-subtle);
  }
  a.btn-primary:hover,
  :global(button.btn-primary:hover) {
    box-shadow: var(--shadow-lg);
    opacity: 0.95;
  }
  a.btn-secondary,
  :global(button.btn-secondary) {
    background-color: var(--secondary);
    border: 1px solid var(--border-subtle);
    box-shadow: var(--shadow-xs);
  }
  a.btn-secondary:hover,
  :global(button.btn-secondary:hover) {
    background-color: oklch(from var(--secondary) l c h / 1.5);
    border-color: var(--border-strong);
  }
  a.btn-outline:hover,
  :global(button.btn-outline:hover) {
    border-color: var(--ring);
    background-color: oklch(from var(--primary) l c h / 0.03);
  }
  a.btn-destructive,
  :global(button.btn-destructive) {
    background: var(--button-bg-destructive, var(--destructive));
    color: var(--destructive-foreground);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-subtle);
  }
  a.btn-destructive:hover,
  :global(button.btn-destructive:hover) {
    box-shadow: var(--shadow-glow-destructive);
    opacity: 0.95;
  }
</style>
