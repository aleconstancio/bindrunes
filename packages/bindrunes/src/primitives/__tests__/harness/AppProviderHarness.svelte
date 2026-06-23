<script lang="ts">
import AppProvider from "../../AppProvider.svelte";

let {
	themeDefault = undefined as string | undefined,
	aestheticDefault = undefined as string | undefined,
	densityDefault = undefined as string | undefined,
	theme = undefined as string | undefined,
	aesthetic = undefined as string | undefined,
	density = undefined as string | undefined,
	childText = "App content",
} = $props();
</script>

<AppProvider {themeDefault} {aestheticDefault} {densityDefault} {theme} {aesthetic} {density}>
	{#snippet children()}
		{childText}
	{/snippet}
</AppProvider>
