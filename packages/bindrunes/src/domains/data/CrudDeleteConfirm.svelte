<script lang="ts">
import Button from "../../primitives/Button.svelte";
import Dialog from "../../primitives/Dialog.svelte";

let {
	open = $bindable(false),
	title = "Confirm deletion",
	description = "Are you sure you want to delete this item? This action cannot be undone.",
	itemName = "",
	loading = false,
	onConfirm = undefined as (() => void | Promise<void>) | undefined,
	onCancel = undefined as (() => void) | undefined,
	confirmLabel = "Delete",
}: {
	open?: boolean;
	title?: string;
	description?: string;
	itemName?: string;
	loading?: boolean;
	onConfirm?: () => void | Promise<void>;
	onCancel?: () => void;
	confirmLabel?: string;
} = $props();

async function handleConfirm() {
	if (onConfirm) await onConfirm();
}

function handleCancel() {
	open = false;
	onCancel?.();
}
</script>

<Dialog bind:open {title}>
  {#snippet children()}
    <p class="text-body-md text-muted-foreground">
      {description}
      {#if itemName}
        <strong class="text-foreground"> "{itemName}"</strong>
      {/if}
    </p>
  {/snippet}

  {#snippet actions()}
    <Button variant="outline" onclick={handleCancel} disabled={loading}>Cancel</Button>
    <Button variant="destructive" onclick={handleConfirm} loading={loading}>{confirmLabel}</Button>
  {/snippet}
</Dialog>
