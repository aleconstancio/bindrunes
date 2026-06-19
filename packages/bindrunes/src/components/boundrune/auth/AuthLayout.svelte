<script lang="ts">
import type { Snippet } from "svelte";

let {
	brandTitle = "",
	brandDescription = "",
	brandImage = undefined as string | undefined,
	class: className = "",
	children,
}: {
	brandTitle?: string;
	brandDescription?: string;
	brandImage?: string;
	class?: string;
	children?: Snippet;
} = $props();
</script>

<div class="min-h-screen flex {className}">
  <!-- Left: Branding -->
  <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-background to-muted p-12 items-center justify-center">
    <div class="max-w-md space-y-6">
      {#if brandImage}
        <img src={brandImage} alt={brandTitle} class="h-12 w-auto" />
      {/if}
      <h1 class="text-display-3 text-foreground">{brandTitle}</h1>
      <p class="text-body-lg text-muted-foreground">{brandDescription}</p>
    </div>
  </div>

  <!-- Right: Form -->
  <div class="flex-1 flex items-center justify-center p-8">
    <div class="w-full max-w-sm">
      {#if brandTitle}
        <div class="lg:hidden mb-8 text-center">
          <h1 class="text-title-1 text-foreground font-bold">{brandTitle}</h1>
        </div>
      {/if}
      {@render children?.()}
    </div>
  </div>
</div>
