<script lang="ts">
import { Collapsible } from "bits-ui";

const BitsCollapsible = Collapsible;

let {
	open = $bindable(false),
	disabled = false,
	trigger,
	class: className = "",
	children,
}: {
	open?: boolean;
	disabled?: boolean;
	trigger?: import("svelte").Snippet;
	class?: string;
	children?: import("svelte").Snippet;
} = $props();
</script>

<BitsCollapsible.Root bind:open {disabled} class="w-full {className}">
	<BitsCollapsible.Trigger
		class="flex w-full items-center justify-between rounded-[--radius-sm] px-3 py-2 text-label-md font-medium transition-colors cursor-pointer
		       text-foreground hover:bg-muted
		       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
		       disabled:pointer-events-none disabled:opacity-50"
	>
		{@render trigger?.()}
	</BitsCollapsible.Trigger>
	<BitsCollapsible.Content class="overflow-hidden transition-all data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=closed]:h-0">
		<div class="pt-2">
			{@render children?.()}
		</div>
	</BitsCollapsible.Content>
</BitsCollapsible.Root>
