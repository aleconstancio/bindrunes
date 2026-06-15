import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarContent from "./SidebarContent.svelte";

describe("SidebarContent", () => {
	it("renders a scrollable container", () => {
		const { container } = render(SidebarContent, { slots: { children: "" } });
		const div = container.querySelector("div");
		expect(div).not.toBeNull();
		expect(div).toHaveClass("flex-1");
	});

	it("renders without children", () => {
		const { container } = render(SidebarContent);
		expect(container.querySelector("div")).not.toBeNull();
	});

	it("renders the root element", () => {
		const { container } = render(SidebarContent, { slots: { children: "" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
