import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import CrudEditForm from "./CrudEditForm.svelte";

describe("CrudEditForm", () => {
	const config = {
		title: "Edit User",
		description: "Update user information",
		submitLabel: "Update",
		fields: [],
	};

	it("renders the title", () => {
		render(CrudEditForm, { config });
		expect(screen.getByText("Edit User")).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(CrudEditForm, { config });
		expect(screen.getByText("Update user information")).toBeInTheDocument();
	});

	it("uses default submit label", () => {
		render(CrudEditForm, { config: { ...config, submitLabel: undefined } });
		expect(screen.getByText("Update")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CrudEditForm, { config, class: "my-edit" });
		expect(container.firstElementChild?.className).toContain("my-edit");
	});

	it("renders without description", () => {
		render(CrudEditForm, { config: { ...config, description: undefined } });
		expect(screen.getByText("Edit User")).toBeInTheDocument();
	});
});
