<script lang="ts">
	import { PageHeader, Collapsible, CodeSnippet } from "bindrunes";
	import { EventCalendar } from "bindrunes/boundrune";
	import { Scheduler } from "bindrunes/boundrune";
	import { BookingForm } from "bindrunes/boundrune";
	import { AvailabilityGrid } from "bindrunes/boundrune";

	const today = new Date().toISOString().split("T")[0]!;

	const events = [
		{ id: "1", title: "Team Standup", date: today, color: "primary" as const },
		{ id: "2", title: "Lunch", date: today, color: "success" as const },
		{ id: "3", title: "Deadline", date: today, color: "destructive" as const },
	];

	const timeSlots = [
		{ id: "1", start: "9:00", end: "10:00", available: true },
		{ id: "2", start: "10:00", end: "11:00", available: true },
		{ id: "3", start: "11:00", end: "12:00", available: false },
		{ id: "4", start: "13:00", end: "14:00", available: true },
		{ id: "5", start: "14:00", end: "15:00", available: true },
		{ id: "6", start: "15:00", end: "16:00", available: true },
	];

	let selectedDate = $state(today);
	let selectedSlot = $state("");

	const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
	const hours = Array.from({ length: 12 }, (_, i) => i + 9);

	function makeInitialAvailability(): Record<string, Record<number, boolean>> {
		const avail: Record<string, Record<number, boolean>> = {};
		for (const day of days) {
			avail[day] = {};
			for (const h of hours) {
				avail[day][h] = Math.random() > 0.4;
			}
		}
		return avail;
	}

	let availability = $state(makeInitialAvailability());
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
	<PageHeader title="Calendar Components" description="Event calendar, scheduler, and booking forms" />

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">Event Calendar</h2>
			<EventCalendar {events} bind:selectedDate />
		</div>

		<div class="space-y-6">
			<h2 class="text-title-2 text-foreground">Time Scheduler</h2>
			<Scheduler date={selectedDate} slots={timeSlots} bind:selectedSlot />
		</div>
	</div>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { EventCalendar, Scheduler } from "bindrunes/boundrune";\n\nconst events = [\n  { id: "1", title: "Team Standup", date: "2025-01-15", color: "primary" },\n  { id: "2", title: "Lunch", date: "2025-01-15", color: "success" },\n];\n\nconst timeSlots = [\n  { id: "1", start: "9:00", end: "10:00", available: true },\n  { id: "2", start: "10:00", end: "11:00", available: true },\n  { id: "3", start: "11:00", end: "12:00", available: false },\n];\n\nlet selectedDate = $state("2025-01-15");\nlet selectedSlot = $state("");\n\n<EventCalendar {events} bind:selectedDate />\n<Scheduler date={selectedDate} slots={timeSlots} bind:selectedSlot />`}
				language="svelte"
				title="Calendar & Scheduler"
			/>
		</div>
	</Collapsible>

	<div class="max-w-md">
		<h2 class="text-title-2 text-foreground mb-4">Booking Form</h2>
		<BookingForm
			date={selectedDate}
			time={timeSlots.find(s => s.id === selectedSlot)?.start ?? ""}
			service="Consultation"
			onSubmit={(data) => console.log("Booking:", data)}
		/>
	</div>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { BookingForm } from "bindrunes/boundrune";\n\n<BookingForm\n  date={selectedDate}\n  time={selectedSlot?.start ?? ""}\n  service="Consultation"\n  onSubmit={(data) => console.log("Booking:", data)}\n/>`}
				language="svelte"
				title="Booking Form"
			/>
		</div>
	</Collapsible>

	<div>
		<h2 class="text-title-2 text-foreground mb-4">Availability Grid</h2>
		<AvailabilityGrid
			{hours}
			{days}
			{availability}
			onToggle={(day, hour) => {
				availability = {
					...availability,
					[day]: { ...availability[day], [hour]: !availability[day]?.[hour] },
				};
			}}
		/>
	</div>
</div>
