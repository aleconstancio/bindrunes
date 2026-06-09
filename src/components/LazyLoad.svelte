<script lang="ts">
import { onMount } from "svelte";

let {
	load = undefined as (() => Promise<unknown>) | undefined,
	type = "text" as "text" | "cards" | "table",
	loadingLines = 3,
	loadingRows = 3,
	onLoaded = undefined as ((result: unknown) => void) | undefined,
	children,
}: {
	load?: () => Promise<unknown>;
	type?: "text" | "cards" | "table";
	loadingLines?: number;
	loadingRows?: number;
	onLoaded?: (result: unknown) => void;
	children?: import("svelte").Snippet;
} = $props();

let _loaded = $state(false);

onMount(async () => {
	if (load) {
		const result = await load();
		onLoaded?.(result);
	}
	_loaded = true;
});
</script>

{#if loaded}
  {@render children?.()}
{:else}
  {#if type === 'cards'}
    <PageLoading type="cards" rows={loadingRows} />
  {:else if type === 'table'}
    <PageLoading type="table" rows={loadingRows} />
  {:else}
    <PageLoading type="text" lines={loadingLines} />
  {/if}
{/if}
