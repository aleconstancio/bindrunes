<script lang="ts">
import { Tabs } from "bits-ui";
import type { Snippet } from "svelte";

const BitsTabs = Tabs;

let {
	value = "",
	children,
}: {
	value?: string;
	children?: Snippet;
} = $props();
</script>

<BitsTabs.Content {value} class="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
  {@render children?.()}
</BitsTabs.Content>
