import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Drawer from "./Drawer.svelte";

describe("Drawer", () => {
	it("does not render when open=false", () => {
		render(Drawer, { open: false });
		expect(screen.queryAllByRole("dialog").length).toBe(0);
	});

	it("renders when open=true", () => {
		render(Drawer, { open: true });
		expect(screen.getAllByRole("dialog").length).toBeGreaterThanOrEqual(1);
	});

	it("displays title", () => {
		render(Drawer, { open: true, title: "My Drawer" });
		expect(screen.getByText("My Drawer")).toBeInTheDocument();
	});

	it("has close button", () => {
		render(Drawer, { open: true, title: "Test" });
		expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
	});

	it("has header region when title provided", () => {
		render(Drawer, { open: true, title: "My Drawer" });
		const title = screen.getByText("My Drawer");
		expect(title).toBeInTheDocument();
		expect(title.closest("[class]")).not.toBeNull();
	});
});
