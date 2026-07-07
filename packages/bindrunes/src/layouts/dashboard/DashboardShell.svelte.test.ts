import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarProviderHarness from "../__tests__/harness/SidebarProviderHarness.svelte";
import DashboardShell from "./DashboardShell.svelte";

describe("DashboardShell", () => {
	it("renders without errors", () => {
		const { container } = render(DashboardShell, {}, { wrapper: SidebarProviderHarness });
		expect(container).toBeTruthy();
	});

	it("renders with default props", () => {
		render(DashboardShell, {}, { wrapper: SidebarProviderHarness });
		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("renders custom appName", () => {
		render(DashboardShell, { appName: "MyApp" }, { wrapper: SidebarProviderHarness });
		expect(screen.getByText("MyApp")).toBeInTheDocument();
	});

	it("renders custom defaultTitle", () => {
		render(DashboardShell, { defaultTitle: "Custom Title" }, { wrapper: SidebarProviderHarness });
		expect(screen.getByText("Custom Title")).toBeInTheDocument();
	});

	it("renders scopeLabel when provided with default variant", () => {
		render(DashboardShell, { scopeLabel: "Scope" }, { wrapper: SidebarProviderHarness });
		expect(screen.getByText("Scope")).toBeInTheDocument();
	});

	it("does not render scopeLabel when variant is right", () => {
		render(
			DashboardShell,
			{ variant: "right", scopeLabel: "Scope" },
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.queryByText("Scope")).not.toBeInTheDocument();
	});

	it("renders custom pageTitle over defaultTitle", () => {
		render(
			DashboardShell,
			{ defaultTitle: "Default", pageTitle: "Override" },
			{ wrapper: SidebarProviderHarness },
		);
		expect(screen.getByText("Override")).toBeInTheDocument();
		expect(screen.queryByText("Default")).not.toBeInTheDocument();
	});
});
