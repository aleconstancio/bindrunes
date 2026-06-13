import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarProvider from "./SidebarProvider.svelte";
import SidebarTrigger from "./SidebarTrigger.svelte";

describe("SidebarProvider", () => {
	it("renders children container", () => {
		const { container } = render(SidebarProvider, { slots: { children: "" } });
		expect(container.querySelector("div")).not.toBeNull();
	});

	it("sets data-sidebar-state attribute", () => {
		const { container } = render(SidebarProvider);
		const div = container.querySelector("[data-sidebar-state]");
		expect(div).not.toBeNull();
	});

	it("defaultOpen=true sets expanded state", () => {
		const { container } = render(SidebarProvider, { defaultOpen: true });
		const div = container.querySelector("[data-sidebar-state]");
		expect(div?.getAttribute("data-sidebar-state")).toBe("expanded");
	});

	it("defaultOpen=false sets collapsed state", () => {
		const { container } = render(SidebarProvider, { defaultOpen: false });
		const div = container.querySelector("[data-sidebar-state]");
		expect(div?.getAttribute("data-sidebar-state")).toBe("collapsed");
	});

	it("sets data-sidebar-collapsible attribute", () => {
		const { container } = render(SidebarProvider, { collapsible: "none" });
		const div = container.querySelector("[data-sidebar-collapsible]");
		expect(div?.getAttribute("data-sidebar-collapsible")).toBe("none");
	});

	it("sets sidebar width CSS variable", () => {
		const { container } = render(SidebarProvider, { defaultOpen: true });
		const div = container.querySelector("[data-sidebar-state]");
		expect(div?.getAttribute("style")).toContain("--sidebar-width");
	});
});

describe("SidebarTrigger", () => {
	it("is a valid Svelte component", () => {
		expect(SidebarTrigger).toBeDefined();
		expect(typeof SidebarTrigger).toBe("function");
	});
});
