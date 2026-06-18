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

	it("renders trigger with aria-haspopup", () => {
		const { container } = render(Popover);
		const trigger = container.querySelector("button.inline-flex");
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
	});

	it("aria-expanded is false when closed", () => {
		const { container } = render(Popover);
		const trigger = container.querySelector("button.inline-flex");
		expect(trigger?.getAttribute("aria-expanded")).toBe("false");
	});

	it("clicking the trigger does not throw", async () => {
		const { container } = render(Popover);
		const trigger = container.querySelector("button.inline-flex")!;
		await fireEvent.click(trigger);
		expect(trigger).toBeInTheDocument();
	});
});
