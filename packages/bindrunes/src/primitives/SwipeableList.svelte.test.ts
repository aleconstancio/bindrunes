import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import SwipeableList from "./SwipeableList.svelte";

describe("SwipeableList", () => {
	it("renders", () => {
		const { container } = render(SwipeableList);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("has correct wrapper structure", () => {
		const { container } = render(SwipeableList);
		expect(container.firstElementChild).toHaveClass("flex", "flex-col", "divide-y");
	});

	it("passes accessibility checks", async () => {
		const { container } = render(SwipeableList);
		await expectNoAxeViolations(container);
	});
});
