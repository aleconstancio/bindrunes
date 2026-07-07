import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarProviderHarness from "../__tests__/harness/SidebarProviderHarness.svelte";
import DashboardShellRight from "./DashboardShellRight.svelte";

describe("DashboardShellRight", () => {
	it("renders without crashing", () => {
		const { container } = render(DashboardShellRight, {}, { wrapper: SidebarProviderHarness });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with appName", () => {
		const { container } = render(
			DashboardShellRight,
			{ appName: "MyApp" },
			{ wrapper: SidebarProviderHarness },
		);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with navigation", () => {
		const { container } = render(
			DashboardShellRight,
			{
				navigation: [
					{
						label: "Nav",
						items: [{ title: "Home", to: "/", description: "Home", icon: "H" }],
					},
				],
			},
			{ wrapper: SidebarProviderHarness },
		);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with statusChip", () => {
		const { container } = render(
			DashboardShellRight,
			{
				statusChip: { label: "Active", variant: "success" },
			},
			{ wrapper: SidebarProviderHarness },
		);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with sidebarCollapsible=full", () => {
		const { container } = render(
			DashboardShellRight,
			{ sidebarCollapsible: "full" },
			{ wrapper: SidebarProviderHarness },
		);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
