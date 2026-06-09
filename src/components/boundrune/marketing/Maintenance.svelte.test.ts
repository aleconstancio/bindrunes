import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Maintenance from "./Maintenance.svelte";

describe("Maintenance", () => {
	it("renders default title", () => {
		render(Maintenance);
		expect(screen.getByText("Under maintenance")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(Maintenance, { title: "Be right back" });
		expect(screen.getByText("Be right back")).toBeInTheDocument();
	});

	it("renders default description", () => {
		render(Maintenance);
		expect(screen.getByText(/scheduled maintenance/)).toBeInTheDocument();
	});

	it("renders custom description", () => {
		render(Maintenance, { description: "Upgrading servers" });
		expect(screen.getByText("Upgrading servers")).toBeInTheDocument();
	});

	it("renders estimated time", () => {
		render(Maintenance, { estimatedTime: "2 hours" });
		expect(screen.getByText("2 hours")).toBeInTheDocument();
	});

	it("renders contact link", () => {
		render(Maintenance, { contactHref: "/support", contactLabel: "Get help" });
		expect(screen.getByText("Get help")).toBeInTheDocument();
	});

	it("renders contact link href", () => {
		render(Maintenance, { contactHref: "/support", contactLabel: "Help" });
		const link = screen.getByText("Help");
		expect(link).toHaveAttribute("href", "/support");
	});

	it("does not render contact link when not provided", () => {
		render(Maintenance);
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(Maintenance, { class: "my-maint" });
		expect(container.firstElementChild?.className).toContain("my-maint");
	});
});
