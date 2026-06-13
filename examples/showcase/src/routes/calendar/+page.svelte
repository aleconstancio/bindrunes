<script lang="ts">
	import { PageHeader } from "bindrunes";
	import { EventCalendar } from "bindrunes/boundrune";
	import { Scheduler } from "bindrunes/boundrune";
	import { BookingForm } from "bindrunes/boundrune";

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

	<div class="max-w-md">
		<h2 class="text-title-2 text-foreground mb-4">Booking Form</h2>
		<BookingForm
			date={selectedDate}
			time={timeSlots.find(s => s.id === selectedSlot)?.start ?? ""}
			service="Consultation"
			onSubmit={(data) => console.log("Booking:", data)}
		/>
	</div>
</div>
