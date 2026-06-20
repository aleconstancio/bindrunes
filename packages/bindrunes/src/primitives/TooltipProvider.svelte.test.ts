import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import TooltipProvider from "./TooltipProvider.svelte";

describe("TooltipProvider", () => {
	it("renders without crashing", () => {
		const { container } = render(TooltipProvider);
		expect(container).toBeTruthy();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(TooltipProvider);
		await expectNoAxeViolations(container);
	});
});
