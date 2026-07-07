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
          {#if item.ctaLink}
            <a href={item.ctaLink.href} class="inline-flex items-center gap-1 text-body-sm text-primary font-semibold hover:underline mt-2">
              {item.ctaLink.label}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          {/if}
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
