import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import OrderSummary from "./OrderSummary.svelte";

describe("OrderSummary", () => {
	const items = [
		{ name: "T-Shirt", quantity: 2, price: 29.99 },
		{ name: "Jeans", quantity: 1, price: 59.99 },
	];

	it("renders order items", () => {
		render(OrderSummary, { items });
		expect(screen.getByText("T-Shirt")).toBeInTheDocument();
		expect(screen.getByText("Jeans")).toBeInTheDocument();
	});

	it("renders subtotal", () => {
		render(OrderSummary, { items, shipping: 5, tax: 10 });
		expect(screen.getByText("Subtotal")).toBeInTheDocument();
	});

	it("renders total", () => {
		render(OrderSummary, { items });
		expect(screen.getByText("Total")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(OrderSummary, { items, class: "my-summary" });
		expect(container.firstElementChild?.className).toContain("my-summary");
	});
});
