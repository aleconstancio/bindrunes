import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Checkout from "./Checkout.svelte";

describe("Checkout", () => {
	it("renders without errors", () => {
		const { container } = render(Checkout);
		expect(container).toBeTruthy();
	});

	it("renders checkout heading", () => {
		render(Checkout);
		expect(screen.getByText("Checkout")).toBeInTheDocument();
	});

	it("renders form fields", () => {
		render(Checkout);
		expect(screen.getByText("Full name")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(Checkout);
		expect(screen.getByText("Complete order")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(Checkout, { loading: true });
		expect(screen.getByText("Processing...")).toBeInTheDocument();
	});
});
