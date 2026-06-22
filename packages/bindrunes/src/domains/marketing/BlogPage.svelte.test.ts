import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import BlogPage from "./BlogPage.svelte";

describe("BlogPage", () => {
	it("renders without errors", () => {
		const { container } = render(BlogPage);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		render(BlogPage);
		expect(screen.getByText("Blog")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(BlogPage, { title: "Our Blog" });
		expect(screen.getByText("Our Blog")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(BlogPage, { class: "blog-class" });
		expect(container.firstElementChild?.className).toContain("blog-class");
	});
});
