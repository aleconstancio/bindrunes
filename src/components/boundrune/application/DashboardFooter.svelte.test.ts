import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import DashboardFooter from "./DashboardFooter.svelte";

describe("DashboardFooter", () => {
	it("renders brand name", () => {
		render(DashboardFooter, { brand: "Acme Corp" });
		expect(screen.getByText(/Acme Corp/)).toBeInTheDocument();
	});

	it("renders current year by default", () => {
		render(DashboardFooter, { brand: "X" });
		const year = new Date().getFullYear().toString();
		expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
	});

	it("renders custom year", () => {
		render(DashboardFooter, { brand: "X", year: 2024 });
		expect(screen.getByText(/2024/)).toBeInTheDocument();
	});

	it("renders links", () => {
		const links = [
			{ label: "Privacy", href: "/privacy" },
			{ label: "Terms", href: "/terms" },
		];
		render(DashboardFooter, { brand: "X", links });
		expect(screen.getByText("Privacy")).toBeInTheDocument();
		expect(screen.getByText("Terms")).toBeInTheDocument();
	});

	it("renders link hrefs", () => {
		const links = [{ label: "Privacy", href: "/privacy" }];
		render(DashboardFooter, { brand: "X", links });
		const link = screen.getByText("Privacy");
		expect(link).toHaveAttribute("href", "/privacy");
	});

	it("renders empty without links", () => {
		render(DashboardFooter, { brand: "X", links: [] });
		expect(screen.getByText(/X/)).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(DashboardFooter, { brand: "X", class: "my-footer" });
		expect(container.firstElementChild?.className).toContain("my-footer");
	});
});
