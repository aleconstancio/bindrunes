import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudForm from "./CrudForm.svelte";

const config = {
	title: "Create User",
	description: "Fill in user details",
	fields: [
		{ name: "name", label: "Name", type: "text" as const },
		{ name: "email", label: "Email", type: "email" as const },
	],
};

describe("CrudForm", () => {
	it("renders without errors", () => {
		const { container } = render(CrudForm, { props: { config } });
		expect(container).toBeTruthy();
	});

	it("renders title from config", () => {
		render(CrudForm, { props: { config } });
		expect(screen.getByText("Create User")).toBeInTheDocument();
	});

	it("renders description from config", () => {
		render(CrudForm, { props: { config } });
		expect(screen.getByText("Fill in user details")).toBeInTheDocument();
	});

	it("renders with custom submit label", () => {
		render(CrudForm, { props: { config: { ...config, submitLabel: "Save User" } } });
		expect(screen.getByText("Save User")).toBeInTheDocument();
	});

	it("renders default submit label for edit mode", () => {
		render(CrudForm, { props: { config, mode: "edit" } });
		expect(screen.getByText("Update")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CrudForm, { props: { config, class: "crud-class" } });
		expect(container.firstElementChild?.className).toContain("crud-class");
	});
});
