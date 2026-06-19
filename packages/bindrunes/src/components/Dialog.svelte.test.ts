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

	it("a11y: open dialog has no violations", async () => {
		const { container } = render(Dialog, { open: true, title: "Confirm" });
		await expectNoAxeViolations(container);
	});
});
