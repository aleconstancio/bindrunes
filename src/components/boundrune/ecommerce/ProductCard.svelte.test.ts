import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ProductCard from "./ProductCard.svelte";

describe("ProductCard", () => {
	it("renders product name", () => {
		render(ProductCard, { name: "T-Shirt", price: 29.99 });
		expect(screen.getByText("T-Shirt")).toBeInTheDocument();
	});

	it("renders price", () => {
		render(ProductCard, { name: "T-Shirt", price: 29.99 });
		expect(screen.getByText("$29.99")).toBeInTheDocument();
	});

	it("renders original price with discount", () => {
		render(ProductCard, { name: "T-Shirt", price: 29.99, originalPrice: 49.99 });
		expect(screen.getByText("$49.99")).toBeInTheDocument();
	});

	it("renders badge", () => {
		render(ProductCard, { name: "T-Shirt", price: 29.99, badge: "Sale" });
		expect(screen.getByText("Sale")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(ProductCard, {
			name: "T-Shirt",
			price: 29.99,
			class: "my-product",
		});
		expect(container.firstElementChild?.className).toContain("my-product");
	});
});
