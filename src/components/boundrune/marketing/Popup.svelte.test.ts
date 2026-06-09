import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Popup from "./Popup.svelte";

describe("Popup", () => {
	it("does not render when closed", () => {
		render(Popup, { open: false, title: "Hidden" });
		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});

	it("renders when open", () => {
		render(Popup, { open: true, title: "Welcome" });
		expect(screen.getByText("Welcome")).toBeInTheDocument();
	});

	it("renders title", () => {
		render(Popup, { open: true, title: "Special Offer" });
		expect(screen.getByText("Special Offer")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(Popup, { open: true, title: "X", description: "Get 50% off" });
		expect(screen.getByText("Get 50% off")).toBeInTheDocument();
	});

	it("renders badge", () => {
		render(Popup, { open: true, title: "X", badge: "New" });
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("renders CTA label", () => {
		render(Popup, { open: true, title: "X", ctaLabel: "Sign up" });
		expect(screen.getByText("Sign up")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		render(Popup, { open: true, title: "X", class: "my-popup" });
		const dialog = document.querySelector("[role='dialog']");
		expect(dialog).not.toBeNull();
	});
});
