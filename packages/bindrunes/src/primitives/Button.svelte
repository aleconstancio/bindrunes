<script lang="ts">
import { Button } from "bits-ui";
import type { Snippet } from "svelte";

const BitsButton = Button;

type Variant =
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "destructive"
	| "link"
	| "soft"
	| "subtle";
type Size = "sm" | "md" | "lg";

let {
	variant = "primary" as Variant,
	size = "md" as Size,
	fullWidth = false,
	disabled = false,
	loading = false,
	iconOnly = false,
	type = "button" as "button" | "submit" | "reset",
	href = undefined as string | undefined,
	ariaLabel = undefined as string | undefined,
	onclick = undefined as ((e: MouseEvent) => void) | undefined,
	class: className = "",
	style = undefined as string | undefined,
	children,
	...restProps
}: {
	variant?: Variant;
	size?: Size;
	fullWidth?: boolean;
	disabled?: boolean;
	loading?: boolean;
	iconOnly?: boolean;
	type?: "button" | "submit" | "reset";
	href?: string;
	ariaLabel?: string;
	onclick?: (e: MouseEvent) => void;
	class?: string;
	style?: string;
	children?: Snippet;
} = $props();

const base =
	"inline-flex items-center justify-center rounded-[--radius,0.5rem] font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
	primary:
		"btn-primary text-primary-foreground border border-border-subtle shadow-[--shadow-emphasis-resolved,var(--shadow-md)] hover:shadow-lg hover:opacity-95 active:scale-[0.975]",
	secondary:
		"bg-secondary text-secondary-foreground border border-border-subtle shadow-xs hover:brightness-150 hover:border-border-strong active:scale-[0.975]",
	outline:
		"border border-border text-foreground bg-transparent hover:border-ring hover:bg-primary/[0.03] active:scale-[0.975]",
	ghost: "text-foreground bg-transparent hover:bg-accent active:scale-[0.975]",
	destructive:
		"btn-destructive text-destructive-foreground border border-border-subtle shadow-[--shadow-emphasis-resolved,var(--shadow-md)] hover:shadow-glow-destructive hover:opacity-95 active:scale-[0.975]",
	link: "text-primary underline-offset-4 hover:underline bg-transparent p-0 h-auto active:scale-[0.975]",
	soft: "bg-primary/10 text-primary border border-transparent hover:bg-primary/20 active:scale-[0.975]",
	subtle:
		"bg-muted text-muted-foreground border border-transparent hover:bg-muted/80 hover:text-foreground active:scale-[0.975]",
};

const sizeClasses: Record<Size, string> = {
	sm: "h-8 px-3 text-label-sm gap-1.5",
	md: "h-10 px-4 text-label-md gap-2",
	lg: "h-12 px-6 text-body-lg gap-2.5",
};
</script>

<style>
  .bindrunes-btn-transition {
    transition-property: color, background-color, border-color, box-shadow, opacity;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
    transition-duration: var(--duration-snappy);
  }
  .btn-primary {
    background-color: var(--button-bg, var(--primary));
  }
  .btn-destructive {
    background-color: var(--button-bg-destructive, var(--destructive));
  }
</style>

{#if href}
  <a
    {href}
    aria-label={ariaLabel}
    class="{base} {variantClasses[variant]} {sizeClasses[size]} {iconOnly ? 'px-0 aspect-square' : ''} bindrunes-btn-transition {className}"
    class:w-full={fullWidth}
    data-loading={loading || undefined}
    style={style || undefined}
    {...restProps}
  >
    {#if loading}
      <span class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-[--radius-pill] {iconOnly ? '' : 'mr-1.5'}"></span>
    {/if}
    {@render children?.()}
  </a>
{:else}
  <BitsButton.Root
    {type}
    {disabled}
    aria-label={ariaLabel}
    onclick={loading ? undefined : onclick}
    class="{base} {variantClasses[variant]} {sizeClasses[size]} {fullWidth ? 'w-full' : ''} {iconOnly ? 'px-0 aspect-square' : ''} bindrunes-btn-transition {className}"
    data-loading={loading || undefined}
    style={style || undefined}
    {...restProps}
  >
    {#if loading}
      <span class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-[--radius-pill] {iconOnly ? '' : 'mr-1.5'}"></span>
    {/if}
    {@render children?.()}
  </BitsButton.Root>
{/if}
