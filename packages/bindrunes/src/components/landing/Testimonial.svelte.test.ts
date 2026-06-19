import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Testimonial from "./Testimonial.svelte";

describe("Testimonial", () => {
	const base = { quote: "Great product!", author: "Jane Doe", role: "CEO" };

	it("renders the quote", () => {
		render(Testimonial, base);
		expect(screen.getByText(/Great product!/)).toBeInTheDocument();
	});

	it("wraps quote in blockquote", () => {
		const { container } = render(Testimonial, base);
		const bq = container.querySelector("blockquote");
		expect(bq).not.toBeNull();
	});

	it("renders the author", () => {
		render(Testimonial, base);
		expect(screen.getByText("Jane Doe")).toBeInTheDocument();
	});

	it("renders the role when provided", () => {
		render(Testimonial, base);
		expect(screen.getByText("CEO")).toBeInTheDocument();
	});

	it("does not render role element when missing", () => {
		const { container } = render(Testimonial, { quote: "X", author: "Y" });
		const cite = container.querySelector("cite");
		expect(cite?.querySelectorAll("p").length).toBe(1);
	});

	it("uses avatarFallback when provided", () => {
		const { container } = render(Testimonial, {
			quote: "X",
			author: "Y",
			avatarFallback: "JD",
		});
		expect(container.textContent).toContain("JD");
	});

	it("applies class prop", () => {
		const { container } = render(Testimonial, { ...base, class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});
});
