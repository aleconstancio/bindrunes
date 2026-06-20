import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import PriceTag from "./PriceTag.svelte";

describe("PriceTag", () => {
	it("renders price", () => {
		render(PriceTag, { price: 29.99 });
		expect(screen.getByText("$29.99")).toBeInTheDocument();
	});

	it("renders with custom currency", () => {
		render(PriceTag, { price: 29.99, currency: "€" });
		expect(screen.getByText("€29.99")).toBeInTheDocument();
	});

	it("renders original price with discount", () => {
		render(PriceTag, { price: 29.99, originalPrice: 49.99 });
		expect(screen.getByText("$29.99")).toBeInTheDocument();
		expect(screen.getByText("$49.99")).toBeInTheDocument();
		expect(screen.getByText("-40%")).toBeInTheDocument();
	});

	it("renders without discount when no original price", () => {
		render(PriceTag, { price: 29.99 });
		expect(screen.queryByText("line-through")).not.toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(PriceTag, { price: 29.99, class: "my-price" });
		expect(container.firstElementChild?.className).toContain("my-price");
	});
});
