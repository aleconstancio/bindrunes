<script lang="ts">
  let { children }: { children?: import('svelte').Snippet } = $props();
</script>

<kbd class="inline-flex items-center justify-center rounded-[--radius] border border-border bg-muted px-1.5 py-0.5 text-mono-xs text-muted-foreground"
  style="min-width: 1.5em">
  {@render children?.()}
</kbd>
