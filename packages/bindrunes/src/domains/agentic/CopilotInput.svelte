<script lang="ts">
import type { ConnectionStatus } from "./types";

let {
	chatInput = $bindable(""),
	status,
	mode,
	onSend,
	class: className = "",
}: {
	chatInput?: string;
	status: ConnectionStatus;
	mode: "item" | "global";
	onSend: (message: string) => void;
	class?: string;
} = $props();

function handleSubmit(e: Event) {
	e.preventDefault();
	if (chatInput.trim() && status === "connected") {
		onSend(chatInput);
	}
}
</script>

<div class="border-t border-border bg-card p-4 {className}">
	<form class="max-w-3xl mx-auto flex items-center gap-3" onsubmit={handleSubmit}>
		<input
			bind:value={chatInput}
			type="text"
			placeholder={status !== "connected"
				? "Conectando..."
				: mode === "item"
					? "Pergunte sobre o caso..."
					: "Pergunte sobre seus casos, prazos ou publicações..."}
			disabled={status !== "connected"}
			maxlength={4000}
			class="flex-1 px-4 py-3 text-body-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
			aria-label="Mensagem para o copiloto"
		/>
		<button
			type="submit"
			disabled={!chatInput.trim() || status !== "connected"}
			class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 text-body-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
			aria-label="Enviar mensagem"
		>
			<svg aria-hidden="true" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
		</button>
	</form>
	{#if chatInput.length > 3500}
		<p class="text-label-sm text-muted-foreground mt-1 text-right">{chatInput.length} / 4000</p>
	{/if}
</div>
