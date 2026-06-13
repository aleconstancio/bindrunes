import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import StatsOverview from "./StatsOverview.svelte";

describe("StatsOverview", () => {
	const stats = [
		{ label: "Users", value: "1,234" },
		{ label: "Revenue", value: "$45,678", change: "+12%", changeType: "positive" as const },
		{ label: "Orders", value: "891", change: "-5%", changeType: "negative" as const },
	];

	it("renders stat cards", () => {
		render(StatsOverview, { stats });
		expect(screen.getByText("Users")).toBeInTheDocument();
		expect(screen.getByText("1,234")).toBeInTheDocument();
		expect(screen.getByText("Revenue")).toBeInTheDocument();
		expect(screen.getByText("$45,678")).toBeInTheDocument();
	});

	it("renders change indicators", () => {
		render(StatsOverview, { stats });
		expect(screen.getByText("+12%")).toBeInTheDocument();
		expect(screen.getByText("-5%")).toBeInTheDocument();
	});

	it("renders empty when no stats", () => {
		const { container } = render(StatsOverview, { stats: [] });
		expect(container.querySelectorAll("[class*='grid'] > div").length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(StatsOverview, { stats, class: "my-stats" });
		expect(container.firstElementChild?.className).toContain("my-stats");
	});
});
