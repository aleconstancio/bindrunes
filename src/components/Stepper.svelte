<script lang="ts">
let {
	steps = [] as { id: string; label: string }[],
	currentStep = "" as string,
	completedSteps = new Set<string>(),
	class: className = "",
}: {
	steps?: { id: string; label: string }[];
	currentStep?: string;
	completedSteps?: Set<string>;
	class?: string;
} = $props();
</script>

<div class="flex items-center gap-2 {className}" role="list" aria-label="Progress">
  {#each steps as step, i}
    {@const isActive = step.id === currentStep}
    {@const isCompleted = completedSteps.has(step.id)}

    <div class="flex items-center gap-2" role="listitem">
      {#if i > 0}
        <div
          class="h-px w-8 transition-colors"
          style="background: {isCompleted ? 'var(--primary)' : 'var(--border)'};"
          aria-hidden="true"
        ></div>
      {/if}

      <div class="flex items-center gap-2">
        <div
          class="h-7 w-7 rounded-full flex items-center justify-center text-body-sm font-semibold transition-colors"
          style="background: {isCompleted || isActive ? 'var(--primary)' : 'var(--muted)'};
                 color: {isCompleted || isActive ? 'var(--primary-foreground)' : 'var(--muted-foreground)'};"
          aria-current={isActive ? "step" : undefined}
        >
          {#if isCompleted}
            ✓
          {:else}
            {i + 1}
          {/if}
        </div>
        <span
          class="text-label-md font-medium"
          style="color: {isActive ? 'var(--foreground)' : 'var(--muted-foreground)'};"
        >
          {step.label}
        </span>
      </div>
    </div>
  {/each}
</div>
