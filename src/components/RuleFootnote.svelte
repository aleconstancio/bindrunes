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

<div class="rounded-[--radius] border p-4"
  style="background: oklch(from var(--warning) l c h / 0.05); border-color: oklch(from var(--warning) l c h / 0.15);">
  <p class="mono text-[0.65rem] font-bold uppercase tracking-[0.1em]" style="color: var(--warning)">{title}</p>
  {#if description}
    <p class="text-sm font-semibold mt-1 text-foreground">{description}</p>
  {/if}
  {#if children}
    <div class="mt-1 text-xs text-muted-foreground">{@render children()}</div>
  {/if}
</div>
