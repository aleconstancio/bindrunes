<script lang="ts">
let {
	hours = Array.from({ length: 12 }, (_, i) => i + 9),
	days = ["Mon", "Tue", "Wed", "Thu", "Fri"],
	availability = {} as Record<string, Record<number, boolean>>,
	onToggle = undefined as ((day: string, hour: number) => void) | undefined,
	class: className = "",
}: {
	hours?: number[];
	days?: string[];
	availability?: Record<string, Record<number, boolean>>;
	onToggle?: (day: string, hour: number) => void;
	class?: string;
} = $props();

function formatHour(h: number) {
	return `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;
}

function isAvailable(day: string, hour: number) {
	return availability[day]?.[hour] ?? false;
}
</script>

<div class="space-y-2 {className}">
  <div class="grid grid-cols-[auto_repeat(5,1fr)] gap-px">
    <div></div>
    {#each days as day}
      <div class="text-center text-label-sm text-muted-foreground font-medium py-2">{day}</div>
    {/each}

    {#each hours as hour}
      <div class="text-right text-mono-xs text-muted-foreground pr-2 py-1">{formatHour(hour)}</div>
      {#each days as day}
        <button
          type="button"
          class="h-8 rounded-sm transition-colors cursor-pointer
                 {isAvailable(day, hour)
                   ? 'bg-success/20 hover:bg-success/30'
                   : 'bg-muted hover:bg-muted/80'}"
          onclick={() => onToggle?.(day, hour)}
          aria-label="{day} {formatHour(hour)}: {isAvailable(day, hour) ? 'available' : 'unavailable'}"
        ></button>
      {/each}
    {/each}
  </div>

  <div class="flex items-center gap-4 text-body-xs text-muted-foreground pt-2">
    <div class="flex items-center gap-1.5">
      <div class="w-3 h-3 rounded-sm bg-success/20"></div>
      <span>Available</span>
    </div>
    <div class="flex items-center gap-1.5">
      <div class="w-3 h-3 rounded-sm bg-muted"></div>
      <span>Unavailable</span>
    </div>
  </div>
</div>
