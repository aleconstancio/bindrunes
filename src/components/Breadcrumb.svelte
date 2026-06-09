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

<nav aria-label="Breadcrumb" class="text-body-sm {className}">
  <ol class="flex items-center gap-1.5 list-none m-0 p-0 text-muted-foreground">
    {#each items as item, i}
      <li class="flex items-center gap-1.5">
        {#if i > 0}
          <span aria-hidden="true" class="text-border">{separator}</span>
        {/if}
        {#if item.href && i < items.length - 1}
          <a href={item.href} class="text-primary hover:underline transition-colors duration-[--duration-snappy]">{item.label}</a>
        {:else}
          <span class="text-foreground">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
