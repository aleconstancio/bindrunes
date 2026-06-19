<script lang="ts">
import AppProvider from "../../AppProvider.svelte";

let {
	themeDefault = undefined as string | undefined,
	aestheticDefault = undefined as string | undefined,
	densityDefault = undefined as string | undefined,
	childText = "App content",
} = $props();
</script>

<AppProvider {themeDefault} {aestheticDefault} {densityDefault}>
	{#snippet children()}
		{childText}
	{/snippet}
</AppProvider>
