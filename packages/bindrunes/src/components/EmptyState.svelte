<script lang="ts">
import type { Snippet } from "svelte";

let {
	icon,
	title = undefined as string | undefined,
	description = undefined as string | undefined,
	action,
	class: className = "",
}: {
	icon?: Snippet;
	title?: string;
	description?: string;
	action?: Snippet;
	class?: string;
} = $props();
</script>

<div class="flex flex-col items-center justify-center py-16 text-center {className}">
  {#if icon}
    <div class="mb-4 text-muted-foreground/50">
      {@render icon()}
    </div>
  {/if}

  {#if title}
    <h3 class="text-title-1 text-foreground mb-1">{title}</h3>
  {/if}

  {#if description}
    <p class="text-body-md text-muted-foreground max-w-sm">{description}</p>
  {/if}

  {#if action}
    <div class="mt-4">
      {@render action()}
    </div>
  {/if}
</div>
