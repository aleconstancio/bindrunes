<script lang="ts">
interface CalendarEvent {
	id: string;
	title: string;
	date: string;
	time?: string;
	endTime?: string;
	color?: "primary" | "success" | "warning" | "destructive" | "info" | "muted";
	type?: string;
}

let {
	events = [] as CalendarEvent[],
	selectedDate = $bindable(new Date().toISOString().split("T")[0] ?? ""),
	class: className = "",
}: {
	events?: CalendarEvent[];
	selectedDate?: string;
	class?: string;
} = $props();

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

let currentDate = $state(new Date());
let year = $derived(currentDate.getFullYear());
let month = $derived(currentDate.getMonth());
let firstDay = $derived(new Date(year, month, 1).getDay());
let daysInMonth = $derived(new Date(year, month + 1, 0).getDate());

const eventColorMap: Record<string, string> = {
	primary: "bg-primary/10 text-primary",
	success: "bg-success/10 text-success",
	warning: "bg-warning/10 text-warning",
	destructive: "bg-destructive/10 text-destructive",
	info: "bg-info/10 text-info",
	muted: "bg-muted text-muted-foreground",
};

let calendarDays = $derived.by(() => {
	const result: { date: number; isCurrentMonth: boolean; isToday: boolean; dateStr: string }[] = [];
	const today = new Date().toISOString().split("T")[0];

	for (let i = 0; i < firstDay; i++) {
		const prevDate = new Date(year, month, 0).getDate() - firstDay + i + 1;
		result.push({ date: prevDate, isCurrentMonth: false, isToday: false, dateStr: "" });
	}
	for (let d = 1; d <= daysInMonth; d++) {
		const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
		result.push({ date: d, isCurrentMonth: true, isToday: dateStr === today, dateStr });
	}
	return result;
});

function prevMonth() {
	currentDate = new Date(year, month - 1);
}
function nextMonth() {
	currentDate = new Date(year, month + 1);
}
function goToToday() {
	currentDate = new Date();
}

function getEventsForDate(dateStr: string) {
	return events.filter((e) => e.date === dateStr);
}
</script>

<div class="space-y-4 {className}">
  <div class="flex items-center justify-between">
    <h3 class="text-title-2 text-foreground">{months[month]} {year}</h3>
    <div class="flex items-center gap-1">
      <button type="button" class="px-2 py-1 text-label-sm rounded hover:bg-muted cursor-pointer" onclick={goToToday}>Today</button>
      <button type="button" class="p-1.5 rounded hover:bg-muted cursor-pointer" aria-label="Previous month" onclick={prevMonth}>←</button>
      <button type="button" class="p-1.5 rounded hover:bg-muted cursor-pointer" aria-label="Next month" onclick={nextMonth}>→</button>
    </div>
  </div>

  <div class="grid grid-cols-7 gap-px bg-border">
    {#each days as day}
      <div class="bg-background p-2 text-center text-mono-xs text-muted-foreground font-medium">{day}</div>
    {/each}

    {#each calendarDays as day}
      {@const dayEvents = day.isCurrentMonth ? getEventsForDate(day.dateStr) : []}
      <button
        type="button"
        class="bg-background p-1.5 min-h-[4rem] text-left cursor-pointer hover:bg-muted/50 transition-colors
               {day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50'}
               {day.isToday ? 'ring-2 ring-primary' : ''}
               {day.dateStr === selectedDate ? 'bg-primary/10' : ''}"
        onclick={() => day.isCurrentMonth && (selectedDate = day.dateStr)}
      >
        <span class="text-label-sm {day.isToday ? 'text-primary font-bold' : ''}">{day.date}</span>
        {#if dayEvents.length > 0}
          <div class="space-y-0.5 mt-0.5">
            {#each dayEvents.slice(0, 2) as event}
              <div class="text-mono-xs truncate rounded px-1 py-0.5 {event.color ? (eventColorMap[event.color] ?? 'bg-primary/10 text-primary') : 'bg-primary/10 text-primary'}">
                {event.title}
              </div>
            {/each}
            {#if dayEvents.length > 2}
              <span class="text-mono-xs text-muted-foreground">+{dayEvents.length - 2}</span>
            {/if}
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>
