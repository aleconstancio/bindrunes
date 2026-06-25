<script lang="ts">
import type { Snippet } from "svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import PageSection from "../../layouts/PageSection.svelte";

let {
	title = "",
	description = "",
	children,
	class: className = "",
}: {
	title?: string;
	description?: string;
	children?: Snippet;
	class?: string;
} = $props();
</script>

<PageSection reveal={false} size="md" spacing="compact" class={className}>
  <div class="rounded-[--radius] border border-border bg-card p-6">
    <div class="mb-6">
      <h3 class="text-title-2 text-foreground">{title}</h3>
      {#if description}
        <p class="text-body-sm text-muted-foreground mt-1">{description}</p>
      {/if}
    </div>
    <MetaContainer size="xl" padding={false}>
      <div class="space-y-4">
        {@render children?.()}
      </div>
    </MetaContainer>
  </div>
</PageSection>
