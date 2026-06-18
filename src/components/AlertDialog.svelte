<script lang="ts">
import { AlertDialog } from "bits-ui";
import type { Snippet } from "svelte";
import Button from "./Button.svelte";

let {
	open = $bindable(false),
	title = "Are you sure?",
	description = undefined as string | undefined,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	destructive = false,
	onConfirm = undefined as (() => void) | undefined,
	onCancel = undefined as (() => void) | undefined,
	class: className = "",
	icon,
	children,
	actions,
}: {
	open?: boolean;
	title?: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
	onConfirm?: () => void;
	onCancel?: () => void;
	class?: string;
	icon?: Snippet;
	children?: Snippet;
	actions?: Snippet;
} = $props();

function handleConfirm() {
	open = false;
	onConfirm?.();
}

function handleCancel() {
	open = false;
	onCancel?.();
}
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Portal>
    <AlertDialog.Overlay
      class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-sm
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <AlertDialog.Content
      class="fixed left-1/2 top-1/2 z-[--z-overlay,30] w-full max-w-md -translate-x-1/2 -translate-y-1/2
             rounded-[--radius] bg-card p-6 shadow-[--shadow-lg] border border-border
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
             data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 {className}"
    >
      {#if icon}
        <div class="mb-4 text-primary">{@render icon()}</div>
      {/if}

      <AlertDialog.Title class="text-title-2 mb-2 text-foreground">{title}</AlertDialog.Title>

      {#if description}
        <AlertDialog.Description class="text-body-md text-muted-foreground">{description}</AlertDialog.Description>
      {/if}

      {#if children}
        <div class="mt-4">{@render children()}</div>
      {/if}

      <div class="mt-6 flex justify-end gap-3">
        {#if actions}
          {@render actions()}
        {:else}
          {#snippet cancelBtn(props)}
            <Button variant="ghost" size="sm" {...props} onclick={handleCancel}>{cancelLabel}</Button>
          {/snippet}
          {#snippet confirmBtn(props)}
            <Button variant={destructive ? 'destructive' : 'primary'} size="sm" {...props} onclick={handleConfirm}>{confirmLabel}</Button>
          {/snippet}
          <AlertDialog.Cancel asChild={cancelBtn} />
          <AlertDialog.Action asChild={confirmBtn} />
        {/if}
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
