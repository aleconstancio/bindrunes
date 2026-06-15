<script lang="ts">
import MetaScrollable from "../MetaScrollable.svelte";

let {
	children,
}: {
	children?: import("svelte").Snippet;
} = $props();
</script>

<div class="flex-1 px-4 py-2">
  <MetaScrollable>
    {@render children?.()}
  </MetaScrollable>
</div>
