import { describe, expect, it } from "vitest";
import SidebarRail from "./SidebarRail.svelte";

describe("SidebarRail", () => {
	it("exports a Svelte component", () => {
		expect(SidebarRail).toBeDefined();
	});

	it("is a function (Svelte component signature)", () => {
		expect(typeof SidebarRail).toBe("function");
	});
});
