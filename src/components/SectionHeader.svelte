<script lang="ts">
  let {
    label = '',
    action,
  }: {
    label?: string;
    action?: import('svelte').Snippet;
  } = $props();
</script>

<div class="flex items-center justify-between pb-2 mb-3" style="border-bottom: 1px solid var(--border)">
  <span class="mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
  {#if action}
    <div>{@render action()}</div>
  {/if}
</div>
