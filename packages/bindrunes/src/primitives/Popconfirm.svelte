<script lang="ts">
import { AlertDialog } from "bits-ui";
import type { Snippet } from "svelte";
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
	trigger?: Snippet;
	children?: Snippet;
} = $props();

function _handleConfirm() {
	open = false;
	onConfirm?.();
}

function _handleCancel() {
	open = false;
	onCancel?.();
}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class="inline-flex">
		{@render trigger?.()}
	</AlertDialog.Trigger>

	<AlertDialog.Portal>
		<AlertDialog.Overlay class="fixed inset-0 z-[--z-overlay,30] bg-[--overlay] backdrop-blur-[--blur-subtle] duration-[--duration-slow] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
		<AlertDialog.Content class="fixed left-1/2 top-1/2 z-[--z-overlay,30] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[--radius] bg-card p-6 shadow-[--shadow-lg] border border-border duration-[--duration-slow] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 {className}">
			<AlertDialog.Title class="text-title-2 mb-2 text-foreground">{title}</AlertDialog.Title>
			{#if description}
				<AlertDialog.Description class="text-body-md text-muted-foreground">{description}</AlertDialog.Description>
			{/if}
			<div class="mt-6 flex justify-end gap-3">
				<AlertDialog.Cancel asChild let:props>
					<Button variant="ghost" size="sm" {...props} onclick={_handleCancel}>{cancelLabel}</Button>
				</AlertDialog.Cancel>
				<AlertDialog.Action asChild let:props>
					<Button variant={destructive ? 'destructive' : 'primary'} size="sm" {...props} onclick={_handleConfirm}>{confirmLabel}</Button>
				</AlertDialog.Action>
			</div>
			{#if children}
				{@render children()}
			{/if}
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
