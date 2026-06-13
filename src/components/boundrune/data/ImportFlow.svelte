<script lang="ts">
import { FileSpreadsheet, Upload } from "lucide-svelte";
import type { Snippet } from "svelte";
import Button from "../../Button.svelte";
import Card from "../../Card.svelte";
import Dialog from "../../Dialog.svelte";
import Block from "../Block.svelte";

let {
	open = $bindable(false),
	accept = ".csv,.json",
	onUpload = undefined as ((file: File) => void | Promise<void>) | undefined,
	loading = false,
	preview = undefined as Snippet | undefined,
	class: className = "",
}: {
	open?: boolean;
	accept?: string;
	onUpload?: (file: File) => void | Promise<void>;
	loading?: boolean;
	preview?: Snippet;
	class?: string;
} = $props();

let file = $state<File | null>(null);
let dragOver = $state(false);

function handleDrop(e: DragEvent) {
	e.preventDefault();
	dragOver = false;
	const droppedFile = e.dataTransfer?.files[0];
	if (droppedFile) file = droppedFile;
}

function handleFileSelect(e: Event) {
	const input = e.target as HTMLInputElement;
	const selectedFile = input.files?.[0];
	if (selectedFile) file = selectedFile;
}

async function handleUpload() {
	if (file && onUpload) {
		await onUpload(file);
		file = null;
		open = false;
	}
}
</script>

<Dialog bind:open title="Import Data" size="lg">
  <div class="space-y-4">
    {#if !file}
      <div
        class="border-2 border-dashed rounded-[--radius] p-8 text-center cursor-pointer transition-colors
               {dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}"
        role="button"
        tabindex="0"
        ondragover={(e) => { e.preventDefault(); dragOver = true; }}
        ondragleave={() => dragOver = false}
        ondrop={handleDrop}
        onclick={() => document.getElementById('file-input')?.click()}
        onkeydown={(e) => { if (e.key === 'Enter') document.getElementById('file-input')?.click(); }}
      >
        <Upload class="h-10 w-10 mx-auto text-muted-foreground mb-3" />
        <p class="text-body-md text-foreground font-medium">Drop your file here or click to browse</p>
        <p class="text-body-sm text-muted-foreground mt-1">Supports {accept} files</p>
        <input id="file-input" type="file" {accept} class="hidden" onchange={handleFileSelect} />
      </div>
    {:else}
      <Card padding>
        <div class="flex items-center gap-3">
          <FileSpreadsheet class="h-8 w-8 text-primary" />
          <div>
            <p class="text-label-md text-foreground">{file.name}</p>
            <p class="text-body-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      </Card>

      {#if preview}
        {@render preview()}
      {/if}
    {/if}
  </div>

  {#snippet footer()}
    <div class="flex justify-end gap-3">
      <Button variant="ghost" onclick={() => { file = null; open = false; }}>Cancel</Button>
      {#if file}
        <Button {loading} onclick={handleUpload}>
          {loading ? 'Importing...' : 'Import'}
        </Button>
      {/if}
    </div>
  {/snippet}
</Dialog>
