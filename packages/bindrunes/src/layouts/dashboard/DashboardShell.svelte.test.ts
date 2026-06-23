import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardShell from "./DashboardShell.svelte";

describe("DashboardShell", () => {
	it("renders without errors", () => {
		const { container } = render(DashboardShell);
		expect(container).toBeTruthy();
	});

	it("renders with default props", () => {
		render(DashboardShell);
		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("renders custom appName", () => {
		render(DashboardShell, { appName: "MyApp" });
		expect(screen.getByText("MyApp")).toBeInTheDocument();
	});

	it("renders custom defaultTitle", () => {
		render(DashboardShell, { defaultTitle: "Custom Title" });
		expect(screen.getByText("Custom Title")).toBeInTheDocument();
	});

	it("renders scopeLabel when provided with default variant", () => {
		render(DashboardShell, { scopeLabel: "Scope" });
		expect(screen.getByText("Scope")).toBeInTheDocument();
	});

	it("does not render scopeLabel when variant is right", () => {
		render(DashboardShell, { variant: "right", scopeLabel: "Scope" });
		expect(screen.queryByText("Scope")).not.toBeInTheDocument();
	});

	it("renders custom pageTitle over defaultTitle", () => {
		render(DashboardShell, { defaultTitle: "Default", pageTitle: "Override" });
		expect(screen.getByText("Override")).toBeInTheDocument();
		expect(screen.queryByText("Default")).not.toBeInTheDocument();
	});
});
