import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Popover from "../../src/components/Popover.svelte";

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
});
