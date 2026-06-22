import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardShellTopnav from "./DashboardShellTopnav.svelte";

describe("DashboardShellTopnav", () => {
	it("renders without crashing", () => {
		const { container } = render(DashboardShellTopnav);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders header element", () => {
		const { container } = render(DashboardShellTopnav);
		expect(container.querySelector("header")).toBeInTheDocument();
	});

	it("renders appName", () => {
		render(DashboardShellTopnav, { appName: "My App" });
		expect(screen.getByText("My App")).toBeInTheDocument();
	});

	it("renders navigation items", () => {
		render(DashboardShellTopnav, {
			navigation: [
				{
					label: "Main",
					items: [
						{ title: "Home", to: "/", description: "Home page" },
						{ title: "Settings", to: "/settings", description: "Settings page" },
					],
				},
			],
		});
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	it("renders with statusChip", () => {
		render(DashboardShellTopnav, {
			statusChip: { label: "Online", variant: "success" },
		});
		expect(screen.getByText("Online")).toBeInTheDocument();
	});

	it("renders main content area", () => {
		render(DashboardShellTopnav);
		expect(document.querySelector("main")).toBeInTheDocument();
	});

	it("renders with empty navigation", () => {
		const { container } = render(DashboardShellTopnav, { navigation: [] });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with brandIcon as string", () => {
		render(DashboardShellTopnav, { brandIcon: "BG" });
		expect(screen.getByText("BG")).toBeInTheDocument();
	});
});
