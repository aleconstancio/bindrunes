import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TestimonialGrid from "./TestimonialGrid.svelte";

const testimonials = [
	{ quote: "Q1", author: "A1" },
	{ quote: "Q2", author: "A2" },
];

describe("TestimonialGrid", () => {
	it("renders grid container", () => {
		const { container } = render(TestimonialGrid, { testimonials });
		expect(container.querySelector(".grid")).not.toBeNull();
	});

	it("renders all testimonials", () => {
		render(TestimonialGrid, { testimonials });
		expect(screen.getByText("A1")).toBeInTheDocument();
		expect(screen.getByText("A2")).toBeInTheDocument();
	});

	it("renders nothing for empty testimonials", () => {
		const { container } = render(TestimonialGrid, { testimonials: [] });
		expect(container.querySelectorAll("blockquote").length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(TestimonialGrid, { testimonials, class: "custom" });
		expect(container.querySelector(".grid")?.className).toContain("custom");
	});
});
