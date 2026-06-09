import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import CommentSection from "./CommentSection.svelte";

describe("CommentSection", () => {
	const comments = [
		{ author: "Alice", content: "Great post!", date: "2025-01-15" },
		{ author: "Bob", content: "Thanks for sharing" },
	];

	it("renders heading", () => {
		render(CommentSection, { items: comments });
		expect(screen.getByText("Comments")).toBeInTheDocument();
	});

	it("renders comments", () => {
		render(CommentSection, { items: comments });
		expect(screen.getByText("Great post!")).toBeInTheDocument();
		expect(screen.getByText("Thanks for sharing")).toBeInTheDocument();
	});

	it("renders author names", () => {
		render(CommentSection, { items: comments });
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
	});

	it("renders dates", () => {
		render(CommentSection, { items: comments });
		expect(screen.getByText("2025-01-15")).toBeInTheDocument();
	});

	it("renders avatar fallback initials", () => {
		render(CommentSection, { items: comments });
		expect(screen.getByText("A")).toBeInTheDocument();
		expect(screen.getByText("B")).toBeInTheDocument();
	});

	it("renders textarea when onSubmit provided", () => {
		render(CommentSection, { items: comments, onSubmit: vi.fn() });
		expect(screen.getByPlaceholderText("Write a comment...")).toBeInTheDocument();
	});

	it("does not render textarea without onSubmit", () => {
		render(CommentSection, { items: comments });
		expect(screen.queryByPlaceholderText("Write a comment...")).not.toBeInTheDocument();
	});

	it("renders post button", () => {
		render(CommentSection, { items: comments, onSubmit: vi.fn() });
		expect(screen.getByText("Post comment")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CommentSection, { items: comments, class: "my-comments" });
		expect(container.firstElementChild?.className).toContain("my-comments");
	});
});
