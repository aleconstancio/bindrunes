<script lang="ts">
import Popconfirm from "../../../primitives/Popconfirm.svelte";

let {
	title = "Are you sure?",
	description = undefined as string | undefined,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	destructive = false,
	onConfirm = undefined as (() => void) | undefined,
	onCancel = undefined as (() => void) | undefined,
} = $props();
</script>

<Popconfirm
	{title}
	{description}
	{confirmLabel}
	{cancelLabel}
	{destructive}
	{onConfirm}
	{onCancel}
>
	{#snippet trigger()}
		<button type="button">Open</button>
	{/snippet}
</Popconfirm>
