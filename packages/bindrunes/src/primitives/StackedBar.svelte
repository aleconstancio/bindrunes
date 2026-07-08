<script lang="ts">
let {
	segments,
	height = 8,
	class: className = "",
}: {
	segments: { label: string; value: number; color: string }[];
	height?: number;
	class?: string;
} = $props();

const total = $derived(segments.reduce((sum, s) => sum + s.value, 0));
</script>

{#if total > 0}
  <div class="flex rounded-full overflow-hidden {className}" style="height: {height}px">
    {#each segments as segment, i}
      {#if segment.value > 0}
        <div
          class="transition-all duration-300"
          style="width: {(segment.value / total) * 100}%; background-color: {segment.color}; opacity: {i % 2 === 0 ? 1 : 0.85}"
          title="{segment.label}: {segment.value}"
        ></div>
      {/if}
    {/each}
  </div>
{:else}
  <div class="flex rounded-full overflow-hidden bg-muted {className}" style="height: {height}px"></div>
{/if}
