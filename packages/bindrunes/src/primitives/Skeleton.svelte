<script lang="ts">
let { lines = 3, width = "100%" as string | string[], class: className = "" } = $props();

const widths: string[] = $derived(typeof width === "string" ? Array(lines).fill(width) : width);
const skeletonLines = $derived(Array.from({ length: lines }, (_, i) => i));
</script>

<!-- svelte-ignore state_referenced_locally -->
{#each skeletonLines as i (i)}
  <div
    class="animate-shimmer skeleton-item rounded-[--radius,0.5rem] bg-muted mb-2 {className}"
    style="width: {widths[i] ?? widths[widths.length - 1] ?? '100%'}; height: 1em;"
  ></div>
{/each}

<style>
  .skeleton-item {
    contain: layout style paint;
  }
  .animate-shimmer {
    background: var(--gradient-shimmer);
    background-size: 200% 100%;
    animation: urupe-ui-shimmer 1.5s var(--ease-standard) infinite;
  }
</style>
