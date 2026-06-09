<script lang="ts">
type Variant = "info" | "success" | "warning" | "destructive";

let {
	variant = "info" as Variant,
	title = "",
	description = "",
	icon,
	action,
}: {
	variant?: Variant;
	title?: string;
	description?: string;
	icon?: import("svelte").Snippet;
	action?: import("svelte").Snippet;
} = $props();

const vars: Record<Variant, string> = {
	info: "border-l-info",
	success: "border-l-[--success]",
	warning: "border-l-[--warning]",
	destructive: "border-l-destructive",
};
</script>

<div class="rounded-[--radius] border border-border border-l-4 bg-card p-4 {vars[variant]}">
  <div class="flex items-start gap-3">
    {#if icon}
      <div class="mt-0.5 text-muted-foreground">{@render icon()}</div>
    {/if}
    <div class="flex-1 min-w-0">
      <p class="text-label-md font-semibold text-foreground">{title}</p>
      {#if description}
        <p class="text-body-sm text-muted-foreground mt-0.5">{description}</p>
      {/if}
    </div>
    {#if action}
      <div class="flex-shrink-0">{@render action()}</div>
    {/if}
  </div>
</div>
