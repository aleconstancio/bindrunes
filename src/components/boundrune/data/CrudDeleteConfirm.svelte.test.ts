import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudDeleteConfirm from "./CrudDeleteConfirm.svelte";

describe("CrudDeleteConfirm", () => {
	it("does not render when closed", () => {
		render(CrudDeleteConfirm, { open: false });
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders when open", () => {
		render(CrudDeleteConfirm, { open: true });
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("renders title", () => {
		render(CrudDeleteConfirm, { open: true, title: "Delete User" });
		expect(screen.getByText("Delete User")).toBeInTheDocument();
	});

	it("renders default title", () => {
		render(CrudDeleteConfirm, { open: true });
		expect(screen.getByText("Confirm deletion")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(CrudDeleteConfirm, { open: true, description: "This cannot be undone" });
		expect(screen.getByText(/This cannot be undone/)).toBeInTheDocument();
	});

	it("renders item name", () => {
		render(CrudDeleteConfirm, { open: true, itemName: "Alice" });
		expect(screen.getByText(/Alice/)).toBeInTheDocument();
	});

	it("renders delete button", () => {
		render(CrudDeleteConfirm, { open: true });
		expect(screen.getByText("Delete")).toBeInTheDocument();
	});

	it("renders cancel button", () => {
		render(CrudDeleteConfirm, { open: true });
		expect(screen.getByText("Cancel")).toBeInTheDocument();
	});

	it("renders custom confirm label", () => {
		render(CrudDeleteConfirm, { open: true, confirmLabel: "Remove" });
		expect(screen.getByText("Remove")).toBeInTheDocument();
	});

	it("a11y: open dialog has no violations", async () => {
		const { container } = render(CrudDeleteConfirm, { open: true });
		const { expectNoAxeViolations } = await import("../../../helpers/axe");
		await expectNoAxeViolations(container);
	});
});
