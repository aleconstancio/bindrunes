<script lang="ts">
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
    <select
      class="w-full sm:w-44 rounded-[--radius] border border-border bg-background px-3 py-2 text-body-md text-foreground"
      aria-label={filter.label}
      value={activeFilters[filter.key] ?? ""}
      onchange={(e) => {
        const val = (e.target as HTMLSelectElement).value;
        activeFilters[filter.key] = val;
        onFilterChange?.(filter.key, val);
      }}
    >
      <option value="">{filter.label}</option>
      {#each filter.options as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  {/each}
</div>
