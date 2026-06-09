import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import RatingGroup from "../../src/components/RatingGroup.svelte";

describe("RatingGroup", () => {
	it("renders the correct number of stars", () => {
		const { container } = render(RatingGroup, { props: { max: 5 } });
		const items = container.querySelectorAll('[class*="inline-flex"]');
		expect(items.length).toBeGreaterThanOrEqual(5);
	});

	it("renders with a default value", () => {
		render(RatingGroup, { props: { value: 3, max: 5 } });
		const stars = screen.getAllByText("★");
		expect(stars.length).toBe(5);
	});

	it("renders disabled state", () => {
		const { container } = render(RatingGroup, { props: { disabled: true, max: 3 } });
		expect(container).toBeInTheDocument();
	});
});
