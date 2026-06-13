import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudDetailDrawer from "./CrudDetailDrawer.svelte";

describe("CrudDetailDrawer", () => {
	it("does not render when closed", () => {
		render(CrudDetailDrawer, { open: false });
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders when open", () => {
		render(CrudDetailDrawer, { open: true, title: "User Details" });
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("displays title", () => {
		render(CrudDetailDrawer, { open: true, title: "User Details" });
		expect(screen.getByText("User Details")).toBeInTheDocument();
	});

	it("renders sections", () => {
		const sections = [
			{ label: "Name", value: "Alice" },
			{ label: "Status", value: "Active", variant: "success" as const },
		];
		render(CrudDetailDrawer, { open: true, title: "Details", sections });
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Active")).toBeInTheDocument();
	});

	it("renders empty when no sections", () => {
		render(CrudDetailDrawer, { open: true, title: "Details" });
		expect(screen.getByText("Details")).toBeInTheDocument();
	});

	it("a11y: open drawer has no violations", async () => {
		const { container } = render(CrudDetailDrawer, { open: true, title: "Test" });
		const { expectNoAxeViolations } = await import("../../../helpers/axe");
		await expectNoAxeViolations(container);
	});
});
