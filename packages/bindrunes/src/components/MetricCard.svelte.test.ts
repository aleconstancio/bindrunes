import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import MetricCard from "./MetricCard.svelte";

describe("MetricCard", () => {
	it("renders without crashing", () => {
		const { container } = render(MetricCard);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("displays label and value", () => {
		render(MetricCard, { props: { label: "Revenue", value: "$1,234" } });
		expect(screen.getByText("Revenue")).toBeInTheDocument();
		expect(screen.getByText("$1,234")).toBeInTheDocument();
	});

	it("displays detail when provided", () => {
		render(MetricCard, { props: { detail: "vs last month" } });
		expect(screen.getByText("vs last month")).toBeInTheDocument();
	});

	it("does not display detail when not provided", () => {
		const { container } = render(MetricCard);
		expect(container.textContent).not.toContain("vs last month");
	});

	it("default variant sets border color style", () => {
		const { container } = render(MetricCard, { props: { variant: "default" } });
		const el = container.firstElementChild!;
		expect(el.getAttribute("style")).toContain("--variant-color");
	});

	it("success variant sets border color style", () => {
		const { container } = render(MetricCard, { props: { variant: "success" } });
		const el = container.firstElementChild!;
		expect(el.getAttribute("style")).toContain("--variant-color");
	});

	it("shows progress bar when progress provided", () => {
		const { container } = render(MetricCard, { props: { progress: 50, progressMax: 100 } });
		const metricCard = container.querySelector(".metric-card");
		expect(metricCard?.querySelector("[style*='width:']")).toBeInTheDocument();
	});

	it("does not show progress bar when progress is undefined", () => {
		const { container } = render(MetricCard);
		const metricCard = container.querySelector(".metric-card");
		const progressBars = metricCard?.querySelectorAll("[style*='width:']");
		expect(progressBars?.length).toBe(0);
	});

	it("a11y: has no violations", async () => {
		const { container } = render(MetricCard, {
			props: { label: "Test", value: "100" },
		});
		await expectNoAxeViolations(container);
	});
});
