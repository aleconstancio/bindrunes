<script lang="ts">
	import type { Snippet } from "svelte";

	let { title, description, children }: {
		title?: string;
		description?: string;
		children: Snippet;
	} = $props();
</script>

<div class="p-6 lg:p-8 max-w-4xl">
	{#if title}
		<h1 class="text-display-1 text-foreground">{title}</h1>
	{/if}
	{#if description}
		<p class="mt-3 text-body-lg text-muted-foreground">{description}</p>
	{/if}

	<div class="mt-10 space-y-10 prose prose-neutral dark:prose-invert max-w-none">
		{@render children()}
	</div>
</div>
