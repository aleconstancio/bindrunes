<script lang="ts">
import type { Snippet } from "svelte";
import { onNavigate } from "$app/navigation";

let {
	duration = 300,
	children,
}: {
	duration?: number;
	children?: Snippet;
} = $props();

onNavigate((navigation) => {
	if (!document.startViewTransition) return;

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
</script>

{@render children?.()}
