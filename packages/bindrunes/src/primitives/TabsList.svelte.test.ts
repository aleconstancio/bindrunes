import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import TabsListHarness from "./__tests__/harness/TabsListHarness.svelte";

describe("TabsList", () => {
	it("renders list inside Tabs", () => {
		const { container } = render(TabsListHarness);
		const list = container.querySelector('[role="tablist"]');
		expect(list).toBeInTheDocument();
	});

	it("renders without crashing", () => {
		const { container } = render(TabsListHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(TabsListHarness);
		await expectNoAxeViolations(container);
	});
});
