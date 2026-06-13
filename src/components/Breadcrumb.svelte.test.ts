import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Breadcrumb from "./Breadcrumb.svelte";

describe("Breadcrumb", () => {
	it("renders nothing for empty items", () => {
		const { container } = render(Breadcrumb, { items: [] });
		expect(container.querySelectorAll("li")).toHaveLength(0);
	});

	it("renders all items", () => {
		render(Breadcrumb, {
			items: [{ label: "Home", href: "/" }, { label: "Docs", href: "/docs" }, { label: "Page" }],
		});
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Docs")).toBeInTheDocument();
		expect(screen.getByText("Page")).toBeInTheDocument();
	});

	it("renders links for non-last items with href", () => {
		render(Breadcrumb, {
			items: [{ label: "Home", href: "/" }, { label: "Last" }],
		});
		const link = screen.getByText("Home").closest("a");
		expect(link).not.toBeNull();
		expect(link?.getAttribute("href")).toBe("/");
	});

	it("renders plain span for last item", () => {
		render(Breadcrumb, {
			items: [{ label: "Home", href: "/" }, { label: "Last" }],
		});
		const last = screen.getByText("Last");
		expect(last.tagName).toBe("SPAN");
		expect(last.closest("a")).toBeNull();
	});

	it("renders plain span for items without href", () => {
		render(Breadcrumb, {
			items: [{ label: "NoLink" }, { label: "Last" }],
		});
		const span = screen.getByText("NoLink");
		expect(span.tagName).toBe("SPAN");
	});

	it("renders default separator between items", () => {
		const { container } = render(Breadcrumb, {
			items: [{ label: "A", href: "/a" }, { label: "B" }],
		});
		const separators = container.querySelectorAll('span[aria-hidden="true"]');
		expect(separators).toHaveLength(1);
		expect(separators[0].textContent).toBe("/");
	});

	it("renders custom separator", () => {
		const { container } = render(Breadcrumb, {
			items: [{ label: "A", href: "/a" }, { label: "B" }],
			separator: "→",
		});
		const separators = container.querySelectorAll('span[aria-hidden="true"]');
		expect(separators[0].textContent).toBe("→");
	});

	it("marks separators as aria-hidden", () => {
		const { container } = render(Breadcrumb, {
			items: [{ label: "A", href: "/a" }, { label: "B" }, { label: "C" }],
		});
		const separators = container.querySelectorAll('span[aria-hidden="true"]');
		expect(separators).toHaveLength(2);
	});

	it('uses nav with aria-label="Breadcrumb"', () => {
		const { container } = render(Breadcrumb, { items: [{ label: "X" }] });
		const nav = container.querySelector("nav");
		expect(nav).not.toBeNull();
		expect(nav?.getAttribute("aria-label")).toBe("Breadcrumb");
	});

	it("passes a11y checks", async () => {
		const { container } = render(Breadcrumb, {
			items: [{ label: "Home", href: "/" }, { label: "Current" }],
		});
		await expectNoAxeViolations(container);
	});
});
