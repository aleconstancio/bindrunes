<script lang="ts">
import { Download, FileJson, FileSpreadsheet, FileText } from "lucide-svelte";
import Button from "../../primitives/Button.svelte";
import DropdownMenu from "../../primitives/DropdownMenu.svelte";

let {
	onExport = undefined as ((format: string) => void) | undefined,
	class: className = "",
}: {
	onExport?: (format: string) => void;
	class?: string;
} = $props();

const items = [
	{ value: "csv", label: "Export as CSV" },
	{ value: "json", label: "Export as JSON" },
	{ value: "pdf", label: "Export as PDF" },
	{ value: "xlsx", label: "Export as Excel" },
];
</script>

<DropdownMenu
	{items}
	onSelect={(format) => onExport?.(format)}
>
  {#snippet trigger()}
    <Button variant="outline" size="sm">
      <Download class="h-4 w-4 mr-2" />
      Export
    </Button>
  {/snippet}
</DropdownMenu>
