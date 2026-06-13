<script lang="ts">
let {
	name = "",
	size = "",
	type = "file" as "file" | "image" | "video" | "audio" | "archive",
	onDownload = undefined as (() => void) | undefined,
	onRemove = undefined as (() => void) | undefined,
	class: className = "",
}: {
	name?: string;
	size?: string;
	type?: "file" | "image" | "video" | "audio" | "archive";
	onDownload?: () => void;
	onRemove?: () => void;
	class?: string;
} = $props();

const iconPaths: Record<string, string> = {
	file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
	image: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
	video:
		"M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
	audio: "M9 18V5l12-2v13 M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
	archive: "M21 8v13H3V8 M1 3h22v5H1z M10 12h4",
};
</script>

<div class="flex items-center gap-3 p-3 rounded-[--radius] border border-border bg-card {className}">
  <div class="flex h-10 w-10 items-center justify-center rounded bg-muted shrink-0">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground">
      <path d={iconPaths[type]} />
    </svg>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-label-md text-foreground truncate">{name}</p>
    {#if size}
      <p class="text-body-xs text-muted-foreground">{size}</p>
    {/if}
  </div>
  <div class="flex items-center gap-1 shrink-0">
    {#if onDownload}
      <button
        type="button"
        class="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        onclick={onDownload}
        aria-label="Download"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
      </button>
    {/if}
    {#if onRemove}
      <button
        type="button"
        class="p-1.5 rounded text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
        onclick={onRemove}
        aria-label="Remove"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      </button>
    {/if}
  </div>
</div>
