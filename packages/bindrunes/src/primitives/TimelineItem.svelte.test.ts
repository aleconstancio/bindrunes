import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import TimelineItemWrapper from "./_test/TimelineItemWrapper.svelte";

describe("TimelineItem", () => {
	it("renders", () => {
		const { container } = render(TimelineItemWrapper);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders timestamp", () => {
		render(TimelineItemWrapper, { props: { timestamp: "12:34" } });
		expect(screen.getByText("12:34")).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(TimelineItemWrapper, {
			props: { timestamp: "09:00", class: "custom-class" },
		});
		expect(container.firstElementChild?.className).toContain("custom-class");
	});

	it("timestamp has monospace font", () => {
		render(TimelineItemWrapper, { props: { timestamp: "14:00" } });
		const ts = screen.getByText("14:00");
		expect(ts.className).toContain("font-mono");
	});

	it("passes accessibility checks", async () => {
		const { container } = render(TimelineItemWrapper);
		await expectNoAxeViolations(container);
	});
});
