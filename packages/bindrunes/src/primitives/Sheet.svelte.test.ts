import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Sheet from "./Sheet.svelte";

describe("Sheet", () => {
	it("does not render when closed", () => {
		render(Sheet, { props: { open: false } });
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders when open", () => {
		render(Sheet, { props: { open: true, title: "Test Sheet" } });
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("displays title", () => {
		render(Sheet, { props: { open: true, title: "Settings" } });
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	it("has aria-label on close button", () => {
		render(Sheet, { props: { open: true, title: "Test" } });
		expect(screen.getByLabelText("Close")).toBeInTheDocument();
	});

	it("has aria-modal attribute", () => {
		render(Sheet, { open: true });
		expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
	});

	it("applies aria-label when provided", () => {
		render(Sheet, { open: true, ariaLabel: "Navigation panel" });
		expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Navigation panel");
	});

	it("a11y: open sheet has no violations", async () => {
		const { container } = render(Sheet, { open: true, title: "Test" });
		await expectNoAxeViolations(container);
	});
});
