import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import PageHeader from "./PageHeader.svelte";

describe("PageHeader", () => {
	it("renders without crashing", () => {
		const { container } = render(PageHeader);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders title", () => {
		render(PageHeader, { title: "My Page" });
		expect(screen.getByText("My Page")).toBeInTheDocument();
	});

	it("renders h1 element", () => {
		const { container } = render(PageHeader, { title: "Test" });
		expect(container.querySelector("h1")).toBeInTheDocument();
	});

	it("renders description when provided", () => {
		render(PageHeader, { title: "T", description: "A description" });
		expect(screen.getByText("A description")).toBeInTheDocument();
	});

	it("does not render description when not provided", () => {
		const { container } = render(PageHeader, { title: "T" });
		expect(container.querySelectorAll("p").length).toBe(0);
	});

	it("renders back link when backHref provided", () => {
		render(PageHeader, { title: "T", backHref: "/previous" });
		const link = screen.getByLabelText("Go back");
		expect(link).toHaveAttribute("href", "/previous");
	});

	it("does not render back link when backHref not provided", () => {
		render(PageHeader, { title: "T" });
		expect(screen.queryByLabelText("Go back")).not.toBeInTheDocument();
	});

	it("renders breadcrumbs when provided", () => {
		render(PageHeader, {
			title: "T",
			breadcrumbs: [{ label: "Home", href: "/" }, { label: "Page" }],
		});
		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("does not render breadcrumbs when empty", () => {
		render(PageHeader, { title: "T", breadcrumbs: [] });
		expect(screen.queryByText("Home")).not.toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(PageHeader, { title: "T", class: "my-header" });
		expect(container.firstElementChild?.className).toContain("my-header");
	});
});
