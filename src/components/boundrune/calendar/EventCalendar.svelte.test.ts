import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import EventCalendar from "./EventCalendar.svelte";

describe("EventCalendar", () => {
	it("renders current month", () => {
		render(EventCalendar);
		const now = new Date();
		const monthName = now.toLocaleString("default", { month: "long" });
		expect(screen.getByText(new RegExp(monthName))).toBeInTheDocument();
	});

	it("renders day headers", () => {
		render(EventCalendar);
		expect(screen.getByText("Sun")).toBeInTheDocument();
		expect(screen.getByText("Mon")).toBeInTheDocument();
	});

	it("renders today button", () => {
		render(EventCalendar);
		expect(screen.getByText("Today")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(EventCalendar, { class: "my-calendar" });
		expect(container.firstElementChild?.className).toContain("my-calendar");
	});
});
