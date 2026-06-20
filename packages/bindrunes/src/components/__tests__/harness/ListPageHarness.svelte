<script lang="ts" generics="TData">
import ListPage from "../../../layouts/ListPage.svelte";

let {
	title = "",
	description = undefined as string | undefined,
	searchValue = $bindable(""),
	query = undefined as
		| { isLoading?: boolean; isError?: boolean; error?: { message: string }; data?: TData[] }
		| undefined,
	childText = "Content",
} = $props();
</script>

<ListPage {title} {description} {query} bind:searchValue>
	{#snippet children()}
		{childText}
	{/snippet}
</ListPage>
