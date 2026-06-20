<script lang="ts">
import Button from "../../Button.svelte";
import Block from "../Block.svelte";

let {
	title = "Under maintenance",
	description = "We are performing scheduled maintenance. We'll be back shortly.",
	estimatedTime = "",
	contactHref = "",
	contactLabel = "Contact support",
	class: className = "",
}: {
	title?: string;
	description?: string;
	estimatedTime?: string;
	contactHref?: string;
	contactLabel?: string;
	class?: string;
} = $props();
</script>

<Block size="sm" spacing="wide" background="gradient" class={className}>
  <div class="text-center space-y-6">
    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-2">
      <span class="text-headline-3" aria-hidden="true">🔧</span>
    </div>
    <h1 class="text-display-2 text-foreground font-bold">{title}</h1>
    <p class="text-body-lg text-muted-foreground max-w-md mx-auto">{description}</p>
    {#if estimatedTime}
      <p class="text-body-md text-muted-foreground">
        Estimated time: <span class="font-semibold text-foreground">{estimatedTime}</span>
      </p>
    {/if}
    {#if contactHref}
      <div class="pt-4">
        <Button href={contactHref} variant="outline">{contactLabel}</Button>
      </div>
    {/if}
  </div>
</Block>
