<script lang="ts">
import { Send } from "lucide-svelte";
import Button from "../../Button.svelte";

let {
	placeholder = "Type a message...",
	onSend = undefined as ((message: string) => void) | undefined,
	disabled = false,
	class: className = "",
}: {
	placeholder?: string;
	onSend?: (message: string) => void;
	disabled?: boolean;
	class?: string;
} = $props();

let value = $state("");

function handleSend() {
	if (!value.trim() || disabled) return;
	onSend?.(value.trim());
	value = "";
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Enter" && !e.shiftKey) {
		e.preventDefault();
		handleSend();
	}
}
</script>

<div class="flex items-end gap-2 p-4 border-t border-border {className}">
  <label class="sr-only" for="chat-input">{placeholder}</label>
  <textarea
    id="chat-input"
    bind:value
    {placeholder}
    {disabled}
    rows={1}
    class="flex-1 rounded-[--radius] border border-border bg-background px-3 py-2 text-body-md text-foreground resize-none
           focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
    onkeydown={handleKeydown}
  ></textarea>
  <Button
    size="sm"
    disabled={disabled || !value.trim()}
    aria-label="Send message"
    onclick={handleSend}
  >
    <Send class="h-4 w-4" />
  </Button>
</div>
