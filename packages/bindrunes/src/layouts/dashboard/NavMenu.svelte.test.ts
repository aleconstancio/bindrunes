import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarProviderHarness from "../__tests__/harness/SidebarProviderHarness.svelte";
import NavMenu from "./NavMenu.svelte";

describe("NavMenu", () => {
	it("renders without crashing", () => {
		const { container } = render(NavMenu, {}, { wrapper: SidebarProviderHarness });
		expect(container).toBeTruthy();
	});

	it("renders navigation groups", () => {
		render(
			NavMenu,
			{
				groups: [
					{
						label: "Main",
						items: [{ title: "Home", to: "/", description: "Home page", icon: "🏠" }],
					},
				],
			},
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("renders multiple groups", () => {
		render(
			NavMenu,
			{
				groups: [
					{
						label: "Group 1",
						items: [{ title: "Item 1", to: "/1", description: "Desc 1", icon: "1" }],
					},
					{
						label: "Group 2",
						items: [{ title: "Item 2", to: "/2", description: "Desc 2", icon: "2" }],
					},
				],
			},
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
	});

	it("renders with empty groups", () => {
		const { container } = render(NavMenu, { groups: [] }, { wrapper: SidebarProviderHarness });
		expect(container).toBeTruthy();
	});

	it("renders string icons", () => {
		render(
			NavMenu,
			{
				groups: [
					{
						label: "Test",
						items: [{ title: "Item", to: "/x", description: "D", icon: "★" }],
					},
				],
			},
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.getByText("★")).toBeInTheDocument();
	});

	it("renders with pathname", () => {
		render(
			NavMenu,
			{
				pathname: "/settings",
				groups: [
					{
						label: "Nav",
						items: [
							{ title: "Home", to: "/", description: "Overview", icon: "H" },
							{ title: "Settings", to: "/settings", description: "Config", icon: "S" },
						],
					},
				],
			},
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("renders with match property", () => {
		render(
			NavMenu,
			{
				pathname: "/settings/general",
				groups: [
					{
						label: "Nav",
						items: [
							{
								title: "Settings",
								to: "/settings",
								match: "/settings",
								description: "S",
								icon: "S",
							},
						],
					},
				],
			},
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});
});
