<script lang="ts">
import IconCircle from "../IconCircle.svelte";

let { size = "md", tone = "primary" }: { size?: "sm" | "md" | "lg"; tone?: string } = $props();
</script>

<IconCircle {size} {tone}>
  {#snippet children()}★{/snippet}
</IconCircle>
