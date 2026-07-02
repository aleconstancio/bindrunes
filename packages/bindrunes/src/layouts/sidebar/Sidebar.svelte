<script lang="ts">
import type { Snippet } from "svelte";
import { useSidebar } from "./sidebar-context.svelte";

let {
	side = "left" as "left" | "right",
	variant = "sidebar" as "sidebar" | "floating" | "inset",
	collapsible = "icon" as "offcanvas" | "icon" | "none",
	class: className = "",
	children,
}: {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
	class?: string;
	children?: Snippet;
} = $props();

const ctx = useSidebar();
</script>

{#if collapsible === 'offcanvas'}
  <aside
    class="fixed inset-y-0 z-[--z-sidebar,20] flex flex-col contain-layout
           bg-sidebar-background text-sidebar-foreground
           border-r border-sidebar-border
           transition-transform duration-[--duration-fluid]
           w-[--sidebar-width-mobile,18rem] md:w-[--sidebar-width,16rem]
           {side === 'left' ? 'left-0' : 'right-0'}
           {ctx.isMobile
             ? (ctx.openMobile ? 'translate-x-0' : '-translate-x-full')
             : (ctx.open ? 'translate-x-0' : '-translate-x-full md:translate-x-0')}
           {className}"
  >
    {@render children?.()}
  </aside>
{:else if collapsible === 'icon'}
  <aside
    class="flex flex-col contain-layout
           bg-sidebar-background text-sidebar-foreground
           border-r border-sidebar-border
           transition-all duration-[--duration-fluid]
           max-md:fixed max-md:inset-y-0 max-md:z-[--z-sidebar,20] max-md:w-[--sidebar-width-mobile,18rem]
           {side === 'left' ? 'max-md:left-0' : 'max-md:right-0'}
           {ctx.isMobile
             ? (ctx.openMobile ? 'max-md:translate-x-0' : 'max-md:-translate-x-full')
             : 'max-md:-translate-x-full'}
           w-[--sidebar-width,16rem]
           {className}"
    style={ctx.isMobile ? '' : `min-width: ${ctx.state === 'collapsed' ? '3rem' : 'var(--sidebar-width, 16rem)'}`}
  >
    {@render children?.()}
  </aside>
{:else}
  <aside
    class="flex flex-col w-[--sidebar-width,16rem] contain-layout
           bg-sidebar-background text-sidebar-foreground
           border-r border-sidebar-border
           {className}"
  >
    {@render children?.()}
  </aside>
{/if}
