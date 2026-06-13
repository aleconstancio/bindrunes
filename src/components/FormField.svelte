<script lang="ts">
let {
	label = "",
	error = undefined as string | undefined,
	hint = undefined as string | undefined,
	required = false,
	class: className = "",
	children,
}: {
	label?: string;
	error?: string;
	hint?: string;
	required?: boolean;
	class?: string;
	children?: import("svelte").Snippet;
} = $props();
</script>

<div class="flex flex-col gap-2 {className}">
  {#if label}
    <p class="text-label-md font-medium {error ? 'text-destructive' : 'text-muted-foreground'}">
      {label}
      {#if required}
        <span class="text-destructive">*</span>
      {/if}
    </p>
  {/if}

  {@render children?.()}

  {#if error}
    <p class="text-body-sm text-destructive">{error}</p>
  {:else if hint}
    <p class="text-body-sm text-muted-foreground">{hint}</p>
  {/if}
</div>
