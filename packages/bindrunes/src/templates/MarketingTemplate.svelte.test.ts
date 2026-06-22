import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import MarketingTemplate from "./MarketingTemplate.svelte";

describe("MarketingTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(MarketingTemplate);
		expect(container).toBeTruthy();
	});

	it("renders landing page wrapper", () => {
		const { container } = render(MarketingTemplate);
		expect(container.querySelector(".landing-page")).toBeTruthy();
	});

	it("renders with features", () => {
		const { container } = render(MarketingTemplate, {
			props: {
				features: [{ icon: "🚀", title: "Fast", description: "Lightning speed" }],
			},
		});
		expect(container.textContent).toContain("Features");
	});

	it("renders with pricing plans", () => {
		const { container } = render(MarketingTemplate, {
			props: {
				plans: [
					{
						name: "Pro",
						monthly: 29,
						annual: 290,
						features: ["Feature 1"],
						cta: { label: "Buy", href: "/buy" },
					},
				],
			},
		});
		expect(container.textContent).toContain("Pricing");
	});

	it("renders with CTA", () => {
		const { container } = render(MarketingTemplate, {
			props: {
				ctaTitle: "Ready to start?",
				ctaDescription: "Join now",
			},
		});
		expect(container.textContent).toContain("Ready to start?");
	});

	it("applies class prop", () => {
		const { container } = render(MarketingTemplate, { props: { class: "mkt-class" } });
		expect(container.firstElementChild?.className).toContain("mkt-class");
	});
});
