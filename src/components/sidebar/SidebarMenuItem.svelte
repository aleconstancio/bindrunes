<script lang="ts">
  let { children }: { children?: import('svelte').Snippet } = $props();
</script>

<div class="group/menuitem">
  {@render children?.()}
</div>
