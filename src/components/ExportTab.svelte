<script lang="ts">
import Button from "./Button.svelte";

let {
	cssOutput = "",
	copied = false,
	oncopy,
	onapply,
}: {
	cssOutput?: string;
	copied?: boolean;
	oncopy?: () => void;
	onapply?: () => void;
} = $props();
</script>

<div class="space-y-4">
	<label class="text-label-md block text-muted-foreground">Generated CSS</label>
	<pre
		class="p-3 rounded text-mono-sm overflow-auto max-h-[400px] bg-muted text-foreground font-mono"
	><code>{cssOutput}</code></pre>

	<div class="flex gap-2">
		<Button onclick={onapply}>Apply Theme</Button>
		<Button variant="outline" onclick={oncopy}>
			{copied ? 'Copied!' : 'Copy CSS'}
		</Button>
	</div>
</div>
