import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import AlertDialog from "./AlertDialog.svelte";

describe("AlertDialog", () => {
	it("shows title when open", () => {
		render(AlertDialog, { props: { open: true, title: "Confirm Delete" } });
		expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
	});

	it("shows description when provided", () => {
		render(AlertDialog, {
			props: { open: true, description: "Are you really sure?" },
		});
		expect(screen.getByText("Are you really sure?")).toBeInTheDocument();
	});

	it("renders alertdialog role", () => {
		render(AlertDialog, { props: { open: true } });
		expect(document.querySelector('[role="alertdialog"]')).toBeInTheDocument();
	});

	it("does not render content when closed", () => {
		render(AlertDialog, { props: { open: false, title: "Hidden" } });
		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(AlertDialog, { props: { open: true } });
		await expectNoAxeViolations(container);
	});
});
