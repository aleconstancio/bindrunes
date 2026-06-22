import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SiteFooterColumns from "./SiteFooterColumns.svelte";

const columns = [
	{
		title: "Product",
		links: [
			{ label: "Features", href: "/features" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About", href: "/about" },
			{ label: "Blog", href: "/blog" },
		],
	},
];

describe("SiteFooterColumns", () => {
	it("renders without errors", () => {
		const { container } = render(SiteFooterColumns);
		expect(container).toBeTruthy();
	});

	it("renders column titles", () => {
		render(SiteFooterColumns, { columns });
		expect(screen.getByText("Product")).toBeInTheDocument();
		expect(screen.getByText("Company")).toBeInTheDocument();
	});

	it("renders link labels", () => {
		render(SiteFooterColumns, { columns });
		expect(screen.getByText("Features")).toBeInTheDocument();
		expect(screen.getByText("Pricing")).toBeInTheDocument();
		expect(screen.getByText("About")).toBeInTheDocument();
		expect(screen.getByText("Blog")).toBeInTheDocument();
	});

	it("renders copyright", () => {
		render(SiteFooterColumns, { copyright: "2024 Acme" });
		expect(screen.getByText("2024 Acme")).toBeInTheDocument();
	});

	it("renders social links", () => {
		render(SiteFooterColumns, {
			socialLinks: [{ label: "Twitter", href: "https://twitter.com" }],
		});
		expect(screen.getByText("Twitter")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(SiteFooterColumns, { class: "footer-class" });
		expect(container.firstElementChild?.className).toContain("footer-class");
	});
});
