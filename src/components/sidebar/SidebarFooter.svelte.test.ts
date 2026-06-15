import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarFooter from "./SidebarFooter.svelte";

describe("SidebarFooter", () => {
	it("renders a div container", () => {
		const { container } = render(SidebarFooter, { slots: { children: "" } });
		const div = container.querySelector("div");
		expect(div).not.toBeNull();
		expect(div).toHaveClass("border-t");
	});

	it("renders without children", () => {
		const { container } = render(SidebarFooter);
		expect(container.querySelector("div")).not.toBeNull();
	});

	it("renders the root element", () => {
		const { container } = render(SidebarFooter, { slots: { children: "" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
