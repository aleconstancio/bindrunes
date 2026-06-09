<script lang="ts">
let { lines = 3, width = "100%" as string | string[], class: className = "" } = $props();

const _widths: string[] = typeof width === "string" ? Array(lines).fill(width) : width;
</script>

{#each Array(lines) as _, i (i)}
  <div
    class="animate-shimmer rounded-[--radius,0.5rem] bg-muted {className}"
    style="width: {widths[i] ?? widths[widths.length - 1] ?? '100%'}; height: 1em; margin-bottom: 0.5em;"
  ></div>
{/each}

<style>
  .animate-shimmer {
    background: linear-gradient(
      90deg,
      var(--muted, oklch(1 0 0 / 0.04)) 25%,
      var(--muted-foreground, oklch(0.55 0.03 280)) 50%,
      var(--muted, oklch(1 0 0 / 0.04)) 75%
    );
    background-size: 200% 100%;
    animation: bindrunes-shimmer 1.5s var(--ease-standard, ease-in-out) infinite;
  }
</style>
