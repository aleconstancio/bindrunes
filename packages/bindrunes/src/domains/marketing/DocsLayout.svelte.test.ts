import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DocsLayout from "./DocsLayout.svelte";

const sections = [
	{ id: "intro", title: "Introduction" },
	{ id: "setup", title: "Getting Started" },
];

describe("DocsLayout", () => {
	it("renders without errors", () => {
		const { container } = render(DocsLayout);
		expect(container).toBeTruthy();
	});

	it("renders section titles in sidebar", () => {
		render(DocsLayout, { sections });
		expect(screen.getByText("Introduction")).toBeInTheDocument();
		expect(screen.getByText("Getting Started")).toBeInTheDocument();
	});

	it("renders empty sidebar for no sections", () => {
		const { container } = render(DocsLayout, { sections: [] });
		expect(container.querySelector("aside")).toBeTruthy();
	});

	it("applies class prop", () => {
		const { container } = render(DocsLayout, { class: "docs-class" });
		expect(container.firstElementChild?.className).toContain("docs-class");
	});
});
