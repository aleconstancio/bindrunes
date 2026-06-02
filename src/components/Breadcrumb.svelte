<script lang="ts">
  let {
    items = [] as { label: string; href?: string }[],
    separator = '/',
    class: className = '',
  }: {
    items?: { label: string; href?: string }[];
    separator?: string;
    class?: string;
  } = $props();
</script>

<nav aria-label="Breadcrumb" class="text-sm {className}">
  <ol class="flex items-center gap-1.5 list-none m-0 p-0" style="color: var(--muted-foreground);">
    {#each items as item, i}
      <li class="flex items-center gap-1.5">
        {#if i > 0}
          <span aria-hidden="true" style="color: var(--border);">{separator}</span>
        {/if}
        {#if item.href && i < items.length - 1}
          <a href={item.href} class="hover:underline transition-colors" style="color: var(--primary);">{item.label}</a>
        {:else}
          <span style="color: var(--foreground);">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
