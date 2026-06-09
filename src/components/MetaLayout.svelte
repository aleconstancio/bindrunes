<!-- src/components/MetaLayout.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    position = 'content',
    class: className = '',
    children,
  }: {
    position?: 'header' | 'content' | 'footer' | 'separator';
    class?: string;
    children?: Snippet;
  } = $props();
</script>

{#if position === 'separator'}
  <div class="h-px bg-border my-2 {className}" role="separator"></div>
{:else}
  <div
    class="{position === 'header' ? 'flex-shrink-0' : ''}
           {position === 'footer' ? 'flex-shrink-0 border-t border-border' : ''}
           {position === 'content' ? 'flex-1 overflow-y-auto' : ''}
           p-4 {className}"
  >
    {@render children?.()}
  </div>
{/if}
