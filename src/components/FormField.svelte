<script lang="ts">
  let {
    label = '',
    error = undefined as string | undefined,
    hint = undefined as string | undefined,
    required = false,
    class: className = '',
    children,
  }: {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="flex flex-col gap-2 {className}">
  {#if label}
    <label class="text-label-md font-medium" style="color: {error ? 'var(--destructive)' : 'var(--muted-foreground)'};">
      {label}
      {#if required}
        <span style="color: var(--destructive);">*</span>
      {/if}
    </label>
  {/if}

  {@render children?.()}

  {#if error}
    <p class="text-body-sm" style="color: var(--destructive);">{error}</p>
  {:else if hint}
    <p class="text-body-sm" style="color: var(--muted-foreground);">{hint}</p>
  {/if}
</div>
