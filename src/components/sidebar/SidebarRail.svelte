<script lang="ts">
  import { getSidebarContext } from './sidebar-context.svelte.js';

  const ctx = getSidebarContext();
</script>

<button
  onclick={() => ctx.toggle()}
  class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10
         flex h-8 w-4 items-center justify-center rounded-full
         bg-sidebar-border text-sidebar-foreground/50
         hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
         transition-colors duration-[--duration-snappy] cursor-pointer
         opacity-0 group-hover/sidebar:opacity-100"
  data-sidebar-rail
>
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M6 1L2 6L6 11" />
  </svg>
</button>
