import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ChangelogPage from "./ChangelogPage.svelte";

const entries = [
	{
		version: "1.2.0",
		date: "2024-03-15",
		entries: [
			{ type: "added" as const, description: "New dashboard" },
			{ type: "fixed" as const, description: "Login bug" },
		],
	},
];

describe("ChangelogPage", () => {
	it("renders without errors", () => {
		const { container } = render(ChangelogPage);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		render(ChangelogPage);
		expect(screen.getByText("Changelog")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(ChangelogPage, { title: "Release History" });
		expect(screen.getByText("Release History")).toBeInTheDocument();
	});

	it("renders version number", () => {
		render(ChangelogPage, { entries });
		expect(screen.getByText("v1.2.0")).toBeInTheDocument();
	});

	it("renders entry descriptions", () => {
		render(ChangelogPage, { entries });
		expect(screen.getByText("New dashboard")).toBeInTheDocument();
		expect(screen.getByText("Login bug")).toBeInTheDocument();
	});

	it("renders entry type badges", () => {
		render(ChangelogPage, { entries });
		expect(screen.getByText("added")).toBeInTheDocument();
		expect(screen.getByText("fixed")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(ChangelogPage, { class: "changelog-class" });
		expect(container.firstElementChild?.className).toContain("changelog-class");
	});
});
