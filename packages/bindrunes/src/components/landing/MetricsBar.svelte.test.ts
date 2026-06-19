import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import type { Metric } from "./landing-types";
import MetricsBar from "./MetricsBar.svelte";

const metrics: Metric[] = [
	{ value: "10K+", label: "Users" },
	{ value: "99.9%", label: "Uptime", variant: "success" },
	{ value: "5ms", label: "Latency", variant: "warning" },
];

describe("MetricsBar", () => {
	it("renders grid container", () => {
		const { container } = render(MetricsBar, { metrics, columns: 3 });
		const grid = container.querySelector("div");
		expect(grid?.className).toContain("grid");
	});

	it("renders all metric values", () => {
		render(MetricsBar, { metrics });
		expect(screen.getByText("10K+")).toBeInTheDocument();
		expect(screen.getByText("99.9%")).toBeInTheDocument();
		expect(screen.getByText("5ms")).toBeInTheDocument();
	});

	it("renders all metric labels", () => {
		render(MetricsBar, { metrics });
		expect(screen.getByText("Users")).toBeInTheDocument();
		expect(screen.getByText("Uptime")).toBeInTheDocument();
		expect(screen.getByText("Latency")).toBeInTheDocument();
	});

	it("renders metric description when provided", () => {
		render(MetricsBar, { metrics: [{ value: "1", label: "X", description: "extra info" }] });
		expect(screen.getByText("extra info")).toBeInTheDocument();
	});

	it("applies columns prop", () => {
		const { container } = render(MetricsBar, { metrics, columns: 2 });
		expect(container.querySelector("div")?.className).toMatch(/grid-cols-2/);
	});

	it("applies class prop", () => {
		const { container } = render(MetricsBar, { metrics, class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});
});
