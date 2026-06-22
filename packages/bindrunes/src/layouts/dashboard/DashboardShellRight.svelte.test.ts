import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardShellRight from "./DashboardShellRight.svelte";

describe("DashboardShellRight", () => {
	it("renders without crashing", () => {
		const { container } = render(DashboardShellRight);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with appName", () => {
		const { container } = render(DashboardShellRight, { appName: "MyApp" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with navigation", () => {
		const { container } = render(DashboardShellRight, {
			navigation: [
				{
					label: "Nav",
					items: [{ title: "Home", to: "/", description: "Home", icon: "H" }],
				},
			],
		});
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with statusChip", () => {
		const { container } = render(DashboardShellRight, {
			statusChip: { label: "Active", variant: "success" },
		});
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with sidebarCollapsible=full", () => {
		const { container } = render(DashboardShellRight, { sidebarCollapsible: "full" });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
