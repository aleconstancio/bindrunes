<script lang="ts" generics="TResult">
import type { Snippet } from "svelte";
import { onMount } from "svelte";
import PageLoading from "../primitives/PageLoading.svelte";

let {
	load = undefined as (() => Promise<TResult>) | undefined,
	type = "text" as "text" | "cards" | "table",
	loadingLines = 3,
	loadingRows = 3,
	onLoaded = undefined as ((result: TResult) => void) | undefined,
	children,
}: {
	load?: () => Promise<TResult>;
	type?: "text" | "cards" | "table";
	loadingLines?: number;
	loadingRows?: number;
	onLoaded?: (result: TResult) => void;
	children?: Snippet;
} = $props();

let loaded = $state(false);

onMount(async () => {
	if (load) {
		const result = await load();
		onLoaded?.(result);
	}
	loaded = true;
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
