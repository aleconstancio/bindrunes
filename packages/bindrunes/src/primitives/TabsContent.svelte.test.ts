import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import TabsContentHarness from "./__tests__/harness/TabsContentHarness.svelte";

describe("TabsContent", () => {
	it("renders content inside Tabs", () => {
		const { getByText } = render(TabsContentHarness);
		expect(getByText("Content for tab1")).toBeTruthy();
	});

	it("renders without crashing", () => {
		const { container } = render(TabsContentHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(TabsContentHarness);
		await expectNoAxeViolations(container);
	});
});
