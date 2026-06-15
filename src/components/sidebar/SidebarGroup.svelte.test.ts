import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarGroup from "./SidebarGroup.svelte";

describe("SidebarGroup", () => {
	it("renders wrapper div", () => {
		const { container } = render(SidebarGroup, { slots: { children: "" } });
		expect(container.firstElementChild).not.toBeNull();
	});

	it("renders label when provided", () => {
		render(SidebarGroup, { label: "Navigation", slots: { children: "" } });
		expect(screen.getByText("Navigation")).toBeInTheDocument();
	});

	it("renders without label", () => {
		const { container } = render(SidebarGroup, { slots: { children: "" } });
		expect(container.firstElementChild).not.toBeNull();
	});

	it("renders children container", () => {
		const { container } = render(SidebarGroup, { slots: { children: "" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
