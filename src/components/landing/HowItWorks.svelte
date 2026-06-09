<script lang="ts">
  import { onMount } from 'svelte';
  import type { Component, Snippet } from 'svelte';
  import { Check } from 'lucide-svelte';
  import Card from '../Card.svelte';
  import DynamicIcon from '../DynamicIcon.svelte';
  import type { TFunction } from '../../shared-types';

  import type { Step } from './landing-types';

  interface Props {
    steps: Step[];
    showConnector?: boolean;
    children?: Snippet;
    class?: string;
    t?: TFunction;
  }

  let { steps, showConnector = true, children, class: className = '', t }: Props = $props();

  let visible = $state(false);
  let grid: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  });
</script>

<div bind:this={grid} class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 {className}">
  {#each steps as step, i}
    <div class="stagger-enter relative" style="--stagger-index: {i}">
      <Card variant="glass" padding class="h-full">
        {#snippet children()}
          <div class="flex flex-col items-center text-center gap-4">
            <div class="relative">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <DynamicIcon icon={step.icon} size={24} class="text-title-1" />
              </div>
              <div class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-body-sm text-primary-foreground">
                {#if i < steps.length - 1}
                  <Check size={12} />
                  <span class="sr-only">{t?.('landing.HowItWorks.stepDone') ?? 'Passo concluído'} {i + 1}</span>
                {:else}
                  {i + 1}
                  <span class="sr-only">{t?.('landing.HowItWorks.step') ?? 'Passo'} {i + 1}</span>
                {/if}
              </div>
            </div>
            <h3 class="text-title-2 text-foreground">{step.title}</h3>
            <p class="text-body-md text-muted-foreground">{step.description}</p>
          </div>
        {/snippet}
      </Card>
      {#if showConnector && i < steps.length - 1}
        <div class="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-border"></div>
        <div class="hidden md:block lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 border-l-2 border-dashed border-border"></div>
      {/if}
    </div>
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
