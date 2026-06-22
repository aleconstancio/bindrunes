import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import DataChart from "./DataChart.svelte";

describe("DataChart", () => {
	it("renders without errors", () => {
		const { container } = render(DataChart, {
			props: { data: { labels: ["A"], datasets: [] } },
		});
		expect(container).toBeTruthy();
	});

	it("shows loading skeleton when chart not loaded", () => {
		const { container } = render(DataChart, {
			props: { data: { labels: [], datasets: [] } },
		});
		expect(container.querySelector(".animate-pulse")).toBeTruthy();
	});

	it("applies class prop", () => {
		const { container } = render(DataChart, {
			props: { data: { labels: [], datasets: [] }, class: "chart-class" },
		});
		expect(container.firstElementChild?.className).toContain("chart-class");
	});
});
