<script lang="ts">
interface ReasoningStep {
	text: string;
	confidence?: number;
}

interface Props {
	steps?: ReasoningStep[];
	expanded?: boolean;
	onToggle?: () => void;
	class?: string;
}

let { steps = [], expanded = $bindable(true), onToggle, class: className = "" }: Props = $props();

function getConfidenceColor(confidence?: number): string {
	if (confidence === undefined) return "text-muted-foreground";
	if (confidence >= 0.9) return "text-green-600";
	if (confidence >= 0.7) return "text-yellow-600";
	return "text-red-600";
}
</script>

<div class="border border-border rounded-[--radius-lg] overflow-hidden {className}">
  <button
    class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50"
    onclick={() => { expanded = !expanded; onToggle?.(); }}
  >
    <span class="text-title-3 text-foreground">Reasoning</span>
    <span class="text-label-xs text-muted-foreground">{steps.length} steps</span>
  </button>
  
  {#if expanded}
    <div class="border-t border-border p-4 space-y-3">
      {#each steps as step, i}
        <div class="flex items-start gap-3">
          <span class="text-label-xs text-muted-foreground mt-0.5">{i + 1}.</span>
          <div class="flex-1">
            <p class="text-body-md text-foreground">{step.text}</p>
            {#if step.confidence !== undefined}
              <span class="text-label-xs {getConfidenceColor(step.confidence)}">
                {Math.round(step.confidence * 100)}% confidence
              </span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
