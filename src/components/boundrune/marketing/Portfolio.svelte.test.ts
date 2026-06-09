import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Portfolio from "./Portfolio.svelte";

describe("Portfolio", () => {
	const items = [
		{ title: "Project A", description: "A cool project", image: "/img/a.jpg", tags: ["Svelte", "TS"] },
		{ title: "Project B", description: "Another project" },
	];

	it("renders items", () => {
		render(Portfolio, { items });
		expect(screen.getByText("Project A")).toBeInTheDocument();
		expect(screen.getByText("Project B")).toBeInTheDocument();
	});

	it("renders descriptions", () => {
		render(Portfolio, { items });
		expect(screen.getByText("A cool project")).toBeInTheDocument();
		expect(screen.getByText("Another project")).toBeInTheDocument();
	});

	it("renders tags", () => {
		render(Portfolio, { items });
		expect(screen.getByText("Svelte")).toBeInTheDocument();
		expect(screen.getByText("TS")).toBeInTheDocument();
	});

	it("renders images", () => {
		render(Portfolio, { items });
		const imgs = document.querySelectorAll("img");
		expect(imgs.length).toBe(1);
		expect(imgs[0]).toHaveAttribute("src", "/img/a.jpg");
	});

	it("renders as links", () => {
		render(Portfolio, { items });
		const links = document.querySelectorAll("a");
		expect(links.length).toBe(2);
	});

	it("applies columns=2 grid", () => {
		const { container } = render(Portfolio, { items, columns: 2 });
		expect(container.querySelector(".grid")?.className).toMatch(/grid-cols-2/);
	});

	it("applies columns=4 grid", () => {
		const { container } = render(Portfolio, { items, columns: 4 });
		expect(container.querySelector(".grid")?.className).toMatch(/grid-cols-4/);
	});

	it("applies class prop", () => {
		const { container } = render(Portfolio, { items, class: "my-portfolio" });
		expect(container.firstElementChild?.className).toContain("my-portfolio");
	});

	it("renders empty for no items", () => {
		render(Portfolio, { items: [] });
		expect(screen.queryByText("Project A")).not.toBeInTheDocument();
	});
});
