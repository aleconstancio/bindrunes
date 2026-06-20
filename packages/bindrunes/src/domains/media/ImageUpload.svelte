<script lang="ts">
import { Upload, X } from "lucide-svelte";
import Button from "../../primitives/Button.svelte";

let {
	accept = "image/*",
	maxSize = 10 * 1024 * 1024,
	onUpload = undefined as ((file: File) => void) | undefined,
	onError = undefined as ((error: string) => void) | undefined,
	class: className = "",
}: {
	accept?: string;
	maxSize?: number;
	onUpload?: (file: File) => void;
	onError?: (error: string) => void;
	class?: string;
} = $props();

let dragOver = $state(false);
let preview = $state<string | null>(null);
let file = $state<File | null>(null);
let uploading = $state(false);

function validateFile(f: File): boolean {
	if (maxSize && f.size > maxSize) {
		onError?.(`File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`);
		return false;
	}
	return true;
}

function handleDrop(e: DragEvent) {
	e.preventDefault();
	dragOver = false;
	const droppedFile = e.dataTransfer?.files[0];
	if (droppedFile && validateFile(droppedFile)) selectFile(droppedFile);
}

function handleDragOver(e: DragEvent) {
	e.preventDefault();
	dragOver = true;
}

function handleDragLeave() {
	dragOver = false;
}

function handleFileSelect(e: Event) {
	const input = e.target as HTMLInputElement;
	const selectedFile = input.files?.[0];
	if (selectedFile && validateFile(selectedFile)) selectFile(selectedFile);
}

function selectFile(f: File) {
	file = f;
	const reader = new FileReader();
	reader.onload = () => (preview = reader.result as string);
	reader.readAsDataURL(f);
}

function clear() {
	file = null;
	preview = null;
}

async function upload() {
	if (!file || !onUpload) return;
	uploading = true;
	try {
		onUpload(file);
		clear();
	} finally {
		uploading = false;
	}
}
</script>

<div class="space-y-3 {className}">
  {#if preview}
    <div class="relative">
      <img src={preview} alt="Preview" class="w-full max-h-64 object-cover rounded-[--radius] border border-border" />
      <button
        type="button"
        class="absolute top-2 right-2 p-1 rounded-full bg-background/80 text-foreground hover:bg-background cursor-pointer"
        onclick={clear}
        aria-label="Remove image"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
    <Button fullWidth onclick={upload} loading={uploading}>
      {uploading ? 'Uploading...' : 'Upload'}
    </Button>
  {:else}
    <label
      class="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[--radius] cursor-pointer transition-colors
             {dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}"
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
      ondrop={handleDrop}
    >
      <Upload class="h-8 w-8 text-muted-foreground mb-2" />
      <span class="text-body-sm text-muted-foreground">Click or drag to upload</span>
      <input type="file" {accept} class="hidden" onchange={handleFileSelect} />
    </label>
  {/if}
</div>
