import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import PortfolioTemplate from "./PortfolioTemplate.svelte";

describe("PortfolioTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(PortfolioTemplate);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		render(PortfolioTemplate);
		expect(screen.getByText("Portfolio")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(PortfolioTemplate, { props: { title: "My Work" } });
		expect(screen.getByText("My Work")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(PortfolioTemplate, {
			props: { description: "Creative projects" },
		});
		expect(screen.getByText("Creative projects")).toBeInTheDocument();
	});

	it("does not render description when not provided", () => {
		render(PortfolioTemplate);
		expect(screen.queryByText("Creative projects")).not.toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(PortfolioTemplate, { props: { class: "portfolio-class" } });
		expect(container.firstElementChild?.className).toContain("portfolio-class");
	});
});
