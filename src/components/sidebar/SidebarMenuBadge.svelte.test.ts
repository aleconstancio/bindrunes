import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarMenuBadge from "./SidebarMenuBadge.svelte";

describe("SidebarMenuBadge", () => {
	it("renders badge span", () => {
		const { container } = render(SidebarMenuBadge, { slots: { children: "" } });
		const span = container.querySelector("span");
		expect(span).not.toBeNull();
	});

	it("renders the root element", () => {
		const { container } = render(SidebarMenuBadge, { slots: { children: "" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders without children", () => {
		const { container } = render(SidebarMenuBadge);
		expect(container.querySelector("span")).not.toBeNull();
	});
});
