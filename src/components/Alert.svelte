<script lang="ts">
import { X } from "lucide-svelte";
import type { Snippet } from "svelte";

type Variant = "info" | "success" | "warning" | "destructive";

let {
	variant = "info" as Variant,
	title = "",
	description = "",
	closable = false,
	onclose = undefined as (() => void) | undefined,
	icon,
	action,
}: {
	variant?: Variant;
	title?: string;
	description?: string;
	closable?: boolean;
	onclose?: () => void;
	icon?: Snippet;
	action?: Snippet;
} = $props();

const borderColors: Record<Variant, string> = {
	info: "border-l-[--info]",
	success: "border-l-[--success]",
	warning: "border-l-[--warning]",
	destructive: "border-l-[--destructive]",
};
</script>

<div data-variant={variant} class="rounded-[--radius] border border-border border-l-4 bg-card p-4 {borderColors[variant]}">
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
    <div class="flex items-center gap-2 flex-shrink-0">
      {#if action}
        {@render action()}
      {/if}
      {#if closable}
        <button
          type="button"
          class="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          onclick={() => onclose?.()}
          aria-label="Dismiss"
        >
          <X class="h-4 w-4" />
        </button>
      {/if}
    </div>
  </div>
</div>
