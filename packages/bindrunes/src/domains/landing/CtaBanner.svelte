<script lang="ts">
import type { Snippet } from "svelte";
import PageSection from "../../layouts/PageSection.svelte";
import Button from "../../primitives/Button.svelte";

let {
	title = "Ready to get started?",
	description = "Join thousands of teams already using our platform.",
	ctaLabel = "Get started for free",
	ctaHref = "#",
	secondaryLabel = undefined as string | undefined,
	secondaryHref = undefined as string | undefined,
	class: className = "",
}: {
	title?: string;
	description?: string;
	ctaLabel?: string;
	ctaHref?: string;
	secondaryLabel?: string;
	secondaryHref?: string;
	class?: string;
} = $props();
</script>

<PageSection reveal={false} size="xl" spacing="wide" class="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 {className}">
  <div class="text-center space-y-6">
    <h2 class="text-display-2 text-foreground">{title}</h2>
    <p class="text-body-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
    <div class="flex items-center justify-center gap-4">
      <Button size="lg" href={ctaHref}>{ctaLabel}</Button>
      {#if secondaryLabel && secondaryHref}
        <Button size="lg" variant="ghost" href={secondaryHref}>{secondaryLabel}</Button>
      {/if}
    </div>
  </div>
</PageSection>
