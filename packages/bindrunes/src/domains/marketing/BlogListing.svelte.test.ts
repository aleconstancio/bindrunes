import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import BlogListing from "./BlogListing.svelte";

const posts = [
	{
		id: "1",
		title: "Getting Started",
		excerpt: "A beginner guide",
		author: "Alice",
		date: "2024-01-15",
		readTime: "5",
		tags: ["guide", "intro"],
		href: "/blog/getting-started",
	},
	{
		id: "2",
		title: "Advanced Tips",
		excerpt: "Level up your skills",
		author: "Bob",
		date: "2024-02-10",
		tips: ["advanced"],
		href: "/blog/advanced-tips",
	},
];

describe("BlogListing", () => {
	it("renders without errors", () => {
		const { container } = render(BlogListing);
		expect(container).toBeTruthy();
	});

	it("renders post titles", () => {
		render(BlogListing, { posts });
		expect(screen.getByText("Getting Started")).toBeInTheDocument();
		expect(screen.getByText("Advanced Tips")).toBeInTheDocument();
	});

	it("renders post excerpts", () => {
		render(BlogListing, { posts });
		expect(screen.getByText("A beginner guide")).toBeInTheDocument();
		expect(screen.getByText("Level up your skills")).toBeInTheDocument();
	});

	it("renders author and date", () => {
		render(BlogListing, { posts });
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("2024-01-15")).toBeInTheDocument();
	});

	it("renders tags", () => {
		render(BlogListing, { posts });
		expect(screen.getByText("guide")).toBeInTheDocument();
		expect(screen.getByText("intro")).toBeInTheDocument();
	});

	it("renders read time", () => {
		render(BlogListing, { posts });
		expect(screen.getByText(/min read/)).toBeInTheDocument();
	});

	it("shows empty state for no posts", () => {
		const { container } = render(BlogListing, { posts: [] });
		expect(container.querySelectorAll("a").length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(BlogListing, { class: "listing-class" });
		expect(container.firstElementChild?.className).toContain("listing-class");
	});
});
