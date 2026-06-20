<script lang="ts">
import Input from "../../primitives/Input.svelte";
import Select from "../../primitives/Select.svelte";

let {
	searchValue = $bindable(""),
	searchPlaceholder = "Search...",
	filters = [] as { key: string; label: string; options: { label: string; value: string }[] }[],
	activeFilters = $bindable({} as Record<string, string>),
	onFilterChange = undefined as ((key: string, value: string) => void) | undefined,
	class: className = "",
}: {
	searchValue?: string;
	searchPlaceholder?: string;
	filters?: { key: string; label: string; options: { label: string; value: string }[] }[];
	activeFilters?: Record<string, string>;
	onFilterChange?: (key: string, value: string) => void;
	class?: string;
} = $props();
</script>

<div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 {className}">
  <div class="relative w-full sm:w-64">
    <Input
      bind:value={searchValue}
      placeholder={searchPlaceholder}
    />
  </div>
  {#each filters as filter}
    <Select
      value={activeFilters[filter.key] ?? ""}
      options={[{ value: "", label: filter.label }, ...filter.options]}
      name={filter.key}
      onchange={(val) => {
        activeFilters[filter.key] = val;
        onFilterChange?.(filter.key, val);
      }}
    />
  {/each}
</div>
