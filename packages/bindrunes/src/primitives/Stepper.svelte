<script lang="ts">
import type { StepperStep } from "./stepper-types";

export type { StepperStep };

let {
	steps = [] as StepperStep[],
	currentStep = "" as string,
	completedSteps = new Set<string>(),
	class: className = "",
}: {
	steps?: StepperStep[];
	currentStep?: string;
	completedSteps?: Set<string>;
	class?: string;
} = $props();
</script>

<div class="flex items-center gap-2 {className}" role="list" aria-label="Progress">
  <span class="sr-only" aria-live="polite">
    {#if currentStep}
      Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}: {steps.find(s => s.id === currentStep)?.label}
    {:else}
      Step 0 of {steps.length}
    {/if}
  </span>
  {#each steps as step, i}
    {@const isActive = step.id === currentStep}
    {@const isCompleted = completedSteps.has(step.id)}

    <div class="flex items-center gap-2" role="listitem">
      {#if i > 0}
        <div
          class="h-px w-8 transition-colors {isCompleted ? 'bg-primary' : 'bg-border'}"
          aria-hidden="true"
        ></div>
      {/if}

      <div class="flex items-center gap-2">
        <div
          class="h-7 w-7 rounded-full flex items-center justify-center text-body-sm font-semibold transition-colors
                 {isCompleted || isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}"
          aria-current={isActive ? "step" : undefined}
        >
          {#if isCompleted}
            ✓
          {:else}
            {i + 1}
          {/if}
        </div>
        <span
          class="text-label-md font-medium {isActive ? 'text-foreground' : 'text-muted-foreground'}"
        >
          {step.label}
        </span>
      </div>
    </div>
  {/each}
</div>
