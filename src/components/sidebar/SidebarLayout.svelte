<script lang="ts">
  let {
    position = 'content' as 'header' | 'content' | 'footer' | 'separator',
    children,
  }: {
    position?: 'header' | 'content' | 'footer' | 'separator';
    children?: import('svelte').Snippet;
  } = $props();
</script>

{#if position === 'header'}
<div class="flex-shrink-0 p-4">
  {@render children?.()}
</div>
{:else if position === 'footer'}
<div class="flex-shrink-0 p-4 border-t border-sidebar-border">
  {@render children?.()}
</div>
{:else if position === 'separator'}
<div class="h-px bg-sidebar-border my-2" role="separator" />
{:else}
<div class="flex-1 overflow-y-auto px-4 py-2">
  {@render children?.()}
</div>
{/if}
