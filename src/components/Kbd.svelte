<script lang="ts">
  let { children }: { children?: import('svelte').Snippet } = $props();
</script>

<kbd class="inline-flex items-center justify-center rounded-[--radius] border bg-muted px-1.5 py-0.5 text-[0.7rem] font-mono text-muted-foreground"
  style="border-color: var(--border); min-width: 1.5em">
  {@render children?.()}
</kbd>
