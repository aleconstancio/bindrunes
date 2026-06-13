import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarMenu from "./SidebarMenu.svelte";

describe("SidebarMenu", () => {
	it("renders nav element", () => {
		const { container } = render(SidebarMenu, { slots: { children: "" } });
		const nav = container.querySelector("nav");
		expect(nav).not.toBeNull();
	});

	it("has space-y-0.5 class", () => {
		const { container } = render(SidebarMenu, { slots: { children: "" } });
		const nav = container.querySelector("nav");
		expect(nav?.className).toContain("space-y-0.5");
	});

	it("renders without children", () => {
		const { container } = render(SidebarMenu);
		const nav = container.querySelector("nav");
		expect(nav).not.toBeNull();
	});
});
