<script lang="ts">
let {
	eyebrow,
	title,
	description,
	align = "center",
}: {
	eyebrow?: string;
	title: string;
	description?: string;
	align?: "center" | "left";
} = $props();
</script>

<div class="{align === 'center' ? 'text-center' : ''} mb-10">
	{#if eyebrow}
		<p class="text-label-lg text-primary mb-3">{eyebrow}</p>
	{/if}
	<h2 class="text-display-3 sm:text-display-2 text-foreground">{title}</h2>
	{#if description}
		<p class="mt-4 text-body-lg text-muted-foreground {align === 'center' ? 'max-w-2xl mx-auto' : ''}">
			{description}
		</p>
	{/if}
</div>
