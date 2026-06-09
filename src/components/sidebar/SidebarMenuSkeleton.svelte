<script lang="ts">
let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<div class="flex items-center gap-2 px-3 py-1.5">
  <span class="h-4 w-full rounded-[--radius] bg-sidebar-accent/50 animate-pulse"></span>
  {#if children}
    <span class="h-4 w-12 rounded-[--radius] bg-sidebar-accent/50 animate-pulse"></span>
  {/if}
</div>
