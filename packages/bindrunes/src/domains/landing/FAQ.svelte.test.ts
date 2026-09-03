import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import FAQ from "./FAQ.svelte";
import type { FAQItem } from "./landing-types";

const items: FAQItem[] = [
	{ question: "What is urupe-ui?", answer: "A UI library." },
	{ question: "How do I install?", answer: "npm install urupe-ui" },
];

describe("FAQ", () => {
	it("renders the section", () => {
		const { container } = render(FAQ, { items });
		const section = container.querySelector("div");
		expect(section?.className).toContain("max-w-[var(--container-md)]");
	});

	it("renders each question", () => {
		render(FAQ, { items });
		expect(screen.getByText("What is urupe-ui?")).toBeInTheDocument();
		expect(screen.getByText("How do I install?")).toBeInTheDocument();
	});

	it("renders the answer (in accordion body)", () => {
		const { container } = render(FAQ, { items });
		expect(container.textContent).toContain("A UI library.");
		expect(container.textContent).toContain("npm install urupe-ui");
	});

	it("renders nothing extra for empty items", () => {
		const { container } = render(FAQ, { items: [] });
		expect(container.querySelectorAll("button").length).toBe(0);
	});

	it("uses defaultOpen when provided", () => {
		const { container } = render(FAQ, { items, defaultOpen: "What is urupe-ui?" });
		expect(container.textContent).toContain("A UI library.");
	});

	it("applies class prop", () => {
		const { container } = render(FAQ, { items, class: "my-faq" });
		expect(container.firstElementChild?.className).toContain("my-faq");
	});
});
