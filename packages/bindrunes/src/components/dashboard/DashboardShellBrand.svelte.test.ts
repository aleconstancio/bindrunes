import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardShellBrand from "./DashboardShellBrand.svelte";

describe("DashboardShellBrand", () => {
	it("renders nothing when no brand props", () => {
		const { container } = render(DashboardShellBrand, {});
		expect(container.firstElementChild).toBeNull();
	});

	it("renders appName as label", () => {
		render(DashboardShellBrand, { appName: "Bindrunes" });
		expect(screen.getByText("Bindrunes")).toBeInTheDocument();
	});

	it("renders appSubtitle when provided", () => {
		render(DashboardShellBrand, { appName: "X", appSubtitle: "Sub" });
		expect(screen.getByText("Sub")).toBeInTheDocument();
	});

	it("renders brandIcon as string when provided", () => {
		render(DashboardShellBrand, { appName: "X", brandIcon: "🌟" });
		expect(screen.getByText("🌟")).toBeInTheDocument();
	});

	it("applies layout classes when rendered", () => {
		const { container } = render(DashboardShellBrand, { appName: "X" });
		const root = container.firstElementChild;
		expect(root?.className).toContain("flex");
		expect(root?.className).toContain("items-center");
	});
});
