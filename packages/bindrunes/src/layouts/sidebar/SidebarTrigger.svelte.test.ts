import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarTriggerHarness from "./__tests__/SidebarTriggerHarness.svelte";

describe("SidebarTrigger", () => {
	it("is a valid Svelte component", async () => {
		const SidebarTrigger = (await import("./SidebarTrigger.svelte")).default;
		expect(SidebarTrigger).toBeDefined();
		expect(typeof SidebarTrigger).toBe("function");
	});

	it("renders a button inside SidebarProvider", () => {
		render(SidebarTriggerHarness);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("has Toggle sidebar label", () => {
		render(SidebarTriggerHarness);
		expect(screen.getByLabelText("Toggle sidebar")).toBeInTheDocument();
	});

	it("renders the default hamburger SVG", () => {
		const { container } = render(SidebarTriggerHarness);
		expect(container.querySelector("svg")).not.toBeNull();
	});

	it("a11y: sidebar trigger has no violations", async () => {
		const { container } = render(SidebarTriggerHarness);
		const { expectNoAxeViolations } = await import("../../helpers/axe");
		await expectNoAxeViolations(container);
	});
});
