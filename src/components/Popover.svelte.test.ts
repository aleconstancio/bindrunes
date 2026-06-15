import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Popover from "./Popover.svelte";

describe("Popover", () => {
	it("renders container", () => {
		const { container } = render(Popover);
		expect(container).toBeInTheDocument();
	});

	it("has relative positioning", () => {
		const { container } = render(Popover);
		const wrapper = container.querySelector(".relative.inline-block");
		expect(wrapper).toBeInTheDocument();
	});

	it("renders trigger wrapper with role button", () => {
		const { container } = render(Popover);
		const triggerWrapper = container.querySelector('[role="button"]');
		expect(triggerWrapper).toBeInTheDocument();
		expect(triggerWrapper).toHaveAttribute("aria-haspopup", "true");
	});

	it("aria-expanded is false when closed", () => {
		const { container } = render(Popover);
		const trigger = container.querySelector('[role="button"]');
		expect(trigger?.getAttribute("aria-expanded")).toBe("false");
	});

	it("clicking the trigger does not throw", async () => {
		const { container } = render(Popover);
		const trigger = container.querySelector('[role="button"]')!;
		await fireEvent.click(trigger);
		expect(trigger).toBeInTheDocument();
	});
});
