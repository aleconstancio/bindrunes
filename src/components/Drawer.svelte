<script lang="ts">
import type { Snippet } from "svelte";

let {
	open = $bindable(false),
	side = "bottom" as "left" | "right" | "top" | "bottom",
	title = undefined as string | undefined,
	class: className = "",
	header,
	footer,
	children,
	closeOnOverlayClick = true,
}: {
	open?: boolean;
	side?: "left" | "right" | "top" | "bottom";
	title?: string;
	class?: string;
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
	closeOnOverlayClick?: boolean;
} = $props();

function handleOverlayClick() {
	if (closeOnOverlayClick) open = false;
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape") open = false;
}
</script>

{#if open}
  <div
    class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-sm animate-in fade-in-0 duration-[--duration-fluid]"
    onclick={handleOverlayClick}
    onkeydown={handleKeydown}
    role="button"
    tabindex="-1"
    aria-label="Close drawer"
  ></div>

  <div
    class="fixed z-[--z-overlay,30] bg-background border-border flex flex-col
           {side === 'left' ? 'inset-y-0 left-0 w-full max-w-sm border-r' : ''}
           {side === 'right' ? 'inset-y-0 right-0 w-full max-w-sm border-l' : ''}
           {side === 'top' ? 'inset-x-0 top-0 h-auto max-h-[80vh] border-b' : ''}
           {side === 'bottom' ? 'inset-x-0 bottom-0 h-auto max-h-[80vh] border-t rounded-t-[--radius]' : ''}
           {className}
           animate-in slide-in-from-{side === 'left' ? 'left' : side === 'right' ? 'right' : side === 'top' ? 'top' : 'bottom'} duration-[--duration-fluid]"
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    {#if header || title}
      <div class="flex items-center justify-between p-4 border-b border-border">
        {#if header}
          {@render header()}
        {:else if title}
          <h2 class="text-title-2 text-foreground">{title}</h2>
        {/if}
        <button
          type="button"
          class="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          onclick={() => open = false}
          aria-label="Close"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M11.5 3.5l-7 7M3.5 3.5l7 7" />
          </svg>
        </button>
      </div>
    {/if}

    <div class="flex-1 overflow-y-auto p-4">
      {@render children?.()}
    </div>

    {#if footer}
      <div class="p-4 border-t border-border">
        {@render footer()}
      </div>
    {/if}
  </div>
{/if}
