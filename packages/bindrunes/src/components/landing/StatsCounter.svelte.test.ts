import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import StatsCounter from "./StatsCounter.svelte";

const stats = [
	{ value: 100, label: "Projects" },
	{ value: 50, label: "Clients", prefix: "$", suffix: "M" },
];

describe("StatsCounter", () => {
	it("renders grid container", () => {
		const { container } = render(StatsCounter, { stats });
		expect(container.firstElementChild?.className).toContain("grid");
	});

	it("renders all stat labels", () => {
		render(StatsCounter, { stats });
		expect(screen.getByText("Projects")).toBeInTheDocument();
		expect(screen.getByText("Clients")).toBeInTheDocument();
	});

	it("renders prefix and suffix", () => {
		const { container } = render(StatsCounter, { stats });
		expect(container.textContent).toContain("$");
		expect(container.textContent).toContain("M");
	});

	it("renders nothing for empty stats", () => {
		const { container } = render(StatsCounter, { stats: [] });
		expect(container.textContent?.trim()).toBe("");
	});

	it("applies columns=4 (default)", () => {
		const { container } = render(StatsCounter, { stats });
		expect(container.firstElementChild?.className).toMatch(/grid-cols-4/);
	});

	it("applies columns=2", () => {
		const { container } = render(StatsCounter, { stats, columns: 2 });
		expect(container.firstElementChild?.className).toMatch(/grid-cols-2/);
	});

	it("applies columns=1", () => {
		const { container } = render(StatsCounter, { stats, columns: 1 });
		expect(container.firstElementChild?.className).toMatch(/grid-cols-1/);
	});

	it("applies columns=3", () => {
		const { container } = render(StatsCounter, { stats, columns: 3 });
		expect(container.firstElementChild?.className).toMatch(/grid-cols-3/);
	});

	it("applies class prop", () => {
		const { container } = render(StatsCounter, { stats, class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});

	it("renders displayValues starting at 0", () => {
		const { container } = render(StatsCounter, { stats });
		expect(container.textContent).toContain("0");
	});

	it("accepts custom duration", () => {
		const { container } = render(StatsCounter, { stats, duration: 100 });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
