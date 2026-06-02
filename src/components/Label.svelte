<script lang="ts">
  import { Label as BitsLabel } from 'bits-ui';

  let { for: forEl, children }: { for?: string; children?: import('svelte').Snippet } = $props();
</script>

<BitsLabel.Root for={forEl} class="block text-sm font-medium text-muted-foreground mb-1.5">
  {@render children?.()}
</BitsLabel.Root>
