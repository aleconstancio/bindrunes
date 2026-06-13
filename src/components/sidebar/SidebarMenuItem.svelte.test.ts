import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarMenuItem from "./SidebarMenuItem.svelte";

describe("SidebarMenuItem", () => {
	it("renders wrapper div with group class", () => {
		const { container } = render(SidebarMenuItem, { slots: { children: "" } });
		const div = container.querySelector(".group\\/menuitem");
		expect(div).not.toBeNull();
	});

	it("renders without children", () => {
		const { container } = render(SidebarMenuItem);
		expect(container.querySelector(".group\\/menuitem")).not.toBeNull();
	});
});
