import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AuthLayout from "./AuthLayout.svelte";

describe("AuthLayout", () => {
	it("renders without errors", () => {
		const { container } = render(AuthLayout);
		expect(container).toBeTruthy();
	});

	it("renders brand title", () => {
		render(AuthLayout, { brandTitle: "My App" });
		expect(screen.getAllByText("My App").length).toBeGreaterThan(0);
	});

	it("renders brand description", () => {
		render(AuthLayout, { brandDescription: "Welcome back" });
		expect(screen.getByText("Welcome back")).toBeInTheDocument();
	});

	it("renders brand image when provided", () => {
		const { container } = render(AuthLayout, { brandImage: "/logo.png", brandTitle: "App" });
		const img = container.querySelector("img");
		expect(img).toBeTruthy();
		expect(img?.getAttribute("src")).toBe("/logo.png");
	});

	it("does not render brand image when not provided", () => {
		const { container } = render(AuthLayout);
		expect(container.querySelector("img")).toBeNull();
	});

	it("renders children", () => {
		render(AuthLayout, {}, { props: { children: "Child content" } });
	});

	it("applies class prop", () => {
		const { container } = render(AuthLayout, { class: "custom-layout" });
		expect(container.firstElementChild?.className).toContain("custom-layout");
	});
});
