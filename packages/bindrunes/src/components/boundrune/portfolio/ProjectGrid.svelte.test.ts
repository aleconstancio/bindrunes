import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ProjectGrid from "./ProjectGrid.svelte";

describe("ProjectGrid", () => {
	const projects = [
		{ id: "1", title: "Project A", description: "Description A" },
		{ id: "2", title: "Project B", description: "Description B" },
	];

	it("renders project cards", () => {
		render(ProjectGrid, { projects });
		expect(screen.getByText("Project A")).toBeInTheDocument();
		expect(screen.getByText("Project B")).toBeInTheDocument();
	});

	it("renders empty grid when no projects", () => {
		const { container } = render(ProjectGrid, { projects: [] });
		expect(container.querySelector("[class*='grid']")?.children.length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(ProjectGrid, { projects, class: "my-grid" });
		expect(container.firstElementChild?.className).toContain("my-grid");
	});
});
