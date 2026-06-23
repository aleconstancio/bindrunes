<script lang="ts">
interface Props {
	state?: "idle" | "thinking" | "executing" | "error";
	tokenUsage?: { prompt: number; completion: number };
	elapsedMs?: number;
	onCancel?: () => void;
	class?: string;
}

let { state = "idle", tokenUsage, elapsedMs, onCancel, class: className = "" }: Props = $props();

const stateColors = {
	idle: "bg-gray-400",
	thinking: "bg-blue-500",
	executing: "bg-green-500",
	error: "bg-red-500",
};

const stateLabels = {
	idle: "idle",
	thinking: "thinking",
	executing: "executing",
	error: "error",
};

const totalTokens = $derived(tokenUsage ? tokenUsage.prompt + tokenUsage.completion : 0);

const formattedTime = $derived(elapsedMs ? `${Math.round(elapsedMs / 1000)}s` : null);
</script>

<div class="flex items-center gap-4 {className}">
  <div class="flex items-center gap-2">
    <span class="w-2.5 h-2.5 rounded-[--radius-pill] {stateColors[state]} {state !== 'idle' ? 'animate-pulse' : ''}"></span>
    <span class="text-body-sm text-foreground">{stateLabels[state]}</span>
  </div>
  
  {#if tokenUsage}
    <div class="text-label-xs text-muted-foreground">
      <span class="font-medium">{totalTokens}</span> tokens
    </div>
  {/if}
  
  {#if formattedTime}
    <div class="text-label-xs text-muted-foreground">
      {formattedTime}
    </div>
  {/if}
  
  {#if onCancel && state !== "idle"}
    <button
      class="px-3 py-1 text-label-xs font-medium bg-destructive text-destructive-foreground 
             rounded-[--radius-md] hover:bg-destructive/90 transition-colors"
      onclick={onCancel}
    >
      Stop
    </button>
  {/if}
</div>
