import { describe, expect, it } from "vitest";
import SidebarRail from "./SidebarRail.svelte";

describe("SidebarRail", () => {
	it("is a valid Svelte component", () => {
		expect(SidebarRail).toBeDefined();
		expect(typeof SidebarRail).toBe("function");
	});
});
