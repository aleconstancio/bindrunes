import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import QuickActions from "./QuickActions.svelte";

describe("QuickActions", () => {
	const actions = [
		{ label: "New Post", onClick: vi.fn() },
		{ label: "Export", onClick: vi.fn(), variant: "outline" as const },
		{ label: "Delete", onClick: vi.fn(), variant: "ghost" as const },
	];

	it("renders action buttons", () => {
		render(QuickActions, { actions });
		expect(screen.getByText("New Post")).toBeInTheDocument();
		expect(screen.getByText("Export")).toBeInTheDocument();
		expect(screen.getByText("Delete")).toBeInTheDocument();
	});

	it("renders empty when no actions", () => {
		const { container } = render(QuickActions, { actions: [] });
		expect(container.firstElementChild?.children.length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(QuickActions, { actions, class: "my-actions" });
		expect(container.firstElementChild?.className).toContain("my-actions");
	});
});
