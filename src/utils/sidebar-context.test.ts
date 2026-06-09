import { beforeEach, describe, expect, it } from "vitest";

// Sidebar context must be tested within a Svelte component using the context
// These tests verify the module can be imported and the factory functions exist

describe("sidebar-context", () => {
	it("can be imported without error", async () => {
		const mod = await import("../components/sidebar/sidebar-context.svelte");
		expect(mod.createSidebarState).toBeDefined();
		expect(mod.getSidebarContext).toBeDefined();
		expect(mod.SIDEBAR_KEYBOARD_SHORTCUT).toBe("b");
	});
});
