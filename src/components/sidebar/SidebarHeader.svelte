<script lang="ts">
  let {
    children,
  }: {
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="flex-shrink-0 p-4">
  {@render children?.()}
</div>
