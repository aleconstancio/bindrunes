import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CartItem from "./CartItem.svelte";

describe("CartItem", () => {
	it("renders item name", () => {
		render(CartItem, { name: "T-Shirt", price: 29.99, quantity: 1 });
		expect(screen.getByText("T-Shirt")).toBeInTheDocument();
	});

	it("renders price", () => {
		render(CartItem, { name: "T-Shirt", price: 29.99, quantity: 1 });
		expect(screen.getByText("$29.99")).toBeInTheDocument();
	});

	it("renders quantity", () => {
		render(CartItem, { name: "T-Shirt", price: 29.99, quantity: 3 });
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CartItem, {
			name: "T-Shirt",
			price: 29.99,
			quantity: 1,
			class: "my-item",
		});
		expect(container.firstElementChild?.className).toContain("my-item");
	});
});
