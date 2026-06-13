import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarMenuBadge from "./SidebarMenuBadge.svelte";

describe("SidebarMenuBadge", () => {
	it("renders badge span", () => {
		const { container } = render(SidebarMenuBadge, { slots: { children: "" } });
		const span = container.querySelector("span");
		expect(span).not.toBeNull();
		expect(span?.className).toContain("rounded-full");
	});

	it("has ml-auto class", () => {
		const { container } = render(SidebarMenuBadge, { slots: { children: "" } });
		const span = container.querySelector("span");
		expect(span?.className).toContain("ml-auto");
	});

	it("renders without children", () => {
		const { container } = render(SidebarMenuBadge);
		expect(container.querySelector("span")).not.toBeNull();
	});
});
