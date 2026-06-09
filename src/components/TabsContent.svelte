<script lang="ts">
let {
	value = "",
	children,
}: {
	value?: string;
	children?: import("svelte").Snippet;
} = $props();
</script>

<BitsTabs.Content {value} class="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
  {@render children?.()}
</BitsTabs.Content>
