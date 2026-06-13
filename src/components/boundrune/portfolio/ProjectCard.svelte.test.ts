import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ProjectCard from "./ProjectCard.svelte";

describe("ProjectCard", () => {
	it("renders title", () => {
		render(ProjectCard, { title: "My Project" });
		expect(screen.getByText("My Project")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(ProjectCard, { title: "Project", description: "A great project" });
		expect(screen.getByText("A great project")).toBeInTheDocument();
	});

	it("renders tags", () => {
		render(ProjectCard, { title: "Project", tags: ["Svelte", "TypeScript"] });
		expect(screen.getByText("Svelte")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
	});

	it("renders as link with href", () => {
		const { container } = render(ProjectCard, { title: "Project", href: "/project/1" });
		const link = container.querySelector("a");
		expect(link).toHaveAttribute("href", "/project/1");
	});

	it("applies class prop", () => {
		const { container } = render(ProjectCard, { title: "Project", class: "my-card" });
		expect(container.firstElementChild?.className).toContain("my-card");
	});
});
