import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarProviderHarness from "../layouts/__tests__/harness/SidebarProviderHarness.svelte";
import NavMenu from "../layouts/dashboard/NavMenu.svelte";

describe("NavMenu", () => {
	const groups = [
		{
			label: "Main",
			items: [{ title: "Home", to: "/home", description: "Go home", icon: "🏠" }],
		},
	];

	it("renders group labels", () => {
		render(NavMenu, { props: { groups } }, { wrapper: SidebarProviderHarness });
		expect(screen.getByText("Main")).toBeInTheDocument();
	});

	it("renders navigation items", () => {
		render(NavMenu, { props: { groups } }, { wrapper: SidebarProviderHarness });
		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("renders the navigation element", () => {
		const { container } = render(
			NavMenu,
			{ props: { groups } },
			{ wrapper: SidebarProviderHarness },
		);
		const nav = container.querySelector("nav");
		expect(nav).toBeInTheDocument();
	});
});
