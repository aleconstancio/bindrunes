import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import AccordionItemHarness from "./__tests__/harness/AccordionItemHarness.svelte";

describe("AccordionItem", () => {
	it("renders content inside Accordion", () => {
		const { getByText } = render(AccordionItemHarness);
		expect(getByText("Trigger")).toBeTruthy();
		expect(getByText("Panel content")).toBeTruthy();
	});

	it("renders without crashing", () => {
		const { container } = render(AccordionItemHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(AccordionItemHarness);
		await expectNoAxeViolations(container);
	});
});
