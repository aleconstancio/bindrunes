<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../Button.svelte";
import Block from "../Block.svelte";
import type { CommentItem } from "../types";

let {
	items = [] as CommentItem[],
	onSubmit = undefined as ((text: string) => void | Promise<void>) | undefined,
	placeholder = "Write a comment...",
	submitLabel = "Post comment",
	textareaLabel = "Write a comment",
	class: className = "",
	commentSnippet = undefined as Snippet<[{ item: CommentItem }]> | undefined,
}: {
	items?: CommentItem[];
	onSubmit?: (text: string) => void | Promise<void>;
	placeholder?: string;
	submitLabel?: string;
	textareaLabel?: string;
	class?: string;
	commentSnippet?: Snippet<[{ item: CommentItem }]>;
} = $props();

let newComment = $state("");
let _submitting = $state(false);

async function _handleSubmit() {
	if (!newComment.trim() || !onSubmit) return;
	_submitting = true;
	try {
		await onSubmit(newComment.trim());
		newComment = "";
	} finally {
		_submitting = false;
	}
}
</script>

<Block size="md" spacing="normal" class={className}>
  <div class="space-y-8">
    <h3 class="text-title-2 text-foreground">Comments</h3>

    {#if onSubmit}
      <div class="flex gap-3">
        <label class="sr-only" for="new-comment">{textareaLabel}</label>
        <textarea
          id="new-comment"
          bind:value={newComment}
          placeholder={placeholder}
          rows={3}
          class="flex-1 rounded-[--radius] border border-border bg-background px-3 py-2 text-body-md resize-none"
        ></textarea>
      </div>
      <div class="flex justify-end">
        <Button onclick={handleSubmit} loading={submitting} disabled={!newComment.trim()}>
          {submitLabel}
        </Button>
      </div>
    {/if}

    <div class="space-y-6">
      {#each items as item}
        {#if commentSnippet}
          {@render commentSnippet({ item })}
        {:else}
          <div class="flex gap-3">
            {#if item.avatar}
              <img
                src={item.avatar}
                alt={item.author}
                class="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            {:else}
              <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span class="text-mono-xs text-muted-foreground">{item.author[0]?.toUpperCase()}</span>
              </div>
            {/if}
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-label-md text-foreground font-semibold">{item.author}</span>
                {#if item.date}
                  <span class="text-body-xs text-muted-foreground">{item.date}</span>
                {/if}
              </div>
              <p class="text-body-md text-muted-foreground mt-1">{item.content}</p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</Block>
