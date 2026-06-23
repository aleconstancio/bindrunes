<script lang="ts">
import BouncingDots from "../../primitives/BouncingDots.svelte";

let {
	class: className = "",
}: {
	class?: string;
} = $props();
</script>

<div class="flex justify-start {className}">
  <div class="bg-muted rounded-[--radius-lg] rounded-bl-sm px-4 py-3">
    <BouncingDots color="bg-muted-foreground/50" />
  </div>
</div>
