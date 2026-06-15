<script lang="ts">
import type { Snippet } from "svelte";
import { useClipboard } from "../utils/useClipboard.svelte";

interface Props {
	code: string;
	language?: string;
	title?: string;
	children?: Snippet;
}

let { code, language = "svelte", title, children }: Props = $props();
const { copied, copy } = useClipboard();
</script>

<div class="rounded-[--radius-md] border border-border overflow-hidden">
  {#if title}
    <div class="flex items-center justify-between px-3 py-1.5 bg-muted border-b border-border">
      <span class="text-label-xs text-muted-foreground font-mono">{title}</span>
      <button
        type="button"
        onclick={() => copy(code)}
        class="text-label-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  {/if}
  <pre class="p-4 bg-muted/50 overflow-x-auto text-body-sm font-mono"><code>{code}</code></pre>
  {#if !title}
    <div class="flex justify-end px-3 py-1.5 bg-muted border-t border-border">
      <button
        type="button"
        onclick={() => copy(code)}
        class="text-label-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  {/if}
</div>
