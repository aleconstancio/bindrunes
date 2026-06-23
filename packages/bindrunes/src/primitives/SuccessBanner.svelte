<script lang="ts">
import type { Snippet } from "svelte";

let {
	children,
	class: className = "",
}: {
	children: Snippet;
	class?: string;
} = $props();
</script>

<div class="rounded-[--radius] bg-success-soft border border-success/30 p-3 text-body-sm text-success {className}">
	{@render children()}
</div>
