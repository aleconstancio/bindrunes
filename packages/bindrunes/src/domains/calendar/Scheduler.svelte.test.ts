import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Scheduler from "./Scheduler.svelte";

describe("Scheduler", () => {
	const slots = [
		{ id: "1", start: "9:00", end: "10:00", available: true },
		{ id: "2", start: "10:00", end: "11:00", available: false },
		{ id: "3", start: "11:00", end: "12:00", available: true },
	];

	it("renders time slots", () => {
		render(Scheduler, { date: "2024-01-15", slots });
		expect(screen.getByText("9:00 - 10:00")).toBeInTheDocument();
		expect(screen.getByText("10:00 - 11:00")).toBeInTheDocument();
	});

	it("renders date", () => {
		render(Scheduler, { date: "2024-01-15", slots });
		expect(screen.getByText("2024-01-15")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(Scheduler, { date: "2024-01-15", slots, class: "my-scheduler" });
		expect(container.firstElementChild?.className).toContain("my-scheduler");
	});
});
