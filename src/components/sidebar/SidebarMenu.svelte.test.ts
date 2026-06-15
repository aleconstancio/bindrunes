import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarMenu from "./SidebarMenu.svelte";

describe("SidebarMenu", () => {
	it("renders nav element", () => {
		const { container } = render(SidebarMenu, { slots: { children: "" } });
		const nav = container.querySelector("nav");
		expect(nav).not.toBeNull();
	});

	it("renders the nav element", () => {
		const { container } = render(SidebarMenu, { slots: { children: "" } });
		const nav = container.querySelector("nav");
		expect(nav).toBeInTheDocument();
	});

	it("renders without children", () => {
		const { container } = render(SidebarMenu);
		const nav = container.querySelector("nav");
		expect(nav).not.toBeNull();
	});
});
