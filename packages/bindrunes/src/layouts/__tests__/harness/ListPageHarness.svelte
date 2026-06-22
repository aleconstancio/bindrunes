<script lang="ts">
import type { Snippet } from "svelte";
import ListPage from "../../ListPage.svelte";

let {
	title = "Test Page",
	description = undefined as string | undefined,
	query = undefined as
		| { isLoading?: boolean; isError?: boolean; error?: { message: string }; data?: unknown[] }
		| undefined,
	childText = "Content",
	children,
}: {
	title?: string;
	description?: string;
	query?: { isLoading?: boolean; isError?: boolean; error?: { message: string }; data?: unknown[] };
	childText?: string;
	children?: Snippet;
} = $props();
</script>

<ListPage {title} {description} {query}>
	{#if children}
		{@render children()}
	{:else}
		<p>{childText}</p>
	{/if}
</ListPage>
