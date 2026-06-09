import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarHeader from "./SidebarHeader.svelte";

describe("SidebarHeader", () => {
	it("renders a div container", () => {
		const { container } = render(SidebarHeader, { slots: { children: "" } });
		const div = container.querySelector("div");
		expect(div).not.toBeNull();
		expect(div?.className).toContain("flex-shrink-0");
		expect(div?.className).toContain("p-4");
	});

	it("renders without children", () => {
		const { container } = render(SidebarHeader);
		expect(container.querySelector("div")).not.toBeNull();
	});
});
