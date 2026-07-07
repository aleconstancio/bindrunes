import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import SwipeableItemWrapper from "./_test/SwipeableItemWrapper.svelte";

describe("SwipeableItem", () => {
	it("renders", () => {
		const { container } = render(SwipeableItemWrapper);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("has correct wrapper structure", () => {
		const { container } = render(SwipeableItemWrapper);
		expect(container.firstElementChild).toHaveClass("relative", "overflow-hidden");
	});

	it("passes accessibility checks", async () => {
		const { container } = render(SwipeableItemWrapper);
		await expectNoAxeViolations(container);
	});
});
