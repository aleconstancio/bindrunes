import { describe, expect, it } from "vitest";
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
});
