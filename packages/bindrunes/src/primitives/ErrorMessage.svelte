<script lang="ts">
import type { Snippet } from "svelte";

let {
	id,
	children,
}: {
	id?: string;
	children?: Snippet;
} = $props();
</script>

<p {id} class="mt-1.5 text-body-sm text-destructive">
	{@render children?.()}
</p>
