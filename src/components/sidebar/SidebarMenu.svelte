<script lang="ts">
  let {
    children,
  }: {
    children?: import('svelte').Snippet;
  } = $props();
</script>

<nav class="space-y-0.5">
  {@render children?.()}
</nav>
