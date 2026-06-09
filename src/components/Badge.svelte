<script lang="ts">
type Variant =
	| "default"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "destructive"
	| "outline";

let {
	variant = "default" as Variant,
	children,
}: {
	variant?: Variant;
	children?: import("svelte").Snippet;
} = $props();

const vars: Record<Variant, string> = {
	default: "bg-muted text-muted-foreground",
	primary: "bg-primary text-primary-foreground",
	secondary: "bg-secondary text-secondary-foreground",
	success: "bg-success-soft text-success",
	warning: "bg-warning-soft text-warning",
	destructive: "bg-destructive-soft text-destructive",
	outline: "border border-border text-muted-foreground",
};
</script>

<span
  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-label-sm font-medium
         transition-colors duration-[--duration-snappy]
         {vars[variant]}"
>
  {@render children?.()}
</span>
