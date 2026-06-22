import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarProvider from "./SidebarProvider.svelte";
import SidebarTrigger from "./SidebarTrigger.svelte";

describe("Sidebar (via SidebarProvider)", () => {
	it("renders provider container", () => {
		const { container } = render(SidebarProvider, {
			defaultOpen: true,
		});
		const div = container.querySelector("[data-sidebar-state]");
		expect(div).not.toBeNull();
	});

	it("sets data-sidebar-state to expanded", () => {
		const { container } = render(SidebarProvider, { defaultOpen: true });
		const div = container.querySelector("[data-sidebar-state]");
		expect(div?.getAttribute("data-sidebar-state")).toBe("expanded");
	});

	it("sets data-sidebar-state to collapsed", () => {
		const { container } = render(SidebarProvider, { defaultOpen: false });
		const div = container.querySelector("[data-sidebar-state]");
		expect(div?.getAttribute("data-sidebar-state")).toBe("collapsed");
	});

	it("sets data-sidebar-collapsible", () => {
		const { container } = render(SidebarProvider, { collapsible: "icon" });
		const div = container.querySelector("[data-sidebar-collapsible]");
		expect(div?.getAttribute("data-sidebar-collapsible")).toBe("icon");
	});

	it("sets sidebar width CSS variable", () => {
		const { container } = render(SidebarProvider, { defaultOpen: true });
		const div = container.querySelector("[data-sidebar-state]");
		expect(div?.getAttribute("style")).toContain("--sidebar-width");
	});

	it("SidebarTrigger is a valid component", () => {
		expect(SidebarTrigger).toBeDefined();
		expect(typeof SidebarTrigger).toBe("function");
	});
});
