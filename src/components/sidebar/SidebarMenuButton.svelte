<script lang="ts">
  let {
    isActive = false,
    href = undefined as string | undefined,
    onclick = undefined as ((e: MouseEvent) => void) | undefined,
    children,
  }: {
    isActive?: boolean;
    href?: string;
    onclick?: (e: MouseEvent) => void;
    children?: import('svelte').Snippet;
  } = $props();

  let tag = $derived(href ? 'a' : onclick ? 'button' : 'div');
</script>

<svelte:element
  this={tag}
  {href}
  {onclick}
  class="group/menubutton relative flex w-full cursor-pointer items-center gap-3 rounded-[--radius] px-3 py-2
         text-label-md border-0 bg-transparent text-left outline-none
         transition-all duration-[--duration-snappy]
         {isActive
           ? 'bg-sidebar-accent text-sidebar-accent-foreground'
           : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}"
  data-active={isActive}
>
  {@render children?.()}
</svelte:element>

