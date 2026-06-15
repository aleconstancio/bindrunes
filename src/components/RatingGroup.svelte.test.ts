import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import RatingGroup from "./RatingGroup.svelte";

describe("RatingGroup", () => {
	it("renders the correct number of stars", () => {
		render(RatingGroup, { props: { max: 5 } });
		const stars = screen.getAllByText("★");
		expect(stars.length).toBe(5);
	});

	it("renders with a default value", () => {
		render(RatingGroup, { props: { value: 3, max: 5 } });
		const stars = screen.getAllByText("★");
		expect(stars.length).toBe(5);
	});

	it("renders disabled state", () => {
		const { container } = render(RatingGroup, { props: { disabled: true, max: 3 } });
		const root = container.firstElementChild;
		expect(root).toBeInTheDocument();
	});

	it("renders the root element", () => {
		const { container } = render(RatingGroup, { props: { max: 3 } });
		const root = container.firstElementChild;
		expect(root).toBeInTheDocument();
	});
});
