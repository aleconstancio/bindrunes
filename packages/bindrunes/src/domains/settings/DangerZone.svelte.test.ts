import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DangerZone from "./DangerZone.svelte";

describe("DangerZone", () => {
	it("renders without errors", () => {
		const { container } = render(DangerZone);
		expect(container).toBeTruthy();
	});

	it("renders danger zone heading", () => {
		render(DangerZone);
		expect(screen.getByText("Danger Zone")).toBeInTheDocument();
	});

	it("renders deactivation option when onDeactivate provided", () => {
		render(DangerZone, { onDeactivate: () => {} });
		expect(screen.getByText("Deactivate Account")).toBeInTheDocument();
	});

	it("renders delete option when onDelete provided", () => {
		render(DangerZone, { onDelete: () => {} });
		expect(screen.getByText("Delete Account")).toBeInTheDocument();
	});

	it("renders transfer option when onTransfer provided", () => {
		render(DangerZone, { onTransfer: () => {} });
		expect(screen.getByText("Transfer Ownership")).toBeInTheDocument();
	});

	it("does not render actions when no callbacks provided", () => {
		render(DangerZone);
		expect(screen.queryByText("Deactivate Account")).not.toBeInTheDocument();
		expect(screen.queryByText("Delete Account")).not.toBeInTheDocument();
		expect(screen.queryByText("Transfer Ownership")).not.toBeInTheDocument();
	});
});
