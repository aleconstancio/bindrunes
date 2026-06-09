<script lang="ts">
  import DashboardShell from './DashboardShell.svelte';
  let { children, ...rest }: { children?: import('svelte').Snippet } & Record<string, unknown> = $props();
</script>

<DashboardShell variant="right" {...rest}>
  {#if children}
    {@render children()}
  {/if}
</DashboardShell>
