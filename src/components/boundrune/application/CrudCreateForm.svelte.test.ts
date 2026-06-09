import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import CrudCreateForm from "./CrudCreateForm.svelte";

describe("CrudCreateForm", () => {
	const config = {
		title: "Create User",
		description: "Add a new user to the system",
		submitLabel: "Create User",
		fields: [],
	};

	it("renders the title as heading", () => {
		render(CrudCreateForm, { config });
		expect(screen.getByRole("heading", { name: "Create User" })).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(CrudCreateForm, { config });
		expect(screen.getByText("Add a new user to the system")).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(CrudCreateForm, { config });
		expect(screen.getByRole("button", { name: "Create User" })).toBeInTheDocument();
	});

	it("uses default submit label when not provided", () => {
		render(CrudCreateForm, { config: { ...config, submitLabel: undefined } });
		expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CrudCreateForm, { config, class: "my-form" });
		expect(container.firstElementChild?.className).toContain("my-form");
	});

	it("renders without description", () => {
		render(CrudCreateForm, { config: { ...config, description: undefined } });
		expect(screen.getByRole("heading", { name: "Create User" })).toBeInTheDocument();
		expect(screen.queryByText("Add a new user")).not.toBeInTheDocument();
	});
});
