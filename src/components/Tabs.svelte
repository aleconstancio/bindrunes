<script lang="ts">
let {
	value = $bindable(""),
	children,
}: {
	value?: string;
	children?: import("svelte").Snippet;
} = $props();
</script>

<BitsTabs.Root bind:value class="w-full">
  {@render children?.()}
</BitsTabs.Root>
