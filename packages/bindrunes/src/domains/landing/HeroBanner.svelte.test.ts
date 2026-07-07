import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import HeroBannerHarness from "./__tests__/HeroBannerHarness.svelte";

describe("HeroBanner", () => {
	it("renders the section element", () => {
		const { container } = render(HeroBannerHarness);
		expect(container.querySelector("section")).not.toBeNull();
	});

	it("renders title text as h1 by default (level=1)", () => {
		render(HeroBannerHarness);
		const h1 = screen.getByRole("heading", { name: "Test Title", level: 1 });
		expect(h1).toBeInTheDocument();
	});

	it("renders title as h2 when level=2", () => {
		render(HeroBannerHarness, { level: 2 });
		const h2 = screen.getByRole("heading", { name: "Test Title", level: 2 });
		expect(h2).toBeInTheDocument();
	});

	it("renders description text", () => {
		render(HeroBannerHarness, {
			description: "This is a description",
		});
		expect(screen.getByText("This is a description")).toBeInTheDocument();
	});

	it("does not render description when omitted", () => {
		render(HeroBannerHarness);
		expect(screen.queryByText("This is a description")).not.toBeInTheDocument();
	});

	it("renders badge when provided", () => {
		render(HeroBannerHarness, {
			badge: "New Release",
		});
		expect(screen.getByText("New Release")).toBeInTheDocument();
	});

	it("does not render badge when omitted", () => {
		render(HeroBannerHarness);
		expect(screen.queryByText("New Release")).not.toBeInTheDocument();
	});

	it("renders footnote", () => {
		render(HeroBannerHarness, {
			footnote: { title: "Note:", description: " details here" },
		});
		expect(screen.getByText("Note:")).toBeInTheDocument();
		expect(screen.getByText(/details here/)).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(HeroBannerHarness, {
			class: "my-hero",
		});
		expect(container.firstElementChild?.className).toContain("my-hero");
	});

	it("applies hero-gradient class when background=gradient", () => {
		const { container } = render(HeroBannerHarness, {
			background: "gradient",
		});
		expect(container.firstElementChild?.className).toContain("hero-gradient");
	});

	it("does not apply hero-gradient when background=solid", () => {
		const { container } = render(HeroBannerHarness, {
			background: "solid",
		});
		expect(container.firstElementChild?.className).not.toContain("hero-gradient");
	});

	it("applies custom class alongside default classes", () => {
		const { container } = render(HeroBannerHarness, {
			class: "custom-class",
		});
		const section = container.querySelector("section");
		expect(section?.className).toContain("hero-banner");
		expect(section?.className).toContain("custom-class");
	});

	it("a11y: hero banner has no violations", async () => {
		const { container } = render(HeroBannerHarness, {
			description: "Description text",
		});
		const { expectNoAxeViolations } = await import("../../helpers/axe");
		await expectNoAxeViolations(container);
	});
});
