import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SocialProof from "./SocialProof.svelte";

describe("SocialProof", () => {
	const testimonials = [
		{ quote: "Amazing product!", author: "Alice", role: "CTO" },
		{ quote: "Changed our workflow", author: "Bob" },
	];

	const logos = [{ name: "Acme" }, { name: "TechCo", url: "https://techco.com" }];

	it("renders title", () => {
		render(SocialProof, { title: "Trusted by thousands", testimonials, logos });
		expect(screen.getByText("Trusted by thousands")).toBeInTheDocument();
	});

	it("renders testimonials", () => {
		render(SocialProof, { testimonials });
		expect(screen.getByText(/Amazing product!/)).toBeInTheDocument();
		expect(screen.getByText(/Changed our workflow/)).toBeInTheDocument();
	});

	it("renders author names", () => {
		render(SocialProof, { testimonials });
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
	});

	it("renders roles", () => {
		render(SocialProof, { testimonials });
		expect(screen.getByText("CTO")).toBeInTheDocument();
	});

	it("renders logos", () => {
		render(SocialProof, { logos });
		expect(screen.getByText("Acme")).toBeInTheDocument();
		expect(screen.getByText("TechCo")).toBeInTheDocument();
	});

	it("renders logo links", () => {
		render(SocialProof, { logos });
		const link = screen.getByText("TechCo");
		expect(link).toHaveAttribute("href", "https://techco.com");
	});

	it("renders 'Trusted by' label", () => {
		render(SocialProof, { logos });
		expect(screen.getByText("Trusted by")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(SocialProof, { testimonials, class: "my-social" });
		expect(container.firstElementChild?.className).toContain("my-social");
	});

	it("renders empty for no data", () => {
		render(SocialProof, { testimonials: [], logos: [] });
		expect(screen.queryByText("Trusted by")).not.toBeInTheDocument();
	});
});
