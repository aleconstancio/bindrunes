<script lang="ts">
import { AlertDialog as BitsAlertDialog } from "bits-ui";
import Button from "./Button.svelte";

let {
	title = "Are you sure?",
	description = undefined as string | undefined,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	destructive = false,
	onConfirm = undefined as (() => void) | undefined,
	onCancel = undefined as (() => void) | undefined,
	open = $bindable(false),
	class: className = "",
	trigger,
	children,
}: {
	title?: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
	onConfirm?: () => void;
	onCancel?: () => void;
	open?: boolean;
	class?: string;
	trigger?: import("svelte").Snippet;
	children?: import("svelte").Snippet;
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

<BitsAlertDialog.Root bind:open>
	<BitsAlertDialog.Trigger class="inline-flex">
		{@render trigger?.()}
	</BitsAlertDialog.Trigger>

	<BitsAlertDialog.Portal>
		<BitsAlertDialog.Overlay class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-sm duration-[--duration-slow] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
		<BitsAlertDialog.Content class="fixed left-1/2 top-1/2 z-[--z-overlay,30] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[--radius] bg-card p-6 shadow-lg border border-border duration-[--duration-slow] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 {className}">
			<BitsAlertDialog.Title class="text-title-2 mb-2 text-foreground">{title}</BitsAlertDialog.Title>
			{#if description}
				<BitsAlertDialog.Description class="text-body-md text-muted-foreground">{description}</BitsAlertDialog.Description>
			{/if}
			<div class="mt-6 flex justify-end gap-3">
				<BitsAlertDialog.Cancel asChild let:props>
					<Button variant="ghost" size="sm" {...props} onclick={handleCancel}>{cancelLabel}</Button>
				</BitsAlertDialog.Cancel>
				<BitsAlertDialog.Action asChild let:props>
					<Button variant={destructive ? 'destructive' : 'primary'} size="sm" {...props} onclick={handleConfirm}>{confirmLabel}</Button>
				</BitsAlertDialog.Action>
			</div>
			{#if children}
				{@render children()}
			{/if}
		</BitsAlertDialog.Content>
	</BitsAlertDialog.Portal>
</BitsAlertDialog.Root>
