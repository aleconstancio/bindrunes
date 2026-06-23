<script lang="ts">
import type { CopilotSuggestion, RiskLevel } from "./types";

let {
	suggestion,
	onDismiss,
	onAct,
	class: className = "",
}: {
	suggestion: CopilotSuggestion;
	onDismiss: (id: string) => void;
	onAct: (id: string, action: CopilotSuggestion["actions"][0]) => void;
	class?: string;
} = $props();

const riskConfig: Record<RiskLevel, { bg: string; color: string }> = {
	critical: { bg: "bg-destructive/10 border-destructive/20", color: "text-destructive" },
	high: { bg: "bg-warning/10 border-warning/20", color: "text-warning" },
	medium: { bg: "bg-status-info/10 border-status-info/20", color: "text-status-info" },
	low: { bg: "bg-muted border-border", color: "text-muted-foreground" },
};

const config = $derived(riskConfig[suggestion.risk]);
</script>

<div class="p-3 rounded-xl border {config.bg} transition-all {className}">
	<div class="flex items-start justify-between gap-2">
		<div class="flex items-start gap-2">
			<div class="mt-0.5 shrink-0 {config.color}">
				{#if suggestion.risk === "critical" || suggestion.risk === "high"}
					<svg aria-hidden="true" class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				{:else}
					<svg aria-hidden="true" class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
				{/if}
			</div>
			<div>
				<p class="text-label-sm font-bold text-foreground">{suggestion.title}</p>
				<p class="text-label-sm text-muted-foreground mt-0.5">{suggestion.description}</p>
			</div>
		</div>
		<button
			type="button"
			class="text-muted-foreground hover:text-foreground shrink-0"
			onclick={() => onDismiss(suggestion.id)}
			aria-label="Dispensar sugestão"
		>
			<svg aria-hidden="true" class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
		</button>
	</div>

	{#if suggestion.actions.length > 0}
		<div class="flex gap-1.5 mt-2">
			{#each suggestion.actions as action}
				<button
					type="button"
					class="text-label-sm font-bold px-2 py-1 rounded-md bg-background border border-border hover:bg-muted transition-colors cursor-pointer"
					onclick={() => onAct(suggestion.id, action)}
				>
					{action.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
