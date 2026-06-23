<script lang="ts">
import type { DebateTurn } from "./types";

let {
	debateText,
	class: className = "",
}: {
	debateText?: string;
	class?: string;
} = $props();

const turns = $derived.by<DebateTurn[]>(() => {
	if (!debateText) return [];
	const list: DebateTurn[] = [];
	const lines = debateText.split("\n");
	let currentRound = 1;
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed) continue;
		if (trimmed.includes("[Analista - Turno")) {
			const roundMatch = trimmed.match(/Turno (\d+)/);
			const round = roundMatch ? Number.parseInt(roundMatch[1], 10) : currentRound;
			const typeMatch = trimmed.match(/Tipo: ([^,]+)/);
			const confMatch = trimmed.match(/Confiança: ([\d.]+)/);
			let justification = "";
			const justIdx = trimmed.indexOf("Justificativa:");
			if (justIdx !== -1) justification = trimmed.substring(justIdx + 14).trim();
			list.push({
				round,
				agent: "Analista",
				content: justification || trimmed,
				confidence: confMatch ? Number.parseFloat(confMatch[1]) : undefined,
				details: typeMatch ? typeMatch[1] : undefined,
			});
			currentRound = round;
		} else if (trimmed.includes("[Crítico - Turno")) {
			const roundMatch = trimmed.match(/Turno (\d+)/);
			const round = roundMatch ? Number.parseInt(roundMatch[1], 10) : currentRound;
			const appMatch = trimmed.match(/Aprovado: (true|false)/);
			let critiqueDetails = "";
			const detIdx = trimmed.indexOf("Detalhes:");
			if (detIdx !== -1) critiqueDetails = trimmed.substring(detIdx + 9).trim();
			list.push({
				round,
				agent: "Crítico",
				content: critiqueDetails || trimmed,
				approved: appMatch ? appMatch[1] === "true" : false,
			});
		}
	}
	return list;
});
</script>

<div class="space-y-4 font-sans text-body-sm {className}">
	<div class="flex items-center gap-2 border-b pb-2 border-border">
		<svg aria-hidden="true" class="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
		<span class="font-bold text-foreground">Painel de Debate AI (Analista + Crítico)</span>
	</div>

	{#if turns.length === 0}
		<p class="text-label-sm text-muted-foreground italic">Detalhamento do debate Analyst-Critic indisponível para este registro.</p>
	{:else}
		<div class="relative border-l-2 border-border pl-4 ml-2 space-y-6" role="list" aria-label="Histórico de debate IA">
			{#each turns as turn}
				<div class="relative group" role="listitem">
					<div class="absolute -left-[25px] top-1.5 h-3.5 w-3.5 rounded-[--radius-pill] border bg-background flex items-center justify-center
						{turn.agent === 'Analista' ? 'border-primary ring-2 ring-primary/20' :
						 turn.approved ? 'border-success ring-2 ring-success/20' : 'border-destructive ring-2 ring-destructive/20'}">
					</div>

					<div class="rounded-lg border p-4 transition-all duration-300 hover:shadow-md bg-card
						{turn.agent === 'Analista' ? 'border-primary/20' :
						 turn.approved ? 'border-success/20' : 'border-destructive/20'}">
						<div class="flex items-center justify-between">
							<span class="font-bold text-label-sm uppercase tracking-[--text-letter-spacing-wider]
								{turn.agent === 'Analista' ? 'text-primary' :
								 turn.approved ? 'text-success' : 'text-destructive'}">
								{turn.agent} • Rodada {turn.round}
							</span>

							{#if turn.agent === "Crítico"}
								<span class="inline-flex items-center gap-1 text-label-sm font-bold px-2 py-0.5 rounded-[--radius-pill]
									{turn.approved ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}">
									{#if turn.approved}
										<svg aria-hidden="true" class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
										Aprovado
									{:else}
										<svg aria-hidden="true" class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
										Divergência
									{/if}
								</span>
							{:else if turn.confidence !== undefined}
								<span class="text-label-sm font-bold text-muted-foreground">
									Confiança: <span class="text-primary font-bold">{Math.round(turn.confidence * 100)}%</span>
								</span>
							{/if}
						</div>

						{#if turn.details && turn.agent === "Analista"}
							<div class="mt-2 text-label-sm font-semibold text-muted-foreground">
								Classificação Proposta: <span class="bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 font-bold">{turn.details}</span>
							</div>
						{/if}

						<p class="mt-2 text-foreground leading-[--text-line-height-relaxed] text-label-sm font-medium whitespace-pre-line">
							{turn.content}
						</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
