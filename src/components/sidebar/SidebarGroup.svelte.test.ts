import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarGroup from "./SidebarGroup.svelte";

describe("SidebarGroup", () => {
	it("renders wrapper div with mb-4 class", () => {
		const { container } = render(SidebarGroup, { slots: { children: "" } });
		expect(container.querySelector(".mb-4")).not.toBeNull();
	});

	it("renders label when provided", () => {
		const { container } = render(SidebarGroup, { label: "Navigation", slots: { children: "" } });
		const span = container.querySelector("span");
		expect(span).not.toBeNull();
		expect(span?.className).toContain("uppercase");
	});

	it("renders without label", () => {
		const { container } = render(SidebarGroup, { slots: { children: "" } });
		expect(container.querySelector(".mb-4")).not.toBeNull();
	});

	it("renders children container", () => {
		const { container } = render(SidebarGroup, { slots: { children: "" } });
		const childContainer = container.querySelector(".space-y-0\\.5");
		expect(childContainer).not.toBeNull();
	});
});
