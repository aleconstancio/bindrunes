<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';
  import { Card } from 'bindrunes';
  import { Check } from 'lucide-svelte';

  interface Step {
    icon: Component;
    title: string;
    description: string;
  }

  interface Props {
    steps: Step[];
    showConnector?: boolean;
    children?: Snippet;
  }

  let { steps, showConnector = true, children }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
  {#each steps as step, i}
    <div class="relative">
      <Card variant="glass" padding class="h-full">
        {#snippet children()}
          <div class="flex flex-col items-center text-center gap-4">
            <div class="relative">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon size={24} />
              </div>
              <div class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {#if i < steps.length - 1}
                  <Check size={12} />
                {:else}
                  {i + 1}
                {/if}
              </div>
            </div>
            <h3 class="text-lg font-bold text-foreground">{step.title}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        {/snippet}
      </Card>
      {#if showConnector && i < steps.length - 1}
        <div class="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-border"></div>
      {/if}
    </div>
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
