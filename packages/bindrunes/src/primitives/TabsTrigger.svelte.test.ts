import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import TabsTriggerHarness from "./__tests__/harness/TabsTriggerHarness.svelte";

describe("TabsTrigger", () => {
	it("renders without crashing inside Tabs", () => {
		const { container } = render(TabsTriggerHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders children content inside Tabs", () => {
		render(TabsTriggerHarness);
		expect(screen.getByText("Tab 1")).toBeInTheDocument();
	});

	it("disabled state applies disabled attribute", () => {
		const { container } = render(TabsTriggerHarness, {
			props: { disabled: true },
		});
		const btn = container.querySelector("button[role='tab']");
		expect(btn).toBeDisabled();
	});

	it("not disabled by default", () => {
		const { container } = render(TabsTriggerHarness);
		const btn = container.querySelector("button[role='tab']");
		expect(btn).not.toBeDisabled();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(TabsTriggerHarness);
		await expectNoAxeViolations(container);
	});
});
