<script lang="ts">
	import { CalendarTemplate } from "bindrunes/layouts";
	import { EventCalendar } from "bindrunes/domains/calendar";
	import { Scheduler } from "bindrunes/domains/calendar";
	import { BookingForm } from "bindrunes/domains/calendar";
	import { AvailabilityGrid } from "bindrunes/domains/calendar";

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

	// Simple deterministic LCG
	let _seed = 42;
	function seededRandom(): number {
		_seed = (_seed * 1103515245 + 12345) & 0x7fffffff;
		return (_seed % 100) / 100;
	}

	function makeInitialAvailability(): Record<string, Record<number, boolean>> {
		const avail: Record<string, Record<number, boolean>> = {};
		for (const day of days) {
			avail[day] = {};
			for (const h of hours) {
				avail[day][h] = seededRandom() > 0.4;
			}
		}
		return avail;
	}

	let availability = $state(makeInitialAvailability());
</script>

<CalendarTemplate title="Calendar Components">
	{#snippet sidebar()}
		<div class="space-y-6">
			<h3 class="text-title-2 text-foreground">Events</h3>
			<ul class="space-y-2">
				{#each events as event (event.id)}
					<li class="flex items-center gap-2 text-sm text-foreground">
						<span class="w-2 h-2 rounded-full {event.color === 'primary' ? 'bg-primary' : event.color === 'success' ? 'bg-success' : 'bg-destructive'}"></span>
						{event.title}
					</li>
				{/each}
			</ul>

			<h3 class="text-title-2 text-foreground">Booking Form</h3>
			<BookingForm
				date={selectedDate}
				time={timeSlots.find((s) => s.id === selectedSlot)?.start ?? ""}
				service="Consultation"
				onSubmit={(data) => console.log("Booking:", data)}
			/>

			<h3 class="text-title-2 text-foreground">Availability</h3>
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
	{/snippet}

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
</CalendarTemplate>
