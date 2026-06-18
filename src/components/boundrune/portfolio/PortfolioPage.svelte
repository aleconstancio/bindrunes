<script lang="ts">
import type { Snippet } from "svelte";
import PageSection from "../../PageSection.svelte";

let {
	title = "Portfolio",
	description,
	class: className = "",
	header,
	children,
}: {
	title?: string;
	description?: string;
	class?: string;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

<div class="min-h-screen {className}">
	<PageSection size="2xl" spacing="wide" reveal={false}>
		{#if header}
			{@render header()}
		{:else}
			<div class="text-center space-y-4 mb-12">
				<h1 class="text-display-2 text-foreground">{title}</h1>
				{#if description}
					<p class="text-body-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
				{/if}
			</div>
		{/if}
		{@render children?.()}
	</PageSection>
</div>
