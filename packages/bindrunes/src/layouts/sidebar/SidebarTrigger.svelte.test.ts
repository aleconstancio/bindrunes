import { describe, expect, it } from "vitest";
import SidebarTrigger from "./SidebarTrigger.svelte";

describe("SidebarTrigger", () => {
	it("is a valid Svelte component", () => {
		expect(SidebarTrigger).toBeDefined();
		expect(typeof SidebarTrigger).toBe("function");
	});
});
