import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarStateHarness from "./__tests__/SidebarStateHarness.svelte";
import { SIDEBAR_KEYBOARD_SHORTCUT } from "./sidebar-context.svelte";

describe("sidebar-context", () => {
	it("exports SIDEBAR_KEYBOARD_SHORTCUT as 'b'", () => {
		expect(SIDEBAR_KEYBOARD_SHORTCUT).toBe("b");
	});

	it("exports createSidebarState as a function", async () => {
		const mod = await import("./sidebar-context.svelte");
		expect(typeof mod.createSidebarState).toBe("function");
	});

	it("exports useSidebar as a function", async () => {
		const mod = await import("./sidebar-context.svelte");
		expect(typeof mod.useSidebar).toBe("function");
	});

	it("SIDEBAR_KEYBOARD_SHORTCUT is a single lowercase letter", () => {
		expect(SIDEBAR_KEYBOARD_SHORTCUT).toHaveLength(1);
		expect(SIDEBAR_KEYBOARD_SHORTCUT).toMatch(/^[a-z]$/);
	});

	it("createSidebarState initializes with open=true", () => {
		const { container } = render(SidebarStateHarness, { initialOpen: true });
		const el = container.querySelector("[data-testid='sidebar-state']");
		expect(el?.getAttribute("data-open")).toBe("true");
	});

	it("createSidebarState initializes with open=false", () => {
		const { container } = render(SidebarStateHarness, { initialOpen: false });
		const el = container.querySelector("[data-testid='sidebar-state']");
		expect(el?.getAttribute("data-open")).toBe("false");
	});

	it("state is 'expanded' when open=true", () => {
		const { container } = render(SidebarStateHarness, { initialOpen: true });
		const el = container.querySelector("[data-testid='sidebar-state']");
		expect(el?.getAttribute("data-state")).toBe("expanded");
	});

	it("state is 'collapsed' when open=false", () => {
		const { container } = render(SidebarStateHarness, { initialOpen: false });
		const el = container.querySelector("[data-testid='sidebar-state']");
		expect(el?.getAttribute("data-state")).toBe("collapsed");
	});

	it("toggle flips open state", async () => {
		const { container } = render(SidebarStateHarness, { initialOpen: true });
		const el = container.querySelector("[data-testid='sidebar-state']");
		expect(el?.getAttribute("data-open")).toBe("true");

		await fireEvent.click(screen.getByTestId("toggle"));
		expect(el?.getAttribute("data-open")).toBe("false");
		expect(el?.getAttribute("data-state")).toBe("collapsed");

		await fireEvent.click(screen.getByTestId("toggle"));
		expect(el?.getAttribute("data-open")).toBe("true");
		expect(el?.getAttribute("data-state")).toBe("expanded");
	});

	it("setOpen(false) closes the sidebar", async () => {
		const { container } = render(SidebarStateHarness, { initialOpen: true });
		const el = container.querySelector("[data-testid='sidebar-state']");

		await fireEvent.click(screen.getByTestId("set-open-false"));
		expect(el?.getAttribute("data-open")).toBe("false");
	});

	it("setOpen(true) opens the sidebar", async () => {
		const { container } = render(SidebarStateHarness, { initialOpen: false });
		const el = container.querySelector("[data-testid='sidebar-state']");

		await fireEvent.click(screen.getByTestId("set-open-true"));
		expect(el?.getAttribute("data-open")).toBe("true");
	});

	it("toggleMobile flips openMobile state", async () => {
		const { container } = render(SidebarStateHarness, { initialOpen: true });
		const el = container.querySelector("[data-testid='sidebar-state']");
		expect(el?.getAttribute("data-mobile")).toBe("false");

		await fireEvent.click(screen.getByTestId("toggle-mobile"));
		expect(el?.getAttribute("data-mobile")).toBe("true");

		await fireEvent.click(screen.getByTestId("toggle-mobile"));
		expect(el?.getAttribute("data-mobile")).toBe("false");
	});

	it("setOpenMobile sets openMobile", async () => {
		const { container } = render(SidebarStateHarness, { initialOpen: true });
		const el = container.querySelector("[data-testid='sidebar-state']");

		await fireEvent.click(screen.getByTestId("set-mobile-true"));
		expect(el?.getAttribute("data-mobile")).toBe("true");

		await fireEvent.click(screen.getByTestId("set-mobile-false"));
		expect(el?.getAttribute("data-mobile")).toBe("false");
	});
});
