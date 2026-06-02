<script lang="ts">
  let {
    children,
  }: {
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="flex-1 overflow-y-auto px-4 py-2">
  {@render children?.()}
</div>
