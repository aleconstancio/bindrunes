import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Banner from "./Banner.svelte";

describe("Banner", () => {
	it("renders text content", () => {
		render(Banner, { text: "New feature available!" });
		expect(screen.getByText("New feature available!")).toBeInTheDocument();
	});

	it("renders CTA button when provided", () => {
		render(Banner, { text: "Sale!", ctaLabel: "Shop now", ctaHref: "/shop" });
		expect(screen.getByText("Shop now")).toBeInTheDocument();
	});

	it("does not render CTA when not provided", () => {
		render(Banner, { text: "Sale!" });
		expect(screen.queryByRole("link", { name: "Shop now" })).not.toBeInTheDocument();
	});

	it("does not render when open=false", () => {
		render(Banner, { text: "Hidden", open: false });
		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});

	it("renders when open=true", () => {
		render(Banner, { text: "Visible", open: true });
		expect(screen.getByText("Visible")).toBeInTheDocument();
	});

	it("has dismiss button with aria-label", () => {
		render(Banner, { text: "Hi" });
		expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(Banner, { text: "Hi", class: "my-banner" });
		expect(container.firstElementChild?.className).toContain("my-banner");
	});

	it("renders in role=status", () => {
		render(Banner, { text: "Hi" });
		expect(screen.getByRole("status")).toBeInTheDocument();
	});
});
