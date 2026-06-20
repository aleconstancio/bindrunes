<script lang="ts">
import type { Snippet } from "svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import Accordion from "../../primitives/Accordion.svelte";
import AccordionItem from "../../primitives/AccordionItem.svelte";
import type { FAQItem } from "./landing-types";

interface Props {
	items: FAQItem[];
	defaultOpen?: string;
	children?: Snippet;
	class?: string;
}

let { items, defaultOpen, children, class: className = "" }: Props = $props();

// svelte-ignore state_referenced_locally
let openValue = $state(defaultOpen ? [defaultOpen] : ([] as string[]));
</script>

<MetaContainer size="md" class="px-6 py-12 section-reveal {className}">
  <Accordion bind:value={openValue}>
    {#each items as item}
      <AccordionItem value={item.question}>
        {#snippet trigger()}
          <span class="text-foreground font-medium">{item.question}</span>
        {/snippet}
        {#snippet children()}
          <p class="text-body-md text-muted-foreground">{item.answer}</p>
        {/snippet}
      </AccordionItem>
    {/each}
  </Accordion>

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</MetaContainer>
