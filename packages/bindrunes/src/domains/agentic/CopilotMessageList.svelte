<script lang="ts">
import BouncingDots from "../../primitives/BouncingDots.svelte";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import CopilotSuggestionCard from "./CopilotSuggestionCard.svelte";
import type { ConnectionStatus, CopilotMessage, CopilotSuggestion } from "./types";

let {
	messages,
	streamingContent,
	status,
	suggestions,
	mode,
	onQuickAction,
	onDismissSuggestion,
	onActSuggestion,
	class: className = "",
}: {
	messages: CopilotMessage[];
	streamingContent: string;
	status: ConnectionStatus;
	suggestions: CopilotSuggestion[];
	mode: "item" | "global";
	onQuickAction: (message: string) => void;
	onDismissSuggestion?: (id: string) => void;
	onActSuggestion?: (id: string, action: CopilotSuggestion["actions"][0]) => void;
	class?: string;
} = $props();

const noop = () => {};

let messagesContainer: HTMLDivElement | null = $state(null);

let sanitizedMessages = $derived(
	messages.map((m) => ({
		...m,
		sanitizedContent: m.role === "agent" && m.content ? sanitizeHtml(m.content) : m.content,
	})),
);

let sanitizedStreaming = $derived(streamingContent ? sanitizeHtml(streamingContent) : "");

let formattedTimestamps = $derived(
	messages.map((m) =>
		m.timestamp
			? new Date(m.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
			: "",
	),
);

$effect(() => {
	if (messagesContainer && (messages.length > 0 || streamingContent)) {
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	}
});
</script>

{#if messages.length === 0 && !streamingContent && suggestions.length > 0}
	<div class="p-4 border-b border-border">
		<h3 class="text-label-sm font-bold uppercase tracking-[--text-letter-spacing-widest] text-muted-foreground mb-3">Sugestões</h3>
		<div class="space-y-2">
			{#each suggestions as sug (sug.id)}
				<CopilotSuggestionCard
					suggestion={sug}
					onDismiss={onDismissSuggestion ?? noop}
					onAct={onActSuggestion ?? noop}
				/>
			{/each}
		</div>
	</div>
{/if}

<div
	bind:this={messagesContainer}
	class="flex-1 overflow-y-auto p-6 {className}"
	role="log"
	aria-label="Conversa com o copiloto"
	aria-live="polite"
>
	{#if messages.length === 0 && !streamingContent}
		<div class="h-full flex items-center justify-center">
			<div class="text-center max-w-md">
				<div class="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50">
					<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
				</div>
				<h2 class="text-headline-2 font-bold text-foreground mb-2">
					{mode === "item" ? "Como posso ajudar com este caso?" : "Como posso ajudar?"}
				</h2>
				<p class="text-body-sm text-muted-foreground mb-6">
					{mode === "item"
						? "Pergunte sobre a publicação, prazo ou minuta deste caso."
						: "Pergunte sobre seus casos, prazos e publicações."}
				</p>
				{#if mode === "global"}
					<div class="flex flex-wrap gap-2 justify-center">
						<button
							type="button"
						class="inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted px-3 py-1.5 text-body-sm font-medium"
						onclick={() => onQuickAction("Quais são os prazos desta semana?")}
					>
						Prazos da semana
					</button>
					<button
						type="button"
						class="inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted px-3 py-1.5 text-body-sm font-medium"
						onclick={() => onQuickAction("Me dê um resumo dos casos ativos")}
					>
						Resumo de casos
					</button>
					<button
						type="button"
						class="inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted px-3 py-1.5 text-body-sm font-medium"
						onclick={() => onQuickAction("Há citações não lidas?")}
						>
							Citações pendentes
						</button>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="max-w-3xl mx-auto space-y-4">
			{#each sanitizedMessages as message, idx (message.id)}
				<div class="flex gap-3 {message.role === 'user' ? 'flex-row-reverse' : ''}">
					<div class="shrink-0 w-7 h-7 rounded-[--radius-pill] flex items-center justify-center
						{message.role === 'agent' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}">
						{#if message.role === "agent"}
							<svg aria-hidden="true" class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
						{:else}
							<svg aria-hidden="true" class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
						{/if}
					</div>
					<div class="flex-1 max-w-[85%]">
					<div class="rounded-xl px-4 py-3 text-body-sm leading-[--text-line-height-relaxed]
						{message.role === 'agent' ? 'bg-card border border-border' : 'bg-primary text-primary-foreground'}">
							{#if message.content}
								{#if message.role === "agent"}
									<div class="prose prose-sm prose-slate dark:prose-invert max-w-none">{@html message.sanitizedContent}</div>
								{:else}
									<div class="whitespace-pre-wrap">{message.content}</div>
								{/if}
							{/if}
						</div>
						<div class="text-label-sm text-muted-foreground mt-1 px-1
							{message.role === 'user' ? 'text-right' : ''}">
							{formattedTimestamps[idx]}
						</div>
					</div>
				</div>
			{/each}

			{#if streamingContent}
				<div class="flex gap-3">
					<div class="shrink-0 w-7 h-7 rounded-[--radius-pill] bg-primary/10 flex items-center justify-center text-primary">
						<svg aria-hidden="true" class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
					</div>
				<div class="rounded-xl px-4 py-3 text-body-sm bg-card border border-border">
					<div class="prose prose-sm prose-slate dark:prose-invert max-w-none">{@html sanitizedStreaming}</div>
					</div>
				</div>
			{:else if status === "connected" && messages.length > 0 && messages[messages.length - 1].role === "user"}
				<div class="flex gap-3">
					<div class="shrink-0 w-7 h-7 rounded-[--radius-pill] bg-primary/10 flex items-center justify-center">
						<svg aria-hidden="true" class="w-3.5 h-3.5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
					</div>
					<div class="rounded-xl px-4 py-3 text-body-sm bg-card border border-border">
					<div class="flex items-center gap-2 text-muted-foreground">
						<BouncingDots />
						<span class="text-label-sm">Pensando...</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
