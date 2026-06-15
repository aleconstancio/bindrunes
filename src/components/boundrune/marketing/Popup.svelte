<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../Badge.svelte";
import Button from "../../Button.svelte";
import Dialog from "../../Dialog.svelte";

let {
	open = $bindable(false),
	title = "",
	description = "",
	badge = "",
	ctaLabel = "Get started",
	ctaHref = "#",
	onDismiss = undefined as (() => void) | undefined,
	children,
	class: className = "",
}: {
	open?: boolean;
	title?: string;
	description?: string;
	badge?: string;
	ctaLabel?: string;
	ctaHref?: string;
	onDismiss?: () => void;
	children?: Snippet;
	class?: string;
} = $props();

function handleClose() {
	open = false;
	onDismiss?.();
}
</script>

<Dialog bind:open>
  {#snippet children()}
    <div class={className}>
      <div class="text-center space-y-4">
        {#if badge}
          <Badge variant="info">{badge}</Badge>
        {/if}
        <h2 class="text-title-1 text-foreground">{title}</h2>
        <p class="text-body-md text-muted-foreground max-w-sm mx-auto">{description}</p>
        {#if children}
          {@render children()}
        {:else}
          <div class="pt-2">
            <Button href={ctaHref} onclick={handleClose}>{ctaLabel}</Button>
          </div>
        {/if}
      </div>
    </div>
  {/snippet}
</Dialog>
