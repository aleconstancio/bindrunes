<script lang="ts">
import { getSidebarContext } from "./sidebar-context.svelte";

let { children }: { children?: import("svelte").Snippet } = $props();

const _ctx = getSidebarContext();
</script>

<button
  onclick={() => ctx.open = !ctx.open}
  aria-label="Toggle sidebar"
  class="inline-flex items-center justify-center rounded-[--radius] p-2
         text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
         transition-colors duration-[--duration-snappy] cursor-pointer"
>
  {#if children}
    {@render children()}
  {:else}
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  {/if}
</button>
