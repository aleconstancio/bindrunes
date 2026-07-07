import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarProviderHarness from "../__tests__/harness/SidebarProviderHarness.svelte";
import SidebarGroup from "./SidebarGroup.svelte";

describe("SidebarGroup", () => {
	it("renders wrapper div", () => {
		const { container } = render(
			SidebarGroup,
			{ slots: { children: "" } },
			{ wrapper: SidebarProviderHarness },
		);
		expect(container.firstElementChild).not.toBeNull();
	});

	it("renders label when provided", () => {
		render(
			SidebarGroup,
			{ label: "Navigation", slots: { children: "" } },
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.getByText("Navigation")).toBeInTheDocument();
	});

	it("renders without label", () => {
		const { container } = render(
			SidebarGroup,
			{ slots: { children: "" } },
			{ wrapper: SidebarProviderHarness },
		);
		expect(container.firstElementChild).not.toBeNull();
	});

	it("renders children container", () => {
		const { container } = render(
			SidebarGroup,
			{ slots: { children: "" } },
			{ wrapper: SidebarProviderHarness },
		);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
