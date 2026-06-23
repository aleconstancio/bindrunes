<script lang="ts">
import type { ConnectionStatus, ToolCategory } from "./types";

let {
	toolCategories,
	activeCategory,
	status,
	onSelectCategory,
	onSendToolCall,
	class: className = "",
}: {
	toolCategories: ToolCategory[];
	activeCategory: string;
	status: ConnectionStatus;
	onSelectCategory: (categoryId: string) => void;
	onSendToolCall: (toolId: string, params: Record<string, unknown>) => void;
	class?: string;
} = $props();

const currentTools = $derived(toolCategories.find((c) => c.id === activeCategory)?.tools || []);
</script>

<div class="flex gap-1 p-2 border-b border-border {className}">
	{#each toolCategories as category}
		<button
			type="button"
			class="text-label-sm font-bold px-2 py-1 rounded-md transition-colors cursor-pointer
				{activeCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
			onclick={() => onSelectCategory(category.id)}
		>
			{category.label}
		</button>
	{/each}
</div>

<div class="flex-1 overflow-y-auto p-2">
	<div class="space-y-2">
		{#each currentTools as tool}
			<button
				type="button"
				class="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
				onclick={() => onSendToolCall(tool.id, tool.params)}
				disabled={status !== "connected"}
			>
				<div class="flex items-center gap-3">
					<div class="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
						<div class="w-3.5 h-3.5 text-primary">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
						</div>
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-body-sm font-medium text-foreground truncate">{tool.label}</p>
						<p class="text-label-sm text-muted-foreground truncate">{tool.description}</p>
					</div>
				</div>
			</button>
		{/each}
	</div>
</div>
