import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Collapsible from "./Collapsible.svelte";

describe("Collapsible", () => {
	it("renders with data-state=closed by default", () => {
		const { container } = render(Collapsible);
		const root = container.querySelector("[data-state]");
		expect(root).toBeInTheDocument();
		expect(root?.getAttribute("data-state")).toBe("closed");
	});

	it("renders trigger button", () => {
		const { container } = render(Collapsible);
		const trigger = container.querySelector("button");
		expect(trigger).toBeInTheDocument();
	});

	it("toggles data-state on trigger click", async () => {
		const { container } = render(Collapsible);
		const trigger = container.querySelector("button")!;
		await fireEvent.click(trigger);
		const root = container.querySelector("[data-state]");
		expect(root?.getAttribute("data-state")).toBe("open");
	});

	it("respects disabled state", () => {
		const { container } = render(Collapsible, { disabled: true });
		const trigger = container.querySelector("button");
		expect(trigger).toHaveAttribute("disabled");
	});

	it("applies custom class", () => {
		const { container } = render(Collapsible, { class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});
});
