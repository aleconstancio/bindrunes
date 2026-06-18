<script lang="ts">
import type { Snippet } from "svelte";
import Card from "../Card.svelte";
import DynamicIcon from "../DynamicIcon.svelte";
import MetaContainer from "../MetaContainer.svelte";
import { getGridClass } from "./landing-utils";

interface Props {
	features: { icon: string; title: string; description: string }[];
	columns?: number;
	variant?: "card" | "inline";
	children?: Snippet;
	class?: string;
	featureSnippet?: Snippet<
		[{ feature: { icon: string; title: string; description: string }; index: number }]
	>;
}

let {
	features,
	columns = 3,
	variant = "card",
	children,
	class: className = "",
	featureSnippet,
}: Props = $props();
</script>

<MetaContainer size="xl" padding={false}>
<div class="grid {getGridClass(columns)} gap-6 {className}">
  {#each features as feature, i}
    <div class="stagger-enter" style="--stagger-index: {i}">
    {#if featureSnippet}
      {@render featureSnippet({ feature, index: i })}
    {:else if variant === 'card'}
      <Card variant="glass" padding class="transition-all hover:scale-[1.02] hover:shadow-xl">
        {#snippet children()}
          <div class="flex flex-col gap-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <DynamicIcon icon={feature.icon} size={20} class="text-title-1" />
            </div>
            <h3 class="text-title-2 text-foreground">{feature.title}</h3>
            <p class="text-body-md text-muted-foreground">{feature.description}</p>
          </div>
        {/snippet}
      </Card>
    {:else}
      <div class="flex gap-4">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <DynamicIcon icon={feature.icon} size={20} class="text-title-1" />
        </div>
        <div>
          <h3 class="text-title-2 text-foreground">{feature.title}</h3>
          <p class="mt-1 text-body-md text-muted-foreground">{feature.description}</p>
        </div>
      </div>
    {/if}
    </div>
  {/each}
</div>
</MetaContainer>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
