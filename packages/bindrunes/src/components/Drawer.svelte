<script lang="ts">
import { Dialog } from "bits-ui";
import type { Snippet } from "svelte";

let {
	open = $bindable(false),
	side = "bottom" as "left" | "right" | "top" | "bottom",
	title = undefined as string | undefined,
	ariaLabel = undefined as string | undefined,
	class: className = "",
	header,
	footer,
	children,
	closeOnOverlayClick = true,
}: {
	open?: boolean;
	side?: "left" | "right" | "top" | "bottom";
	title?: string;
	ariaLabel?: string;
	class?: string;
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
	closeOnOverlayClick?: boolean;
} = $props();

const sideClassMap: Record<string, string> = {
	left: "inset-y-0 left-0 w-full max-w-sm border-r",
	right: "inset-y-0 right-0 w-full max-w-sm border-l",
	top: "inset-x-0 top-0 h-auto max-h-[80vh] border-b",
	bottom: "inset-x-0 bottom-0 h-auto max-h-[80vh] border-t",
};

function handleOverlayClick() {
	if (closeOnOverlayClick) open = false;
}
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-sm
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      onclick={handleOverlayClick}
    />
    <Dialog.Content
      aria-label={ariaLabel}
      class="fixed z-[--z-overlay,30] bg-background border-border flex flex-col
             {sideClassMap[side]}
             {className}
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
             data-[state=closed]:slide-out-to-{side} data-[state=open]:slide-in-from-{side}
             duration-[--duration-fluid]
             focus:outline-none"
    >
      {#if header || title}
        <div class="flex items-center justify-between p-4 border-b border-border">
          {#if header}
            {@render header()}
          {:else if title}
            <Dialog.Title class="text-title-2 text-foreground">{title}</Dialog.Title>
          {/if}
          <Dialog.Close
            class="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11.5 3.5l-7 7M3.5 3.5l7 7" />
            </svg>
          </Dialog.Close>
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
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
