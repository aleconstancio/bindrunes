<script lang="ts">
interface TimeSlot {
	id: string;
	start: string;
	end: string;
	available: boolean;
	label?: string;
}

let {
	date = "",
	slots = [] as TimeSlot[],
	selectedSlot = $bindable(""),
	onSelect = undefined as ((slot: TimeSlot) => void) | undefined,
	class: className = "",
}: {
	date?: string;
	slots?: TimeSlot[];
	selectedSlot?: string;
	onSelect?: (slot: TimeSlot) => void;
	class?: string;
} = $props();
</script>

<div class="space-y-4 {className}">
  {#if date}
    <h3 class="text-title-2 text-foreground">{date}</h3>
  {/if}

  <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
    {#each slots as slot}
      <button
        type="button"
        class="px-3 py-2 rounded-[--radius] border text-label-sm text-center transition-all cursor-pointer
               {slot.available
                 ? selectedSlot === slot.id
                   ? 'bg-primary text-primary-foreground border-primary'
                   : 'border-border text-foreground hover:border-primary hover:bg-primary/5'
                 : 'bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed'}"
        disabled={!slot.available}
        onclick={() => {
          if (slot.available) {
            selectedSlot = slot.id;
            onSelect?.(slot);
          }
        }}
      >
        {slot.label ?? `${slot.start} - ${slot.end}`}
      </button>
    {/each}
  </div>

  {#if slots.length === 0}
    <p class="text-body-sm text-muted-foreground text-center py-4">No time slots available</p>
  {/if}
</div>
