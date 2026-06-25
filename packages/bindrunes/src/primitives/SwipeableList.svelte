<script lang="ts">
import type { Snippet } from "svelte";

let {
	children,
}: {
	children?: Snippet;
} = $props();
</script>

<div class="flex flex-col divide-y divide-border">
	{@render children?.()}
</div>
