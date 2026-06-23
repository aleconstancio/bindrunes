import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Cart from "./Cart.svelte";

describe("Cart", () => {
	it("renders without errors", () => {
		const { container } = render(Cart);
		expect(container).toBeTruthy();
	});

	it("renders empty message when no items", () => {
		render(Cart);
		expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
	});

	it("renders custom empty message", () => {
		render(Cart, { emptyMessage: "Nothing here" });
		expect(screen.getByText("Nothing here")).toBeInTheDocument();
	});

	it("renders cart heading with count", () => {
		render(Cart, { items: [{ id: "1", name: "Widget", price: 9.99, quantity: 2 }] });
		expect(screen.getByText("Cart (2)")).toBeInTheDocument();
	});

	it("renders checkout button when onCheckout provided", () => {
		const items = [{ id: "1", name: "Widget", price: 10, quantity: 1 }];
		render(Cart, { items, onCheckout: () => {} });
		expect(screen.getByText(/Checkout/)).toBeInTheDocument();
	});
});
