<script lang="ts">
import { X } from "lucide-svelte";
import type { Snippet } from "svelte";

type Variant =
	| "default"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "destructive"
	| "info"
	| "outline";

type Size = "sm" | "md" | "lg";

let {
	variant = "default" as Variant,
	size = "md" as Size,
	removable = false,
	onRemove = undefined as (() => void) | undefined,
	icon,
	children,
	...restProps
}: {
	variant?: Variant;
	size?: Size;
	removable?: boolean;
	onRemove?: () => void;
	icon?: Snippet;
	children?: Snippet;
} = $props();

const variantClasses: Record<Variant, string> = {
	default: "bg-muted text-muted-foreground",
	primary: "bg-primary text-primary-foreground",
	secondary: "bg-secondary text-secondary-foreground",
	success: "bg-success-soft text-success",
	warning: "bg-warning-soft text-warning",
	destructive: "bg-destructive-soft text-destructive",
	info: "bg-info-soft text-info",
	outline: "border border-border text-muted-foreground",
};

const sizeClasses: Record<Size, string> = {
	sm: "px-2 py-0.5 text-mono-xs",
	md: "px-2.5 py-0.5 text-label-sm",
	lg: "px-3 py-1 text-label-md",
};
</script>

<span
  data-variant={variant}
  data-size={size}
  class="inline-flex items-center gap-1 rounded-full font-medium
         transition-colors duration-[--duration-snappy]
         {variantClasses[variant]} {sizeClasses[size]}"
   {...restProps}
 >
  {#if icon}
    <span class="shrink-0">{@render icon()}</span>
  {/if}
  {@render children?.()}
  {#if removable}
    <button
      type="button"
      class="shrink-0 rounded-full p-0.5 hover:bg-foreground/10 transition-colors cursor-pointer -mr-1"
      onclick={() => onRemove?.()}
      aria-label="Remove"
    >
      <X class="h-3 w-3" />
    </button>
  {/if}
</span>
