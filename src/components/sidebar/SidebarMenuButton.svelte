<script lang="ts">
  let {
    isActive = false,
    children,
  }: {
    isActive?: boolean;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div
  class="group/menubutton relative flex w-full cursor-pointer items-center gap-3 rounded-[--radius] px-3 py-2
         text-sm font-medium
         transition-all duration-[--duration-snappy]
         {isActive
           ? 'bg-sidebar-accent text-sidebar-accent-foreground'
           : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}"
  data-active={isActive}
>
  {@render children?.()}
</div>
