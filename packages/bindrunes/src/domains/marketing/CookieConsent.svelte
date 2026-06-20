<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../primitives/Button.svelte";

let {
	visible = $bindable(true),
	message = "We use cookies to improve your experience. By continuing, you agree to our use of cookies.",
	acceptLabel = "Accept all",
	rejectLabel = "Reject all",
	customizeLabel = "Customize",
	onAccept = undefined as (() => void) | undefined,
	onReject = undefined as (() => void) | undefined,
	onCustomize = undefined as (() => void) | undefined,
	class: className = "",
}: {
	visible?: boolean;
	message?: string;
	acceptLabel?: string;
	rejectLabel?: string;
	customizeLabel?: string;
	onAccept?: () => void;
	onReject?: () => void;
	onCustomize?: () => void;
	class?: string;
} = $props();

function handleAccept() {
	visible = false;
	onAccept?.();
}

function handleReject() {
	visible = false;
	onReject?.();
}
</script>

{#if visible}
  <div
    class="fixed bottom-0 inset-x-0 z-[--z-overlay,30] bg-card border-t border-border p-4 shadow-lg
           animate-in slide-in-from-bottom duration-[--duration-fluid] {className}"
    role="dialog"
    aria-label="Cookie consent"
  >
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <p class="text-body-sm text-muted-foreground flex-1">{message}</p>
      <div class="flex items-center gap-2 shrink-0">
        {#if onCustomize}
          <Button variant="ghost" size="sm" onclick={onCustomize}>{customizeLabel}</Button>
        {/if}
        <Button variant="ghost" size="sm" onclick={handleReject}>{rejectLabel}</Button>
        <Button size="sm" onclick={handleAccept}>{acceptLabel}</Button>
      </div>
    </div>
  </div>
{/if}
