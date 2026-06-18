<script lang="ts">
import { Dialog } from "bits-ui";
import type { Snippet } from "svelte";

type SheetSize = "sm" | "md" | "lg";

let {
	open = $bindable(false),
	side = "right" as "left" | "right" | "top" | "bottom",
	size = "md" as SheetSize,
	title = undefined as string | undefined,
	ariaLabel = undefined as string | undefined,
	class: className = "",
	header,
	footer,
	children,
}: {
	open?: boolean;
	side?: "left" | "right" | "top" | "bottom";
	size?: SheetSize;
	title?: string;
	ariaLabel?: string;
	class?: string;
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();

const sideSizeMap: Record<SheetSize, Record<string, string>> = {
	sm: {
		left: "h-full w-72 max-w-[90vw]",
		right: "h-full w-72 max-w-[90vw]",
		top: "w-full h-48 max-h-[80vh]",
		bottom: "w-full h-48 max-h-[80vh]",
	},
	md: {
		left: "h-full w-96 max-w-[90vw]",
		right: "h-full w-96 max-w-[90vw]",
		top: "w-full h-80 max-h-[80vh]",
		bottom: "w-full h-80 max-h-[80vh]",
	},
	lg: {
		left: "h-full w-[32rem] max-w-[90vw]",
		right: "h-full w-[32rem] max-w-[90vw]",
		top: "w-full h-96 max-h-[90vh]",
		bottom: "w-full h-96 max-h-[90vh]",
	},
};

const positionStyles: Record<string, string> = {
	left: "inset-y-0 left-0 border-r",
	right: "inset-y-0 right-0 border-l",
	top: "inset-x-0 top-0 border-b",
	bottom: "inset-x-0 bottom-0 border-t",
};
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-sm
             data-[state=open]:bindrunes-fade-in data-[state=closed]:bindrunes-fade-out"
    />
    <Dialog.Content
      aria-label={ariaLabel}
      class="fixed z-[--z-overlay,30] bg-background border-border flex flex-col bindrunes-sheet-{side} {positionStyles[side]} {sideSizeMap[size][side]} {className}
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
            class="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none"
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

<style>
  :global(.bindrunes-fade-in) {
    animation: bindrunes-sheet-fade-in var(--duration-fluid) ease-out forwards;
  }
  :global(.bindrunes-fade-out) {
    animation: bindrunes-sheet-fade-out var(--duration-snappy) ease-in forwards;
  }

  :global([data-state="open"].bindrunes-sheet-left) {
    animation: bindrunes-sheet-slide-in-left var(--duration-fluid) ease-out forwards;
  }
  :global([data-state="closed"].bindrunes-sheet-left) {
    animation: bindrunes-sheet-slide-out-left var(--duration-snappy) ease-in forwards;
  }

  :global([data-state="open"].bindrunes-sheet-right) {
    animation: bindrunes-sheet-slide-in-right var(--duration-fluid) ease-out forwards;
  }
  :global([data-state="closed"].bindrunes-sheet-right) {
    animation: bindrunes-sheet-slide-out-right var(--duration-snappy) ease-in forwards;
  }

  :global([data-state="open"].bindrunes-sheet-top) {
    animation: bindrunes-sheet-slide-in-top var(--duration-fluid) ease-out forwards;
  }
  :global([data-state="closed"].bindrunes-sheet-top) {
    animation: bindrunes-sheet-slide-out-top var(--duration-snappy) ease-in forwards;
  }

  :global([data-state="open"].bindrunes-sheet-bottom) {
    animation: bindrunes-sheet-slide-in-bottom var(--duration-fluid) ease-out forwards;
  }
  :global([data-state="closed"].bindrunes-sheet-bottom) {
    animation: bindrunes-sheet-slide-out-bottom var(--duration-snappy) ease-in forwards;
  }

  @keyframes bindrunes-sheet-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes bindrunes-sheet-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes bindrunes-sheet-slide-in-left {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes bindrunes-sheet-slide-out-left {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }

  @keyframes bindrunes-sheet-slide-in-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes bindrunes-sheet-slide-out-right {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }

  @keyframes bindrunes-sheet-slide-in-top {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  @keyframes bindrunes-sheet-slide-out-top {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
  }

  @keyframes bindrunes-sheet-slide-in-bottom {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes bindrunes-sheet-slide-out-bottom {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }
</style>
