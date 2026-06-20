import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Schedule from "./Schedule.svelte";

describe("Schedule", () => {
	const items = [
		{ time: "09:00", title: "Opening Keynote", description: "Welcome to the conference" },
		{ time: "10:30", title: "Workshop", description: "Hands-on coding" },
	];

	it("renders title", () => {
		render(Schedule, { title: "Event Schedule", items });
		expect(screen.getByText("Event Schedule")).toBeInTheDocument();
	});

	it("renders events", () => {
		render(Schedule, { items });
		expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
		expect(screen.getByText("Workshop")).toBeInTheDocument();
	});

	it("renders times", () => {
		render(Schedule, { items });
		expect(screen.getByText("09:00")).toBeInTheDocument();
		expect(screen.getByText("10:30")).toBeInTheDocument();
	});

	it("renders descriptions", () => {
		render(Schedule, { items });
		expect(screen.getByText("Welcome to the conference")).toBeInTheDocument();
		expect(screen.getByText("Hands-on coding")).toBeInTheDocument();
	});

	it("renders timeline dots", () => {
		const { container } = render(Schedule, { items });
		const dots = container.querySelectorAll("[aria-hidden='true']");
		expect(dots.length).toBeGreaterThanOrEqual(2);
	});

	it("applies class prop", () => {
		const { container } = render(Schedule, { items, class: "my-schedule" });
		expect(container.firstElementChild?.className).toContain("my-schedule");
	});

	it("renders empty for no items", () => {
		render(Schedule, { items: [] });
		expect(screen.queryByText("Opening Keynote")).not.toBeInTheDocument();
	});
});
