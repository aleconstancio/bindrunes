<script lang="ts">
import type { ConnectionStatus, CopilotContextLayer } from "./types";

let {
	contextLoaded,
	contextTokens,
	maxTokens = 10000,
	contextLayers,
	status,
	class: className = "",
}: {
	contextLoaded: boolean;
	contextTokens: number;
	maxTokens?: number;
	contextLayers: CopilotContextLayer[];
	status: ConnectionStatus;
	class?: string;
} = $props();
</script>

<div class="flex-1 overflow-y-auto p-4 {className}">
	{#if contextLoaded}
		<div class="space-y-4">
			<div>
				<h4 class="text-label-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Tokens Utilizados</h4>
				<div
					class="h-2 bg-muted rounded-full overflow-hidden"
					role="progressbar"
					aria-valuenow={contextTokens}
					aria-valuemin="0"
					aria-valuemax={maxTokens}
				>
					<div
						class="h-full bg-primary transition-all duration-300"
						style="width: {maxTokens > 0 ? Math.min((contextTokens / maxTokens) * 100, 100) : 0}%"
					></div>
				</div>
				<p class="text-label-sm text-muted-foreground mt-1">{contextTokens.toLocaleString()} / {maxTokens.toLocaleString()}</p>
			</div>

			<div>
				<h4 class="text-label-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Camadas</h4>
				<div class="space-y-2">
					{#each contextLayers as layer}
						<div class="flex items-center justify-between text-label-sm">
							<span class="text-foreground">{layer.name}</span>
							<span class="text-muted-foreground">{layer.tokens} tokens</span>
						</div>
					{/each}
				</div>
			</div>

			<div>
				<h4 class="text-label-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Status</h4>
				<div class="flex items-center gap-2 text-label-sm">
					<div class="w-2 h-2 rounded-full {status === 'connected' ? 'bg-success' : 'bg-destructive'}"></div>
					<span class="text-foreground">{status === 'connected' ? 'Conectado' : 'Desconectado'}</span>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-label-sm text-muted-foreground italic">Contexto não carregado</p>
	{/if}
</div>
