<script lang="ts">
import type { CopilotChain } from "./types";

let {
	chain,
	onContinue,
	onCancel,
	class: className = "",
}: {
	chain: CopilotChain;
	onContinue: (chainName: string) => void;
	onCancel: (chainName: string) => void;
	class?: string;
} = $props();
</script>

{#if chain && chain.status !== "idle"}
	<div class="p-3 border-b border-border bg-muted/30 {className}">
		<div class="flex items-center justify-between mb-2" role="status" aria-live="polite">
			<span class="text-label-sm font-bold text-foreground">
				{#if chain.status === "running"}
					Executando: {chain.name}
				{:else if chain.status === "waiting_gate"}
					Aguardando aprovação
			{:else if chain.status === "done"}
				Concluído: {chain.name}
			{:else if chain.status === "error"}
				Erro: {chain.name}
			{/if}
			</span>
		{#if chain.status === "running"}
			<svg aria-hidden="true" class="w-3 h-3 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
		{:else if chain.status === "error"}
			<svg aria-hidden="true" class="w-3 h-3 text-destructive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
		{/if}
		</div>

		{#if chain.steps.length > 0}
		<ul class="space-y-1.5">
			{#each chain.steps as step}
				<li class="flex items-center gap-2 text-[11px]">
						{#if step.status === "done"}
							<svg aria-hidden="true" class="w-2.5 h-2.5 text-success shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
						{:else if step.status === "executing"}
							<svg aria-hidden="true" class="w-2.5 h-2.5 animate-spin text-primary shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
						{:else if step.status === "error"}
							<svg aria-hidden="true" class="w-2.5 h-2.5 text-destructive shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						{:else}
							<svg aria-hidden="true" class="w-2.5 h-2.5 text-muted-foreground shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
						{/if}
						<span class="{step.status === 'done' ? 'text-muted-foreground' : step.status === 'executing' ? 'text-foreground font-medium' : 'text-muted-foreground'}">
							{step.description || step.tool}
						</span>
				</li>
			{/each}
		</ul>
		{/if}

		{#if chain.status === "waiting_gate"}
			<div class="flex gap-2 mt-3">
				<button
					type="button"
					class="flex-1 h-7 text-label-sm inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 font-medium"
					onclick={() => onContinue(chain.name)}
				>
					<svg aria-hidden="true" class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
					Continuar
				</button>
				<button
					type="button"
					class="h-7 text-label-sm inline-flex items-center justify-center rounded-md hover:bg-muted px-3 py-1 font-medium text-muted-foreground"
					onclick={() => onCancel(chain.name)}
				>
					Parar
				</button>
			</div>
		{/if}
	</div>
{/if}
