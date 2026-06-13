<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../Button.svelte";
import Block from "../Block.svelte";

interface WizardStep {
	id: string;
	title: string;
	description?: string;
}

let {
	steps = [] as WizardStep[],
	currentStep = $bindable(0),
	onNext = undefined as (() => void) | undefined,
	onPrev = undefined as (() => void) | undefined,
	onSubmit = undefined as (() => void) | undefined,
	loading = false,
	class: className = "",
	stepContent,
}: {
	steps?: WizardStep[];
	currentStep?: number;
	onNext?: () => void;
	onPrev?: () => void;
	onSubmit?: () => void;
	loading?: boolean;
	class?: string;
	stepContent?: Snippet<[number]>;
} = $props();

let isFirst = $derived(currentStep === 0);
let isLast = $derived(currentStep === steps.length - 1);
let progress = $derived(((currentStep + 1) / steps.length) * 100);
</script>

<Block size="md" spacing="compact" class={className}>
  <div class="space-y-8">
    <!-- Step indicator -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        {#each steps as step, i}
          <div class="flex items-center gap-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full border-2 text-label-sm font-medium
                     {i < currentStep ? 'bg-primary text-primary-foreground border-primary' : ''}
                     {i === currentStep ? 'bg-primary text-primary-foreground border-primary' : ''}
                     {i > currentStep ? 'bg-muted text-muted-foreground border-border' : ''}"
            >
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span class="text-label-sm text-foreground hidden sm:inline">{step.title}</span>
          </div>
          {#if i < steps.length - 1}
            <div class="flex-1 h-px bg-border mx-2 hidden sm:block"></div>
          {/if}
        {/each}
      </div>
      <div class="h-1 bg-muted rounded-full overflow-hidden">
        <div class="h-full bg-primary transition-all duration-[--duration-fluid]" style="width: {progress}%"></div>
      </div>
    </div>

    <!-- Step content -->
    <div class="min-h-[200px]">
      <h2 class="text-title-2 text-foreground mb-2">{steps[currentStep]?.title}</h2>
      {#if steps[currentStep]?.description}
        <p class="text-body-md text-muted-foreground mb-6">{steps[currentStep].description}</p>
      {/if}
      {@render stepContent?.(currentStep)}
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-4 border-t border-border">
      <Button
        variant="ghost"
        onclick={onPrev}
        disabled={isFirst}
      >
        ← Previous
      </Button>
      {#if isLast}
        <Button {loading} onclick={onSubmit}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      {:else}
        <Button onclick={onNext}>
          Next →
        </Button>
      {/if}
    </div>
  </div>
</Block>
