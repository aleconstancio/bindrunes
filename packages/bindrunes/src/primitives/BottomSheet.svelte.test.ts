import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import BottomSheet from "./BottomSheet.svelte";

describe("BottomSheet", () => {
	it("does not render when closed", () => {
		render(BottomSheet, { props: { open: false, title: "Sheet" } });
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders when open", () => {
		render(BottomSheet, { props: { open: true, title: "Sheet" } });
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("displays the title", () => {
		render(BottomSheet, { props: { open: true, title: "My Title" } });
		expect(screen.getByText("My Title")).toBeInTheDocument();
	});

	it("sets aria-label to title", () => {
		render(BottomSheet, { props: { open: true, title: "Accessible Title" } });
		expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Accessible Title");
	});

	it("sets aria-modal", () => {
		render(BottomSheet, { props: { open: true, title: "Modal" } });
		expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
	});

	it("renders close button", () => {
		render(BottomSheet, { props: { open: true, title: "Closeable" } });
		expect(screen.getByLabelText("Close")).toBeInTheDocument();
	});

	it("passes accessibility checks", async () => {
		const { container } = render(BottomSheet, {
			props: { open: true, title: "Accessible Sheet" },
		});
		await expectNoAxeViolations(container);
	});
});
