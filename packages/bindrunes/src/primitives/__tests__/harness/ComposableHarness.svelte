<script lang="ts">
import type { Snippet } from "svelte";
import { onMount } from "svelte";

let {
	setup,
	state,
	children,
}: {
	setup: () => unknown;
	state: { current: unknown };
	children?: Snippet;
} = $props();

onMount(() => {
	state.current = setup();
});
</script>
{@render children?.()}
