<script lang="ts">
interface Props {
	name: string;
	args?: unknown;
	result?: unknown;
	status?: "pending" | "completed" | "error";
	expanded?: boolean;
	onToggle?: () => void;
	class?: string;
}

let {
	name,
	args,
	result,
	status = "pending",
	expanded = $bindable(false),
	onToggle,
	class: className = "",
}: Props = $props();

const statusColors = {
	pending: "bg-yellow-500",
	completed: "bg-green-500",
	error: "bg-red-500",
};

function formatJSON(data: unknown): string {
	try {
		return JSON.stringify(data, null, 2);
	} catch {
		return String(data);
	}
}
</script>

<div class="border border-border rounded-[--radius-lg] overflow-hidden {className}">
	<button
		class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50"
		aria-expanded={expanded}
		aria-label="Toggle {name} details"
		onclick={() => {
			expanded = !expanded;
			onToggle?.();
		}}
	>
		<span class="w-2 h-2 rounded-[--radius-pill] {statusColors[status]}"></span>
		<span class="text-title-3 text-foreground">{name}</span>
		<span class="text-label-xs text-muted-foreground capitalize">{status}</span>
		<span class="ml-auto text-xs transition-transform {expanded ? 'rotate-90' : ''}">▶</span>
	</button>

	{#if expanded}
		<div class="border-t border-border p-4 space-y-3 bg-muted/20">
			{#if args}
				<div>
					<h4 class="text-label-sm text-muted-foreground mb-1">Arguments</h4>
					<pre class="text-body-sm bg-background border border-border rounded-[--radius-md] p-3 overflow-x-auto">{formatJSON(args)}</pre>
				</div>
			{/if}
			{#if result}
				<div>
					<h4 class="text-label-sm text-muted-foreground mb-1">Result</h4>
					<pre class="text-body-sm bg-background border border-border rounded-[--radius-md] p-3 overflow-x-auto">{formatJSON(result)}</pre>
				</div>
			{/if}
		</div>
	{/if}
</div>
