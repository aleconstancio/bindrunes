<script lang="ts">
type FileEntry = {
	file: File;
	preview?: string;
	progress: number;
	status: "pending" | "uploading" | "done" | "error";
	error?: string;
};

let {
	accept = undefined as string[] | undefined,
	maxFiles = 10,
	maxSize = 10 * 1024 * 1024,
	multiple = true,
	onUpload = undefined as ((files: File[]) => Promise<void>) | undefined,
	class: className = "",
	dropzone = undefined as import("svelte").Snippet | undefined,
}: {
	accept?: string[];
	maxFiles?: number;
	maxSize?: number;
	multiple?: boolean;
	onUpload?: (files: File[]) => Promise<void>;
	class?: string;
	dropzone?: import("svelte").Snippet;
} = $props();

let files = $state<FileEntry[]>([]);
let _dragover = $state(false);
let inputEl = $state<HTMLInputElement>();

function addFiles(newFiles: FileList | File[]) {
	const incoming = Array.from(newFiles);
	const filtered = incoming
		.filter((f) => !accept || accept.some((type) => f.type.match(type.replace("*", ".*"))))
		.filter((f) => f.size <= maxSize)
		.slice(0, maxFiles - files.length);

	files = [
		...files,
		...filtered.map((file) => ({
			file,
			preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
			progress: 0,
			status: "pending" as const,
		})),
	];
}

function _removeFile(index: number) {
	if (files[index].preview) URL.revokeObjectURL(files[index].preview);
	files = files.filter((_, i) => i !== index);
}

function _handleDrop(e: DragEvent) {
	e.preventDefault();
	_dragover = false;
	if (e.dataTransfer?.files) addFiles(e.dataTransfer.files);
}

function _handleDragOver(e: DragEvent) {
	e.preventDefault();
	_dragover = true;
}

function _handleDragLeave() {
	_dragover = false;
}

function _handleClick() {
	inputEl?.click();
}

function _handleKeydown(e: KeyboardEvent) {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		inputEl?.click();
	}
}

function _handleFileInput(e: Event) {
	const target = e.target as HTMLInputElement;
	if (target.files) addFiles(target.files);
}
</script>

<div
  class="relative border-2 border-dashed rounded-[--radius] p-8 text-center transition-colors cursor-pointer {className}"
  class:border-[--primary]={dragover}
  style={dragover ? 'background: oklch(from var(--primary) l c h / 0.05); border-color: var(--primary);' : 'border-color: var(--border);'}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  role="button"
  tabindex="0"
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  <input
    bind:this={inputEl}
    type="file"
    accept={accept?.join(',')}
    {multiple}
    class="hidden"
    onchange={handleFileInput}
  />
  {#if dropzone}
    {@render dropzone()}
  {:else}
    <p class="text-[--muted-foreground]">Drag files here or click to browse</p>
  {/if}
</div>

{#if files.length > 0}
  <div class="mt-4 space-y-2">
    {#each files as entry, i}
      <div class="flex items-center gap-3 p-3 rounded-[--radius] border border-border bg-card">
        {#if entry.preview}
          <img src={entry.preview} alt="" class="h-10 w-10 rounded object-cover" />
        {:else}
          <span
            class="h-10 w-10 rounded flex items-center justify-center text-label-sm bg-muted font-mono"
          >
            {entry.file.name.split('.').pop()?.toUpperCase()}
          </span>
        {/if}
        <div class="flex-1 min-w-0">
          <p class="text-body-md truncate text-foreground">{entry.file.name}</p>
          <p class="text-body-sm text-muted-foreground">{(entry.file.size / 1024).toFixed(1)} KB</p>
        </div>
        {#if entry.status === 'uploading'}
          <Progress value={entry.progress} class="w-24" />
        {/if}
        <button
          onclick={() => removeFile(i)}
          class="transition-colors text-muted-foreground hover:text-destructive cursor-pointer bg-transparent border-none text-[1.2rem]"
          aria-label="Remove file"
        >
          ×
        </button>
      </div>
    {/each}
  </div>
{/if}
