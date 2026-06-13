<script lang="ts">
import { X } from "lucide-svelte";
import type { Snippet } from "svelte";
import Button from "../../Button.svelte";

let {
	open = $bindable(true),
	position = "bottom" as "top" | "bottom",
	text = "",
	ctaLabel = "",
	ctaHref = "",
	onDismiss = undefined as (() => void) | undefined,
	children,
	class: className = "",
}: {
	open?: boolean;
	position?: "top" | "bottom";
	text?: string;
	ctaLabel?: string;
	ctaHref?: string;
	onDismiss?: () => void;
	children?: Snippet;
	class?: string;
} = $props();

function _dismiss() {
	open = false;
	onDismiss?.();
}
</script>

{#if open}
  <div
    class="fixed inset-x-0 z-[--z-overlay,30] border-b border-border bg-background px-6 py-3 transition-all duration-[--duration-fluid] {position === 'top' ? 'top-0' : 'bottom-0 border-b-0 border-t'} {className}"
    role="status"
  >
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between gap-4">
      <div class="flex items-center gap-4 flex-1 min-w-0">
        {#if children}
          {@render children()}
        {:else}
          <p class="text-body-sm text-foreground truncate">{text}</p>
        {/if}
      </div>
      <div class="flex items-center gap-3 flex-shrink-0">
        {#if ctaLabel && ctaHref}
          <Button size="sm" href={ctaHref}>{ctaLabel}</Button>
        {/if}
        <button
          type="button"
          class="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
          onclick={_dismiss}
          aria-label="Dismiss"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
{/if}
