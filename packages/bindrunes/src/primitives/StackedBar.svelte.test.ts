import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import StackedBar from "./StackedBar.svelte";

describe("StackedBar", () => {
	const segments = [
		{ label: "A", value: 30, color: "#f00" },
		{ label: "B", value: 70, color: "#0f0" },
	];

	it("renders segments", () => {
		const { container } = render(StackedBar, { props: { segments } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders zero-value segments as empty state", () => {
		const { container } = render(StackedBar, {
			props: { segments: [{ label: "Empty", value: 0, color: "#000" }] },
		});
		expect(container.firstElementChild?.className).toContain("bg-muted");
	});

	it("renders colored segments with correct widths", () => {
		const { container } = render(StackedBar, { props: { segments } });
		const inner = container.firstElementChild!;
		const bars = inner.querySelectorAll(":scope > div");
		expect(bars).toHaveLength(2);
		expect(bars[0]).toHaveStyle({ width: "30%" });
		expect(bars[1]).toHaveStyle({ width: "70%" });
	});

	it("sets height from prop", () => {
		const { container } = render(StackedBar, {
			props: { segments, height: 16 },
		});
		expect(container.firstElementChild).toHaveStyle({ height: "16px" });
	});

	it("applies custom class", () => {
		const { container } = render(StackedBar, {
			props: { segments, class: "my-bar" },
		});
		expect(container.firstElementChild?.className).toContain("my-bar");
	});

	it("skips zero-value segments", () => {
		const { container } = render(StackedBar, {
			props: {
				segments: [
					{ label: "A", value: 0, color: "#f00" },
					{ label: "B", value: 100, color: "#0f0" },
				],
			},
		});
		const inner = container.firstElementChild!;
		const bars = inner.querySelectorAll(":scope > div");
		expect(bars).toHaveLength(1);
	});

	it("passes accessibility checks", async () => {
		const { container } = render(StackedBar, { props: { segments } });
		await expectNoAxeViolations(container);
	});
});
