<script lang="ts">
let {
	text,
	onHighlightCitation,
	class: className = "",
}: {
	text: string;
	onHighlightCitation?: (layer: string, id: string) => void;
	class?: string;
} = $props();

const segments = $derived.by(() => {
	if (!text) return [];
	const regex = /source:([\w-]+):([\w:-]+)/g;
	const parts: Array<{ type: string; value: string; layer?: string; id?: string }> = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null = regex.exec(text);
	while (match !== null) {
		if (match.index > lastIndex) {
			parts.push({ type: "text", value: text.substring(lastIndex, match.index) });
		}
		parts.push({ type: "citation", layer: match[1], id: match[2], value: match[0] });
		lastIndex = regex.lastIndex;
		match = regex.exec(text);
	}
	if (lastIndex < text.length) {
		parts.push({ type: "text", value: text.substring(lastIndex) });
	}
	return parts;
});
</script>

<span class={className}>
	{#each segments as seg}
		{#if seg.type === "text"}
			{seg.value}
		{:else}
			<button
				type="button"
				onclick={() => { if (seg.layer && seg.id) onHighlightCitation(seg.layer, seg.id); }}
				class="inline-flex items-center gap-1.5 rounded bg-primary/10 hover:bg-primary/20 px-2 py-0.5 text-label-sm font-bold text-primary transition-colors border border-primary/20 font-mono shadow-sm cursor-pointer align-middle select-none mx-0.5 hover:scale-105 active:scale-95 transform duration-150"
			>
				<svg aria-hidden="true" class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				{seg.value}
			</button>
		{/if}
	{/each}
</span>
