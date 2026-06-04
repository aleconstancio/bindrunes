<script lang="ts">
  let {
    title = 'Regra Crítica',
    description = '',
    children,
  }: {
    title?: string;
    description?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="rounded-[--radius] border p-4 bg-warning-soft border-warning/30">
  <p class="text-mono-xs font-bold uppercase text-warning">{title}</p>
  {#if description}
    <p class="text-label-md font-semibold mt-1 text-foreground">{description}</p>
  {/if}
  {#if children}
    <div class="mt-1 text-body-sm text-muted-foreground">{@render children()}</div>
  {/if}
</div>
