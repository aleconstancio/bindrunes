<script lang="ts">
  let {
    children,
  }: {
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="flex-shrink-0 p-4 border-t border-sidebar-border">
  {@render children?.()}
</div>
