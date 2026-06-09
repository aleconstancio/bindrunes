<script lang="ts">
  let { children }: { children?: import('svelte').Snippet } = $props();
</script>

<span class="ml-auto inline-flex items-center justify-center rounded-full bg-sidebar-accent px-2 py-0.5 text-body-sm font-medium text-sidebar-accent-foreground">
  {@render children?.()}
</span>
