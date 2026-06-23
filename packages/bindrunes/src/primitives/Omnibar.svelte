<script lang="ts">
import { Command } from "bits-ui";
import type { OmnibarState } from "../../utils/useOmnibar.svelte";

let {
	state,
	placeholder = "Search commands, routes, memory...",
}: {
	state: OmnibarState;
	placeholder?: string;
} = $props();

function _select(opt: { action: () => void }) {
	state.close();
	opt.action();
}
</script>

{#if state.isOpen}
	<div
		class="fixed inset-0 z-50 flex justify-start pt-[10vh] bg-[--overlay-strong] backdrop-blur-[--blur-subtle]"
		role="dialog"
		aria-label="Command palette"
		aria-modal="true"
		tabindex="-1"
		onclick={() => state.close()}
		onkeydown={(e) => { if (e.key === 'Escape') state.close(); }}
	>
		<div class="w-full max-w-[650px] px-4" role="none" onclick={(e) => e.stopPropagation()}>
			<Command.Root
				class="rounded-[--radius] border border-primary/20 bg-card shadow-[--shadow-lg]"
			>
				<div class="flex items-center gap-3 px-4 py-3 border-b border-border">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground shrink-0">
						<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
					</svg>
					<Command.Input
						value={state.searchQuery}
						onValueChange={(q) => state.setQuery(q)}
						placeholder={placeholder}
						type="text"
						class="flex-1 bg-transparent border-none outline-none text-body-lg text-foreground"
					/>
					{#if state.isLoading}
						<span class="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-[--radius-pill]"></span>
					{/if}
				</div>

				<Command.List class="flex flex-col gap-1 p-2 max-h-[350px] overflow-y-auto">
					{#each state.filteredOptions as option, i}
						<Command.Item
							value={option.label}
							onSelect={() => _select(option)}
							class="flex items-center justify-between w-full px-4 py-3 rounded-[--radius] text-left transition-colors cursor-pointer focus:bg-muted data-[selected]:bg-muted"
						>
							<div>
								<span class="font-medium text-label-md text-foreground">{option.label}</span>
								{#if option.description}
									<span class="block text-body-sm mt-0.5 text-muted-foreground">{option.description}</span>
								{/if}
							</div>
							{#if option.category}
								<span class="text-label-sm font-semibold uppercase tracking-[--text-letter-spacing-wider] px-1.5 py-0.5 rounded-[--radius] text-primary bg-primary/10">{option.category}</span>
							{/if}
						</Command.Item>
					{/each}

					{#if state.searchQuery && state.filteredOptions.length === 0}
						<div class="py-8 text-center text-body-md text-muted-foreground">
							No results found for "{state.searchQuery}"
						</div>
					{/if}
				</Command.List>
			</Command.Root>
		</div>
	</div>
{/if}
