<script lang="ts">
import { Dialog } from "bits-ui";
import type { Snippet } from "svelte";

let {
	open = $bindable(false),
	title = undefined as string | undefined,
	ariaLabel = undefined as string | undefined,
	size = "md" as "sm" | "md" | "lg" | "xl" | "full",
	closeOnOverlayClick = true,
	icon,
	header,
	footer,
	children,
	actions,
	...restProps
}: {
	open?: boolean;
	title?: string;
	ariaLabel?: string;
	size?: "sm" | "md" | "lg" | "xl" | "full";
	closeOnOverlayClick?: boolean;
	icon?: Snippet;
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
	actions?: Snippet;
	[key: string]: unknown;
} = $props();

const sizeClasses: Record<"sm" | "md" | "lg" | "xl" | "full", string> = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	full: "max-w-[90vw] max-h-[90vh]",
};

function handleOverlayClick() {
	if (closeOnOverlayClick) open = false;
}
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-[--blur-subtle]
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      onclick={handleOverlayClick}
    />
    <Dialog.Content
      aria-label={ariaLabel}
      class="fixed left-1/2 top-1/2 z-[--z-overlay,30] w-full {sizeClasses[size]} -translate-x-1/2 -translate-y-1/2
             rounded-[--radius,0.625rem] bg-card text-card-foreground border border-border p-6 shadow-[--shadow-lg]
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
             data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
             data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-48
             data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-48
             duration-[--duration-slow] contain-layout"
      {...restProps}
    >
      {#if header}
        <div class="mb-4">{@render header()}</div>
      {:else}
        {#if icon}
          <div class="mb-4 text-primary">
            {@render icon()}
          </div>
        {/if}

        {#if title}
          <Dialog.Title class="text-title-2 mb-4">{title}</Dialog.Title>
        {/if}
      {/if}

      {#if children}
        <div class="text-body-md text-muted-foreground">
          {@render children()}
        </div>
      {/if}

      {#if actions}
        <div class="mt-6 flex justify-end gap-3">
          {@render actions()}
        </div>
      {/if}

      {#if footer}
        <div class="mt-6 pt-4 border-t border-border">
          {@render footer()}
        </div>
      {/if}

      <Dialog.Close
        class="absolute right-4 top-4 p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Close"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M11.5 3.5l-7 7M3.5 3.5l7 7" />
        </svg>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
