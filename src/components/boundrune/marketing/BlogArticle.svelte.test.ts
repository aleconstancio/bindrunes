import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import BlogArticle from "./BlogArticle.svelte";

describe("BlogArticle", () => {
	it("renders title", () => {
		render(BlogArticle, { title: "My First Post" });
		expect(screen.getByText("My First Post")).toBeInTheDocument();
	});

	it("renders content paragraphs", () => {
		render(BlogArticle, { title: "X", content: "First paragraph\nSecond paragraph" });
		expect(screen.getByText("First paragraph")).toBeInTheDocument();
		expect(screen.getByText("Second paragraph")).toBeInTheDocument();
	});

	it("renders author name", () => {
		render(BlogArticle, { title: "X", authorName: "Jane Doe" });
		expect(screen.getByText("Jane Doe")).toBeInTheDocument();
	});

	it("renders author role", () => {
		render(BlogArticle, { title: "X", authorName: "Jane", authorRole: "Engineer" });
		expect(screen.getByText("Engineer")).toBeInTheDocument();
	});

	it("renders publish date", () => {
		render(BlogArticle, { title: "X", publishDate: "2025-01-15" });
		expect(screen.getByText("2025-01-15")).toBeInTheDocument();
	});

	it("renders read time", () => {
		render(BlogArticle, { title: "X", readTime: "5" });
		expect(screen.getByText("5 min read")).toBeInTheDocument();
	});

	it("renders tags", () => {
		render(BlogArticle, { title: "X", tags: ["Svelte", "WebDev"] });
		expect(screen.getByText("Svelte")).toBeInTheDocument();
		expect(screen.getByText("WebDev")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(BlogArticle, { title: "X", class: "my-article" });
		expect(container.firstElementChild?.className).toContain("my-article");
	});

	it("renders in an article element", () => {
		const { container } = render(BlogArticle, { title: "X" });
		expect(container.querySelector("article")).not.toBeNull();
	});
});
