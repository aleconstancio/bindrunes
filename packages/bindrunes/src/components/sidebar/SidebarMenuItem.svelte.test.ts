import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarMenuItem from "./SidebarMenuItem.svelte";

describe("SidebarMenuItem", () => {
	it("renders wrapper div", () => {
		const { container } = render(SidebarMenuItem, { slots: { children: "" } });
		const div = container.firstElementChild;
		expect(div).not.toBeNull();
	});

	it("renders without children", () => {
		const { container } = render(SidebarMenuItem);
		expect(container.firstElementChild).not.toBeNull();
	});

	it("renders the root element", () => {
		const { container } = render(SidebarMenuItem, { slots: { children: "" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
