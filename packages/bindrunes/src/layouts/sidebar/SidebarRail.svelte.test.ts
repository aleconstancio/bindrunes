import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarRailHarness from "./__tests__/SidebarRailHarness.svelte";

describe("SidebarRail", () => {
	it("is a valid Svelte component", async () => {
		const SidebarRail = (await import("./SidebarRail.svelte")).default;
		expect(SidebarRail).toBeDefined();
		expect(typeof SidebarRail).toBe("function");
	});

	it("renders a button inside SidebarProvider", () => {
		render(SidebarRailHarness);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("has Toggle sidebar label", () => {
		render(SidebarRailHarness);
		expect(screen.getByLabelText("Toggle sidebar")).toBeInTheDocument();
	});

	it("renders the chevron SVG", () => {
		const { container } = render(SidebarRailHarness);
		expect(container.querySelector("svg")).not.toBeNull();
	});

	it("has data-sidebar-rail attribute", () => {
		const { container } = render(SidebarRailHarness);
		expect(container.querySelector("[data-sidebar-rail]")).not.toBeNull();
	});

	it("a11y: sidebar rail has no violations", async () => {
		const { container } = render(SidebarRailHarness);
		const { expectNoAxeViolations } = await import("../../helpers/axe");
		await expectNoAxeViolations(container);
	});
});
