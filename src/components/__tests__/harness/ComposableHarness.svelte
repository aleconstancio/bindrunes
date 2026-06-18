<script lang="ts">
import { onMount } from "svelte";

let {
	setup,
	state,
	children,
}: {
	setup: () => unknown;
	state: { current: unknown };
	children?: import("svelte").Snippet;
} = $props();

onMount(() => {
	state.current = setup();
});
</script>
{@render children?.()}
