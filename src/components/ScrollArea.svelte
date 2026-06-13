<script lang="ts">
import { ScrollArea } from "bits-ui";

const BitsScrollArea = ScrollArea;

let {
	class: className = "",
	children,
}: {
	class?: string;
	children?: import("svelte").Snippet;
} = $props();
</script>

<BitsScrollArea.Root class="overflow-hidden rounded-[--radius] {className}">
	<BitsScrollArea.Viewport class="h-full w-full rounded-[inherit]" style="scrollbar-width: thin;">
		{@render children?.()}
	</BitsScrollArea.Viewport>
	<BitsScrollArea.Scrollbar
		orientation="vertical"
		class="flex w-2 touch-none select-none bg-transparent transition-colors hover:bg-muted data-[state=visible]:opacity-100"
	>
		<BitsScrollArea.Thumb class="relative flex-1 rounded-full bg-border" />
	</BitsScrollArea.Scrollbar>
	<BitsScrollArea.Scrollbar
		orientation="horizontal"
		class="flex h-2 touch-none select-none flex-col bg-transparent transition-colors hover:bg-muted"
	>
		<BitsScrollArea.Thumb class="relative flex-1 rounded-full bg-border" />
	</BitsScrollArea.Scrollbar>
	<BitsScrollArea.Corner class="bg-border" />
</BitsScrollArea.Root>
