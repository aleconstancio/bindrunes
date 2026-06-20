import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Dialog from "./Dialog.svelte";

describe("Dialog", () => {
	it("renders title when open", () => {
		render(Dialog, { open: true, title: "Confirm" });
		expect(screen.getByText("Confirm")).toBeInTheDocument();
	});

	it("renders dialog role element when open (in portal)", () => {
		render(Dialog, { open: true });
		expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
	});

	it("does not render title when closed", () => {
		render(Dialog, { open: false, title: "Hidden" });
		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});

	it("applies aria-label when provided", () => {
		render(Dialog, { open: true, ariaLabel: "Custom dialog" });
		expect(document.querySelector('[role="dialog"]')).toHaveAttribute(
			"aria-label",
			"Custom dialog",
		);
	});

	it("applies size classes for sm", () => {
		render(Dialog, { open: true, size: "sm" });
		const content = document.querySelector('[role="dialog"]');
		expect(content?.className).toContain("max-w-sm");
	});

	it("applies size classes for lg", () => {
		render(Dialog, { open: true, size: "lg" });
		const content = document.querySelector('[role="dialog"]');
		expect(content?.className).toContain("max-w-lg");
	});

	it("applies size classes for full", () => {
		render(Dialog, { open: true, size: "full" });
		const content = document.querySelector('[role="dialog"]');
		expect(content?.className).toContain("max-w-[90vw]");
	});

	it("defaults to md size", () => {
		render(Dialog, { open: true });
		const content = document.querySelector('[role="dialog"]');
		expect(content?.className).toContain("max-w-md");
	});

	it("a11y: open dialog has no violations", async () => {
		const { container } = render(Dialog, { open: true, title: "Confirm" });
		await expectNoAxeViolations(container);
	});
});
