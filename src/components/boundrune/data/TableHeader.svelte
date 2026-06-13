<script lang="ts">
import type { Snippet } from "svelte";
import type { Column } from "../../../shared-types";

let {
	columns = [] as Column[],
	sort = null as { key: string; direction: "asc" | "desc" } | null,
	onSort = undefined as
		| ((sort: { key: string; direction: "asc" | "desc" } | null) => void)
		| undefined,
	actions,
	class: className = "",
}: {
	columns?: Column[];
	sort?: { key: string; direction: "asc" | "desc" } | null;
	onSort?: (sort: { key: string; direction: "asc" | "desc" } | null) => void;
	actions?: Snippet;
	class?: string;
} = $props();

function toggleSort(key: string) {
	if (!sort || sort.key !== key) {
		onSort?.({ key, direction: "asc" });
	} else if (sort.direction === "asc") {
		onSort?.({ key, direction: "desc" });
	} else {
		onSort?.(null);
	}
}
</script>

<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 {className}">
  <div class="flex items-center gap-2 flex-wrap">
    {#each columns as col}
      {#if col.sortable}
        <th
          scope="col"
          class="inline-flex items-center gap-1 px-3 py-1.5 text-mono-xs font-bold uppercase
                 text-muted-foreground hover:text-foreground transition-colors
                 rounded-[--radius] hover:bg-muted cursor-pointer bg-transparent border-none"
          aria-sort={sort?.key === col.key ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}
          onclick={() => toggleSort(col.key)}
        >
          {col.label}
          {#if sort?.key === col.key}
            <span aria-hidden="true">{sort.direction === "asc" ? "↑" : "↓"}</span>
          {/if}
        </th>
      {:else}
        <span class="px-3 py-1.5 text-mono-xs font-bold uppercase text-muted-foreground">
          {col.label}
        </span>
      {/if}
    {/each}
  </div>
  {#if actions}
    <div class="flex items-center gap-2">
      {@render actions()}
    </div>
  {/if}
</div>
