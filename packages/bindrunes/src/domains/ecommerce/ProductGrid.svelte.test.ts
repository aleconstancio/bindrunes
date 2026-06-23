import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ProductGrid from "./ProductGrid.svelte";

const products = [
	{ id: "1", name: "Widget", price: 9.99 },
	{ id: "2", name: "Gadget", price: 19.99 },
];

describe("ProductGrid", () => {
	it("renders without errors", () => {
		const { container } = render(ProductGrid);
		expect(container).toBeTruthy();
	});

	it("renders grid container", () => {
		const { container } = render(ProductGrid, { products });
		expect(container.querySelector(".grid")).not.toBeNull();
	});

	it("renders products", () => {
		const { container } = render(ProductGrid, { products });
		expect(container.querySelectorAll("[class*='grid'] > *").length).toBe(2);
	});

	it("applies custom class", () => {
		const { container } = render(ProductGrid, { class: "my-grid" });
		expect(container.firstElementChild?.className).toContain("my-grid");
	});
});
