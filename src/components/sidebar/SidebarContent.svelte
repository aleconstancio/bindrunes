<script lang="ts">
import type { Snippet } from "svelte";
import MetaScrollable from "../MetaScrollable.svelte";

let {
	children,
}: {
	children?: Snippet;
} = $props();
</script>

<div class="flex-1 px-4 py-2">
  <MetaScrollable>
    {@render children?.()}
  </MetaScrollable>
</div>
